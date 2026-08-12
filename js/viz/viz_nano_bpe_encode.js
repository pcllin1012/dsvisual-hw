(function (global) {
    const K = () => global.VizKit; // resolved at call time (VizKit set at startup)

    let _bpeEncState = null;
    function renderNanoBpeEncode() {
        const host = K().acquireDynamicVizHost();
        if (!_bpeEncState) _bpeEncState = { vocab: ['a','b','ab','abc','c'], input: 'aabcabx' };
        const st = _bpeEncState;
        const langOf = K().langOf;
        const built = NanoBpeEncodeViz.buildFrames(st.vocab, st.input);
        const frames = built.frames, trie = built.trie;
        const byId = {}; trie.nodes.forEach((n) => { byId[n.id] = n; });
        host.innerHTML =
            '<div class="ss-controls">' +
              'vocab <input type="text" class="be-vocab" value="' + st.vocab.join(',') + '">' +
              'input <input type="text" class="be-input" value="' + st.input + '">' +
              '<button type="button" class="be-apply">Apply</button>' +
            '</div>' +
            '<div class="be-trie" data-testid="be-trie"></div>' +
            '<div class="be-input-row" data-testid="be-input"></div>' +
            '<div class="be-tokens" data-testid="be-tokens"></div>' +
            '<div class="ss-phase be-phase"></div>';
        function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
        function paintTrie(fr) {
            // active path = the matched segment of the input, mapped onto trie ids
            const path = st.input.slice(fr.matchStart, fr.matchEnd);
            const onPath = {};
            for (let k = 0; k <= path.length; k++) if (byId[path.slice(0, k)]) onPath[path.slice(0, k)] = true;
            const head = byId[path] ? path : '';
            const vb = trie.viewBox;
            let svg = '<svg class="be-trie-svg" viewBox="0 0 ' + vb.w + ' ' + vb.h + '" width="100%" xmlns="http://www.w3.org/2000/svg">';
            trie.edges.forEach(([p, c]) => {
                const a = byId[p], b = byId[c], hot = onPath[p] && onPath[c];
                svg += '<line class="be-edge" x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y + '" stroke="' + (hot ? '#f59e0b' : '#94a3b8') + '" stroke-width="' + (hot ? 3 : 2) + '"/>';
            });
            trie.nodes.forEach((n) => {
                const active = path.length > 0 && n.id === head;
                const matched = active && fr.status === 'emit';
                const term = !!n.token;
                const fill = matched ? '#dcfce7' : (active ? '#fef3c7' : (term ? '#dbeafe' : '#ffffff'));
                const stroke = matched ? '#16a34a' : ((active || (onPath[n.id] && n.id !== '')) ? '#f59e0b' : '#1e40af');
                let cls = 'be-node'; if (active) cls += ' active'; if (matched) cls += ' matched'; if (term) cls += ' term';
                svg += '<g class="' + cls + '" data-node="' + esc(n.id) + '">' +
                    '<circle cx="' + n.x + '" cy="' + n.y + '" r="14" fill="' + fill + '" stroke="' + stroke + '" stroke-width="2"/>' +
                    '<text x="' + n.x + '" y="' + (n.y + 4) + '" text-anchor="middle" font-family="monospace" font-size="12" font-weight="700" fill="#0f172a">' + esc(n.char || '·') + '</text>' +
                    (term ? '<title>' + esc(n.token) + '</title>' : '') +
                    '</g>';
            });
            svg += '</svg>';
            host.querySelector('.be-trie').innerHTML = svg;
        }
        function paint(fr) {
            paintTrie(fr);
            host.querySelector('.be-input-row').innerHTML = st.input.split('').map((ch, i) => {
                let cls = 'be-ch';
                if (i >= fr.matchStart && i < fr.matchEnd) cls += ' match';
                if (i === fr.cursor) cls += ' cursor';
                return '<span class="' + cls + '">' + esc(ch) + '</span>';
            }).join('');
            host.querySelector('.be-tokens').innerHTML = fr.tokens.map((t) =>
                '<span class="be-token">' + esc(t) + '</span>').join('');
            host.querySelector('.be-phase').textContent = langOf(fr.msg);
        }
        host.appendChild(K().buildFrameControls(frames, paint, { runIntervalMs: 600 }));
        host.querySelector('.be-apply').onclick = () => {
            const vocab = host.querySelector('.be-vocab').value.split(',').map((s) => s.trim()).filter(Boolean);
            const input = host.querySelector('.be-input').value.trim();
            if (vocab.length && input) { st.vocab = vocab; st.input = input; renderNanoBpeEncode(); }
        };
    }

    global.VizRegistry.attach('nano-bpe-encode', {
        render: renderNanoBpeEncode,
        // NOTE: codeNanoBpeEncode is declared with `const` at the top level of the
        // classic (non-module) script js/code_db.js — a lexical global shared
        // across <script> tags but not attached to `window`. Must reference the
        // bare identifier, not `global.codeNanoBpeEncode` (always undefined).
        code: () => codeNanoBpeEncode,
        layout: { host: 'dynamic' },
    });
})(typeof window !== 'undefined' ? window : globalThis);
