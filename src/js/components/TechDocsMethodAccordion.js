class TechDocsMethodAccordion extends HTMLElement {
  static get observedAttributes() {
    return ["title", "open"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    // Prevent duplicate render
    if (this.shadowRoot.children.length > 0) return;

    // === Elements ===
    const style = document.createElement("style");
    style.textContent = `
      details {
        background: rgba(255, 255, 255, 0.95);
        color: #1f1f1f;
        border: 1px solid rgba(0, 0, 0, 0.2);
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
    `;

    this._details = document.createElement("details");

    const summary = document.createElement("summary");
    this._code = document.createElement("code");
    this._code.textContent = this.getAttribute("title") || "";

    summary.appendChild(this._code);

    const content = document.createElement("div");
    content.className = "content";

    const slot = document.createElement("slot");
    content.appendChild(slot);

    this._details.append(summary, content);

    // Handle default open state
    if (this.hasAttribute("open")) {
      this._details.setAttribute("open", "");
    }

    // Emit toggle event
    this._details.addEventListener("toggle", () => {
      this.dispatchEvent(
        new CustomEvent("toggle", {
          detail: { open: this._details.open },
        })
      );
    });

    this.shadowRoot.append(style, this._details);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.shadowRoot) return;

    if (name === "title" && this._code) {
      this._code.textContent = newValue || "";
    }

    if (name === "open" && this._details) {
      if (this.hasAttribute("open")) {
        this._details.setAttribute("open", "");
      } else {
        this._details.removeAttribute("open");
      }
    }
  }
}

customElements.define("tech-docs-method-accordion", TechDocsMethodAccordion);
