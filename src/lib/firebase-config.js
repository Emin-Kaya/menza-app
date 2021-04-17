
import * as firebase from "firebase";
// Initialize Firebase
// TODO: Replace with your project's customized code snippet
const config = {
    apiKey: "AIzaSyDE2CMdIzsvBRV1doVqkmzMFhNHEsFuBYE ",
    authDomain: "menza-3c68d.firebaseapp.com",
    databaseURL: "https://menza-3c68d.firebaseio.com/",
    projectId: "menza-3c68d",
    appId: "1:352164880147:web:e19492462577105aa084e6",
    storageBucket: "menza-3c68d.appspot.com",
    messagingSenderId: "352164880147"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
export default firebase;
