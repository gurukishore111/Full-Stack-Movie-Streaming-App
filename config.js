import * as firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyBKWt_VlJPYz_2PNc9-cDvT0uQKiQB96N8",
    authDomain: "react-native-f6f0c.firebaseapp.com",
    databaseURL: "https://react-native-f6f0c.firebaseio.com",
    projectId: "react-native-f6f0c",
    storageBucket: "react-native-f6f0c.appspot.com",
    messagingSenderId: "98603491279",
    appId: "1:98603491279:web:3e7b1ac243f5e07b21fcba",
    measurementId: "G-2CM78JT89Z"
  };

  if (!firebase.apps.length) {
     firebase.initializeApp(firebaseConfig);
  }


export default firebase;