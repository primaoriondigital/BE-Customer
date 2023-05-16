const firebase = require('firebase/compat/app');
require('firebase/compat/auth');
require('firebase/compat/firestore');
require('firebase/compat/storage');

    const firebaseConfig = {
        apiKey: "AIzaSyCD6xGEJlFabECg-ZrOQhJ_VcGzGKV2IaM",
        authDomain: "chatapp-55894.firebaseapp.com",
        projectId: "chatapp-55894",
        storageBucket: "chatapp-55894.appspot.com",
        messagingSenderId: "893859672069",
        appId: "1:893859672069:web:a870719675b9a072d7ac6c"
      };

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.firestore();
const storage = firebase.storage();
module.exports ={auth,database,storage}