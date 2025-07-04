# Documentación de la Galería - Construcciones Vergara

## Descripción General
La galería es un componente interactivo que muestra imagenes de una seecion de galeria. Está construida como un carrusel responsivo con modal para visualización ampliada de las imágenes.

## Características Principales
- **Carrusel responsivo**: Muestra 4 imágenes en desktop y 2 en móvil
- **Avance automático**: Las imágenes cambian automáticamente cada 4 segundos
- **Modal interactivo**: Permite ver las imágenes en tamaño completo
- **Navegación completa**: Botones, indicadores y navegación por teclado
- **Carga dinámica**: Las imágenes se cargan según demanda

---

## Código HTML

```html
<!-- Gallery Section - Carrusel con modal -->
<section id="galeria" class="gallery" role="region" aria-labelledby="gallery-heading">
    <div class="container">
        <!-- Encabezado de la sección -->
        <div class="section-header">
            <h2 id="gallery-heading">Galería de Trabajos</h2>
            <div class="section-divider" role="presentation"></div>
            <p>Algunos de nuestros proyectos realizados</p>
        </div>
    
        <!-- Contenedor principal del carrusel -->
        <div class="gallery-carousel">
            <!-- Contenedor donde se cargan dinámicamente las imágenes -->
            <div class="gallery-container" id="galleryContainer">
                <!-- Las imágenes se cargarán dinámicamente con JavaScript -->
            </div>
            
            <!-- Controles de navegación del carrusel -->
            <div class="gallery-controls">
                <button class="gallery-btn gallery-prev" id="galleryPrev">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="gallery-btn gallery-next" id="galleryNext">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
            
            <!-- Indicadores de posición del carrusel -->
            <div class="gallery-indicators" id="galleryIndicators">
                <!-- Los indicadores se generarán dinámicamente -->
            </div>
        </div>
    </div>
</section>

<!-- Modal para visualización ampliada de imágenes -->
<div id="galleryModal" class="gallery-modal">
    <div class="modal-content">
        <!-- Botón para cerrar el modal -->
        <span class="modal-close" id="modalClose">&times;</span>
        <!-- Imagen principal del modal -->
        <img id="modalImage" src="" alt="">
        <!-- Navegación dentro del modal -->
        <div class="modal-nav">
            <button class="modal-btn modal-prev" id="modalPrev">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button class="modal-btn modal-next" id="modalNext">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
    </div>
</div>
```

---

## Código CSS

```css
/* Estilos principales de la galería */
.gallery {
    padding: 6rem 0;
    background: var(--light-gray); /* Fondo gris claro para contrastar */
}

/* Contenedor principal del carrusel */
.gallery-carousel {
    position: relative;
    max-width: 100%;
    margin: 0 auto;
}

/* Contenedor de las imágenes con flexbox */
.gallery-container {
    display: flex;
    gap: 1.5rem; /* Espacio entre imágenes */
    overflow: hidden; /* Oculta imágenes fuera del contenedor */
    width: 100%;
}

/* Estilos individuales para cada imagen */
.gallery-item {
    position: relative;
    aspect-ratio: 1; /* Mantiene proporción cuadrada */
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s ease;
    box-shadow: var(--shadow-light);
    flex: 0 0 calc((100% - 4.5rem) / 4); /* 4 imágenes en desktop */
    min-width: 0;
}

/* Efectos hover en las imágenes */
.gallery-item:hover {
    transform: scale(1.05); /* Agranda ligeramente */
    box-shadow: var(--shadow-medium);
}

.gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Mantiene proporción sin distorsión */
    transition: transform 0.3s ease;
}

.gallery-item:hover img {
    transform: scale(1.1); /* Efecto zoom en hover */
}

/* Controles de navegación del carrusel */
.gallery-controls {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    display: flex;
    justify-content: space-between;
    pointer-events: none; /* Permite clicks solo en botones */
    z-index: 10;
}

/* Botones de navegación */
.gallery-btn {
    background: rgba(0, 0, 0, 0.7); /* Fondo semi-transparente */
    color: var(--white);
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%; /* Botones circulares */
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    transition: all 0.3s ease;
    pointer-events: all; /* Habilita clicks en botones */
    margin: 0 -25px; /* Posiciona botones fuera del contenedor */
}

.gallery-btn:hover {
    background: var(--primary-color);
    transform: scale(1.1);
}

.gallery-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Indicadores de posición */
.gallery-indicators {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 2rem;
}

.gallery-indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--border-color);
    cursor: pointer;
    transition: background 0.3s ease;
}

.gallery-indicator.active {
    background: var(--primary-color); /* Indicador activo */
}

/* Estilos del modal */
.gallery-modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9); /* Fondo oscuro semi-transparente */
    z-index: 10000; /* Asegura que esté por encima de todo */
    align-items: center;
    justify-content: center;
}

.gallery-modal.active {
    display: flex;
}

/* Contenido del modal */
.modal-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Botón de cerrar modal */
.modal-close {
    position: absolute;
    top: -50px;
    right: 0;
    color: var(--white);
    font-size: 2rem;
    cursor: pointer;
    z-index: 10001;
    transition: color 0.3s ease;
}

.modal-close:hover {
    color: var(--primary-color);
}

/* Imagen principal del modal */
#modalImage {
    max-width: 100%;
    max-height: 100%;
    border-radius: 8px;
    box-shadow: var(--shadow-heavy);
}

/* Navegación dentro del modal */
.modal-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    display: flex;
    justify-content: space-between;
    pointer-events: none;
}

/* Botones de navegación del modal */
.modal-btn {
    background: rgba(0, 0, 0, 0.7);
    color: var(--white);
    border: none;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    transition: all 0.3s ease;
    pointer-events: all;
    margin: 0 -30px;
}

.modal-btn:hover {
    background: var(--primary-color);
    transform: scale(1.1);
}
```

