let vids = document.querySelectorAll("video");
console.log("okay!");

for (let vid of vids){
    console.log("trying", vid);
    for (let t of vid.textTracks){
        if(t.kind === "chapters"){
            console.log("processing", vid, t);
            processChapters(vid,t);
        }
    }

}

function processChapters(vid,track){
    let id = vid.closest("section").id;
    let cues = track.cues;
    console.log(cues.length);
    let sec = `<section id=${id}_chapters>
        <ul>`;
    for (let cue of cues){
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