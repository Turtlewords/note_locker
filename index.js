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
const selectionSubmitBtn = document.querySelector("#select-submit-btn");
const entryDate = document.querySelector("#entry-calendar");
const selectionDate = document.querySelector("#selection-calendar");
const selectDate = document.querySelector("#select-date");
const entryNote = document.querySelector("#entry-note")
const selectionNote = document.querySelector("#selection-note");
const result = document.querySelector(".result");


// Event Listeners

// entrySubmitBtn.addEventListener("click", (e) => {
//     e.preventDefault()
    
//     set(ref(db, entryDate.value), {
//       text: entryNote.value
//     });
// })

selectDate.addEventListener("click", (e) => {
    e.preventDefault()

    const dbref = ref(db);
    const date = selectionDate.value
    console.log("selectionDate.value:" + selectionDate.value)
    get(child(dbref, date)).then((snapshot) => {
      selectionNote.value = snapshot.val().text
    })

    console.log("selectionDate.value:" + selectionDate.value)

    // console.log("data.text: " + data.text)

    
    
})



selectionSubmitBtn.addEventListener("click", (e) => {
    e.preventDefault()
    
})


//  function getNames() {

//                 const dbref = ref(db);
//                 let listOfNames = document.querySelectorAll(".paper");

//                 if (listOfNames.length == 0) {
//                     get(child(dbref, 'names')).then((names) => {
//                         names.forEach(santa => {
//                             addItemsToList(santa);
//                         })
//                     })
//                 }
                
//            }