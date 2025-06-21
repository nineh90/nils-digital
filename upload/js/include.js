function loadComponent(id, file) {
  fetch("/components/" + file)
    .then(response => response.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;

      // Prüfen, ob Header geladen wurde
      if (id === "header") {
        console.log("Header geladen!");
        initMenu(); // Menü erst jetzt aktivieren
      }
    })
    .catch(error => console.error("Fehler beim Laden von", file, error));
}

function initMenu() {
  const btn = document.querySelector(".hamburger");
  const nav = document.getElementById("main-nav");

  if (!btn || !nav) {
    console.warn("Menüelemente fehlen.");
    return;
  }

  btn.addEventListener("click", () => {
    nav.classList.toggle("hidden");
    console.log("Menü umgeschaltet!");
  });
}

window.addEventListener("DOMContentLoaded", () => {
  loadComponent("header", "header.html");
  loadComponent("footer", "footer.html");
});
