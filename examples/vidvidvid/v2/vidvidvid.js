let Player = function (filename) {
    this.plfile = filename;
    this.current = "";
    this.started = Date.now();
    this.butTypes = ["play", "faster", "slower", "mute", "next", "pause", "giantDoggo"];

    this.buttonCount = 50;
    this.buttons = [];
    this.vid = document.querySelector("video");
}

Player.prototype.load = async function () {
    let pl = await fetch(this.plfile);
    let data = await pl.json();
    this.ideas = data.ideas;
    this.videos = data.videos;
    this.length = this.videos.length;
    this.index = 0;
    let playa = this;
    this.vid.addEventListener("timeupdate", function () {

        let end = playa.current.end;
        let time = this.currentTime;

        if (time > end) {
            this.pause();
            playa.index++;
            if (playa.index > playa.length - 1) {
                playa.index = 0;
            }
            console.log(playa.index, playa.length)
            playa.process();
        }

        progbar.style.width = (time / this.duration) * 100 + "%";


    });


    this.process();
    this.spawnButtons();
    this.checkBut();
}

Player.prototype.checkBut = async function () {
    await sleep(250);
    for (let i = 0; i < this.buttons.length; i++) {
        let but = this.buttons[i];
        let rect = but.getBoundingClientRect();
        console.log(this.buttons.length)
        console.log(rect.top, window.innerHeight);

        if (rect.top >= window.innerHeight) {
            but.remove();
            this.buttons.splice(i, 1);
            break;
        }
    }
    this.checkBut();
    this.spawnButtons();
}

Player.prototype.spawnButtons = async function () {

    let currentButtons = this.buttons.length;
    let neededButtons = this.buttonCount - currentButtons;
    for (let i = 0; i < neededButtons; i++) {
        console.log("spawning");
        this.spawnButton();
    }
}

Player.prototype.snaily = function (but) {
    let playa = this;
    but.textContent = "🐌";
    but.addEventListener("click", function () {
        playa.vid.playbackRate = playa.vid.playbackRate - 0.1;
    })

}

Player.prototype.spawnButton = async function () {

    let type = this.butTypes[rando(0, this.butTypes.length - 1)];
    let but = document.createElement("button");
    console.log(type);
    if (type === "slower") {
        this.snaily(but);
    }

    else {
        but.textContent = "?"
    }

    but.style.left = rando(0, window.innerWidth) + "px";
    but.style.zIndex = rando(0, 100);
    document.body.append(but);
    await sleep(3);
    but.style.top = window.innerHeight + "px";
    this.buttons.push(but);

}


Player.prototype.process = function () {
    let playa = this;
    console.log("tada");
    this.current = this.videos[this.index];
    this.vid.src = this.current.url;

    console.log(this.current);

    if (this.current.start) {

        if (typeof this.current.start === "string") {
            this.current.start = reformatTime(this.current.start);
        } else {
            this.current.start = this.current.start
        }
    } else {
        this.current.start = 0;
    }

    if (this.current.end) {

        if (typeof this.current.end === "string") {
            this.current.end = reformatTime(this.current.end);
        } else {
            this.current.end = this.current.end;
        }
    } else {
        this.current.end = this.vid.duration;
    }

    this.vid.addEventListener("loadedmetadata", function () {
        this.currentTime = playa.current.start;
        this.play();
    }, { once: true });



    this.vid.addEventListener("click", function () {
        this.play();
        this.classList.remove("pointy")
    }, { once: true });





}

Player.prototype.setupBar = function () {

}

let player = new Player("playlist.json");



player.load();

function reformatTime(hms) {
    //input is a string like hh:mm:ss
    let a = hms.split(':'); // split it at the colons
    let time = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
    console.log(time);
    return time;
}

function rando(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

