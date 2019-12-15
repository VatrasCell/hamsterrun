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

const COLL_BOUND_SIZE = 0.5 * GameApp.SCALE_RATIO;
const COLL_BOUND_OFFSET = 7 * GameApp.SCALE_RATIO;

var theGame = {
	preload: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; 
                       
        game.load.spritesheet('gras', 'assets/gras7.png', 70, 40);
        game.load.spritesheet('player', 'assets/hamster2.png', 80, 56);
        game.load.spritesheet('cloud', 'assets/cloud.png', 127, 71);
        game.load.image('coin', 'assets/kaese3.png');
        game.load.image('coin2', 'assets/gurke4.png');
        game.load.image('coin3', 'assets/Karotte3.png');
        game.load.image('block', 'assets/schokolade3.png');
        game.load.image('block2', 'assets/bongbong2.png');
        game.load.image('block3', 'assets/chips1.png');
        game.load.spritesheet('falle', 'assets/falle4.png', 83, 56);
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

                clouds = game.add.physicsGroup();
                createCloud();

                createGround();
                
                coins = game.add.physicsGroup();
                addNewCoin();
                
                blocks = game.add.physicsGroup();
                addNewBlock();

                createHeart();

                createPlayer();

                createPointLabel();
  
                fallen = game.add.physicsGroup();
                
                addNewFalle();
                falle.kill();
                fallen.children.length = 0;

                coin.anchor.setTo(0.5, 0.5);
                tree.anchor.setTo(0.5, 0.5);
                
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
            var timerCloud = game.rnd.integerInRange(0, 50);
            var timerFalle = game.rnd.integerInRange(45, 55);
            
            game.physics.arcade.collide(player, gras, function() {
                player.angle = 0;
            });
            
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
                player.body.velocity.y = -500;
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
                }
            } else {
                lock = false;
                double = 0;
            }
            
            if(timer == 5 && !isWin && !isDead) {
                addNewCoin();
            }
            
            if(timerEny == 15 && !isWin && !isDead) {
                addNewBlock();
            }

            if(timerCloud == 15) {
                createCloud();
            }

            if(timerFalle == 50 && !isWin && !isDead) {
                if(fallen.children.length < 1) {
                    addNewFalle();
                }
            }
            
            if(coin.position.x <= -25) {
                coin.kill();
            }

            if(cloud.position.x <= -25) {
                cloud.kill();
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
        //debugging
        /*
           game.debug.body(player);
            for(var i =0; i < coins.children.length; i++) {
                game.debug.body(coins.children[i])
            }
            for(var i =0; i < fallen.children.length; i++) {
                game.debug.body(fallen.children[i])
            }
            for(var i =0; i < blocks.children.length; i++) {
                game.debug.body(blocks.children[i])
            }*/
	}
};

var addNewCoin = function() {
    var y = game.rnd.integerInRange(TOP + yOffset(10), TOP + yOffset(60));
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
    
    coin = game.add.sprite(GameApp.CANVAS_WIDTH + 20, y, texture);
    coin.anchor.setTo(0.5, 0.5);
    coin.scale.setTo(0.85 * GameApp.SCALE_RATIO, 0.85 * GameApp.SCALE_RATIO);
    game.physics.arcade.enable(coin);
    coin.body.setSize(coin.width * COLL_BOUND_SIZE, coin.height * COLL_BOUND_SIZE, COLL_BOUND_OFFSET, COLL_BOUND_OFFSET);

    coins.add(coin);                

    coin.body.velocity.x = game.rnd.integerInRange( -450, -300);
};

var addNewBlock = function() {
    var y = game.rnd.integerInRange(TOP + yOffset(20), TOP + yOffset(70));
    
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
    
    block = game.add.sprite(GameApp.CANVAS_WIDTH + 20, y, texture);
    game.physics.arcade.enable(block);
    blocks.add(block);
    block.anchor.setTo(0.5, 0.5);

    block.scale.setTo(0.85 * GameApp.SCALE_RATIO, 0.85 * GameApp.SCALE_RATIO);
    block.body.setSize(block.width * COLL_BOUND_SIZE, block.height * COLL_BOUND_SIZE, COLL_BOUND_OFFSET, COLL_BOUND_OFFSET);

    block.body.velocity.x = game.rnd.integerInRange( -525, -350);
};

