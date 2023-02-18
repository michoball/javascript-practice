class InfoBox extends HTMLElement {
  constructor() {
    super();
    this.isHidden = true;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
        <style>
        #info-box {
            display: none;
          }
      </style>
        <button>Show</button>
        <p id="info-box"><slot></slot></p>
        `;

    this.infoEl = this.shadowRoot.querySelector("p");
    this.button = this.shadowRoot.querySelector("button");
    this.button.addEventListener("click", this._toggleInfo.bind(this));
  }

  connectedCallback() {
    if (this.hasAttribute("isVisible")) {
      if (this.getAttribute("isVisible") === "true") {
        this.isHidden = true;
        this.infoEl.style.display = "block";
        this.button.textContent = "Hide";
      }
    }
  }

  _toggleInfo() {
    this.isHidden = !this.isHidden;
    this.infoEl.style.display = this.isHidden ? "none" : "block";
    this.button.textContent = this.isHidden ? "Show" : "Hide";
  }
}

customElements.define("mk-info-box", InfoBox);
