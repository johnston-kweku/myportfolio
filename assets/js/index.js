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
    scrollElements.forEach(el => observer.observe(el))
})