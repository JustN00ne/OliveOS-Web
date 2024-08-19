// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWB9npv3nhhstDdzonRh2fAyQ5mZyiYv0",
  authDomain: "olive-os-justnoone.firebaseapp.com",
  projectId: "olive-os-justnoone",
  storageBucket: "olive-os-justnoone.appspot.com",
  messagingSenderId: "763495081328",
  appId: "1:763495081328:web:c1662a086aec0630981bb5",
  measurementId: "G-QE17B1HQ8T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);