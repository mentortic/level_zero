// courses.js — Menú dinámico con chevron, formulario y lógica de vídeo con Prev/Next

let awaitingSubmission = false;
let currentCategory = null;
let currentIndex = -1;

document.addEventListener("DOMContentLoaded", () => {
  buildSidebar(); // 1. Monta el menú desde videoData
  setupMenuListeners(); // 2. Click en vídeos
  setupPrevNextButtons(); // 3. Prev/Next
  // 4. Mostrar form o vídeo tras recarga
  if (localStorage.getItem("filledForm") === "true") {
    hideForm();
  } else {
    setupFormListener();
  }
});

/** 1️⃣ Construye el sidebar con chevron */
function buildSidebar() {
  const ul = document.getElementById("sidebar-list");
  let idx = 0;
  for (const [cat, vids] of Object.entries(window.videoData)) {
    idx++;
    const cid = `cat-${idx}`;

    // Botón colapsable
    const btn = document.createElement("button");
    btn.className = `btn btn-toggle d-inline-flex align-items-center rounded${
      idx > 1 ? " collapsed" : ""
    }`;
    btn.dataset.bsToggle = "collapse";
    btn.dataset.bsTarget = `#${cid}`;
    btn.ariaExpanded = idx === 1;

    // Chevron icon
    const chevron = document.createElement("i");
    chevron.className = "bi bi-chevron-right me-2";

    // Texto de categoría
    const text = document.createTextNode(cat.replace(/_/g, " "));

    btn.append(chevron, text);

    // Lista interna
    const inner = document.createElement("div");
    inner.id = cid;
    inner.className = `collapse${idx === 1 ? " show" : ""}`;
    const list = document.createElement("ul");
    list.className = "btn-toggle-nav list-unstyled fw-normal small";

    vids.forEach((v, i) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#";
      a.dataset.category = cat;
      a.dataset.index = i;
      a.textContent = v.title;
      li.append(a);
      list.append(li);
    });

    inner.append(list);

    // Empaquetar y añadir al UL
    const wrap = document.createElement("li");
    wrap.className = "mb-1";
    wrap.append(btn, inner);
    ul.append(wrap);
  }
}

/** 2️⃣ Click en vídeo (sólo si form enviado) */
function setupMenuListeners() {
  document.querySelectorAll("#sidebar-list a[data-category]").forEach((link) =>
    link.addEventListener("click", (e) => {
      e.preventDefault();
      if (localStorage.getItem("filledForm") !== "true") return;
      currentCategory = link.dataset.category;
      currentIndex = +link.dataset.index;
      updateVideo(); // carga vídeo y actualiza UI
    })
  );
}

/** 3️⃣ Configura Prev/Next */
function setupPrevNextButtons() {
  document.getElementById("prev-btn").addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateVideo();
    }
  });
  document.getElementById("next-btn").addEventListener("click", () => {
    const arr = window.videoData[currentCategory];
    if (currentIndex < arr.length - 1) {
      currentIndex++;
      updateVideo();
    }
  });
}

/** Carga el iframe, oculta bienvenida y muestra Prev/Next */
function updateVideo() {
  // 1) Iframe
  document.getElementById("video-frame").src =
    window.videoData[currentCategory][currentIndex].src;

  // 2) Oculta mensaje de bienvenida
  document.getElementById("welcome-message").style.display = "none";

  // 3) Muestra contenedor de vídeo
  const vc = document.getElementById("video-container");
  vc.classList.remove("d-none");
  vc.style.display = "flex";

  // 4) Actualiza Prev/Next
  const prev = document.getElementById("prev-btn");
  const next = document.getElementById("next-btn");
  prev.classList.toggle("d-none", currentIndex <= 0);
  next.classList.toggle(
    "d-none",
    currentIndex >= window.videoData[currentCategory].length - 1
  );

  // 5) Cierra sidebar en móvil
  bootstrap.Collapse.getOrCreateInstance(
    document.getElementById("sidebar")
  ).hide();
}

/** 4️⃣ Lógica de formulario (obligar envío) */
function setupFormListener() {
  const form = document.getElementById("info-form");
  const iframe = document.getElementById("hidden_iframe");
  iframe.addEventListener("load", () => {
    if (!awaitingSubmission) return;
    awaitingSubmission = false;
    localStorage.setItem("filledForm", "true");
    hideForm();
  });
  form.addEventListener("submit", () => {
    if (form.checkValidity()) awaitingSubmission = true;
  });
}

/** Oculta el form y muestra el bloque de vídeo (con bienvenida) */
function hideForm() {
  document.getElementById("form-container").style.display = "none";
  const vc = document.getElementById("video-container");
  vc.classList.remove("d-none");
  vc.style.display = "flex";
}
