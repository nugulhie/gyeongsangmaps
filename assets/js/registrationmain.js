let today = new Date();
//let todayFormat = today.format("YYYY-MM-DD HH:mm:ss");

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
        db.collection('user').doc(UserData.id).set({
          name: UserData.name,
          email: UserData.email,
          contents: " ",
          college: " ",
          context: " ",
          date: today
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
 });