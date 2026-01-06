class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="mt-20 pb-6 flex justify-center">
        <div class="glass-footer px-6 py-3 rounded-2xl text-center text-sm shadow-lg backdrop-blur-md bg-white/10 border border-white/20">
          <p class="opacity-70">© ${new Date().getFullYear()} 一 Hɩňʌtʌ ᯓᡣ𐭩 — All Rights Reserved.</p>
          <p class="opacity-50 text-xs mt-1">Built with 💝 and creative coding</p>
        </div>
      </footer>
    `;
  }
}
customElements.define("custom-footer", CustomFooter);
