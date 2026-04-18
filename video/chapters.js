let tracks = document.querySelectorAll("track");
//console.log("okay!");

for (let t of tracks) {
    if (t.kind !== "chapters"){
        continue;
    }
    let vid = t.closest("video");
    if (t.readyState < 2){
        t.addEventListener("load",function(){
            processChapters(vid,t);
        });
    } else {
        console.log("track", t.src, "has loaded");
        processChapters(vid,t);
    }
    



}

function processChapters(vid, track) {
    let vtracks = vid.textTracks;
    let trk;
    for (let t of vtracks){
        //console.log(t);
        if (t.kind === "chapters"){
            trk = t;
        }
    }
    console.log(trk);
    let id = vid.closest("section").id;
    let cues = trk.cues;
    let sec = `<details open id=${id}_chapters><summary>Chapters (${cues.length})</summary>
        <ol>`;
    for (let cue of cues) {
        sec += `<li><a class="chapterlink" href="#" data-start="${cue.startTime}">${cue.text}</a></li>`;
    }
    sec += `</ol></details></section>`;
    let nav = vid.closest("section").querySelector("nav")
    nav.innerHTML = sec;

    for (let a  of nav.querySelectorAll("a")){
        a.addEventListener("click",function(event){
            vid.currentTime = this.dataset.start;
            event.preventDefault()
        })
    }

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