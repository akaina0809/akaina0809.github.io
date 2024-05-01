// generateUUID 関数の定義
function generateUUID() {
  return 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function generateManifest(name, uuid) {
  let manifest = {
    "format_version": 2,
    "header": {
      "description": name.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\t/g, '\\t'),
      "name": name.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\t/g, '\\t'),
      "uuid": "b04ae331-58de-43d9-9731-c097549304d4",
      "version": [1, 0, 0],
      "min_engine_version": [1, 19, 60]
    },
    "modules": [
      {
        "description": "",
        "type": "script",
        "language": "javascript",
        "uuid": "726570d0-eb98-4dc4-8420-7fccc2120b47",
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



function convert() {
  let name = document.getElementById("name").value;
  let honbun = document.getElementById("honbun").value;
  let resultbox = document.getElementById("result");
  let copybtn = document.getElementById("copy_btn");
  let downloadbtn = document.getElementById("download_btn");
  copybtn.value = "コピーする";

  let uuid = generateUUID(); // UUID生成

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

  // manifest.jsonファイルを生成
  let manifestContent = generateManifest(name, uuid);

  // zipファイルに追加
  let zip = new JSZip();
  zip.file("scripts/main.js", resultpanel);
  zip.file("manifest.json", manifestContent);

  // zipファイルを生成してダウンロード
  zip.generateAsync({ type: "blob" })
    .then(function(blob) {
      let link = document.createElement('a');
      link.download = "my_plugin.zip";
      link.href = URL.createObjectURL(blob);
      link.click();
    });

  // 結果表示欄とボタンを更新
  resultbox.value = resultpanel;
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
