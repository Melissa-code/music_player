const musicData = [
    {title: "Solar", artist: "Betical", id: 1}, 
    {title: "Electric", artist: "Teemid", id: 2}, 
    {title: "Aurora", artist: "Slumb", id: 3}, 
    {title: "Lost-Colours", artist: "Fakear", id: 4}, 
]; 
const musicPlayer = document.querySelector('audio'); 
const musicTitle = document.querySelector('.music-title');
const artistName = document.querySelector('.artist-name');
const thumbnail = document.querySelector('.thumbnail');
const indexTxt = document.querySelector('.current-index');

let currentMusicIndex = 1;

/**
 * Update the interface
 * destructuring
 */
function populateUI({title, artist}) {
    musicTitle.textContent = title;
    artistName.textContent = artist; 
    thumbnail.src = `ressources/images/${title}.png`; 
    musicPlayer.src = `ressources/music/${title}.mp3`; 
    indexTxt.textContent = `${currentMusicIndex}/${musicData.length}`; 
}

populateUI(musicData[currentMusicIndex - 1]);//first


let playbtn = document.querySelector('.play-btn'); 
playbtn.addEventListener('click', handlePlayPause)

function handlePlayPause() {
    if (musicPlayer.paused) play(); 
    else pause(); 
}

function play() {
    playbtn.querySelector("img").src = "ressources/icons/pause.png"; 
    musicPlayer.play(); 
}

function pause() {
    playbtn.querySelector("img").src = "ressources/icons/play.png"; 
    musicPlayer.pause(); 
}


const displayCurrentTime = document.querySelector('.current-time'); 
const durationTime = document.querySelector('.duration-time'); 
const progressBar = document.querySelector('.progress-bar');

musicPlayer.addEventListener('loadeddata', fillDurationVariables);

let current;
let totalDuration;

 console.log(musicPlayer.duration)

function fillDurationVariables() {
    current = musicPlayer.currentTime;
    totalDuration = musicPlayer.duration;

    formatValue(current, displayCurrentTime);
    formatValue(totalDuration, durationTime);
}

function formatValue(value, element) {
    const currentMinutes = Math.trunc(value / 60);
    let currentSeconds = Math.trunc(value % 60);

    if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`
    }

    element.textContent = `${currentMinutes}:${currentSeconds}`
}


musicPlayer.addEventListener('timeupdate', updateProgress); 

function updateProgress(e) {
    current = e.srcElement.currentTime; 
    //console.log(current)

    const progressValue = current / totalDuration; 
    progressBar.style.transform = `scaleX(${progressValue})`; 

    formatValue(current, displayCurrentTime); 

}