var addNewFalle = function() {
    
    falle = game.add.sprite(GameApp.CANVAS_WIDTH + 20, BOTTOM - yOffset(8), 'falle', 1);
    falle.animations.add('open',[1], 1, false);
    falle.animations.add('close',[0], 1, true);
    falle.animations.add('closeDead',[2], 1, true);
    falle.animations.play('open');
    game.physics.arcade.enable(falle);
    fallen.add(falle);
    falle.anchor.setTo(0.4, 1);
    falle.scale.setTo(GameApp.SCALE_RATIO, GameApp.SCALE_RATIO);

    falle.body.setSize(falle.width * COLL_BOUND_SIZE, falle.height * COLL_BOUND_SIZE * 0.6, COLL_BOUND_OFFSET * 0.4, COLL_BOUND_OFFSET * 2);

    falle.body.velocity.x = -300;
};

var addPoint = function() {
    points++;
    health++;
};

var killPoint = function() {
    points--;
    health--;
};
   
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
    player.kill();
    falle.animations.play('closeDead');
    falle.x = LEFT + xOffset(10);
    window.setTimeout(kill, 2700);
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

var createGround = function() {

    //Gras
    gras = game.add.tileSprite(0, 0, GameApp.CANVAS_WIDTH, 80 * GameApp.SCALE_RATIO, 'gras');
    gras.scale.setTo(GameApp.SCALE_RATIO, GameApp.SCALE_RATIO);
    gras.y = getPosition(BOTTOM, gras.height);
    gras.animations.add('bg',[0], 2, true).play();
    game.physics.arcade.enable(gras);

    //tree
    tree = game.add.sprite(0, 0, 'tree', 0);
    tree.scale.setTo(1.5 * GameApp.SCALE_RATIO, 1.5 * GameApp.SCALE_RATIO);
    tree.x = getPosition(RIGHT, 0);
    tree.y = getPosition(BOTTOM - yOffset(7.75), tree.height);

    game.add.tween(tree).to({
        x: -25
    },9800).loop(-1).start();
};

var createHeart = function() {
    herz = game.add.sprite(0, 0, 'herz', 0);
    herz.scale.setTo(GameApp.SCALE_RATIO, GameApp.SCALE_RATIO);
    herz.x = getPosition(LEFT + xOffset(3), herz.width);
    herz.y = getPosition(TOP + yOffset(6), herz.height);
    herz.animations.add('full', [0], 1, false);
    herz.animations.add('null', [1], 1, false);
};

var createPlayer = function() {
    //Player
    player = game.add.sprite(50, 230, 'player', 0);
    player.animations.add('stand',[1], 1,true).play();
    player.animations.add('running', [0, 1], 10, true);
    player.animations.add('jump', [0], 10, true);
    player.animations.add('fall', [1], 10, true);
    player.animations.add('die', [2], 1);
    game.physics.arcade.enable(player);
    player.body.gravity.y = 700;
    player.body.collideWorldBounds = true;
    gras.body.mass = 700; 
    player.body.mass = 500;   
    gras.body.immovable = true;
    player.scale.setTo(GameApp.SCALE_RATIO, GameApp.SCALE_RATIO);
    player.x = getPosition(LEFT + xOffset(10), player.width); 
    player.anchor.setTo(0.5, 0.5);
};

var createPointLabel = function() {
    var style = { font: 30 * GameApp.SCALE_RATIO + "px Consolas", fill: "black", 
            boundsAlignH: "center", boundsAlignV: "middle" };
    text = game.add.text(0, 0, points, style);
    text.x = getPosition(RIGHT - xOffset(8), text.width);
    text.y = getPosition(TOP + yOffset(7), text.height);
}

var createCloud = function() {
    var y = game.rnd.integerInRange(TOP + yOffset(5), TOP + yOffset(40));
    cloud = game.add.sprite(GameApp.CANVAS_WIDTH + 20, y, 'cloud', 0);
    cloud.alpha = getRandomArbitrary(0.5, 1.1);

    cloud.anchor.setTo(0.5, 0.5);
    var size = getRandomArbitrary(0.5, 2.1);
    cloud.scale.setTo(size * GameApp.SCALE_RATIO, size * GameApp.SCALE_RATIO);
    game.physics.arcade.enable(cloud);
    //cloud.body.setSize(20,20)

    clouds.add(cloud);                

    cloud.body.velocity.x = game.rnd.integerInRange( -250, -150);
}
