const auth = firebase.auth();

auth.onAuthStateChanged(function(user){
    if(user){
      var elem = document.getElementById("bb-right");
      elem.style.display = "block";
      console.log(user);
      console.log("YES!");
   
    }else{
      var elem = document.getElementById("bb-right2");
      //elem.style.visibility = "visible";
      elem.style.display = "block";
      console.log(user);
      console.log("NO!");
    }
  });

function logout_button(){
  auth.signOut().then(()=>{
    var elem = document.getElementById("bb-right");
    elem.style.display = "none";
    alert("로그아웃 되었습니다.");
    window.location.replace("main");
  }).catch((e)=> {
    swal("에러", e.message,"error");
  })

  // auth.signOut().then(()=> {
  //   swal({
  //     title : "로그아웃 성공",
  //     icon : "success"
  //   }).then(( )=>{
  //     window.location.replace("main");
  //   });
  // }).catch((e)=> {
  //   swal("에러",e.message,"error");
  // });
}
  

  

  