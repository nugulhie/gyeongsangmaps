
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


var user;
const auth = firebase.auth();
var uid; 
var user_name;
const db = firebase.firestore();
var username = ""
var loc;
var zoom = 17;
var temp_infowindow;
let historicalOverlay;
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
  const imageBounds = {
    north: 35.159639,
    south: 35.149517,
    east: 128.107886,
    west: 128.090522,
  };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: zoom,
    minZoom: zoom,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    // disableDefaultUI: true,
    center: university,
    restriction: {
      latLngBounds: imageBounds,
      strictBounds: false,
    },
  });

   
  historicalOverlay = new google.maps.GroundOverlay(
    "/img/map_image.jpg",
    imageBounds,
    {clickable : false}
  );


  historicalOverlay.setMap(map);
  updateMap();
}

function initZoomControl(map) {
  document.querySelector(".zoom-control-in").onclick = function () {
    map.setZoom(map.getZoom() + 1);
  };


  document.querySelector(".zoom-control-out").onclick = function () {
    map.setZoom(map.getZoom() - 1);
  };
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
    document.querySelector(".zoom-control")
  );
}


function initFullscreenControl(map) {
  console.log("initFull");
  const elementToSendFullscreen = map.getDiv().firstChild;
  const fullscreenControl = document.querySelector(".fullscreen-control");
  map.controls[google.maps.ControlPosition.RIGHT_TOP].push(fullscreenControl);

  fullscreenControl.onclick = function () {
    if (isFullscreen(elementToSendFullscreen)) {
      exitFullscreen();
    } else {
      requestFullscreen(elementToSendFullscreen);
    }
  };

  document.onwebkitfullscreenchange = document.onmsfullscreenchange = document.onmozfullscreenchange = document.onfullscreenchange = function () {
    if (isFullscreen(elementToSendFullscreen)) {
      fullscreenControl.classList.add("is-fullscreen");
    } else {
      fullscreenControl.classList.remove("is-fullscreen");
    }
  };
}

function isFullscreen(element) {
  return (
    (document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement) == element
  );
}

function requestFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullScreen) {
    element.msRequestFullScreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}



