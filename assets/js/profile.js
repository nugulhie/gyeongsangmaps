
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
var userRef = db.collection("users").doc("user");
//doc("value 값에 userToken을 넣어야한다.")
//프로필 수정에서 값 넘겨주는 method

const auth = firebase.auth();

//현재 로그인 된 아이디의 상태 값을 가져온다. 로그인 상태면 True를 리턴. 아니면 False를 리턴한다.
auth.onAuthStateChanged(function(user){
  if(user){ //로그인 된 상태
    console.log(user);
    console.log("YES!")
    var user_name = document.getElementById('user_name');
    //var user_email= document.getElementById('user_email');
    var user_college= document.getElementById('user_college');
    var user_age= document.getElementById('user_age');
    var user_context= document.getElementById('user_context');

      //user_name.innerHTML = user.name
      //user_age.innerHTML = user_age
      //user_college.innerHTML = user_college
      user_email.innerHTML = user.email
      //user_context.innerHTML = user_context

      //파이어베이스에서 userData collection의 user.uid가 일치하는 문서를 찾아 그 정보를 반환한다.
      db.collection('userData').doc(user.uid).get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            console.log(doc.data());
            user_name.innerHTML = doc.get("name");
            user_age.innerHTML = doc.get("age");
            user_college.innerHTML = doc.get("college");
            //user_email.innerHTML = doc.get("email");
            user_context.innerHTML = doc.get("context");
            
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
            console.log(user_name, user_age, user_college, user_email);
        });

  }else{//로그아웃 된 상태.
    console.log(user);
  }
});

function update(){
  console.log("버튼을 누름");
  var name = document.getElementById('user_name').value;
  var id = document.getElementById('user_email').value;
  var context = document.getElementById('user_context').value;
  console.log(name, id, context);
  return userRef.update({
    name: name,
    email: id,
    context: context
  })
  .then(function() {
    
      console.log("Document successfully updated!");
  })
  .catch(function(error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
  });
}

//docRef.id 값을 회원가입할때 부터 받아서 파이어스토어 연동시 입력해주어야 함.
// if (window.performance) {
//   console.info("window.performance work's fine on this browser");
// }
//   if (performance.navigation.type == 1) {
//     console.info( "This page is reloaded" );
//   } else {
//     console.info( "This page is not reloaded");
//   }


function readData(){
var user_name = document.getElementById('user_name');
var user_email= document.getElementById('user_email');
var user_college= document.getElementById('user_college');
var user_age= document.getElementById('user_age');
var user_context= document.getElementById('user_context');
// doc('user')값에서 user 대신 고유 id값으로 넣어줄 예정.
// db.collection('users').doc('user').get().then(function(doc) {
//   if (doc.exists) {
//       console.log("Document data:", doc.data());
//       console.log(doc.data());
//       user_name.innerHTML = doc.get("name");
//       user_age.innerHTML = doc.get("age");
//       user_college.innerHTML = doc.get("college");
//       user_email.innerHTML = doc.get("email");
//       user_context.innerHTML = doc.get("context");
      
//   } else {
//       // doc.data() will be undefined in this case
//       console.log("No such document!");
//   }
// }).catch(function(error) {
//   console.log("Error getting document:", error);
//       console.log(user_name, user_age, user_college, user_email);
//   });
  
}