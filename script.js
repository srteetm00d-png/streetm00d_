// STREETMOOD 4.0 - Sistema Profissional Premium
console.log('🚀 STREETMOOD 4.0 - Iniciando sistema premium...');

// CONFIGURAÇÃO GLOBAL AVANÇADA
const CONFIG = {
    imageFolder: "./imagens_produtos/",
    apiEndpoint: "./products.json",
    currency: "EUR",
    itemsPerPage: 12,
    animationDelay: 100,
    lazyLoading: true,
    instagramUrl: "https://www.instagram.com/direct/t/streetm00d_/"
};

// ESTADO GLOBAL AVANÇADO
const STATE = {
    products: [],
    filteredProducts: [],
    currentFilter: 'all',
    currentSort: 'name',
    currentPage: 1,
    totalPages: 1,
    isLoading: false,
    searchQuery: '',
    selectedProduct: null,
    currentImageIndex: 0
};

// ELEMENTOS DOM OTIMIZADOS
const DOM = {
    navbar: null,
    productsGrid: null,
    loading: null,
    resultsCount: null,
    searchInput: null,
    sortDropdown: null,
    categoryTabs: null,
    navLinks: null,
    productModal: null,
    galleryMain: null,
    galleryThumbnails: null,
    paginationContainer: null
};

// CLASSE AVANÇADA DE PRODUTO
class Product {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.price = data.price;
        this.currency = data.currency || CONFIG.currency;
        this.images = data.images || [];
        this.tags = data.tags || [];
        this.status = data.status;
        this.version = data.version;
        this.brand = this.detectBrand();
        this.badge = this.getBadge();
        this.category = this.getCategory();
    }

    detectBrand() {
        const name = this.name.toLowerCase();
        const brands = {
            'nike': ['nike', 'air', 'dunk', 'force', 'lebron', 'kobe', 'kd', 'kyrie', 'pg', 'shox', 'vapormax', 'air max'],
            'adidas': ['adidas', 'yeezy', 'ultra', 'forum', 'stan smith', 'superstar', 'gazelle'],
            'jordan': ['jordan'],
            'balenciaga': ['balenciaga', 'triple', 'speed'],
            'gucci': ['gucci'],
            'dior': ['dior'],
            'versace': ['versace'],
            'supreme': ['supreme'],
            'stone island': ['stone island'],
            'fear of god': ['fear of god'],
            'rick owens': ['rick owens'],
            'givenchy': ['givenchy'],
            'prada': ['prada'],
            'valentino': ['valentino'],
            'bottega veneta': ['bottega'],
            'puma': ['puma', 'clyde', 'lamelo', 'ja morant'],
            'new balance': ['new balance'],
            'asics': ['asics'],
            'vans': ['vans'],
            'converse': ['converse'],
            'reebok': ['reebok'],
            'timberland': ['timberland'],
            'dr. martens': ['dr. martens'],
            'skechers': ['skechers'],
            'crocs': ['crocs'],
            'birkenstock': ['birkenstock'],
            'toms': ['toms'],
            'under armour': ['under armour', 'curry']
        };
        
        for (const [brand, keywords] of Object.entries(brands)) {
            if (keywords.some(keyword => name.includes(keyword))) {
                return brand.toUpperCase();
            }
        }
        return 'STREETMOOD';
    }

    getBadge() {
        if (this.price > 200) return 'exclusive';
        if (this.price > 150) return 'limited';
        if (this.tags.includes('new')) return 'new';
        return null;
    }

    getCategory() {
        const name = this.name.toLowerCase();
        const tags = this.tags.map(tag => tag.toLowerCase());
        
        if (tags.includes('clothing') || name.includes('shirt') || name.includes('hoodie') || name.includes('jacket')) {
            return 'clothing';
        }
        if (tags.includes('accessories') || name.includes('bag') || name.includes('cap') || name.includes('socks')) {
            return 'accessories';
        }
        return 'sneakers';
    }
}

// CLASSE AVANÇADA DE RENDERIZAÇÃO
class ProductRenderer {
    createProductCard(product, index) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.productId = product.id;
        card.style.animationDelay = `${index * CONFIG.animationDelay}ms`;
        
