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


const selectionSubmitBtn = document.querySelector("#select-submit-btn");
const selectionDate = document.querySelector("#selection-calendar");
const selectDate = document.querySelector("#select-date");
const selectionNote = document.querySelector("#selection-note");
const editBtn = document.querySelector("#edit-btn");
const result = document.querySelector(".result");


// Event Listeners


selectDate.addEventListener("click", (e) => {
    e.preventDefault()

    const dbref = ref(db);
    const date = selectionDate.value
    console.log("selectionDate.value:" + selectionDate.value)
    get(child(dbref, date)).then((snapshot) => {
      selectionNote.value = snapshot.val().text
    })
    
})

editBtn.addEventListener("click", (e) => {
    e.preventDefault()

    editBtn.style.display = "none"
    selectionSubmitBtn.style.display = "block"
})

selectionSubmitBtn.addEventListener("click", (e) => {
    e.preventDefault()
    addNote()
})

function clearInputs() {
    selectionDate.value = ""
    selectionNote.value = ""
}

function addNote() {
  set(ref(db, selectDate.value), {
              text: selectionNote.value
            });
            alert("Note submitted!")
            clearInputs() 
}
