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
const auth = firebase.auth();
// const current = auth.currentUser;
// const userRef = db.collection('users').doc(current.uid);

//현재 로그인 된 아이디의 상태 값을 가져온다. 로그인 상태면 True를 리턴. 아니면 False를 리턴한다.
auth.onAuthStateChanged(function(user){
if(user){ //로그인 된 상태
  console.log(user);
  console.log("YES!")
  var user_name = document.getElementById('user_name');
  // var user_email= document.getElementById('user_email');
  var user_college= document.getElementById('user_college');
  var user_age= document.getElementById('user_age');
  var user_context= document.getElementById('user_context');

  var current_name = document.getElementById('my_name');
  var current_college = document.getElementById('my_college');
  var current_context = document.getElementById('my_context');

  user_email.innerHTML = user.email

  // 파이어베이스에서 userData collection의 user.uid가 일치하는 문서를 찾아 그 정보를 반환한다.
  // Use User.getToken() instead. 권장사항
  db.collection('users').doc(user.uid).get().then(function(doc) {
    if (doc.exists) {
      console.log("Document data:", doc.data());
      console.log(doc.data());
      user_name.innerHTML = doc.get("name");
      user_age.innerHTML = doc.get("age");
      user_college.innerHTML = doc.get("college");
      //user_email.innerHTML = doc.get("email"); 위에서 이미 정의
      user_context.innerHTML = doc.get("context");
          
      document.getElementById('card_profile').innerHTML = doc.get("context");
      // 카드 텍스트에 프로필 메시지 띄움
      // profile.ejs에서는 적용되지만, edit.ejs로 넘어가면 적용안됨

      current_name.value = doc.get("name");
      current_college.value = doc.get("college");
      current_context.value = doc.get("context"); // 안됨
      
    }else{
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

// edit.ejs에서 저장 버튼 누르면 실행
// 기존 문서 없으면 실행안됨?
function update(){
  var current = auth.currentUser;
  var userRef = db.collection('users').doc(current.uid);

  var my_name = document.getElementById('my_name').value;
  var my_college = document.getElementById('my_college').value;
  var my_context = document.getElementById('my_context').value;
  console.log(my_name, my_college, my_context);
  
  userRef.get().then(function() {
    return userRef.update({
      name: document.getElementById('my_name').value,
      college: document.getElementById('my_college').value,
      context: document.getElementById('my_context').value
    })
    .then(function(){
      console.log("Document successfully written!");
      alert("저장되었습니다.");
      window.location.replace("myprofile");
    })
    .catch(function(error) {
      console.log("Error Writing document:", error);
    });
  })
    //   if (doc.exists){  //문서 있음
  //     return userRef.update({
  //       name: document.getElementById('my_name').value,
  //       college: document.getElementById('my_college').value,
  //       context: document.getElementById('my_context').value
  //     })
  //   }
  //   else { // 문서 없음
  //     userRef.set({
  //       name: document.getElementById('my_name').value,
  //       college: document.getElementById('my_college').value,
  //       context: document.getElementById('my_context').value,
        
  //       age: 22,
  //       email: current.email
  //     })
  //   }
  // }).catch(function(error) {
  //   console.log("Error setting document:", error);
  //   console.log(my_name, my_college, my_context);
  // });
  // 회원가입할때 프로필을 미리 작성하는 페이지가 있으면 좋겠음.
}
