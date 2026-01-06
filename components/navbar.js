class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="fixed top-0 left-0 w-full z-50 flex flex-col items-center gap-2 pt-4 pointer-events-none">
        
        <div id="weather-widget" class="hidden pointer-events-auto px-4 py-1.5 rounded-full backdrop-blur-md bg-white/10 border border-white/20 shadow-lg text-xs font-medium text-white/90 animate-fade-in transition-all hover:bg-white/20 cursor-default flex items-center gap-2">
          <span id="weather-icon">Checking...</span>
          <span id="weather-temp"></span>
        </div>

        <nav class="pointer-events-auto liquid-nav py-3 px-6 rounded-2xl shadow-xl backdrop-blur-xl flex gap-6 text-sm font-medium transition-transform hover:scale-[1.02]">
          <a href="index.html" class="hover:text-blue-300 transition-colors">Home</a>
          <a href="#projects" class="hover:text-blue-300 transition-colors">Projects</a>
          <a href="#tools" class="hover:text-blue-300 transition-colors">Tools</a>
          <a href="#contact" class="hover:text-blue-300 transition-colors">Contact</a>
        </nav>

      </header>

      <style>
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
      </style>
    `;

    this.initWeather();
  }

  initWeather() {
    const widget = this.querySelector('#weather-widget');
    const iconEl = this.querySelector('#weather-icon');
    const tempEl = this.querySelector('#weather-temp');

    // WMO Weather Codes to Emojis
    const getWeatherIcon = (code) => {
      const icons = {
        0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️', 
        45: '🌫️', 48: '🌫️', 
        51: 'DRIZZLE', 53: 'DRIZZLE', 55: 'DRIZZLE',
        61: '☔', 63: '☔', 65: '☔', 
        80: '🌧️', 81: '🌧️', 82: '🌧️',
        95: '⚡', 96: '⚡', 99: '⚡'
      };
      return icons[code] || '🌡️'; // Default
    };

    // 1. Get Location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.fetchWeather(latitude, longitude, widget, iconEl, tempEl, getWeatherIcon);
        },
        (error) => {
          // Fallback: Default to Dhaka, Bangladesh if permission denied
          console.log("Location denied, using fallback.");
          this.fetchWeather(23.8103, 90.4125, widget, iconEl, tempEl, getWeatherIcon);
        }
      );
    } else {
      // Fallback if geolocation not supported
      this.fetchWeather(23.8103, 90.4125, widget, iconEl, tempEl, getWeatherIcon);
    }
  }

  fetchWeather(lat, lon, widget, iconEl, tempEl, getIcon) {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
      .then(res => res.json())
      .then(data => {
        const { temperature, weathercode } = data.current_weather;
        
        iconEl.textContent = getIcon(weathercode);
        tempEl.textContent = `${Math.round(temperature)}°C`;
        
        // Show the widget
        widget.classList.remove('hidden');
        widget.classList.add('flex');
      })
      .catch(err => console.error("Weather fetch failed:", err));
  }
}

customElements.define("custom-navbar", CustomNavbar);
