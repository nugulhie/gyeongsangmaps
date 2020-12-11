// function warnEmpty(){
//     alert("Enter a Input!!");
// }

// //현재 시간 따오는 함수. 나중에 맵에 마커를 추가할 때 사용해야 현재 시간이 저장된다.
// function dateToString(date) {
//     const dateString = date.toISOString();
//     const dateToString = dateString.substring(0, 10) + " " + dateString.substring(11, 19);
//     return dateToString;
// }
// function submitComment() {
//     const newcommentEL = document.getElementById("new-comment");
//     const newcomment = newcommentEL.value.trim();

//     if(newcomment) {
//         //새로 생성한 div에 현재 날짜와 시간을 넣는 것.
//         const dateEL = document.createElement('div');
//         dateEL.classList.add("comment-date");
//         const dateString = dateToString(new Date());
//         dateEL.innerText = dateString;

//         //submit 하여 전송된 글을 새로만든 div에 넣어주는 것.
//         const contentEL= document.createElement('div');
//         contentEL.classList.add('comment-content');
//         contentEL.innerText = newcomment;

//         //date와 content를 담은 div를 생성. 그리고 거기에 생성된 div를 넣는 것.
//         const commentEL = document.createElement('div');
//         commentEL.classList.add('comment-row');
//         commentEL.appendChild(dateEL);
//         commentEL.appendChild(contentEL);

//         //최종적으로 생성된 commentEL을 comments div에 넣어준다. 그리고 newcommentEl의 값을 날려서 초기화 시켜준다.
//         document.getElementById('comments').appendChild(commentEL);
//         newcommentEL.value = "";

//         //comment의 숫자를 하나씩 늘려서 보여주는것.
//         const countEL = document.getElementById('comments-count');
//         const count = countEL.innerText;
//         countEL.innerText = parseInt(count) + 1;
//     }
//     else warnEmpty();
// }

// window.onload = function(){


// }

$(document).ready(function(){
    const base = firebase.firestore();
    base.collection("mapData").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var name = doc.data().name;
            var title= doc.data().title;
            var explain = doc.data().explain;
            var latitude = doc.data().geopoint.latitude;
            var longitude = doc.data().geopoint.longitude;
            var time = doc.data().time;
            var times = doc.data().time.toDate();
            var comment = doc.data().comments;

            var time2 = moment(times).format("YYYY-MM-DD HH:mm:ss"); // 이 형태로 format 하여 날짜 받아옴.
            //console.log(`${doc.id} => ${doc.data()}`);
            console.log(name);
            console.log(title);
            console.log(explain);
            console.log(latitude);
            console.log(longitude);
            console.log(time);
            console.log(time.toDate());
            
            console.log(comment);
            console.log(time2);

            //리스트 생성
            //먼저 comment의 제목과 시간을 담는다.
            const comment_title = document.createElement('a');
            //comment_title.className = "m-r-10";
            comment_title.style = "font-size: 160%";
            comment_title.classList.add("comment-title");
            
            comment_title.innerText = title;

            const comment_time = document.createElement('small');
            comment_time.className = "float-right text-muted"
            //comment_time.classList.add("float-right text-muted");
            comment_time.innerText = time2;

            const comment_head = document.createElement('div');
            //comment_head.classList.add("media-heading");
            //comment_head.className = "media-heading";
            comment_head.appendChild(comment_title);
            comment_head.appendChild(comment_time);

            const comment_row = document.createElement('div');
            //comment_row.classList.add("msg");
            //comment_row.className = "msg";
            comment_row.innerText = explain;

            const comment_list = document.createElement('li');
            comment_list.classList.add("list-group-item");
            comment_list.appendChild(comment_head);
            comment_list.appendChild(comment_row);

            document.getElementById('comment-box').appendChild(comment_list);
            
        });
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