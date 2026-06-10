const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-12');
            entry.target.classList.add('opacity-100', 'translate-y-0');

            observer.unobserve(entry.target)
        }
    });
}, {
    threshold: 0.1

});


document.addEventListener('DOMContentLoaded', function() {
    const scrollElements = document.querySelectorAll('.animate-reveal');
    scrollElements.forEach(el => observer.observe(el));

    // Mobile Menu Toggle Logic
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
        });

        // Close menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
            });
        });
    }

    // Contact Form Logic
    const contactForm = document.querySelector('form[name="contact"]');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            
            fetch('/', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            })
            .then(() => {
                formMessage.textContent = 'Message sent successfully! I will get back to you soon.';
                formMessage.classList.remove('hidden', 'bg-red-100', 'text-red-700');
                formMessage.classList.add('bg-green-100', 'text-green-700');
                contactForm.reset();
            })
            .catch((error) => {
                formMessage.textContent = 'Oops! Something went wrong. Please try again.';
                formMessage.classList.remove('hidden', 'bg-green-100', 'text-green-700');
                formMessage.classList.add('bg-red-100', 'text-red-700');
            });
        });
    }
});