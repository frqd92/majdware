import generateMain from "./mainPage";
import loginPage from "./loginPage";
import { feedCompanies } from "./companyList";
//----------------------------------------------------------------------------------------------------------------------------------//

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithRedirect, getRedirectResult, signInWithPopup  } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtQrKc6ReBImPyGAk32vAU5iNsc5yOGEw",
  authDomain: "majdware.firebaseapp.com",
  projectId: "majdware",
  storageBucket: "majdware.appspot.com",
  messagingSenderId: "381998737212",
  appId: "1:381998737212:web:d699cba95c08091291a039",
  databaseURL: 'https://majdware-default-rtdb.firebaseio.com/'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider(app);
const auth = getAuth(app);




//-----//
//This part is for crud
//initialize firebase databse
import {getDatabase, ref, set, child, update, remove, get} from "firebase/database";

// var db = getDatabase();

const database = getDatabase(app);

export function writeCompanies(value) {
  const user = auth.currentUser.displayName;
  const uid = auth.currentUser.uid;
  const db = getDatabase();
  set(ref(db, 'users/' + uid + "/factories/"), value);
}

 function readCompanies(){
  const dbRef = ref(getDatabase(app));
  const uid = auth.currentUser.uid;
  get(child(dbRef, 'users/' + uid + "/factories/")).then((snapshot) => {
    if (snapshot.exists()) {
      feedCompanies(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}





//----------------------------------------------------------------------------------------------------------------------------------//


loginPage();

const btn = document.getElementById("login-btn");
btn.addEventListener("click", authenticate);

function authenticate(){
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    generateMain(user.displayName);
    readCompanies()
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    alert(errorMessage)
  });
}
