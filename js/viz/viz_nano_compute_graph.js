(function (global) {
    const K = () => global.VizKit; // resolved at call time (VizKit set at startup)

    let _cgState = null;
    function renderNanoComputeGraph() {
        const host = K().acquireDynamicVizHost();
        if (!_cgState) _cgState = { preset: 'mul-add' };
        const presets = {
            'mul-add': { nodes: [ {id:'a',op:'const',val:2}, {id:'b',op:'const',val:3}, {id:'m',op:'mul'}, {id:'c',op:'const',val:4}, {id:'s',op:'add'} ],
                         edges: [ ['a','m'],['b','m'],['m','s'],['c','s'] ] },
        };
        const langOf = K().langOf;
        const graph = presets[_cgState.preset];
        const frames = NanoComputeGraphViz.buildFrames(graph).frames;
        const nodes = graph.nodes, edges = graph.edges;

        // Layered left-to-right DAG layout: layer = longest path from a source.
        const succ = {}, indeg = {};
        nodes.forEach((n) => { succ[n.id] = []; indeg[n.id] = 0; });
        edges.forEach(([u, v]) => { succ[u].push(v); indeg[v]++; });
        const layer = {}, ind = Object.assign({}, indeg);
        const q = nodes.filter((n) => indeg[n.id] === 0).map((n) => n.id);
        q.forEach((id) => { layer[id] = 0; });
        for (let qi = 0; qi < q.length; qi++) {
            const u = q[qi];
            succ[u].forEach((v) => { layer[v] = Math.max(layer[v] == null ? 0 : layer[v], (layer[u] || 0) + 1); if (--ind[v] === 0) q.push(v); });
        }
        const layers = {};
        nodes.forEach((n) => { const L = layer[n.id] || 0; (layers[L] = layers[L] || []).push(n.id); });
        const SPX = 150, SPY = 72, MX = 18, MY = 18, W = 112, H = 42;
        const maxCount = Math.max.apply(null, Object.keys(layers).map((L) => layers[L].length));
        const maxLayer = Math.max.apply(null, nodes.map((n) => layer[n.id] || 0));
        const pos = {};
        Object.keys(layers).forEach((L) => { const arr = layers[L], off = (maxCount - arr.length) / 2; arr.forEach((id, i) => { pos[id] = { x: MX + (+L) * SPX, y: MY + (i + off) * SPY }; }); });
        const vbW = MX * 2 + maxLayer * SPX + W, vbH = MY * 2 + (maxCount - 1) * SPY + H;

        host.innerHTML =
            '<div class="cg-nodes" data-testid="cg-nodes"></div>' +
            '<div class="cg-order" data-testid="cg-order"></div>' +
            '<div class="ss-phase cg-phase"></div>';

        function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
        function paint(fr) {
            let svg = '<svg class="cg-svg" viewBox="0 0 ' + vbW + ' ' + vbH + '" width="100%" xmlns="http://www.w3.org/2000/svg">' +
                '<defs><marker id="cg-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="#94a3b8"/></marker></defs>';
            edges.forEach(([u, v]) => {
                const a = pos[u], b = pos[v];
                svg += '<line class="cg-edge" x1="' + (a.x + W) + '" y1="' + (a.y + H / 2) + '" x2="' + (b.x - 3) + '" y2="' + (b.y + H / 2) + '" stroke="#94a3b8" stroke-width="2" marker-end="url(#cg-arrow)"/>';
            });
            nodes.forEach((n) => {
                const p = pos[n.id], done = fr.evaluated.indexOf(n.id) >= 0, active = n.id === fr.active;
                const fill = active ? '#fef3c7' : (done ? '#f0fdf4' : '#e2e8f0');
                const stroke = active ? '#f59e0b' : (done ? '#16a34a' : '#cbd5e1');
                const txt = active ? '#1e293b' : (done ? '#16a34a' : '#475569');
                const val = (fr.values[n.id] != null) ? ' = ' + fr.values[n.id] : '';
                svg += '<g class="cg-node' + (done ? ' done' : '') + (active ? ' active' : '') + '" data-node="' + esc(n.id) + '">' +
                    '<rect x="' + p.x + '" y="' + p.y + '" width="' + W + '" height="' + H + '" rx="8" fill="' + fill + '" stroke="' + stroke + '" stroke-width="2"/>' +
                    '<text x="' + (p.x + W / 2) + '" y="' + (p.y + H / 2 + 4) + '" text-anchor="middle" font-family="monospace" font-size="13" font-weight="700" fill="' + txt + '">' + esc(n.id + ':' + n.op + val) + '</text>' +
                    '</g>';
            });
            svg += '</svg>';
            host.querySelector('.cg-nodes').innerHTML = svg;
            host.querySelector('.cg-order').textContent = 'topo: ' + fr.order.join(' → ');
            host.querySelector('.cg-phase').textContent = langOf(fr.msg);
        }
        host.appendChild(K().buildFrameControls(frames, paint, { runIntervalMs: 700 }));
    }

    global.VizRegistry.attach('nano-compute-graph', {
        render: renderNanoComputeGraph,
        // NOTE: codeNanoComputeGraph is declared with `const` at the top level of the
        // classic (non-module) script js/code_db.js — a lexical global shared
        // across <script> tags but not attached to `window`. Must reference the
        // bare identifier, not `global.codeNanoComputeGraph` (always undefined).
        code: () => codeNanoComputeGraph,
        layout: { host: 'dynamic' },
    });
})(typeof window !== 'undefined' ? window : globalThis);
