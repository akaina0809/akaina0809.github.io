const owner = 'akaina0809'; // GitHubリポジトリの所有者名
const repo = 'dsito';       // GitHubリポジトリの名前
const githubToken = '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'; // ←ご自身のGitHubトークンに置き換えてください

const fileNames = [
  'Touhou_Komeiji_Koishi_GUI_V1.5.mcpack',
  'skin_v2.0.1.mcaddon'
];

const set = ' DL'; // 表示する接尾語

// ページ読み込み完了後に実行
document.addEventListener("DOMContentLoaded", () => {
  fetchReleaseInfo(); // 初回取得
  setInterval(fetchReleaseInfo, 30000); // 30秒ごとに更新
});

function fetchReleaseInfo() {
  Promise.all(fileNames.map(fetchFileData))
    .then(displayReleaseInfo)
    .catch(error => {
     // console.error('Error fetching file info:', error);
    });
}

function fetchFileData(fileName) {
  return fetch(https://api.github.com/repos/${owner}/${repo}/releases, {
    headers: {
      Authorization: token ${githubToken}
    }
  })
    .then(response => {
      if (!response.ok) {
       // throw new Error(GitHub API response error: ${response.status});
      }
      return response.json();
    })
    .then(data => {
      let downloadCount = 0;
      let downloadUrl = '';
      data.forEach(release => {
        release.assets.forEach(asset => {
          if (asset.name === fileName) {
            downloadCount += asset.download_count;
            downloadUrl = asset.browser_download_url;
          }
        });
      });

      return {
        fileName,
        downloadCount,
        downloadUrl
      };
    });
}

function displayReleaseInfo(fileDataArray) {
  fileDataArray.forEach((fileData, index) => {
    const elementId = release-info${index + 1};
    const targetElement = document.getElementById(elementId);

    if (!targetElement) {
      console.warn(要素 '${elementId}' が見つかりませんでした。HTML に追加されているか確認してください。);
      return;
    }

    const releaseInfoHTML = 
      <div class="release-info">
        <div class="download-info">
          <button class="download-button" onclick="downloadAsset('${fileData.downloadUrl}')">Download</button>
          <a>: ${fileData.downloadCount}${set}</a>
        </div>
      </div>
    ;

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


/*const owner = 'akaina0809'; // GitHubリポジトリの所有者名
const repo = 'dsito'; // GitHubリポジトリの名前
const fileNames = [
    'Touhou.LittleMADE.addon.V.1.mcaddon',
    'Touhou_Komeiji_Koishi_GUI_V1.5.mcpack',
    'skin_v2.0.1.mcaddon',
    'document.pdf',
    'data.csv'
];

const set = ' DL'; // 名前



function fetchReleaseInfo() {
    Promise.all(fileNames.map(fileName => fetchFileData(fileName)))
        .then(fileDataArray => {
            displayReleaseInfo(fileDataArray);
        })
        .catch(error => {
            console.error('Error fetching file info:', error);
        });
}

function fetchFileData(fileName) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.github.com/repos/${owner}/${repo}/releases`)
            .then(response => response.json())
            .then(data => {
                let downloadCount = 0;
                let downloadUrl = '';
                data.forEach(release => {
                    release.assets.forEach(asset => {
                        if (asset.name === fileName) {
                            downloadCount += asset.download_count;
                            downloadUrl = asset.browser_download_url;
                        }
                    });
                });
                const fileData = {
                    fileName: fileName,
                    downloadCount: downloadCount,
                    downloadUrl: downloadUrl
                };
                resolve(fileData);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function displayReleaseInfo(fileDataArray) {
    fileDataArray.forEach((fileData, index) => {
        const releaseInfoHTML = `
            <div class="release-info">
                <div class="download-info">
                    <button class="download-button" onclick="downloadAsset('${fileData.downloadUrl}')">Download</button><a>: ${fileData.downloadCount}${set}</a>
                </div>
            </div>`;
        document.getElementById(`release-info${index + 1}`).innerHTML = releaseInfoHTML;
    });
}

function downloadAsset(url) {
    window.open(url, '_blank');
}

// 初期読み込み時にリリース情報を取得
fetchReleaseInfo();

// 30秒ごとにリリース情報を更新
setInterval(fetchReleaseInfo, 30000); // 30秒ごとに更新
*/
