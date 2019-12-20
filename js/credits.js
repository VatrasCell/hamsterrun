var player_c, back;
var credits = {
    preload: function() {
        game.load.spritesheet('player_c', 'assets/hamster.png', 80, 56);
        game.load.image('button', 'assets/button.png', 125, 42);
        },       
        
    create: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.stage.backgroundColor = '#D0F4F7';        
        
        var style = {font: 20 * GameApp.SCALE_RATIO + "px Calibri", fill: "#392c17" };
        var styleb = {font: "bold " + 20 * GameApp.SCALE_RATIO + "px Calibiri", fill: "#a07029" };
        var styleh = {font: 42 * GameApp.SCALE_RATIO + "px Calibiri", fill: "#abd2d5" };
        
        text = game.add.text(0, 0, "CREDITS", styleh);
        text.x = getPosition(RIGHT - xOffset(2), text.height);
        text.y = getPosition(BOTTOM - yOffset(5), text.width);
        text.anchor.setTo(0.5, 0.5);
        text.angle = -90;
        
        //Team
        text = game.add.text(0, 0, "Team:", styleb);
        text.x = getPosition(CENTER_WIDTH - xOffset(15), text.width);
        text.y = getPosition(TOP + yOffset(10), text.height);

        text = game.add.text(0, 0, "Anne || Edgar || Eric || Julian", style);
        text.x = getPosition(CENTER_WIDTH + xOffset(5), text.width);
        text.y = getPosition(TOP + yOffset(10), text.height);
       
        
        //Helfer
        text = game.add.text(0, 0, "Helfer:", styleb);
        text.x = getPosition(CENTER_WIDTH - xOffset(15), text.width);
        text.y = getPosition(TOP + yOffset(16), text.height);

        text = game.add.text(0, 0, "Heiko || Alex", style);
        text.x = getPosition(CENTER_WIDTH + xOffset(5), text.width);
        text.y = getPosition(TOP + yOffset(16), text.height);
        
        //Sounds
        text = game.add.text(50, 114, "Sounds:", styleb);
        text.x = getPosition(CENTER_WIDTH - xOffset(15), text.width);
        text.y = getPosition(TOP + yOffset(25), text.height);

        text = game.add.text(225, 115, "https://freesound.org\n\http://bensound.com", style);
        text.x = getPosition(CENTER_WIDTH + xOffset(5), text.width);
        text.y = getPosition(TOP + yOffset(25), text.height);
        
        //Textures
        text = game.add.text(50, 169, "Textures:", styleb);
        text.x = getPosition(CENTER_WIDTH - xOffset(15), text.width);
        text.y = getPosition(TOP + yOffset(37), text.height);

        text = game.add.text(234, 169, "Minecraft\n\http://opengameart.org", style);
        text.x = getPosition(CENTER_WIDTH + xOffset(5), text.width);
        text.y = getPosition(TOP + yOffset(37), text.height);
        
        //Misc
        text = game.add.text(50, 211, "Misc:", styleb);
        text.x = getPosition(CENTER_WIDTH - xOffset(15), text.width);
        text.y = getPosition(TOP + yOffset(46), text.height);

        text = game.add.text(201, 211, "http://phaser.io", style);
        text.x = getPosition(CENTER_WIDTH + xOffset(5), text.width);
        text.y = getPosition(TOP + yOffset(46), text.height);
        
        //Hamster
        player_c = game.add.sprite(0, 0, 'player_c', 0);
        player_c.scale.setTo(1.1 * GameApp.SCALE_RATIO, 1.1 * GameApp.SCALE_RATIO);
        player_c.x = getPosition(RIGHT - xOffset(14), player_c.width);
        player_c.y = getPosition(BOTTOM - yOffset(20), player_c.height);
        player_c.animations.add('running', [0, 1], 8, true).play();
        
        back = new Button(game, RIGHT - xOffset(14), BOTTOM - yOffset(8), 'Back', 'newGame');
    }
};