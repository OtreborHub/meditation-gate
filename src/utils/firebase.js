// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5p4j_bvEwQHrx24Yt2U3ekRmo7CuA9Is",
  authDomain: "mindfullness-58f61.firebaseapp.com",
  databaseURL: "https://mindfullness-58f61-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "mindfullness-58f61",
  storageBucket: "mindfullness-58f61.appspot.com",
  messagingSenderId: "758538471737",
  appId: "1:758538471737:web:b0f96a9244d2acbde000e8",
  measurementId: "G-LPF1LGDW5R"
};

var app;
var analytics;
var db;

// Initialize Firebase
export default function initFirebase(){
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
  db = getDatabase(app);
}

export {app, analytics, db};