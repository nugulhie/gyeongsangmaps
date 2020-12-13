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
var storageRef = firebase.storage().ref();

function initHome(user){
  var user_name = document.getElementById('user_name');
  var user_email= document.getElementById('user_email');
  var user_college= document.getElementById('user_college');
  var user_date= document.getElementById('user_date');
  var user_context= document.getElementById('user_context');
  var user_profile = document.getElementById('user_profile_image');

  console.log("테스트", user_name, user_email, user_college, user_date, user_context);

  user_email.innerHTML = user.email // 프로필에 정의(회원가입)된 이메일

  // 파이어베이스에서 userData collection의 user.uid가 일치하는 문서를 찾아 그 정보를 반환한다.
  // Use User.getToken() instead. 권장사항
  db.collection('users').doc(user.uid).get().then(function(doc) {
    if (doc.exists) {
      console.log("Document data:", doc.data());
      console.log(doc.data());

      var date = doc.get("date").toDate();
      // var regDate = moment(date).format("YYYY-MM-DD HH:mm:ss"); // moment.js 불러와야함.
      var regDate =
        date.getFullYear() + '년 ' +
        (date.getMonth() + 1) + '월 ' +
        date.getDate() + '일';

      user_name.innerHTML = doc.get("name");
      user_date.innerHTML = regDate // 가입날짜
      user_college.innerHTML = doc.get("college");
      // user_email.innerHTML = doc.get("email"); // 문서에 정의된 이메일
      user_context.innerHTML = doc.get("context");
      //유저 프로필 셋팅
      user_profile.src = doc.get("profile");
    }else{
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
    console.log(user_name, user_date, user_college, user_email);
  });
}



function initEdit(user){
  var current_name = document.getElementById('current_name');
  var my_name = document.getElementById('my_name');
  var my_college= document.getElementById('my_college');
  var my_context= document.getElementById('my_context');
  var my_profile = document.getElementById('my_profile_image');
  console.log(current_name, my_name, my_college, my_context);
  // 파이어베이스에서 userData collection의 user.uid가 일치하는 문서를 찾아 그 정보를 반환한다.
  // Use User.getToken() instead. 권장사항
  db.collection('users').doc(user.uid).get().then(function(doc) {
    if (doc.exists) {
      console.log("Document data:", doc.data());
      console.log(doc.data());
      
      current_name.innerHTML = doc.get("name");
      my_name.value = doc.get("name");
      my_college.value = doc.get("college");
      my_context.innerHTML = doc.get("context");
      my_profile.src = doc.get("profile");
    }else{
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
    console.log(current_name, my_name, my_college, my_context);
  });
}

//현재 로그인 된 아이디의 상태 값을 가져온다. 로그인 상태면 True를 리턴. 아니면 False를 리턴한다.
auth.onAuthStateChanged(function(user){
  if(user){ //로그인 된 상태
    console.log(user);
    console.log("home YES!");
    sa();
    document.getElementById("home").addEventListener('load', initHome(user), false);

  }else{//로그아웃 된 상태.
    console.log(user);
  }
});

auth.onAuthStateChanged(function(user){
  if(user){ //로그인 된 상태
    console.log(user);
    console.log("editProfile YES!");

    document.getElementById("editProfile").addEventListener('load', initEdit(user), false);

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
  
  userRef.get().then(function(doc) {
    if(doc.exists){
      
    }
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
}



document.addEventListener('DOMContentLoaded', function () {
  //const storageRef = firebase.storage().ref();
  let selectedFile;

  
  //let userId = userDataGet.uid;

  // File 선택
  //var selectedFile;
  var fileName;
  document.querySelector('#photo_select').addEventListener('change', e => {
      selectedFile = e.target.files[0];
      console.log(selectedFile);
      console.log(selectedFile.name);
      fileName = selectedFile.name;
      var my_profile = document.getElementById('my_profile_image');
      /**
      // [object%20File]:1 GET http://127.0.0.1:3000/[object%20File] 404 (Not Found)
      my_profile.src = selectedFile;
      */
      my_profile.src = "/img/uploded.png";
  });


  
  // File 업로드
  document.querySelector('#photo_submit').addEventListener('click', () => {
    var userData = auth.currentUser;
    storageRef
      //.child(`images/${selectedFile.name}`)
      .child("images/"+userData.uid+"/"+fileName)
      .put(selectedFile)
      .on('state_changed', snapshot => {
          console.log(snapshot)
        }, error => {
          console.log(error);
        }, () => {

          var userDataGet = auth.currentUser;
          console.log(userDataGet.uid);

          var starsRef = storageRef.child('images/'+userData.uid+"/"+fileName);

          console.log(starsRef);

          starsRef.getDownloadURL().then(function(url){

            db.collection('users').doc(userDataGet.uid).update({
              profile: url
            }).then(function () {
              console.log("firebase()DB, 유저 추가 성공");
            }).catch(( ) => {
              console.error("firebase()DB 추가 실패", error);
            })

          }).catch(function(error){
            console.log(error);
          });
          alert("사진이 저장되었습니다.");
          console.log('성공');
        }
        );
  });
});

    function searchsubmit(){
    var input = document.getElementById("searchView");
    var ul, li, a, i, txtValue;
    ul = document.getElementById("comment-box");
    li = ul.getElementsByTagName('li');
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName('a')[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.indexOf(input.value) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
    
};
    function sa(){
         var textarray = new Array();
         var userdd = auth.currentUser;
         var userdb = db.collection('users');
         var contentdb = db.collection('cafes');
         var temp;
         console.log(userdd.uid);
         
         userdb.doc(userdd.uid).get().then(function(doc) {
               for(var i =0; i<doc.data().contents.length;i++){
                 temp = doc.data().contents[i];
                 console.log(temp);
                 
                 contentdb.doc(temp).get().then(function(doc) {
                    console.log(doc.data());
                  var title= doc.data().title;
                  var explain = doc.data().explain;
                  var latitude = doc.data().geopoint.latitude;
                  var longitude = doc.data().geopoint.longitude;

      
                  const comment_title = document.createElement('a');
                  comment_title.href = "/main?latitude="+latitude+"&longitude="+longitude;
                  comment_title.className = "m-r-10";
                  comment_title.style = "font-size: 160%";
                  comment_title.classList.add("comment-title");
                  
                  comment_title.innerHTML = title;
      
                  const comment_time = document.createElement('p');
                  // comment_time.className = "float-right text-muted"
                  // comment_time.classList.add("float-right text-muted");
                  // comment_time.innerText = realtime;
                  comment_time.style.float='right';
                  comment_time.style.fontSize ='9px';
                  comment_time.style.color = 'grey';
      
                  const comment_geopoint = document.createElement('small');
                  comment_geopoint.innerHTML = "위도 : "+latitude + " 경도 : "+ longitude;
                  comment_geopoint.style.float='right';
                  comment_geopoint.style.fontSize ='9px';
                  comment_geopoint.style.color = 'grey';
                  comment_geopoint.id="geogeo";
                  
                  const comment_explain = document.createElement('p');
                  comment_explain.innerHTML = explain
                  comment_explain.className = "msg";
      
                  const comment_head = document.createElement('div');
                  comment_head.classList.add("media-heading");
                  comment_head.className = "media-heading";
                  comment_head.appendChild(comment_title);
                  comment_head.appendChild(comment_time)
      
                  const comment_row = document.createElement('div');
                  comment_row.appendChild(comment_geopoint);
                  comment_row.appendChild(comment_explain);
      
                  const comment_list = document.createElement('li');
                  comment_list.classList.add("list-group-item");
                  comment_list.appendChild(comment_head);
                  comment_list.appendChild(comment_row);
      
                  document.getElementById('comment-box').appendChild(comment_list);
                  console.log(comment_title);        
                  
              }).catch(function(error) {
              });
            
          }
          }).catch(function(error){});
        }

     