const owner = "akaina0809";
const repo = "dsito";

const fileNames = [
  "Touhou_Komeiji_Koishi_GUI_V1.5.mcpack",
  "skin_v2.0.1.mcaddon",
  "Probability_Drop_Addon.mcaddon"
];

const set = " DL";
const apiUrl = `https://api.github.com/repos/${owner}/${repo}/releases`;

document.addEventListener("DOMContentLoaded", () => {
  fetchReleaseInfo();
  setInterval(fetchReleaseInfo, 30000);
});

async function fetchReleaseInfo() {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) throw new Error("APIエラー");

    const data = await response.json();
    const releases = Array.isArray(data) ? data : [];
    const flatAssets = releases.flatMap(r => r.assets || []);

    const filteredData = fileNames.map(name => {
      const asset = flatAssets.find(a => a.name === name);
      return {
        fileName: name,
        downloadCount: asset?.download_count ?? 0,
        downloadUrl: asset?.browser_download_url ?? ""
      };
    });

    displayReleaseInfo(filteredData);

  } catch (error) {
    console.error("取得失敗:", error);
  }
}

function displayReleaseInfo(files) {
  files.forEach((file, index) => {
    const el = document.getElementById(`release-info${index + 1}`);
    if (!el) return;

    el.innerHTML = `
      <div class="release-info">
        <button onclick="downloadAsset('${file.downloadUrl}')">Download</button><br>
        <span>${file.downloadCount}${set}</span>
      </div>
    `;
  });
}

function downloadAsset(url) {
  if (url) window.open(url, "_blank");
  else alert("ダウンロードリンクがありません");
}
