class TechDocsAccordion extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute("title") || "";
    const content = this.innerHTML;

    this.innerHTML = `
      <style>
        details.tech-docs-accordion {
          background: rgba(255, 255, 255, 0.9);
          color: #1f1f1f;
          border: 1px solid #999;
          border-radius: 0.375rem;
          margin-bottom: 0.5rem;
        }

        summary.tech-docs-accordion-summary {
          padding: 1rem;
          font-weight: 600;
          cursor: pointer;
          outline: none;
        }

        .tech-docs-accordion-content {
          padding: 0 1rem 1rem;
        }
      </style>

      <details class="tech-docs-accordion">
        <summary class="tech-docs-accordion-summary">
          <code>${title}</code>
        </summary>
        <div class="tech-docs-accordion-content">
          ${content}
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
          color: #222;
          padding: 0.5rem 1rem;
          font-family: monospace;
          font-size: 0.8rem;
          border-bottom: 1.5px solid #333;
          text-transform: uppercase;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          padding: 0.6rem 0.8rem;
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

customElements.define("tech-docs-accordion", TechDocsAccordion);
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
    if (window.Prism) Prism.highlightAllUnder(this.shadowRoot);
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const lang = this.getAttribute("lang") || "plaintext";
    const title = this.getAttribute("title") || "";

    this.shadowRoot.innerHTML = `
      <style>
        .tech-docs-code {
          border: 1px solid #333;
          border-radius: 0.5rem;
          overflow: hidden;
          background: #3d3d3d;
          color: #f1f1f1;
          margin: 0.5rem 0;
        }

        .tech-docs-code-header {
          font-family: monospace;
          font-size: 0.8rem;
          background: #1f1f1f;
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
        <pre><code class="language-${lang}"><slot></slot></code></pre>
      </div>
    `;
  }
}

customElements.define("tech-docs-code", TechDocsCode);
