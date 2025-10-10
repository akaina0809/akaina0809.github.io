// count_set.js
// 年月日と時刻を分けて指定する関数
function a1() {
  const nengetu = "2026/07/07"; // ← 年月日
  const zikan = "21:30";         // ← 時刻
  const time = new Date(`${nengetu} ${zikan}`);
  const mode = "ok.html";
  return { time, mode };
}

function a2() {
  const nengetu = "2025/12/12"; // ← 年月日
  const zikan = "05:25";         // ← 時刻
  const time = new Date(`${nengetu} ${zikan}`);
  const mode = "ok2.html";
  return { time, mode };
}

function a3() {
  const nengetu = "2026/01/01"; // ← 年月日
  const zikan = "00:00";
  const time = new Date(`${nengetu} ${zikan}`);
  const mode = "ok3.html";
  return { time, mode };
}
