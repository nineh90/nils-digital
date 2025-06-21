let blogTexte = {};

function ladeBlog() {
  fetch("../data/blog.json")
    .then(res => res.json())
    .then(data => {
      blogTexte = {};
      const grid = document.querySelector(".blog-grid");
      data.forEach(beitrag => {
        blogTexte[beitrag.id] = beitrag;
        const card = document.createElement("div");
        card.className = "blog-card";
        card.onclick = () => zeigeBeitrag(beitrag.id);
        card.innerHTML = `<h3>${beitrag.title}</h3><p>${beitrag.teaser}</p>`;
        grid.appendChild(card);
      });
    })
    .catch(err => console.error("Fehler beim Laden der Blogdaten:", err));
}

function zeigeBeitrag(id) {
  const beitrag = blogTexte[id];
  if (!beitrag) return;

  const contentHTML = beitrag.content
    .map(part => {
      if (part.type === "text") {
        return `<p>${part.value}</p>`;
      } else if (part.type === "image") {
        return `<img src="${part.src}" alt="${part.alt || ''}">`;
      }
      return "";
    })
    .join("");

  const overlay = document.createElement("div");
  overlay.className = "popup-overlay";
  overlay.id = "popup-overlay";
  overlay.innerHTML = `
    <section id="blog-detail">
      <button onclick="versteckeBeitrag()">Zurück</button>
      <div id="blog-content">
        <h2>${beitrag.title}</h2>
        ${contentHTML}
      </div>
    </section>
  `;
  document.body.appendChild(overlay);
}


function versteckeBeitrag() {
  const overlay = document.getElementById("popup-overlay");
  if (overlay) {
    overlay.remove();
  }
}

window.addEventListener("DOMContentLoaded", ladeBlog);
