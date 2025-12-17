const fs = require('fs');
const path = require('path');

// Preços fornecidos pelo usuário (em USD)
const prices = {
    // Roupas
    'Conjunto Nike NSW Tech Fleece Sportswear': 58,
    'Conjunto de roupa esportiva NOCTA x Nike NSW Tech Fleece': 58,
    'The North Face': 95,
    'SynaWord': 49,
    'tears': 49,
    'Trapstar': 49,
    // Morant
    'Morant 3rd generation': 38,
    'Morant 2ª geração': 38,
    'Morant 1ª geração': 38,
    // Air Jordan 4
    'Air Jordan 4 Retro bege partícula': 38,
    'Air Jordan 4 Retro preto e branco': 38,
    'Air Jordan 5': 39,
    'Air Jordan 1': 31,
    'Air Jordans 3': 35,
    'Air Jordan 4': 53,
    'Air Jordan 4 Retro': 53,
    'Air Jordan 11': 31,
    'Air Jordan 13': 36,
    // Nike Air Max Plus
    'Nike Air Max Plus Tn Preto+Branco 9908-23 (40-46)': 40,
    'Nike Air Max Plus Tn (36-40)': 34,
    // NOCTA
    'Nocta Hot Step': 51,
    'NOCTA x Nike Air Force 1 Love You Forever Rosa': 41,
    'CPFM x Nike Air Force 1': 49,
    'Nike Air Max 2021': 35,
    'Nike Air Max 95': 39,
    'Air More Uptempo': 40,
    'Nike Shox Ride 2': 50,
    'shox tl': 45,
    'Nike NOCTA Glide Drake': 45,
    'Nike Air Zoom Alphafly NEXT% 3': 55,
    'Nike Air Zoom Alphafly NEXT% 2': 47,
    'Nike Air Zoom Alphafly NEXT% 1': 47,
    'Air Max 720': 39,
    'Air Max 270': 27,
    // Adidas/Yeezy
    'Tênis Yeezy Boost 750': 89,
    'Adidas SAMBA OG': 35,
    'Adidas AE1 (40-45)': 45,
    'YEEZY 450': 43,
    'Adidas Dexun': 29,
    // Gucci
    'Gucci Rhyton': 40,
    'Tênis Gucci Tennis 1977 Cano Alto GG': 40,
    'Tênis Gucci 1977 GG Canvas': 40,
    // Versace
    'Versace Chain Reaction 2': 42,
    'VEJA Campo Unissex': 36,
    'AMIRI MA-1(36-45)': 58
};

// Taxa de conversão USD para EUR (aproximadamente 0.92)
const USD_TO_EUR = 0.92;

