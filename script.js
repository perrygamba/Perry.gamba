// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll background and padding transition
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add animation classes and observe elements
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to section headers
    document.querySelectorAll('.section-header').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Add slide-in animations to timeline items
    document.querySelectorAll('.timeline-item').forEach((el, index) => {
        if (index % 2 === 0) {
            el.classList.add('slide-in-left');
        } else {
            el.classList.add('slide-in-right');
        }
        observer.observe(el);
    });

    // Add fade-in animation to cards
    document.querySelectorAll('.education-card, .research-card, .contact-item').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Add fade-in animation to about content
    document.querySelector('.about-content')?.classList.add('fade-in');
    observer.observe(document.querySelector('.about-content'));

    // Add fade-in animation to skills grid
    document.querySelector('.skills-grid')?.classList.add('fade-in');
    observer.observe(document.querySelector('.skills-grid'));
});

// Add hover effects to cards
document.addEventListener('DOMContentLoaded', () => {
    // Education cards hover effect
    document.querySelectorAll('.education-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Research cards hover effect
    document.querySelectorAll('.research-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ── Unified Tab Switcher Handler ──────────────────────────
function setupTabs(tabContainerSelector, btnSelector, paneSelector) {
    const containers = document.querySelectorAll(tabContainerSelector);
    containers.forEach(container => {
        const btns = container.querySelectorAll(btnSelector);
        const parentSection = container.closest('section');
        if (!parentSection) return;
        const panes = parentSection.querySelectorAll(paneSelector);

        // Hide non-active panes initially
        panes.forEach(pane => {
            if (!pane.classList.contains('active')) {
                pane.style.display = 'none';
            } else {
                pane.style.display = 'block';
                pane.style.opacity = '1';
                pane.style.transform = 'translateY(0)';
            }
        });

        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.dataset.tab;

                // Update buttons active state
                btns.forEach(b => b.classList.toggle('active', b === btn));

                // Switch pane states with smooth animations
                panes.forEach(pane => {
                    if (pane.id === targetId) {
                        pane.style.display = 'block';
                        pane.style.opacity = '0';
                        pane.style.transform = 'translateY(15px)';
                        pane.classList.add('active');
                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                pane.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                                pane.style.opacity = '1';
                                pane.style.transform = 'translateY(0)';
                            });
                        });

                        // Dynamically load Credly widget script if transitioning to the credly-badges tab
                        if (targetId === 'credly-badges') {
                            loadCredlyEmbeds();
                        }
                    } else {
                        pane.classList.remove('active');
                        pane.style.transition = 'none';
                        pane.style.display = 'none';
                    }
                });
            });
        });
    });
}

// Dynamic Credly Badge Embed Loader
function loadCredlyEmbeds() {
    const container = document.getElementById('credly-badges-container');
    if (!container || container.dataset.loaded === 'true') return;

    // Mark as loaded to prevent duplicate insertion
    container.dataset.loaded = 'true';

    // List of badge IDs from the user's verified list
    const badgeIds = [
        '7785c1aa-7a5a-4d22-8b78-0c8151384ef6', // Agile Metrics for Success
        '8585bd92-64d7-4f7b-817a-4c539f059ee7', // Data Landscape of GenAI for Project Managers
        '4ab1824e-e1b6-4616-b6dc-28e1cbc8b81f', // Generative AI Overview for Project Managers
        'f10c2311-2141-4806-8278-e5bf1b66c77a', // Introduction to Cognitive Project Management in AI (CPMAI)™
        'd283d9fb-b2ce-4c9b-9cca-55cf20cb9772', // PMI Citizen Developer™ Practitioner Skills
        'e679bb79-635c-457b-b4b4-b4508c48eb92', // PMI® Essentials: Seven AI Project Patterns
        '2e95f929-1b76-4bfd-8945-51434c9a7168', // Practical Application of Gen AI for Project Managers
        '24941b6f-34c8-475a-8c75-5030cdcf263e'  // Talking to AI: Prompt Engineering for Project Managers
    ];

    // Generate wrappers dynamically
    badgeIds.forEach(id => {
        const wrapper = document.createElement('div');
        wrapper.className = 'credly-embed-wrapper';
        
        const badgeDiv = document.createElement('div');
        badgeDiv.setAttribute('data-iframe-width', '150');
        badgeDiv.setAttribute('data-iframe-height', '270');
        badgeDiv.setAttribute('data-share-badge-id', id);
        badgeDiv.setAttribute('data-share-badge-host', 'https://www.credly.com');
        
        // Add a fallback link in case the script is blocked
        const fallbackLink = document.createElement('a');
        fallbackLink.href = `https://www.credly.com/badges/${id}`;
        fallbackLink.target = '_blank';
        fallbackLink.rel = 'noopener noreferrer';
        fallbackLink.className = 'credly-fallback-link';
        
        const fallbackIcon = document.createElement('i');
        fallbackIcon.className = 'fas fa-award';
        
        const fallbackText = document.createElement('span');
        fallbackText.className = 'credly-fallback-text';
        fallbackText.textContent = 'Verify Credentials';
        
        fallbackLink.appendChild(fallbackIcon);
        fallbackLink.appendChild(fallbackText);
        badgeDiv.appendChild(fallbackLink);
        wrapper.appendChild(badgeDiv);
        container.appendChild(wrapper);
    });

    // Load the Credly script dynamically
    const script = document.createElement('script');
    script.id = 'credly-embed-script';
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://cdn.credly.com/assets/utilities/embed.js';
    document.body.appendChild(script);
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize tabbed components
    setupTabs('.credentials-tabs-container', '.tab-btn', '.tab-pane');
    setupTabs('.experience-tabs-container', '.tab-btn', '.tab-pane');
    setupTabs('.research-tabs-container', '.tab-btn', '.tab-pane');

    // Trigger load if credly-badges is the active tab initially
    if (document.querySelector('.tab-pane.active#credly-badges')) {
        loadCredlyEmbeds();
    }
});

// ── Active nav link styles ────────────────────────────────
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #1e3a8a !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add loading styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyle);
