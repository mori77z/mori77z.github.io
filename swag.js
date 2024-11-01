// Bild-Zoom-Funktionalität

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

// Binärcode und entschlüsselter Text
const binaryText = "0101010001110101011101000111010001101111011000010111001001100101";
const decodedText = "binary for Tuttofare";  // Der Text, der bei Klick angezeigt wird

// Anzeigetafel für den Binärcode erstellen
const board = document.createElement("div");
board.classList.add("board");
document.body.appendChild(board);

// Funktion zum Umschalten der Klappenanimation für den Binärcode
function flipFlaps(text) {
    // Vorhandene Inhalte entfernen
    board.innerHTML = '';
    
    text.split("").forEach((char) => {
        const flap = document.createElement("div");
        flap.classList.add("flap");
        flap.dataset.char = char;
        flap.innerText = char; // Text auf dem Flap setzen
        board.appendChild(flap);
        
        // Animation hinzufügen
        setTimeout(() => {
            flap.classList.add("flip");
            setTimeout(() => flap.classList.remove("flip"), 300);
        }, 100); // Verzögerung für die Animation
    });
}

// Event Listener für das Zoom-Bild
zoomedImage.addEventListener("click", () => {
    flipFlaps(decodedText); // Hier den Text umschalten, wenn auf das Zoom-Bild geklickt wird
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