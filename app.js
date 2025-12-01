document.addEventListener('DOMContentLoaded', () => {
    // State
    const state = {
        baseSize: 16,
        ratio: 1.250,
        font: "'Inter', sans-serif",
        fontWeight: 400,
        unit: 'px',
        text: "El rápido zorro marrón salta.",
        steps: 7,
        view: 'list'
    };

    // DOM Elements
    const els = {
        baseSizeInput: document.getElementById('base-size'),
        baseSizeRange: document.getElementById('base-size-range'),
        ratioSelect: document.getElementById('scale-ratio'),
        fontSelect: document.getElementById('font-family'),
        fontWeightSelect: document.getElementById('font-weight'),
        unitSelect: document.getElementById('unit'),
        textInput: document.getElementById('preview-text'),
        container: document.getElementById('scale-container'),
        ratioLabel: document.querySelector('label[for="scale-ratio"] span'),
        btnExport: document.getElementById('btn-export'),
        codePanel: document.getElementById('code-panel'),
        closeCode: document.getElementById('close-code'),
        cssOutput: document.getElementById('css-output'),
        viewBtns: document.querySelectorAll('.view-btn')
    };

    function getSize(step) {
        return state.baseSize * Math.pow(state.ratio, step);
    }

    function fmt(num) {
        return num.toFixed(2);
    }

    function convertUnit(sizePx) {
        if (state.unit === 'rem') {
            return sizePx / state.baseSize;
        } else if (state.unit === 'pt') {
            return sizePx * 0.75; // 1px = 0.75pt
        }
        return sizePx;
    }

    function calculateScale() {
        const scale = [];
        for (let i = state.steps - 1; i >= 0; i--) {
            const sizePx = getSize(i);
            let tag = '';
            let weight = state.fontWeight.toString();
            let lineHeight = '1.5';

            if (i === state.steps - 1) { tag = 'h1'; lineHeight = '1.1'; }
            else if (i === state.steps - 2) { tag = 'h2'; lineHeight = '1.2'; }
            else if (i === state.steps - 3) { tag = 'h3'; lineHeight = '1.2'; }
            else if (i === state.steps - 4) { tag = 'h4'; lineHeight = '1.2'; }
            else if (i === state.steps - 5) { tag = 'h5'; lineHeight = '1.2'; }
            else if (i === state.steps - 6) { tag = 'h6'; lineHeight = '1.2'; }
            else if (i === 0) { tag = 'p'; lineHeight = '1.6'; }

            if (tag) {
                scale.push({ tag, size: sizePx, weight, lineHeight });
            }
        }
        return scale;
    }

    function render() {
        els.container.innerHTML = '';
        els.container.style.fontFamily = state.font;
        els.container.style.fontWeight = state.fontWeight;
        els.container.className = 'preview-container';
        if (state.view === 'mobile') els.container.classList.add('view-mobile');
        if (state.view === 'desktop') els.container.classList.add('view-desktop');

        if (state.view === 'list') {
            renderList();
        } else {
            renderSimulation();
        }
    }

    function renderList() {
        const scale = calculateScale();
        scale.forEach(item => {
            const convertedSize = convertUnit(item.size);
            const div = document.createElement('div');
            div.className = 'scale-item';
            div.innerHTML = `
                <div class="scale-info">
                    <strong>${item.tag}</strong>
                    <span>${fmt(convertedSize)}${state.unit}</span>
                </div>
                <div class="scale-preview" style="font-size: ${item.size}px; font-weight: ${state.fontWeight};">
                    ${state.text}
                </div>
            `;
            els.container.appendChild(div);
        });
    }

    function renderSimulation() {
        const h1 = getSize(state.steps - 1);
        const h2 = getSize(state.steps - 2);
        const h3 = getSize(state.steps - 3);
        const p = getSize(0);
        const small = getSize(0) * 0.875;

        const content = document.createElement('div');
        content.className = 'sim-content';
        content.innerHTML = `
            <div class="sim-hero">
                <h1 style="font-size: ${h1}px; margin-bottom: 0.5em; line-height: 1.1;">Diseño Minimalista</h1>
                <p style="font-size: ${h3}px; color: #64748b; margin-bottom: 1em;">Una exploración de la tipografía y el espacio.</p>
                <button style="background: #6366f1; color: white; border: none; padding: 0.75em 1.5em; border-radius: 6px; font-size: ${p}px; cursor: pointer;">Leer más</button>
            </div>
            <article class="sim-article">
                <h2 style="font-size: ${h2}px; margin-bottom: 0.75em; margin-top: 1.5em;">El Arte de la Escala</h2>
                <p style="font-size: ${p}px;">
                    La tipografía no es solo elegir fuentes bonitas. Se trata de establecer una jerarquía visual clara que guíe al lector a través del contenido. 
                    El uso de una escala modular permite que los tamaños de fuente se relacionen entre sí de manera armoniosa.
                </p>
                <h3 style="font-size: ${h3}px; margin-bottom: 0.5em; margin-top: 1.5em;">¿Por qué usar matemáticas?</h3>
                <p style="font-size: ${p}px;">
                    Al igual que en la música, las proporciones matemáticas crean ritmo. Una escala basada en la Proporción Áurea (1.618) se sentirá dramática y expresiva, 
                    mientras que una Tercera Mayor (1.250) será más utilitaria y flexible para interfaces web.
                </p>
                <p style="font-size: ${p}px;">
                    Experimenta con diferentes ratios para encontrar el tono adecuado para tu proyecto.
                </p>
                <div style="margin-top: 2em; padding-top: 1em; border-top: 1px solid #e2e8f0; font-size: ${small}px; color: #94a3b8;">
                    Publicado el 1 de Diciembre de 2025
                </div>
            </article>
        `;
        els.container.appendChild(content);
    }

    // Generate CSS
    function updateCSS() {
        const scale = calculateScale();
        let css = `body {\n  font-family: ${state.font};\n  font-size: ${state.baseSize}px;\n  line-height: 1.5;\n}\n\n`;

        scale.forEach(item => {
            if (item.tag === 'body') return;
            css += `${item.tag} {\n`;
            css += `  font-size: ${item.size.toFixed(2)}px;\n`;
            css += `  font-weight: ${item.weight};\n`;
            css += `  line-height: ${item.lineHeight};\n`;
            css += `}\n\n`;
        });

        return css;
    }

    // Generate Tailwind Config
    function generateTailwind() {
        const scale = calculateScale();
        const fontSize = {};

        scale.forEach(item => {
            const key = item.tag === 'p' ? 'base' : item.tag;
            fontSize[key] = [
                `${item.size.toFixed(2)}px`,
                {
                    lineHeight: item.lineHeight,
                    fontWeight: item.weight
                }
            ];
        });

        const config = {
            theme: {
                extend: {
                    fontSize: fontSize
                }
            }
        };

        return `// tailwind.config.js\nmodule.exports = ${JSON.stringify(config, null, 2)}`;
    }

    // Export Buttons
    els.btnExport.addEventListener('click', () => {
        const css = updateCSS();
        els.cssOutput.textContent = css;
        els.codePanel.classList.add('active');
        document.querySelector('.code-header h3').textContent = 'CSS Export';
    });

    const btnExportTailwind = document.getElementById('btn-export-tailwind');
    if (btnExportTailwind) {
        btnExportTailwind.addEventListener('click', () => {
            const tailwind = generateTailwind();
            els.cssOutput.textContent = tailwind;
            els.codePanel.classList.add('active');
            document.querySelector('.code-header h3').textContent = 'Tailwind Config';
        });
    }

    els.closeCode.addEventListener('click', () => {
        els.codePanel.classList.remove('active');
    });

    // Update State
    function updateState() {
        state.baseSize = parseInt(els.baseSizeInput.value);
        state.ratio = parseFloat(els.ratioSelect.value);
        state.font = els.fontSelect.value;
        state.fontWeight = parseInt(els.fontWeightSelect.value);
        state.unit = els.unitSelect.value;
        state.text = els.textInput.value;
        els.baseSizeRange.value = state.baseSize;
        els.ratioLabel.textContent = state.ratio;
        render();
    }

    els.baseSizeInput.addEventListener('input', () => {
        els.baseSizeRange.value = els.baseSizeInput.value;
        updateState();
    });

    els.baseSizeRange.addEventListener('input', () => {
        els.baseSizeInput.value = els.baseSizeRange.value;
        updateState();
    });

    els.ratioSelect.addEventListener('change', updateState);
    els.fontSelect.addEventListener('change', updateState);
    els.fontWeightSelect.addEventListener('change', updateState);
    els.unitSelect.addEventListener('change', updateState);
    els.textInput.addEventListener('input', updateState);

    // View Switching
    els.viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            els.viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.view = btn.dataset.view;
            render();
        });
    });

    // Close Panel Buttons
    const btnClosePanel = document.getElementById('btn-close-panel');
    if (btnClosePanel) {
        btnClosePanel.addEventListener('click', () => {
            els.codePanel.classList.remove('active');
        });
    }

    // Copy Code Buttons
    const btnCopy = document.getElementById('btn-copy-code');
    if (btnCopy) {
        btnCopy.addEventListener('click', () => {
            const code = els.cssOutput.textContent;
            navigator.clipboard.writeText(code).then(() => {
                const originalText = btnCopy.textContent;
                btnCopy.textContent = '¡Copiado!';
                setTimeout(() => {
                    btnCopy.textContent = originalText;
                }, 2000);
            }).catch(err => {
                console.error('Error al copiar:', err);
                btnCopy.textContent = 'Error';
            });
        });
    }

    const btnCopyHeader = document.getElementById('btn-copy-header');
    if (btnCopyHeader) {
        btnCopyHeader.addEventListener('click', () => {
            const code = els.cssOutput.textContent;
            navigator.clipboard.writeText(code).then(() => {
                btnCopyHeader.style.background = 'rgba(34, 197, 94, 0.9)';
                setTimeout(() => {
                    btnCopyHeader.style.background = 'rgba(30, 30, 30, 0.8)';
                }, 1000);
            }).catch(err => {
                console.error('Error al copiar:', err);
            });
        });
    }

    // Initial Render
    render();
});
