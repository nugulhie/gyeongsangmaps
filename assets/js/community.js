$(document).ready(function(){
    const base = firebase.firestore();

     base.collection("cafes").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var id = doc.data().id;
        var title= doc.data().title;
        var explain = doc.data().explain;
        var latitude = doc.data().geopoint.latitude;
        var longitude = doc.data().geopoint.longitude;
        var times = doc.data().time.toDate();
        var realtime = moment(times).format("YYYY-MM-DD HH:mm:ss");
            const comment_title = document.createElement('a');
            comment_title.href = "/main?latitude="+latitude+"&longitude="+longitude;
            comment_title.className = "m-r-10";
            comment_title.style = "font-size: 160%";
            comment_title.classList.add("comment-title");
            
            comment_title.innerHTML = title;

            const comment_time = document.createElement('p');
            // comment_time.className = "float-right text-muted"
            // comment_time.classList.add("float-right text-muted");
            comment_time.innerText = realtime;
            comment_time.style.float='right';
            comment_time.style.fontSize ='9px';
            comment_time.style.color = 'grey';

            const comment_geopoint = document.createElement('small');
            comment_geopoint.innerHTML = "위도 : "+latitude + " 경도 : "+ longitude;
            comment_geopoint.style.float='right';
            comment_geopoint.style.fontSize ='9px';
            comment_geopoint.style.color = 'grey';
            comment_geopoint.id="geogeo";
            
            const comment_explain = document.createElement('p');
            comment_explain.innerHTML = explain
            comment_explain.className = "msg";

            const comment_head = document.createElement('div');
            comment_head.classList.add("media-heading");
            comment_head.className = "media-heading";
            comment_head.appendChild(comment_title);
            comment_head.appendChild(comment_time)

            const comment_row = document.createElement('div');
            comment_row.appendChild(comment_geopoint);
            comment_row.appendChild(comment_explain);

            const comment_list = document.createElement('li');
            comment_list.classList.add("list-group-item");
            comment_list.appendChild(comment_head);
            comment_list.appendChild(comment_row);

            document.getElementById('comment-box').appendChild(comment_list);
            console.log(comment_title);        
            
        });
        s();    
    });
    
  
});

function searchsubmit(){
    var input = document.getElementById("searchView");
    var filter, ul, li, a, i, txtValue;
    ul = document.getElementById("comment-box");
    li = ul.getElementsByTagName('li');
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.indexOf(input.value) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
};

function s()
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
  var filter, ul, li, a, i, txtValue;
  ul = document.getElementById("comment-box");
  li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("small")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.indexOf(''+getLantitude) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
};
