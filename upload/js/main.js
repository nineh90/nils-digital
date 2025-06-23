// Menü 

function toggleMenu() {
  const nav = document.getElementById("main-nav");
  nav.classList.toggle("hidden");
}

// === Begrüßung in mehreren Sprachen mit Tageszeit ===
const greetings = {
  morning: ["Guten Morgen", "Good morning", "Bonjour", "Buenos días", "Buongiorno"],
  midday: ["Mahlzeit!", "Good day", "Bon après-midi", "Buen día", "Buon pomeriggio"],
  evening: ["Guten Abend", "Good evening", "Bonsoir", "Buenas noches", "Buona sera"],
  night: ["Gute Nacht", "Sleep well", "Bonne nuit", "Buenas noches", "Buona notte"]
};

function getTimePeriod() {
  const hour = new Date().getHours();
  if (hour < 10) return "morning";
  if (hour < 17) return "midday";
  if (hour < 21) return "evening";
  return "night";
}

function rotateGreetings() {
  const el = document.getElementById("begruessung");
  if (!el) return;

  const zeit = getTimePeriod();
  const liste = greetings[zeit];
  let i = 0;

  function zeigeBegruessung() {
    el.classList.remove("visible");
    setTimeout(() => {
      el.textContent = liste[i % liste.length] + " 👋";
      el.classList.add("visible");
      i++;
    }, 300);
  }
  zeigeBegruessung();
  setInterval(zeigeBegruessung, 6000);
}

window.addEventListener("DOMContentLoaded", () => {
  rotateGreetings();
});


