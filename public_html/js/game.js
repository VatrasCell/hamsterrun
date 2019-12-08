var player, oldPos, cheese, gras, baum, cloud, eny, text, restart, music, chew, falle;
var points = 0;
var health = 0;
var extra = 1;
var herz;
var tot;
var lock = false;
var double = 0;
var isDead = false;
var isWin = false;

var theGame = {
	preload: function() {
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;                
                game.load.spritesheet('gras', 'assets/gras7.png', 70, 40);
                game.load.image('cheese', 'assets/cheese.png');
                game.load.spritesheet('player', 'assets/hamster.png', 80, 56);
                game.load.spritesheet('cloud', 'assets/cloud.png', 127, 71);
                game.load.image('coin', 'assets/kaese2.png');
                game.load.image('coin2', 'assets/gurke3.png');
                game.load.image('coin3', 'assets/Karotte2.png');
                game.load.image('block', 'assets/schokolade2.png');
                game.load.image('block2', 'assets/bongbong2.png');
                game.load.image('block3', 'assets/chips1.png');
                game.load.spritesheet('falle', 'assets/falle3.png', 83, 40);
                game.load.spritesheet('tree', 'assets/tree2.png', 95, 150);
                game.load.spritesheet('herz', 'assets/herzen.png', 39, 39);
                
                game.load.audio('bgmusic', 'assets/cuteInGame.ogg');
                game.load.audio('foot1', 'assets/chewFood1.ogg');
                game.load.audio('foot2', 'assets/chewFood2.ogg');
                game.load.audio('fail', 'assets/fail.ogg');
                
},              
	create: function() {
                game.stage.backgroundColor = '#D0F4F7';
                
                music = game.sound.play('bgmusic');
                music.loopFull();
                music.volume = 0.7;
                
                tree = game.add.sprite(550, 237, 'tree', 0);
                
                //Wolken
                cloud1 = game.add.sprite(game.world.width +20, 50, 'cloud', 0);
                cloud1.alpha = 1;
                cloud2 = game.add.sprite(game.world.width +20, 60, 'cloud', 0);
                cloud2.alpha = 1;
                cloud3 = game.add.sprite(game.world.width +20, 10, 'cloud', 0);
                cloud3.alpha = 1;
                cloud4 = game.add.sprite(game.world.width +20, 20, 'cloud', 0);
                cloud4.alpha = 1;
                cloud5 = game.add.sprite(game.world.width +20, 40, 'cloud', 0);
                cloud5.alpha = 1;
            
                cloud1.scale.setTo(0.7, 0.7);
                cloud2.scale.setTo(0.5, 0.5);
                cloud3.scale.setTo(0.6, 0.6);
                cloud4.scale.setTo(0.4, 0.4);
                cloud5.scale.setTo(0.8, 0.8);
                
                coins = game.add.physicsGroup();
                addNewCoin();
                
                blocks = game.add.physicsGroup();
                addNewBlock();
                
               
                
                
                //Gras
                gras = game.add.tileSprite(0, 310, 480, 70, 'gras');
                gras.animations.add('bg',[0], 2, true).play();
                
                

                
               //Wolkenanimation
                game.add.tween(cloud1).to({
                    x: -100
                },17000).loop(-1).start();
                
                game.add.tween(cloud2).to({
                    x: -100
                },10000).loop(-1).start();
                
                 game.add.tween(cloud3).to({
                    x: -100
                },15000).loop(-1).start();
                
                 game.add.tween(cloud4).to({
                     x: -100
                },20000).loop(-1).start();
                
                 game.add.tween(cloud5).to({
                    x: -100
                },12000).loop(-1).start();
                
                game.add.tween(tree).to({
                    x: -25
                },9800).loop(-1).start();
                
                herz = game.add.sprite(25, 25, 'herz', 0);
                herz.scale.setTo(0.8, 0.8);
                herz.animations.add('full', [0], 1, false);
                herz.animations.add('null', [1], 1, false);
                
                fallen = game.add.physicsGroup();
                
                addNewFalle();
                falle.kill();
                fallen.children.length = 0;
                
                //Player
                player = game.add.sprite(50, 230, 'player', 0);
                player.animations.add('stand',[1], 1,true).play();
                player.animations.add('running', [0, 1], 10, true);
                player.animations.add('jump', [0], 10, true);
                player.animations.add('fall', [1], 10, true);
                player.animations.add('die', [2], 1);
                player.animations.add('die2', [3], 1);
                game.physics.arcade.enable(player);
                game.physics.arcade.enable(gras);
                player.body.gravity.y = 700;
                player.body.collideWorldBounds = true;
                gras.body.mass = 700; 
                player.body.mass = 500;   
                gras.body.immovable = true;
                //player.body.setSize(75,50);
                
                
                
                player.anchor.setTo(0.5, 0.5);
                coin.anchor.setTo(0.5, 0.5);
                tree.anchor.setTo(0.5, 0.5);
                text = game.add.text(400, 20, points);
                restart = game.add.text(200, 200, '');
                oldPos = player.position.y;

                block.animations.add('byBlock' [0,1,2], 10, true);
	},
	update: function() {
            var isJump = false;
            var jump = null;
            var posY = player.position.y;
            var timer = game.rnd.integerInRange(0, 165);
            var timerEny = game.rnd.integerInRange(0, 120);
            var timerFalle = game.rnd.integerInRange(0, 300);
            
            game.physics.arcade.collide(player, gras);
            
            if(oldPos > posY && !isDead) {
               isJump = true;
               oldPos = posY;
               player.animations.play('jump');
               player.angle -= 0.5;
               jump = 'up';
            }
            
            if(oldPos < posY && !isDead) {
               isJump = true;
               oldPos = posY;
               player.animations.play('fall');
               player.angle += 1.3;
               jump = 'down';   
            }
            game.physics.arcade.overlap(player, coins, function(player, coin) {
                if (isDead) { 
                    return;
                }
                addPoint();
                playChew();
                coin.kill();
            });
            
            game.physics.arcade.overlap(player, blocks, function(player, block, points) {
                if (isDead) { 
                    return;
                }
                killPoint();
                playChew();
                block.kill();
            });
            
             game.physics.arcade.overlap(player, fallen, function(player, falle, points) {
                if (isDead) { 
                    return;
                }
                falle.animations.play('close');
                falle.body.velocity.x = 0;
                falle.position.x = 50;
                tot = 'falle';
                killHamster();
                
            });

            if((game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) && (!lock || double <= 1) && !isDead) {
                lock = true;
                player.body.velocity.y = -400;
            }
            
            if((game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) && isWin) {
                //game.state.start('newGame');
                window.location.reload();
                music.destroy();
            }

            if (!isJump && jump != 'down' && jump != 'up' && !isDead) {
                player.animations.play('running');
                
            } 
            
            if(player.position.y < 262 && !isDead) {
            lock = true;
            double = 1;
                if(jump == 'down') {
                    double = 5;
                }
            if(player.position.y < 163 && !isDead) {
                    double = 2;
                    lock = true;
                    //console.log('true');
                }
            } else {
                lock = false;
                double = 0;
            }
            
            if(player.position.y >= 275 && !isDead) {
                player.angle = 0;
            }
            
            if(timer == 5 && !isWin && !isDead) {
                addNewCoin();
            }
            
             if(timerEny == 15 && !isWin && !isDead) {
                addNewBlock();
            }

             if(timerFalle == 50 && !isWin && !isDead) {
                if(fallen.children.length < 1) {
                    addNewFalle();
                }
            }
            
            if(coin.position.x <= -25) {
                coin.kill();
            }
            
            if(falle.position.x <= -25) {
                falle.kill();
                fallen.children.length = 0;
            }
            
            if(block.position.x <= -25) {
                block.kill();
            }
            
            text.setText(points + '/20');
            
            if(health >= 10) {
                health = 0;
                extra = 1;
            }
            
            if(points < 0) {
                if(extra == 1) {
                    extra = 0;
                    health = 0;
                    points = 0;
                } else {
                    tot = 'anders';
                killHamster();
                }
            }
            
            if(extra == 1) {
                herz.animations.play('full');
            } else {
                herz.animations.play('null');
            }
            
            if(points >= 20) {
                text.setText('WIN!');
                restart.setText('Push Enter to Restart');
                coin.kill();
                falle.kill();
                block.kill();
                isWin = true;
            }

	},
	render: function() {
//           game.debug.body(player);
//            for(var i =0; i < coins.children.length; i++) {
//                game.debug.body(coins.children[i])
//            }
//            for(var i =0; i < fallen.children.length; i++) {
//                game.debug.body(fallen.children[i])
//          }
	}
};

