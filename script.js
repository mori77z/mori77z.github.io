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

    const lang = navigator.language.startsWith("de") ? "de" : "en";
    const isMobile = /Mobi|Android|iPhone|iPad/.test(navigator.userAgent);

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
    hint.textContent = isMobile
        ? (lang === "de" ? "Tippe auf den Bildschirm für Sound" : "Tap the screen for sound")
        : (lang === "de" ? "Drücke die Leertaste für Sound" : "Press spacebar for sound");

    document.body.appendChild(hint);

    function toggleSound() {
        if (!soundEnabled) {
            audio.play().catch(e => console.error("Autoplay prevented:", e));
        } else {
            audio.pause();
            audio.currentTime = 0;
        }
        soundEnabled = !soundEnabled;
    }

    if (isMobile) {
        document.addEventListener("click", () => {
            if (!interactionReady) {
                hint.remove();
                interactionReady = true;
            }
            toggleSound();
        });
    } else {
        document.addEventListener("keydown", function (e) {
            if (e.code === "Space") {
                e.preventDefault();
                if (!interactionReady) {
                    hint.remove();
                    interactionReady = true;
                }
                toggleSound();
            }
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