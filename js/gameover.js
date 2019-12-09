var gameover = {
    create: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.stage.backgroundColor = 'black';
        
        var style = { font: "bold " + 64 * GameApp.SCALE_RATIO + "px Consolas", fill: "red", boundsAlignH: "center", boundsAlignV: "middle" };
        text = game.add.text(0, 0, "GAME OVER !!!", style);
        text.x = getPosition(CENTER_WIDTH, text.width);
        text.y = getPosition(CENTER_HEIGHT - yOffset(8), text.height);
        //text.anchor.setTo(0.5, 0.5);
        
        var style = { font: "bold " + 32 * GameApp.SCALE_RATIO + "px Consolas", fill: "green", boundsAlignH: "center", boundsAlignV: "middle" };
        text = game.add.text(0, 0, "Push Enter To Restart", style);
        text.x = getPosition(CENTER_WIDTH, text.width);
        text.y = getPosition(CENTER_HEIGHT + yOffset(8), text.height);
        //text.anchor.setTo(0.5, 0.5);
    },
    update: function() {
        if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
                //game.state.start('newGame');
                window.location.reload();
            }
    }
};