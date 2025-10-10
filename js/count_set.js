// js/count_set.js

// ======== カウント対象（必要に応じて変更OK）========
function a1() {
  const nengetu = "2026/07/07";
  const zikan   = "21:30";
  const time    = new Date(`${nengetu} ${zikan}`);
  const mode    = "ok.html";
  return { time, mode };
}

function a2() {
  const nengetu = "2025/12/12";
  const zikan   = "05:25";
  const time    = new Date(`${nengetu} ${zikan}`);
  const mode    = "ok2.html";
  return { time, mode };
}

function a3() {
  const nengetu = "2026/01/01";
  const zikan   = "00:00";
  const time    = new Date(`${nengetu} ${zikan}`);
  const mode    = "ok3.html";
  return { time, mode };
}

// ======== 季節ごとの背景適用（Minecraft版）========
// 呼び出し: applySeasonalBackground();
function applySeasonalBackground(options = {}) {
  const {
    elementId = "bg",
    images = {
      spring: "https://i.redd.it/two-minecraft-backgrounds-i-made-first-time-using-shaders-v0-9co6s0m3me9d1.png?width=1920&format=png&auto=webp&s=d92e29b598711ebf0c9b9a77f3ee31d4d938a843",
      summer: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
      autumn: "https://akaina0809.github.io/images/6300219i.jpg",
      winter: "https://i.redd.it/i-make-minecraft-wallpaper-snow-edition-v0-uwgrubje8gza1.png?width=1920&format=png&auto=webp&s=927d9b7a599aa55b8ade82918eac58901eec3b7b",
    }
  } = options;

  const apply = () => {
    const el = document.getElementById(elementId);
    if (!el) return;

    const month = new Date().getMonth() + 1; // 1～12
    let url = images.winter; // 既定: 冬
    if ([3, 4, 5].includes(month)) {
      url = images.spring; // 🌸 春
    } else if ([6, 7, 8].includes(month)) {
      url = images.summer; // 🌊 夏
    } else if ([9, 10, 11].includes(month)) {
      url = images.autumn; // 🍁 秋
    }
    el.style.backgroundImage = `url('${url}')`;
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply, { once: true });
  } else {
    apply();
  }
}

// ======== グローバルへエクスポート ========
window.a1 = a1;
window.a2 = a2;
window.a3 = a3;
window.applySeasonalBackground = applySeasonalBackground;
