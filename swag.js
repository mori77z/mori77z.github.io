// Wähle die Bilder und erstelle den Zoom-Container
const images = document.querySelectorAll(".img-container img");
const zoomedContainer = document.createElement("div");
const zoomedImage = document.createElement("img");

zoomedContainer.classList.add("zoomed-container");
zoomedImage.classList.add("zoomed-image");
zoomedContainer.appendChild(zoomedImage);
document.body.appendChild(zoomedContainer);

// Funktion zum Öffnen des Zoom-Bildes
function openZoomedImage(src) {
    zoomedImage.src = src;
    zoomedImage.classList.add("active"); // Aktiv-Klasse für Animation hinzufügen
    zoomedContainer.classList.add("active");
}

// Funktion zum Schließen des Zoom-Bildes
function closeZoomedImage() {
    zoomedImage.classList.remove("active"); // Aktiv-Klasse entfernen
    zoomedContainer.classList.remove("active");
}

// Event Listener hinzufügen, um Bilder im Zoom anzuzeigen
images.forEach((img) => {
    img.addEventListener("click", () => {
        openZoomedImage(img.src);
    });
});

// Zoom-Bild schließen, wenn außerhalb des Bildes geklickt wird
zoomedContainer.addEventListener("click", (e) => {
    if (e.target === zoomedContainer || e.target === zoomedImage) {
        closeZoomedImage();
    }
});

// Scroll-Funktionalität für Pfeile

// Pfeile auswählen
const arrowLeft = document.querySelectorAll(".arrow_left");
const arrowRight = document.querySelectorAll(".arrow_right");

// Event Listener für linken Pfeil
arrowLeft.forEach(arrow => {
    arrow.addEventListener("click", function () {
        const scrollAmount = 300;
        const parentContent = arrow.closest('.arrows-wrapper').previousElementSibling;

        if (parentContent && parentContent.classList.contains('content')) {
            parentContent.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    });
});

// Event Listener für rechten Pfeil
arrowRight.forEach(arrow => {
    arrow.addEventListener("click", function () {
        const scrollAmount = 300;
        const parentContent = arrow.closest('.arrows-wrapper').previousElementSibling;

        if (parentContent && parentContent.classList.contains('content')) {
            parentContent.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    });
});