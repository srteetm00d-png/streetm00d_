const fs = require('fs');
const path = require('path');

// Preços fornecidos pelo usuário (em USD) - conversão baseada nas margens
// Margens: ~30 USD → 70€, ~35 USD → 75€, ~40 USD → 80€, ~45 USD → 90€, ~50 USD → 100€, ~55 USD → 110-120€
function convertUSDToEUR(usdPrice) {
    if (usdPrice <= 30) return 70;
    if (usdPrice <= 35) return 75;
    if (usdPrice <= 40) return 80;
    if (usdPrice <= 45) return 90;
    if (usdPrice <= 50) return 100;
    if (usdPrice <= 55) return 110;
    // Para preços acima de 55, usar proporção similar
    return Math.round(usdPrice * 2); // Aproximação baseada nas margens
}

// Preços específicos fornecidos pelo usuário (em USD)
const prices = {
    // Mais Vendidos
    'CPFM x Nike Air Force 1': 49,
    'New Balance 530': 35, // Preço padrão para New Balance
    'NOCTA x Nike NSW Tech Fleece Sportswear set': 58,
    'Nike NSW Tech Fleece Sportswear set': 58,
    'casaco polo ralph lauren': 58, // Preço padrão para roupas polo
    
    // Roupas
    'Conjunto Nike NSW Tech Fleece Sportswear': 58,
    'Conjunto de roupa esportiva NOCTA x Nike NSW Tech Fleece': 58,
    'The North Face': 95,
    'SynaWord': 49,
    'tears': 49,
    'Trapstar': 49,
    'TRAPSTAR': 49,
    
    // Morant
    'Morant 3rd generation': 38,
    'Morant 2nd generation': 38,
    'Morant 2ª geração': 38,
    'Morant 1st generation': 38,
    'Morant 1ª geração': 38,
    
    // Air Jordan 4
    'Air Jordan 4 Retro bege partícula': 38,
    'Air Jordan 4 Retro particle beige': 38,
    'Air Jordan 4 Retro preto e branco': 38,
    'Air Jordan 4 Retro black-white': 38,
    'Air Jordan 4': 53,
    'Air Jordan 4 Retro': 53,
    
    // Air Jordan outros
    'Air Jordan 5': 39,
    'Air Jordan 1': 31,
    'Air Jordans 1': 31,
    'Air Jordans 3': 35,
    'Air Jordan 11': 31,
    'Air Jordan 13': 36,
    
    // Nike Air Max Plus
    'Nike Air Max Plus Tn Preto+Branco 9908-23 (40-46)': 40,
    'Nike Air Max Plus Tn (36-40)': 34,
    'Nike Air Max Plus Tn': 40,
    
    // NOCTA
    'Nocta Hot Step': 51,
    'NOCTA x Nike Air Force 1 Love You Forever Rosa': 41,
    'CPFM x Nike Air Force 1': 49,
    
    // Nike Air Max
    'Nike Air Max 2021': 35,
    'Nike Air Max 95': 39,
    'Air More Uptempo': 40,
    'Air Max 720': 39,
    'Air Max 270': 27,
    
    // Nike Shox
    'Nike Shox Ride 2': 50,
    'shox tl': 45,
    
    // Nike NOCTA Glide
    'Nike NOCTA Glide Drake': 45,
    
    // Nike Air Zoom Alphafly
    'Nike Air Zoom Alphafly NEXT% 3': 55,
    'Nike Air Zoom Alphafly NEXT% 2': 47,
    'Nike Air Zoom Alphafly NEXT% 1': 47,
    
    // Adidas/Yeezy
    'Tênis Yeezy Boost 750': 89,
    'Adidas SAMBA OG': 35,
    'Adidas AE1 (40-45)': 45,
    'Adidas AE1': 45,
    'YEEZY 450': 43,
    'Adidas Dexun': 29,
    
    // Gucci
    'Gucci Rhyton': 40,
    'Tênis Gucci Tennis 1977 Cano Alto GG': 40,
    'Tênis Gucci 1977 GG Canvas': 40,
    'Gucci Tennis 1977': 40,
    
    // Versace
    'Versace Chain Reaction 2': 42,
    
    // VEJA
    'VEJA Campo Unissex': 36,
    
    // AMIRI
    'AMIRI MA-1(36-45)': 58,
    'AMIRI MA-1': 58
};

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

