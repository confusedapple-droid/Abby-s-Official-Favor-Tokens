const RESET_PASSWORD='apple';

const firebaseConfig={
  apiKey:'YOUR_API_KEY',
  authDomain:'YOUR_PROJECT.firebaseapp.com',
  databaseURL:'https://YOUR_PROJECT.firebaseio.com',
  projectId:'YOUR_PROJECT',
  storageBucket:'YOUR_PROJECT.appspot.com',
  messagingSenderId:'XXX',
  appId:'XXX'
};

firebase.initializeApp(firebaseConfig);
const db=firebase.database();
const tokensRef=db.ref('tokens');

const tokens=document.querySelectorAll('.token');
const rulesBtn=document.getElementById('rulesBtn');
const rulesCard=document.getElementById('rulesCard');
const resetBtn=document.getElementById('resetBtn');
const resetInput=document.getElementById('resetInput');
const resetStatus=document.getElementById('resetStatus');

tokensRef.on('value',snap=>{
  const data=snap.val()||{};
  tokens.forEach(t=>{
    const id=t.dataset.id;
    t.classList.toggle('redeemed',data[id]);
  });
});

tokens.forEach(t=>{
  t.onclick=()=>{
    const id=t.dataset.id;
    tokensRef.child(id).transaction(v=>v?true:true);
  };
});

rulesBtn.onclick=()=>{
  rulesCard.classList.remove('hidden');
};

rulesCard.onclick=e=>{
  if(e.target===rulesCard) rulesCard.classList.add('hidden');
};

resetBtn.onclick=()=>{
  if(resetInput.value!==RESET_PASSWORD){
    resetStatus.textContent='Wrong password';
    return;
  }
  const resetData={1:false,2:false,3:false,4:false,5:false,6:false};
  tokensRef.set(resetData);
  resetStatus.textContent='Tokens reset';
  resetInput.value='';
};
