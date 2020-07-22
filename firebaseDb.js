import Firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAswKoEcwUageOCLr8EQgUox8VUJK_afhE",
    authDomain: "fir-x-ef38a.firebaseapp.com",
    databaseURL: "https://fir-x-ef38a.firebaseio.com",
    projectId: "fir-x-ef38a",
    storageBucket: "fir-x-ef38a.appspot.com",
    messagingSenderId: "383858242978",
    appId: "1:383858242978:web:7dad914db4893f656aeefb",
    measurementId: "G-FPJMXRQC1M"
};

const app = Firebase.initializeApp(firebaseConfig);
export const FirebaseDb = app.database();