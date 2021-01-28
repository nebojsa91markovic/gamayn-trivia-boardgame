import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIUtQxAwnLWH1T8dFJ6mrsC0xMa9N8h58",
  authDomain: "boardgame-80b31.firebaseapp.com",
  databaseURL: "https://boardgame-80b31-default-rtdb.firebaseio.com",
  projectId: "boardgame-80b31",
  storageBucket: "boardgame-80b31.appspot.com",
  messagingSenderId: "1037794949339",
  appId: "1:1037794949339:web:56225658d99abc773634fe",
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
