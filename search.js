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
// const selectDate = document.querySelector("#select-date");
const searchValue = document.querySelector("#search-notes")
const searchNotes = document.querySelector("#search-notes-btn")
const selectionNote = document.querySelector("#selection-note");
const dropdown = document.querySelector(".dropdown");
const dropdownBtn = document.querySelector(".dropdown-btn")
const recentPosts = document.querySelector(".recent-posts")

const result = document.querySelector(".result");
const hamburgerBtn = document.querySelector(".hamburger");
const closeMenuBtn = document.querySelector(".close-menu");
const mobileMenu = document.querySelector(".mobile-menu");
let lastInteractionTime = 0

// Event Listeners

selectionNote.addEventListener("click", updateLastInteractionTime)
selectionNote.addEventListener("keydown", updateLastInteractionTime)
selectionNote.addEventListener("input", updateLastInteractionTime)

closeMenuBtn.addEventListener("click", () => {
  mobileMenu.style.transform = "translateX(100%)";
})

hamburgerBtn.addEventListener("click", () => {
  mobileMenu.style.transform = "translateX(0)";
})

selectionDate.addEventListener("change", () => {
  const dbref = ref(db);
      
  get(child(dbref, selectionDate.value)).then((snapshot) => {
    if (snapshot.exists()) {
      selectionNote.value = snapshot.val().text
    } else {
      alert("No note from this date!")
      // selectionNote.value = ""
    }
        
    })
})

// selectDate.addEventListener("click", (e) => {
//     e.preventDefault()

//     const dbref = ref(db);
//     const date = selectionDate.value
    
//     get(child(dbref, date)).then((snapshot) => {
//       if (snapshot.exists()) {
//         selectionNote.value = snapshot.val().text
//       } else {
//         alert("No note from this date!")
//       }
      
//     })
    
// })

searchNotes.addEventListener("click", (e) => {
  e.preventDefault()
  search();
})



selectionSubmitBtn.addEventListener("click", (e) => {
    e.preventDefault()
    addNote()
})

dropdownBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const date = dropdown.value
  const dbref = ref(db);
    
        get(child(dbref, date)).then((snapshot) => {
          if (snapshot.exists()) {
            selectionNote.value = snapshot.val().text
          } else {
            alert("No note from this date!")
          }
            
        })
})


// Functions

function clearInputs() {
    selectionDate.value = ""
    selectionNote.value = ""
}

function addNote() {
  set(ref(db, selectionDate.value), {
              text: selectionNote.value
            });
            alert("Note submitted!")
            clearInputs() 
            
}

function search() {
  let found = false;
  let userQuery = searchValue.value.toLowerCase()
  let dataArr = []

  const dbref = ref(db);
  onValue(dbref, (snapshot) => {
  if (snapshot.exists()) {
    // Iterate over children
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key; // Unique ID
      const childData = childSnapshot.val(); // Data object
      
      if (childData.text.toLowerCase().includes(userQuery)) {
        
        found = true;
        dataArr.push(childKey)
      } 
    });
    if (!found) {
        alert("Search parameter not found")
      } else {
        populateSelection(dataArr)
      }

  } else {
    console.log("No data available");
  }
});
}

function populateSelection(arr) {
  dropdown.style.visibility = "visible"
  dropdownBtn.style.visibility = "visible"
  let options = ""
  arr.forEach((item) => {
     options += `
    <option value=${item}>${item}</option>
    
    `
    dropdown.innerHTML = options
  })
}


// function populateRecentPostsArr() {
//   let dataArr = []

//   const dbref = ref(db);
//   onValue(dbref, (snapshot) => {
//   if (snapshot.exists()) {
//     // Iterate over children
//     snapshot.forEach((childSnapshot) => {
//       const childKey = childSnapshot.key; // Unique ID
//       const childData = childSnapshot.val(); // Data object
      
//       dataArr.push(childKey)
      
//     });
//   } else {
//     console.log("No data available");
//   }
// });

// populateRecentPostsList(dataArr)
// }

async function populateRecentPostsArr() {
  let dataArr = []

  const dbref = ref(db);
  const snapshot = await get(child(dbref, '/'));
  if (snapshot.exists()) {
    // Iterate over children
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key; // Unique ID
      const childData = childSnapshot.val(); // Data object
      
      dataArr.unshift(childKey)
      
    });
  } else {
    console.log("No data available");
  }

populateRecentPostsList(dataArr)
}

function populateRecentPostsList(arr) {
  // let html = ""
  // arr.forEach((post) => {
  //   html += `<button onclick="fetchRecentPost(${post})">${post}</button>`
  // })
  // recentPosts.innerHTML = html
  let count = 0
  for (let post of arr) {
    if (count == 5){
      break
    }
    const newBtn = document.createElement('button');
    newBtn.textContent = post;
    newBtn.classList.add("recent-btn")
    newBtn.addEventListener("click", () => {
      fetchRecentPost(post)
    })

    recentPosts.appendChild(newBtn)
    count += 1
  }
  
}

function fetchRecentPost(date) {
      const dbref = ref(db);
      selectionDate.value = date
    
        get(child(dbref, date)).then((snapshot) => {
          if (snapshot.exists()) {
            selectionNote.value = snapshot.val().text
          } else {
            alert("No note from this date!")
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
  if (selectionDate.value != "") {
    if (timeSinceLast >= 6 && selectionNote.value.trim() != "") {
    autoSaveNote()
    reloadCurrentNote()
  }
  }
  
}, 5000)

function autoSaveNote() {
  set(ref(db, selectionDate.value), {
              text: selectionNote.value
            });
  console.log("Saved")
}

function reloadCurrentNote() {
  const todayUTC = new Date().toISOString().split("T")[0]
  const dbref = ref(db);
  
      
  get(child(dbref, selectionDate.value)).then((snapshot) => {
    if (snapshot.exists()) {
      selectionNote.value = snapshot.val().text
    }  
    })
}

// Function Calls

populateRecentPostsArr()


