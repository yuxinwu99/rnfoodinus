import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAGHAXdjoaeB5XXc8VTH9OQyQ4OWe5a2_8",
    authDomain: "foodinus-e8ce8.firebaseapp.com",
    databaseURL: "https://foodinus-e8ce8.firebaseio.com",
    projectId: "foodinus-e8ce8",
    storageBucket: "foodinus-e8ce8.appspot.com",
    messagingSenderId: "279329351240",
    appId: "1:279329351240:web:2d2a2dcd8d6749fbceda7d",
}
firebase.initializeApp(firebaseConfig)
firebase.firestore()
export default firebase