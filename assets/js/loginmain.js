
// 방법1 번 클릭으로 함수 넘겨주어서 진행하는 법!
// function login(){
//     if (firebase.auth().currentUse){
//       firebase.auth().signOut()
//     }
  
//     var loginForm = document.getElementById("signin-form");
//     var userId = document.getElementById("email").value;
//     var userPassword = document.getElementById("password").value;

//     if(!userId || !userPassword){
//         alert("아이디와 비밀번호를 모두 입력해주세요.")
//         return;
//     }else{
//         //loginForm.submit();
//         //return;
        
//     }

//     const email = document.getElementById('email').value
//     const password = document.getElementById('password').value
  
//     firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
  
//       swal({
//         title:"Login realizado com sucesso!",
//         icon: "success",
//         iconColor: 'green',
//         confirmButtonColor: 'green'
  
//       }).then( () => {
//         setTimeout( () => {
//           location.replace("main")
//         }, 1000)
//       })
//     })
  
//     .catch((error) => {
//       const errorCode = error.code
  
//       switch (errorCode){
//         case "autch/wrong-password":
//           swal({
//             icon: "error",
//             title: "Senha invalida!",
//             iconColor: 'green',
//             confirmButtonColor: 'green'
//           })
//           break
//         case "auth/invalid-email":
//           swal({
//             icon: "error",
//             title: "잘못된 이메일 입니다.",
//             iconColor: 'green',
//             confirmButtonColor: 'green'
//           })
//           break
//         case "auth/user-not-found":
//           swal({
//             icon: "warning",
//             title: "Usuário não encontrado",
//             text: "Deseja criar um usuário?",
//             showCancelButton: true,
//             CancelButtonText: "Não",
//             CancelButtonColor:'green',
//             ConfirmButtonText: "Sim",
//             ConfirmButtonColor: 'green',
//             iconColor: 'green',
//             confirmButtonColor: 'green'
//           }).then((result) => {
//             if (result.value){
//               signUp(email, password)
//             }
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


// 방법2 jQuery로 함수 실행.
$(function() {
    
    const auth = firebase.auth();
  
    $("#sign_in").submit((e)=> {
      let email = $("#email").val();
      let pass = $("#password").val();
  
      if(email == null || pass == null){
        swal("Error", "이메일 입력 바람", "error");
      }else{
        const promise = auth.signInWithEmailAndPassword(email, pass)
        .then(()=>{
          swal("Signed in", "로그인 성공", "success");
          $("#sign_in")[0].reset();
        }).catch(e => swal("에러",e.message,"error"))
        .then( () => {
            setTimeout( () => {
               location.replace("main")
            }, 1000)
          });
      }
        e.preventDefault();
    });
  
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