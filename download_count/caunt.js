//要素の取得
const number = document.querySelector('count');
const number2 = document.querySelector('count2');
const number3 = document.querySelector('count3');
const number4 = document.querySelector('count4');


const countButton = document.getElementById("countButton");
const countButton2 = document.getElementById("countButton2");
const countButton3 = document.getElementById("countButton3");
const countButton4 = document.getElementById("countButton4");

//ページ読み込み時の処理
window.addEventListener("load",()=>{
   //Local Storageの値を読み込み
    var jsonCount = localStorage.getItem('storage'); //【※1】localStorage.setItem　変えてはいけない
    count = JSON.parse(jsonCount) //【※2】
   //読み込んだcountがnull（カウントなし）の場合はHTMLの<P>を0に書き換え
    if(!count){  
        number.innerHTML = 0;
   //nullでない場合はHTMLの<P>をcountの値に書き換え
    }else{
        number.innerHTML = count;
    }
});

//ページ読み込み時の処理
window.addEventListener("load",()=>{
    //Local Storageの値を読み込み
     var jsonCount2 = localStorage.getItem('storage2'); //【※1】localStorage.setItem　変えてはいけない
     count2 = JSON.parse(jsonCount2) //【※2】
    //読み込んだcountがnull（カウントなし）の場合はHTMLの<P>を0に書き換え
     if(!count2){  
         number2.innerHTML = 0;
    //nullでない場合はHTMLの<P>をcountの値に書き換え
     }else{
         number2.innerHTML = count2;
     }
 });

 //ページ読み込み時の処理
 window.addEventListener("load",()=>{
     //Local Storageの値を読み込み
      var jsonCount3 = localStorage.getItem('storage3'); //【※1】localStorage.setItem　変えてはいけない
      count3 = JSON.parse(jsonCount3) //【※2】
     //読み込んだcountがnull（カウントなし）の場合はHTMLの<P>を0に書き換え
      if(!count3){  
          number3.innerHTML = 0;
     //nullでない場合はHTMLの<P>をcountの値に書き換え
      }else{
          number3.innerHTML = count3;
      }
  });

  //ページ読み込み時の処理
  window.addEventListener("load",()=>{
      //Local Storageの値を読み込み
       var jsonCount4 = localStorage.getItem('storage4'); //【※1】localStorage.setItem　変えてはいけない
       count4 = JSON.parse(jsonCount4) //【※2】
      //読み込んだcountがnull（カウントなし）の場合はHTMLの<P>を0に書き換え
       if(!count4){  
           number4.innerHTML = 0;
      //nullでない場合はHTMLの<P>をcountの値に書き換え
       }else{
           number4.innerHTML = count4;
       }
   });
 


//ボタンがクリックされたときの処理
countButton.addEventListener('click',function(){
    count ++;
    number.innerHTML = count;
   //Local Storageに値を保存
    jsonCount = JSON.stringify(count); //【※3】;
    localStorage.setItem('storage',jsonCount)  //【※4】
});


//ボタンがクリックされたときの処理
countButton2.addEventListener('click',function(){
    count2 ++;
    number2.innerHTML = count2;
   //Local Storageに値を保存
    jsonCount2 = JSON.stringify(count2); //【※3】;
    localStorage.setItem('storage2',jsonCount2)  //【※4】localStorage.setItem　変えてはいけない
});



//ボタンがクリックされたときの処理
countButton3.addEventListener('click',function(){
    count3 ++;
    number3.innerHTML = count3;
   //Local Storageに値を保存
    jsonCount3 = JSON.stringify(count3); //【※3】;
    localStorage.setItem('storage3',jsonCount3)  //【※4】localStorage.setItem　変えてはいけない
});


//ボタンがクリックされたときの処理
countButton4.addEventListener('click',function(){
    count4 ++;
    number4.innerHTML = count4;
   //Local Storageに値を保存
    jsonCount4 = JSON.stringify(count4); //【※3】;
    localStorage.setItem('storage4',jsonCount4)  //【※4】localStorage.setItem　変えてはいけない
});
