const owner = "akaina0809";
const repo = "dsito";

// 表示対象のファイル名一覧（この順に表示される）
const fileNames = [
  'Touhou_Komeiji_Koishi_GUI_V1.5.mcpack',
  'skin_v2.0.1.mcaddon',
  'Probability_Drop_Addon.mcaddon'

];

const set = ' DL'; // 表示用テキスト
const apiUrl = `https://akaina0809.akainaqiaotian.workers.dev?owner=${owner}&repo=${repo}`;

document.addEventListener("DOMContentLoaded", () => {
  fetchReleaseInfo();
  setInterval(fetchReleaseInfo, 30000);
});

function fetchReleaseInfo() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const releases = Array.isArray(data) ? data : [];
      const flatAssets = releases.flatMap(release => release.assets);

      // fileNames の順に表示を揃える
      const filteredData = fileNames.map(name => {
        const asset = flatAssets.find(a => a.name === name);
        return {
          fileName: name,
          downloadCount: asset ? asset.download_count : 0,
          downloadUrl: asset ? asset.browser_download_url : ''
        };
      });

      displayReleaseInfo(filteredData);
    })
    .catch(error => {
      console.error("エラー:", error);
      fileNames.forEach((_, index) => {
        const el = document.getElementById(`release-info${index + 1}`);
        if (el) el.innerHTML = `<div class="download-info">取得失敗</div>`;
      });
    });
}

function displayReleaseInfo(fileDataArray) {
  fileDataArray.forEach((fileData, index) => {
    const elementId = `release-info${index + 1}`;
    const targetElement = document.getElementById(elementId);

    if (!targetElement) {
      console.warn(`要素 '${elementId}' が見つかりませんでした。`);
      return;
    }

    const releaseInfoHTML = `<br>
      <div class="release-info">
        <div class="download-info">
          <button class="download-button" onclick="downloadAsset('${fileData.downloadUrl}')">Download</button>
          <a>: ${fileData.downloadCount}${set}</a>
        </div>
      </div>
    `;

    targetElement.innerHTML = releaseInfoHTML;
  });
}

function downloadAsset(url) {
  if (url) {
    window.open(url, '_blank');
  } else {
    alert('ダウンロードリンクが取得できませんでした。');
  }
}
