//프로필 수정 페이지
var my_name = document.getElementById('my_name');
var my_college= document.getElementById('my_college');
var my_context= document.getElementById('my_context');

db.collection('users').doc(user.uid).get().then(function(doc) {
  if (doc.exists) {
      console.log("Document data:", doc.data());
      console.log(doc.data());
      my_name.innerHTML = doc.get("name");
      my_college.innerHTML = doc.get("college");
      my_context.innerHTML = doc.get("context");
      
  } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
  }
}).catch(function(error) {
  console.log("Error getting document:", error);
      console.log(my_name, my_college, my_context);
  });