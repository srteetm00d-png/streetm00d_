// STREETMOOD 2.0 - SISTEMA MODERNO DE CATÁLOGO

const imageFolder = "./imagens_produtos/";
const catalog = document.getElementById("catalog");
const loading = document.getElementById("loading");
const resultsCount = document.getElementById("resultsCount");
const searchInput = document.getElementById("searchInput");
const sortDropdown = document.getElementById("sortDropdown");
const header = document.getElementById("header");

let currentProduct = null;
let currentSlide = 0;
let productImages = [];
let allProducts = [];
let filteredProducts = [];

// Variáveis globais
let currentFilter = 'all';
let currentSort = 'name';

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    loadCatalog();
    setupEventListeners();
    setupScrollEffects();
});

// Configurar event listeners
function setupEventListeners() {
    // Filtros
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            filterAndRenderProducts();
        });
    });
    
    // Sort
    sortDropdown.addEventListener('change', function() {
        currentSort = this.value;
        filterAndRenderProducts();
    });
    
    // Search
    searchInput.addEventListener('input', debounce(function() {
        filterAndRenderProducts();
    }, 300));
    
    // Fechar modal com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    // Navegação por teclado no carrossel
    document.addEventListener('keydown', function(e) {
        const modal = document.getElementById('productModal');
        if (modal.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                changeSlide(-1);
            } else if (e.key === 'ArrowRight') {
                changeSlide(1);
            }
        }
    });
    
    // Fechar modal clicando fora
    document.getElementById('productModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
}

