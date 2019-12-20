var music2, player_s, button, slider;
var newGame = {
    preload: function() {
        game.load.audio('startmusic', 'assets/cuteStartScreen.ogg');
        game.load.spritesheet('player_s', 'assets/hamster.png', 80, 56);
        game.load.image('button', 'assets/button.png', 125, 42);
        game.load.image('sliderButton', 'assets/sliderButton.png', 47, 47);
    },
    create: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.stage.backgroundColor = '#D0F4F7';
        if(music2 != null) {
            music2.destroy();
        }
        music2 = game.sound.play('startmusic');
        music2.loopFull();
        music2.resume();

        slider = new Slider(game, RIGHT - xOffset(5), CENTER_HEIGHT - yOffset(3), 3 * GameApp.SCALE_RATIO, 40 * GameApp.SCALE_RATIO);
        
        var style = { font: "bold " + 70 * GameApp.SCALE_RATIO + "px Calibiri", fill: "#a07029", 
            boundsAlignH: "center", boundsAlignV: "middle" };
        text = game.add.text(0, 0, "HamsterRun", style);
        text.x = getPosition(CENTER_WIDTH, text.width);
        text.y = getPosition(CENTER_HEIGHT, text.height);
        
        var style = { font: 25 * GameApp.SCALE_RATIO + "px Calibri", fill: "#3c2f1b", 
            boundsAlignH: "center", boundsAlignV: "middle" };
        text = game.add.text(100, 250, "PUSH SPACEBAR TO JUMP ↑", style);
        text.x = getPosition(CENTER_WIDTH, text.width);
        text.y = getPosition(CENTER_HEIGHT + yOffset(10), text.height);
        
        var style = { font: 2 * GameApp.SCALE_RATIO + "rem Calibri", fill: "white", 
            boundsAlignH: "right", boundsAlignV: "bottom" };
        text = game.add.text(0, 0, "PlayerZ", style);
        text.x = getPosition(RIGHT - xOffset(5), text.width);
        text.y = getPosition(BOTTOM - yOffset(5), text.height);

        play = new Button(game, RIGHT - xOffset(10), TOP + yOffset(10), '► Play', 'theGame');
        credits = new Button(game, RIGHT - xOffset(10), TOP + yOffset(25), 'Credits', 'credits');
        settings = new Button(game, RIGHT - xOffset(10), TOP + yOffset(40), 'Controls', 'settings');
        
        //Hamster
        player_s = game.add.sprite(0, 0, 'player_s', 0);
        player_s.animations.add('running', [0, 1], 8, true).play();
        //player_s.body.immovable = true;
        player_s.scale.setTo(2 * GameApp.SCALE_RATIO, 2 * GameApp.SCALE_RATIO);
        player_s.x = getPosition(CENTER_WIDTH, player_s.width);
        player_s.y = getPosition(CENTER_HEIGHT - yOffset(20), player_s.height);

    },
    update: function() {
        music2.volume = musicVolume;
    },
};

var actionOnClick1 = function () { 
    game.state.start('theGame');
    music2.destroy();
}
            
var actionOnClick2 = function () { 
    game.state.start('credits');
}

var actionOnClick45 = function () { 
    game.state.start('settings');
}