// STREETMOOD 2.0 - Sistema Profissional
console.log('🚀 Iniciando STREETMOOD 2.0...');

const CONFIG = { imageFolder: "./imagens_produtos/", apiEndpoint: "./products.json" };
const ELEMENTS = { catalog: null, loading: null, resultsCount: null };
const STATE = { products: [], filteredProducts: [], currentFilter: 'all' };

document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    loadProducts();
});

function initializeElements() {
    ELEMENTS.catalog = document.getElementById("catalog");
    ELEMENTS.loading = document.getElementById("loading");
    ELEMENTS.resultsCount = document.getElementById("resultsCount");
}

async function loadProducts() {
    try {
        const response = await fetch(CONFIG.apiEndpoint);
        const data = await response.json();
        STATE.products = Object.entries(data);
        STATE.filteredProducts = [...STATE.products];
        
        if (ELEMENTS.loading) ELEMENTS.loading.style.display = 'none';
        renderProducts();
    } catch (error) {
        console.error('Erro:', error);
        if (ELEMENTS.catalog) {
            ELEMENTS.catalog.innerHTML = '<div style="text-align:center;padding:60px;"><h3>Erro ao carregar</h3></div>';
        }
    }
}

function renderProducts() {
    if (!ELEMENTS.catalog) return;
    
    ELEMENTS.catalog.innerHTML = '';
    if (ELEMENTS.resultsCount) {
        ELEMENTS.resultsCount.textContent = `${STATE.filteredProducts.length} produtos encontrados`;
    }
    
    STATE.filteredProducts.forEach(([key, product]) => {
        const card = createProductCard(key, product);
        ELEMENTS.catalog.appendChild(card);
    });
}

function createProductCard(key, product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image-container">
            <img src="${CONFIG.imageFolder + (product.images[0] || key + '.jpg')}" alt="${product.name}">
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <div class="product-price">€${product.price}</div>
            <button class="btn btn-primary" onclick="quickBuy('${product.name}', ${product.price})">Comprar</button>
        </div>
    `;
    return card;
}

function quickBuy(name, price) {
    const message = encodeURIComponent(`Olá STREETMOOD 👟 quero comprar o ${name} ainda está disponível?`);
    window.open(`https://www.instagram.com/direct/t/streetm00d_/?text=${message}`, '_blank');
}

console.log('✅ Sistema carregado!');
