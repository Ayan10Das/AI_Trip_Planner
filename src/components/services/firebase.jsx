// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore  } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFRkNhkfNqbzE9ay9ubgHmoQO2GJ4dRIg",
  authDomain: "ai-trip-planner-6976c.firebaseapp.com",
  projectId: "ai-trip-planner-6976c",
  storageBucket: "ai-trip-planner-6976c.firebasestorage.app",
  messagingSenderId: "293027601364",
  appId: "1:293027601364:web:883c7447caf7d84afe5441",
  measurementId: "G-5BYRJ35MXS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);