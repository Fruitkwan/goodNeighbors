// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAp6FaOQ4Ig_ZtF9TsOXgVfdu9Ukw-qeRE",
    authDomain: "myapp-5f528.firebaseapp.com",
    databaseURL: "https://myapp-5f528-default-rtdb.firebaseio.com",
    projectId: "myapp-5f528",
    storageBucket: "myapp-5f528.appspot.com",
    messagingSenderId: "45169369520",
    appId: "1:45169369520:web:18a6dccbfbb803ad53f675",
    measurementId: "G-Z55NP347L5"
};

// Initialize Firebase
if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
    
}

export { firebase };