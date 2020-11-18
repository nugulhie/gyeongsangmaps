
// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyDahWd_FZdoPEazahqR8aFgZvgWgWtZ_3U",
  authDomain: "gyeongsang-maps.firebaseapp.com",
  databaseURL: "https://gyeongsang-maps.firebaseio.com",
  projectId: "gyeongsang-maps",
  storageBucket: "gyeongsang-maps.appspot.com",
  messagingSenderId: "549995220260",
  appId: "1:549995220260:web:bc5feb5a0c5de1326e37b1",
  measurementId: "G-JBFQ87JLE7"
};
firebase.initializeApp(firebaseConfig);




const db = firebase.firestore();
var username = ""
var loc;
var zoom = 18;
var temp_infowindow;
//getting data
db.collection('cafes').get().then(snapshot => {
  console.log(snapshot.docs);
  snapshot.docs.forEach(doc => {
      console.log(doc.data());
      username = doc.get("name");
  });
});


//


//test

var data = {sender: null, timestamp: null, lat: null, lng: null};



//test

// In the following example, markers appear when the user clicks on the map.
// The markers are stored in an array.
// The user can then click an option to hide, show or delete the markers.
let map;
let markers = [];

function initMap() {
  console.log(initMap);
  const university = { lat: 35.154, lng: 128.098 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: zoom,
    center: university,
  });
  updateMap();
}

function onClickSubmit() { 
  console.log(loc.lng());
  console.log(loc.lat());
  db.collection("cafes").add({ 
       title: document.getElementById('activityTitle').value, 
      name: document.getElementById('activityDescription').value, 
      geopoint : new firebase.firestore.GeoPoint(loc.lat(), loc.lng()),
      comments : new Array()
    }).then(function() { 
    console.log("Document successfully wriiten!"); 
    temp_infowindow.close();
}) 
.catch(function(error) {
  console.error("Error writing document: ", error);
});
  
}
function updateMap() {
  console.log("updateMap")
//DB에서 값 받아오고 마커 넣어줌.
  db.collection("cafes").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        
        var name = doc.data().name;
        var title= doc.data().title;
        var arr = doc.data().comments;
        var latitude = doc.data().geopoint.latitude;
        var longitude = doc.data().geopoint.longitude;
        console.log(`${doc.id} => ${doc.data()}`);
        console.log(latitude);
        console.log(longitude);
        console.log(title);
        console.log(name);
        
        const mark1 = { lat: latitude, lng: longitude };
       
        var contentString = 

        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        '<h4 id="firstHeading" class="firstHeading">'+ title + '</h4>' +
        '<div id="bodyContent">' +
        "<p>" + name + "</p>" +
        '<a href="#">자세히 보기 </a></br>'+
        "<button>수정 하기</button>" + 
        "</div>" + 
        "</div><br>" ;
        contentString += '<div id="bodycomment">';
        for(var i = 0 ; i < arr.length ; i++){
          contentString = contentString + "<p>" + "<b>" + arr[i].id + "</b>" +": " + arr[i].comment + "</p>";
        }
        contentString += "</div>";
        contentString += 
        '<textarea id="w3review" name="w3review" rows="1" cols="30"></textarea><br>' + 
        '<button onclick="submitComment()">댓글 달기</button>';
        
        
        const infowindow = new google.maps.InfoWindow({
          content: contentString,
        });
        
        const marker = new google.maps.Marker({
          position: mark1,
          map,
          title: title,
        });
        //addMarker(latLng)
        marker.addListener("click", (event) => {
          infowindow.open(map, marker);
          loc = event.latLng
        });
    });
});
//DB 끝


  // This event listener will call addMarker() when the map is clicked.
  map.addListener("click", (event) => {
    addMarker(event.latLng);
    loc = event.latLng
  });

}

function submitComment(){
  console.log("submitComment");
  console.log(loc.lat());
  db.collection("cafes").where("geopoint", "==", new firebase.firestore.GeoPoint(loc.lat(), loc.lng()))
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            
            console.log(doc.id, " => ", doc.data());
            var my_map = { id : "황태호", comment: document.getElementById('w3review').value}
            
            console.log( document.getElementById('w3review').value);
            db.collection("cafes").doc(doc.id).update({
              comments : firebase.firestore.FieldValue.arrayUnion(my_map)});
              var elem = document.createElement('p')
    
              elem.innerHTML = '<b>'+ "황태호: " + '</b>' + document.getElementById('w3review').value;
              
              document.getElementById('bodycomment').append(elem);
              document.getElementById('w3review').value = '';  
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
 
}
db.collection("cafes")
    .onSnapshot(function(doc) {
        console.log("변경 일어남");
        updateMap();
    });


// Adds a marker to the map and push to the array.
function addMarker(location) {
  const marker = new google.maps.Marker({
    position: location,
    map: map,
  });
  
  markers.push(marker);
  marker.addListener("click", () => {
    infowindow.open(map, marker);
  });
  //console.log(location.lng());
    const infowindow = new google.maps.InfoWindow({
      content: 
      '<form action="" id="newActivity">' + 
        '<header>' +
          '<h4> 장소 공유</h4>' +
          '<div> 당신만에 장소를 공유하세요 </div>'+
        '</header>' +
      '  <div>'+
      '    <label class="desc" id="title1" for="Field1">장소 이름:' +
      '    </label>'+
      '    <div>'+
      '      <input id="activityTitle" name="Field1" type="text" value="" tabindex="1">'+
      '    </div>'+
      '  </div>'+
      '  <div>'+
      '    <label class="desc" id="description1" for="Field2">장소를 설명해주세요!: </label>'+
      '    <div>'+
      '      <textarea id="activityDescription" name="Field2" spellcheck="true" rows="10" col="50" tabindex="2" value="default">'+
      '      </textarea>'+
      '    </div>'+
      '   </div>'+
      '  <br />'+
      '</div> '+
      '</form>'+
      '  <div>'+
      '    <button onclick="onClickSubmit()">공유 하기</input>'+
      '  </div>' 
    });
    temp_infowindow = infowindow;
  }
  
// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}


