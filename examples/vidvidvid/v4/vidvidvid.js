let Player = function (filename) {
    this.plfile = filename;
    this.current = "";
    this.started = Date.now();
    this.butTypes = ["play", "faster", "slower", "mute", "unmute", "next", "pause", "giantDoggo"];

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
            console.log(playa.index, playa.length)
            playa.process();
        }

        progbar.style.width = (time / this.duration) * 100 + "%";


    });


    this.process();
    this.spawnButtons();
    this.checkBut();
}

Player.prototype.spawnButtons = async function () {

    let currentButtons = this.buttons.length;
    let neededButtons = this.buttonCount - currentButtons;
    for (let i = 0; i < neededButtons; i++) {
        this.spawnButton();
    }
}




Player.prototype.next = function (but) {
    let playa = this;
    let quikmojis = ["🪦"]
    but.textContent = quikmojis[rando(0, quikmojis.length - 1)]
    but.addEventListener("click", function () {
        playa.index++;
        playa.process();
    })

}


Player.prototype.spdy = function (but) {
    let playa = this;
    let quikmojis = ["🐇", "🏃🏻‍♀️", "🏃🏻‍♂️", "🏃🏻‍➡️"]
    but.textContent = quikmojis[rando(0, quikmojis.length - 1)]
    but.addEventListener("click", function () {
        playa.vid.playbackRate = playa.vid.playbackRate + 0.1;
    })

}

Player.prototype.paws = function (but) {
    let playa = this;
    let quikmojis = ["🐾"]
    but.textContent = quikmojis[rando(0, quikmojis.length - 1)]
    but.addEventListener("click", function () {
        playa.vid.pause();
    });

}


Player.prototype.otter = function (but) {
    let playa = this;
    let quikmojis = ["🦦"]
    but.textContent = quikmojis[rando(0, quikmojis.length - 1)]
    but.addEventListener("click", function () {
        playa.vid.play();
    });

}

Player.prototype.rosie = function (but) {
    let playa = this;
    let quikmojis = ["🐶", "🐕", "🦮", "🐕‍🦺", "🐩"];
    but.textContent = quikmojis[rando(0, quikmojis.length - 1)]
    but.addEventListener("click", function () {
        let img = document.createElement("img");
        img.src = "https://aphid.github.io/ct120/examples/refresher/rosie_a.png";
        img.classList.add("rosie");
        img.style.position = "absolute";
        img.width = window.innerWidth + 500;
        img.style.top = -400;

        img.style.left = -800;
        img.style.zIndex = 9000;
        document.body.appendChild(img);


    })

}


Player.prototype.loud = function (but) {
    let playa = this;
    let emoji = ["📣"]
    but.textContent = emoji[rando(0, emoji.length - 1)]
    but.addEventListener("click", function () {
        playa.vid.muted = false;
    })

}


Player.prototype.quiet = function (but) {
    let playa = this;
    let stfumoji = ["🤫"]
    but.textContent = stfumoji[rando(0, stfumoji.length - 1)]
    but.addEventListener("click", function () {
        playa.vid.muted = true;
    })

}



Player.prototype.slowpoke = function (but) {
    let playa = this;
    let slowmojis = ["🐢", "🐌"]
    but.textContent = slowmojis[rando(0, slowmojis.length - 1)]
    but.addEventListener("click", function () {
        playa.vid.playbackRate = playa.vid.playbackRate - 0.1;
    })

}

Player.prototype.spawnButton = async function () {
    let playa = this;
    let type = this.butTypes[rando(0, this.butTypes.length - 1)];
    let but = document.createElement("button");

    if (type === "faster") {
        this.spdy(but);
    } else if (type === "slower") {
        this.slowpoke(but);
    } else if (type === "mute") {
        this.quiet(but);
    } else if (type === "unmute") {
        this.loud(but);
    } else if (type === "giantDoggo") {
        this.rosie(but);
    } else if (type === "pause") {
        this.paws(but);
    } else if (type === "play") {
        this.otter(but);
    } else if (type === "next") {
        this.next(but);
    }

    else {
        but.textContent = "?"
    }

    but.style.left = rando(0, window.innerWidth) + "px";
    but.style.zIndex = rando(0, 100);
    document.body.append(but);
    await sleep(rando(3, 5793));

    but.addEventListener("transitionend", function () {
        let rect = but.getBoundingClientRect();

        if (rect.top >= window.innerHeight) {
            playa.spawnButton();
            but.remove();
            this.buttons.splice(i, 1);
        }


    })


    but.style.top = window.innerHeight + "px";
    this.buttons.push(but);

}


Player.prototype.process = function () {
    let playa = this;
    console.log("tada");
    if (playa.index > playa.length - 1) {
        playa.index = 0;
    }
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


    /*
    this.vid.addEventListener("click", function () {
        this.play();
        this.classList.remove("pointy")
    }, { once: true });
    */




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

