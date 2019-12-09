var GameApp = GameApp || {};
GameApp.USE_DEVICE_PIXEL_RATIO = false; // here you can change to use or not the device pixel ratio - it is not supported by all browsers

if (GameApp.USE_DEVICE_PIXEL_RATIO) {
	GameApp.DEVICE_PIXEL_RATIO = window.devicePixelRatio;
    GameApp.CANVAS_WIDTH = window.innerWidth * GameApp.DEVICE_PIXEL_RATIO;
    GameApp.CANVAS_HEIGHT = window.innerHeight * GameApp.DEVICE_PIXEL_RATIO;
} else {
   	GameApp.DEVICE_PIXEL_RATIO = 1.0;
  	GameApp.CANVAS_WIDTH = window.innerWidth * GameApp.DEVICE_PIXEL_RATIO;
    GameApp.CANVAS_HEIGHT = window.innerHeight * GameApp.DEVICE_PIXEL_RATIO;
}

//GameApp.ASPECT_RATIO = GameApp.CANVAS_WIDTH / GameApp.CANVAS_HEIGHT;
//GameApp.ASPECT_RATIO_ROUND = Math.round(GameApp.ASPECT_RATIO);

/*if (GameApp.ASPECT_RATIO > 1) {
	GameApp.SCALE_RATIO = GameApp.CANVAS_HEIGHT / GameApp.CANVAS_WIDTH;
} else {
	GameApp.SCALE_RATIO = GameApp.CANVAS_WIDTH / GameApp.CANVAS_HEIGHT;
}*/
GameApp.SCALE_RATIO = GameApp.CANVAS_WIDTH / 1030;
console.log(GameApp.SCALE_RATIO);

const LEFT = 0;
const TOP = 0;
const CENTER_WIDTH = GameApp.CANVAS_WIDTH / 2;
const CENTER_HEIGHT = GameApp.CANVAS_HEIGHT / 2;
const RIGHT = GameApp.CANVAS_WIDTH;
const BOTTOM = GameApp.CANVAS_HEIGHT;

function getPosition(pos, obj_size) {
    console.log(pos, obj_size);
    return pos - obj_size / 2;
}

function xOffset(percent) {
    return GameApp.CANVAS_WIDTH * percent / 100;
}

function yOffset(percent) {
    return GameApp.CANVAS_HEIGHT * percent / 100;
}