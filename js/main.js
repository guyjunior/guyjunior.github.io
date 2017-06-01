
var os = navigator.userAgent.toLowerCase();
var isAndroid = os.indexOf("android") > -1; //&& ua.indexOf("mobile");
if(isAndroid) {
 alert("Desculpe, esse navegador ainda não é suportado para esse app!!")
}else{
	document.title=">>Guy Junior";
	var game = new Phaser.Game(800 , 600, Phaser.CANVAS, '', { preload: preload, create: create, update: update });
}


var cursors;
var players;
var player;
var debugText;
var ground;
var details;
var tween;
var flyergap;
var frame;
var fan_flyer;
var langs;
var ff1;
var ff2;
var ff3;
var intro;
var contact_screen;



function preload() {
	game.load.audio('jump',['res/jump.mp3','res/jump.ogg']);
	game.load.audio('music',['res/music.mp3','res/music.ogg']);	
	game.load.spritesheet('tux', 'res/sprite_teste.png', 67, 85, 6);
	game.load.spritesheet('flyer_fan', 'res/fan_flyers.png', 69.5, 49, 6);
	game.load.image('flyer_gap', 'res/flyergap.png');
	game.load.image('languages', 'res/languages.png');
	game.load.image('fundo', 'res/background02.jpg');
	game.load.image('sign', 'res/sign.png');
	game.load.image('profile', 'res/profile_icon.png');
	game.load.image('capelo', 'res/capelo.png');
	game.load.image('xp', 'res/xp.png');
	game.load.image('ground', 'res/grounds.png');
	game.load.image('frame', 'res/frame.png');
	game.load.image('intro', 'res/intro.png');
	game.load.image('contact_screen', 'res/contact_screen.png');
	game.load.bitmapFont('carrier_command', 'res/fonts/carrier_command.png', 'res/fonts/carrier_command.xml');
	
}

