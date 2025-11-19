import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyC4Ud9qS09DAASqKIJNRJpoOF3ql_eJJBg",
    authDomain: "note-locker-c8929.firebaseapp.com",
    projectId: "note-locker-c8929",
    storageBucket: "note-locker-c8929.firebasestorage.app",
    messagingSenderId: "448490656040",
    appId: "1:448490656040:web:67bd72e12336b08b5d001d"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

//   Elements

const entrySubmitBtn = document.querySelector("#entry-submit-btn")
const selectionSubmitBtn = document.querySelector("#selection-submit-btn")
const entryDate = document.querySelector("#entry-calendar")
const selectionDate = document.querySelector("#selection-date")
const note = document.querySelector("#note")
const result = document.querySelector(".result")


// Event Listeners

entrySubmitBtn.addEventListener("click", (e) => {
    e.preventDefault()
})

selectionSubmitBtn.addEventListener("click", (e) => {
    e.preventDefault()
})