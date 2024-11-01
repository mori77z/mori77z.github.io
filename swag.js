// Select images and create a zoom container
const images = document.querySelectorAll(".img-container img");
const zoomedContainer = document.createElement("div");
const zoomedImage = document.createElement("img");

zoomedContainer.classList.add("zoomed-container");
zoomedImage.classList.add("zoomed-image");
zoomedContainer.appendChild(zoomedImage);
document.body.appendChild(zoomedContainer);

// Function to open zoomed image
function openZoomedImage(src) {
    zoomedImage.src = src;
    zoomedImage.classList.add("active"); // Hinzufügen der aktiven Klasse für Animation
    zoomedContainer.classList.add("active");
}

// Function to close zoomed image
function closeZoomedImage() {
    zoomedImage.classList.remove("active"); // Entfernen der aktiven Klasse
    zoomedContainer.classList.remove("active");
}

// Add event listeners to images to open in zoom
images.forEach((img) => {
    img.addEventListener("click", () => {
        openZoomedImage(img.src);
    });
});

// Close zoomed image when clicking outside the image
zoomedContainer.addEventListener("click", (e) => {
    if (e.target === zoomedContainer || e.target === zoomedImage) {
        closeZoomedImage();
    }
});

// Arrow scroll functionality for left/right arrows outside the carousel
const arrowLeft = document.querySelectorAll(".arrow_left");
const arrowRight = document.querySelectorAll(".arrow_right");

arrowLeft.forEach(arrow => {
    arrow.addEventListener("click", function () {
        const scrollAmount = 300;
        const parentContent = arrow.closest('.arrows-wrapper').previousElementSibling;

        if (parentContent && parentContent.classList.contains('content')) {
            parentContent.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    });
});

arrowRight.forEach(arrow => {
    arrow.addEventListener("click", function () {
        const scrollAmount = 300;
        const parentContent = arrow.closest('.arrows-wrapper').previousElementSibling;

        if (parentContent && parentContent.classList.contains('content')) {
            parentContent.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    });
});
// JavaScript für die Animationslogik
const binaryString = "01010101 01101110 01100101 01101100 01101100 01100001 01101101";
const explanationText = "Binary for Tuttofare (ital. Jack of all Trades)";

const board = document.getElementById("board");
const explanation = document.getElementById("explanationText");

// Funktion zum Erstellen der Flaps mit Binärzeichen
function createFlaps(text) {
    if (!board) return; // Sicherstellen, dass das Board existiert
    board.innerHTML = ""; // Das Board leeren
    text.split("").forEach(char => {
        const flap = document.createElement("span");
        flap.classList.add("flap");
        flap.setAttribute("data-char", char);
        flap.textContent = ""; // Zunächst keinen Text für die Animation
        board.appendChild(flap);
    });
}

// Funktion zum Starten der Flip-Animation
function startFlipAnimation() {
    if (!board || !explanation) return; // Sicherstellen, dass die Elemente existieren
    createFlaps(binaryString);

    [...board.children].forEach((flap, index) => {
        setTimeout(() => {
            flap.classList.add("flip"); // Flip-Klasse hinzufügen
            setTimeout(() => {
                // Zeige das Zeichen nach der Flip-Animation an
                flap.textContent = flap.getAttribute("data-char");
                // Erklärungstext nach allen Flips anzeigen
                if (index === board.children.length - 1) {
                    board.style.display = "none"; // Board ausblenden
                    explanation.style.display = "block"; // Erklärungstext anzeigen

                    // Nach 6 Sekunden zurücksetzen
                    setTimeout(() => {
                        explanation.style.display = "none"; // Erklärung ausblenden
                        board.style.display = "flex"; // Board wieder anzeigen
                        createFlaps(binaryString); // Flaps erneut erstellen
                    }, 6000);
                }
            }, 100); // Verzögerung für die Anzeige des Textes
        }, index * 60); // Timing für jedes Flap steuern
    });
}

// Restart animation on scrolling down from top
let isScrolling = false; // Debounce scrolling to prevent repeated calls

window.addEventListener("scroll", () => {
    if (!isScrolling && window.scrollY === 0) {
        isScrolling = true;
        startFlipAnimation();
        setTimeout(() => { isScrolling = false; }, 500); // Verzögerung erlauben, bevor erneut ausgelöst wird
    }
});

// Initial load animation
startFlipAnimation();