        const firstImage = product.images && product.images.length > 0 ? product.images[0] : null;
        
        card.innerHTML = `
            ${product.badge ? `<div class="product-badge ${product.badge}">${this.getBadgeText(product.badge)}</div>` : ''}
            <div class="product-image-container" onclick="openProductModal('${product.id}')">
                <img src="${firstImage ? CONFIG.imageFolder + firstImage : ''}" 
                     alt="${product.name}"
                     class="product-image"
                     loading="lazy"
                     onerror="this.src='data:image/svg+xml;base64,${this.getPlaceholderSVG()}'">
                <div class="image-overlay">
                    <button class="quick-view-btn" onclick="event.stopPropagation(); openProductModal('${product.id}')">
                        Ver Detalhes
                    </button>
                </div>
            </div>
            <div class="product-info">
                <div class="product-brand">${product.brand}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price-row">
                    <span class="product-price">${product.currency} ${product.price}</span>
                </div>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="event.stopPropagation(); quickPurchase('${product.id}')">
                        📷 Instagram DM
                    </button>
                    <button class="btn btn-secondary" onclick="event.stopPropagation(); openProductModal('${product.id}')">
                        👁️ Ver
                    </button>
                </div>
            </div>
        `;
        
        return card;
    }

    getBadgeText(badge) {
        const badgeTexts = {
            'exclusive': 'EXCLUSIVO',
            'limited': 'LIMITADO',
            'new': 'NOVO'
        };
        return badgeTexts[badge] || badge.toUpperCase();
    }

    getPlaceholderSVG() {
        return btoa(`
            <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="400" fill="#1a1a1a"/>
                <path d="M150 120h100v160h-100z" fill="#333"/>
                <path d="M120 280h160v40h-160z" fill="#444"/>
                <text x="200" y="200" text-anchor="middle" fill="#666" font-family="Arial" font-size="20">📷</text>
            </svg>
        `);
    }
}

// CLASSE AVANÇADA DE PAGINAÇÃO
class PaginationManager {
    constructor() {
        this.currentPage = 1;
        this.totalPages = 1;
        this.itemsPerPage = CONFIG.itemsPerPage;
    }

    calculatePagination(totalItems) {
        this.totalPages = Math.ceil(totalItems / this.itemsPerPage);
        return this.totalPages;
    }

