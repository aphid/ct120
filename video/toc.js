let toc = document.querySelector("#toc");
let list = toc.querySelector("ol");
let groups = document.querySelectorAll(".group");
let tuts = document.querySelectorAll("section");
for (let i = 0; i < tuts.length; i++) {
    let tut = tuts[i];
    let li = document.createElement("li");

    if (tut.classList.contains("group")) {
        let id = tut.querySelector("h3").textContent;
        li.innerHTML = `${id}<ol id=toc${tut.id}>`;
        list.appendChild(li);

    } else {

        let title = tut.querySelector("h3").textContent;
        let id = tut.id;
        let vid = tut.querySelector("video");
        let link = `<a href="#${id}">${title}</a> <span class="duration"></span>`;

        li.innerHTML = link;

        if (tut.closest(".group")){
            let g = tut.closest(".group");
            list = document.querySelector(`ol#toc${g.id}`)

        }
        list.appendChild(li);

        //    console.log(vid);
        if (vid.readyState < 2) {
            vid.addEventListener("loadedmetadata", () => {
                showDuration(vid, li);
            }, once = true);
        }
    }

}


function showDuration(vid, li) {
    let dur = vid.duration;
    console.log(dur);
    let duration, hms;
    if (dur) {
        let hms = new Date(dur * 1000).toISOString().slice(11, 19);
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
    } else {
        duration = "???";
    }
    let durspan = li.querySelector(".duration");
    durspan.textContent = duration;
    durspan.style.opacity = 1;
}