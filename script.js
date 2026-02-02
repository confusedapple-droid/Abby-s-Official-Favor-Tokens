// PASSWORDS
const ACCESS_PASSWORD = 'Abby Siervo';
const RESET_PASSWORD = 'apple';

// UI
const lockScreen = document.getElementById('lockScreen');
const appCard = document.getElementById('appCard');
const unlockBtn = document.getElementById('unlockBtn');
const accessPassword = document.getElementById('accessPassword');
const lockStatus = document.getElementById('lockStatus');

const redeemBtn = document.getElementById('redeemBtn');
const resetCode = document.getElementById('resetCode');
const statusText = document.getElementById('status');
const tokenDisplay = document.getElementById('tokenDisplay');

/* Firebase config (REPLACE WITH YOUR OWN) */
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT.firebaseio.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const tokenRef = db.ref('token/current');

/* Password gate */
unlockBtn.onclick = () => {
  if (accessPassword.value === ACCESS_PASSWORD) {
    lockScreen.classList.add('hidden');
    appCard.classList.remove('hidden');
  } else {
    lockStatus.textContent = 'Incorrect password';
  }
};

/* Sync token in real time */
tokenRef.on('value', snapshot => {
  const token = snapshot.val() || 1;
  tokenDisplay.textContent = 'Token: ' + token;
});

/* Redeem token */
redeemBtn.onclick = () => {
  if (resetCode.value !== RESET_PASSWORD) {
    statusText.textContent = 'Invalid reset code';
    return;
  }

  tokenRef.transaction(current => {
    return (current || 1) + 1;
  });

  statusText.textContent = 'Token redeemed!';
  resetCode.value = '';
};