// Função para normalizar nome do produto
function normalizeProductName(name) {
    return name
        .toLowerCase()
        .replace(/['"]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

// Função para extrair tamanho do nome
function extractSize(name) {
    // Padrões: (40-45), (XS-2XL), (M-2XL), 40-45, etc.
    const sizeMatch = name.match(/\(([^)]+)\)/);
    if (sizeMatch) {
        return sizeMatch[1];
    }
    const sizeMatch2 = name.match(/(\d{2}-\d{2})/);
    if (sizeMatch2) {
        return sizeMatch2[1];
    }
    return null;
}

// Função para limpar nome do produto (remover tamanhos, códigos, etc.)
function cleanProductName(name) {
    let cleaned = name
        .replace(/\([^)]+\)/g, '') // Remove (40-45), (XS-2XL), etc.
        .replace(/\d{2}-\d{2}/g, '') // Remove 40-45, 36-46, etc.
        .replace(/_\d+\.(jpg|jpeg|png)$/i, '') // Remove _1.jpg, _2.jpg, etc.
        .replace(/\.(jpg|jpeg|png)$/i, '') // Remove extensão
        .replace(/\s+/g, ' ')
        .trim();
    return cleaned;
}

// Função para obter nome base do produto (sem cores)
function getBaseName(name) {
    const colors = ['azul', 'preto', 'branco', 'vermelho', 'rosa', 'verde', 'amarelo', 'cinza', 'bege', 'marrom', 'laranja', 'roxo', 'dourado', 'prata', 'dourado', 'amarelo', 'branco', 'preto', 'vermelho', 'azul', 'verde', 'rosa', 'cinza', 'bege', 'marrom', 'laranja', 'roxo', 'prata'];
    let base = name.toLowerCase();
    
    // Remove cores comuns
    for (const color of colors) {
        const regex = new RegExp(`\\b${color}\\b`, 'gi');
        base = base.replace(regex, '').trim();
    }
    
    // Remove variações de cor como "preto e branco", "branco preto", etc.
    base = base.replace(/\b(preto|branco|azul|vermelho|verde|rosa|amarelo|cinza|bege|marrom|laranja|roxo|dourado|prata)\s*(e|\+)\s*(preto|branco|azul|vermelho|verde|rosa|amarelo|cinza|bege|marrom|laranja|roxo|dourado|prata)\b/gi, '');
    
    return base.replace(/\s+/g, ' ').trim();
}

// Função para encontrar preço
function findPrice(productName) {
    const normalized = normalizeProductName(productName);
    
    // Busca exata primeiro
    for (const [key, price] of Object.entries(prices)) {
        if (normalized.includes(normalizeProductName(key))) {
            return Math.round(price * USD_TO_EUR);
        }
    }
    
    // Busca por marca/modelo
    if (normalized.includes('jordan 4') || normalized.includes('air jordan 4')) {
        if (normalized.includes('retro')) return Math.round(53 * USD_TO_EUR);
        return Math.round(38 * USD_TO_EUR);
    }
    if (normalized.includes('jordan 1') || normalized.includes('air jordan 1')) {
        return Math.round(31 * USD_TO_EUR);
    }
    if (normalized.includes('jordan 3') || normalized.includes('air jordan 3')) {
        return Math.round(35 * USD_TO_EUR);
    }
    if (normalized.includes('jordan 5') || normalized.includes('air jordan 5')) {
        return Math.round(39 * USD_TO_EUR);
    }
    if (normalized.includes('jordan 11') || normalized.includes('air jordan 11')) {
        return Math.round(31 * USD_TO_EUR);
    }
    if (normalized.includes('jordan 13') || normalized.includes('air jordan 13')) {
        return Math.round(36 * USD_TO_EUR);
    }
    if (normalized.includes('nike nsw tech fleece sportswear')) {
        return Math.round(58 * USD_TO_EUR);
    }
    if (normalized.includes('nocta x nike nsw tech fleece')) {
        return Math.round(58 * USD_TO_EUR);
    }
    if (normalized.includes('the north face')) {
        return Math.round(95 * USD_TO_EUR);
    }
    if (normalized.includes('synaword')) {
        return Math.round(49 * USD_TO_EUR);
    }
    if (normalized.includes('trapstar')) {
        return Math.round(49 * USD_TO_EUR);
    }
    if (normalized.includes('tears')) {
        return Math.round(49 * USD_TO_EUR);
    }
    if (normalized.includes('morant 3rd') || normalized.includes('morant 3ª')) {
        return Math.round(38 * USD_TO_EUR);
    }
    if (normalized.includes('morant 2nd') || normalized.includes('morant 2ª')) {
        return Math.round(38 * USD_TO_EUR);
    }
    if (normalized.includes('morant 1st') || normalized.includes('morant 1ª')) {
        return Math.round(38 * USD_TO_EUR);
    }
    if (normalized.includes('air max plus tn')) {
        return Math.round(40 * USD_TO_EUR);
    }
    if (normalized.includes('nocta hot step')) {
        return Math.round(51 * USD_TO_EUR);
    }
    if (normalized.includes('cpfm x nike air force 1')) {
        return Math.round(49 * USD_TO_EUR);
    }
    if (normalized.includes('air max 2021')) {
        return Math.round(35 * USD_TO_EUR);
    }
    if (normalized.includes('air max 95')) {
        return Math.round(39 * USD_TO_EUR);
    }
    if (normalized.includes('air more uptempo')) {
        return Math.round(40 * USD_TO_EUR);
    }
    if (normalized.includes('shox ride 2')) {
        return Math.round(50 * USD_TO_EUR);
    }
    if (normalized.includes('shox tl')) {
        return Math.round(45 * USD_TO_EUR);
    }
    if (normalized.includes('nocta glide drake')) {
        return Math.round(45 * USD_TO_EUR);
    }
    if (normalized.includes('alphafly next% 3')) {
        return Math.round(55 * USD_TO_EUR);
    }
    if (normalized.includes('alphafly next% 2')) {
        return Math.round(47 * USD_TO_EUR);
    }
    if (normalized.includes('alphafly next% 1')) {
        return Math.round(47 * USD_TO_EUR);
    }
    if (normalized.includes('air max 720')) {
        return Math.round(39 * USD_TO_EUR);
    }
    if (normalized.includes('air max 270')) {
        return Math.round(27 * USD_TO_EUR);
    }
    if (normalized.includes('yeezy boost 750')) {
        return Math.round(89 * USD_TO_EUR);
    }
    if (normalized.includes('samba og')) {
        return Math.round(35 * USD_TO_EUR);
    }
    if (normalized.includes('adidas ae1')) {
        return Math.round(45 * USD_TO_EUR);
    }
    if (normalized.includes('yeezy 450')) {
        return Math.round(43 * USD_TO_EUR);
    }
    if (normalized.includes('adidas dexun')) {
        return Math.round(29 * USD_TO_EUR);
    }
    if (normalized.includes('gucci rhyton')) {
        return Math.round(40 * USD_TO_EUR);
    }
    if (normalized.includes('gucci tennis 1977')) {
        return Math.round(40 * USD_TO_EUR);
    }
    if (normalized.includes('versace chain reaction')) {
        return Math.round(42 * USD_TO_EUR);
    }
    if (normalized.includes('veja campo')) {
        return Math.round(36 * USD_TO_EUR);
    }
    if (normalized.includes('amiri ma-1')) {
        return Math.round(58 * USD_TO_EUR);
    }
    if (normalized.includes('polo ralph lauren')) {
        return Math.round(58 * USD_TO_EUR); // Preço padrão para roupas
    }
    
    // Preço padrão baseado na marca
    if (normalized.includes('dior') || normalized.includes('gucci') || normalized.includes('versace') || normalized.includes('louis vuitton') || normalized.includes('lv') || normalized.includes('amiri')) {
        return 100;
    }
    if (normalized.includes('jordan') || normalized.includes('air jordan')) {
        return 87; // ~95 USD
    }
    if (normalized.includes('nike') || normalized.includes('adidas') || normalized.includes('puma') || normalized.includes('new balance')) {
        return 69; // ~75 USD
    }
    return 74; // ~80 USD
}

// Função para determinar categoria
function getCategory(name) {
    const normalized = name.toLowerCase();
    const clothingKeywords = ['hoodie', 'tshirt', 't-shirt', 'jogger', 'short', 'windbreaker', 'fato', 'treino', 'set', 'casaco', 'jacket', 'the north face', 'trapstar', 'synaword', 'nocta', 'tech fleece', 'sportswear', 'polo ralph lauren', 'colete', 'tears'];
    return clothingKeywords.some(keyword => normalized.includes(keyword)) ? 'roupas' : undefined;
}

// Processar todas as imagens
function processImages() {
    const imagesDir = path.join(__dirname, 'imagens_produtos');
    const allFiles = [];
    
    // Ler todos os arquivos recursivamente
    function readDir(dir) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                readDir(filePath);
            } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
                const relativePath = path.relative(imagesDir, filePath).replace(/\\/g, '/');
                allFiles.push(relativePath);
            }
        }
    }
    
    readDir(imagesDir);
    
    // Agrupar imagens por produto base
    const productGroups = {};
    
    for (const file of allFiles) {
        const fileName = path.basename(file, path.extname(file));
        const baseName = cleanProductName(fileName);
        const baseKey = getBaseName(baseName);
        const size = extractSize(fileName) || extractSize(baseName);
        
        if (!productGroups[baseKey]) {
            productGroups[baseKey] = {
                name: baseName,
                baseName: baseKey,
                images: [],
                sizes: new Set(),
                category: getCategory(baseName)
            };
        }
        
        productGroups[baseKey].images.push(`imagens_produtos/${file}`);
        if (size) {
            productGroups[baseKey].sizes.add(size);
        }
    }
    
    // Criar produtos
    const products = [];
    let id = 1;
    
    // Produtos mais vendidos (para marcar depois)
    const bestSellers = [
        'CPFM x Nike Air Force 1_5',
        'New Balance 530',
        'NOCTA x Nike NSW Tech Fleece Sportswear set',
        'Nike NSW Tech Fleece Sportswear set',
        'casaco polo ralph lauren'
    ];
    
    for (const [baseKey, group] of Object.entries(productGroups)) {
        // Ordenar imagens
        group.images.sort((a, b) => {
            const aMatch = a.match(/_(\d+)\.(jpg|jpeg|png)$/i);
            const bMatch = b.match(/_(\d+)\.(jpg|jpeg|png)$/i);
            const aNum = aMatch ? parseInt(aMatch[1]) : 0;
            const bNum = bMatch ? parseInt(bMatch[1]) : 0;
            return aNum - bNum;
        });
        
        const sizeArray = Array.from(group.sizes);
        const size = sizeArray.length > 0 ? sizeArray.join(', ') : null;
        
        const priceEur = findPrice(group.name);
        
        // Verificar se é mais vendido
        const isBestSeller = bestSellers.some(bs => {
            const normalizedBS = normalizeProductName(bs);
            const normalizedName = normalizeProductName(group.name);
            return normalizedName.includes(normalizedBS) || normalizedBS.includes(normalizedName);
        });
        
        products.push({
            id: id++,
            name: group.name,
            size: size,
            tipo: 'stock',
            category: group.category,
            price_eur: priceEur,
            price: `${priceEur}€`,
            desc: 'Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.',
            images: group.images,
            image: group.images[0] || null,
            isBestSeller: isBestSeller
        });
    }
    
    // Ordenar produtos por ID
    products.sort((a, b) => a.id - b.id);
    
    return products;
}

// Gerar arquivo de produtos
const products = processImages();
const output = `// STREETMOOD Products - Main product list
// This file contains all products for STREETMOOD catalog
// Generated automatically from images in imagens_produtos folder
if (typeof products === 'undefined') {
    var products = ${JSON.stringify(products, null, 8)};
}`;

fs.writeFileSync('streetmood_products.js', output, 'utf8');
console.log(`✅ Generated ${products.length} products from images`);
console.log(`✅ Best sellers: ${products.filter(p => p.isBestSeller).length} products`);

