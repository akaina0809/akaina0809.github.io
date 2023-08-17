$(function() {
    $('.mainimg-tate').vegas({
        slides: [
            { src: './touhou/touhou_1.png' },	//1枚目

            { src: './touhou/touhou_2.png' },	//2枚目

            { src: './touhou/touhou_3.png' },//3枚目

            { src: './touhou/touhou_4.png' },	//4枚目

            { src: './touhou/touhou_5.png' },	//5枚目
        ],
		transition: 'blur',			//https://vegas.jaysalvat.com/documentation/transitions/から好みのtransitionを選んで置き換えられます。
		animation: 'kenburns',		//https://vegas.jaysalvat.com/documentation/transitions/から好みのanimationを選んで置き換えられます。
		delay: 6000,				//次の画像を表示するまでの時間
		animationDuration: 10000,	//アニメーション間の引き継ぎタイミング。
		timer: false,				//プログレスバーを非表示に。
    });
});


$(function() {
    $('.mainimg-yoko').vegas({
        slides: [
            { src: './touhou/touhou_1.png' },	//1枚目

            { src: './touhou/touhou_2.png' },	//2枚目

            { src: './touhou/touhou_3.png' },//3枚目

            { src: './touhou/touhou_4.png' },	//4枚目

            { src: './touhou/touhou_5.png' },	//5枚目
        ],
		transition: 'blur',			//https://vegas.jaysalvat.com/documentation/transitions/から好みのtransitionを選んで置き換えられます。
		animation: 'kenburns',		//https://vegas.jaysalvat.com/documentation/transitions/から好みのanimationを選んで置き換えられます。
		delay: 6000,				//次の画像を表示するまでの時間
		animationDuration: 10000,	//アニメーション間の引き継ぎタイミング。
		timer: false,				//プログレスバーを非表示に。
    });
});