    getPaginatedItems(items, page = this.currentPage) {
        const startIndex = (page - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return items.slice(startIndex, endIndex);
    }

    createPaginationControls() {
        const container = document.createElement('div');
        container.className = 'pagination';
        
        if (this.totalPages <= 1) return container;

        let html = '';
        
        // Previous button
        html += `<button class="pagination-btn prev" ${this.currentPage === 1 ? 'disabled' : ''} onclick="changePage(${this.currentPage - 1})">←</button>`;
        
        // Page numbers
        const startPage = Math.max(1, this.currentPage - 2);
        const endPage = Math.min(this.totalPages, this.currentPage + 2);
        
        if (startPage > 1) {
            html += `<button class="pagination-btn" onclick="changePage(1)">1</button>`;
            if (startPage > 2) html += '<span class="pagination-ellipsis">...</span>';
        }
        
        for (let i = startPage; i <= endPage; i++) {
            html += `<button class="pagination-btn ${i === this.currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
        }
        
        if (endPage < this.totalPages) {
            if (endPage < this.totalPages - 1) html += '<span class="pagination-ellipsis">...</span>';
            html += `<button class="pagination-btn" onclick="changePage(${this.totalPages})">${this.totalPages}</button>`;
        }
        
        // Next button
        html += `<button class="pagination-btn next" ${this.currentPage === this.totalPages ? 'disabled' : ''} onclick="changePage(${this.currentPage + 1})">→</button>`;
        
        container.innerHTML = html;
        return container;
    }

    setCurrentPage(page) {
        this.currentPage = Math.max(1, Math.min(page, this.totalPages));
    }
}

// SISTEMA PRINCIPAL AVANÇADO
class StreetMoodApp {
    constructor() {
        this.productRenderer = new ProductRenderer();
        this.paginationManager = new PaginationManager();
        this.products = [];
        this.filteredProducts = [];
    }

    async init() {
        console.log('🚀 Inicializando STREETMOOD 4.0...');
        
        try {
            await this.initializeDOM();
            this.setupEventListeners();
            await this.loadProducts();
            this.setupIntersectionObserver();
            this.setupNavigationEffects();
            console.log('✅ Sistema inicializado com sucesso!');
        } catch (error) {
            console.error('❌ Erro na inicialização:', error);
            this.showError('Falha ao inicializar o sistema. Tente recarregar a página.');
        }
    }

    async initializeDOM() {
        DOM.navbar = document.getElementById("navbar");
        DOM.productsGrid = document.getElementById("productsGrid");
        DOM.loading = document.getElementById("loading");
        DOM.resultsCount = document.getElementById("resultsCount");
        DOM.searchInput = document.getElementById("searchInput");
        DOM.sortDropdown = document.getElementById("sortDropdown");
        DOM.categoryTabs = document.querySelectorAll('.category-tab');
        DOM.navLinks = document.querySelectorAll('.nav-link');
        DOM.productModal = document.getElementById("productModal");
        DOM.galleryMain = document.getElementById("galleryMain");
        DOM.galleryThumbnails = document.getElementById("galleryThumbnails");
        DOM.paginationContainer = document.getElementById("paginationContainer");

        const requiredElements = ['productsGrid', 'loading', 'resultsCount'];
        const missing = requiredElements.filter(name => !DOM[name]);
        
        if (missing.length > 0) {
            throw new Error(`Elementos críticos não encontrados: ${missing.join(', ')}`);
        }
    }

    setupEventListeners() {
        // Search com debounce
        if (DOM.searchInput) {
            DOM.searchInput.addEventListener('input', 
                this.debounce((e) => {
                    STATE.searchQuery = e.target.value;
                    this.applyFiltersAndRender();
                }, 300)
            );
        }

        // Sort
        if (DOM.sortDropdown) {
            DOM.sortDropdown.addEventListener('change', (e) => {
                STATE.currentSort = e.target.value;
                this.applyFiltersAndRender();
            });
        }

        // Category filters
        DOM.categoryTabs.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                this.setActiveCategoryTab(filter);
                STATE.currentFilter = filter;
                this.applyFiltersAndRender();
            });
        });

        // Navigation links
        DOM.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const category = link.dataset.category;
                this.setActiveNavLink(link);
                
                if (category && category !== 'about') {
                    STATE.currentFilter = category;
                    this.applyFiltersAndRender();
                    this.setActiveCategoryTab(category);
                }
                
                // Smooth scroll
                const targetId = link.getAttribute('href');
                if (targetId && targetId !== '#') {
                    const target = document.querySelector(targetId);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });

        // Modal events
        if (DOM.productModal) {
            DOM.productModal.addEventListener('click', (e) => {
                if (e.target === DOM.productModal) {
                    this.closeProductModal();
                }
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeProductModal();
            }
            if (e.key === 'ArrowLeft' && DOM.productModal.classList.contains('active')) {
                this.previousImage();
            }
            if (e.key === 'ArrowRight' && DOM.productModal.classList.contains('active')) {
                this.nextImage();
            }
        });

        // Scroll effects
        window.addEventListener('scroll', this.throttle(() => {
            this.handleScroll();
        }, 16));
    }

    async loadProducts() {
        console.log('📦 Carregando produtos...');
        
        try {
            const response = await fetch(CONFIG.apiEndpoint);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            this.products = Object.entries(data).map(([id, productData]) => 
                new Product({ ...productData, id })
            );

            console.log(`✅ ${this.products.length} produtos carregados`);
            
            this.applyFiltersAndRender();
            
        } catch (error) {
            console.error('❌ Erro ao carregar produtos:', error);
            this.showError('Falha ao carregar produtos. Tente recarregar a página.');
        } finally {
            if (DOM.loading) {
                DOM.loading.style.display = 'none';
            }
        }
    }

    applyFiltersAndRender() {
        this.filteredProducts = this.filterProducts();
        this.sortProducts();
        this.paginationManager.calculatePagination(this.filteredProducts.length);
        this.paginationManager.setCurrentPage(1);
        this.renderProducts();
    }

    filterProducts() {
        return this.products.filter(product => {
            // Category filter
            if (STATE.currentFilter !== 'all') {
                const matchesCategory = product.category === STATE.currentFilter ||
                    product.tags.some(tag => tag.toLowerCase().includes(STATE.currentFilter)) ||
                    product.brand.toLowerCase().includes(STATE.currentFilter);
                
                if (!matchesCategory) return false;
            }

            // Search filter
            if (STATE.searchQuery) {
                const searchLower = STATE.searchQuery.toLowerCase();
                const matchesSearch = product.name.toLowerCase().includes(searchLower) ||
                    product.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
                    product.brand.toLowerCase().includes(searchLower);
                
                if (!matchesSearch) return false;
            }

            return true;
        });
    }

    sortProducts() {
        const sortFunctions = {
            'name': (a, b) => a.name.localeCompare(b.name),
            'price-low': (a, b) => a.price - b.price,
            'price-high': (a, b) => b.price - a.price,
            'newest': (a, b) => (b.version || 'v1').localeCompare(a.version || 'v1')
        };

        const sortFn = sortFunctions[STATE.currentSort] || sortFunctions['name'];
        this.filteredProducts.sort(sortFn);
    }

    renderProducts() {
        if (!DOM.productsGrid) return;

        DOM.productsGrid.innerHTML = '';
        
        // Update results count
        if (DOM.resultsCount) {
            DOM.resultsCount.textContent = `${this.filteredProducts.length} produtos encontrados`;
        }

        // Get paginated products
        const paginatedProducts = this.paginationManager.getPaginatedItems(this.filteredProducts);
        
        // Render products
        paginatedProducts.forEach((product, index) => {
            const card = this.productRenderer.createProductCard(product, index);
            DOM.productsGrid.appendChild(card);
        });

        // Add pagination
        this.renderPagination();

        // Setup lazy loading
        this.setupLazyLoading();
    }

    renderPagination() {
        if (!DOM.paginationContainer) return;
        
        DOM.paginationContainer.innerHTML = '';
        const paginationContainer = this.paginationManager.createPaginationControls();
        if (paginationContainer.innerHTML) {
            DOM.paginationContainer.appendChild(paginationContainer);
        }
    }

    setupLazyLoading() {
        if (!('IntersectionObserver' in window)) return;

        const images = document.querySelectorAll('.product-image[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.loading = 'eager';
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    setupIntersectionObserver() {
        // Observer para animações de entrada
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1
        });

        // Observar cards quando forem criados
        const mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.classList && node.classList.contains('product-card')) {
                        observer.observe(node);
                    }
                });
            });
        });

        mutationObserver.observe(DOM.productsGrid, {
            childList: true
        });
    }

    setupNavigationEffects() {
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (DOM.navbar) {
                DOM.navbar.classList.toggle('scrolled', window.scrollY > 50);
            }
        });
    }

    setActiveCategoryTab(filter) {
        DOM.categoryTabs.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
    }

    setActiveNavLink(activeLink) {
        DOM.navLinks.forEach(link => {
            link.classList.remove('active');
        });
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    openProductModal(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        STATE.selectedProduct = product;
        STATE.currentImageIndex = 0;

        // Update modal content
        document.getElementById('modalBrand').textContent = product.brand;
        document.getElementById('modalTitle').textContent = product.name;
        document.getElementById('modalPrice').textContent = `${product.currency} ${product.price}`;
        document.getElementById('modalDescription').textContent = this.getProductDescription(product);

        // Setup gallery
        this.setupGallery(product);

        // Show modal
        DOM.productModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    setupGallery(product) {
        if (!product.images || product.images.length === 0) return;

        // Set main image
        const mainImg = document.getElementById('mainImage');
        mainImg.src = CONFIG.imageFolder + product.images[0];
        mainImg.alt = product.name;

        // Setup thumbnails
        const thumbnailsContainer = DOM.galleryThumbnails;
        thumbnailsContainer.innerHTML = '';

        product.images.forEach((image, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
            thumbnail.onclick = () => this.selectImage(index);
            
            const img = document.createElement('img');
            img.src = CONFIG.imageFolder + image;
            img.alt = `${product.name} - Imagem ${index + 1}`;
            
            thumbnail.appendChild(img);
            thumbnailsContainer.appendChild(thumbnail);
        });
    }

    selectImage(index) {
        if (!STATE.selectedProduct || !STATE.selectedProduct.images) return;

        STATE.currentImageIndex = index;
        
        // Update main image
        const mainImg = document.getElementById('mainImage');
        mainImg.src = CONFIG.imageFolder + STATE.selectedProduct.images[index];

        // Update thumbnails
        const thumbnails = DOM.galleryThumbnails.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    }

    previousImage() {
        if (!STATE.selectedProduct || !STATE.selectedProduct.images) return;
        
        const newIndex = STATE.currentImageIndex > 0 
            ? STATE.currentImageIndex - 1 
            : STATE.selectedProduct.images.length - 1;
        
        this.selectImage(newIndex);
    }

    nextImage() {
        if (!STATE.selectedProduct || !STATE.selectedProduct.images) return;
        
        const newIndex = STATE.currentImageIndex < STATE.selectedProduct.images.length - 1 
            ? STATE.currentImageIndex + 1 
            : 0;
        
        this.selectImage(newIndex);
    }

    closeProductModal() {
        DOM.productModal.classList.remove('active');
        document.body.style.overflow = '';
        STATE.selectedProduct = null;
        STATE.currentImageIndex = 0;
    }

    getProductDescription(product) {
        return `${product.name} - Produto premium da STREETMOOD. 
                Design exclusivo da marca ${product.brand} com materiais de alta qualidade. 
                Perfeito para quem busca estilo e conforto. 
                ${product.badge ? `Edição ${this.getBadgeText(product.badge).toLowerCase()}.` : ''}`;
    }

    handleScroll() {
        // Implement scroll effects if needed
    }

    showError(message) {
        if (DOM.productsGrid) {
            DOM.productsGrid.innerHTML = `
                <div class="error-container">
                    <div class="error-icon">❌</div>
                    <h3>Erro</h3>
                    <p>${message}</p>
                    <button onclick="location.reload()" class="btn btn-primary">Recarregar Página</button>
                </div>
            `;
        }
    }

    // Utilitários avançados
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Funções globais para compatibilidade
let app;

async function quickPurchase(productId) {
    const product = app.products.find(p => p.id === productId);
    if (!product) return;

    const message = encodeURIComponent(`Olá STREETMOOD 👟 quero comprar o ${product.name} ainda está disponível?`);
    window.open(`${CONFIG.instagramUrl}/?text=${message}`, '_blank');
}

function openProductModal(productId) {
    app.openProductModal(productId);
}

function closeProductModal() {
    app.closeProductModal();
}

function changePage(page) {
    app.paginationManager.setCurrentPage(page);
    app.renderProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function filterProducts(category) {
    STATE.currentFilter = category;
    app.setActiveCategoryTab(category);
    app.applyFiltersAndRender();
}

function buyProduct() {
    if (!STATE.selectedProduct) return;
    
    const message = encodeURIComponent(`Olá STREETMOOD 👟 quero comprar o ${STATE.selectedProduct.name} ainda está disponível?`);
    window.open(`${CONFIG.instagramUrl}/?text=${message}`, '_blank');
}

function reserveProduct() {
    if (!STATE.selectedProduct) return;
    
    const message = encodeURIComponent(`Olá STREETMOOD 👟 quero reservar o ${STATE.selectedProduct.name}. Podes enviar fotos reais antes do envio?`);
    window.open(`${CONFIG.instagramUrl}/?text=${message}`, '_blank');
}

// Inicialização
document.addEventListener('DOMContentLoaded', async () => {
    app = new StreetMoodApp();
    await app.init();
});

console.log('✅ STREETMOOD 4.0 - Sistema premium carregado!');
