document.addEventListener("DOMContentLoaded", () => {
    // Image zoom functionality
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
        zoomedImage.classList.add("active"); // Add active class for animation
        zoomedContainer.classList.add("active");
    }

    // Function to close zoomed image
    function closeZoomedImage() {
        zoomedImage.classList.remove("active"); // Remove active class
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

    // Translation functionality
    const translationButton = document.querySelector("#translation-button"); // Button ID for translation
    const textElement = document.querySelector("#text-content"); // Text element to translate

    function toggleLanguage() {
        if (translationButton.innerText.trim() === "Deutsch") {
            textElement.innerHTML = `
                👁️‍🗨️Ich bin Moritz, ich gestalte Websites 💻, die herausstechen — benutzerfreundlich, einzigartig und voll responsiv📲. 
                Ich habe mit Kund*innen aus der Modebranche 👜, der Musikindustrie🎙️ und freischaffenden Künstler*innen aus verschiedenen Bereichen 📸 gearbeitet. 
                Ich erstelle authentische Seiten📑, die dich wirklich repräsentieren. Bereit, deine Online-Präsenz🤳 neu zu denken? 
                Lass uns was <span class="bold-h5">Großes</span> machen.
            `;
            translationButton.innerText = "English";
        } else {
            textElement.innerHTML = `
                👁️‍🗨️I’m Moritz, I design websites💻 that stand out — user-friendly, unique, and fully responsive📲. 
                I worked with clients from the fashion 👜, music🎙️ industry, and artists from various fields 📸. 
                I build authentic pages📑 that truly represent you. Ready to rethink your online presence🤳? 
                Let’s make it <span class="bold-h3">bold</span>.
            `;
            translationButton.innerText = "Deutsch";
        }
    }

    // Add event listener to the translation button
    translationButton.addEventListener("click", toggleLanguage);
});
