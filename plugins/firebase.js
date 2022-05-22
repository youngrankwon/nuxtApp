import Vue from 'vue'
import firebase from "firebase/app";
import "firebase/firestore";
import firebaseConfig from './firebaseConfig';


// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object

// Initialize Firebase
if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app()
}


// Initialize Cloud Firestore and get a reference to the service
Vue.prototype.$firebase = firebase