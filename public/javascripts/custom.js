$(document).ready(function() {
  if ($("#datetimepicker").length != 0) {
    $('#datetimepicker').datetimepicker({
      icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down",
        previous: 'fa fa-chevron-left',
        next: 'fa fa-chevron-right',
        today: 'fa fa-screenshot',
        clear: 'fa fa-trash',
        close: 'fa fa-remove'
      }
    });
  }
  $("nav a:not([data-toggle])").on('click', function (event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();
      // Store hash
      let hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function () {
        window.location.hash = hash;
      });
    } // End if
  });
  function scrollToDownload() {
    if ($('.section-download').length != 0) {
      $("html, body").animate({
        scrollTop: $('.section-download').offset().top
      }, 1000);
    }
  }
  // kakao map
  let container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
  let options = { //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
    level: 3 //지도의 레벨(확대, 축소 정도)
  };
  let map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

  // dropdown a href 클릭시 기본 막기
  $('nav a[data-toggle]').on('click', function(e){
    // e.stopPropagation();
    console.log('e   : ', e);
  })
});

// 신청하기 클릭 이벤트
function fnSubmitApply(){
  let user_name = document.querySelector('input[name="user_name"]');
  let user_phone = document.querySelector('input[name="user_phone"]');
  let mention = document.querySelector('textarea[name="mention"]');
  if(!user_name.value){
    alert('이름을 입력해주세요');
    user_name.focus();
    return false
  }
  if(!user_phone.value){
    alert('연락처를 남겨주세요');
    user_phone.focus();
    return false;
  }

  let xhr = new XMLHttpRequest();
  xhr.open('POST', '/application', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function(){
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      let res = JSON.parse(this.response);
      alert('신청해주셔서 감사합니다.');
      location.href = '/';
    }
  };
  let data = {user_name:user_name.value, user_phone:user_phone.value, mention:mention.value};
  xhr.send(JSON.stringify(data));
}