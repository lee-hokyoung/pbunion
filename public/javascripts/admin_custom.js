// application list 삭제
function fnRemove(id) {
  console.log(this);
  if (confirm('삭제하시면 복구가 불가능 합니다. 진행하십니까?')) {
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', '/admin/application/' + id);
    xhr.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        let res = JSON.parse(this.response);
        let li = document.querySelector('li[about="' + id + '"]');
        li.remove();
        console.log('li : ', li);
      }
    };
    xhr.send();
  }
}