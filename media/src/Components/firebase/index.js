import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBqhAlXz6i6PemH2IXro2sreBrrgL_0vlU",
    authDomain: "social-media-ba00b.firebaseapp.com",
    projectId: "social-media-ba00b",
    storageBucket: "social-media-ba00b.appspot.com",
    messagingSenderId: "38663510863",
    appId: "1:38663510863:web:c80b815f07cdab5343833a",
    measurementId: "G-3YZ2Z48THM"
  };
  
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };