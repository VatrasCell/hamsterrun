var player_c, back;
var credits = {
    preload: function() {
        game.load.spritesheet('player_c', 'assets/hamster.png', 80, 56);
        game.load.image('back', 'assets/back.png', 125, 42);
        },       
        
    create: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.stage.backgroundColor = '#D0F4F7';        
        
        var style = {font: "20px Calibri", fill: "#392c17" };
        var styleb = {font: "bold 20px Calibiri", fill: "#a07029" };
        var styleh = {font: "36px Calibiri", fill: "#abd2d5" };
        
        text = game.add.text(460, 92, "CREDITS", styleh);
        text.anchor.setTo(0.5, 0.5);
        text.angle = -90;
        
        //Team
        text = game.add.text(50, 45, "Team:", styleb);
        text.anchor.setTo(0.5, 0.5);        
        text = game.add.text(260, 46, "Anne || Edgar || Eric || Julian", style);
        text.anchor.setTo(0.5, 0.5);
        
        //Helfer
        text = game.add.text(50, 75, "Helfer:", styleb);
        text.anchor.setTo(0.5, 0.5);        
        text = game.add.text(189, 76, "Heiko || Alex", style);
        text.anchor.setTo(0.5, 0.5);
        
        //Sounds
        text = game.add.text(50, 114, "Sounds:", styleb);
        text.anchor.setTo(0.5, 0.5);        
        text = game.add.text(225, 115, "https://freesound.org\n\http://bensound.com", style);
        text.anchor.setTo(0.5, 0.5);
        
        //Textures
        text = game.add.text(50, 169, "Textures:", styleb);
        text.anchor.setTo(0.5, 0.5);        
        text = game.add.text(234, 169, "Minecraft\n\http://opengameart.org", style);
        text.anchor.setTo(0.5, 0.5);
        
        //Misc
        text = game.add.text(50, 211, "Misc:", styleb);
        text.anchor.setTo(0.5, 0.5);        
        text = game.add.text(201, 211, "http://phaser.io", style);
        text.anchor.setTo(0.5, 0.5);
        
        //Hamster
        player_c = game.add.sprite(350, 185, 'player_c', 0);
        player_c.animations.add('running', [0, 1], 8, true).play();
        
        back = game.add.button(325, 255, 'back', actionOnClick3, this);
    }
};

var actionOnClick3 = function () { 
                music2.destroy();
                game.state.start('newGame');
            };