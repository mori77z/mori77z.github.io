document.addEventListener("DOMContentLoaded", function () {
    const moritzElement = document.querySelector(".moritz");
    if (!moritzElement) {
        console.error("Element '.moritz' not found!");
        return;
    }

    let isFlipping = false;

    function randomChar() {
        const symbols = "✪✹❦♬♪♩★❥✱♫♠♞♥";
        return symbols[Math.floor(Math.random() * symbols.length)];
    }

    function glitchText(element, originalText, duration = 300) {
        if (isFlipping) return;
        isFlipping = true;

        // Generate a string with exactly 10 random Unicode symbols
        let scrambledText = Array.from({ length: 7 }, () => randomChar()).join("");

        element.textContent = scrambledText; // Apply the 10-symbol glitch effect

        setTimeout(() => {
            element.textContent = originalText; // Restore original text after duration
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

    const images = document.querySelectorAll(".img-container img");
    if (images.length === 0) {
        console.warn("No images found for zoom functionality.");
        return;
    }

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

    images.forEach((img) => {
        img.addEventListener("click", () => {
            openZoomedImage(img.src);
        });
    });

    zoomedContainer.addEventListener("click", (e) => {
        if (e.target === zoomedContainer || e.target === zoomedImage) {
            closeZoomedImage();
        }
    });

    // === Arrow Scrolling Functionality ===
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
});