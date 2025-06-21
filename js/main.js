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

  // Direkt starten
  zeigeBegruessung();

  // Dann alle 6 Sekunden wiederholen
  setInterval(zeigeBegruessung, 6000);
}

// === Sprüche-Rotation ===
const sprueche = [
  "Manchmal ist Plan B besser als Plan A 😄🛠️",
  "Lächeln ist die eleganteste Art, dem Tag zu begegnen. 😊🌞",
  "Heute schon gedacht? Morgen wird besser! 💭🌈",
  "Gönn dir ’ne Pause – du bist nicht Google. ☕💤",
  "Code kann warten. Kaffee nicht ☕⌛",
  "Wenn Sunny könnte, würde sie jetzt auch scrollen 🐾📱",
  "Nimm das Leben nicht zu ernst – es nimmt dich auch nicht ernst. 😎🎈",
  "Nur weil es nicht im Kalender steht, heißt das nicht, dass es unwichtig ist 📅🤔",
  "Fehler sind die besten Lehrer – auch wenn sie nerven. 📚😅",
  "Einfach mal machen. Wird schon irgendwie. ✌️🚀",
  "Kreativität beginnt da, wo der Plan aufhört. 🎨🌀",
  "Gedanken sortieren ist wie Schubladen aufräumen – dauert, lohnt sich 🧠🗂️",
  "Der beste Plan? Spontan. 🎯🔄",
  "Nicht perfekt ist auch okay. 💡🧩",
  "Sunny findet dich klasse – und sie hat Geschmack 🐶💛",
  "Wer fragt, führt. Wer lacht, lebt. 🙋‍♂️😂",
  "Nur weil du Pause machst, heißt das nicht, dass du aufgibst. ✌️⏸️",
  "Mut heißt nicht laut sein. Manchmal ist es einfach nur 'trotzdem weiter'. 💪🌙",
  "Digitale Welt – echte Gefühle. 💻❤️",
  "Hast du heute schon dein Lieblings-Ich gesehen? 🪞⭐",
  "Ein leeres Textfeld ist auch ein Anfang. ✍️📄",
  "Lernen darf Spaß machen – und manchmal Unsinn 🧠🎉",
  "Weniger scrollen, mehr erleben. (nach dieser Seite 😁) 📵🌳",
  "Sunny sagt: Lieber Pfote geben als aufgeben 🐾🤝",
  "Heute ein Held sein – reicht schon für dich selbst. 🦸‍♂️✨"
];

function rotateSprueche() {
  const el = document.getElementById("spruch-des-moments");
  if (!el) return;

  el.style.textAlign = "center";

  let lastIndex = -1;

  function zeigeZufaelligenSpruch() {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * sprueche.length);
    } while (newIndex === lastIndex);

    el.classList.remove("visible");
    setTimeout(() => {
      el.textContent = sprueche[newIndex];
      el.classList.add("visible");
      lastIndex = newIndex;
    }, 300);
  }

  // 👉 Gleich beim Start einen Spruch anzeigen
  zeigeZufaelligenSpruch();

  // 👉 Dann alle 6 Sekunden rotieren
  setInterval(zeigeZufaelligenSpruch, 6000);
}



window.addEventListener("DOMContentLoaded", () => {
  rotateGreetings();
  rotateSprueche();
});


