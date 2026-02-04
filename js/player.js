const audio = document.getElementById("audio");
const links = document.querySelectorAll(".playlist-list a");
const nowPlaying = document.querySelector(".now-playing");
const scrollContainer = document.getElementById("scroll-container");

const playBtn = document.querySelector(".play");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const btnUp = document.querySelector(".btn-up");
const btnDown = document.querySelector(".btn-down");

let currentIndex = 0;

function loadSong(index) {
  const link = links[index];
  audio.src = link.getAttribute("href");
  audio.play();
  nowPlaying.textContent = link.textContent;
  playBtn.textContent = "❚❚";
  link.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

links.forEach((link, index) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    currentIndex = index;
    loadSong(currentIndex);
  });
});

btnUp.addEventListener("click", () => { scrollContainer.scrollTop -= 150; });
btnDown.addEventListener("click", () => { scrollContainer.scrollTop += 150; });

playBtn.addEventListener("click", () => {
  if (!audio.src) return;
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "❚❚";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % links.length;
  loadSong(currentIndex);
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + links.length) % links.length;
  loadSong(currentIndex);
});

audio.addEventListener("ended", () => {
  currentIndex = (currentIndex + 1) % links.length;
  loadSong(currentIndex);
});