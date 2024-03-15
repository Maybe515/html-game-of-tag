enchant();

function kekka(){
	var game = new Game(528,400);
	game.fps = 24;
	var ok = 0;

//男クマ表示
	game.preload('chara1.png');
	game.onload=function(){
		var kuma=new Sprite(32,32);
		kuma.image=game.assets['chara1.png'];
		game.rootScene.addChild(kuma);
//男クマ、歩く
		kuma.frameIndex = 0;
		var frameList = [0,1,2];
	//歩くアニメーションをサブルーチンで
		function kuma_anim(){
			if(game.frame %2 ==0){
				kuma.frameIndex ++;
				kuma.frameIndex %= frameList.length;
				kuma.frame = frameList[kuma.frameIndex];
			}//クマアニメのサブルーチン的なやつ
		}//男クマが歩くやつ

//キーボードの矢印キーで男クマ動かす
		kuma.onenterframe = function(){
			if(game.input.right){
				this.x += 3;
				this.scaleX = 1;
				kuma_anim();
			}
			if(game.input.down){
				this.y += 3;
				this.scaleX = -1;
				kuma_anim();
			}
			if(game.input.left){
				this.x -= 3;
				this.scaleX = -1;
				kuma_anim();
			}
			if(game.input.up){
				this.y -= 3;
				this.scaleX = 1;
				kuma_anim();
			}
		}//男クマが上下左右動くやつ


//白クマ表示
		var kumaOyaji = new Sprite(32,32);
		kumaOyaji.image = game.assets['chara1.png'];
		game.rootScene.addChild(kumaOyaji);
//白クマ、歩く
		kumaOyaji.frameIndex = 5;
		var frameList2 = [5,6,7];
		kumaOyaji.x = 100;
		kumaOyaji.y = 300;
	//歩くアニメーションをサブルーチンで
		function kumaOyaji_anim(){
			if(game.frame %2 ==1){
				kumaOyaji.frameIndex ++;
				kumaOyaji.frameIndex %= frameList.length;
				kumaOyaji.frame = frameList2[kumaOyaji.frameIndex];
			}//クマアニメのサブルーチン的なやつ
		}//白クマが歩くやつ

		kumaOyaji.onenterframe = function(){
				this.x += Math.floor(Math.random()*(18));
				this.y -= Math.floor(Math.random()*(15));
				this.x -= Math.floor(Math.random()*(15));
				this.y += Math.floor(Math.random()*(13));
				this.scaleX = 1;
				kumaOyaji_anim();
//白クマ泣こうがどうでｍ……捕まえたー
			if(this.within(kuma,16)){
				kumaOyaji.frame = 8;
				kumaOyaji.onenterframe = null;
				ok++;
			}//白クマ確保ー
		}//白クマが動くやつ

//女クマ表示
		var kumaGirl = new Sprite(32,32);
		kumaGirl.image = game.assets['chara1.png'];
		game.rootScene.addChild(kumaGirl);
//女クマ、歩く
		kumaGirl.frameIndex = 10;
		var frameList3 = [10,11,12];
		kumaGirl.x = 300;
		kumaGirl.y = 300;
	//歩くアニメーションをサブルーチンで
		function kumaGirl_anim(){
			if(game.frame %3 ==2){
				kumaGirl.frameIndex ++;
				kumaGirl.frameIndex %= frameList.length;
				kumaGirl.frame = frameList3[kumaGirl.frameIndex];
			}//クマアニメのサブルーチン的なやつ
		}//女クマが歩くやつ

		kumaGirl.onenterframe = function(){
				this.x += Math.floor(Math.random()*(15));
				this.y -= Math.floor(Math.random()*(18));
				this.x -= Math.floor(Math.random()*(18));
				this.y += Math.floor(Math.random()*(15));
				this.scaleX = -1;
				kumaGirl_anim();
//女クマ泣k……捕まえた
			if(this.within(kuma,16)){
				kumaGirl.frame = 13;
				kumaGirl.onenterframe = null;
				ok++;
			}//女クマ確保
		}//女クマが動くやつ


//ヤンクマ表示
		var kumaYounger = new Sprite(32,32);
		kumaYounger.image = game.assets['chara1.png'];
		game.rootScene.addChild(kumaYounger);
//ヤンクマ、歩く
		kumaYounger.frame = 4;
		kumaYounger.x = 200;
		kumaYounger.y = 350;
	//歩くアニメーションをサブルーチンで
		function kumaYounger_anim(){
		}//ヤンクマが歩くやつ

		kumaYounger.onenterframe = function(){
				this.x += Math.floor(Math.random()*(21));
				this.x -= Math.floor(Math.random()*(20));
				this.scaleX = 1;
				kumaYounger_anim();
//ヤンクマ泣かしたー
			if(this.within(kuma,16)){
				kumaYounger.frame = 3;
				kumaYounger.onenterframe = null;
				ok++;
			}//ヤンクマ確保！
		}//ヤンクマが動くやつ

//勝利者ラベル
		winLabel = new Label();
		winLabel.moveTo(185,144);
		winLabel.font = "16px 'Mairyo','メイリオ','sans-serif'";
		winLabel.text = '';
		game.rootScene.addChild(winLabel);
//制限時間とかでるラベル作る
		timeLabel = new Label();
		timeLabel.moveTo(195,5);
		timeLabel.font = "14px 'Mairyo','メイリオ','sans-serif'";
		timeLabel.text = 'Time : ';
		timeLabel.color = '#999999';
		game.rootScene.addChild(timeLabel);
//タイマーで残り時間でる
		game.onenterframe = function(){
			var time = 0 + Math.floor(game.frame / game.fps);
			timeLabel.text = '　　　Time : ' + time;
			if(ok==3){
				timeLabel.text = ' Win! ';
				winLabel.text = 'おめでとー';
				timeLabel.color = '#cc0000';
				kuma.onenterframe = null;
				game.onenterframe = null;
			}
	//秒過ぎたらクマ強制麻痺
			if(time>=15){
				timeLabel.text = ' Lose ';
				winLabel.text = '残念でした～';
				timeLabel.color = '#0000cc';
				kuma.onenterframe = null;
				kumaOyaji.onenterframe = null;
				kumaGirl.onenterframe = null;
				kumaYounger.onenterframe = null;
				game.onenterframe = null;
			}//ゲームクリア!!
		}//制限時間カウント
	}//gameをロードのやつ
	game.start();
}//スタートボタンのやつ
