function loadComponent(id, file, callback) {
  fetch("/components/" + file)
    .then(response => response.text())
    .then(data => {
      const target = document.getElementById(id);
      if (target) {
        target.innerHTML = data;
        if (id === "header") {
          initMenu();
        }
        if (typeof callback === "function") {
          callback();
        }
      } else {
        console.warn("⚠️ Zielcontainer '" + id + "' nicht gefunden.");
      }
    })
    .catch(error => console.error("❌ Fehler beim Laden von '" + file + "':", error));
}

function initMenu() {
  const btn = document.querySelector(".hamburger");
  const nav = document.getElementById("main-nav");
  const icons = document.querySelectorAll(".hamburger span")

  if (!btn || !nav) {
    console.warn("⚠️ Menüelemente nicht gefunden.");
    return;
  }

  btn.addEventListener("click", () => {
        nav.classList.toggle("max-h-0");
    nav.classList.toggle("opacity-0");
    nav.classList.toggle("opacity-100");
    nav.classList.toggle("max-h-96");
    icons.forEach(icon => icon.classList.toggle("hidden"));
  });
}

window.addEventListener("DOMContentLoaded", () => {
  loadComponent("header", "header.html");

  loadComponent("footer", "footer.html", () => {
    // Wenn Footer fertig geladen, prüfen ob die Spendencontainer existieren
    if (document.getElementById("spendenbereich")) {
      loadComponent("spendenbereich", "spendenbox.html");
    }

    if (document.getElementById("spendenbox-klein")) {
      loadComponent("spendenbox-klein", "spendenbox-mini.html");
    }
  });
});
