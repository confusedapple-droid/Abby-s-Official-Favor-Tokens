const SECRET_UNLOCK = "Abby Siervo";
const RESET_PASSWORD = "apple";
const TOTAL = 6;

const unlockInput = document.getElementById("unlockInput");
const lockScreen = document.getElementById("lockScreen");
const card = document.getElementById("card");
const grid = document.getElementById("tokenGrid");
const resetInput = document.getElementById("resetInput");

// localStorage fallback (GitHub-only)
let tokens = JSON.parse(localStorage.getItem("tokens")) || Array(TOTAL).fill(false);

function unlock() {
  const input = unlockInput.value.trim().toLowerCase();

  if (input === "abby siervo") {
    lockScreen.classList.add("hidden");
    card.classList.remove("hidden");
    loadTokens();
  } else {
    alert("Incorrect access phrase");
  }
}

function loadTokens() {
  grid.innerHTML = "";

  tokens.forEach((redeemed, i) => {
    const t = document.createElement("div");
    t.className = "token";
    t.innerText = redeemed ? "REDEEMED" : "TAP";

    if (redeemed) t.classList.add("redeemed");

    t.onclick = () => redeem(i);
    grid.appendChild(t);
  });
}

function redeem(i) {
  if (tokens[i]) return;
  tokens[i] = true;
  save();
  loadTokens();
}

function resetTokens() {
  if (resetInput.value !== RESET_PASSWORD) {
    alert("Wrong password");
    return;
  }

  tokens = Array(TOTAL).fill(false);
  save();
  loadTokens();
}

function save() {
  localStorage.setItem("tokens", JSON.stringify(tokens));
}

function toggleDark() {
  document.body.classList.toggle("dark");
}

/* SWIPE TO FLIP */
let startX = 0;
card.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

card.addEventListener("touchend", e => {
  if (Math.abs(e.changedTouches[0].clientX - startX) > 50) {
    card.classList.toggle("flipped");
  }
});
