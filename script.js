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
let audioDisabled = false;
let lastTime = 0;

const lang = navigator.language.startsWith("de") ? "de" : "en";
const isMobile = /Mobi|Android|iPhone|iPad/.test(navigator.userAgent);
const isLightMode = window.matchMedia("(prefers-color-scheme: light)").matches;

const textColor = isLightMode ? "#000" : "#fff";
const barColor = isLightMode ? "#000" : "#fff";
const shadowColor = isLightMode ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.4)";

// === Player UI ===
const player = document.createElement("div");
player.style.position = "fixed";
player.style.bottom = "20px";
player.style.left = "20px";
player.style.color = textColor;
player.style.fontFamily = "Georgia, serif";
player.style.fontSize = isMobile ? "16px" : "18px";
player.style.zIndex = "9999";
player.style.pointerEvents = "auto";
player.style.transition = "opacity 0.6s ease";
player.style.opacity = "0";
player.style.display = "none";

player.innerHTML = `
    <div><i>"perfect sound to scroll the web"</i> by dj poolboi</div>
    <div style="width: 200px; height: 4px; background: rgba(255,255,255,0.2); margin: 6px 0;">
        <div id="progressBar" style="width: 0%; height: 100%; background: ${barColor};"></div>
    </div>
    <div id="playerToggle" style="opacity: 0.7; cursor: pointer;">
        ${lang === "de" ? 'Play' : 'Play'}
    </div>
    <div id="closePlayer" style="
        margin-top: 8px;
        font-size: ${isMobile ? "20px" : "24px"};
        cursor: pointer;
        text-shadow: 0 0 15px ${shadowColor};
        opacity: 0.8;
    ">× ${lang === "de" ? 'Player schließen' : 'Close player'}</div>
`;
document.body.appendChild(player);

// === Note Button ===
const note = document.createElement("div");
note.textContent = "♪";
note.style.position = "fixed";
note.style.bottom = "20px";
note.style.left = "20px";
note.style.color = textColor;
note.style.fontSize = isMobile ? "28px" : "32px";
note.style.fontFamily = "Georgia, serif";
note.style.cursor = "pointer";
note.style.zIndex = "9999";
note.style.display = "none";
note.style.textShadow = `0 0 20px ${shadowColor}`;
document.body.appendChild(note);

// === Play/Pause toggle
player.querySelector("#playerToggle").addEventListener("click", () => {
    if (!soundEnabled) {
        audio.currentTime = lastTime;
        audio.play();
        soundEnabled = true;
        updateToggleText();
    } else {
        lastTime = audio.currentTime;
        audio.pause();
        soundEnabled = false;
        updateToggleText();
    }
});

// === Player schließen
player.querySelector("#closePlayer").addEventListener("click", () => {
    audio.pause();
    lastTime = audio.currentTime;
    soundEnabled = false;
    hidePlayer();
    showNote();
});

// === Note bringt Player zurück
note.addEventListener("click", () => {
    audio.currentTime = lastTime;
    audio.play();
    soundEnabled = true;
    hideNote();
    showPlayer();
    updateToggleText();
});

// === Fortschrittsanzeige
setInterval(() => {
    if (!audio.duration || isNaN(audio.duration)) return;
    const percent = (audio.currentTime / audio.duration) * 100;
    const progress = document.getElementById("progressBar");
    if (progress) progress.style.width = percent + "%";
    if (soundEnabled) lastTime = audio.currentTime;
}, 500);

// === Auto-Start versuchen
window.addEventListener("load", () => {
    audio.play().then(() => {
        soundEnabled = true;
        showPlayer();
        updateToggleText();
    }).catch(() => {
        // Autoplay blockiert – Note zeigen
        showNote();
    });
});

// === Helpers
function updateToggleText() {
    const toggle = document.getElementById("playerToggle");
    toggle.textContent = soundEnabled
        ? (lang === "de" ? "Pause" : "Pause")
        : (lang === "de" ? "Play" : "Play");
}

function showPlayer() {
    player.style.display = "block";
    requestAnimationFrame(() => {
        player.style.opacity = "1";
    });
}

function hidePlayer() {
    player.style.opacity = "0";
    setTimeout(() => {
        player.style.display = "none";
    }, 500);
}

function showNote() {
    note.style.display = "block";
}

function hideNote() {
    note.style.display = "none";
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
