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

    //user_name.innerHTML = user.name
    //user_age.innerHTML = user_age
    //user_college.innerHTML = user_college
    user_email.innerHTML = user.email
    //user_context.innerHTML = user_context

    // 파이어베이스에서 userData collection의 user.uid가 일치하는 문서를 찾아 그 정보를 반환한다.
    // Use User.getToken() instead. 권장사항
    db.collection('users').doc(user.uid).get().then(function(doc) {
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

function init_edit(){
  var current = auth.currentUser;
  if (current != null) {
    name = current.displayName;
  }
  var current_name = document.getElementById('my_name');
  var current_college = document.getElementById('my_college');
  var current_context = document.getElementById('my_context');

  db.collection('users').doc(user.uid).get().then(function(doc) {
    if (doc.exists) {
      getElementById('current_name').innerHTML = 
        '<h4 class="pt-sm-2 pb-1 mb-0 text-nowrap">' + name + '</h4>';
      current_name.setAttribute('value', doc.get("name"));
      current_college.setAttribute('value', doc.get("college"));
      current_context.innerHTML = 
      '<label>프로필 설명</label>' + '<textarea class="form-control" rows="5" placeholder="프로필 설명" id="current_context">'+ doc.get("context") +'</textarea>';
    } else {
        console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
        console.log(user_name, user_age, user_college, user_email);
  });  
}

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
  
  return userRef.update({
    name: document.getElementById('my_name').value,
    college: document.getElementById('my_college').value,
    context: document.getElementById('my_context').value
  })
  .then(function(){
    console.log("Document successfully written!");
  })
  .catch(function(error) {
    console.log("Error Writing document:", error);
  });
})}
