let toc = document.querySelector("#toc");
let list = toc.querySelector("ul");
let tuts = document.querySelectorAll(".tutorial");
for (let tut of tuts) {
    let title = tut.querySelector("h3").textContent;
    let id = tut.id;
    let vid = tut.querySelector("video");
    //    console.log(vid);
    if (vid.readyState < 2) {
        vid.addEventListener("loadedmetadata", () => {
            let dur = vid.duration;
            console.log(dur);
            let duration, hms;
            if (dur) {
                hms = new Date(dur * 1000).toISOString().slice(11, 19);
                dur = hms.split(":");
                duration = "";
                if (parseInt(dur[0])) { 
                    duration += `${dur[0]}h`; 
                } 
                if (parseInt(dur[1])){
                    duration += `${dur[1]}m`; 
                }
                if (parseInt(dur[2])){
                    duration += `${dur[2]}s`; 
                }
            }
            let li = document.createElement("li");
            let link = `<a href="#${id}">${title}</a> <span title="${hms}">${duration}</span>`;

            li.innerHTML = link;
            list.appendChild(li);
        }, once = true);
    }



}