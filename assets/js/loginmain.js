//아이디 저장 파트 top
$(document).ready(function(){
  var userInputId = getCookie("userInputId");//저장된 쿠기값 가져오기
  $("#email").val(userInputId); 
   
  if($("#email").val() != ""){ // 그 전에 ID를 저장해서 처음 페이지 로딩
                                         // 아이디 저장하기 체크되어있을 시,
      $("#remember-me").attr("checked", true); // ID 저장하기를 체크 상태로 두기.
  }
   
  $("#remember-me").change(function(){ // 체크박스에 변화가 발생시
      if($("#remember-me").is(":checked")){ // ID 저장하기 체크했을 때,
          var userInputId = $("#email").val();
          setCookie("userInputId", userInputId, 7); // 7일 동안 쿠키 보관
      }else{ // ID 저장하기 체크 해제 시,
          deleteCookie("userInputId");
      }
  });
   
  // ID 저장하기를 체크한 상태에서 ID를 입력하는 경우, 이럴 때도 쿠키 저장.
  $("#email").keyup(function(){ // ID 입력 칸에 ID를 입력할 때,
      if($("#remember-me").is(":checked")){ // ID 저장하기를 체크한 상태라면,
          var userInputId = $("#email").val();
          setCookie("userInputId", userInputId, 7); // 7일 동안 쿠키 보관
      }
  });
});

function setCookie(cookieName, value, exdays){
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toGMTString());
  document.cookie = cookieName + "=" + cookieValue;
}

function deleteCookie(cookieName){
  var expireDate = new Date();
  expireDate.setDate(expireDate.getDate() - 1);
  document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
}

function getCookie(cookieName) {
  cookieName = cookieName + '=';
  var cookieData = document.cookie;
  var start = cookieData.indexOf(cookieName);
  var cookieValue = '';
  if(start != -1){
      start += cookieName.length;
      var end = cookieData.indexOf(';', start);
      if(end == -1)end = cookieData.length;
      cookieValue = cookieData.substring(start, end);
  }
  return unescape(cookieValue);
}
//아이디 저장 파트 end

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
        swal({
          title : "로그인 성공",
          icon : "success"
      })
        .then(( )=>{
          window.location.replace("main");
         });
        $("#sign_in")[0].reset();
      }).catch(e => swal("에러",e.message,"error"));
    }
      e.preventDefault();
  });
});

