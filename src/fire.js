import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyBE7gWVjeJ30sLkPTiCERmn615UyrttZvY",
  authDomain: "superapp-6ae95.firebaseapp.com",
  databaseURL: "https://superapp-6ae95-default-rtdb.firebaseio.com/",
  projectId: "superapp-6ae95",
  storageBucket: "superapp-6ae95.appspot.com",
  messagingSenderId: "243222640469",
  appId: "1:243222640469:web:076d5f95926a40b7e7e1dc",
  measurementId: "G-0VL4DXZ592"
};

export var fire = firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();
//export { storage, fire as default };



  // apiKey: "AIzaSyBqeWqHtTLRQ8hhJ87QO74Cyvh3XkVEo9o",
  // authDomain: "fir-starter-3d346.firebaseapp.com",
  // databaseURL: "https://fir-starter-3d346.firebaseio.com",
  // projectId: "fir-starter-3d346",
  // storageBucket: "fir-starter-3d346.appspot.com",
  // messagingSenderId: "34928487128",
  // appId: "1:34928487128:web:b5f22dcfa5ba9b5cc385ad",
  // measurementId: "G-8GGYC6F9M0"