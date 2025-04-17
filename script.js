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
                        glitchText(moritzElement, "Mritz Gauss");
                        lastScrollTop = currentScroll;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
// === Audio Setup ===
const audio = new Audio("https://moritzgauss.com/assets/thelast2peopleonearth.mp3");
audio.loop = true;
audio.volume = 0.5;

let soundEnabled = false;
let interactionReady = false;
let audioDisabled = false;
let lastTime = 0;
let progressInterval = null;

const lang = navigator.language.startsWith("de") ? "de" : "en";
const isMobile = /Mobi|Android|iPhone|iPad/.test(navigator.userAgent);
const isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;

// === Hinweis Overlay ===
const hint = document.createElement("div");
hint.style.position = "fixed";
hint.style.top = "50%";
hint.style.left = "50%";
hint.style.transform = "translate(-50%, -50%)";
hint.style.background = "rgba(0, 0, 0, 0.85)";
hint.style.color = "#fff";
hint.style.padding = isMobile ? "1em 2em" : "1.5em 3em";
hint.style.fontFamily = "sans-serif";
hint.style.fontSize = isMobile ? "1.2em" : "1.6em";
hint.style.zIndex = "9999";
hint.style.borderRadius = "8px";
hint.style.textAlign = "center";
hint.style.cursor = "pointer";
hint.textContent = lang === "de" ? "Klicke für Sound" : "Click to enable sound";
document.body.appendChild(hint);

// === UI unten links ===
const indicator = document.createElement("div");
indicator.style.position = "fixed";
indicator.style.bottom = "20px";
indicator.style.left = "20px";
indicator.style.fontFamily = "Georgia, serif";
indicator.style.fontSize = isMobile ? "14px" : "16px";
indicator.style.zIndex = "9999";
indicator.style.transition = "opacity 0.6s ease";
indicator.style.opacity = "1";
indicator.style.pointerEvents = "auto";
indicator.style.color = isLightMode ? "#111" : "#fff";

indicator.innerHTML = `
  <div><i>"perfect sound to scroll the web"</i> by dj poolboi</div>
  <div id="progressBarContainer" style="width: 200px; height: 4px; background: rgba(0,0,0,0.2); margin: 6px 0;">
    <div id="progressBar" style="width: 0%; height: 100%; background: ${isLightMode ? "#111" : "#fff"};"></div>
  </div>
  <div style="opacity: 0.6;">${lang === "de" ? 'Klicke nochmal zum Stummschalten' : 'Click again to mute'}</div>
  <div id="closeAudio"
       style="margin-top: 4px; cursor: pointer; font-size: 18px; opacity: 0.5;">
       ${lang === "de" ? 'Sound ausblenden ✕' : 'Disable sound ✕'}
  </div>
  <div style="
    font-size: ${isMobile ? '24px' : '32px'};
    margin-top: 10px;
    text-shadow: 0 0 16px ${isLightMode ? '#111' : '#fff'};
    color: ${isLightMode ? '#111' : '#fff'};
  ">♪</div>
`;
document.body.appendChild(indicator);

// === Scroll UI ein-/ausblenden
let lastScrollY = window.scrollY;
window.addEventListener("scroll", () => {
  const currentY = window.scrollY;
  indicator.style.opacity = currentY > lastScrollY + 10 ? "0" : "1";
  lastScrollY = currentY;
});

// === Progress Bar Handling
function startProgress() {
  if (progressInterval) clearInterval(progressInterval);
  progressInterval = setInterval(() => {
    if (!audio.duration || isNaN(audio.duration)) return;
    const percent = (audio.currentTime / audio.duration) * 100;
    const progress = document.getElementById("progressBar");
    if (progress) progress.style.width = percent + "%";
  }, 500);
}

function stopProgress() {
  clearInterval(progressInterval);
  const progress = document.getElementById("progressBar");
  if (progress) progress.style.width = "0%";
}

// === Toggle Sound
function toggleSound() {
  if (audioDisabled) return;

  if (!soundEnabled) {
    audio.currentTime = lastTime;
    audio.play().catch(e => console.warn("Autoplay error:", e));
    startProgress();
  } else {
    lastTime = audio.currentTime;
    audio.pause();
    stopProgress();
  }

  soundEnabled = !soundEnabled;
}

// === Aktivierung per Klick
document.addEventListener("click", () => {
  if (audioDisabled) return;

  if (!interactionReady) {
    hint.remove();
    interactionReady = true;
  }
  toggleSound();
});

// === Schließen (X)
const closeAudioBtn = indicator.querySelector("#closeAudio");
if (closeAudioBtn) {
  closeAudioBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    audio.pause();
    audioDisabled = true;
    soundEnabled = false;
    lastTime = 0;
    stopProgress();
    indicator.remove();
    hint.remove();
  });
}
    
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
