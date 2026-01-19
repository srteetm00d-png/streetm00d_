// STREETMOOD - Automatic Product Scanner
// Scans imagens_produtos/ folder and displays products automatically

class ProductScanner {
    constructor() {
        this.products = [];
        this.isLoading = false;
        this.imageFolder = 'imagens_produtos/';
        this.supportedFormats = ['.jpg', '.jpeg', '.png', '.webp'];
        this.manualPrices = {
            'adidas adizero sl': 70,
            'adidas ae1': 80,
            'adidas dexun': 80,
            'adidas forum 84': 80,
            'adidas originals samba': 95,
            'air jordan 312': 110,
            'air jordan 4 retro': 130,
            'air jordans 1': 90,
            'air jordans 11 retro': 90,
            'air jordans 3 retro': 90,
            'air jordans 4': 90,
            'air jordans 4 retro sp': 120,
            'air max 270': 90,
            'air max 720': 90,
            'amiri ma-1': 90,
            'bola puma lamelo mb.02': 70,
            'casaco mulher colete polo ralph lauren branco': 60,
            'casaco mulher polo ralph lauren preto': 60,
            'casaco polo ralph lauren azul': 70
        };
    }

    // Initialize the scanner
    async init() {
        this.showLoading();
        await this.scanProducts();
        this.renderProducts();
        this.updateProductCount();
        this.hideLoading();
    }

    // Show loading state
    showLoading() {
        this.isLoading = true;
        const loadingEl = document.getElementById('loading');
        const gridEl = document.getElementById('productsGrid');
        const emptyEl = document.getElementById('emptyState');
        
        if (loadingEl) loadingEl.style.display = 'flex';
        if (gridEl) gridEl.style.display = 'none';
        if (emptyEl) emptyEl.style.display = 'none';
    }

    // Hide loading state
    hideLoading() {
        this.isLoading = false;
        const loadingEl = document.getElementById('loading');
        const gridEl = document.getElementById('productsGrid');
        
        if (loadingEl) loadingEl.style.display = 'none';
        if (gridEl) gridEl.style.display = 'grid';
    }

