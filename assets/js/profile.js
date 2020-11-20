
// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyDahWd_FZdoPEazahqR8aFgZvgWgWtZ_3U",
    authDomain: "gyeongsang-maps.firebaseapp.com",
    databaseURL: "https://gyeongsang-maps.firebaseio.com",
    projectId: "gyeongsang-maps",
    storageBucket: "gyeongsang-maps.appspot.com",
    messagingSenderId: "549995220260",
    appId: "1:549995220260:web:bc5feb5a0c5de1326e37b1",
    measurementId: "G-JBFQ87JLE7"
  };
  firebase.initializeApp(firebaseConfig);

  
const db = firebase.firestore();
var username = ""
var loc;
var zoom = 17;
var temp_infowindow;
let historicalOverlay;
//getting data
db.collection('cafes').get().then(snapshot => {
  console.log(snapshot.docs);
  snapshot.docs.forEach(doc => {
      console.log(doc.data());
      username = doc.get("name");
  });
});


