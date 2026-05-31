let Player = function (filename) {
    this.plfile = filename;
    this.current = "";
    this.started = Date.now();
    this.rainbowing = false;
    this.butTypes = ["play", "faster", "slower", "mute", "unmute", "next", "pause", "giantDoggo", "blur", "separate", "rain", "saturate"];
    this.rainspawns = 0;
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
            for (let v of document.querySelectorAll("video")) {
                v.pause();
            }
            playa.index++;
            console.log(playa.index, playa.length)
            playa.process();
        }

        progbar.style.width = (time / this.duration) * 100 + "%";


    });


    this.process();
    this.spawnButtons();

    document.body.addEventListener("dblclick", () => {
        this.separate();
    });


}


Player.prototype.separate = async function (but) {


    let playa = this;
    let quikmojis = ["💔", "⛓️‍💥"]
    but.textContent = quikmojis[rando(0, quikmojis.length - 1)]
    but.addEventListener("click", async () => {


        if (this.split) {
            return false;
        }

        this.split = true;
        let cont1 = document.querySelector(".container");
        let coords = cont1.getBoundingClientRect();
        let cw = coords.width;
        let ch = coords.height;

        let vid1 = this.vid;

        let cont2 = cont1.cloneNode(true);

        document.body.appendChild(cont2);

        let vid2 = cont2.querySelector("video");

        vid2.currentTime = vid1.currentTime;

        if (!vid1.paused) {
            vid2.play();
        }

        cont1.style.width = cw + "px";
        cont1.style.height = ch + "px";
        vid1.style.height = ch + "px";

        cont2.style.width = cw + "px";
        cont2.style.height = ch + "px";
        vid2.style.height = ch + "px";

        cont1.style.position = "absolute";
        cont1.style.top = coords.y + "px";
        cont1.style.left = coords.x + "px";

        cont2.style.position = "absolute";
        cont2.style.top = coords.y + "px";
        cont2.style.right = coords.x + "px";

        cont1.style.display = "block";
        cont2.style.display = "block";

        vid1.classList.remove("regVid");
        vid2.classList.remove("regVid");
        vid1.classList.add("splitVid");
        vid2.classList.add("splitVid");

        cont1.style.overflow = "hidden";
        cont2.style.overflow = "hidden";

        cont1.style.width = cw / 2 + "px";
        cont2.style.width = cw / 2 + "px";
        vid1.style.left = "0";
        vid2.style.right = "100%";

        await sleep(2500);

        cont1.style.left = coords.x - 400 + "px";
        cont2.style.right = coords.x - 400 + "px";

    });

}



Player.prototype.spawnButtons = async function () {

    let currentButtons = this.buttons.length;
    let neededButtons = this.buttonCount - currentButtons;
    for (let i = 0; i < neededButtons; i++) {
        this.spawnButton();
    }
}



