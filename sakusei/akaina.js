// generateUUID 関数の定義
function generateUUID() {
  return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function generateManifest(name, name2, uuid, uuid2) {
  let manifest = {
    "format_version": 2,
    "header": {
      "name": name.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\t/g, '\\t'),
      "description": name2.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\t/g, '\\t'),
      "uuid": uuid,
      "version": [1, 0, 0],
      "min_engine_version": [1, 19, 60]
    },
    "modules": [
      {
        "description": name2.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\t/g, '\\t'),
        "type": "script",
        "language": "javascript",
        "uuid": uuid2,
        "version": [1, 0, 0],
        "entry": "scripts/main.js"
      }
    ],
    "dependencies": [
      {
        "module_name": "@minecraft/server",
        "version": "1.10.0"
      },
      {
        "module_name": "@minecraft/server-ui",
        "version": "1.2.0-beta"
      }
    ]
  };
  return JSON.stringify(manifest, null, 2);
}


function generateScript(name, honbun) {
  let resultpanel = `import { world, system } from "@minecraft/server";\nworld.beforeEvents.chatSend.subscribe(ev => {
                const { message } = ev;
                const player = ev.sender;
        if (message === "!akaina0807") {
          ev.cancel = true;
          const player = ev.sender;
          player.runCommandAsync('tellraw @s {"rawtext":[{"text":"<server>これは赫稲が作成したサイトから作れます。アプデで使えなくなった場合はYouTubeまたはコロニーにて報告をお願いします。discord Twitter でも構いません。"}]}');
        `;
  if (name === '') {
    window.alert('個人名が空欄です。\n個人名には分かりやすい名前を入力してください。');
    return;
  }

  for (let i = 0; i < honbun.split('\n').length; i++) {
    console.log(i);
    let currentgyou = honbun.split(/\r\n|\r|\n/)[i].replace(/\\/g, '\\\\');
    if (i > 0) resultpanel = resultpanel + '\n';
    if (currentgyou.startsWith('h>')) {
      resultpanel = resultpanel + `\n}  if (message === "${currentgyou.replace('h>', '')}") { 
			    ev.cancel = true;`;
      continue;
    }
    if (currentgyou.startsWith('c>')) {
      resultpanel = resultpanel + `			  player.runCommandAsync('${currentgyou.replace('c>', '')}');`;
      continue;
    }
    if (currentgyou.startsWith('no>')) {
      resultpanel = resultpanel + `\n}  if (message === "${currentgyou.replace('no>', '')}") { 
			    ev.cancel = true;
			    player.runCommandAsync('tellraw @s[tag=!no] {"rawtext":[{"text":"この言葉は禁止されております。(This word is prohibited.)"}]}');`;
      continue;
    }

    //HSPで作ってたときのやつと互換性を維持するためのやつ
    if (currentgyou.startsWith('htp:h>')) {
      resultpanel = resultpanel + `\n}if (message === "${currentgyou.replace('htp:h>', '')}") { 
			    ev.cancel = true;`;
      continue;
    }

    if (currentgyou.startsWith('htp:c>')) {
      resultpanel = resultpanel + `			  player.runCommandAsync('${currentgyou.replace('htp:c>', '')}');`;
      continue;
    }

    if (currentgyou.startsWith('htp:no>')) {
      resultpanel = resultpanel + `\n}(message === "${currentgyou.replace('htp:no>', '')}") { 
			    ev.cancel = true;
			    player.runCommandAsync('tellraw @s {"rawtext":[{"text":"この言葉は禁止されております。(This word is prohibited.)"}]}');`;
      continue;
    }

    resultpanel = resultpanel + `//${currentgyou}`;
  }
  resultpanel = resultpanel + '\n}\n});';

  return resultpanel;

}

