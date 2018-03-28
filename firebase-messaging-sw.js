importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

var config = {
    apiKey: "-----------------------  INSERT API key -----------------------------",
    authDomain: "-------PROJECT ID --------.firebaseapp.com",
    databaseURL: "https://-------PROJECT ID --------.firebaseio.com",
    projectId: "-------PROJECT ID --------",
    storageBucket: "-------PROJECT ID --------.appspot.com",
    messagingSenderId: "SENDER ID"
  };
firebase.initializeApp(config);
const messaging = firebase.messaging();
