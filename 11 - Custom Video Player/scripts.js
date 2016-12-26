const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay() {
  if (video.paused) {
    video.play();
    toggle.textContent = '❚ ❚';
  } else {
    video.pause();
    toggle.textContent = '►';
  }
}

function skipTime() {
  video.currentTime += parseInt(this.dataset.skip);
}

function changeRange() {
  video[this.name] = parseFloat(this.value);
}

function resizeProgress() {
  progressBar.style.flexBasis = `${video.currentTime / video.duration * 100}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', resizeProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skipTime));
ranges.forEach(range => range.addEventListener('change', changeRange));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