function onClickSubmit() { 
  uid = auth.currentUser.uid;
  let nowtime = new Date();
  console.log(loc.lng());
  console.log(loc.lat());
  db.collection("cafes").add({ 
       title: document.getElementById('activityTitle').value, 
      explain: document.getElementById('activityDescription').value, 
      geopoint : new firebase.firestore.GeoPoint(loc.lat(), loc.lng()),
      comments : new Array(),
      time: nowtime
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
  
  // initFullscreenControl(map);
  // initZoomControl(map);
//DB에서 값 받아오고 마커 넣어줌.
  db.collection("cafes").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        var explain = doc.data().explain;
        var title= doc.data().title;
        var arr = doc.data().comments;
        var latitude = doc.data().geopoint.latitude;
        var longitude = doc.data().geopoint.longitude;
        console.log(`${doc.id} => ${doc.data()}`);
        console.log(latitude);
        console.log(longitude);
        console.log(title);
        console.log(explain);
        
        const mark1 = { lat: latitude, lng: longitude };
        const iconBase ="/img/booot.png";
        var contentString = 
        //팝업 html태그
        '<div class="myinfowindow" id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        '<div id= "bodyContent">'+
        '<h1 id="firstHeading" class="firstHeading">'+'<'+ title+'>' + '</h1>' +
        '<h4 id="subheading">'+ explain + "</h4>" +
        '<div id="modifydiv"><button id="modifybt" onclick = "addtext()">추가하기</button></div>' + 
        '<a href="/com?latitude='+latitude+'&longitude='+longitude+'"'+'id="morecontent">자세히 보기 </a></br>'+
        "</div>" + 
        "<br>" ;
        contentString += '<div id="bodycomment">';
        for(var i = 0 ; i < arr.length ; i++){
          contentString = contentString + "<p>" + "<b>" + arr[i].id + "</b>" +": " + arr[i].comment + "</p>";
        }
        contentString += "</div>";
        contentString += 
        '<br><textarea id="w3review" name="w3review" rows="1" cols="30"></textarea><br>' + 
        '<div id="center">'+
        '<button id="buttondesign" onclick="submitComment()">댓글 달기</button>'+
        '</div>'+
        '</div>';

        const infowindow = new google.maps.InfoWindow({
          content: contentString,
          maxWidth:800,

        });
        
        const marker = new google.maps.Marker({
          position: mark1,
          map,
          title: title,
          icon : iconBase
        });
        //addMarker(latLng)
        marker.addListener("click", (event) => {
          deleteMarkers();
              if(temp_infowindow)
                   temp_infowindow.close();
          infowindow.open(map, marker);
          loc = event.latLng;
          temp_infowindow = infowindow;
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
  uid = auth.currentUser.uid;
  console.log("submitComment");
  console.log(loc.lat());
  console.log(loc.lng());
 
  var docRef = db.collection("userData").doc(uid);
  docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        user_name = doc.data().name;
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });

  db.collection("cafes").where("geopoint", "==", new firebase.firestore.GeoPoint(loc.lat(), loc.lng()))
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            
            console.log(doc.id, " => ", doc.data());
            var my_map = { id : user_name, comment: document.getElementById('w3review').value}
            
            console.log( document.getElementById('w3review').value);
            db.collection("cafes").doc(doc.id).update({
              comments : firebase.firestore.FieldValue.arrayUnion(my_map)});
              var elem = document.createElement('p')
    
              elem.innerHTML = '<b>'+ user_name + '</b>' + " : " + document.getElementById('w3review').value;
              
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

/*
// Adds a marker to the map and push to the array.
function addMarker(location) {
  const iconBase ="/img/booot.png";
  const marker = new google.maps.Marker({
    position: location,
    map: map,
    icon: iconBase
  });
  const infowindow = new google.maps.InfoWindow({
    content: 
    '<form action="" id="newActivity">' + 
      '<header>' +
        '<h4> 장소 공유</h4>' +
        '<div> 당신만에 장소를 공유하세요 </div>'+
      '</header>' +
    '  <div>'+
    '    <span class="desc" id="title1" for="Field1">장소 이름:' +
    '    </span>'+
    '    <div>'+
    '      <input id="activityTitle" name="Field1" type="text" value="" tabindex="1">'+
    '    </div>'+
    '  </div>'+
    '  <div>'+
    '    <span class="desc" id="description1" for="Field2">장소를 설명해주세요!: </span>'+
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

  markers.push(marker);
  marker.addListener("click", () => {

    infowindow.open(map, marker);
    temp_infowindow = infowindow;
  });
  //console.log(location.lng());
    
    
  }
  
  */
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



 window.onload = function()
 {
  var value = new Array();
  var url = unescape(location.href);
  var pm  = url.split('?');
  var getLantitude
  var getLongitude
  var count =0;
  var params   = pm[1].split('&');
  for( var i=0; i<params.length; i++ )
  {
   var param = params[i].split('=');
  value[count]=param[1];
  count++;
  
}
  getLantitude = value[0];
  getLongitude = value[1];
  console.log(getLantitude, getLongitude);
if(param[0]!=null){
  $('input[id="Slide0"]').prop('checked', false);
  $('input[id="Slide3"]').prop('checked', true);
}


db.collection("cafes").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
      if(getLantitude == doc.data().geopoint.latitude && getLongitude == doc.data().geopoint.longitude) 
      {
        console.log('find success'+doc.data().title+doc.data().explain);
        const geogeo = {lat: doc.data().geopoint.latitude, lng: doc.data().geopoint.longitude};
          infoW = new google.maps.InfoWindow();
          infoW.setPosition(geogeo);
          infoW.setContent('<'+doc.data().title+'>'+"마커를 찾았습니다.");
          
          infoW.open(map);

  //       const mark1 = { lat: getLantitude, lng: getLongitude };
  //       const iconBase ="/img/booot.png";
  //       var contentString = 
  //       //팝업 html태그
  //       '<div id="content">' +
  //       '<div id="siteNotice">' +
  //       "</div>" +
  //       '<div id= "bodyContent">'+
  //       '<h1 id="firstHeading" class="firstHeading">'+'<'+ title+'>' + '</h1>' +
  //       '<h4 id="subheading">'+ explain + "</h4>" +
  //       '<a href="#">자세히 보기 </a></br>'+
  //       '<button onclick = "addtext()">추가하기</button>' + 
  //       "</div>" + 
  //       "<br>" ;
  //       contentString += '<div id="bodycomment">';
  //       for(var i = 0 ; i < arr.length ; i++){
  //         contentString = contentString + "<p>" + "<b>" + arr[i].id + "</b>" +": " + arr[i].comment + "</p>";
  //       }
  //       contentString += "</div>";
  //       contentString += 
  //       '<textarea id="w3review" name="w3review" rows="1" cols="30"></textarea><br>' + 
  //       '<div id="center">'+
  //       '<button id="buttondesign" onclick="submitComment()">댓글 달기</button>'+
  //       '</div>'+
  //       '</div>';

  //       const infowindow = new google.maps.InfoWindow({
  //         content: contentString,
  //       });
        
  //       const marker = new google.maps.Marker({
  //         position: mark1,
  //         map,
  //         title: title,
  //         icon : iconBase
  //       });
  //       //addMarker(latLng)
  //       marker.addListener("click", (event) => {
  //         deleteMarkers();
  //             if(temp_infowindow)
  //                  temp_infowindow.close();
  //         infowindow.open(map, marker);
  //         loc = event.latLng;
  //         temp_infowindow = infowindow;
  //       });
        

  // // This event listener will call addMarker() when the map is clicked.
  // map.addListener("click", (event) => {
  //   addMarker(event.latLng);
  //   loc = event.latLng
  // });
    }
  });
});
//DB 끝

};




