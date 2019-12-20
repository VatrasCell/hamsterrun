class Timer {
    time = 0;
    fireTime;

    constructor(min, max) {
        this.fireTime = game.rnd.integerInRange(min, max);
    }

    setFireTime(min, max) {
        this.fireTime = game.rnd.integerInRange(min, max);
    }

    start() {
        this.time = new Date();
    }

    isTimeOver() {
        var bool = new Date() - this.time >= this.fireTime;
        if(bool) {
            this.start();
        }

        return bool;
    }
}