Player.prototype.rain = function (but) {
    let playa = this;
    console.log("rainrainrain");
    let quikmojis = ["🌧️", "⛈️"];
    but.classList.add("rain");
    but.textContent = quikmojis[rando(0, quikmojis.length - 1)];
    but.addEventListener("click", function () {
        but.style.opacity = 0;

    });
    but.addEventListener("transitionend", function (e) {
        if (e.propertyName == "opacity") {
            let i = playa.buttons.indexOf(but);
            playa.buttons.splice(i, 1);
            but.remove();
        }
    }, { once: true });

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



Player.prototype.sat = function (but) {
    let playa = this;
    let quikmojis = ["🚥", "🚦"]
    but.textContent = quikmojis[rando(0, quikmojis.length - 1)]
    but.addEventListener("click", function () {
        full.classList.toggle("saturated");
    })

}


Player.prototype.rainbows = function () {
    this.rainbowing = true;

}


Player.prototype.spdy = function (but) {
    let playa = this;
    let quikmojis = ["🐇", "🏃🏻‍♀️", "🏃🏻‍♂️", "🏃🏻‍➡️"]
    but.textContent = quikmojis[rando(0, quikmojis.length - 1)]
    but.addEventListener("click", function () {
        playa.vid.playbackRate = playa.vid.playbackRate + 0.1;
    })

}

Player.prototype.rainbow = function (but) {
    let playa = this;
    let quikmojis = ["🌈", "🏳️‍🌈"];
    but.classList.add("rainbow");
    but.textContent = quikmojis[rando(0, quikmojis.length - 1)]


}

Player.prototype.paws = function (but) {
    let playa = this;
    let quikmojis = ["🐾"]
    but.textContent = quikmojis[rando(0, quikmojis.length - 1)]
    but.addEventListener("click", function () {
        for (let v of document.querySelectorAll("video")) {
            v.pause();
        }
    });

}


Player.prototype.otter = function (but) {
    let playa = this;
    let quikmojis = ["🦦"]
    but.textContent = quikmojis[rando(0, quikmojis.length - 1)]
    but.addEventListener("click", function () {
        for (let v of document.querySelectorAll("video")) {
            v.play();
        }
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
        img.style.zIndex = 999;
        document.body.appendChild(img);


    })

}


Player.prototype.loud = function (but) {
    let playa = this;
    let emoji = ["📣"]
    but.textContent = emoji[rando(0, emoji.length - 1)]
    but.addEventListener("click", function () {
        playa.vid.muted = false;
        barqs.muted = false;
        barqs.currentTime = 0;
        barqs.play();
    })

}


Player.prototype.quiet = function (but) {
    let playa = this;
    let stfumoji = ["🤫"]
    but.textContent = stfumoji[rando(0, stfumoji.length - 1)]
    but.addEventListener("click", function () {
        playa.vid.muted = true;
        barqs.muted = true;
    })

}

Player.prototype.blursed = function (but) {
    let playa = this;
    but.textContent = " ";
    but.classList.add("blursedButton");
    but.addEventListener("click", function () {
        if (!playa.everythingBlurred) {
            playa.everythingBlurred = true;
        } else {
            playa.everythingBlurred = false;
        }
        for (let b of playa.buttons) {
            b.classList.toggle("blursed");
        }
    });


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
    let type;

    if (this.rainspawns >= 50) {
        this.rainbowing = false;
        this.rainspawns = 0;
    }

    if (this.rainbowing && this.rainspawns < 50) {
        type = "rainbow";
        this.rainspawns++;
    } else {
        type = this.butTypes[rando(0, this.butTypes.length - 1)];
    }




    let but = document.createElement("button");
    if (this.everythingBlurred) {
        but.classList.add("blursed");
    }

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
    } else if (type === "blur") {
        this.blursed(but);
    } else if (type === "separate") {
        this.separate(but);
    } else if (type === "rain") {
        this.rain(but);
    } else if (type === "rainbow") {
        this.rainbow(but);
    } else if (type === "saturate"){
        this.sat(but);
    }

    else {
        but.textContent = "?"
    }

    but.style.left = rando(0, window.innerWidth) + "px";
    but.style.zIndex = rando(0, 100);
    but.setAttribute("title", type)
    document.body.append(but);
    await sleep(rando(3, 5793));

    but.addEventListener("transitionend", function (e) {
        if (e.propertyName == "top") {
            let rect = but.getBoundingClientRect();

            if (rect.top >= window.innerHeight) {
                if (but.classList.contains("rain")) {
                    console.log("time for rainbows");
                    playa.rainbowing = true;
                }

                playa.spawnButton();
                but.remove();
                let i = playa.buttons.indexOf(but);
                playa.buttons.splice(i, 1);
            }


        }
    })


    but.style.top = "120vh";
    this.buttons.push(but);

}


Player.prototype.process = function () {
    let playa = this;
    console.log("tada");
    if (playa.index > playa.length - 1) {
        playa.index = 0;
    }
    this.current = this.videos[this.index];
    for (let v of document.querySelectorAll("video")) {
        v.src = this.current.url;
    }
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
        for (let v of document.querySelectorAll("video")) {
            v.currentTime = playa.current.start;
            v.play();

        }
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

