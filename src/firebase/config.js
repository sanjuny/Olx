import firebase from "firebase";
import 'firebase/auth';
import 'firebase/firebase'
import 'firebase/storage'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnI4dT_AORIKdrjsE17WznxvCTobxXm0I",
  authDomain: "olx-clone-cdf9c.firebaseapp.com",
  projectId: "olx-clone-cdf9c",
  storageBucket: "olx-clone-cdf9c.appspot.com",
  messagingSenderId: "749172087767",
  appId: "1:749172087767:web:d93c02d241279bf8fdc992",
  measurementId: "G-4QTJ5KNJNE"
};

export default  firebase.initializeApp(firebaseConfig);

