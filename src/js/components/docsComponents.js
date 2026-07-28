class TechDocsClassSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const name = this.getAttribute('name') || 'Class';
    const hasConstructor = this.querySelector('[slot="constructor"]');

    const constructorSection = hasConstructor
      ? `
        <h2 class="sub-section-heading">Constructor</h2>
        <div class="code-wrapper">
          <pre><code><slot name="constructor"></slot></code></pre>
        </div>
        <p><slot name="constructor-info"></slot></p>
      `
      : "";

    this.shadowRoot.innerHTML = `
      <style>
        section.class-section {
          padding: 0.5em 1em;
          margin-bottom: 1em;
          background-color: rgba(0, 0, 0, 0.05);
          border-radius: 12px;
        }

        h1, h2 {
          margin: 0;
        }

        h1.class-name,
        h2.sub-section-heading {
          margin-bottom: 0.25em;
        }

        .code-wrapper {
          background: #333c;
          color: #f1f1f1;
          border-radius: 0.5rem;
          overflow: hidden;
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

      <section class="class-section">
        <h1 class="class-name">${name}</h1>

        ${constructorSection}

        <h2 class="sub-section-heading">Methods</h2>
        <div><slot name="methods"></slot></div>
      </section>
    `;
  }
}

class TechDocsMethodAccordion extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const title = this.getAttribute("title") || "";

    this.shadowRoot.innerHTML = `
      <style>
        details {
          background: rgba(255, 255, 255, 0.95);
          color: #1f1f1f;
          border: 1px solid #9999;
          border-radius: 0.375rem;
          margin-bottom: 0.5rem;
        }

        summary {
          padding: 1rem;
          font-weight: 600;
          cursor: pointer;
          list-style: none;
        }

        summary::-webkit-details-marker {
          display: none;
        }

        summary::after {
          content: "▸";
          float: right;
          transition: transform 0.2s ease;
        }

        details[open] summary::after {
          transform: rotate(90deg);
        }

        .content {
          padding: 0 1rem 1rem;
        }
      </style>

      <details>
        <summary><code>${title}</code></summary>
        <div class="content">
          <slot></slot>
        </div>
      </details>
    `;
  }
}

class TechDocsTable extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute("title") || "";

    const columns = (this.getAttribute("columns") || "Name,Type,Description")
      .split(",")
      .map(c => c.trim());

    const rows = Array.from(this.querySelectorAll("tech-docs-row")).map(row => {
      return {
        name: row.getAttribute("name") || "",
        type: row.getAttribute("type") || "",
        desc: row.innerHTML.trim()
      };
    });

    const getCell = (col, r) => {
      switch (col.toLowerCase()) {
        case "name":
        case "parameter":
        case "value":
          return `<td><code>${r.name}</code></td>`;

        case "type":
          return `<td>${r.type}</td>`;

        case "description":
          return `<td>${r.desc}</td>`;

        default:
          return `<td></td>`;
      }
    };

    this.shadowRoot.innerHTML = `
      <style>
        .tech-docs-table {
          border-bottom: 1.5px solid #333;
          border-radius: 0.25rem;
          overflow: hidden;
          margin: 1rem 0;
          font-size: 0.9rem;
        }

        .tech-docs-table-header {
          background: #ccc;
          color: #111;
          padding: 0.5rem 1rem;
          font-family: monospace;
          font-size: 0.9rem;
          border-bottom: 1.5px solid #333;
          text-transform: uppercase;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          padding: 0.7rem 0.9rem;
          text-align: left;
          border-bottom: 1.5px solid #333;
        }

        th {
          background: #fff;
          color: #1f1f1f;
        }

        tr:last-child td {
          border-bottom: none;
        }

        code {
          background: #d4d4d4;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.85rem;
        }
      </style>

      <div class="tech-docs-table">
        ${title ? `<div class="tech-docs-table-header">${title}</div>` : ""}
        <table>
          <thead>
            <tr>
              ${columns.map(c => `<th>${c}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${rows.map(r => `
              <tr>
                ${columns.map(col => getCell(col, r)).join("")}
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }
}

customElements.define("tech-docs-class-section", TechDocsClassSection);
customElements.define("tech-docs-method-accordion", TechDocsMethodAccordion);
customElements.define("tech-docs-table", TechDocsTable);


// in development

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