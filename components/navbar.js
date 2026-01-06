class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="fixed top-0 left-0 w-full z-50 flex justify-center px-4 pt-5">
        <nav class="liquid-nav py-3 px-6 rounded-2xl shadow-xl backdrop-blur-xl flex gap-6 text-sm font-medium">
          <a href="#home" class="hover:opacity-80 transition-opacity">Home</a>
          <a href="#projects" class="hover:opacity-80 transition-opacity">Projects</a>
          <a href="#tools" class="hover:opacity-80 transition-opacity">Tools</a>
          <a href="#contact" class="hover:opacity-80 transition-opacity">Contact</a>
        </nav>
      </header>
    `;
  }
}
customElements.define("custom-navbar", CustomNavbar);
