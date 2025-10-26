// Create floating particles
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    const particleCount = 100;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Handle main contact form submission
function handleSubmit(event) {
    event.preventDefault();
    const button = event.target.querySelector('.submit-button');
    const originalText = button.textContent;
    button.textContent = 'SENDING...';
    button.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
    setTimeout(() => {
        button.textContent = 'MESSAGE SENT!';
        setTimeout(() => {
            button.textContent = originalText;
            // --- UPDATED to new brand colors ---
            button.style.background = 'linear-gradient(135deg, #F26522, #FDB913)';
            event.target.reset();
        }, 2000);
    }, 1500);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Initialize particles when page loads
window.addEventListener('load', createParticles);

// Add scroll effect to navigation
window.addEventListener('scroll', () => {
    const navContent = document.querySelector('.nav-content');
    if (window.scrollY > 50) {
        navContent.style.background = 'rgba(255, 255, 255, 0.1)';
        // --- UPDATED to new brand colors ---
        navContent.style.boxShadow = '0 8px 32px 0 rgba(11, 153, 214, 0.25)';
    } else {
        navContent.style.background = 'rgba(255, 255, 255, 0.08)';
        // --- UPDATED to new brand colors ---
        navContent.style.boxShadow = '0 8px 32px 0 rgba(0, 80, 140, 0.1)';
    }
});

// Modal JavaScript
const getInTouchBtn = document.getElementById('getInTouchBtn');
const scheduleModal = document.getElementById('scheduleModal');
const closeModalBtn = document.getElementById('closeModalBtn');

const openModal = () => scheduleModal.classList.add('show');
const closeModal = () => scheduleModal.classList.remove('show');

getInTouchBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
scheduleModal.addEventListener('click', (event) => {
    if (event.target === scheduleModal) closeModal();
});

// Handle modal form submission
function handleModalSubmit(event) {
    event.preventDefault();
    const button = event.target.querySelector('.submit-button');
    const originalText = button.textContent;
    button.textContent = 'SCHEDULING...';
    button.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
    setTimeout(() => {
        button.textContent = 'SCHEDULED!';
        setTimeout(() => {
            closeModal();
            setTimeout(() => {
                button.textContent = originalText;
                // --- UPDATED to new brand colors ---
                button.style.background = 'linear-gradient(135deg, #F26522, #FDB913)';
                event.target.reset();
            }, 400); // Delay reset to allow modal to close
        }, 1500);
    }, 1500);
}

// --- ✨ NEW: Animation on Scroll ---
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, {
    threshold: 0.5
});

document.querySelectorAll('.section-title').forEach(title => {
    revealObserver.observe(title);
});

// --- ✨ NEW: Interactive Cursor Logic ---
const cursor = document.querySelector('.cursor');
// === UPDATED THIS LINE ===
const interactiveElements = document.querySelectorAll('a, button, .service-card, .portfolio-slide');

window.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-grow');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-grow');
    });
});

// --- ✨ UPDATED: Interactive Particle Canvas Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('interactiveCanvas');
    if (!canvas) return;
    
    const interactiveContainer = document.querySelector('.interactive-particles-container');
    const interactiveBox = document.querySelector('.interactive-box');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = interactiveContainer.offsetHeight;

    let particlesArray = [];
    const numberOfParticles = 4000;

    // --- NEW: Particle color palette from logo ---
    const particleColors = [
        'rgba(242, 101, 34, 0.5)',   // Orange
        'rgba(11, 153, 214, 0.5)',   // Mid Blue
        'rgba(253, 185, 19, 0.5)',   // Yellow
        'rgba(124, 62, 139, 0.5)'   // Purple
    ];

    const mouse = { x: null, y: null, radius: 100 };

    window.addEventListener('mousemove', function(event){
        mouse.x = event.x;
        mouse.y = event.y - canvas.getBoundingClientRect().top;
    });

    interactiveContainer.addEventListener('mousemove', function(e) {
        let rect = interactiveContainer.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        let centerX = rect.width / 2;
        let centerY = rect.height / 2;
        let rotateX = (y - centerY) / centerY * -15;
        let rotateY = (x - centerX) / centerX * 15;
        
        interactiveBox.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    interactiveContainer.addEventListener('mouseleave', function() {
        interactiveBox.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });

    class Particle {
        constructor(x, y, size, color){
            this.x = x;
            this.y = y;
            this.size = size;
            this.color = color;
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = (Math.random() * 40) + 5;
        }
        draw(){
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
        update(){
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let maxDistance = mouse.radius;
            let force = (maxDistance - distance) / maxDistance;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;

            if (distance < mouse.radius){
                this.x -= directionX * 0.5;
                this.y -= directionY * 0.5;
            } else {
                if (this.x !== this.baseX){
                    let dx = this.x - this.baseX;
                    this.x -= dx / 20;
                }
                if (this.y !== this.baseY){
                    let dy = this.y - this.baseY;
                    this.y -= dy / 20;
                }
            }
        }
    }

    // --- MODIFIED: This function now uses the brand color palette ---
    function init(){
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++){
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height; // Spread across the full height
            // --- UPDATED: Select a random color from your brand palette ---
            let color = particleColors[Math.floor(Math.random() * particleColors.length)];
            particlesArray.push(new Particle(x, y, 2, color));
        }
    }

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++){
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animate);
    } 

    init();
    animate();

    let canBounce = true;
    window.addEventListener('scroll', () => {
        let rect = interactiveContainer.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0 && canBounce) {
            canBounce = false;
            for (let i = 0; i < 200; i++) {
                let p = particlesArray[Math.floor(Math.random() * particlesArray.length)];
                p.x += (Math.random() - 0.5) * 50;
                p.y += (Math.random() - 0.5) * 50;
            }
            setTimeout(() => { canBounce = true; }, 100);
        }
    });

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = interactiveContainer.offsetHeight;
        init();
    });
});


// --- ✨ NEW: Sticky Scroll Portfolio Animation ---
// MAKE SURE THIS IS AT THE BOTTOM OF YOUR FILE
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.portfolio-slide');
    const triggers = document.querySelectorAll('.scroll-trigger');

    if (!slides.length || !triggers.length) return; // Don't run if elements aren't found

    let currentSlide = null;

    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.6 // Trigger when 60% of the element is visible
    };

    const slideObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const triggerName = entry.target.dataset.triggerFor;
                const slideToShow = document.querySelector(`.portfolio-slide[data-slide-for="${triggerName}"]`);

                if (slideToShow && currentSlide !== slideToShow) {
                    
                    // Remove 'is-active' from the previous slide
                    if (currentSlide) {
                        currentSlide.classList.remove('is-active');
                    }

                    // Add 'is-active' to the new slide
                    slideToShow.classList.add('is-active');
                    currentSlide = slideToShow;
                }
            }
        });
    }, observerOptions);

    // Tell the observer to watch each trigger element
    triggers.forEach(trigger => {
        slideObserver.observe(trigger);
    });
});