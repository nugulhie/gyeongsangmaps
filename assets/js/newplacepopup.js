function addMarker(location) {
  deleteMarkers();
    const iconBase ="/img/booot.png";
    const marker = new google.maps.Marker({
      position: location,
      map: map,
      icon: iconBase
    });
    const infowindow = new google.maps.InfoWindow({
      content: 
      '<div class="popup" id="newActivity">'+
          '<h1 class="h1">나만의 장소</h1>'+
          '<h4 class="h4">당신의 추억을 공유해 주세요.</h4>'+
          '<div class="cont">'+
            '<table class="type1>'+
              '<colgroup>'+
                '<col style="width: 111px">'+
                '<col>'+
              '</colgroup>'+
              '<tbody>'+
              '<tr>'+
                '<th>장소 이름<span>*</span></th>'+
                '<td>'+'<input type="text" id="activityTitle" placeholder="장소를 입력해 주세요.">'+'</td>'+
              '</tr>'+
              '<tr>'+
                '<th><label for=""></label></th>'+
                '<td><textarea id="activityDescription" placeholder="장소 설명을 해주세요."></textarea></td>'+
              '</tr>'+
              '</tbody>'+
            '</table>'+
          '</div>'+
            '<div class="txt_center">'+
                '<button onclick="onClickSubmit()" class="btn_type1">공유 하기</input>'+
            '</div>'+
        
      '</div>'
    });
  
    markers.push(marker);
    marker.addListener("click", () => {
      temp_infowindow.close();
      
      infowindow.open(map, marker);
      temp_infowindow = infowindow;
      
    });
    //console.log(location.lng());
      
      
    }