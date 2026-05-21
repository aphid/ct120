//set up some vars
let toc = document.querySelector("#toc");
let list;
let groups = document.querySelectorAll(".group");
let tuts = document.querySelectorAll("section");

//for every section...
for (let i = 0; i < tuts.length; i++) {
    list = toc.querySelector("#oltoc");
    let tut = tuts[i];
    //make a list item
    let li = document.createElement("li");
    //if it isn't a group or a tutorial, gtfo
    if (!tut.classList.contains("group") && !tut.classList.contains("tutorial")) {
        console.log("wrong kind of section", tut);
        continue;
    }
    //top level - it's a group....
    if (tut.classList.contains("group")) {
        let id = tut.querySelector("h1").textContent;
        console.log("main group", id);
        li.innerHTML = `${id}<ol id="toc${tut.id}"></ol>`;
        list.appendChild(li);

    } else {
        //it's a tutorial!
        let title = tut.querySelector("h2").textContent;
        let id = tut.id;
        let vid = tut.querySelector("video");
        let link = `<a href="#${id}">${title}</a> <span class="duration"></span>`;

        li.innerHTML = link;

        if (tut.closest(".group")) {
            let g = tut.closest(".group");
            list = document.querySelector(`ol#toc${g.id}`)
        }
        list.appendChild(li);

        //if video hasn't loaded already, add a listener...
        if (vid && vid.readyState < 2) {
            vid.addEventListener("loadedmetadata", () => {
                showDuration(vid, li);
            }, once = true);
        }
    }

}

function showDuration(vid, li) {
    let dur = vid.duration;
    let duration;
    if (dur) {
        duration = formatDuration(dur);
    } else {
        duration = "???";
    }
    let durspan = li.querySelector(".duration");
    durspan.dataset.dur = dur;
    durspan.textContent = duration;
    durspan.style.opacity = 1;
}

function formatDuration(seconds) {
    let hms = new Date(seconds * 1000).toISOString().slice(11, 19);
    dur = hms.split(":");
    duration = "";
    if (parseInt(dur[0])) {
        duration += `${dur[0]}h`;
    }
    if (parseInt(dur[1])) {
        duration += `${dur[1]}m`;
    }
    if (parseInt(dur[2])) {
        duration += `${dur[2]}s`;
    }
    return duration
}