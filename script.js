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
    console.log(musicPlayer.paused);  
    if (musicPlayer.paused) play(); 
    else pause(); 
}

function play() {
    console.log("Lecture de la musique"); 
    playbtn.querySelector("img").src = "ressources/icons/pause.png"; 
    musicPlayer.play(); 
}

function pause() {
    console.log("Pause de la musique"); 
    playbtn.querySelector("img").src = "ressources/icons/play.png"; 
    musicPlayer.pause(); 
}