var addNewCoin = function() {
    var y = game.rnd.integerInRange(10, 200);
    var i = game.rnd.integerInRange(0, 2);
    var texture;
    
    if (i == 0) {
        texture = 'coin';
    }
     if(i == 1) {
        texture = 'coin2';
    }
     if(i == 2) {
        texture = 'coin3';
    }
    
    coin = game.add.sprite(550, y, texture);
    coin.anchor.setTo(0.5, 0.5);
    coin.scale.setTo(0.85, 0.85);
    game.physics.arcade.enable(coin);
    coin.body.setSize(20,20)

    coins.add(coin);                

    coin.body.velocity.x = game.rnd.integerInRange( -250, -150);
};

var addNewBlock = function() {
    var y = game.rnd.integerInRange(10, 200);
    
    var i = game.rnd.integerInRange(0, 2);
    var texture;
    
    if (i == 0) {
        texture = 'block';
    }
     if(i == 1) {
        texture = 'block2';
    }
     if(i == 2) {
        texture = 'block3';
    }
    
    block = game.add.sprite(550, y, texture);
    game.physics.arcade.enable(block);
    blocks.add(block);
    block.anchor.setTo(0.5, 0.5);

    block.scale.setTo(0.85, 0.85);
    block.body.setSize(20,20);

    block.body.velocity.x = game.rnd.integerInRange( -200, -150);
};

