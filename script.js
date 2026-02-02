// CATÁLOGO STREETMOOD COM MODAL DE DETALHES

const imageFolder = "./imagens_produtos/";
const catalog = document.getElementById("catalog");
let currentProduct = null;
let currentSlide = 0;
let productImages = [];

// Carregar produtos
document.addEventListener('DOMContentLoaded', function() {
    loadCatalog();
});

function loadCatalog() {
    fetch("./products.json")
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP ${res.status} ao carregar products.json`);
            }
            return res.json();
        })
        .then(products => {
            Object.entries(products).forEach(([key, data]) => {
                createProductCard(key, data);
            });
        })
        .catch(err => {
            console.error("Erro ao carregar catálogo:", err);
            catalog.innerHTML = `
                <div style="text-align:center;padding:60px;color:#666;grid-column:1/-1">
                    Catálogo indisponível no momento.
                </div>
            `;
        });
}

function createProductCard(key, data) {
    const card = document.createElement("div");
    card.className = "product-card";
    card.onclick = () => openProductModal(key, data);
    
    card.innerHTML = `
        <img
            loading="lazy"
            src="${imageFolder + (data.images ? data.images[0] : key + '.jpg')}"
            alt="${data.name}"
            onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDIwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjZjBmMGYwIi8+CjxwYXRoIGQ9Ik04MCA5MEgxMjBWMTIwSDgwVjkwWiIgZmlsbD0iIzMzMzMzMyIvPgo8cGF0aCBkPSJNNjAgMTQwSDE0MFYxNjBINjBWMTQwWiIgZmlsbD0iIzMzMzMzMyIvPgo8L3N2Zz4='"
        >
        <div class="product-info">
            <h3 class="product-name">${data.name}</h3>
            <p class="product-price">${data.currency || '€'} ${data.price}</p>
            <button class="contact-btn" onclick="event.stopPropagation(); contactProduct('${data.name}', '${data.currency || '€'} ${data.price}')">
                ENVIAR MENSAGEM
            </button>
        </div>
    `;
    
    catalog.appendChild(card);
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
    document.getElementById('modalTitle').textContent = data.name;
    document.getElementById('productName').textContent = data.name;
    document.getElementById('productPrice').textContent = `${data.currency || '€'} ${data.price}`;
    document.getElementById('productSize').textContent = data.size ? `Tamanho: ${data.size}` : 'Tamanho: Único';
    document.getElementById('productDescription').textContent = data.description || `${data.name} - Produto premium da STREETMOOD. Qualidade garantida e estilo exclusivo.`;
    
    // Carregar carrossel
    loadCarousel();
    
    // Mostrar modal
    document.getElementById('productModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

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
        slide.innerHTML = `<img src="${imgSrc}" alt="Imagem ${index + 1}">`;
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
    
    const message = encodeURIComponent(`Olá STREETMOOD! Quero COMPRAR o ${currentProduct.name} (${currentProduct.currency || '€'}${currentProduct.price}). Ainda está disponível?`);
    window.open(`https://wa.me/351912345678?text=${message}`, '_blank');
}

function reserveProduct() {
    if (!currentProduct) return;
    
    const message = encodeURIComponent(`Olá STREETMOOD! Quero RESERVAR o ${currentProduct.name} (${currentProduct.currency || '€'}${currentProduct.price}). Pode enviar mais fotos?`);
    window.open(`https://wa.me/351912345678?text=${message}`, '_blank');
}

// Contato direto do card
function contactProduct(name, price) {
    const message = encodeURIComponent(`Olá STREETMOOD! Tenho interesse no ${name} (${price}).`);
    window.open(`https://wa.me/351912345678?text=${message}`, '_blank');
}

// Fechar modal com ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Fechar modal clicando fora
document.getElementById('productModal').addEventListener('click', function(e) {
    if (e.target === this) {
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
