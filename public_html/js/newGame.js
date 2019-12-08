var music2, player_s, button;
var newGame = {
    preload: function() {
        game.load.audio('startmusic', 'assets/cuteStartScreen.ogg');
        game.load.spritesheet('player_s', 'assets/hamster.png', 80, 56);
        game.load.image('play', 'assets/play.png', 124, 42);
        game.load.image('credits', 'assets/credits.png', 125, 42);
    },
    create: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.stage.backgroundColor = '#D0F4F7';
        music2 = game.sound.play('startmusic');
        
        var style = { font: "bold 70px Calibiri", fill: "#a07029", 
            boundsAlignH: "center", boundsAlignV: "middle" };
        text = game.add.text(240, 200, "HamsterRun", style);
        text.anchor.setTo(0.5, 0.5);
        
        var style = { font: "25px Calibri", fill: "#3c2f1b", 
            boundsAlignH: "center", boundsAlignV: "middle" };
        text = game.add.text(100, 250, "PUSH SPACEBAR TO JUMP ↑", style);
        //text.anchor.setTo(0.3, 0.3);
        
        var style = { font: "15px Calibri", fill: "white", 
            boundsAlignH: "right", boundsAlignV: "bottom" };
        text = game.add.text(420, 300, "PlayerZ", style);
        
        play = game.add.button(260, 35, 'play', actionOnClick1, this);
        credits = game.add.button(260, 90, 'credits', actionOnClick2, this);
        
        //Hamster
        player_s = game.add.sprite(80, 50, 'player_s', 0);
        player_s.animations.add('running', [0, 1], 8, true).play();
        //player_s.body.immovable = true;
        player_s.scale.setTo(1.5, 1.5);

    },
};

var actionOnClick1 = function () { 
                game.state.start('theGame');
                music2.destroy();
            }
            
var actionOnClick2 = function () { 
                game.state.start('credits');
            }