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
 
   $("#sign_up").submit((e)=> {
     let email = $("#signup_email").val();
     let pass = $("#signup_pass").val();
     let cfpass = $("#signup_cfpass").val();
 
     if(email == '' || pass == '' || cfpass == ''){
       swal("Error", "Email or password cannot be blank", "error");
     }else if(pass !== cfpass){
       swal("Error", "Password do not match", "error");
     }else{
       const promise = auth.createUserWithEmailAndPassword(email, pass)
       .then(()=>{
         swal("Signed up", "로그인 성공", "success");
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