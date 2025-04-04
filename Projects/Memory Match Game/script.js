const categories = {
  fruits: ["🍎", "🍌", "🍊", "🍇", "🍓", "🍍", "🍒", "🍐"],
  emojis: ["😀", "😎", "😍", "🤩", "😜", "😱", "🤯", "🥳"],
  animals: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"],
  planets: ["🪐", "🌍", "🌕", "☄️", "🌌", "✨", "🔭", "🚀"],
  flags: ["🇺🇸", "🇬🇧", "🇯🇵", "🇩🇪", "🇫🇷", "🇮🇹", "🇪🇸", "🇨🇦"],
};

let flippedCards = [];
let matches = 0;
let timer;
let timeLeft = 30;
let score = 0;

document.querySelectorAll(".category-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.dataset.category) {
      document.querySelector(".landing-container").style.display = "none";
      document.querySelector(".game-container").style.display = "block";
      startGame(btn.dataset.category);
    }
  });
});

function startGame(category) {
  const cards = [...categories[category], ...categories[category]]
    .sort(() => Math.random() - 0.5)
    .map((value, id) => ({ id, value }));

  const grid = document.querySelector(".cards-grid");
  grid.innerHTML = "";

  cards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.className = "card";
    cardElement.innerHTML = `
            <div class="card-back"></div>
            <div class="card-front">${card.value}</div>
        `;
    cardElement.addEventListener("click", () =>
      handleCardClick(cardElement, card)
    );
    grid.appendChild(cardElement);
  });

  resetGameState();
  startTimer();
}

function handleCardClick(cardElement, card) {
  if (flippedCards.length < 2 && !cardElement.classList.contains("flipped")) {
    cardElement.classList.add("flipped");
    flippedCards.push({ element: cardElement, value: card.value });

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.value === card2.value) {
    card1.element.classList.add("matched");
    card2.element.classList.add("matched");
    matches++;
    score += 100;
    document.getElementById("score").textContent = score;

    if (matches === 8) {
      endGame(true);
    }
  } else {
    setTimeout(() => {
      card1.element.classList.remove("flipped");
      card2.element.classList.remove("flipped");
    }, 1000);
  }

  flippedCards = [];
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame(false);
    }
  }, 1000);
}

function endGame(won) {
  clearInterval(timer);
  alert(won ? `You won! Score: ${score}` : `Game Over! Score: ${score}`);
  document.querySelector(".game-container").style.display = "none";
  document.querySelector(".landing-container").style.display = "block";
}

function resetGameState() {
  flippedCards = [];
  matches = 0;
  score = 0;
  timeLeft = 30;
  document.getElementById("score").textContent = "0";
  document.getElementById("timer").textContent = "30";
  clearInterval(timer);
}
