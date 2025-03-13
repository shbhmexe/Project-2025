// Project data
const projects = [
    { title: "Design Project", category: "UI/UX Design" },
    { title: "Tech Innovation", category: "Development" },
    { title: "Creative Concept", category: "Branding" },
    { title: "Digital Experience", category: "Interactive" }
];

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const svgContainer = document.querySelector('#svg-text-container');
    const content = document.querySelector('.content');
    const animatedText = document.querySelector('#animated-text');
    
    // Set initial states
    gsap.set(content, { opacity: 0 });
    gsap.set('.hero-text h1', { opacity: 0, y: 50 });
    gsap.set('.bg-image', { opacity: 0, scale: 1.1 });
    gsap.set(animatedText, { 
        strokeDasharray: 2000,
        strokeDashoffset: 2000,
        fill: 'transparent'
    });
    
    // Create initial animation timeline
    const initialAnimation = gsap.timeline();
    
    // Animate the SVG text
    initialAnimation
        .to(animatedText, { 
            duration: 1.5,
            strokeDashoffset: 0,
            ease: 'power2.inOut'
        })
        .to(animatedText, { 
            duration: 0.8,
            fill: 'white',
            ease: 'power1.inOut'
        })
        .to(svgContainer, { 
            duration: 0.5,
            opacity: 0,
            onComplete: () => {
                svgContainer.style.display = 'none';
                // Show content after initial animation
                gsap.to(content, { 
                    duration: 0.5,
                    opacity: 1,
                    onComplete: () => {
                        // Initialize main animations after content is visible
                        initAnimations();
                        initHoverEffects();
                        initNavigation();
                    }
                });
            }
        });
});

// Initialize animations
function initAnimations() {
    // Create a master timeline
    const masterTimeline = gsap.timeline();
    
    // Text reveal timeline
    const textTimeline = gsap.timeline();
    textTimeline.to('.hero-text h1', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.1
    });
    
    // Background images reveal
    const imagesTimeline = gsap.timeline();
    imagesTimeline.to('.bg-image', {
        opacity: 0.7,
        scale: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: "power2.out"
    });
    
    // Add timelines to master timeline
    masterTimeline
        .add(imagesTimeline, 0)
        .add(textTimeline, 0.5);
}

// Initialize hover effects for background images
function initHoverEffects() {
    const bgImages = document.querySelectorAll('.bg-image');
    const heroText = document.querySelector('.hero-text h1');
    
    // Store initial positions for reset
    const initialPositions = [];
    
    bgImages.forEach((image, index) => {
        // Store initial position
        initialPositions[index] = { x: 0, y: 0 };
        
        // Add project info element to each image
        const projectInfo = document.createElement('div');
        projectInfo.className = 'project-info';
        projectInfo.innerHTML = `
            <div class="project-title">${projects[index].title}</div>
            <div class="project-category">${projects[index].category}</div>
        `;
        image.appendChild(projectInfo);
        
        // Mouse move effect within the image
        image.addEventListener('mousemove', (e) => {
            // Calculate mouse position relative to the image
            const rect = image.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
            const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
            
            // Move image in direction of cursor
            gsap.to(image, {
                x: x * 30, // Adjust the multiplier to control movement amount
                y: y * 30,
                duration: 0.5,
                ease: 'power2.out'
            });
            
            // Show project info
            gsap.to(projectInfo, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        // Add hover effects
        image.addEventListener('mouseenter', () => {
            // Reduce opacity of other images and text
            bgImages.forEach((otherImage, otherIndex) => {
                if (otherIndex !== index) {
                    gsap.to(otherImage, {
                        opacity: 0.3,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });
            
            // Reduce text opacity and add zoom effect
            gsap.to(heroText, {
                opacity: 0.5,
                scale: 0.98,
                duration: 0.3,
                ease: "power2.out"
            });
            
            // Increase current image opacity and remove grayscale
            gsap.to(image, {
                opacity: 1,
                filter: 'grayscale(0%)',
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        // Reset on mouse leave
        image.addEventListener('mouseleave', () => {
            // Reset image position
            gsap.to(image, {
                x: 0,
                y: 0,
                opacity: 0.7,
                filter: 'grayscale(30%)',
                scale: 1,
                duration: 0.5,
                ease: "power2.inOut"
            });
            
            // Reset other images
            bgImages.forEach((otherImage) => {
                gsap.to(otherImage, {
                    opacity: 0.7,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });
            
            // Reset text opacity and scale
            gsap.to(heroText, {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: "power2.out"
            });
            
            // Hide project info
            gsap.to(projectInfo, {
                opacity: 0,
                y: 20,
                duration: 0.3,
                ease: "power2.in"
            });
        });
    });
    
    // Add smooth movement to background when hovering the entire hero container
    const heroContainer = document.querySelector('.hero-container');
    const heroBg = document.querySelector('.hero-background');
    
    heroContainer.addEventListener('mousemove', (e) => {
        // Only apply this effect when not hovering on a specific image
        if (!document.querySelector('.bg-image:hover')) {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            
            gsap.to(heroBg, {
                x: x,
                y: y,
                duration: 1,
                ease: 'power2.out'
            });
        }
    });
    
    heroContainer.addEventListener('mouseleave', () => {
        gsap.to(heroBg, {
            x: 0,
            y: 0,
            duration: 1,
            ease: 'power2.inOut'
        });
    });
}

// Initialize navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                color: '#ffffff',
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                color: 'rgba(255, 255, 255, 0.7)',
                duration: 0.3,
                ease: "power2.in"
            });
        });
    });
} 