// Função para limpar nome do produto (remover tamanhos, códigos, extensões, etc.)
function cleanProductName(name) {
    let cleaned = name
        .replace(/\([^)]+\)/g, '') // Remove (40-45), (XS-2XL), etc.
        .replace(/\d{2}-\d{2}/g, '') // Remove 40-45, 36-46, etc. (mas mantém se for parte do nome)
        .replace(/_\d+\.(jpg|jpeg|png)$/i, '') // Remove _1.jpg, _2.jpg, etc.
        .replace(/\.(jpg|jpeg|png)$/i, '') // Remove extensão
        .replace(/\s+/g, ' ')
        .trim();
    return cleaned;
}

// Função para extrair cor do nome (se houver)
function extractColor(name) {
    const colors = ['azul', 'preto', 'branco', 'vermelho', 'rosa', 'verde', 'amarelo', 'cinza', 'bege', 'marrom', 'laranja', 'roxo', 'dourado', 'prata', 'amarelo', 'branco', 'preto', 'vermelho', 'azul', 'verde', 'rosa', 'cinza', 'bege', 'marrom', 'laranja', 'roxo', 'prata', 'black', 'white', 'blue', 'red', 'green', 'pink', 'yellow', 'grey', 'gray', 'brown', 'orange', 'purple', 'gold', 'silver'];
    const normalized = name.toLowerCase();
    
    for (const color of colors) {
        if (normalized.includes(color)) {
            return color;
        }
    }
    return null;
}

// Função para obter nome base do produto (sem cores, sem tamanhos)
function getBaseName(name) {
    let base = cleanProductName(name);
    
    // Remove cores comuns
    const colors = ['azul', 'preto', 'branco', 'vermelho', 'rosa', 'verde', 'amarelo', 'cinza', 'bege', 'marrom', 'laranja', 'roxo', 'dourado', 'prata', 'black', 'white', 'blue', 'red', 'green', 'pink', 'yellow', 'grey', 'gray', 'brown', 'orange', 'purple', 'gold', 'silver'];
    for (const color of colors) {
        const regex = new RegExp(`\\b${color}\\b`, 'gi');
        base = base.replace(regex, '').trim();
    }
    
    // Remove variações de cor como "preto e branco", "branco preto", etc.
    base = base.replace(/\b(preto|branco|azul|vermelho|verde|rosa|amarelo|cinza|bege|marrom|laranja|roxo|dourado|prata|black|white|blue|red|green|pink|yellow|grey|gray|brown|orange|purple|gold|silver)\s*(e|\+|\s)\s*(preto|branco|azul|vermelho|verde|rosa|amarelo|cinza|bege|marrom|laranja|roxo|dourado|prata|black|white|blue|red|green|pink|yellow|grey|gray|brown|orange|purple|gold|silver)\b/gi, '');
    
    // Remove códigos de produto (números longos)
    base = base.replace(/\s+\d{6,}[-\s]?\d{0,6}/g, '');
    base = base.replace(/\s+\d{6,}-\d{3,}/g, '');
    
    return base.replace(/\s+/g, ' ').trim();
}