// Efeito de scroll no header
function setupScrollEffects() {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Debounce para search
function debounce(func, wait) {
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

// Carregar produtos
async function loadCatalog() {
    try {
        const response = await fetch("./products.json");
        if (!response.ok) {
            throw new Error(`HTTP ${response.status} ao carregar products.json`);
        }
        
        allProducts = await response.json();
        filteredProducts = Object.entries(allProducts);
        
        // Esconder loading
        loading.style.display = 'none';
        
        // Renderizar produtos
        filterAndRenderProducts();
        
    } catch (error) {
        console.error("Erro ao carregar catálogo:", error);
        loading.innerHTML = `
            <div style="text-align:center;padding:60px;color:#666;grid-column:1/-1">
                <h3>Erro ao carregar catálogo</h3>
                <p>Tente recarregar a página.</p>
            </div>
        `;
    }
}

// Filtrar e renderizar produtos
function filterAndRenderProducts() {
    let products = Object.entries(allProducts);
    
    // Aplicar filtro
    if (currentFilter !== 'all') {
        products = products.filter(([key, data]) => {
            const tags = data.tags || [];
            const brand = data.name.toLowerCase();
            const filter = currentFilter.toLowerCase();
            
            return tags.some(tag => tag.toLowerCase().includes(filter)) || 
                   brand.includes(filter);
        });
    }
    
    // Aplicar busca
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm) {
        products = products.filter(([key, data]) => {
            return data.name.toLowerCase().includes(searchTerm) ||
                   (data.tags && data.tags.some(tag => tag.toLowerCase().includes(searchTerm)));
        });
    }
    
    // Aplicar ordenação
    products = sortProducts(products, currentSort);
    
    filteredProducts = products;
    renderProducts(products);
}

// Ordenar produtos
function sortProducts(products, sortType) {
    return products.sort(([keyA, dataA], [keyB, dataB]) => {
        switch(sortType) {
            case 'name':
                return dataA.name.localeCompare(dataB.name);
            case 'price-low':
                return dataA.price - dataB.price;
            case 'price-high':
                return dataB.price - dataA.price;
            case 'newest':
                return (dataB.version || 'v1').localeCompare(dataA.version || 'v1');
            default:
                return 0;
        }
    });
}

// Renderizar produtos
function renderProducts(products) {
    // Limpar catálogo
    catalog.innerHTML = '';
    
    // Atualizar contador
    resultsCount.textContent = `${products.length} produtos encontrados`;
    
    // Renderizar cada produto
    products.forEach(([key, data], index) => {
        createProductCard(key, data, index);
    });
    
    // Adicionar animação de entrada
    setTimeout(() => {
        document.querySelectorAll('.product-card').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }, 100);
}

// Criar card de produto
function createProductCard(key, data, index) {
    const card = document.createElement("div");
    card.className = "product-card";
    card.onclick = () => openProductModal(key, data);
    
    // Detectar marca para o badge
    const brand = detectBrand(data.name);
    const badge = getBadge(data);
    
    card.innerHTML = `
        ${badge ? `<div class="product-badge">${badge}</div>` : ''}
        <div class="product-image-container">
            <img
                loading="lazy"
                src="${imageFolder + (data.images ? data.images[0] : key + '.jpg')}"
                alt="${data.name}"
                onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zz4KPHA+ZCBkPSJNODAgOTBIMTIwVjEyMEg0MFoiIGZpbGw9IiNmMGYwZjAiLzQKPHA+ZCBkPSJNODAgMTQwSDE0MFYxNjBINjAiIGZpbGw9IiMzMzMzMzMiLzQKPHA+ZCBkPSJNODAgMTQwSDEwMFYxNjBINjAiIGZpbGw9IiMzMzMzMzMiLzQKPC9zdmc+'"
            >
            <div class="product-quick-view">Ver Detalhes</div>
        </div>
        <div class="product-info">
            <div class="product-brand">${brand}</div>
            <h3 class="product-name">${data.name}</h3>
            <div class="product-price-row">
                <span class="product-price">${data.currency || '€'} ${data.price}</span>
            </div>
            <div class="product-actions">
                <button class="btn btn-primary" onclick="event.stopPropagation(); quickBuy('${data.name}', '${data.currency || '€'} ${data.price}')">
                    Comprar
                </button>
                <button class="btn btn-secondary" onclick="event.stopPropagation(); openProductModal('${key}', ${JSON.stringify(data).replace(/"/g, '&quot;')})">
                    Ver
                </button>
            </div>
        </div>
    `;
    
    catalog.appendChild(card);
}

// Detectar marca
function detectBrand(productName) {
    const name = productName.toLowerCase();
    if (name.includes('nike') || name.includes('air') || name.includes('dunk') || name.includes('force')) return 'NIKE';
    if (name.includes('adidas') || name.includes('yeezy') || name.includes('ultra')) return 'ADIDAS';
    if (name.includes('jordan')) return 'JORDAN';
    if (name.includes('balenciaga') || name.includes('triple') || name.includes('speed')) return 'BALENCIAGA';
    if (name.includes('gucci') || name.includes('tennis')) return 'GUCCI';
    if (name.includes('dior')) return 'DIOR';
    if (name.includes('versace')) return 'VERSACE';
    if (name.includes('supreme')) return 'SUPREME';
    if (name.includes('stone island')) return 'STONE ISLAND';
    if (name.includes('fear of god')) return 'FEAR OF GOD';
    if (name.includes('rick owens')) return 'RICK OWENS';
    if (name.includes('givenchy')) return 'GIVENCHY';
    if (name.includes('prada')) return 'PRADA';
    if (name.includes('valentino')) return 'VALENTINO';
    if (name.includes('bottega')) return 'BOTTEGA VENETA';
    if (name.includes('puma') || name.includes('clyde')) return 'PUMA';
    if (name.includes('new balance')) return 'NEW BALANCE';
    if (name.includes('asics')) return 'ASICS';
    if (name.includes('vans')) return 'VANS';
    if (name.includes('converse')) return 'CONVERSE';
    if (name.includes('reebok')) return 'REEBOK';
    if (name.includes('timberland')) return 'TIMBERLAND';
    if (name.includes('dr. martens')) return 'DR. MARTENS';
    if (name.includes('skechers')) return 'SKECHERS';
    if (name.includes('crocs')) return 'CROCS';
    if (name.includes('birkenstock')) return 'BIRKENSTOCK';
    if (name.includes('toms')) return 'TOMS';
    if (name.includes('under armour')) return 'UNDER ARMOUR';
    return 'STREETMOOD';
}

// Obter badge
function getBadge(data) {
    if (data.price > 150) return 'LUXURY';
    if (data.price > 100) return 'PREMIUM';
    if (data.tags && data.tags.includes('new')) return 'NEW';
    if (data.tags && data.tags.includes('limited')) return 'LIMITED';
    return null;
}

// Modal de Detalhes
function openProductModal(key, data) {
    currentProduct = data;
    currentSlide = 0;
    
    // Preparar imagens
    if (data.images && data.images.length > 0) {
        productImages = data.images.map(img => imageFolder + img);
    } else {
        productImages = [imageFolder + key + '.jpg'];
    }
    
    // Atualizar informações do modal
    const brand = detectBrand(data.name);
    document.getElementById('modalBrand').textContent = brand;
    document.getElementById('modalTitle').textContent = data.name;
    document.getElementById('modalPrice').textContent = `${data.currency || '€'} ${data.price}`;
    document.getElementById('modalDescription').textContent = data.description || `${data.name} - Produto premium da STREETMOOD. Qualidade garantida e estilo exclusivo.`;
    
    // Carregar carrossel
    loadCarousel();
    
    // Mostrar modal
    document.getElementById('productModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Carrossel
function loadCarousel() {
    const track = document.getElementById('carouselTrack');
    const dots = document.getElementById('carouselDots');
    
    // Limpar carrossel
    track.innerHTML = '';
    dots.innerHTML = '';
    
    // Adicionar imagens
    productImages.forEach((imgSrc, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.innerHTML = `<img src="${imgSrc}" alt="Imagem ${index + 1}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zz4KPHA+ZCBkPSJNODAgOTBIMTIwVjEyMEg0MFoiIGZpbGw9IiNmMGYwZjAiLzQKPHA+ZCBkPSJNODAgMTQwSDEwMFYxNjBINjAiIGZpbGw9IiMzMzMzMzMiLzQKPHA+ZCBkPSJNODAgMTQwSDEwMFYxNjBINjAiIGZpbGw9IiMzMzMzMzMiLzQKPC9zdmc+'">`;
        track.appendChild(slide);
        
        // Adicionar dot
        const dot = document.createElement('span');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        dot.onclick = () => goToSlide(index);
        dots.appendChild(dot);
    });
    
    updateCarousel();
}

function updateCarousel() {
    const track = document.getElementById('carouselTrack');
    const dots = document.querySelectorAll('.dot');
    
    // Mover carrossel
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Atualizar dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function changeSlide(direction) {
    currentSlide += direction;
    
    if (currentSlide < 0) {
        currentSlide = productImages.length - 1;
    } else if (currentSlide >= productImages.length) {
        currentSlide = 0;
    }
    
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

function closeModal() {
    document.getElementById('productModal').classList.remove('active');
    document.body.style.overflow = '';
    currentProduct = null;
    productImages = [];
}

// Ações do Modal
function buyProduct() {
    if (!currentProduct) return;
    
    const message = encodeURIComponent(`Olá STREETMOOD 👟 quero comprar o ${currentProduct.name} ainda está disponível?`);
    window.open(`https://www.instagram.com/direct/t/streetm00d_/?text=${message}`, '_blank');
}

function reserveProduct() {
    if (!currentProduct) return;
    
    const message = encodeURIComponent(`Olá STREETMOOD 👟 quero reservar o ${currentProduct.name}. Podes enviar fotos reais antes do envio?`);
    window.open(`https://www.instagram.com/direct/t/streetm00d_/?text=${message}`, '_blank');
}

// Compra rápida
function quickBuy(name, price) {
    const message = encodeURIComponent(`Olá STREETMOOD 👟 quero comprar o ${name} ainda está disponível?`);
    window.open(`https://www.instagram.com/direct/t/streetm00d_/?text=${message}`, '_blank');
}

// Filtrar produtos (para footer)
function filterProducts(filter) {
    currentFilter = filter;
    
    // Atualizar botões
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        }
    });
    
    // Scroll para o catálogo
    document.querySelector('.catalog-section').scrollIntoView({ behavior: 'smooth' });
    
    // Aplicar filtro
    filterAndRenderProducts();
}

// Verificar imagens quebradas
function verifyImages() {
    const images = document.querySelectorAll('.product-card img');
    let brokenImages = 0;
    
    images.forEach(img => {
        if (img.naturalWidth === 0) {
            brokenImages++;
            img.style.opacity = '0.5';
            img.style.border = '2px dashed #ff4757';
        }
    });
    
    if (brokenImages > 0) {
        console.warn(`${brokenImages} imagens quebradas encontradas`);
    }
}

// Verificar produtos sem imagem
function verifyProductImages() {
    const products = Object.entries(allProducts);
    let missingImages = [];
    
    products.forEach(([key, data]) => {
        const imagePaths = data.images || [key + '.jpg'];
        
        imagePaths.forEach(imagePath => {
            const img = new Image();
            img.src = imageFolder + imagePath;
            
            img.onerror = () => {
                missingImages.push({
                    product: data.name,
                    image: imagePath,
                    path: imageFolder + imagePath
                });
            };
        });
    });
    
    if (missingImages.length > 0) {
        console.warn('Imagens ausentes:', missingImages);
        return missingImages;
    }
    
    return [];
}

// Função de diagnóstico
function diagnoseSite() {
    console.log('=== DIAGNÓSTICO DO SITE ===');
    console.log('Total de produtos:', Object.keys(allProducts).length);
    console.log('Filtro atual:', currentFilter);
    console.log('Ordenação atual:', currentSort);
    console.log('Termo de busca:', searchInput.value);
    
    const missingImages = verifyProductImages();
    if (missingImages.length > 0) {
        console.error('PROBLEMA: Imagens ausentes encontradas');
    }
    
    setTimeout(verifyImages, 2000);
}

// Executar diagnóstico após carregar
setTimeout(diagnoseSite, 3000);
