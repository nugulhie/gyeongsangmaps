// function signUp(email, password){
//     firebase.auth().createUserWithEmailAndPassword(email, password).then( () => {
//       swal.fire({
//         icon: "success",
//         title: "Usuário criado com sucesso!",
//         iconColor: 'green',
//         confirmButtonColor: 'green'
//       }).then(() => {
  
//         setTimeout(() => {
//           window.location.replace("index.html")
  
//         }, 1000)
  
//       })
//     })
  
//     .catch((error) => {
//       const errorCode = error.code
//       switch (errorCode){
  
//         case "auth/weak-password":
//           swal({
//             icon: "error",
//             title: "Senha muito fraca!",
//             iconColor: 'green',
//             confirmButtonColor: 'green'
//           })
//           break
  
//         default:
//           swal({
//             icon: "error",
//             title: error.message,
//             iconColor: 'green',
//             confirmButtonColor: 'green'
//           })
//       }
//     })
//   }




$(function() {
  
   const auth = firebase.auth();
   const db = firebase.firestore();

   $("#sign_up").submit((e)=> {
     let email = $("#signup_email").val();
     let pass = $("#signup_pass").val();
     let cfpass = $("#signup_cfpass").val();
     let name = $("#signup_name").val();
 
     if(email == '' || pass == '' || cfpass == ''){
       swal("Error", "Email or password cannot be blank", "error");
       console.log(cfpass.toString().length);
       
     }else if(pass !== cfpass){
       swal("Error", "비밀번호가 일치하지 않습니다.", "error");
       console.log(cfpass.toString().length);
       
     }else if(cfpass.toString().length < 6){
      swal("Error", "비밀번호가 일치하지 않습니다.", "error");

     }else{
       const promise = auth.createUserWithEmailAndPassword(email, pass)
       .then((userCredential) => {
        //정보 넘겨주기
        const UserData = {
          id: userCredential.user.uid,
          email: email,
          name: name,
          emailVerified: userCredential.user.emailVerified
        }
        console.log(UserData);
       
        //DB 유저의 정보를 저장
        db.collection('userData').doc(UserData.id).set({
          name: UserData.name,
          email: UserData.email

        }).then(function () {
          console.log("firebase()DB, 유저 추가 성공");
        }).catch(( ) => {
          console.error("firebase()DB 추가 실패", error);
        })

         swal({title: "회원가입 성공",
         icon: "success"
        })
         .then(( )=>{
          window.location.replace("main");
         });
         $("#sign_up")[0].reset();
       }).catch(e => swal("Error",e.message,"error"));
     }
       e.preventDefault();
   });
 
 
   //로그아웃 기능 나중에 메뉴에 추가하면 사용
   $(".signout").click(()=> {
     auth.signOut().then(()=> {
       swal("Logged Out", "Logged out successful", "success");
     }).catch((e)=> {
       swal("Error", e.message, "error");
     });
   })
   
   auth.onAuthStateChanged(function(user){
     if(user){
       $(".userEmail").text(user.email);
       $(".loading, .notlogin").hide();
       $(".loggedin").show();
     }else{
       $(".loading, .loggedin").hide();
       $(".notlogin").show();
     }
   });

 });