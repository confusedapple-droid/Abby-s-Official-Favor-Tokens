const SECRET_UNLOCK = "abby siervo";
const RESET_PASSWORD = "apple";
const TOTAL = 6;

const unlockInput = document.getElementById("unlockInput");
const lockScreen = document.getElementById("lockScreen");
const card = document.getElementById("card");
const grid = document.getElementById("tokenGrid");
const resetInput = document.getElementById("resetInput");

// Load saved state
let tokens = JSON.parse(localStorage.getItem("tokens"));
if (!tokens || tokens.length !== TOTAL) {
  tokens = Array(TOTAL).fill(false);
}

/* =====================
   UNLOCK
===================== */
function unlock() {
  if (unlockInput.value.trim().toLowerCase() === SECRET_UNLOCK) {
    lockScreen.classList.add("hidden");
    card.classList.remove("hidden");
    loadTokens();
  } else {
    alert("Incorrect access phrase");
  }
}

/* =====================
   LOAD TOKENS
===================== */
function loadTokens() {
  grid.innerHTML = "";

  tokens.forEach((redeemed, i) => {
    const t = document.createElement("div");
    t.className = "token";
    t.textContent = redeemed ? "REDEEMED" : "TAP";

    if (redeemed) t.classList.add("redeemed");

    t.addEventListener("click", () => redeem(i));
    grid.appendChild(t);
  });
}

/* =====================
   REDEEM
===================== */
function redeem(i) {
  if (tokens[i]) return;
  tokens[i] = true;
  save();
  loadTokens();
}

/* =====================
   RESET
===================== */
function resetTokens() {
  if (resetInput.value !== RESET_PASSWORD) {
    alert("Wrong password");
    return;
  }
  tokens = Array(TOTAL).fill(false);
  save();
  loadTokens();
}

/* =====================
   SAVE
===================== */
function save() {
  localStorage.setItem("tokens", JSON.stringify(tokens));
}

/* =====================
   DARK MODE
===================== */
function toggleDark() {
  document.body.classList.toggle("dark");
}

/* =====================
   FLIP CARD
===================== */
function flipCard() {
  card.classList.toggle("flipped");

  // Always scroll to top when flipping (mobile fix)
  card.querySelector(".card-inner").scrollTop = 0;
}

/* =====================
   SWIPE TO FLIP (MOBILE)
===================== */
let startX = 0;

card.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

card.addEventListener("touchend", e => {
  const deltaX = e.changedTouches[0].clientX - startX;
  if (Math.abs(deltaX) > 50) {
    flipCard();
  }
});
