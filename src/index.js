import generateMain from "./mainPage";
import loginPage from "./loginPage";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth,  signInWithRedirect, getRedirectResult, signInWithPopup  } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtQrKc6ReBImPyGAk32vAU5iNsc5yOGEw",
  authDomain: "majdware.firebaseapp.com",
  projectId: "majdware",
  storageBucket: "majdware.appspot.com",
  messagingSenderId: "381998737212",
  appId: "1:381998737212:web:d699cba95c08091291a039"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider(app);
const auth = getAuth(app);


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
