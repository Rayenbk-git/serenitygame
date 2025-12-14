const basket = document.getElementById("basket");
const scoreDiv = document.getElementById("score");
const bgMusic = document.getElementById("bgMusic");

let score = 0;
let showOnlyPositive = false; // affiche uniquement les bonnes feuilles si true

/* =====================
   DRAG DU BASKET
===================== */
let dragging = false;
let offsetX = 0;

basket.addEventListener("mousedown", (e) => {
  dragging = true;
  offsetX = e.clientX - basket.getBoundingClientRect().left;
});

document.addEventListener("mousemove", (e) => {
  if (!dragging) return;

  let x = e.clientX - offsetX;
  const maxX = window.innerWidth - basket.offsetWidth;

  basket.style.left = Math.max(0, Math.min(x, maxX)) + "px";
  basket.style.transform = "none";
});

document.addEventListener("mouseup", () => {
  dragging = false;
});

/* =====================
   FEUILLES
===================== */
const goodThoughts = ["Calme", "Espoir", "Confiance"];
const badThoughts = ["Stress", "Anxiété", "Burnout"];

function createLeaf() {
  const leaf = document.createElement("div");
  leaf.classList.add("leaf");

  // Si score >=50, on montre seulement les bonnes feuilles
  let isGood = showOnlyPositive ? true : Math.random() > 0.5;
  leaf.dataset.type = isGood ? "good" : "bad";

  // texte
  leaf.innerText = isGood
    ? goodThoughts[Math.floor(Math.random() * goodThoughts.length)]
    : badThoughts[Math.floor(Math.random() * badThoughts.length)];

  // image
  leaf.style.backgroundImage = isGood
    ? 'url("assets/happy.png")'
    : 'url("assets/unhappy.png")';
  leaf.style.backgroundSize = "contain";
  leaf.style.backgroundPosition = "center";
  leaf.style.backgroundRepeat = "no-repeat";

  // ajouter au body pour calculer offsetWidth
  document.body.appendChild(leaf);
  const leafWidth = leaf.offsetWidth || 100;
  leaf.style.left = Math.random() * (window.innerWidth - leafWidth) + "px";
  leaf.style.top = "-100px";

  fallLeaf(leaf);
}

/* =====================
   CHUTE FEUILLES
===================== */
function fallLeaf(leaf) {
  let y = -100;

  const interval = setInterval(() => {
    y += 2;
    leaf.style.top = y + "px";

    checkCollision(leaf, interval);

    if (y > window.innerHeight) {
      leaf.remove();
      clearInterval(interval);
    }
  }, 16);
}

/* =====================
   COLLISION
===================== */
function checkCollision(leaf, interval) {
  const l = leaf.getBoundingClientRect();
  const b = basket.getBoundingClientRect();

  if (
    l.bottom > b.top &&
    l.top < b.bottom &&
    l.left < b.right &&
    l.right > b.left
  ) {
    // MET À JOUR SCORE
    score += leaf.dataset.type === "good" ? 10 : -5;
    scoreDiv.textContent = "Score : " + score;

    // JOUER SON SELON TYPE
    const audio = new Audio(
      leaf.dataset.type === "good"
        ? "assets/collect.mp3"
        : "assets/reject.mp3"
    );
    audio.play();

    leaf.remove();
    clearInterval(interval);

    // CHANGE BACKGROUND SI SCORE >=50
    if (!showOnlyPositive && score >= 50) {
      showOnlyPositive = true; // active le mode feuilles positives seulement
      document.body.style.backgroundImage = 'url("assets/happysky.jpg")';
    }
  }// VERIFIE SI SCORE >=100 POUR CHATBOT
  if (score >= 100) {
    window.location.href = "chat.html";
  }

}

/* =====================
   LANCER LE JEU
===================== */
setInterval(createLeaf, 1500);
