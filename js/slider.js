class Slider {
    game;
    bounds;
    graphics;
    sprite;
    value;
    min;
    max;

    constructor(game, x, y, width, height) {
        this.game = game;

        this.bounds = new Phaser.Rectangle(x, y, 47, height);
        this.graphics = this.game.add.graphics(x + xOffset(0.5), y);
        this.graphics.beginFill(0x3C2F1B);
        this.graphics.drawRect(0, 0, width, height);

        this.max = y;
        this.min = y + height;

        this.sprite = this.game.add.sprite(this.bounds.x, this.bounds.y,'sliderButton');
        this.sprite.scale.setTo(0.3 * GameApp.SCALE_RATIO, 0.3 * GameApp.SCALE_RATIO);
        this.sprite.y = this.getYPos();
        

        this.sprite.inputEnabled = true;
        this.sprite.input.enableDrag(false, false, false, 255, this.bounds);
        this.sprite.input.allowVerticalDrag = true;
        this.sprite.input.allowHorizontalDrag = false;
        this.sprite.events.onDragStop.add(this.setMusicVolume, this);
    }

    setMusicVolume() {
        musicVolume = mapRange(this.sprite.y, this.min - this.sprite.height, this.max, 0, 1);
    }

    getYPos() {
        return mapRange(musicVolume, 0, 1, this.min - this.sprite.height, this.max);
    }
}