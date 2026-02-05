// STREETMOOD 3.0 - Sistema Avançado e Profissional
console.log('🚀 STREETMOOD 3.0 - Iniciando sistema avançado...');

// CONFIGURAÇÃO GLOBAL AVANÇADA
const CONFIG = {
    imageFolder: "./imagens_produtos/",
    apiEndpoint: "./products.json",
    currency: "EUR",
    itemsPerPage: 12,
    animationDelay: 50,
    imageQuality: 'high',
    lazyLoading: true,
    paginationThreshold: 100
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
    imageCache: new Map(),
    intersectionObserver: null
};

// ELEMENTOS DOM OTIMIZADOS
const DOM = {
    catalog: null,
    loading: null,
    resultsCount: null,
    searchInput: null,
    sortDropdown: null,
    header: null,
    filters: null,
    modal: null,
    pagination: null,
    loadMoreBtn: null
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
        this.processedImages = this.processImages();
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
        if (this.price > 150) return 'LUXURY';
        if (this.price > 100) return 'PREMIUM';
        if (this.tags.includes('new')) return 'NEW';
        if (this.tags.includes('limited')) return 'LIMITED';
        return null;
    }

    processImages() {
        return this.images.map((img, index) => ({
            original: img,
            thumbnail: this.generateThumbnail(img),
            optimized: this.optimizeImage(img),
            index: index
        }));
    }

    generateThumbnail(imagePath) {
        return imagePath; // Implementar thumbnail generation se necessário
    }

    optimizeImage(imagePath) {
        return imagePath; // Implementar otimização se necessário
    }
}

// CLASSE AVANÇADA DE RENDERIZAÇÃO
class ProductRenderer {
    constructor() {
        this.imageLoader = new ImageLoader();
    }

    createProductCard(product, index) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.productId = product.id;
        card.style.animationDelay = `${index * CONFIG.animationDelay}ms`;
        
        const firstImage = product.processedImages[0];
        
        card.innerHTML = `
            ${product.badge ? `<div class="product-badge ${product.badge.toLowerCase()}">${product.badge}</div>` : ''}
            <div class="product-image-container">
                <div class="image-wrapper">
                    <img 
                        src="${firstImage.original}" 
                        alt="${product.name}"
                        class="product-image"
                        loading="lazy"
                        onerror="this.src='data:image/svg+xml;base64,${this.getPlaceholderSVG()}'"
                    >
                    <div class="image-overlay">
                        <div class="overlay-content">
                            <span class="view-details">Ver Detalhes</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="product-info">
                <div class="product-brand">${product.brand}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price-row">
                    <span class="product-price">${product.currency} ${product.price}</span>
                    ${product.badge ? `<span class="price-badge">${product.badge}</span>` : ''}
                </div>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="quickPurchase('${product.id}')">
                        <span class="btn-icon">🛒</span>
                        <span>Comprar</span>
                    </button>
                    <button class="btn btn-secondary" onclick="viewProduct('${product.id}')">
                        <span class="btn-icon">👁️</span>
                        <span>Ver</span>
                    </button>
                </div>
            </div>
        `;
        
        // Event listeners avançados
        this.setupCardInteractions(card, product);
        
        return card;
    }

    setupCardInteractions(card, product) {
        // Hover effects avançados
        card.addEventListener('mouseenter', () => {
            card.classList.add('hover');
            this.preloadImages(product.processedImages);
        });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover');
        });

        // Click handler
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('btn')) {
                viewProduct(product.id);
            }
        });

        // Touch events para mobile
        card.addEventListener('touchstart', () => {
            card.classList.add('touch');
        });

        card.addEventListener('touchend', () => {
            setTimeout(() => card.classList.remove('touch'), 300);
        });
    }

    preloadImages(images) {
        images.slice(0, 3).forEach(imageData => {
            const img = new Image();
            img.src = imageData.original;
        });
    }

    getPlaceholderSVG() {
        return btoa(`
            <svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="300" height="200" fill="#f8f9fa"/>
                <path d="M120 80h60v40h-60z" fill="#dee2e6"/>
                <path d="M100 120h100v20h-100z" fill="#adb5bd"/>
                <text x="150" y="100" text-anchor="middle" fill="#6c757d" font-family="Arial" font-size="14">📷</text>
            </svg>
        `);
    }
}

// CLASSE AVANÇADA DE CARREGAMENTO DE IMAGENS
class ImageLoader {
    constructor() {
        this.cache = new Map();
        this.loadingPromises = new Map();
    }

