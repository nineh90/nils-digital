let blogTexte = {};

function ladeBlog() {
  fetch("../data/blog.json")
    .then(res => res.json())
    .then(data => {
      blogTexte = {};
      const grid = document.querySelector(".blog-grid");
      grid.innerHTML = "";
      data.forEach(beitrag => {
        blogTexte[beitrag.id] = beitrag;
        const card = document.createElement("div");
        card.className = "blog-card";
        card.onclick = () => zeigeBeitrag(beitrag.id);
        card.innerHTML = `<h3>${beitrag.title}</h3><p>${beitrag.teaser}</p>`;
        grid.appendChild(card);
      });
      generiereKategorieButtons(data);
    })
    .catch(err => console.error("Fehler beim Laden der Blogdaten:", err));
}

function generiereKategorieButtons(blogdaten) {
  const container = document.getElementById("themen-filter");
  if (!container) return;

  const kategorienSet = new Set();

  blogdaten.forEach(beitrag => {
    if (Array.isArray(beitrag.categories)) {
      beitrag.categories.forEach(cat => kategorienSet.add(cat));
    }
  });

  // „Alle Beiträge“ Button
  const alleBtn = document.createElement("button");
  alleBtn.className = "filter-btn";
  alleBtn.textContent = "Alle Beiträge";
  alleBtn.dataset.kategorie = "alle";
  alleBtn.addEventListener("click", () => filtereBeitraege("alle", blogdaten));
  container.appendChild(alleBtn);

  // Buttons aus Set generieren
  kategorienSet.forEach(kategorie => {
    const btn = document.createElement("button");
    btn.className = "filter-btn";
    btn.textContent = kategorie;
    btn.dataset.kategorie = kategorie;
    btn.addEventListener("click", () => filtereBeitraege(kategorie, blogdaten));
    container.appendChild(btn);
  });
}

function filtereBeitraege(kategorie, blogdaten) {
  const grid = document.querySelector(".blog-grid");
  if (!grid) return;
  grid.innerHTML = "";

  const gefiltert = blogdaten.filter(beitrag => {
    if (kategorie === "alle") return true;
    return Array.isArray(beitrag.categories) && beitrag.categories.includes(kategorie);
  });

  gefiltert.forEach(beitrag => {
    blogTexte[beitrag.id] = beitrag; // Aktualisieren
    const card = document.createElement("div");
    card.className = "blog-card";
    card.onclick = () => zeigeBeitrag(beitrag.id);
    card.innerHTML = `<h3>${beitrag.title}</h3><p>${beitrag.teaser}</p>`;
    grid.appendChild(card);
  });
}


function zeigeBeitrag(id) {
  const beitrag = blogTexte[id];
  if (!beitrag) return;

  const contentHTML = erstelleContentHTML(beitrag.content);
  const overlay = erstelleOverlay(beitrag.title, contentHTML);
  document.body.appendChild(overlay);

  // Komponente(n) nachladen
  setTimeout(() => {
    ladeKomponente("spendeblog", "../components/spendenbox.html");
    ladeKomponente("spendeblog-mini", "../components/spendenbox-mini.html");
    aktualisiereSprueche("sprueche-mini"); // fügt zufälligen Spruch ein
  }, 50);
}

// 🧩 Hilfsfunktion: Content verarbeiten
function erstelleContentHTML(content) {
  return content
    .map(part => {
      if (part.type === "text") {
        return `<p>${part.value}</p>`;
      } else if (part.type === "image") {
        return `<img src="${part.src}" alt="${part.alt || ''}">`;
      } else if (part.type === "html") {
        return part.value;
      }
      return "";
    })
    .join("");
}

// 🧩 Hilfsfunktion: Overlay erzeugen
function erstelleOverlay(title, contentHTML) {
  document.body.classList.add("overflow-hidden");
  const overlay = document.createElement("div");
  overlay.className = "popup-overlay";
  overlay.id = "popup-overlay";
  overlay.innerHTML = 
                    `
                      <section id="blog-detail" class="pt-6">
                        <button id="closeX" onclick="versteckeBeitrag()">X</button>
                        <div id="blog-content">
                          <h2>${title}</h2>
                          ${contentHTML}
                        </div>      
                        <div class="w-full flex justify-end">
                          <button id="closeBtn" onclick="versteckeBeitrag()">Zurück</button>
                        </div>
                      </section>
                    `;
  return overlay;
}

// 🧩 Hilfsfunktion: HTML-Komponente laden
function ladeKomponente(id, quelle) {
  const ziel = document.getElementById(id);
  if (!ziel) return;
  fetch(quelle)
    .then(res => res.text())
    .then(html => {
      ziel.innerHTML = html;
    })
    .catch(err => console.warn(`Komponente ${id} konnte nicht geladen werden:`, err));
}

// 🧩 Sprüche zufällig einfügen (aus bereits existierender Variable `sprueche`)
function aktualisiereSprueche(id) {
  const ziel = document.getElementById(id);
  if (!ziel || typeof sprueche === "undefined" || !Array.isArray(sprueche)) return;
  const zufall = Math.floor(Math.random() * sprueche.length);
  ziel.innerHTML = `<p class="spruch">${sprueche[zufall]}</p>`;
}


function versteckeBeitrag() {
  const overlay = document.getElementById("popup-overlay");
  if (overlay) {
    document.body.classList.remove("overflow-hidden");
    overlay.remove();
  }
}

window.addEventListener("DOMContentLoaded", ladeBlog);