/**
function generateScript(name, honbun) {
  let resultpanel = `//${name.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\t/g, '\\t')}\n\nimport { world, system } from "@minecraft/server";\nworld.beforeEvents.chatSend.subscribe(ev => {
        if (ev.message.startsWith("!akaina0807")) {
          ev.cancel = true;
          const player = ev.sender;
          player.runCommandAsync('tellraw @s {"rawtext":[{"text":"<server>これは赫稲が作成したサイトから作れます。アプデで使えなくなった場合はYouTubeまたはコロニーにて報告をお願いします。discord Twitter でも構いません。"}]}');
        `;
  if (name === '') {
    window.alert('個人名が空欄です。\n個人名には分かりやすい名前を入力してください。');
    return;
  }

  for (let i = 0; i < honbun.split('\n').length; i++) {
    console.log(i);
    let currentgyou = honbun.split(/\r\n|\r|\n/)[i].replace(/\\/g, '\\\\');
    if (i > 0) resultpanel = resultpanel + '\n';
    if (currentgyou.startsWith('h>')) {
      resultpanel = resultpanel + `\n}else if (ev.message.startsWith("!${currentgyou.replace('h>', '')}")) {
			    ev.cancel = true;
			    const player = ev.sender;`;
      continue;
    }
    if (currentgyou.startsWith('c>')) {
      resultpanel = resultpanel + `			  player.runCommandAsync('${currentgyou.replace('c>', '')}');`;
      continue;
    }
    if (currentgyou.startsWith('no>')) {
      resultpanel = resultpanel + `\n}else if (ev.message.startsWith("${currentgyou.replace('no>', '')}")) {
			    ev.cancel = true;
			    const player = ev.sender;
			    player.runCommandAsync('tellraw @s[tag=!no] {"rawtext":[{"text":"この言葉は禁止されております。(This word is prohibited.)"}]}');`;
      continue;
    }

    //HSPで作ってたときのやつと互換性を維持するためのやつ
    if (currentgyou.startsWith('htp:h>')) {
      resultpanel = resultpanel + `\n}else if (ev.message.startsWith("!${currentgyou.replace('htp:h>', '')}")) {
			  ev.cancel = true;
			  const player = ev.sender;`;
      continue;
    }

    if (currentgyou.startsWith('htp:c>')) {
      resultpanel = resultpanel + `			  player.runCommandAsync('${currentgyou.replace('htp:c>', '')}');`;
      continue;
    }

    if (currentgyou.startsWith('htp:no>')) {
      resultpanel = resultpanel + `\n}else if (ev.message.startsWith("${currentgyou.replace('htp:no>', '')}")) {
			    ev.cancel = true;
			    const player = ev.sender;
			    player.runCommandAsync('tellraw @s {"rawtext":[{"text":"この言葉は禁止されております。(This word is prohibited.)"}]}');`;
      continue;
    }

    resultpanel = resultpanel + `//${currentgyou}`;
  }
  resultpanel = resultpanel + '\n}\n});';

  return resultpanel;

}
*/

function download_mcpack() {
  let name = document.getElementById("name").value;
  let name2 = document.getElementById("name2").value;
  let honbun = document.getElementById("honbun").value;

  let uuid = generateUUID(); // UUID生成
  let uuid2 = generateUUID(); // UUID2生成

  let manifestContent = generateManifest(name, name2, uuid, uuid2);
  let scriptContent = generateScript(name, honbun);

  // 画像ファイルの取得
  let imageFileInput = document.getElementById("imageInput");
  let imageFile;
  if (!imageFileInput.files || imageFileInput.files.length === 0) {
    // 画像が選択されていない場合、デフォルトの画像を設定する
    imageFile = getDefaultImage();
  } else {
    imageFile = imageFileInput.files[0];
  }

  let zip = new JSZip();
  zip.file("scripts/main.js", scriptContent);
  zip.file("manifest.json", manifestContent);

  // 画像ファイルを追加
  zip.file("pack_icon.png", imageFile, { binary: true });

  zip.generateAsync({ type: "blob" })
    .then(function(blob) {
      // .zipファイルを生成
      let zipFile = new JSZip();
      zipFile.file(name + "/manifest.json", manifestContent);
      zipFile.file(name + "/scripts/main.js", scriptContent);
      zipFile.file(name + "/pack_icon.png", imageFile, { binary: true });

      zipFile.generateAsync({ type: "blob" })
        .then(function(packBlob) {
          // .mcpackファイルとしてダウンロード
          if (window.navigator.msSaveBlob) {
            // Internet ExplorerやMicrosoft Edge
            window.navigator.msSaveBlob(packBlob, name + ".mcpack");
          } else {
            // iOS および Android 用のダウンロード処理
            if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
              // iOS の場合
              const reader = new FileReader();
              reader.onload = function() {
                const link = document.createElement('a');
                link.href = reader.result;
                link.setAttribute('download', name + ".mcpack");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              };
              reader.readAsDataURL(packBlob);
            } else if (/Android/.test(navigator.userAgent)) {
              // Android の場合
              const link = document.createElement('a');
              link.href = URL.createObjectURL(packBlob);
              link.setAttribute('download', name + ".mcpack");
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            } else {
              // その他のブラウザ
              const link = document.createElement('a');
              link.download = name + ".mcpack";
              link.href = URL.createObjectURL(packBlob);
              link.click();
            }
          }
        });
    });
}

