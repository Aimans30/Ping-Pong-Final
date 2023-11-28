

function goToRules(){
    window.location.href="./rules.html"
}
function goToname(){
    window.location.href="./name.html"
  }
  const isAudioPlaying = localStorage.getItem('audioPlaying') === 'true';

  const audio = document.getElementById('backgroundAudio');
const button = document.getElementById('audioButton');

button.addEventListener('click', toggleAudio);

function toggleAudio() {
  if (audio.paused) {
    audio.play();
    // Change the button appearance to indicate audio is playing
    button.classList.add('audio-on');
  } else {
    audio.pause();
    // Change the button appearance to indicate audio is paused
    button.classList.remove('audio-on');
  }
}
