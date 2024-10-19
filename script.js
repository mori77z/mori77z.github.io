const messageButton = document.getElementById('messageButton');
const contactForm = document.getElementById('contactForm');

messageButton.addEventListener('click', function () {
    contactForm.classList.toggle('active');
    messageButton.classList.toggle('active');
});