// デフォルトの画像を取得する関数
function getDefaultImage() {
  // デフォルトの画像のパスを指定してください
  let defaultImagePath = "./pack_icon.png";
  // ここではデフォルトの画像として空の画像ファイルを作成しています
  return new File([], defaultImagePath);
}

/*
    function download_mcpack() {
      let name = document.getElementById("name").value;
      let name2 = document.getElementById("name2").value;
      let honbun = document.getElementById("honbun").value;
      
      let uuid = generateUUID(); // UUID生成
      let uuid2 = generateUUID(); // UUID2生成

      let manifestContent = generateManifest(name, name2, uuid, uuid2);
      let scriptContent = generateScript(name, honbun);

      // 画像ファイルの取得
      let imageFileInput = document.getElementById("imageInput");
      if (!imageFileInput.files || imageFileInput.files.length === 0) {
        alert("画像ファイルを選択してください。");
        return;
      }
      let imageFile = imageFileInput.files[0];

      let zip = new JSZip();
      zip.file("scripts/main.js", scriptContent);
      zip.file("manifest.json", manifestContent);

      // 画像ファイルを追加
      zip.file("pack_icon.png", imageFile, { binary: true });

      zip.generateAsync({ type: "blob" })
        .then(function(blob) {
          // .zipファイルを生成
          let zipFile = new JSZip();
    //      zipFile.file("pack_manifest.json", JSON.stringify({ "format_version": 2, "header": { "description": name, "name": name, "uuid": uuid, "version": [1, 0, 0], "min_engine_version": [1, 19, 60] } }, null, 2));
          zipFile.file(name + "/manifest.json", manifestContent);
          zipFile.file(name + "/scripts/main.js", scriptContent);
          zipFile.file(name + "/pack_icon.png", imageFile, { binary: true });

          zipFile.generateAsync({ type: "blob" })
            .then(function(packBlob) {
              // .mcpackファイルとしてダウンロード
              let link = document.createElement('a');
              link.download = name + ".mcpack";
              link.href = URL.createObjectURL(packBlob);
              link.click();
            });
        });
    }
/*
function download_file() {
  let name = document.getElementById("name").value;
  let honbun = document.getElementById("honbun").value;
  
  let uuid = generateUUID(); // UUID生成
  let uuid2 = generateUUID(); // UUID2生成

  let manifestContent = generateManifest(name, uuid, uuid2);
  let scriptContent = generateScript(name, honbun);

  let zip = new JSZip();
  zip.file("scripts/main.js", scriptContent);
  zip.file("manifest.json", manifestContent);

  zip.generateAsync({ type: "blob" })
    .then(function(blob) {
      let link = document.createElement('a');
      link.download = "test.zip";
      link.href = URL.createObjectURL(blob);
      link.click();
    });
}
*/
function convert() {
  let name = document.getElementById("name").value;
  let name2 = document.getElementById("name2").value;
  let honbun = document.getElementById("honbun").value;
  let resultbox = document.getElementById("result");
  let copybtn = document.getElementById("copy_btn");
  let downloadbtn = document.getElementById("download_btn");
  copybtn.value = "コピーする";

  let uuid = generateUUID(); // UUID生成
  let uuid2 = generateUUID(); // UUID2生成

  let manifestContent = generateManifest(name, uuid, uuid2);
  let scriptContent = generateScript(name, honbun);

  resultbox.value = scriptContent;
  downloadbtn.disabled = false;
  copybtn.disabled = false;
}

function copy_to_clip() {
  let resultbox = document.getElementById("result")
  let copybtn = document.getElementById("copy_btn")
  if (navigator.clipboard) {
    navigator.clipboard.writeText(resultbox.value)
    copybtn.value = "コピーしました!";
  } else {
    alert("大変申し訳ありませんが、お使いのブラウザはクリップボードのコピーに対応しておりません。\nResult欄から手動でコピーしてください。");
  }
}

