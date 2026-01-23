import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getDatabase,
         ref,
         push,
         onValue,
         remove, set, get, child } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    databaseURL: "https://note-locker-c8929-default-rtdb.firebaseio.com/",
    apiKey: "AIzaSyC4Ud9qS09DAASqKIJNRJpoOF3ql_eJJBg",
    authDomain: "note-locker-c8929.firebaseapp.com",
    projectId: "note-locker-c8929",
    storageBucket: "note-locker-c8929.firebasestorage.app",
    messagingSenderId: "448490656040",
    appId: "1:448490656040:web:67bd72e12336b08b5d001d"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app)



const db = getDatabase()

//   Elements

const entrySubmitBtn = document.querySelector("#entry-submit-btn");
const entryDate = document.querySelector("#entry-calendar");
const selectionDate = document.querySelector("#selection-calendar");
const entryNote = document.querySelector("#entry-note")
const selectionNote = document.querySelector("#selection-note");
const hamburgerBtn = document.querySelector(".hamburger");
const closeMenuBtn = document.querySelector(".close-menu");
const mobileMenu = document.querySelector(".mobile-menu");
let lastInteractionTime = 0

// Event Listeners

entrySubmitBtn.addEventListener("click", (e) => {
    e.preventDefault()

    const dbref = ref(db);
    const date = entryDate.value
        
    get(child(dbref, date)).then((snapshot) => {
        if (snapshot.exists()) {
          let check = prompt("There is already a note for this date. Overwrite previous note?")

          if (check) {
            addNote()
          } else {
            return
          }
        } else {
          addNote()
        }
    })

    
    
})

closeMenuBtn.addEventListener("click", () => {
  mobileMenu.style.transform = "translateX(100%)";
})

hamburgerBtn.addEventListener("click", () => {
  mobileMenu.style.transform = "translateX(0)";
})

entryNote.addEventListener("click", updateLastInteractionTime)
entryNote.addEventListener("keydown", updateLastInteractionTime)
entryNote.addEventListener("input", updateLastInteractionTime)

// Functions

function clearInputs() {
    entryDate.value = ""
    entryNote.value = ""
}

function addNote() {
  set(ref(db, entryDate.value), {
              text: entryNote.value
            });
            alert("Note submitted!")
            clearInputs() 
}

function autoSaveNote() {
  set(ref(db, entryDate.value), {
              text: entryNote.value
            });
  console.log("Saved")
}

function loadTodaysNote() {
  const todayUTC = new Date().toISOString().split("T")[0]
  const dbref = ref(db);
  entryDate.value = todayUTC
      
  get(child(dbref, todayUTC)).then((snapshot) => {
    if (snapshot.exists()) {
      entryNote.value = snapshot.val().text
    } 
        
    })
}

function updateLastInteractionTime() {
  lastInteractionTime = Date.now()
}

function getTimeSinceLastInteraction() {
  const currentTime = Date.now()
  const elapsedTimeInMilliseconds = currentTime - lastInteractionTime

  const elapsedTimeInSeconds = Math.floor(elapsedTimeInMilliseconds / 1000)

  return elapsedTimeInSeconds
}

setInterval(() => {
  const timeSinceLast = getTimeSinceLastInteraction()

  if (timeSinceLast >= 6) {
    autoSaveNote()
  }
}, 5000)

// Function Calls

loadTodaysNote()