    async loadImage(src) {
        if (this.cache.has(src)) {
            return this.cache.get(src);
        }

        if (this.loadingPromises.has(src)) {
            return this.loadingPromises.get(src);
        }

        const promise = new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                this.cache.set(src, img);
                this.loadingPromises.delete(src);
                resolve(img);
            };
            img.onerror = () => {
                this.loadingPromises.delete(src);
                reject(new Error(`Failed to load image: ${src}`));
            };
            img.src = src;
        });

        this.loadingPromises.set(src, promise);
        return promise;
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
        container.className = 'pagination-container';
        
        if (this.totalPages <= 1) return container;

        let html = '<div class="pagination">';
        
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
        
        html += '</div>';
        container.innerHTML = html;
        
        return container;
    }

    setCurrentPage(page) {
        this.currentPage = Math.max(1, Math.min(page, this.totalPages));
    }
}

// CLASSE AVANÇADA DE FILTROS
class FilterManager {
    constructor() {
        this.activeFilters = {
            category: 'all',
            search: '',
            priceRange: null,
            brands: []
        };
    }

    applyFilters(products) {
        return products.filter(product => {
            // Category filter
            if (this.activeFilters.category !== 'all') {
                const category = this.activeFilters.category.toLowerCase();
                const matchesCategory = product.tags.some(tag => 
                    tag.toLowerCase().includes(category)
                ) || product.brand.toLowerCase().includes(category);
                
                if (!matchesCategory) return false;
            }

            // Search filter
            if (this.activeFilters.search) {
                const searchLower = this.activeFilters.search.toLowerCase();
                const matchesSearch = product.name.toLowerCase().includes(searchLower) ||
                    product.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
                    product.brand.toLowerCase().includes(searchLower);
                
                if (!matchesSearch) return false;
            }

            // Price range filter
            if (this.activeFilters.priceRange) {
                const { min, max } = this.activeFilters.priceRange;
                if (product.price < min || product.price > max) return false;
            }

            // Brands filter
            if (this.activeFilters.brands.length > 0) {
                if (!this.activeFilters.brands.includes(product.brand)) return false;
            }

            return true;
        });
    }

    setFilter(type, value) {
        this.activeFilters[type] = value;
    }

    clearFilters() {
        this.activeFilters = {
            category: 'all',
            search: '',
            priceRange: null,
            brands: []
        };
    }
}

// SISTEMA PRINCIPAL AVANÇADO
class StreetMoodApp {
    constructor() {
        this.productRenderer = new ProductRenderer();
        this.paginationManager = new PaginationManager();
        this.filterManager = new FilterManager();
        this.imageLoader = new ImageLoader();
        this.products = [];
        this.filteredProducts = [];
    }

    async init() {
        console.log('🚀 Inicializando STREETMOOD 3.0...');
        
        try {
            await this.initializeDOM();
            this.setupEventListeners();
            await this.loadProducts();
            this.setupIntersectionObserver();
            console.log('✅ Sistema inicializado com sucesso!');
        } catch (error) {
            console.error('❌ Erro na inicialização:', error);
            this.showError('Falha ao inicializar o sistema. Tente recarregar a página.');
        }
    }

    async initializeDOM() {
        DOM.catalog = document.getElementById("catalog");
        DOM.loading = document.getElementById("loading");
        DOM.resultsCount = document.getElementById("resultsCount");
        DOM.searchInput = document.getElementById("searchInput");
        DOM.sortDropdown = document.getElementById("sortDropdown");
        DOM.header = document.getElementById("header");
        DOM.filters = document.querySelectorAll('.filter-btn');
        DOM.modal = document.getElementById("productModal");
        DOM.pagination = document.querySelector('.pagination-container');

        const requiredElements = ['catalog', 'loading', 'resultsCount'];
        const missing = requiredElements.filter(name => !DOM[name]);
        
        if (missing.length > 0) {
            throw new Error(`Elementos críticos não encontrados: ${missing.join(', ')}`);
        }
    }

