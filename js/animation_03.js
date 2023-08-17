/*/JavaScript
JavaScriptのコードは、「sessionStorageでの条件分岐」で発動し、初回アクセス時の処理を多めに書いていく内容です。/*/

const keyName = 'loadingviewed';
const keyValue = true;

if (!sessionStorage.getItem(keyName)) {
    sessionStorage.setItem(keyName, keyValue);
// 初回閲覧時
window.onload = function() {
  var popup = document.getElementById('firstTimeModal');
  if(!popup) return;
  popup.classList.add('is-show'); // モーダルにis-showのclassを付与
}
const loadinglogo = document.getElementById("loadingLogo"); // 
window.addEventListener('DOMContentLoaded', () => { //ロード完了後イベント開始
  loadinglogo.className = "show"; 
  setTimeout(function(){ loadinglogo.className = loadinglogo.className.replace("show", ""); }, 3500); // 3.5秒後非表示
});

} else {
// 2回目以降の処理内容

}