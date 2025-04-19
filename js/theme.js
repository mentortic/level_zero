/**
 * theme.js — Lógica para el dropdown de cambio de tema
 */
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("bd-theme");
  const icon = toggleBtn.querySelector(".theme-icon-active");
  const options = document.querySelectorAll("[data-bs-theme-value]");

  // Mapa de tema → clase de Bootstrap Icon
  const iconMap = {
    light: "bi-sun-fill",
    dark: "bi-moon-stars-fill",
    auto: "bi-moon-stars-fill", // "auto" = mismo que dark
  };

  // 1. Configurar listener en cada opción
  options.forEach((btn) => {
    btn.addEventListener("click", () => {
      const theme = btn.dataset.bsThemeValue;
      const isDark = theme === "dark" || theme === "auto";

      // 2. Aplicar las clases al <body>
      document.body.classList.toggle("light-theme", theme === "light");
      document.body.classList.toggle("dark-theme", isDark);

      // 3. Actualizar icono del toggle
      icon.className = `bi theme-icon-active me-2 ${iconMap[theme]}`;

      // 4. Marcar opción activa y mostrar/ocultar check
      options.forEach((o) => {
        const active = o === btn;
        o.classList.toggle("active", active);
        o.querySelector(".bi-check2").classList.toggle("d-none", !active);
        o.setAttribute("aria-pressed", String(active));
      });
    });
  });

  // 5. Inicializar icono según tema por defecto
  const initial = document.body.classList.contains("light-theme")
    ? "light"
    : "dark";
  icon.classList.add(iconMap[initial]);
});
