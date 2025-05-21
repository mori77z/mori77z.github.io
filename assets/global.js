document.addEventListener("DOMContentLoaded", function () {
    includeHeader();
    includeFooter();
    initZoomImages();
    initArrowScroll();
    initConfirmLinks();
    // initAudioPlayer(); // Player bei Bedarf wieder aktivieren
});

// === Header Snippet einbinden ===
function includeHeader() {
    fetch("/snippets/header.html")
        .then(response => {
            if (!response.ok) throw new Error("Header konnte nicht geladen werden");
            return response.text();
        })
        .then(data => {
            const header = document.createElement("header");
            header.innerHTML = data;
            document.body.insertBefore(header, document.body.firstChild);

const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
header.querySelectorAll("nav a").forEach(link => {
    const href = link.getAttribute("href").replace(/\/$/, "") || "/";
    if (href === currentPath) {
        link.classList.add("active");
    }
});


// Glitch-Funktion auf .moritz
const moritzElement = header.querySelector(".moritz");
if (moritzElement) {
    const originalHTML = '<span class="capital">M</span>oritz Gauss';
    let isFlipping = false;
    let lastScrollTop = 0;
    let ticking = false;

    function randomChar() {
        const symbols = "✹❦♬♪♩★❥✱♫♞";
        return symbols[Math.floor(Math.random() * symbols.length)];
    }

    function glitchText(element, originalHTML, duration = 300) {
        if (isFlipping) return;
        isFlipping = true;
        const scrambledText = Array.from({ length: 7 }, () => randomChar()).join("");
        element.textContent = scrambledText;
        setTimeout(() => {
            element.innerHTML = originalHTML;
            isFlipping = false;
        }, duration);
    }

    window.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const currentScroll = window.scrollY;
                if (Math.abs(currentScroll - lastScrollTop) > 50) {
                    glitchText(moritzElement, originalHTML);
                    lastScrollTop = currentScroll;
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}
        })
        .catch(error => console.error("Fehler beim Laden des Headers:", error));
}

function includeFooter() {
    fetch("/snippets/footer.html")
        .then(response => {
            if (!response.ok) throw new Error("Footer konnte nicht geladen werden");
            return response.text();
        })
        .then(data => {
            const footer = document.createElement("footer");
            footer.innerHTML = data;
            document.body.appendChild(footer);
            updateLastEditedDate();
        })
        .catch(error => console.error("Fehler beim Laden des Footers:", error));
}

function updateLastEditedDate() {
    const edited = new Date(document.lastModified);
    const formatted = edited.toLocaleString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    const dateSpan = document.getElementById("last-edited-date");
    if (dateSpan) {
        dateSpan.textContent = formatted;
    }
}

function initConfirmLinks() {
    document.querySelectorAll(".iframe-container").forEach(container => {
        container.addEventListener("click", function (e) {
            e.preventDefault();
            const url = container.dataset.href;
            const confirmResult = confirm("Open in new tab?");
            if (confirmResult) {
                window.open(url, "_blank");
            }
        });
    });
}

// === Bild-Zoom bei Klick ===
function initZoomImages() {
    const images = document.querySelectorAll(".img-container img");
    if (!images.length) return;

    const zoomedContainer = document.createElement("div");
    const zoomedImage = document.createElement("img");

    zoomedContainer.classList.add("zoomed-container");
    zoomedImage.classList.add("zoomed-image");
    zoomedContainer.appendChild(zoomedImage);
    document.body.appendChild(zoomedContainer);

    images.forEach(img => {
        img.addEventListener("click", () => {
            zoomedImage.src = img.src;
            zoomedContainer.classList.add("active");
            zoomedImage.classList.add("active");
        });
    });

    zoomedContainer.addEventListener("click", (e) => {
        if (e.target === zoomedContainer || e.target === zoomedImage) {
            zoomedContainer.classList.remove("active");
            zoomedImage.classList.remove("active");
        }
    });
}

// === Scroll mit Pfeilen (horizontal) ===
function initArrowScroll() {
    const arrowLeft = document.querySelectorAll(".arrow_left");
    const arrowRight = document.querySelectorAll(".arrow_right");

    arrowLeft.forEach(arrow => {
        arrow.addEventListener("click", function () {
            const parentContent = arrow.closest('.arrows-wrapper')?.previousElementSibling;
            if (parentContent?.classList.contains('content')) {
                parentContent.scrollBy({ left: -300, behavior: 'smooth' });
            }
        });
    });

    arrowRight.forEach(arrow => {
        arrow.addEventListener("click", function () {
            const parentContent = arrow.closest('.arrows-wrapper')?.previousElementSibling;
            if (parentContent?.classList.contains('content')) {
                parentContent.scrollBy({ left: 300, behavior: 'smooth' });
            }
        });
    });
}

/*
// === Audio Player Setup ===
function initAudioPlayer() {
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

    player.innerHTML = \`
      <div style="font-size: \${isMobile ? "16px" : "18px"};"><i>"perfect sound to scroll the web"</i> by dj poolboi</div>
      <div style="width: 200px; height: 4px; background: rgba(255,255,255,0.2); margin: 6px 0;">
        <div id="progressBar" style="width: 0%; height: 100%; background: \${barColor};"></div>
      </div>
      <div id="playPauseBtn" style="cursor: pointer; margin-top: 4px; font-weight: bold; font-size: \${isMobile ? "15px" : "16px"};">
        \${lang === "de" ? "Play" : "Play"}
      </div>
      <div id="closePlayer" style="cursor: pointer; margin-top: 6px; text-decoration: underline; font-size: \${isMobile ? "16px" : "18px"};">
        \${lang === "de" ? "Player schließen" : "Close player"}
      </div>
    \`;

    document.body.appendChild(player);

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
    note.style.boxShadow = \`0 0 16px \${shadowColor}\`;
    note.style.color = textColor;
    note.style.userSelect = "none";
    document.body.appendChild(note);

    document.addEventListener("click", () => {
      if (!interactionOccurred) {
        interactionOccurred = true;
        audio.currentTime = lastTime;
        audio.play();
        soundEnabled = true;
        showPlayer();
      }
    });

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

    note.addEventListener("click", () => {
      audio.currentTime = lastTime;
      audio.play();
      soundEnabled = true;
      note.style.display = "none";
      showPlayer();
    });

    setInterval(() => {
      if (!audio.duration || isNaN(audio.duration)) return;
      const percent = (audio.currentTime / audio.duration) * 100;
      const progress = document.getElementById("progressBar");
      if (progress) progress.style.width = percent + "%";
    }, 500);

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
    }
}
*/
