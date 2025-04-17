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
    
// === Audio Handling ===
const audio = new Audio("https://moritzgauss.com/assets/thelast2peopleonearth.mp3");
audio.loop = true;
audio.volume = 0.5;

let soundEnabled = false;
let interactionReady = false;
let audioDisabled = localStorage.getItem("audioDisabled") === "true";
let lastTime = 0;

const lang = navigator.language.startsWith("de") ? "de" : "en";

// === Hinweis Overlay ===
if (!audioDisabled) {
    const hint = document.createElement("div");
    hint.style.position = "fixed";
    hint.style.top = "50%";
    hint.style.left = "50%";
    hint.style.transform = "translate(-50%, -50%)";
    hint.style.background = "rgba(0, 0, 0, 0.8)";
    hint.style.color = "#fff";
    hint.style.padding = "1em 2em";
    hint.style.fontFamily = "sans-serif";
    hint.style.fontSize = "1.2em";
    hint.style.zIndex = "9999";
    hint.style.borderRadius = "8px";
    hint.style.textAlign = "center";
    hint.style.cursor = "pointer";
    hint.textContent = lang === "de" ? "Klicke irgendwo für Sound" : "Click anywhere for sound";

    document.body.appendChild(hint);

    document.addEventListener("click", () => {
        if (audioDisabled) return;

        if (!interactionReady) {
            hint.remove();
            interactionReady = true;
        }
        toggleSound();
    });
}

// === UI Indikator unten links ===
const indicator = document.createElement("div");
indicator.style.position = "fixed";
indicator.style.bottom = "20px";
indicator.style.left = "20px";
indicator.style.color = "#fff";
indicator.style.fontFamily = "Georgia, serif";
indicator.style.fontSize = "14px";
indicator.style.zIndex = "9999";
indicator.style.pointerEvents = "none";
indicator.style.transition = "opacity 0.6s ease";
indicator.style.opacity = audioDisabled ? "0.3" : "1";

indicator.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; gap: 10px;">
        <div><i>"perfect sound to scroll the web"</i> by dj poolboi</div>
        <div id="closeSound" style="cursor: pointer; font-size: 18px; opacity: 0.6; pointer-events: auto;">×</div>
    </div>
    <div id="progressBarContainer" style="width: 200px; height: 4px; background: rgba(255,255,255,0.2); margin: 6px 0;">
        <div id="progressBar" style="width: 0%; height: 100%; background: #fff;"></div>
    </div>
    <div style="opacity: 0.6;">${lang === "de" ? 'Klicke nochmal zum Stummschalten' : 'Click again to mute'}</div>
`;
document.body.appendChild(indicator);

// === Musiknote zum Reaktivieren ===
const note = document.createElement("div");
note.textContent = "♬";
note.style.position = "fixed";
note.style.bottom = "22px";
note.style.left = "12px";
note.style.fontSize = window.innerWidth < 768 ? "14px" : "16px";
note.style.color = "#fff";
note.style.opacity = "0.5";
note.style.cursor = "pointer";
note.style.zIndex = "10000";
note.style.pointerEvents = "auto";
note.style.transition = "opacity 0.3s ease";
note.title = lang === "de" ? "Sound aktivieren" : "Enable sound";

note.addEventListener("click", () => {
    audioDisabled = false;
    interactionReady = true;
    note.style.display = "none";
    indicator.style.opacity = "1";
    toggleSound();
});
document.body.appendChild(note);

// Nur zeigen, wenn deaktiviert
if (!audioDisabled) {
    note.style.display = "none";
}

// === Close Button Funktion ===
const closeBtn = document.getElementById("closeSound");
closeBtn.addEventListener("click", () => {
    audio.pause();
    soundEnabled = false;
    audioDisabled = true;
    localStorage.setItem("audioDisabled", "true");
    indicator.style.opacity = "0.3";
    note.style.display = "block";
});

// === Scroll Hide/Show Indicator ===
let lastScrollY = window.scrollY;
window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY + 10) {
        indicator.style.opacity = "0";
    } else if (currentScrollY < lastScrollY - 10) {
        indicator.style.opacity = audioDisabled ? "0.3" : "1";
    }
    lastScrollY = currentScrollY;
});

// === Fortschrittsanzeige aktualisieren ===
setInterval(() => {
    if (!audio.duration || isNaN(audio.duration)) return;
    const percent = (audio.currentTime / audio.duration) * 100;
    const progress = document.getElementById("progressBar");
    if (progress) progress.style.width = percent + "%";
}, 500);

// === Toggle Sound ohne Speicherung
function toggleSound() {
    if (audioDisabled) return;

    if (!soundEnabled) {
        audio.currentTime = 0;
        audio.play().catch(e => console.error("Autoplay prevented:", e));
    } else {
        audio.pause();
    }
    soundEnabled = !soundEnabled;
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
