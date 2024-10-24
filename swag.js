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

// Event listener for resizing text if there's overflow
const resizeText = () => {
    const infoElements = document.querySelectorAll('.info');
    infoElements.forEach(info => {
        const originalFontSize = 12;
        const currentFontSize = parseInt(window.getComputedStyle(info).fontSize);
        if (info.scrollHeight > info.clientHeight || info.scrollWidth > info.clientWidth) {
            info.style.fontSize = `${currentFontSize - 1}px`;
        } else {
            info.style.fontSize = `${originalFontSize}px`;
        }
    });
};

window.onload = resizeText; 
window.onresize = resizeText;
