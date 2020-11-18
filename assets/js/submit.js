const inputTextfield = document.querySelector("#firstname").value;// it takes the values from signup page.
const lastname = document.querySelector("#lastname").value;
const email = document.querySelector("#email").value;
const phonenumber = document.querySelector("#phone").value;

console.log(inputTextfield);
const save=document.querySelector("#submit");
save.addEventListener("click",function() {
    db.collection("deyaPayusers").add({
              Name:inputTextfield,
              Email:email,
              PhoneNo:phonenumber,
              laseName:lastname,


    }).then(function() {

    console.log("Document successfully wriiten!");

})
.catch(function(error) {
  // The document probably doesn't exist.
  console.error("Error writing document: ", error);
});
});