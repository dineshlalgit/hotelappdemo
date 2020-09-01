import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyBqeWqHtTLRQ8hhJ87QO74Cyvh3XkVEo9o",
  authDomain: "fir-starter-3d346.firebaseapp.com",
  databaseURL: "https://fir-starter-3d346.firebaseio.com",
  projectId: "fir-starter-3d346",
  storageBucket: "fir-starter-3d346.appspot.com",
  messagingSenderId: "34928487128",
  appId: "1:34928487128:web:b5f22dcfa5ba9b5cc385ad",
  measurementId: "G-8GGYC6F9M0"
};

export var fire = firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();

//export { storage, fire as default };