// Função para encontrar preço
function findPrice(productName) {
    const normalized = normalizeProductName(productName);
    
    // Busca exata primeiro nos preços específicos
    for (const [key, price] of Object.entries(prices)) {
        const normalizedKey = normalizeProductName(key);
        if (normalized.includes(normalizedKey) || normalizedKey.includes(normalized)) {
            return convertUSDToEUR(price);
        }
    }
    
    // Busca por padrões específicos
    if (normalized.includes('jordan 4') || normalized.includes('air jordan 4')) {
        if (normalized.includes('retro') && !normalized.includes('particle beige') && !normalized.includes('black-white')) {
            return convertUSDToEUR(53);
        }
        if (normalized.includes('particle beige') || normalized.includes('black-white') || normalized.includes('preto e branco')) {
            return convertUSDToEUR(38);
        }
        return convertUSDToEUR(53);
    }
    if (normalized.includes('jordan 1') || normalized.includes('air jordan 1') || normalized.includes('jordans 1')) {
        return convertUSDToEUR(31);
    }
    if (normalized.includes('jordan 3') || normalized.includes('air jordan 3') || normalized.includes('jordans 3')) {
        return convertUSDToEUR(35);
    }
    if (normalized.includes('jordan 5') || normalized.includes('air jordan 5')) {
        return convertUSDToEUR(39);
    }
    if (normalized.includes('jordan 11') || normalized.includes('air jordan 11')) {
        return convertUSDToEUR(31);
    }
    if (normalized.includes('jordan 13') || normalized.includes('air jordan 13')) {
        return convertUSDToEUR(36);
    }
    if (normalized.includes('nike nsw tech fleece sportswear') && !normalized.includes('nocta')) {
        return convertUSDToEUR(58);
    }
    if (normalized.includes('nocta x nike nsw tech fleece') || normalized.includes('nocta x nike nsw tech fleece sportswear')) {
        return convertUSDToEUR(58);
    }
    if (normalized.includes('the north face')) {
        return convertUSDToEUR(95);
    }
    if (normalized.includes('synaword')) {
        return convertUSDToEUR(49);
    }
    if (normalized.includes('trapstar')) {
        return convertUSDToEUR(49);
    }
    if (normalized.includes('tears')) {
        return convertUSDToEUR(49);
    }
    if (normalized.includes('morant 3rd') || normalized.includes('morant 3ª')) {
        return convertUSDToEUR(38);
    }
    if (normalized.includes('morant 2nd') || normalized.includes('morant 2ª')) {
        return convertUSDToEUR(38);
    }
    if (normalized.includes('morant 1st') || normalized.includes('morant 1ª')) {
        return convertUSDToEUR(38);
    }
    if (normalized.includes('air max plus tn')) {
        return convertUSDToEUR(40);
    }
    if (normalized.includes('nocta hot step')) {
        return convertUSDToEUR(51);
    }
    if (normalized.includes('cpfm x nike air force 1')) {
        return convertUSDToEUR(49);
    }
    if (normalized.includes('air max 2021')) {
        return convertUSDToEUR(35);
    }
    if (normalized.includes('air max 95')) {
        return convertUSDToEUR(39);
    }
    if (normalized.includes('air more uptempo')) {
        return convertUSDToEUR(40);
    }
    if (normalized.includes('shox ride 2')) {
        return convertUSDToEUR(50);
    }
    if (normalized.includes('shox tl')) {
        return convertUSDToEUR(45);
    }
    if (normalized.includes('nocta glide drake')) {
        return convertUSDToEUR(45);
    }
    if (normalized.includes('alphafly next% 3') || normalized.includes('alphafly next 3')) {
        return convertUSDToEUR(55);
    }
    if (normalized.includes('alphafly next% 2') || normalized.includes('alphafly next 2')) {
        return convertUSDToEUR(47);
    }
    if (normalized.includes('alphafly next% 1') || normalized.includes('alphafly next 1')) {
        return convertUSDToEUR(47);
    }
    if (normalized.includes('air max 720')) {
        return convertUSDToEUR(39);
    }
    if (normalized.includes('air max 270')) {
        return convertUSDToEUR(27);
    }
    if (normalized.includes('yeezy boost 750')) {
        return convertUSDToEUR(89);
    }
    if (normalized.includes('samba og') || normalized.includes('adidas originals samba')) {
        return convertUSDToEUR(35);
    }
    if (normalized.includes('adidas ae1')) {
        return convertUSDToEUR(45);
    }
    if (normalized.includes('yeezy 450')) {
        return convertUSDToEUR(43);
    }
    if (normalized.includes('adidas dexun')) {
        return convertUSDToEUR(29);
    }
    if (normalized.includes('gucci rhyton')) {
        return convertUSDToEUR(40);
    }
    if (normalized.includes('gucci tennis 1977')) {
        return convertUSDToEUR(40);
    }
    if (normalized.includes('versace chain reaction')) {
        return convertUSDToEUR(42);
    }
    if (normalized.includes('veja campo')) {
        return convertUSDToEUR(36);
    }
    if (normalized.includes('amiri ma-1')) {
        return convertUSDToEUR(58);
    }
    if (normalized.includes('polo ralph lauren')) {
        return convertUSDToEUR(58);
    }
    if (normalized.includes('new balance 530')) {
        return convertUSDToEUR(35);
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
    const clothingKeywords = ['hoodie', 'tshirt', 't-shirt', 'jogger', 'short', 'windbreaker', 'fato', 'treino', 'set', 'casaco', 'jacket', 'the north face', 'trapstar', 'synaword', 'nocta', 'tech fleece', 'sportswear', 'polo ralph lauren', 'colete', 'tears', 'sportswear set'];
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
    
    // Agrupar imagens por produto
    // Estratégia: mesmo nome base + mesma cor = mesmo produto
    // Nome base diferente OU cor diferente = produto diferente
    const productGroups = {};
    
    for (const file of allFiles) {
        const fileName = path.basename(file, path.extname(file));
        const dirName = path.dirname(file) !== '.' ? path.basename(path.dirname(file)) : '';
        
        // Se estiver em uma pasta, usar o nome da pasta como base
        let productName = dirName && dirName !== 'imagens_produtos' ? dirName : fileName;
        
        // Limpar nome do produto
        const cleanedName = cleanProductName(productName);
        const baseName = getBaseName(cleanedName);
        const color = extractColor(cleanedName);
        const size = extractSize(productName) || extractSize(dirName);
        
        // Criar chave única: baseName + cor (se houver)
        // Se tiver cor, incluir na chave para separar produtos
        const productKey = color ? `${baseName}|||${color}` : baseName;
        
        if (!productGroups[productKey]) {
            productGroups[productKey] = {
                name: cleanedName, // Nome limpo (sem tamanhos, sem extensões)
                baseName: baseName,
                color: color,
                images: [],
                sizes: new Set(),
                category: getCategory(cleanedName)
            };
        }
        
        productGroups[productKey].images.push(`imagens_produtos/${file}`);
        if (size) {
            productGroups[productKey].sizes.add(size);
        }
    }
    
    // Criar produtos
    const products = [];
    let id = 1;
    
    // Produtos mais vendidos (nomes normalizados para comparação)
    const bestSellers = [
        'CPFM x Nike Air Force 1',
        'New Balance 530',
        'NOCTA x Nike NSW Tech Fleece Sportswear set',
        'Nike NSW Tech Fleece Sportswear set',
        'casaco polo ralph lauren'
    ];
    
    for (const [productKey, group] of Object.entries(productGroups)) {
        // Ordenar imagens
        group.images.sort((a, b) => {
            const aMatch = a.match(/_(\d+)\.(jpg|jpeg|png)$/i);
            const bMatch = b.match(/_(\d+)\.(jpg|jpeg|png)$/i);
            const aNum = aMatch ? parseInt(aMatch[1]) : 0;
            const bNum = bMatch ? parseInt(bMatch[1]) : 0;
            return aNum - bNum;
        });
        
        const sizeArray = Array.from(group.sizes);
        const size = sizeArray.length > 0 ? sizeArray[0] : null; // Usar primeiro tamanho se houver múltiplos
        
        const priceEur = findPrice(group.name);
        
        // Verificar se é mais vendido
        const isBestSeller = bestSellers.some(bs => {
            const normalizedBS = normalizeProductName(bs);
            const normalizedName = normalizeProductName(group.name);
            return normalizedName.includes(normalizedBS) || normalizedBS.includes(normalizedName);
        });
        
        // Construir nome final do produto (sem tamanhos no nome, tamanhos vão para o campo size)
        let finalName = group.name;
        // Remover tamanhos do nome se ainda estiverem lá
        finalName = finalName.replace(/\([^)]+\)/g, '').replace(/\d{2}-\d{2}/g, '').replace(/\s+/g, ' ').trim();
        
        products.push({
            id: id++,
            name: finalName,
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
}

// Garantir que products está disponível globalmente
if (typeof window !== 'undefined') {
    window.products = products;
}`;

fs.writeFileSync('streetmood_products.js', output, 'utf8');
console.log(`✅ Generated ${products.length} products from images`);
console.log(`✅ Best sellers: ${products.filter(p => p.isBestSeller).length} products`);
console.log(`✅ Products with images: ${products.filter(p => p.images && p.images.length > 0).length}`);
