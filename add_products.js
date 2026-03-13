const fs = require('fs');

// Ler o products.json atual
const productsData = JSON.parse(fs.readFileSync('products.json', 'utf8'));

// Remover o último } para poder adicionar novos produtos
let currentContent = fs.readFileSync('products.json', 'utf8');
currentContent = currentContent.slice(0, -2); // Remove o último }

// Novos produtos a serem adicionados
const newProducts = [
  // Air Jordan Products
  {
    "id": "air_jordan_312",
    "version": "v1",
    "name": "Air Jordan 312",
    "price": 110,
    "currency": "EUR",
    "status": "available",
    "size": "N/A",
    "category": "sneaker",
    "images": ["Air Jordan 312_1.jpg"],
    "tags": ["jordan", "basketball"]
  },
  {
    "id": "air_jordan_4_retro_black_particle",
    "version": "v1",
    "name": "Air Jordan 4 Retro black particle40-46",
    "price": 130,
    "currency": "EUR",
    "status": "available",
    "size": "N/A",
    "category": "sneaker",
    "images": ["Air Jordan 4 Retro black particle40-46_4.jpg", "Air Jordan 4 Retro black particle40-46_6.jpg"],
    "tags": ["jordan", "retro", "black"]
  },
  {
    "id": "air_jordan_4_retro_black_white",
    "version": "v1",
    "name": "Air Jordan 4 Retro black-white36-46",
    "price": 130,
    "currency": "EUR",
    "status": "available",
    "size": "N/A",
    "category": "sneaker",
    "images": ["Air Jordan 4 Retro black-white36-46_1.jpg", "Air Jordan 4 Retro black-white36-46_2.jpg", "Air Jordan 4 Retro black-white36-46_5.jpg", "Air Jordan 4 Retro black-white36-46_6.jpg"],
    "tags": ["jordan", "retro", "black-white"]
  },
  {
    "id": "air_jordan_4_retro_particle_beige",
    "version": "v1",
    "name": "Air Jordan 4 Retro particle beige40-46",
    "price": 130,
    "currency": "EUR",
    "status": "available",
    "size": "N/A",
    "category": "sneaker",
    "images": ["Air Jordan 4 Retro particle beige40-46_1.jpg", "Air Jordan 4 Retro particle beige40-46_4.jpg", "Air Jordan 4 Retro particle beige40-46_6.jpg"],
    "tags": ["jordan", "retro", "beige"]
  },
  {
    "id": "air_jordan_4_retro",
    "version": "v1",
    "name": "Air Jordan 4 Retro",
    "price": 130,
    "currency": "EUR",
    "status": "available",
    "size": "N/A",
    "category": "sneaker",
    "images": ["Air Jordan 4 Retro_1.jpg", "Air Jordan 4 Retro_2.jpg"],
    "tags": ["jordan", "retro"]
  },
  {
    "id": "air_jordans_1_cd4487",
    "version": "v1",
    "name": "Air Jordans 1 CD4487-100",
    "price": 90,
    "currency": "EUR",
    "status": "available",
    "size": "N/A",
    "category": "sneaker",
    "images": ["Air Jordans 1 CD4487-100_1.jpg", "Air Jordans 1 CD4487-100_2.jpg"],
    "tags": ["jordan", "retro"]
  },
  {
    "id": "air_jordans_1_high_university_blue",
    "version": "v1",
    "name": "Air Jordans 1 High University Blue 555088-134",
    "price": 90,
    "currency": "EUR",
    "status": "available",
    "size": "N/A",
    "category": "sneaker",
    "images": ["Air Jordans 1 High University Blue 555088-134_1.jpg", "Air Jordans 1 High University Blue 555088-134_2.jpg"],
    "tags": ["jordan", "university", "blue"]
  },
  {
    "id": "air_jordans_1_high_zoom_racer_blue",
    "version": "v1",
    "name": "AIR JORDANS 1 HIGH ZOOM "Racer Blue" CK6637-104",
    "price": 90,
    "currency": "EUR",
    "status": "available",
    "size": "N/A",
    "category": "sneaker",
    "images": ["AIR JORDANS 1 HIGH ZOOM "Racer Blue" CK6637-104_1.jpg", "AIR JORDANS 1 HIGH ZOOM "Racer Blue" CK6637-104_2.jpg"],
    "tags": ["jordan", "racer", "blue"]
  },
  {
    "id": "air_jordans_1_low_mystic_green",
    "version": "v1",
    "name": "AIR JORDANS 1 LOW "Mystic Green"553558-113",
    "price": 90,
    "currency": "EUR",
    "status": "available",
    "size": "N/A",
    "category": "sneaker",
    "images": ["AIR JORDANS 1 LOW "Mystic Green"553558-113_1.jpg", "AIR JORDANS 1 LOW "Mystic Green"553558-113_2.jpg"],
    "tags": ["jordan", "mystic", "green"]
  },
  // Air Max Products
  {
    "id": "air_max_270_v2",
    "version": "v1",
    "name": "Air Max 270 V2",
    "price": 90,
    "currency": "EUR",
    "status": "available",
    "size": "N/A",
    "category": "sneaker",
    "images": ["Air Max 270 V2_5.jpg"],
    "tags": ["nike", "airmax", "270"]
  },
  {
    "id": "air_max_720_branco_rosa_azul",
    "version": "v1",
    "name": "Air Max 720 Branco rosa azul",
    "price": 90,
    "currency": "EUR",
    "status": "available",
    "size": "N/A",
    "category": "sneaker",
    "images": ["Air Max 720 Branco rosa azul_5.jpg"],
    "tags": ["nike", "airmax", "720"]
  },
  {
    "id": "air_max_720_branco",
    "version": "v1",
    "name": "Air Max 720 Branco",
    "price": 90,
    "currency": "EUR",
    "status": "available",
    "size": "N/A",
    "category": "sneaker",
    "images": ["Air Max 720 Branco_5.jpg"],
    "tags": ["nike", "airmax", "720"]
  },
  {
    "id": "air_max_720_preto_branco",
    "version": "v1",
    "name": "Air Max 720 Preto Branco",
    "price": 90,
    "currency": "EUR",
    "status": "available",
    "size": "N/A",
    "category": "sneaker",
    "images": ["Air Max 720 Preto Branco_5.jpg"],
    "tags": ["nike", "airmax", "720"]
  },
  {
    "id": "air_max_720_preto",
    "version": "v1",
    "name": "Air Max 720 Preto",
    "price": 90,
    "currency": "EUR",
    "status": "available",
    "size": "N/A",
    "category": "sneaker",
    "images": ["Air Max 720 Preto_5.jpg"],
    "tags": ["nike", "airmax", "720"]
  },
  {
    "id": "air_max_720",
    "version": "v1",
    "name": "Air Max 720",
    "price": 90,
    "currency": "EUR",
    "status": "available",
    "size": "N/A",
    "category": "sneaker",
    "images": ["Air Max 720_5.jpg"],
    "tags": ["nike", "airmax", "720"]
  },
  // AMIRI Products
  {
    "id": "amiri_ma1_36_40",
    "version": "v1",
    "name": "AMIRI MA-1 (36-40)",
    "price": 90,
    "currency": "EUR",
    "status": "available",
    "size": "36-40",
    "category": "roupa",
    "images": ["AMIRI MA-1 (36-40)_5.jpg"],
    "tags": ["amiri", "jacket", "luxury"]
  },
  {
    "id": "amiri_ma1_branco_verde",
    "version": "v1",
    "name": "AMIRI MA-1 Branco Verde",
    "price": 90,
    "currency": "EUR",
    "status": "available",
    "size": "N/A",
    "category": "roupa",
    "images": ["AMIRI MA-1 Branco Verde_5.jpg"],
    "tags": ["amiri", "jacket", "luxury"]
  },
  {
    "id": "amiri_ma1_branco",
    "version": "v1",
    "name": "AMIRI MA-1 Branco",
    "price": 90,
    "currency": "EUR",
    "status": "available",
    "size": "N/A",
    "category": "roupa",
    "images": ["AMIRI MA-1 Branco_5.jpg"],
    "tags": ["amiri", "jacket", "luxury"]
  },
  {
    "id": "amiri_ma1_preto_branco",
    "version": "v1",
    "name": "AMIRI MA-1 Preto Branco",
    "price": 90,
    "currency": "EUR",
    "status": "available",
    "size": "N/A",
    "category": "roupa",
    "images": ["AMIRI MA-1 Preto Branco_4.jpg"],
    "tags": ["amiri", "jacket", "luxury"]
  },
  {
    "id": "amiri_ma1_rosa",
    "version": "v1",
    "name": "AMIRI MA-1 rosa",
    "price": 90,
    "currency": "EUR",
    "status": "available",
    "size": "N/A",
    "category": "roupa",
    "images": ["AMIRI MA-1 rosa_5.jpg"],
    "tags": ["amiri", "jacket", "luxury"]
  },
  {
    "id": "amiri_ma1_36_40_2",
    "version": "v1",
    "name": "AMIRI MA-1(36-40)",
    "price": 90,
    "currency": "EUR",
    "status": "available",
    "size": "36-40",
    "category": "roupa",
    "images": ["AMIRI MA-1(36-40)_5.jpg"],
    "tags": ["amiri", "jacket", "luxury"]
  },
  // Nike Air Force 1
  {
    "id": "nike_air_force_1_low_branco_preto",
    "version": "v1",
    "name": "Nike Air Force 1 Low - Branco-Preto",
    "price": 85,
    "currency": "EUR",
    "status": "available",
    "size": "N/A",
    "category": "sneaker",
    "images": ["Nike Air Force 1 Low - Branco-Preto_5.jpg"],
    "tags": ["nike", "airforce", "low"]
  },
  {
    "id": "nike_air_force_1_low",
    "version": "v1",
    "name": "Nike Air Force 1 Low",
    "price": 85,
    "currency": "EUR",
    "status": "available",
    "size": "N/A",
    "category": "sneaker",
    "images": ["Nike Air Force 1 Low_5.jpg"],
    "tags": ["nike", "airforce", "low"]
  },
  // Jordan 13
  {
    "id": "jordan_13_retro_black_white_gum",
    "version": "v1",
    "name": "Jordan 13 Retro Black White Gum",
    "price": 110,
    "currency": "EUR",
    "status": "available",
    "size": "N/A",
    "category": "sneaker",
    "images": ["Jordan 13 Retro Black White Gum_1.jpg", "Jordan 13 Retro Black White Gum_2.jpg"],
    "tags": ["jordan", "retro", "13"]
  },
  {
    "id": "jordan_13_retro_brave_blue",
    "version": "v1",
    "name": "Jordan 13 Retro Brave Blue",
    "price": 110,
    "currency": "EUR",
    "status": "available",
    "size": "N/A",
    "category": "sneaker",
    "images": ["Jordan 13 Retro Brave Blue_1.jpg", "Jordan 13 Retro Brave Blue_2.jpg"],
    "tags": ["jordan", "retro", "13", "blue"]
  },
  {
    "id": "jordan_13_retro_french_blue",
    "version": "v1",
    "name": "Jordan 13 Retro French Blue",
    "price": 110,
    "currency": "EUR",
    "status": "available",
    "size": "N/A",
    "category": "sneaker",
    "images": ["Jordan 13 Retro French Blue_1.jpg", "Jordan 13 Retro French Blue_2.jpg"],
    "tags": ["jordan", "retro", "13", "blue"]
  }
];

// Adicionar vírgula ao último produto se necessário
if (currentContent.trim().endsWith('}')) {
  currentContent = currentContent.slice(0, -1) + ',';
}

// Adicionar novos produtos
newProducts.forEach((product, index) => {
  currentContent += `\n  "${product.id}": ${JSON.stringify(product)}`;
  if (index < newProducts.length - 1) {
    currentContent += ',';
  }
});

// Fechar o JSON
currentContent += '\n}';

// Escrever no arquivo
fs.writeFileSync('products.json', currentContent);
console.log('Produtos adicionados com sucesso!');
