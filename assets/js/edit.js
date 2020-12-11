//프로필 수정 페이지
function update(){
  var my_name = document.getElementById('my_name').value;
  var my_college = document.getElementById('my_college').value;
  var my_context = document.getElementById('my_context').value;

  db.collection('users').doc(user.uid).set().then(function(doc) {
    name: my_name;
    college: my_college;
    context: my_context;
  }).catch(function(error) {
    console.log("Error Writing document:", error);
    console.log(my_name, my_college, my_context);
  });
}
