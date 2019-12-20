class Button {

    game;
    text;
    action;
    constructor(game, x, y, text, action) {
        this.game = game;
        this.text = text;
        this.action = action;

        var button = this.game.add.button(0, 0, 'button', actionFunc, this);
        button.scale.setTo(GameApp.SCALE_RATIO, GameApp.SCALE_RATIO);
        button.x = getPosition(x, button.width);
        button.y = getPosition(y, button.height);

        var style = { font: "bold " + 25 * GameApp.SCALE_RATIO + "px Calibri", fill: "#3c2f1b", 
            boundsAlignH: "center", boundsAlignV: "middle" };
        var textLabel = game.add.text(100, 250, text, style);
        textLabel.x = getPosition(x, textLabel.width);
        textLabel.y = getPosition(y + yOffset(0.5), textLabel.height);
    }

}

function actionFunc() {
    this.game.state.start(this.action);
}