(function (global) {
  'use strict';

  // Map a screen (client) point into the SVG's CURRENT viewBox using the rendered
  // box ratio — robust to ancestor CSS zoom and to a viewBox grown/shifted by
  // fitCanvas. getBoundingClientRect already reflects scroll position.
  function screenToViewBox(svg, cx, cy) {
    var r = svg.getBoundingClientRect();
    var w = r.width || 1, h = r.height || 1;
    var vb = (svg.viewBox && svg.viewBox.baseVal) ? svg.viewBox.baseVal : { x: 0, y: 0, width: 600, height: 400 };
    return { x: vb.x + (cx - r.left) / w * vb.width, y: vb.y + (cy - r.top) / h * vb.height };
  }

  // Grow the SVG viewBox to bound all nodes (∪ the base 600x400, padding P) and
  // set width as a percentage of 600 so the stage fits at base (100%) and
  // overflows+scrolls when content extends — at a constant on-screen scale.
  function fitCanvas(svg, pos, n) {
    var P = 30, minX = 0, minY = 0, maxX = 600, maxY = 400, i;
    for (i = 0; i < n; i++) {
      if (pos[i].x - P < minX) minX = pos[i].x - P;
      if (pos[i].y - P < minY) minY = pos[i].y - P;
      if (pos[i].x + P > maxX) maxX = pos[i].x + P;
      if (pos[i].y + P > maxY) maxY = pos[i].y + P;
    }
    var vbW = maxX - minX, vbH = maxY - minY;
    svg.setAttribute('viewBox', minX + ' ' + minY + ' ' + vbW + ' ' + vbH);
    svg.style.width = (vbW / 600 * 100) + '%';
  }

  // attach({ svgs, pos, edges, n, redraw }) → { destroy }
  // Pointer-drag nodes; a decaying force sim re-settles the rest; dropped nodes
  // stay pinned. pos is mutable shared state read by the caller's redraw().
  function attach(cfg) {
    var svgs = cfg.svgs, pos = cfg.pos, edges = cfg.edges, n = cfg.n, redraw = cfg.redraw;
    var GW = global.GraphWorkbench;
    var pinned = (typeof Set !== 'undefined') ? new Set() : null;
    var dragging = null, activeSvg = null, raf = null, temp = 0;

    function anyConnected() { for (var i = 0; i < svgs.length; i++) if (svgs[i].isConnected) return true; return false; }
    function stop() { if (raf) { global.cancelAnimationFrame(raf); raf = null; } }
    function tick() {
      if (!anyConnected()) { stop(); return; }                 // orphaned (re-rendered) — stop
      GW.forceStep(pos, edges, n, { fixed: pinned, temp: temp });
      temp *= 0.9;
      redraw();
      if (temp < 0.5 && dragging === null) { stop(); return; }  // cooled and not dragging
      raf = global.requestAnimationFrame(tick);
    }
    function reheat() { temp = 600 / 12; if (!raf) raf = global.requestAnimationFrame(tick); }

    function onDown(svg, ev) {
      var t = (ev.target && ev.target.closest) ? ev.target.closest('[data-node]') : null;
      if (!t) return;
      var k = parseInt(t.getAttribute('data-node'), 10);
      if (!(k >= 0)) return;
      dragging = k; activeSvg = svg; if (pinned) pinned.add(k);
      try { svg.setPointerCapture(ev.pointerId); } catch (e) {}
      svg.classList.add('gw-dragging');
      ev.preventDefault();
    }
    function onMove(svg, ev) {
      if (dragging === null || svg !== activeSvg) return;
      var p = screenToViewBox(svg, ev.clientX, ev.clientY);
      pos[dragging].x = p.x; pos[dragging].y = p.y;
      reheat(); redraw();
      ev.preventDefault();
    }
    function onUp(svg, ev) {
      if (dragging === null) return;
      dragging = null; activeSvg = null;
      svg.classList.remove('gw-dragging');
      try { svg.releasePointerCapture(ev.pointerId); } catch (e) {}
      reheat();                                                 // settle around the dropped anchor, then cool
    }

    var handlers = [];
    for (var i = 0; i < svgs.length; i++) {
      (function (svg) {
        var d = function (e) { onDown(svg, e); };
        var m = function (e) { onMove(svg, e); };
        var u = function (e) { onUp(svg, e); };
        svg.addEventListener('pointerdown', d);
        svg.addEventListener('pointermove', m);
        svg.addEventListener('pointerup', u);
        svg.addEventListener('pointercancel', u);
        handlers.push([svg, d, m, u]);
      })(svgs[i]);
    }

    function destroy() {
      stop();
      for (var j = 0; j < handlers.length; j++) {
        var h = handlers[j];
        h[0].removeEventListener('pointerdown', h[1]);
        h[0].removeEventListener('pointermove', h[2]);
        h[0].removeEventListener('pointerup', h[3]);
        h[0].removeEventListener('pointercancel', h[3]);
      }
    }

    for (var f = 0; f < svgs.length; f++) fitCanvas(svgs[f], pos, n);

    return { destroy: destroy };
  }

  var api = { attach: attach, fitCanvas: fitCanvas };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.NodeDrag = api;
})(typeof window !== 'undefined' ? window : globalThis);
