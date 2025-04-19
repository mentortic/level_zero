document.addEventListener("DOMContentLoaded", () => {
  const themeBtn = document.getElementById("bd-theme");
  const toggleIcon = themeBtn.querySelector(".theme-icon-active");
  const options = document.querySelectorAll("[data-bs-theme-value]");

  // Mapa de tema → clase de ícono
  const iconClasses = {
    light: "bi-sun-fill",
    dark: "bi-moon-stars-fill",
    auto: "bi-circle-half",
  };

  options.forEach((btn) => {
    btn.addEventListener("click", () => {
      const theme = btn.dataset.bsThemeValue;

      // 1. Aplicar clases al <body>
      document.body.classList.toggle("light-theme", theme === "light");
      document.body.classList.toggle(
        "dark-theme",
        theme === "dark" || theme === "auto"
      );

      // 2. Cambiar ícono del botón
      const ic = iconClasses[theme];
      toggleIcon.className = `bi theme-icon-active me-2 ${ic}`;

      // 3. Marcar opción activa en el menú
      options.forEach((o) => {
        const active = o === btn;
        o.classList.toggle("active", active);
        o.querySelector(".bi-check2").classList.toggle("d-none", !active);
        o.setAttribute("aria-pressed", String(active));
      });
    });
  });

  // Inicializar icono en función de la clase que tenga el <body>:
  // (por si cargas con dark-theme por defecto)
  const initTheme = document.body.classList.contains("light-theme")
    ? "light"
    : document.body.classList.contains("dark-theme")
    ? "dark"
    : "auto";
  toggleIcon.classList.add(iconClasses[initTheme]);
});
