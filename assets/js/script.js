/**
 * Función Debounce
 * Limita la frecuencia de ejecución de una función.
 * @param {function} func - La función a ejecutar.
 * @param {number} delay - El tiempo de espera en milisegundos.
 * @returns {function} - La nueva función "debounced".
 */
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Inicialización de la galería
    if (typeof initGallery === 'function') {
        initGallery();
    }
    
    // Mobile menu toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !navMenu.contains(e.target)) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow on scroll
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        // Hide/show header on scroll
        if (currentScroll > lastScrollTop && currentScroll > 200) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe animated elements
    const animatedElements = document.querySelectorAll('.feature-card, .service-card, .testimonial-card, .value-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current section nav link
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    });

    // WhatsApp button hover effect
    const whatsappButtons = document.querySelectorAll('[href*="wa.me"]');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Testimonials Carousel
    const testimonialsContainer = document.querySelector('.testimonials-container');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    let currentSlide = 0;
    let autoSlideInterval;
    let isTransitioning = false;
    
    // Create dots for navigation
    function createDots() {
        if (!dotsContainer) return;
        
        testimonialCards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                if (!isTransitioning) goToSlide(index);
            });
            dotsContainer.appendChild(dot);
        });
    }
    
    // Update dots
    function updateDots() {
        const dots = document.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        if (!testimonialsContainer || isTransitioning || slideIndex === currentSlide) return;
        
        isTransitioning = true;
        currentSlide = slideIndex;
        
        // Use pixel-based translation for mobile devices to ensure precise positioning
        const isMobile = window.innerWidth <= 480;
        let translateX;
        
        if (isMobile) {
            const cardWidth = window.innerWidth;
            translateX = -currentSlide * cardWidth;
            testimonialsContainer.style.transform = `translateX(${translateX}px)`;
        } else {
            translateX = -currentSlide * 100;
            testimonialsContainer.style.transform = `translateX(${translateX}%)`;
        }
        
        updateDots();
        
        // Reset transition flag after animation completes
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }
    
    // Next slide
    function nextSlide() {
        if (isTransitioning) return;
        const nextIndex = (currentSlide + 1) % testimonialCards.length;
        goToSlide(nextIndex);
    }
    
    // Previous slide
    function prevSlide() {
        if (isTransitioning) return;
        const prevIndex = currentSlide === 0 ? testimonialCards.length - 1 : currentSlide - 1;
        goToSlide(prevIndex);
    }
    
    // Auto slide
    function startAutoSlide() {
        if (autoSlideInterval) clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }
    
    // Initialize carousel
    if (testimonialsContainer && testimonialCards.length > 0) {
        createDots();
        
        // Event listeners for buttons
        if (nextBtn) nextBtn.addEventListener('click', () => {
            if (isTransitioning) return;
            stopAutoSlide();
            nextSlide();
            setTimeout(startAutoSlide, 7000);
        });
        
        if (prevBtn) prevBtn.addEventListener('click', () => {
            if (isTransitioning) return;
            stopAutoSlide();
            prevSlide();
            setTimeout(startAutoSlide, 7000);
        });
        
        // Pause on hover
        testimonialsContainer.addEventListener('mouseenter', stopAutoSlide);
        testimonialsContainer.addEventListener('mouseleave', startAutoSlide);
        
        // Handle window resize to recalculate position
        window.addEventListener('resize', () => {
            if (!isTransitioning) {
                goToSlide(currentSlide);
            }
        });
        
        // Start auto slide after page load
        setTimeout(startAutoSlide, 3000);
    }

    // Form validation for future contact forms
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        const re = /^[\+]?[1-9][\d]{0,15}$/;
        return re.test(phone.replace(/\s/g, ''));
    }

    // Utility function to format phone numbers
    function formatPhone(phone) {
        return phone.replace(/(\d{2})(\d{4})(\d{4})/, '+56 $1 $2 $3');
    }

    // Loading animation
    window.addEventListener('load', function() {
        const loadingElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description');
        
        loadingElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    });

    // Service card interactions
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Feature card interactions
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'rotate(360deg) scale(1.1)';
                icon.style.transition = 'transform 0.5s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'rotate(0deg) scale(1)';
            }
        });
    });

    // Value card interactions
    const valueCards = document.querySelectorAll('.value-card');
    
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.value-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.value-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });

    // Social media link tracking (for analytics)
    const socialLinks = document.querySelectorAll('.social-links a, [href*="instagram.com"], [href*="wa.me"]');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.href.includes('instagram') ? 'Instagram' : 
                           this.href.includes('wa.me') ? 'WhatsApp' : 'Social';
            
            // Here you can add analytics tracking
            console.log(`User clicked ${platform} link`);
            
            // Add a small animation feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Scroll to top functionality (if needed)
    function createScrollToTop() {
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollToTopBtn.className = 'scroll-to-top';
        scrollToTopBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #2563eb, #ea580c);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            font-size: 18px;
        `;
        
        document.body.appendChild(scrollToTopBtn);
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.visibility = 'visible';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.visibility = 'hidden';
            }
        });
        
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Initialize scroll to top after delay
    setTimeout(createScrollToTop, 1000);

    // Performance optimization: Smooth image loading
    const images = document.querySelectorAll('img[src]');
    
    images.forEach(img => {
        // Si la imagen ya está cargada, no hacer nada
        if (img.complete && img.naturalHeight !== 0) {
            img.style.opacity = '1';
            return;
        }
        
        // Para imágenes que aún no han cargado
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        img.onload = function() {
            this.style.opacity = '1';
        };
        
        // Si la imagen falla al cargar, mostrarla con opacidad reducida
        img.onerror = function() {
            this.style.opacity = '0.5';
            console.log('Image failed to load:', this.src);
        };
    });



    // Inicializar galería
    initGallery();

    console.log('EP ConstruVisión website loaded successfully!');
});

/**
 * Inicialización de la galería interactiva
 * Maneja el carrusel, modal y todas las interacciones
 */
function initGallery() {
    // CONFIGURACIÓN PRINCIPAL
    const TOTAL_IMAGES = 106; // Número total de imágenes en la carpeta galeria
    const AUTO_ADVANCE_INTERVAL = 4000; // Tiempo para avance automático (4 segundos)
    
    // Elementos DOM principales
    const galleryContainer = document.querySelector('.gallery-container');
    const modal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('modalImage');
    const closeModal = document.querySelector('.modal-close');
    const prevModalBtn = document.querySelector('.modal-prev');
    const nextModalBtn = document.querySelector('.modal-next');
    const prevCarouselBtn = document.querySelector('.gallery-prev');
    const nextCarouselBtn = document.querySelector('.gallery-next');
    const indicators = document.querySelector('.gallery-indicators');
    
    // Verificar que los elementos principales existan
    if (!galleryContainer || !indicators) {
        console.log('Gallery elements not found, skipping gallery initialization');
        return;
    }
    
    // Variables de estado
    let currentCarouselIndex = 0; // Índice actual del carrusel
    let currentModalIndex = 0; // Índice actual del modal
    let imagesPerView = getImagesPerView(); // Imágenes por vista según pantalla
    let totalSlides = Math.ceil(TOTAL_IMAGES / imagesPerView); // Total de slides
    let autoAdvanceTimer = null; // Timer para avance automático
    let isUserInteracting = false; // Flag para pausar auto-avance
    
    /**
     * Determina cuántas imágenes mostrar según el tamaño de pantalla
     * @returns {number} Número de imágenes por vista
     */
    function getImagesPerView() {
        const width = window.innerWidth;
        if (width >= 768) {
            return 4; // PC/Desktop - mostrar 4 imágenes
        } else {
            return 2; // Mobile - mostrar 2 imágenes
        }
    }

    /**
     * Genera dinámicamente las imágenes para el slide actual
     * Crea elementos DOM y asigna eventos de click
     */
    function generateGalleryImages() {
        if (!galleryContainer) {
            console.log('Gallery container not found');
            return;
        }
        
        console.log('Generating gallery images for slide', currentCarouselIndex);
        console.log('Container found:', galleryContainer);
        
        galleryContainer.innerHTML = ''; // Limpia contenedor
        
        // Calcula qué imágenes mostrar en el slide actual
        const startIndex = currentCarouselIndex * imagesPerView;
        const endIndex = Math.min(startIndex + imagesPerView, TOTAL_IMAGES);
        
        console.log('Showing images from index', startIndex, 'to', endIndex);
        
        // Crea elementos para cada imagen
        for (let i = startIndex; i < endIndex; i++) {
            const imageNumber = i + 1;
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <img src="./assets/img/galeria/${imageNumber}.jpg" alt="Proyecto ${imageNumber}" loading="lazy">
                <div class="gallery-overlay">
                    <i class="fas fa-search-plus"></i>
                </div>
            `;
            
            // Asigna evento click para abrir modal
            galleryItem.addEventListener('click', () => {
                openModal(i);
            });
            
            galleryContainer.appendChild(galleryItem);
        }
    }
    
    /**
     * Genera los indicadores del carrusel
     * Crea puntos que muestran la posición actual
     */
    function generateIndicators() {
        if (!indicators) return;
        
        indicators.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('span');
            indicator.className = 'gallery-indicator';
            if (i === 0) indicator.classList.add('active');
            indicators.appendChild(indicator);
        }
        // Asigna eventos después de crear indicadores
        attachIndicatorListeners();
    }

    /**
     * Actualiza la vista del carrusel
     * Regenera imágenes y actualiza indicadores
     */
    function updateCarousel() {
        generateGalleryImages();
        
        // Actualiza estado de indicadores
        const allIndicators = document.querySelectorAll('.gallery-indicator');
        allIndicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentCarouselIndex);
        });
    }
    
    /**
     * Navega a un slide específico
     * @param {number} index - Índice del slide destino
     */
    function goToSlide(index) {
        currentCarouselIndex = index;
        updateCarousel();
    }
    
    // FUNCIONES DE AVANCE AUTOMÁTICO
    
    /**
     * Inicia el avance automático del carrusel
     */
    function startAutoAdvance() {
        if (autoAdvanceTimer) {
            clearInterval(autoAdvanceTimer);
        }
        autoAdvanceTimer = setInterval(() => {
            if (!isUserInteracting && totalSlides > 1) {
                nextSlide();
            }
        }, AUTO_ADVANCE_INTERVAL);
    }
    
    /**
     * Detiene el avance automático
     */
    function stopAutoAdvance() {
        if (autoAdvanceTimer) {
            clearInterval(autoAdvanceTimer);
            autoAdvanceTimer = null;
        }
    }
    
    /**
     * Reinicia el avance automático después de interacción
     */
    function resetAutoAdvance() {
        stopAutoAdvance();
        setTimeout(() => {
            if (!isUserInteracting) {
                startAutoAdvance();
            }
        }, 1000); // Espera 1 segundo antes de reanudar
    }
    
    // NAVEGACIÓN DEL CARRUSEL
    
    /**
     * Avanza al siguiente slide
     */
    function nextSlide() {
        currentCarouselIndex = (currentCarouselIndex + 1) % totalSlides;
        updateCarousel();
    }
    
    /**
     * Retrocede al slide anterior
     */
    function prevSlide() {
        currentCarouselIndex = (currentCarouselIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    // FUNCIONES DEL MODAL
    
    /**
     * Abre el modal con una imagen específica
     * @param {number} imageIndex - Índice de la imagen a mostrar
     */
    function openModal(imageIndex) {
        currentModalIndex = imageIndex;
        modalImg.src = `./assets/img/galeria/${imageIndex + 1}.jpg`;
        modalImg.alt = `Proyecto ${imageIndex + 1}`;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Previene scroll del body
    }
    
    /**
     * Cierra el modal
     */
    function closeModalFunc() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaura scroll del body
    }
    
    /**
     * Navega a la siguiente imagen en el modal
     */
    function nextModalImage() {
        currentModalIndex = (currentModalIndex + 1) % TOTAL_IMAGES;
        modalImg.src = `./assets/img/galeria/${currentModalIndex + 1}.jpg`;
        modalImg.alt = `Proyecto ${currentModalIndex + 1}`;
    }
    
    /**
     * Navega a la imagen anterior en el modal
     */
    function prevModalImage() {
        currentModalIndex = (currentModalIndex - 1 + TOTAL_IMAGES) % TOTAL_IMAGES;
        modalImg.src = `./assets/img/galeria/${currentModalIndex + 1}.jpg`;
        modalImg.alt = `Proyecto ${currentModalIndex + 1}`;
    }
    
    // EVENT LISTENERS DEL CARRUSEL
    
    // Botón siguiente con control de auto-avance
    if (nextCarouselBtn) {
        nextCarouselBtn.addEventListener('click', () => {
            isUserInteracting = true;
            nextSlide();
            resetAutoAdvance();
            setTimeout(() => { isUserInteracting = false; }, 500);
        });
    }
    
    // Botón anterior con control de auto-avance
    if (prevCarouselBtn) {
        prevCarouselBtn.addEventListener('click', () => {
            isUserInteracting = true;
            prevSlide();
            resetAutoAdvance();
            setTimeout(() => { isUserInteracting = false; }, 500);
        });
    }
    
    /**
     * Asigna eventos a los indicadores
     */
    function attachIndicatorListeners() {
        const allIndicators = document.querySelectorAll('.gallery-indicator');
        allIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                isUserInteracting = true;
                goToSlide(index);
                resetAutoAdvance();
                setTimeout(() => { isUserInteracting = false; }, 500);
            });
        });
    }

    // EVENT LISTENERS DEL MODAL
    
    // Cerrar modal
    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunc);
    }
    
    // Navegación en modal
    if (nextModalBtn) {
        nextModalBtn.addEventListener('click', nextModalImage);
    }
    
    if (prevModalBtn) {
        prevModalBtn.addEventListener('click', prevModalImage);
    }
    
    // Cerrar modal al hacer click fuera de la imagen
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModalFunc();
            }
        });
    }
    
    // NAVEGACIÓN CON TECLADO
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex') {
            if (e.key === 'Escape') {
                closeModalFunc();
            } else if (e.key === 'ArrowRight') {
                nextModalImage();
            } else if (e.key === 'ArrowLeft') {
                prevModalImage();
            }
        }
    });
    
    // MANEJO DE CAMBIOS DE TAMAÑO DE VENTANA
    function handleResize() {
        const newImagesPerView = getImagesPerView();
        if (newImagesPerView !== imagesPerView) {
            imagesPerView = newImagesPerView;
            totalSlides = Math.ceil(TOTAL_IMAGES / imagesPerView);
            // Asegura que el índice actual sea válido
            if (currentCarouselIndex >= totalSlides) {
                currentCarouselIndex = totalSlides - 1;
            }
            generateIndicators();
            updateCarousel();
        }
    }
    
    window.addEventListener('resize', debounce(handleResize, 250));
    
    // CONTROL DE AUTO-AVANCE EN HOVER
    if (galleryContainer) {
        galleryContainer.addEventListener('mouseenter', () => {
            isUserInteracting = true;
            stopAutoAdvance();
        });
        
        galleryContainer.addEventListener('mouseleave', () => {
            isUserInteracting = false;
            startAutoAdvance();
        });
    }
    
    // INICIALIZACIÓN
    console.log('Initializing gallery with', TOTAL_IMAGES, 'images');
    console.log('Images per view:', imagesPerView);
    console.log('Total slides:', totalSlides);
    
    // Función para inicializar la galería de forma robusta
    function initializeGallery() {
        console.log('Attempting to initialize gallery...');
        generateIndicators();
        updateCarousel();
        
        // Verificar si las imágenes se generaron correctamente
        setTimeout(() => {
            const generatedImages = galleryContainer.querySelectorAll('.gallery-item');
            console.log('Generated images count:', generatedImages.length);
            
            if (generatedImages.length === 0) {
                console.log('No images generated, forcing regeneration...');
                generateGalleryImages();
            }
        }, 50);
    }
    
    // Intentar inicialización inmediata
    initializeGallery();
    
    // Intentar nuevamente después de un breve delay
    setTimeout(initializeGallery, 100);
    
    // Intentar una vez más después de un delay mayor
    setTimeout(initializeGallery, 500);
    
    // Inicia auto-avance si hay más de una imagen
    if (totalSlides > 1) {
        startAutoAdvance();
    }
}

// Additional utility functions
function isMobile() {
    return window.innerWidth <= 768;
}

function isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
}

function isDesktop() {
    return window.innerWidth > 1024;
}

// Resize handler
window.addEventListener('resize', function() {
    // Close mobile menu on resize
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (window.innerWidth > 768) {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        const navMenu = document.querySelector('.nav-menu');
        
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});
