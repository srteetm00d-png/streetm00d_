// Script para gerar products.json completo com todas as imagens
const fs = require('fs');
const path = require('path');

const imageFolder = './imagens_produtos';
const products = {};

// Mapeamento de preços baseado no tipo de produto
const priceMap = {
  'nike': 90,
  'jordan': 110,
  'air': 90,
  'adidas': 80,
  'yeezy': 120,
  'dior': 150,
  'gucci': 140,
  'louis': 130,
  'versace': 135,
  'amiri': 145,
  'off-white': 125,
  'puma': 85,
  'new balance': 95,
  'trapstar': 100,
  'ralph lauren': 110,
  'the north face': 95,
  'ka': 105
};

// Função para gerar ID a partir do nome do arquivo
function generateId(filename) {
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .substring(0, 50);
}

// Função para limpar nome do produto
function cleanName(filename) {
  return filename
    .replace(/\.(jpg|jpeg|png)$/i, '')
    .replace(/_\d+\.(jpg|jpeg|png)$/i, '')
    .replace(/\(.*?\)/g, '')
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Função para determinar preço baseado no nome
function determinePrice(name) {
  const lowerName = name.toLowerCase();
  
  for (const [brand, price] of Object.entries(priceMap)) {
    if (lowerName.includes(brand)) {
      // Ajuste de preço para modelos específicos
      if (lowerName.includes('retro') || lowerName.includes('vintage')) {
        return price + 20;
      }
      if (lowerName.includes('luxury') || lowerName.includes('premium')) {
        return price + 30;
      }
      return price;
    }
  }
  
  return 90; // preço padrão
}

// Ler arquivos da pasta
try {
  const files = fs.readdirSync(imageFolder);
  
  // Agrupar imagens por produto
  const productGroups = {};
  
  files.forEach(file => {
    if (!/\.(jpg|jpeg|png)$/i.test(file)) return;
    
    // Extrair nome base do produto
    let baseName = file.replace(/_\d+\.(jpg|jpeg|png)$/i, '');
    
    // Agrupar produtos similares
    if (!productGroups[baseName]) {
      productGroups[baseName] = [];
    }
    productGroups[baseName].push(file);
  });
  
  // Gerar produtos
  Object.entries(productGroups).forEach(([baseName, images]) => {
    const cleanProductName = cleanName(baseName);
    const id = generateId(baseName);
    
    // Determinar tags
    const tags = [];
    const lowerName = cleanProductName.toLowerCase();
    
    for (const brand of Object.keys(priceMap)) {
      if (lowerName.includes(brand)) {
        tags.push(brand.toLowerCase().replace(' ', ''));
        break;
      }
    }
    
    if (lowerName.includes('retro')) tags.push('retro');
    if (lowerName.includes('luxury') || lowerName.includes('premium')) tags.push('luxury');
    if (lowerName.includes('limited') || lowerName.includes('collab')) tags.push('limited');
    if (lowerName.includes('running') || lowerName.includes('sport')) tags.push('sport');
    if (lowerName.includes('lifestyle') || lowerName.includes('casual')) tags.push('lifestyle');
    
    // Adicionar tag padrão se não tiver nenhuma
    if (tags.length === 0) tags.push('streetwear');
    
    products[id] = {
      id: id,
      version: "v1",
      name: cleanProductName,
      price: determinePrice(cleanProductName),
      currency: "EUR",
      status: "available",
      images: images.sort(),
      tags: tags
    };
  });
  
  // Salvar products.json
  fs.writeFileSync('./products.json', JSON.stringify(products, null, 2));
  
  console.log(`Generated ${Object.keys(products).length} products`);
  console.log('Products saved to products.json');
  
} catch (error) {
  console.error('Error generating products:', error);
}