function create() {
	music = game.add.audio("music");
	music.play('',0,1,true);
	
	game.stage.backgroundColor = "#DDDDDD";
	game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
	//game.scale.setGameSize(1200, 600);

	game.physics.startSystem(Phaser.Physics.P2JS);
	
	game.world.setBounds(0, 0, 1024, 1524);
	game.add.tileSprite(0, 0, 1024, 1524, 'fundo');
	players = game.add.group();
	players.enableBody = true;
	createPlayer(15,1300, -300, 150);		
	
	platforms = game.add.group();	
	platforms.enableBody =  true;
	
	fan_flyers = game.add.group();
	fan_flyers.enableBody = true;
	
	intro = game.add.group();
	
	
		
	objectsBackground = game.add.group();
	objectsBackground.enableBody =  true;	
	
	
	createPlatform();
	createFlyerGap(0,950);
	ff1 = createFanFlyer(695, 750);
	ff2 = createFanFlyer(695 + 90, 750);	
	ff3 = createFanFlyer(695 + 90 * 2, 750);	
	
		
	createIntro();
			
	var style = { font: "bold 20px arcade", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

    //  The Text is positioned at 0, 100
    debugText = game.add.text(0, 0, "", style);
    debugText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

    //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
    debugText.setTextBounds(0, 100, 800, 100);
	
	bmpText = game.add.bitmapText(450, 477, 'carrier_command',"",20);
	
	detailText = game.add.text(0, 0, "", style);;
	
	cursors = game.input.keyboard.createCursorKeys();

	floatFrames = game.add.group();
	
	frame = floatFrames.create(100, game.world.width/2 - 930 , 'frame');
	frame.scale.setTo(1.68,4.5);
	
	details = game.input.keyboard.addKey(Phaser.Keyboard.G);
	
	contact_screen = game.add.image(-1000, 1000,'contact_screen');
	
	langs = game.add.sprite(200,  -400);
	langs.scale.setTo(1.38);
	
	
}

var hit  = 0;
var movY = '650';
function move (){
	hit +=1;
	if(hit % 2 != 0){
		game.add.tween(frame).to( { y: "+"+movY }, 1000, Phaser.Easing.Linear.None, true);
	}else{
		game.add.tween(frame).to( { y: '-'+movY }, 1000, Phaser.Easing.Linear.None, true);
	}	
}


var show_contact = false;



function update() {
	playerUpdate();
	
	game.world.bringToTop(langs);
	game.world.bringToTop(platforms);
	game.world.bringToTop(players);
	game.world.bringToTop(fan_flyers);
	game.world.bringToTop(floatFrames);
	game.world.bringToTop(intro);	
	game.world.bringToTop(detailText);
}

function createFlyerGap(x, y){
	flyergap = platforms.create(x, y, 'flyer_gap');
	flyergap.scale.setTo(2,2);
	flyergap.body.colliderWorldBounds = true;
	flyergap.body.immovable = true;
	return flyergap;
}

function createFanFlyer(x, y){
	fan_flyer = fan_flyers.create(x, y, 'flyer_fan');
	fan_flyer.body.collideWorldBounds = true;
	fan_flyer.body.immovable = true;
	fan_flyer.animations.add('fan', [0,1,2], 15, true);
	fan_flyer.animations.play('fan');
	fan_flyer.scale.setTo(1.5, 1.5);
	return fan_flyer;
}

function createPlayer(x,y,j,v){
	var player = players.create(x,y, 'tux');	
	player.body.bounce.y = 0;
	player.body.gravity.y = 300;
	player.body.collideWorldBounds = true
	
	player.jump = j;
	player.v = v;
	
	player.animations.add('start', [3], 10, true);
	player.animations.play('start');
	
	player.animations.add('left', [0,1,2], 15, true);	
    player.animations.add('right', [3,4,5], 15, true);
	
	
	game.camera.follow(player);
	
}

var y = 0;

var tmp = 0;
var tmp2 = 0;
var tmp3 = 0;
var hit_platflyer = false;
var hit_fan = false;
var teste;

function movePlatFlyer(){
	if(tmp == 0){
		var tween = game.add.tween(teste).to( { x: 0,y: 950 }, 1000, Phaser.Easing.Linear.None, true);		
		tween.onComplete.add(function() { 
			tmp = 0;			
		});
	}	
	tmp = 1;	
}

function moveLangs(v_y){
	if(tmp2 == 0){
		var tween = game.add.tween(langs).to( { y:v_y }, 12500, Phaser.Easing.Linear.None, true);		
		tween.onComplete.add(function() { 
			tmp2 = 0;			
		});
	}else{
		
	}	
	tmp2 = 1;	
}

function screen_contact(v_x, v_y){	
	if(tmp3 == 0){
		var tween = game.add.tween(contact_screen).to( { y:v_y , x: v_x}, 1000, Phaser.Easing.Linear.None, true);		
		tween.onComplete.add(function() { 
			tmp3 = 0;			
		});
	}else{
		
	}	
	tmp3 = 1;
	
}





function playerUpdate(){

	game.physics.arcade.collide(players, fan_flyers, function(p, f){
		hit_platflyer =  false;
		
		ff1.body.velocity.y = -25;
		ff2.body.velocity.y = -20;
		ff3.body.velocity.y = -15;
		
		if(p.y <= 600){
			moveLangs(1000);
		}
		
		if(p.y <= 125){
			
			if(p.x >= 683 && p.x <= 750){
				
			}	
		}
		
		
		if(ff1.body.y <= 210){			
			ff1.body.velocity.y = 0;
			ff2.body.velocity.y = 0;
			ff3.body.velocity.y = 0;
			screen_contact(p.x/2 - 110, p.y + 10);
			
		}
		
		
		hit_fan = true;
			
		
	});
 	game.physics.arcade.collide(players, platforms, function(a, b){
		
		if(b.key == 'flyer_gap'){
			teste = b;			
			hit_platflyer = true;
			hit_fan = false;
			b.body.velocity.y = -100;
			b.body.velocity.x = 100;			
			if(Math.round(b.body.y) < 750 ){
				b.body.velocity.y = 0;
				if(Math.round(b.body.x) > 480){					
					b.body.velocity.x = 0;				
				}			    
			}			
		}else{			
			hit_platflyer = false;
			hit_fan = false
		}
		
	});	
	//console.log(hit_fan);
	
	
	if(!hit_fan){
		
		moveLangs(-500);		
		ff2.body.velocity.y = 0;
		ff2.body.velocity.y = 0;
		ff3.body.velocity.y = 0;
		game.add.tween(ff1).to( { y:690 }, 500, Phaser.Easing.Linear.None, true)
		game.add.tween(ff2).to( { y:690 }, 500, Phaser.Easing.Linear.None, true);
		game.add.tween(ff3).to( { y:690 }, 500, Phaser.Easing.Linear.None, true);
		
	}
	
	if(!hit_platflyer){
		try{
			//console.log(tmp);
			teste.body.velocity.x =0;
			teste.body.velocity.y = 0;
			movePlatFlyer();
		}catch(e){
		}
		
	}else{
		
		//moveLangs(-250);
			
		
	}
	
		
	players.forEach(function(p){
		var jumping = false;
		if(p.body.velocity.y < -0.9  || p.body.velocity.y > 10  ){
			jumping = true;
		}
		if(jumping){
			p.animations.stop();
		}
		p.body.velocity.x = 0;
		/*debugText.text = "{x:"+Math.round(p.x)+" | "+"y:"+Math.round(p.y)+" | frameY: "+Math.round(frame.y)+"}";
		debugText.x = p.x - 280;
		debugText.y = p.y-160;*/
		
				
		if(p.x > 647 && p.x < 801){
			movY = 1400;
			frame.x = p.x - 300;
			showFrame(p,[647, 801], 1241,"Quem sou eu?\r\n","\nSou Guy Junior e tenho \n23 anos, Brasileiro\n, Carioca e apaixonado\npor tecnologia." );		
		}
		
		else if(p.x > 300 && p.x < 418){
			movY = 1300;
			frame.x = p.x - 300;
			showFrame(p,[300, 418], 1139, "GraduacAO\r\n","\n- Analise e Desenvolvimento \n  de Sistemas  (2016)\n\n\npos GraduacAO\r\n\n- SEGURANCA DA INFORMACAO " );		
		}
		
		else if(p.x > 100 && p.x < 180){			
			movY = 1200;
			frame.x = p.x - 80;
			var textExp1 = "\n# LABORATORIO brasileiro de\n  CONTROLE DE DOPAGEM (LBCD) \n\n- JOGOS OLIMPICOS E \n  PARALIMPICOS 2016 \n- ACREDITACOES INMETRO \n- ACREDITACOES WADA\n  (World Anti-Doping Agency)";
			var exp;
			var arrText = [textExp1];
			if(y > 501 && y < 1000){
				exp = arrText[0];				
			}else if(y > 15 && y < 500 ){
				exp = arrText[0];
			}else if(y > 1001){
				y = 0;				
			}
			y++;
			showFrame(p,[100, 180], 999, "  Experiencias Profissionais\r\n", exp);	
		}		
		else{
			if(hit % 2 != 0){
				details.onDown.add(move, this);
				game.add.tween(frame).to( { y: '-'+movY }, 1000, Phaser.Easing.Linear.None, true);
				game.add.tween(detailText).to( { y: '-'+movY }, 1000, Phaser.Easing.Linear.None, true);		
				hit = 0;
			}
			bmpText.text = ""; 
			details.onDown.remove(move, this);			
		}
		
		if(cursors.left.isDown){
			
			p.body.velocity.x =  -p.v;
			p.animations.play('left');		
			
		}else if(cursors.right.isDown){
			p.body.velocity.x = p.v;
			p.animations.play('right');
						
		}else{
			p.animations.stop();
		}
		
		if(cursors.up.isDown && p.body.touching.down ){
			var snd = game.add.audio("jump");
			snd.play();
			p.body.velocity.y = p.jump;
			createIntro(cursors);
		}
		
	});
}


function showFrame(p,x,y,text1,text2,loadImage)
{
	if(p.x > x[0] && p.x < x[1]){
			if(Math.round(p.y) == y ){				
				details.onDown.add(move, this);
				//details.onDown.add(sp.tooglePause, this);
				bmpText.text = "Pressione a tecla G!!";
				bmpText.y = p.y - 200;
				bmpText.x = p.x - 200;
				
				detailText.text = text1;
				detailText.text += text2;
				
				detailText.y = frame.y + 90;
				detailText.x = frame.x + 40;
				
				if(typeof(loadImage) == 'object'){
					genImage = game.create(110 + 240, game.world.height - 400, loadImage[0]);				
				}
				
				
			}		 
		}	
}

var createIntro = function (touch){
	if(touch == undefined){
		intro.create(100,950,'intro');
	}else{
		game.add.tween(intro).to( { y: '-1000' }, 1000, Phaser.Easing.Linear.None, true);		
	}
	
}




function createPlatform(){
	
	//chão
	
	for(var i = 0; i < game.world.width; i += 64){
		ground = platforms.create(i, game.world.height - 64, 'ground');
		ground.body.immovable = true;
		//ground1.key = ground.key;
	}
	
	//plataformas
		//PROFILE
	var sign = objectsBackground.create(110 + 640, game.world.height - 300, 'sign');
	sign.body.immovable = true;
	var profile = objectsBackground.create(135 + 640, game.world.height - 290, 'profile');
	profile.body.immovable = true;
	for(var i = 0; i < 64 * 3; i+=64){
		ground = platforms.create(i + 650, game.world.height - 198, 'ground');
		ground.body.immovable = true;		
	}	
	
		//GRADUAÇÃO
	var sign = objectsBackground.create(110 + 240, game.world.height - 400, 'sign');
	sign.body.immovable = true;
	var capelo = objectsBackground.create(135 + 240, game.world.height -385, 'capelo');
	capelo.body.immovable = true;	
	for(var i = 0; i < 64 * 3; i+=64){
		ground = platforms.create(i + 300, game.world.height - 300, 'ground');
		ground.body.immovable = true;
	}

	
		//XPs
	var sign = objectsBackground.create(110 +0, game.world.height -550, 'sign');
	sign.body.immovable = true;
	var xp = objectsBackground.create(140, game.world.height -538, 'xp');
	xp.body.immovable = true;	
	for(var i = 0; i < 64 * 3; i+=64){
		ground = platforms.create(i + 100, game.world.height - 440, 'ground');
		ground.body.immovable = true;
	}

	
}