var addNewFalle = function() {
    
    falle = game.add.sprite(550, 310, 'falle', 1);
    falle.animations.add('open',[1], 1, false);
    falle.animations.add('close',[0], 1, true);
    falle.animations.play('open');
    game.physics.arcade.enable(falle);
    falle.body.velocity.x = -200;
    fallen.add(falle);
    falle.anchor.setTo(0.4, 1);

    //falle.scale.setTo(0.85, 0.85);
    falle.body.setSize(70,15);

    falle.body.velocity.x = -200;
};

var addPoint = function() {
    points++;
    health++;
};

var killPoint = function() {
    points--;
    health--;
};

//var kill2 = function () {
//    game.add.tween(player).to({
//        y: 310 },
//    500, Phaser.Easing.Linear.None, true)
//    };
   
var kill = function () {
    if(tot != 'falle') {
    player.animations.play('die').onComplete.add(function() {
        game.state.start('gameover'); });
    } else {
        game.state.start('gameover');
    }
};

var killHamster = function () {
    isDead = true;
    music.destroy();
    music = game.sound.play('fail');
    points = 0;
    
    if(tot == 'falle') {
    player.animations.play('die2');
    window.setTimeout(kill ,2700);
    } else {
    game.add.tween(player).to({
            angle: 180,
            y: -50 }, 
            500, Phaser.Easing.Linear.None, true).onComplete.add(kill);
        }
};

var playChew = function() {
    var i = game.rnd.integerInRange(0, 1);
    var sound;
    
    if (i == 0) {
        sound = 'foot1';
    }
     if(i == 1) {
        sound = 'foot2';
    }
    
    chew = game.sound.play(sound);
};