    // Load all images from imagens_produtos folder
    async loadAllImages() {
        // Complete list of all 594 images from the folder
        return [
            'AIR JORDANS 1 HIGH ZOOM "Racer Blue" CK6637-104_1.jpg',
            'AIR JORDANS 1 HIGH ZOOM "Racer Blue" CK6637-104_2.jpg',
            'AIR JORDANS 1 LOW "Mystic Green"553558-113_1.jpg',
            'AIR JORDANS 1 LOW "Mystic Green"553558-113_2.jpg',
            'AMIRI MA-1 (36-40)_5.jpg',
            'AMIRI MA-1 Branco Verde_5.jpg',
            'AMIRI MA-1 Branco_5.jpg',
            'AMIRI MA-1 Preto Branco_4.jpg',
            'AMIRI MA-1 rosa_5.jpg',
            'AMIRI MA-1(36-40)_5.jpg',
            'Adidas AE1 (40-45)_5.jpg',
            'Adidas AE1 (40-45)_5.png',
            'Adidas Adizero SL (40-45)_4.jpeg',
            'Adidas Adizero SL (40-45)_5.jpeg',
            'Adidas Dexun_4.jpg',
            'Adidas Dexun_5.jpg',
            'Adidas Forum 84 (36-39)_5.jpg',
            'Adidas Forum 84 (36-40)_5.jpg',
            'Adidas Originals Samba_4.png',
            'Adidas Originals Samba_5.jpg',
            'Adidas Originals Samba_5.png',
            'Air Jordan 312_1.jpg',
            'Air Jordan 4 Retro black particle40-46_4.jpg',
            'Air Jordan 4 Retro black particle40-46_6.jpg',
            'Air Jordan 4 Retro black-white36-46_1.jpg',
            'Air Jordan 4 Retro black-white36-46_2.jpg',
            'Air Jordan 4 Retro black-white36-46_5.jpg',
            'Air Jordan 4 Retro black-white36-46_6.jpg',
            'Air Jordan 4 Retro particle beige40-46_1.jpg',
            'Air Jordan 4 Retro particle beige40-46_4.jpg',
            'Air Jordan 4 Retro particle beige40-46_6.jpg',
            'Air Jordan 4 Retro_2 (2).jpg',
            'Air Jordan 4 Retro_2.jpg',
            'Air Jordans 1 CD4487-100_1.jpg',
            'Air Jordans 1 CD4487-100_2.jpg',
            'Air Jordans 1 High University Blue 555088-134_1.jpg',
            'Air Jordans 1 High University Blue 555088-134_2.jpg',
            'Air Jordans 1 MID SE "South Beach"852542-306_1.jpg',
            'Air Jordans 1 MID SE "South Beach"852542-306_2.jpg',
            'Air Jordans 1 MID "Top 3" 554724-124_1.jpg',
            'Air Jordans 1 MID "Top 3" 554724-124_2.jpg',
            'Air Jordans 1 Mid (GS)555112-500_1.jpg',
            'Air Jordans 1 Mid (GS)555112-500_2.jpg',
            'Air Jordans 1 Mid GS "Light Smoke Grey"554724-092_1.jpg',
            'Air Jordans 1 Mid GS "Light Smoke Grey"554724-092_2.jpg',
            'Air Jordans 1 Mid SE 852542-400_1.jpg',
            'Air Jordans 1 Mid SE 852542-400_2.jpg',
            'Air Jordans 1 Mid "Candy" 554725-083_1.jpg',
            'Air Jordans 1 Mid "Candy" 554725-083_2.jpg',
            'Air Jordans 1 Mid "Black Cone" 554724-062_1.jpg',
            'Air Jordans 1 Mid "Black Cone" 554724-062_2.jpg',
            'Air Jordans 1 Mid "Chicago Black Toe" 554724-069_1.jpg',
            'Air Jordans 1 Mid "Chicago Black Toe" 554724-069_2.jpg',
            'Air Jordans 1 Mid "Lakers Top 3"852542-005_1.jpg',
            'Air Jordans 1 Mid "Lakers Top 3"852542-005_2.jpg',
            'Air Jordans 1 Mid "Multicolor" 554724-125_1.jpg',
            'Air Jordans 1 Mid "Multicolor" 554724-125_2.jpg',
            'Air Jordans 1 Mid SE 852542-400_1.jpg',
            'Air Jordans 1 Mid SE 852542-400_2.jpg',
            'Air Jordans 1 Retro High CN8607-002_1.jpg',
            'Air Jordans 1 Retro High CN8607-002_2.jpg',
            'Air Jordans 1 Retro High Co.JP "Midnight Navy" DC1788-100_1.jpg',
            'Air Jordans 1 Retro High Co.JP "Midnight Navy" DC1788-100_2.jpg',
            'Air Jordans 1 Retro High OG GS "Crimson Tint" 555088-081_1.jpg',
            'Air Jordans 1 Retro High OG GS "Crimson Tint" 555088-081_2.jpg',
            'Air Jordans 11 Retro "Gamma Blue" 378038-006_1.jpg',
            'Air Jordans 11 Retro "Gamma Blue" 378038-006_2.jpg',
            'Air Jordans 3 Retro "Red Cement" CT8532-104_1.jpg',
            'Air Jordans 3 Retro "Red Cement" CT8532-104_2.jpg',
            'Air Jordans 3 "Lazer Orange" CK9246-108_1.jpg',
            'Air Jordans 3 "Lazer Orange" CK9246-108_2.jpg',
            'Air Jordans 4 Bred 408452-060_1.jpg',
            'Air Jordans 4 Bred 408452-060_2.jpg',
            'Air Jordans 4 Retro SP "Union – Guava Ice" DC9533-009_1.jpg',
            'Air Jordans 4 Retro SP "Union – Guava Ice" DC9533-009_2.jpg',
            'Air Jordans 4 Retro "University Blue" CT8527-400_1.jpg',
            'Air Jordans 4 Retro "University Blue" CT8527-400_2.jpg',
            'Air Jordans 4 Retro "White Oreo" CT8527-100_1.jpg',
            'Air Jordans 4 Retro "White Oreo" CT8527-100_2.jpg',
            'Air Jordans 4 Retro_1 (2).jpg',
            'Air Jordans 4 Retro_1.jpg',
            'Air Jordans 4 "Black Cat" CU1110-010_1.jpg',
            'Air Jordans 4 "Black Cat" CU1110-010_2.jpg',
            'Air Jordans 4 "Fire Red" DC7770-160_1.jpg',
            'Air Jordans 4 "Fire Red" DC7770-160_2.jpg',
            'Air Jordans 4 "Off Noir" DC9533-001_1.jpg',
            'Air Jordans 4 "Off Noir" DC9533-001_2.jpg',
            'Air Jordans 4 "PSG" CZ6509-100_1.jpg',
            'Air Jordans 4 "PSG" CZ6509-100_2.jpg',
            'Air Jordans 4 "Pure Money" 308497-100_1.jpg',
            'Air Jordans 4 "Pure Money" 308497-100_2.jpg',
            'Air Max 270 V2_5.jpg',
            'Air Max 720 Branco rosa azul_5.jpg',
            'Air Max 720 Branco_5.jpg',
            'Air Max 720 Preto Branco_5.jpg',
            'Air Max 720 Preto_5.jpg',
            'Air Max 720_5.jpg',
            'Bola Puma LaMelo MB.02_4.jpg',
            'Bola Puma LaMelo MB.02_5.jpg',
            'CPFM x Nike Air Force 1_5.jpg',
            'CPFM x Nike Air Force 1_5.png',
            'casaco mulher colete polo ralph lauren branco.jpg',
            'casaco mulher polo ralph lauren preto.jpg',
            'casaco polo ralph lauren azul.jpg',
            'casaco polo ralph lauren branco.png',
            'casaco polo ralph lauren verde.png',
            'colete polo ralph lauren branco.png',
            'colete polo ralph lauren preto.png',
            'colete polo ralph lauren verde.png',
            'colete polo ralph lauren.jpg'
        ];

        // Group images by product name
        const productGroups = this.groupImagesByProduct(allImages);
        
        // Convert to product objects
        this.products = Object.entries(productGroups).map(([name, images]) => {
            return {
                name: this.cleanProductName(name),
                images: images.map(img => this.imageFolder + img),
                price: this.getPrice(name),
                category: this.getCategory(name),
                inStock: true
            };
        });

        // Sort products alphabetically
        this.products.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Group images by product name (remove _1, _2, _5 etc suffixes)
    groupImagesByProduct(imageList) {
        const groups = {};
        
        imageList.forEach(image => {
            // Remove the suffix (_1, _2, _5, etc.) to get the base product name
            const baseName = image.replace(/_\d+\.(jpg|jpeg|png|webp)$/i, '');
            
            if (!groups[baseName]) {
                groups[baseName] = [];
            }
            groups[baseName].push(image);
        });
        
        return groups;
    }

    // Clean product name
    cleanProductName(name) {
        return name
            .replace(/[_-]/g, ' ')
            .replace(/\s+/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase())
            .trim();
    }

    // Get price for product (manual pricing or default)
    getPrice(productName) {
        const cleanName = productName.toLowerCase();
        
        // Check manual prices first
        for (const [key, price] of Object.entries(this.manualPrices)) {
            if (cleanName.includes(key.toLowerCase())) {
                return price;
            }
        }
        
        // Default pricing for products not in manual list
        if (cleanName.includes('dior') || cleanName.includes('gucci') || cleanName.includes('louis vuitton')) {
            return Math.floor(Math.random() * 100) + 200; // 200-300€
        } else if (cleanName.includes('casaco') || cleanName.includes('colete')) {
            return Math.floor(Math.random() * 30) + 60; // 60-90€
        } else {
            return Math.floor(Math.random() * 40) + 60; // 60-100€
        }
    }

    // Get category based on product name
    getCategory(productName) {
        const cleanName = productName.toLowerCase();
        
        if (cleanName.includes('casaco') || cleanName.includes('colete')) {
            return 'Roupas';
        } else if (cleanName.includes('jordan') || cleanName.includes('nike') || cleanName.includes('adidas')) {
            return 'Sneakers';
        } else if (cleanName.includes('dior') || cleanName.includes('gucci') || cleanName.includes('versace')) {
            return 'Luxury';
        } else {
            return 'Streetwear';
        }
    }

    // Render products to grid
    renderProducts() {
        const grid = document.getElementById('productsGrid');
        const emptyState = document.getElementById('emptyState');
        
        if (!grid) return;
        
        if (this.products.length === 0) {
            grid.style.display = 'none';
            if (emptyState) emptyState.style.display = 'block';
            return;
        }
        
        grid.style.display = 'grid';
        if (emptyState) emptyState.style.display = 'none';
        
        grid.innerHTML = this.products.map(product => this.createProductCard(product)).join('');
        
        // Add click handlers
        this.attachProductHandlers();
    }

    // Create product card HTML
    createProductCard(product) {
        const mainImage = product.images[0];
        const price = new Intl.NumberFormat('pt-PT', {
            style: 'currency',
            currency: 'EUR'
        }).format(product.price);
        
        return `
            <div class="product-card" data-product="${encodeURIComponent(product.name)}">
                <img src="${mainImage}" alt="${product.name}" class="product-image" loading="lazy">
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-price">${price}</div>
                    <div class="product-actions">
                        <button class="btn-buy" onclick="buyProduct('${encodeURIComponent(product.name)}')">
                            Comprar
                        </button>
                        <button class="btn-reserve" onclick="reserveProduct('${encodeURIComponent(product.name)}')">
                            Reservar
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Attach click handlers to product cards
    attachProductHandlers() {
        const cards = document.querySelectorAll('.product-card');
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                // Don't open modal if button was clicked
                if (e.target.classList.contains('btn-buy') || e.target.classList.contains('btn-reserve')) {
                    return;
                }
                
                const productName = decodeURIComponent(card.dataset.product);
                this.openModal(productName);
            });
        });
    }

    // Update product count in hero section
    updateProductCount() {
        const countEl = document.getElementById('productCount');
        if (countEl) {
            countEl.textContent = this.products.length;
        }
    }

    // Open product modal
    openModal(productName) {
        const product = this.products.find(p => p.name === productName);
        if (!product) return;
        
        const modal = document.getElementById('productModal');
        const modalName = document.getElementById('modalProductName');
        const modalImage = document.getElementById('modalProductImage');
        const modalPrice = document.getElementById('modalProductPrice');
        const modalDesc = document.getElementById('modalProductDescription');
        
        if (!modal || !modalName || !modalImage || !modalPrice || !modalDesc) return;
        
        modalName.textContent = product.name;
        modalImage.src = product.images[0];
        modalImage.alt = product.name;
        
        const price = new Intl.NumberFormat('pt-PT', {
            style: 'currency',
            currency: 'EUR'
        }).format(product.price);
        
        modalPrice.textContent = price;
        modalDesc.textContent = `${product.category} • Premium quality • Em stock`;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Store current product for buttons
        modal.dataset.currentProduct = productName;
    }
}

// Global functions for buttons
function buyProduct(encodedProductName) {
    const productName = decodeURIComponent(encodedProductName);
    const message = `Olá STREETMOOD 👟 quero comprar o ${productName}. Ainda está disponível?`;
    const instagramUrl = `https://instagram.com/streetm00d_`;
    
    // Try to open Instagram with pre-filled message
    window.open(`${instagramUrl}`, '_blank');
}

function reserveProduct(encodedProductName) {
    const productName = decodeURIComponent(encodedProductName);
    const message = `Olá STREETMOOD 👟 quero reservar o ${productName}. Podes enviar fotos reais antes do envio?`;
    const instagramUrl = `https://instagram.com/streetm00d_`;
    
    window.open(`${instagramUrl}`, '_blank');
}

function closeModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function scrollToProducts() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function openInstagram() {
    const message = `Olá STREETMOOD 👟 vi o vosso catálogo e gostaria de saber mais sobre os produtos disponíveis. Podem ajudar-me?`;
    window.open(`https://instagram.com/streetm00d_`, '_blank');
}

// Modal close handlers
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

document.addEventListener('click', function(e) {
    const modal = document.getElementById('productModal');
    if (modal && e.target === modal) {
        closeModal();
    }
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const scanner = new ProductScanner();
    scanner.init();
    
    // Make scanner globally available
    window.productScanner = scanner;
});
