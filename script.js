const messageButton = document.getElementById('messageButton');
const contactForm = document.getElementById('contactForm');

messageButton.addEventListener('click', function () {
    contactForm.classList.toggle('active');
    messageButton.classList.toggle('active');
});
type="text/javascript">
  emailjs.init('sGAgJH_6DUGxUUIxj'); // EmailJS Benutzer-ID

  document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    emailjs.sendForm('service_141csud', 'template_cn0ssgw', this)
      .then(function() {
        alert('Message sent successfully!');
      }, function(error) {
        alert('Failed to send message. Please try again.');
      });
  });