class TechDocsCode extends HTMLElement {
  static get observedAttributes() {
    return ["lang", "title"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.highlight();
  }

  attributeChangedCallback() {
    this.render();
    this.highlight();
  }

  render() {
    const lang = this.getAttribute("lang") || "plaintext";
    const title = this.getAttribute("title") || "";
    const tpl = this.querySelector("template");
    const code = tpl ? tpl.innerHTML.trim() : this.textContent.trim();

    this.shadowRoot.innerHTML = `
      <style>
        .tech-docs-code {
          border: 1px solid #333;
          border-radius: 0.5rem;
          overflow: hidden;
          background: #444e;
          color: #f1f1f1;
          margin: 0.5rem 0;
        }

        .tech-docs-code-header {
          font-family: monospace;
          font-size: 0.8rem;
          background: #222;
          color: #ccc;
          border-bottom: 1px solid #2b2b2b;
          padding: 0.5rem 1rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        pre {
          margin: 0;
          padding: 0.75rem;
          overflow-x: auto;
          white-space: pre;
        }

        code {
          font-family: monospace;
          font-size: 0.9rem;
        }
      </style>

      <div class="tech-docs-code">
        ${title ? `<div class="tech-docs-code-header">${title}</div>` : ""}
        <pre><code class="language-${lang}">${code}</code></pre>
      </div>
    `;
  }

  highlight() {
    const codeEl = this.shadowRoot.querySelector("code");

    if (window.Prism && codeEl) {
      Prism.highlightElement(codeEl);
    }
  }
}

customElements.define("tech-docs-code", TechDocsCode);