const musicData = [
    {title: "solar", artist: "Betical", id: 1}, 
    {title: "electric", artist: "Teemid", id: 2}, 
    {title: "pop", artist: "Popsy", id: 3}, 
]; 
const musicPlayer = document.querySelector('audio'); 
const musicTitle = document.querySelector('.music-title');
const artistName = document.querySelector('.artist-name');
const thumbnail = document.querySelector('.thumbnail');
const indexTxt = document.querySelector('.current-index');

let currentMusicIndex = 1;

/**
 * Update the interface of the audio player (destructuring)
 */
function populateUI({title, artist}) {
    musicTitle.textContent = title.toUpperCase();
    artistName.textContent = artist; 
    thumbnail.src = `ressources/images/${title}.png`; 
    musicPlayer.src = `ressources/music/${title}.mp3`; 
    indexTxt.textContent = `${currentMusicIndex}/${musicData.length}`; 
}

populateUI(musicData[currentMusicIndex - 1]); //first 0


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


/* ***************** display the current time and the total duration ***************** */


const displayCurrentTime = document.querySelector('.current-time'); 
const durationTime = document.querySelector('.duration-time'); 
const progressBar = document.querySelector('.progress-bar');

musicPlayer.addEventListener('loadeddata', fillDurationVariables);

let current;
let totalDuration;

/**
 * Manage and display the time of the music 
 */
function fillDurationVariables() {
    current = musicPlayer.currentTime;
    totalDuration = musicPlayer.duration;

    formatValue(current, displayCurrentTime);
    formatValue(totalDuration, durationTime);
}

/**
 *  Format the current time and the total duration
 */
function formatValue(value, element) {
    const currentMinutes = Math.trunc(value / 60);
    let currentSeconds = Math.trunc(value % 60);

    if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`
    }

    element.textContent = `${currentMinutes}:${currentSeconds}`
}


/* ***************** Update the progress bar ***************** */


musicPlayer.addEventListener('timeupdate', updateProgress); 

/**
 * Update the progress bar 
 */
function updateProgress(e) {
    current = e.srcElement.currentTime; 

    const progressValue = current / totalDuration; 
    progressBar.style.transform = `scaleX(${progressValue})`; 

    formatValue(current, displayCurrentTime); 
}


/* ***************** Click on the progress bar ***************** */ 


const musicTrack = document.querySelector('audio'); 
const progressBarContainer = document.querySelector('.progress-container'); 

progressBarContainer.addEventListener('click', setProgress); 

let rect = progressBarContainer.getBoundingClientRect(); // return rect avec remplissage et bordure 
let width = rect.width; 

/**
 * Click on the progress bar
 */
function setProgress(e) {
    const x = e.clientX - rect.left; 
    musicPlayer.currentTime = (x / width) * totalDuration; // pourcentage (0.) * totalDuration
}


/* ***************** Change music ***************** */ 


const shuffleBtn = document.querySelector('.shuffle'); 
shuffleBtn.addEventListener('click', switchShuffle); 
let shuffle = false; 

/**
 * active shuffle btn 
 */
function switchShuffle() {
    shuffleBtn.classList.toggle('active');
    shuffle = !shuffle; 
}

const nextBtn = document.querySelector('.next-btn'); 
const prevBtn = document.querySelector('.prev-btn'); 

[prevBtn, nextBtn].forEach(btn => btn.addEventListener('click', changeSong)); 
musicPlayer.addEventListener('ended', changeSong); 

/**
 * Change the music
 */
function changeSong(e) {
    if (shuffle) {
        console.log('shuffle')
        playShuffledSong(); 
        return; 
    }

    e.target.classList.contains('next-btn') || e.type === 'ended' ? 
    currentMusicIndex++ : currentMusicIndex-- ; 

    if (currentMusicIndex < 1) currentMusicIndex = musicData.length; // to the last one
    else if (currentMusicIndex > musicData.length)  currentMusicIndex = 1; 

    populateUI(musicData[currentMusicIndex -1]); 
    play();
}

/**
 * Play shuffled music 
 */
function playShuffledSong() {
    const musicWithoutCurrentSong = musicData.filter(el => el.id !== currentMusicIndex);
    const randomMusic = musicWithoutCurrentSong[Math.trunc(Math.random() * musicWithoutCurrentSong.length)];
    
    currentMusicIndex = randomMusic.id; 
    populateUI(randomMusic);
    play();
}