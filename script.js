document.addEventListener("DOMContentLoaded", function () {
    // === Glitch Effekt ===
    const moritzElement = document.querySelector(".moritz");
    if (!moritzElement) {
        console.error("Element '.moritz' not found!");
    } else {
        let isFlipping = false;

        function randomChar() {
            const symbols = "✹❦♬♪♩★❥✱♫♞";
            return symbols[Math.floor(Math.random() * symbols.length)];
        }

        function glitchText(element, originalText, duration = 300) {
            if (isFlipping) return;
            isFlipping = true;
            let scrambledText = Array.from({ length: 7 }, () => randomChar()).join("");
            element.textContent = scrambledText;
            setTimeout(() => {
                element.textContent = originalText;
                isFlipping = false;
            }, duration);
        }

        let lastScrollTop = 0;
        let ticking = false;

        window.addEventListener("scroll", function () {
            if (!ticking) {
                requestAnimationFrame(() => {
                    let currentScroll = window.scrollY;
                    if (Math.abs(currentScroll - lastScrollTop) > 50) {
                        glitchText(moritzElement, "Moritz Gauss");
                        lastScrollTop = currentScroll;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
/*// === Audio Setup ===
const audio = new Audio("https://moritzgauss.com/assets/thelast2peopleonearth.mp3");
audio.loop = true;
audio.volume = 0.5;

let soundEnabled = false;
let interactionOccurred = false;
let lastTime = 0;

const lang = navigator.language.startsWith("de") ? "de" : "en";
const isMobile = /Mobi|Android|iPhone|iPad/.test(navigator.userAgent);
const isLightMode = window.matchMedia("(prefers-color-scheme: light)").matches;

const textColor = isLightMode ? "#000" : "#fff";
const bgCircle = isLightMode ? "#fff" : "#000";
const shadowColor = isLightMode ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.5)";
const barColor = textColor;

// === Player UI ===
const player = document.createElement("div");
player.style.position = "fixed";
player.style.bottom = "20px";
player.style.left = "20px";
player.style.color = textColor;
player.style.fontFamily = "Georgia, serif";
player.style.fontSize = isMobile ? "16px" : "18px";
player.style.zIndex = "9999";
player.style.transition = "opacity 0.5s ease";
player.style.opacity = "0";
player.style.display = "none";
player.style.pointerEvents = "auto";

player.innerHTML = `
  <div style="font-size: ${isMobile ? "16px" : "18px"};"><i>"perfect sound to scroll the web"</i> by dj poolboi</div>
  <div style="width: 200px; height: 4px; background: rgba(255,255,255,0.2); margin: 6px 0;">
    <div id="progressBar" style="width: 0%; height: 100%; background: ${barColor};"></div>
  </div>
  <div id="playPauseBtn" style="cursor: pointer; margin-top: 4px; font-weight: bold; font-size: ${isMobile ? "15px" : "16px"};">
    ${lang === "de" ? "Play" : "Play"}
  </div>
  <div id="closePlayer" style="cursor: pointer; margin-top: 6px; text-decoration: underline; font-size: ${isMobile ? "16px" : "18px"};">
    ${lang === "de" ? "Player schließen" : "Close player"}
  </div>
`;

document.body.appendChild(player);

// === Musiknote (erscheint nach Schließen) ===
const note = document.createElement("div");
note.innerText = "♪";
note.style.position = "fixed";
note.style.bottom = "20px";
note.style.left = "20px";
note.style.fontSize = isMobile ? "28px" : "32px";
note.style.fontFamily = "Georgia, serif";
note.style.zIndex = "9999";
note.style.cursor = "pointer";
note.style.display = "none";
note.style.padding = "10px";
note.style.background = bgCircle;
note.style.borderRadius = "50%";
note.style.boxShadow = `0 0 16px ${shadowColor}`;
note.style.color = textColor;
note.style.userSelect = "none";
document.body.appendChild(note);

// === Interaktion
document.addEventListener("click", () => {
  if (!interactionOccurred) {
    interactionOccurred = true;
    audio.currentTime = lastTime;
    audio.play();
    soundEnabled = true;
    showPlayer();
  }
});

// === Buttons im Player
player.querySelector("#playPauseBtn").addEventListener("click", () => {
  if (!soundEnabled) {
    audio.currentTime = lastTime;
    audio.play();
    soundEnabled = true;
    updatePlayPauseText();
  } else {
    lastTime = audio.currentTime;
    audio.pause();
    soundEnabled = false;
    updatePlayPauseText();
  }
});

player.querySelector("#closePlayer").addEventListener("click", () => {
  lastTime = audio.currentTime;
  audio.pause();
  soundEnabled = false;
  player.style.display = "none";
  note.style.display = "block";
});

// === Note wieder aktiviert Player
note.addEventListener("click", () => {
  audio.currentTime = lastTime;
  audio.play();
  soundEnabled = true;
  note.style.display = "none";
  showPlayer();
});

// === Fortschrittsanzeige
setInterval(() => {
  if (!audio.duration || isNaN(audio.duration)) return;
  const percent = (audio.currentTime / audio.duration) * 100;
  const progress = document.getElementById("progressBar");
  if (progress) progress.style.width = percent + "%";
}, 500);

// === Scrollverhalten: Player ausblenden beim Runterscrollen
let lastScrollY = window.scrollY;
window.addEventListener("scroll", () => {
  const currentY = window.scrollY;
  if (currentY > lastScrollY + 10) {
    player.style.opacity = "0";
  } else if (currentY < lastScrollY - 10) {
    player.style.opacity = "1";
  }
  lastScrollY = currentY;
});

// === Hilfsfunktionen
function showPlayer() {
  player.style.display = "block";
  setTimeout(() => (player.style.opacity = "1"), 10);
  updatePlayPauseText();
}

function updatePlayPauseText() {
  const btn = document.getElementById("playPauseBtn");
  if (btn) {
    btn.textContent = soundEnabled
      ? (lang === "de" ? "Pause" : "Pause")
      : (lang === "de" ? "Play" : "Play");
  }
}*/
   
    // === Zoom Image ===
    const images = document.querySelectorAll(".img-container img");
    if (images.length) {
        const zoomedContainer = document.createElement("div");
        const zoomedImage = document.createElement("img");

        zoomedContainer.classList.add("zoomed-container");
        zoomedImage.classList.add("zoomed-image");
        zoomedContainer.appendChild(zoomedImage);
        document.body.appendChild(zoomedContainer);

        function openZoomedImage(src) {
            zoomedImage.src = src;
            zoomedImage.classList.add("active");
            zoomedContainer.classList.add("active");
        }

        function closeZoomedImage() {
            zoomedImage.classList.remove("active");
            zoomedContainer.classList.remove("active");
        }

        images.forEach(img => {
            img.addEventListener("click", () => openZoomedImage(img.src));
        });

        zoomedContainer.addEventListener("click", (e) => {
            if (e.target === zoomedContainer || e.target === zoomedImage) {
                closeZoomedImage();
            }
        });
    }

    // === Arrow Scroll ===
    const arrowLeft = document.querySelectorAll(".arrow_left");
    const arrowRight = document.querySelectorAll(".arrow_right");

    arrowLeft.forEach(arrow => {
        arrow.addEventListener("click", function () {
            const scrollAmount = 300;
            const parentContent = arrow.closest('.arrows-wrapper').previousElementSibling;
            if (parentContent?.classList.contains('content')) {
                parentContent.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        });
    });

    arrowRight.forEach(arrow => {
        arrow.addEventListener("click", function () {
            const scrollAmount = 300;
            const parentContent = arrow.closest('.arrows-wrapper').previousElementSibling;
            if (parentContent?.classList.contains('content')) {
                parentContent.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        });
    });
});

// === Android Overlay ===
window.addEventListener('load', function () {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isAndroid = /android/i.test(userAgent);
    const isMobile = /mobile/i.test(userAgent);

    const overlay = document.getElementById('android-overlay');

    if (isAndroid && isMobile && overlay) {
        overlay.style.display = 'flex';
        document.addEventListener('click', function () {
            overlay.style.display = 'none';
        }, { once: true });
    }
});
