import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDmks0s9N5XRyYSfp8g5G3HXiQfLj4Rnl0",
    authDomain: "react-next-firebase-9e769.firebaseapp.com",
    projectId: "react-next-firebase-9e769",
    storageBucket: "react-next-firebase-9e769.appspot.com",
    messagingSenderId: "1066167240666",
    appId: "1:1066167240666:web:28385133a566e821a262e3",
    measurementId: "G-YVJJ8QM9E2"
};

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
