
function offScreen(ele) {

    let rect = ele.getBoundingClientRect();
    if (rect.x > window.innerWidth || rect.y > window.innerHeight) {
        return true
    }
    return false;
}


let Player = function (filename) {
    this.plfile = filename;
    this.current = ""; //currently playing
    this.started = Date.now(); //when we started playing
    this.vid = document.querySelector("video"); //reference to video element
}


function reformatTime(hms) {
    //input is a string like hh:mm:ss
    let a = hms.split(':'); // split it at the colons
    let time = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
    console.log(time);
    return time;
}


Player.prototype.first = function () {
    let list = this;
    this.index = 0;
    this.current = this.list[0];
    if (typeof this.current.start === "string") {
        this.current.start = reformatTime(this.current.start);
    }

    if (typeof this.current.end === "string") {
        this.current.end = reformatTime(this.current.end);
    }


    this.butTypes = ["play", "faster", "slower", "mute", "next", "pause", "giantDoggo", ""];
    this.vid.addEventListener("canplay", function () {
        list.vid.currentTime = list.current.start;
        list.vid.play();
    }, { once: true });

    this.vid.addEventListener("timeupdate", function () {
        if (this.currentTime > list.current.end) {
            this.pause();
            list.next();
        }
    })

    this.vid.src = this.current.src;
}

let ideas = [
    "volume toggle barks when you click",
    "rainbows fill the screen",
    "cut the video in half and move both halves to seprate sides just to be annoying; actually two elements hiding half with css",
    "pride mode, super-saturated HSB; pride month is coming",
    "bass boosted // relies on CORS to get audio into html5 audio node",
    "show the duration of the video so large it covers the video",
    "pause the video but not the audio // i dont think this will work"
]


Player.prototype.next = function () {
    let list = this;

    this.index = this.index++ % this.list.length;

    this.current = this.list[this.index];

    if (typeof this.current.start === "string") {
        this.current.start = reformatTime(this.current.start);
    }

    if (typeof this.current.end === "string") {
        this.current.end = reformatTime(this.current.end);
    }

    this.vid.addEventListener("canplay", function () {
        list.vid.currentTime = list.current.start;
        list.vid.play();
    }, { once: true });

    this.vid.addEventListener("timeupdate", function () {
        if (this.currentTime > list.current.end) {
            this.pause();
            list.next();
        }
    })

    this.vid.src = this.current.src;
}

Player.prototype.load = async function () {
    let pl = await fetch(this.plfile);
    this.list = await pl.json();
    this.length = this.list.length;
    this.first();
    this.spawnButtons();
}

Player.prototype.spawnButtons = function () {
    let buttons = document.querySelectorAll(".button");
    let howMany = 50 - buttons.length
    for (let i = 0; i < howMany; i++) {
        this.spawnButton();
    }
}


Player.prototype.spawnButton = function () {
    let type = this.butTypes[Math.floor(Math.random() * this.butTypes.length)];
    let button = document.createElement("div");
    button.classList.add("button");

    if (type === "play") {
        button.addEventListener("click", () => {
            this.vid.play();
        });

    }

}


let pl = new Player("playlist.json");
pl.load();
let vid = document.querySelector("video");

vid.addEventListener("timeupdate", function () {
    let dur = this.duration;
    let time = this.currentTime;
    console.log(time / dur);
    progbar.style.width = (time / dur * 100) + "%";
});


vid.addEventListener("click", function () {
    this.play();
    this.classList.remove("pointer");
}, { once: true })


document.querySelector("#progress").addEventListener("click", function (event) {
    console.log("HMMMMM");
    let rect = progress.getBoundingClientRect();
    let pct = (event.clientX / rect.width); //no need to calculate offsets because element is at 0 left.
    console.log(pct, vid.duration * pct);
    vid.currentTime = (vid.duration * pct); //move playhead to duration * pct.
});