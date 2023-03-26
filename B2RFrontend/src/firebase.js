import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDPzKhOtQedN7QnhCY_0p8K9KoQwopSpdU",
    authDomain: "b2r-planner.firebaseapp.com",
    projectId: "b2r-planner",
    storageBucket: "b2r-planner.appspot.com",
    messagingSenderId: "476080925703",
    appId: "1:476080925703:web:4712ee13e196f63c414ea2",
    measurementId: "G-2EEP4225P0",
};

export const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
export const auth = getAuth();

export const databaseRef = collection(db, "database");
export const storage = getStorage(firebaseApp);
