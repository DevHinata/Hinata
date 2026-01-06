class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="mt-20 pb-6 flex justify-center">
        <div class="glass-footer px-6 py-3 rounded-2xl text-center text-sm shadow-lg backdrop-blur-md bg-white/10 border border-white/20">
          <p class="opacity-70">© ${new Date().getFullYear()} — All Rights Reserved.</p>
        </div>
      </footer>
    `;
  }
}
customElements.define("custom-footer", CustomFooter);
