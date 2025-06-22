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

  if (!btn || !nav) {
    console.warn("⚠️ Menüelemente nicht gefunden.");
    return;
  }

  btn.addEventListener("click", () => {
    nav.classList.toggle("hidden");
    console.log("☰ Menü umgeschaltet!");
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
