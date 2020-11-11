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

//getting data
db.collection('cafes').get().then(snapshot => {
  console.log(snapshot.docs);
  snapshot.docs.forEach(doc => {
      console.log(doc.data());
      username = doc.get("name");
      
  });
});



//test

var data = {sender: null, timestamp: null, lat: null, lng: null};



//test

// In the following example, markers appear when the user clicks on the map.
// The markers are stored in an array.
// The user can then click an option to hide, show or delete the markers.
let map;
let markers = [];

function initMap() {
  const university = { lat: 35.154, lng: 128.098 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 18,
    center: university,
  });


  
  
//DB에서 값 받아오고 마커 넣어줌.
  db.collection("cafes").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        var name = doc.data().name
        var latitude = doc.data().geopoint.latitude
        var longitude = doc.data().geopoint.longitude
        console.log(latitude)
        console.log(longitude)
        const mark1 = { lat: latitude, lng: longitude };

        const contentString = name 
        const infowindow = new google.maps.InfoWindow({
          content: contentString,
        });
        const marker = new google.maps.Marker({
          position: mark1,
          map,
          title: "경상대학교 테스트 제목",
        });
        //addMarker(latLng)
        marker.addListener("click", () => {
          infowindow.open(map, marker);
        });
    });
});
//DB 끝

  const contentString = username
      
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });
    const marker = new google.maps.Marker({
      position: university,
      map,
      title: "경상대학교 테스트 제목",
    });
    marker.addListener("click", () => {
      infowindow.open(map, marker);
    });
  // This event listener will call addMarker() when the map is clicked.
  map.addListener("click", (event) => {
    addMarker(event.latLng);
  });
}

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
  const contentString = username
      


    const infowindow = new google.maps.InfoWindow({
      content: contentString,
      
    });
    
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

