var playerArr = [];
var grasArr = [];
var spaceKeyArr = [];
var oldPosArr = [];
var jumpArr = [];
var back;

var timerJump;
var timerHighJump;
var timerDoubleJump;

var settings = {
    preload: function() {
        game.load.spritesheet('player_c', 'assets/hamster.png', 80, 56);
        game.load.spritesheet('space_key', 'assets/space_key.png', 151, 26);
        game.load.spritesheet('gras', 'assets/gras7.png', 70, 40);
        game.load.image('button', 'assets/button.png', 125, 42);
        },       
        
    create: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.stage.backgroundColor = '#D0F4F7';   
        
        var width = 200 * GameApp.SCALE_RATIO;
        
        var style = {font: 20 * GameApp.SCALE_RATIO + "px Calibri", fill: "#392c17" };
        var styleb = {font: "bold " + 20 * GameApp.SCALE_RATIO + "px Calibiri", fill: "#a07029" };
        var styleh = {font: 42 * GameApp.SCALE_RATIO + "px Calibiri", fill: "#abd2d5" };
        
        
        text = game.add.text(0, 0, "CONTROLS", styleh);
        text.x = getPosition(RIGHT - xOffset(2), text.height);
        text.y = getPosition(BOTTOM - yOffset(5), text.width);
        text.anchor.setTo(0.5, 0.5);
        text.angle = -90;
        
        
        //normal jump
        text = game.add.text(0, 0, "Jump:", styleb);
        text.x = getPosition(LEFT + xOffset(4), text.width);
        text.y = getPosition(TOP + yOffset(20), text.height);

        createSettingsSpaceKey(LEFT + xOffset(15), TOP + yOffset(20));
        createSettingsGround(CENTER_WIDTH - xOffset(25), TOP + yOffset(40), width);
        createSettingsPlayer(CENTER_WIDTH - xOffset(20), TOP + yOffset(20));

        oldPosArr.push(Math.round(playerArr[0].position.y));

        timerJump = new Timer(2000, 2001);
        timerJump.start();

        //high jump
        text = game.add.text(0, 0, "High\nJump:", styleb);
        text.x = getPosition(CENTER_WIDTH, text.width);
        text.y = getPosition(TOP + yOffset(20), text.height);

        createSettingsSpaceKey(CENTER_WIDTH + xOffset(12), TOP + yOffset(20));
        createSettingsGround(CENTER_WIDTH + xOffset(25), TOP + yOffset(40), width);
        createSettingsPlayer(CENTER_WIDTH + xOffset(30), TOP + yOffset(20));

        oldPosArr.push(Math.round(playerArr[1].position.y));

        timerHighJump = new Timer(2000, 2001);
        timerHighJump.start();

        //double jump
        text = game.add.text(0, 0, "Double\nJump:", styleb);
        text.x = getPosition(LEFT + xOffset(4), text.width);
        text.y = getPosition(CENTER_HEIGHT + yOffset(16), text.height);

        createSettingsSpaceKey(LEFT + xOffset(15), CENTER_HEIGHT + yOffset(16));
        createSettingsGround(CENTER_WIDTH - xOffset(25), BOTTOM - yOffset(5), width);
        createSettingsPlayer(CENTER_WIDTH - xOffset(20), BOTTOM - yOffset(15))

        oldPosArr.push(Math.round(playerArr[2].position.y));

        timerDoubleJump = new Timer(3000, 3001);
        timerDoubleJump.start();
    
        //back
        back = new Button(game, RIGHT - xOffset(14), BOTTOM - yOffset(8), 'Back', 'newGame');
    },
    update: function() {

        for(i = 0; i < playerArr.length; ++i) {

            jumpArr[i] = null;
            var posY = Math.round(playerArr[i].position.y);
        
            if(oldPosArr[i] > posY) {
                oldPosArr[i] = posY;
                playerArr[i].animations.play('jump');
                playerArr[i].angle -= 0.5;
                jumpArr[i] = 'up';
            }
        
            if(oldPosArr[i] < posY) {
                oldPosArr[i] = posY;
                playerArr[i].animations.play('fall');
                playerArr[i].angle += 1.3;
                jumpArr[i] = 'down';   
            }

            game.physics.arcade.collide(playerArr[i], grasArr[i], function() {
                playerArr[i].angle = 0;
                playerArr[i].animations.play('running');
            });
        }

        if(timerJump.isTimeOver()) {
            spaceKeyArr[0].animations.play('short');
            setTimeout(function(){
                playerArr[0].body.velocity.y = -550 * 0.7;
            }, 50);
        }

        if(timerHighJump.isTimeOver()) {
            spaceKeyArr[1].animations.play('long');
            setTimeout(function(){
                playerArr[1].body.velocity.y = -700 * 0.7;
            }, 450);
        }

        if(timerDoubleJump.isTimeOver()) {
            spaceKeyArr[2].animations.play('short');
            setTimeout(function(){
                setTimeout(function(){
                    spaceKeyArr[2].animations.play('short');
                    setTimeout(function(){
                        playerArr[2].body.velocity.y = -550 * 0.7;
                    }, 50);
                }, 850);

                playerArr[2].body.velocity.y = -550 * 0.7;
            }, 50);
        }
        
    },
    render: function() {
        //debugging
        /*
        for(var i =0; i < playerArr.length; i++) {
            game.debug.body(playerArr[i])
        }*/
	}
};

function createSettingsSpaceKey(x, y) {
    var spaceKey = game.add.sprite(0, 0, 'space_key', 0);
    spaceKey.scale.setTo(GameApp.SCALE_RATIO, GameApp.SCALE_RATIO);
    spaceKey.animations.add('short', [1, 0], 5, false);
    spaceKey.animations.add('long', [1, 0], 2, false);
    spaceKey.x = getPosition(x, spaceKey.width);
    spaceKey.y = getPosition(y, spaceKey.height);

    spaceKeyArr.push(spaceKey);
}

function createSettingsGround(x, y, width) {
    var gras = game.add.tileSprite(0, 0, width, 30 * GameApp.SCALE_RATIO, 'gras');
    gras.scale.setTo(0.7 * GameApp.SCALE_RATIO, 0.7 * GameApp.SCALE_RATIO);
    gras.x = getPosition(x, gras.height);
    gras.y = getPosition(y, gras.height);
    gras.animations.add('bg',[0], 2, true).play();
    game.physics.arcade.enable(gras);
    gras.body.mass = 700;
    gras.body.immovable = true;

    grasArr.push(gras);
}

function createSettingsPlayer(x, y) {
    //Player
    var player_c = game.add.sprite(0, 0, 'player_c', 0);
    player_c.animations.add('stand',[1], 1,true).play();
    player_c.animations.add('running', [0, 1], 10, true);
    player_c.animations.add('jump', [0], 10, true);
    player_c.animations.add('fall', [1], 10, true);
    player_c.animations.add('die', [2], 1);
    game.physics.arcade.enable(player_c);
    player_c.body.gravity.y = 700;
    player_c.body.collideWorldBounds = true;
    player_c.body.mass = 500;   
    player_c.scale.setTo(0.7 * GameApp.SCALE_RATIO, 0.7 * GameApp.SCALE_RATIO);
    player_c.x = getPosition(x, player_c.width); 
    player_c.y = getPosition(y, player_c.width); 
    player_c.anchor.setTo(0.5, 0.5);

    playerArr.push(player_c);
};