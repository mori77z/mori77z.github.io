document.addEventListener("DOMContentLoaded", function () {
    const arrows = document.querySelectorAll(".arrow");

    arrows.forEach(arrow => {
        arrow.addEventListener("click", function () {
            const isLeft = arrow.classList.contains('arrow_left');
            const isRight = arrow.classList.contains('arrow_right');
            const scrollAmount = 300;

            const parentContent = arrow.closest('.arrows-wrapper').previousElementSibling;

            if (parentContent && parentContent.classList.contains('content')) {
                if (isLeft) {
                    parentContent.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                } else if (isRight) {
                    parentContent.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            }
        });
    });
});