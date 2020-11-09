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

  const contentString =
      '<div id="content">' +
      '<div id="siteNotice">' +
      "</div>" +
      '<h1 id="firstHeading" class="firstHeading">경상대학교</h1>' +
      '<div id="bodyContent">' +
      "<p><b>경상대학교</b>웹프로그래밍</b>, 이것은 테스트 중임 <br>" +
      "우리는 할 수 있다. -황태호-<br> " +
      "나를 죽이지 못하는 고통은 나를 강하게 만든다 -황태호-<br> " +

      "경상대학교 사이트 Site.</p>" +
      '<p><a href="https://www.gnu.ac.kr/main/" target = "_blank">' +
      "경상대학교 홈페이지</a> " +
      "</p>" +
      "</div>" +
      "</div>";
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
  const contentString =
      '<div id="content">' +
      '<div id="siteNotice">' +
      "</div>" +
      '<h1 id="firstHeading" class="firstHeading">경상대학교</h1>' +
      '<div id="bodyContent">' +
      "<p><b>경상대학교</b>웹프로그래밍</b>, 이것은 테스트 중임 <br>" +
      "우리는 할 수 있다. -황태호-<br> " +
      "나를 죽이지 못하는 고통은 나를 강하게 만든다 -황태호-<br> " +

      "경상대학교 사이트 Site.</p>" +
      '<p><a href="https://www.gnu.ac.kr/main/" target = "_blank">' +
      "경상대학교 홈페이지</a> " +
      "</p>" +
      "</div>" +
      "</div>";
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

