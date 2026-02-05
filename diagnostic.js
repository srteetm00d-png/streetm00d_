// Script de diagnóstico para STREETMOOD 2.0

console.log('=== INICIANDO DIAGNÓSTICO DO SITE ===');

// Verificar elementos DOM
const catalog = document.getElementById("catalog");
const loading = document.getElementById("loading");
const resultsCount = document.getElementById("resultsCount");
const searchInput = document.getElementById("searchInput");
const sortDropdown = document.getElementById("sortDropdown");
const header = document.getElementById("header");

console.log('Elementos DOM:', {
    catalog: !!catalog,
    loading: !!loading,
    resultsCount: !!resultsCount,
    searchInput: !!searchInput,
    sortDropdown: !!sortDropdown,
    header: !!header
});

// Verificar se o products.json está acessível
fetch("./products.json")
    .then(response => {
        console.log('Status do products.json:', response.status, response.statusText);
        return response.json();
    })
    .then(data => {
        console.log('Products.json carregado com sucesso');
        console.log('Número de produtos:', Object.keys(data).length);
        
        // Verificar estrutura de alguns produtos
        const products = Object.entries(data);
        console.log('Primeiro produto:', products[0]);
        console.log('Último produto:', products[products.length - 1]);
        
        // Verificar se há imagens
        const firstProduct = products[0][1];
        console.log('Imagens do primeiro produto:', firstProduct.images);
        
        // Testar uma imagem
        if (firstProduct.images && firstProduct.images.length > 0) {
            const imgPath = "./imagens_produtos/" + firstProduct.images[0];
            console.log('Testando imagem:', imgPath);
            
            const img = new Image();
            img.onload = () => console.log('Imagem carregada com sucesso');
            img.onerror = () => console.error('Erro ao carregar imagem:', imgPath);
            img.src = imgPath;
        }
    })
    .catch(error => {
        console.error('Erro ao carregar products.json:', error);
    });

// Verificar CSS
const styles = getComputedStyle(document.body);
console.log('Font-family:', styles.fontFamily);
console.log('Background:', styles.backgroundColor);

// Verificar se há erros no console
window.addEventListener('error', function(e) {
    console.error('Erro capturado:', e.error);
});

// Verificar se há warnings no console
window.addEventListener('unhandledrejection', function(e) {
    console.error('Promise rejeitada:', e.reason);
});

// Testar funções principais
setTimeout(() => {
    console.log('=== TESTANDO FUNÇÕES ===');
    
    // Verificar se as funções existem
    console.log('Funções disponíveis:', {
        loadCatalog: typeof loadCatalog,
        setupEventListeners: typeof setupEventListeners,
        filterAndRenderProducts: typeof filterAndRenderProducts,
        createProductCard: typeof createProductCard,
        detectBrand: typeof detectBrand,
        getBadge: typeof getBadge
    });
    
    // Verificar variáveis globais
    console.log('Variáveis globais:', {
        allProducts: typeof allProducts,
        filteredProducts: typeof filteredProducts,
        currentFilter: typeof currentFilter,
        currentSort: typeof currentSort
    });
    
    // Se o catálogo estiver vazio, tentar carregar manualmente
    if (catalog && catalog.children.length === 1 && catalog.children[0].classList.contains('loading')) {
        console.log('Catálogo ainda está em loading, tentando carregar manualmente...');
        if (typeof loadCatalog === 'function') {
            loadCatalog();
        }
    }
}, 2000);

// Verificar performance
setTimeout(() => {
    console.log('=== PERFORMANCE ===');
    const perfData = performance.getEntriesByType('navigation')[0];
    console.log('Tempo de carregamento:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
    
    const resources = performance.getEntriesByType('resource');
    console.log('Recursos carregados:', resources.length);
    
    const cssResources = resources.filter(r => r.name.includes('.css'));
    const jsResources = resources.filter(r => r.name.includes('.js'));
    
    console.log('Arquivos CSS:', cssResources.length);
    console.log('Arquivos JS:', jsResources.length);
}, 3000);

console.log('=== DIAGNÓSTICO INICIADO ===');
