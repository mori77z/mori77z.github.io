document.addEventListener("DOMContentLoaded", function () {
    includeHeader();
    includeFooter();
    initZoomImages();
    initArrowScroll();
    initConfirmLinks();
    initNavScrollHide();
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

function initNavScrollHide() {
  const nav = document.querySelector('nav'); // wählt das <nav> Element ohne Klassen

  if (!nav) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (window.innerWidth >= 768) {  // Desktop only
      if (currentScroll > lastScroll && currentScroll > 100) {
        nav.classList.add('shrink');
      } else {
        nav.classList.remove('shrink');
      }
    } else {
      nav.classList.remove('shrink'); // Mobile immer sichtbar
    }

    lastScroll = currentScroll <= 0 ? 0 : currentScroll;
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
