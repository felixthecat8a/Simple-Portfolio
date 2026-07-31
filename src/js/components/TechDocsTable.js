class TechDocsTable extends HTMLElement {
  static get observedAttributes() {
    return ["title", "columns"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (this.shadowRoot.children.length > 0) return;
    this.render();
  }

  attributeChangedCallback() {
    if (!this.shadowRoot) return;
    this.update();
  }

  render() {
    // === STYLE ===
    const style = document.createElement("style");
    style.textContent = `
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
    `;

    // === ROOT CONTAINER ===
    this._wrapper = document.createElement("div");
    this._wrapper.className = "tech-docs-table";

    // Header (optional)
    this._header = document.createElement("div");
    this._header.className = "tech-docs-table-header";

    // Table
    this._table = document.createElement("table");

    this._thead = document.createElement("thead");
    this._tbody = document.createElement("tbody");

    this._table.append(this._thead, this._tbody);

    this._wrapper.append(this._header, this._table);
    this.shadowRoot.append(style, this._wrapper);

    this.update();
  }

  update() {
    const title = this.getAttribute("title") || "";

    const columns = (this.getAttribute("columns") || "Name,Type,Description")
      .split(",")
      .map(c => c.trim());

    // === HEADER ===
    this._header.textContent = title;
    this._header.style.display = title ? "" : "none";

    // === TABLE HEAD ===
    this._thead.innerHTML = "";
    const headRow = document.createElement("tr");

    columns.forEach(col => {
      const th = document.createElement("th");
      th.textContent = col;
      headRow.appendChild(th);
    });

    this._thead.appendChild(headRow);

    // === TABLE BODY ===
    this._tbody.innerHTML = "";

    const rows = Array.from(this.querySelectorAll("tech-docs-row"));

    rows.forEach(rowEl => {
      const row = {
        name: rowEl.getAttribute("name") || "",
        type: rowEl.getAttribute("type") || "",
        desc: rowEl.textContent.trim() // safer than innerHTML
      };

      const tr = document.createElement("tr");

      columns.forEach(col => {
        const td = document.createElement("td");

        switch (col.toLowerCase()) {
          case "name":
          case "parameter":
          case "value": {
            const code = document.createElement("code");
            code.textContent = row.name;
            td.appendChild(code);
            break;
          }

          case "type":
            td.textContent = row.type;
            break;

          case "description":
            td.textContent = row.desc;
            break;

          default:
            td.textContent = "";
        }

        tr.appendChild(td);
      });

      this._tbody.appendChild(tr);
    });
  }
}

customElements.define("tech-docs-table", TechDocsTable);