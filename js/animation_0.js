// ローダー要素を取得
const loader = document.querySelector('.loader');

// 5秒後にローダーを非表示にする関数
function hideLoader() {
  loader.style.display = 'none'; // ローダーを非表示にする
}

// 5秒後にhideLoader関数を実行する
setTimeout(hideLoader, 2000); // 5000ミリ秒（5秒）後にhideLoader関数を実行
