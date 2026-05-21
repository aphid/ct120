let Player = function (filename) {
    this.plfile = filename;
    this.current = "";
    this.started = Date.now();
    this.vid = document.querySelector("video");
}

Player.prototype.load = async function () {
    let pl = await fetch(this.plfile);
    let data = await pl.json();
    this.ideas = data.ideas;
    this.videos = data.videos;
    this.length = this.videos.length;
    this.index = 0;
    this.process();
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
    }, {once: true});



    this.vid.addEventListener("click", function () {
        this.play();
        this.classList.remove("pointy")
    }, { once: true });



    this.vid.addEventListener("timeupdate", function () {

        let end = playa.current.end;
        let time = this.currentTime;

        if (time > end) {
            this.pause();
            playa.index++;
            if (playa.index > playa.length - 1){
                playa.index = 0;
            }
            console.log(playa.index, playa.length)
            playa.process();
        }

        progbar.style.width = (time / end) * 100 + "%";


    });

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
