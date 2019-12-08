var gameover = {
    create: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.stage.backgroundColor = 'black';
        
        var style = { font: "bold 32px Consolas", fill: "red", boundsAlignH: "center", boundsAlignV: "middle" };
        text = game.add.text(240, 160, "GAME OVER !!!", style);
        text.anchor.setTo(0.5, 0.5);
        
        var style = { font: "bold 16px Consolas", fill: "green", boundsAlignH: "center", boundsAlignV: "middle" };
        text = game.add.text(130, 180, "Push Enter To Restart", style);
        //text.anchor.setTo(0.3, 0.3);
    },
    update: function() {
        if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
                //game.state.start('newGame');
                window.location.reload();
            }
    }
};