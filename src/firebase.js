import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyDva-u5lzszDrayAZh1yfRenWafh6fgSt4",
  authDomain: "mytodo-6958d.firebaseapp.com",
  databaseURL: "https://mytodo-6958d.firebaseio.com",
  projectId: "mytodo-6958d",
  storageBucket: "mytodo-6958d.appspot.com",
  messagingSenderId: "457875866267",
  appId: "1:457875866267:web:c296697825b31d648e7c3e",
  measurementId: "G-032FFFVF0G",
});

export { firebaseConfig as firebase };
