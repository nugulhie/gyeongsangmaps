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
       '<div class="popup">'+
            '<form action="" id="newActivity">'+
                '<h1>나만의장소</h1>'+
                '<h4>당신의 추억을 공유해 주세요.</h4>'+
                '<div class="cont>'+
                    '<table class="type1">'+
                        '<colgroup>'+
                            '<col style="width: 111px">'+
                            '<col>'+
                        '</colgroup>'+
                        '<tbody>'+
                        '<tr>'+
                            '<th>'+'<label for="placename">장소 이름'+'</label>'+'<span>*'+'</span>'+'</th>'+
                            '<td><input type="text" id="placename" placeholder="장소를 입력해 주세요."></td>'+
                        '</tr>'+
                        '<tr>'+
                            '<th><label for=""></label></th>'+
                            '<td><textarea placeholder="장소 설명을 부탁드릴게요."></textarea></td>'+
                        '</tr>'+
                        '</tbody>'+
                    '</table>'+
                '</div>'+


            '</form>'+
       '</div>'
    });
  
    markers.push(marker);
    marker.addListener("click", () => {
  
      infowindow.open(map, marker);
      temp_infowindow = infowindow;
    });
    //console.log(location.lng());
      
      
    }
  