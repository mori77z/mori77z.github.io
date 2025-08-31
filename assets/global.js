document.addEventListener("DOMContentLoaded", function () {
    includeHeader();
    includeFooter();
    initZoomImages();
    initArrowScroll();
    initConfirmLinks();
    initDateTimePicker();
    initEmailButton();
    initHoverImage();
    initExpandToggles();
    initExpandSectionToggles();
});

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
            updateLastEditedDate(); // Assuming this function exists elsewhere
        })
        .catch(error => console.error("Fehler beim Laden des Footers:", error));
}

function initConfirmLinks() {
    // Corrected logic for iframe-container
    document.querySelectorAll(".iframe-container").forEach(container => {
        container.addEventListener("click", function (e) {
            const url = container.dataset.href;
            if (confirm("Open in new tab?")) {
                window.open(url, "_blank");
            }
        });
    });

    // The .confirm-link logic is already correct
    document.querySelectorAll('.confirm-link').forEach(link => {
        link.addEventListener('click', e => {
            if (!confirm("Email to Email@moritzgauss.com?")) {
                e.preventDefault();
            }
        });
    });
}

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

// === Neue Funktionen ===
function initDateTimePicker() {
    const dateInput = document.getElementById('date');
    const timeSelect = document.getElementById('time');
    if (dateInput) {
        function getNextValidDate() {
            let today = new Date();
            if (today.getHours() >= 16) today.setDate(today.getDate() + 1);
            while (today.getDay() === 0 || today.getDay() === 6) {
                today.setDate(today.getDate() + 1);
            }
            return today.toISOString().split("T")[0];
        }
        dateInput.setAttribute("min", getNextValidDate());
        dateInput.addEventListener('input', function () {
            if (!this.value) return;
            const selectedDate = new Date(this.value);
            const day = selectedDate.getDay();
            if (day === 0 || day === 6) {
                alert("Bitte wählen Sie einen Werktag (Montag - Freitag).");
                this.value = "";
                if (timeSelect) timeSelect.disabled = true;
            } else {
                if (timeSelect) timeSelect.disabled = false;
            }
        });
    }
    if (timeSelect) {
        timeSelect.innerHTML = "";
        for (let h = 10; h <= 16; h++) {
            for (let m = 0; m < 60; m += 15) {
                const timeStr = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
                timeSelect.appendChild(new Option(timeStr, timeStr));
            }
        }
    }
}

function initEmailButton() {
    const emailBtn = document.getElementById('whatsapp-btn');
    const dateInput = document.getElementById('date');
    const timeSelect = document.getElementById('time');
    if (!emailBtn) return;
    emailBtn.addEventListener('click', e => {
        e.preventDefault();
        if (!dateInput || !timeSelect) return;
        const selectedDate = dateInput.value;
        const selectedTime = timeSelect.value;
        if (!selectedDate || !selectedTime) {
            alert("Bitte wählen Sie Datum und Uhrzeit aus.");
            return;
        }
        const [y, mo, d] = selectedDate.split("-");
        const formattedDate = `${d}.${mo}.${y}`;
        const lang = navigator.language || navigator.userLanguage;
        const isGerman = lang.startsWith("de");
        const subject = isGerman ? "Anfrage für einen Call" : "Request for a first Call";
        const body = isGerman ? `Hey Moritz,\n\nIch würde gerne ein Gespräch vereinbaren am ${formattedDate} um ${selectedTime}.\n\nLiebe Grüße,\n[Ihr Name / Firma / E-Mail-Adresse]` : `Hey Moritz,\n\nI would like to schedule a call with you on ${formattedDate} at ${selectedTime}.\n\nBest regards,\n[Your Name / Company / Email Address]`;
        window.location.href = `mailto:email@moritzgauss.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
}

// === Hover-Bild ===
function initHoverImage() {
    const name = document.getElementById('hover-name');
    const image = document.getElementById('hover-image');
    if (!name || !image) return;
    let visible = false;

    function showImage() {
        image.style.opacity = 1;
        visible = true;
    }

    function hideImage() {
        image.style.opacity = 0;
        visible = false;
    }
    name.addEventListener('mouseenter', showImage);
    name.addEventListener('mouseleave', hideImage);
    name.addEventListener('click', e => {
        e.stopPropagation();
        showImage();
    });
    name.addEventListener('mousemove', e => {
        image.style.left = `${e.clientX + 20}px`;
        image.style.top = `${e.clientY + 20}px`;
    });
    document.addEventListener('click', e => {
        if (visible && !name.contains(e.target)) hideImage();
    });
    document.addEventListener('touchstart', e => {
        if (visible && !name.contains(e.target)) hideImage();
    });
}

function initExpandToggles() {
    document.querySelectorAll(".combined-container .expand-toggle").forEach(btn => {
        const container = btn.closest(".combined-container");
        const content = container?.querySelector(".content");
        const arrows = container?.querySelector(".arrows-wrapper");

        if (content) content.style.maxHeight = "0px";
        if (arrows) arrows.style.display = "none";

        btn.addEventListener("click", () => {
            if (!content) return;
            const isOpen = content.style.maxHeight && content.style.maxHeight !== "0px";
            if (!isOpen) {
                content.style.maxHeight = content.scrollHeight + "px";
                content.classList.add("active");
                btn.classList.add("expanded");
                if (arrows) arrows.style.display = "flex";
                content.querySelectorAll("[data-src]").forEach(el => {
                    el.src = el.dataset.src;
                    el.removeAttribute("data-src");
                });
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                content.offsetHeight;
                content.style.maxHeight = "0px";
                content.classList.remove("active");
                btn.classList.remove("expanded");
                if (arrows) arrows.style.display = "none";
            }
        });
    });
}

function initExpandSectionToggles() {
    document.querySelectorAll(".expand-section-toggle").forEach(toggleBtn => {
        const section = toggleBtn.nextElementSibling;
        if (!section || !section.classList.contains("expand-section")) return;

        toggleBtn.classList.remove("active");
        section.style.maxHeight = "0px";

        toggleBtn.addEventListener("click", () => {
            const isOpen = section.style.maxHeight && section.style.maxHeight !== "0px";
            if (!isOpen) {
                section.style.maxHeight = section.scrollHeight + "px";
                toggleBtn.classList.add("active");
            } else {
                section.style.maxHeight = section.scrollHeight + "px";
                section.offsetHeight;
                section.style.maxHeight = "0px";
                toggleBtn.classList.remove("active");
            }
        });
    });
}