---

## Código JavaScript

```javascript
/**
 * Función Debounce para limitar la frecuencia de ejecución de un evento
 * @param {Function} func - La función a ejecutar
 * @param {number} delay - El tiempo de espera en milisegundos
 * @returns {Function}
 */
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}

/**
 * Inicialización de la galería interactiva
 * Maneja el carrusel, modal y todas las interacciones
 */
function initGallery() {
    // CONFIGURACIÓN PRINCIPAL
    const TOTAL_IMAGES = 29; // Número total de imágenes en la carpeta galeria
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
        galleryContainer.innerHTML = ''; // Limpia contenedor
        
        // Calcula qué imágenes mostrar en el slide actual
        const startIndex = currentCarouselIndex * imagesPerView;
        const endIndex = Math.min(startIndex + imagesPerView, TOTAL_IMAGES);
        
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
    generateIndicators();
    updateCarousel();
    
    // Inicia auto-avance si hay más de una imagen
    if (totalSlides > 1) {
        startAutoAdvance();
    }
}

// Espera a que el DOM esté completamente cargado para inicializar la galería
document.addEventListener('DOMContentLoaded', initGallery);
```

---

## Configuración y Personalización

### Cambiar número de imágenes
Para modificar la cantidad total de imágenes, edita la constante en `script.js`:
```javascript
const TOTAL_IMAGES = 29; // Cambia este número
```

### Modificar velocidad de auto-avance
Para cambiar el tiempo de avance automático:
```javascript
const AUTO_ADVANCE_INTERVAL = 4000; // Tiempo en milisegundos
```

### Agregar nuevas imágenes
1. Coloca las imágenes en `/assets/img/galeria/`
2. Nómbralas secuencialmente: `1.jpg`, `2.jpg`, `3.jpg`, etc.
3. Actualiza `TOTAL_IMAGES` en el JavaScript

### Responsividad
La galería se adapta automáticamente:
- **Desktop (≥768px)**: Muestra 4 imágenes por slide
- **Mobile (<768px)**: Muestra 2 imágenes por slide

---

## Funcionalidades Implementadas

1. **Carrusel Responsivo**: Adapta el número de imágenes según el dispositivo
2. **Avance Automático**: Cambia slides automáticamente cada 4 segundos
3. **Pausa Inteligente**: Se pausa en hover y durante interacciones del usuario
4. **Modal Interactivo**: Visualización ampliada con navegación
5. **Navegación Múltiple**: Botones, indicadores y teclado
6. **Carga Optimizada**: Lazy loading de imágenes
7. **Efectos Visuales**: Transiciones suaves y efectos hover
8. **Accesibilidad**: Soporte para navegación por teclado y ARIA labels

---

## Estructura de Archivos

```
assets/
├── img/
│   └── galeria/
│       ├── 1.jpg
│       ├── 2.jpg
│       ├── 3.jpg
│       └── ... (hasta 29.jpg)
├── css/
│   └── style.css
└── js/
    └── script.js
```

Esta documentación cubre todos los aspectos técnicos de la galería, desde su estructura HTML hasta su funcionalidad JavaScript, facilitando el mantenimiento y futuras modificaciones del componente.