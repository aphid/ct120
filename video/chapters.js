let tracks = document.querySelectorAll("track");
//console.log("okay!");

for (let t of tracks) {
    if (track.kind !== "chapters"){
        continue;
    }
    let vid = t.closest("video");
    console.log("trying", vid);
    if (t.readyState < 2){
        t.addEventListener("loaded",function(){
            processChapters(vid,t);
        });
    } else {
        processChapters(vid,t);
    }
    



}

function processChapters(vid, track) {
    let vtracks = vid.textTracks;
    let trk;
    for (let t of vtracks){
        if (t.kind === "chapter"){
            trk = t;
        }
    }

    let id = vid.closest("section").id;
    let cues = trk.cues;
    console.log(cues.length);
    let sec = `<section id=${id}_chapters>
        <ul>`;
    for (let cue of cues) {
        sec += `<li><a class="chapterlink" data-start="${cue.startTime}">${cue.text}</a></li>`;
    }
    sec += `</ul></section>`;
    vid.closest("section").querySelector("nav").innerHTML = sec;


}

/*
textTracks[0];
        let transcript = document.querySelector(".transcript");
        //see https://developer.mozilla.org/en-US/docs/Web/API/TextTrack/cuechange_event
        track.addEventListener("cuechange", () => {
            console.log("cuechange");
            //only one cue should be active at a time...
            let cue = track.activeCues[0];
            //but let's make sure it exists 
            if (cue) {
                //match data-start with starttime. don't need to match text exactly (the cues have some html in them). probably overkill to loop over every div, but oh well.
                for (let div of document.querySelectorAll(".transcript div")) {
                    if (div.dataset.start == cue.startTime) {
                        console.log("found it")
                        if (plzscroll.checked){
                            div.scrollIntoView();
                        }
                        div.classList.add("emph");
                    } else {
                        div.classList.remove("emph");
                    }
                }
            }
        });
        */