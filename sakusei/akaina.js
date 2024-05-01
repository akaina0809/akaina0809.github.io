function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}



function generateManifest(name, uuid) {
  let manifest = {
    "uuid": uuid,
    "name": name,
    "version": "1.0",
    "description": "Your description here",
    // 他の必要なフィールドを追加することもできます
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
  zip.file("main.js", resultpanel);
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
