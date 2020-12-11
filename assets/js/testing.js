function addtext(){
    var type = document.getElementById("subheading");
    var eleCount = type.childElementCount; 

    if(eleCount > 1){
        console.log("추가창은 1개만 가능합니다.");
    }
    else{

        const submitBtn = document.createElement("p");
        submitBtn.innerHTML='<button type=button onclick="subtn()">'+
        '저장하기'+'</button>';

        const mak = document.createElement("input");
        mak.inputMode="text";
        mak.style.border="solid 1px black"
        mak.id="user_text";
        const re = document.createElement("div");
        re.id="s_s"
        re.appendChild(mak);
        re.appendChild(submitBtn);
        type.appendChild(re);
    //text창 추가 메소드
    }   
    console.log(eleCount)


};
function subtn(){
    var type = document.getElementById("subheading");
    var eleCount = type.childElementCount; 
    var das = document.getElementById("s_s");
    var count =0;
    uid = auth.currentUser.uid;

 if(count ==0){
  var docRef = db.collection("userData").doc(uid);
 
db.collection("cafes").where("geopoint", "==", new firebase.firestore.GeoPoint(loc.lat(), loc.lng()))
  
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            
            var my_map = {explain: document.getElementById('user_text').value}
            
            console.log( document.getElementById('user_text').value);

            db.collection("cafes").doc(doc.id).update({
              explain : firebase.firestore.FieldValue.arrayUnion(my_map)});
              var elem = document.createElement('h4');
              elem.style.fontSize="15px";
              elem.innerHTML = document.getElementById('user_text').value;
              
              document.getElementById('subheading').append(elem);
              document.getElementById('user_text').value = '';  
              count = count+1;
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}
    else{
    type.removeChild(type.lastChild);}
// db.collection("cafes")
//     .onSnapshot(function(doc) {
//         console.log("변경 일어남");
//         updateMap();
//     });
};