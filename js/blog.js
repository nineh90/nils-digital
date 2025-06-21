let blogTexte = {};

function ladeBlog() {
  fetch("../data/blog.json")
    .then(res => res.json())
    .then(data => {
      blogTexte = {}; // leeren
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
  const container = document.getElementById("blog-detail");
  const content = document.getElementById("blog-content");
  const beitrag = blogTexte[id];

  if (beitrag) {
    content.innerHTML = `<h2>${beitrag.title}</h2>${beitrag.content}`;
    container.classList.remove("hidden");
    window.scrollTo(0, container.offsetTop);
  }
}

function versteckeBeitrag() {
  document.getElementById("blog-detail").classList.add("hidden");
  document.getElementById("blog-content").innerHTML = "";
}

window.addEventListener("DOMContentLoaded", ladeBlog);