    setupEventListeners() {
        // Search com debounce avançado
        if (DOM.searchInput) {
            DOM.searchInput.addEventListener('input', 
                this.debounce((e) => {
                    this.filterManager.setFilter('search', e.target.value);
                    this.applyFiltersAndRender();
                }, 300)
            );
        }

        // Sort
        if (DOM.sortDropdown) {
            DOM.sortDropdown.addEventListener('change', (e) => {
                this.sortProducts(e.target.value);
                this.applyFiltersAndRender();
            });
        }

        // Category filters
        DOM.filters.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                this.setActiveFilter(filter);
                this.filterManager.setFilter('category', filter);
                this.applyFiltersAndRender();
            });
        });

        // Modal events
        if (DOM.modal) {
            DOM.modal.addEventListener('click', (e) => {
                if (e.target === DOM.modal) {
                    this.closeModal();
                }
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });

        // Scroll effects
        window.addEventListener('scroll', this.throttle(() => {
            this.handleScroll();
        }, 16));

        // Resize handler
        window.addEventListener('resize', this.throttle(() => {
            this.handleResize();
        }, 250));
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
        this.filteredProducts = this.filterManager.applyFilters(this.products);
        this.paginationManager.calculatePagination(this.filteredProducts.length);
        this.paginationManager.setCurrentPage(1);
        this.renderProducts();
    }

    renderProducts() {
        if (!DOM.catalog) return;

        DOM.catalog.innerHTML = '';
        
        // Update results count
        if (DOM.resultsCount) {
            DOM.resultsCount.textContent = `${this.filteredProducts.length} produtos encontrados`;
        }

        // Get paginated products
        const paginatedProducts = this.paginationManager.getPaginatedItems(this.filteredProducts);
        
        // Render products
        paginatedProducts.forEach((product, index) => {
            const card = this.productRenderer.createProductCard(product, index);
            DOM.catalog.appendChild(card);
        });

        // Add pagination
        this.renderPagination();

        // Setup lazy loading
        this.setupLazyLoading();
    }

    renderPagination() {
        const existingPagination = document.querySelector('.pagination-container');
        if (existingPagination) {
            existingPagination.remove();
        }

        const paginationContainer = this.paginationManager.createPaginationControls();
        DOM.catalog.parentNode.insertBefore(paginationContainer, DOM.catalog.nextSibling);
    }

    setupLazyLoading() {
        if (!('IntersectionObserver' in window)) return;

        const images = document.querySelectorAll('.product-image[loading="lazy"]');
        
        this.imageLoader.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.loading = 'eager';
                    this.imageLoader.intersectionObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });

        images.forEach(img => {
            this.imageLoader.intersectionObserver.observe(img);
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

        mutationObserver.observe(DOM.catalog, {
            childList: true
        });
    }

    sortProducts(sortBy) {
        const sortFunctions = {
            'name': (a, b) => a.name.localeCompare(b.name),
            'price-low': (a, b) => a.price - b.price,
            'price-high': (a, b) => b.price - a.price,
            'newest': (a, b) => (b.version || 'v1').localeCompare(a.version || 'v1')
        };

        const sortFn = sortFunctions[sortBy] || sortFunctions['name'];
        this.filteredProducts.sort(sortFn);
    }

    setActiveFilter(filter) {
        DOM.filters.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
    }

    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (DOM.header) {
            DOM.header.classList.toggle('scrolled', scrollTop > 50);
        }

        // Infinite scroll (opcional)
        if (scrollTop + window.innerHeight >= document.documentElement.offsetHeight - 1000) {
            // this.loadMoreProducts();
        }
    }

    handleResize() {
        // Ajustar layout baseado no tamanho da tela
        const width = window.innerWidth;
        if (width < 768) {
            CONFIG.itemsPerPage = 8;
        } else if (width < 1024) {
            CONFIG.itemsPerPage = 9;
        } else {
            CONFIG.itemsPerPage = 12;
        }
        
        this.paginationManager.itemsPerPage = CONFIG.itemsPerPage;
        this.applyFiltersAndRender();
    }

    showError(message) {
        if (DOM.catalog) {
            DOM.catalog.innerHTML = `
                <div class="error-container">
                    <div class="error-icon">❌</div>
                    <h3>Erro</h3>
                    <p>${message}</p>
                    <button onclick="location.reload()" class="btn btn-primary">Recarregar Página</button>
                </div>
            `;
        }
    }

    closeModal() {
        if (DOM.modal) {
            DOM.modal.classList.remove('active');
            document.body.style.overflow = '';
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
    window.open(`https://www.instagram.com/direct/t/streetm00d_/?text=${message}`, '_blank');
}

async function viewProduct(productId) {
    const product = app.products.find(p => p.id === productId);
    if (!product) return;

    // Implementar modal de produto
    console.log('Visualizando produto:', product.name);
}

function changePage(page) {
    app.paginationManager.setCurrentPage(page);
    app.renderProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Inicialização
document.addEventListener('DOMContentLoaded', async () => {
    app = new StreetMoodApp();
    await app.init();
});

console.log('✅ STREETMOOD 3.0 - Sistema avançado carregado!');
