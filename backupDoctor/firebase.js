// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzh2ORF1ZSylavf5rMxq-djswtrMTvVh0",
  authDomain: "healmeapp-a753c.firebaseapp.com",
  projectId: "healmeapp-a753c",
  storageBucket: "healmeapp-a753c.appspot.com",
  messagingSenderId: "623451478888",
  appId: "1:623451478888:web:398e417ced466ff93294dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);