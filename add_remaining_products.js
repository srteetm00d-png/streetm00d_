// Script para adicionar produtos restantes em batches
const fs = require('fs');

// Ler products.json atual
let productsData = JSON.parse(fs.readFileSync('products.json', 'utf8'));

// Produtos Morant (primeiro batch)
const morantProducts = [
  {
    id: "morant_1st_gen_dr8785_800",
    name: "Morant 1st generation DR8785 800(36-46)",
    price: 90,
    size: "36-46",
    category: "sneaker",
    images: ["Morant 1st generation DR8785 800(36-46)_2.jpg", "Morant 1st generation DR8785 800(36-46)_5.jpg"],
    tags: ["morant", "basketball"]
  },
  {
    id: "morant_1st_gen_dr8785_001",
    name: "Morant 1st generation DR8785-001(36-46)",
    price: 90,
    size: "36-46",
    category: "sneaker",
    images: ["Morant 1st generation DR8785-001(36-46)_2.jpg", "Morant 1st generation DR8785-001(36-46)_5.jpg"],
    tags: ["morant", "basketball"]
  },
  {
    id: "morant_1st_gen_dr8786_002",
    name: "Morant 1st generation DR8786 002(36-46)",
    price: 90,
    size: "36-46",
    category: "sneaker",
    images: ["Morant 1st generation DR8786 002(36-46)_3.jpg", "Morant 1st generation DR8786 002(36-46)_5.jpg"],
    tags: ["morant", "basketball"]
  },
  {
    id: "morant_1st_gen_dr8786_102",
    name: "Morant 1st generation DR8786 102(36-46)",
    price: 90,
    size: "36-46",
    category: "sneaker",
    images: ["Morant 1st generation DR8786 102(36-46)_2.jpg", "Morant 1st generation DR8786 102(36-46)_5.jpg", "Morant 1st generation DR8786 102(36-46)_6.jpg"],
    tags: ["morant", "basketball"]
  },
  {
    id: "morant_1st_gen_dr8786_802",
    name: "Morant 1st generation DR8786 802(36-46)",
    price: 90,
    size: "36-46",
    category: "sneaker",
    images: ["Morant 1st generation DR8786 802(36-46)_1.jpg", "Morant 1st generation DR8786 802(36-46)_3.jpg"],
    tags: ["morant", "basketball"]
  },
  {
    id: "morant_1st_gen_dr8786_400",
    name: "Morant 1st generation DR8786-400(36-46)",
    price: 90,
    size: "36-46",
    category: "sneaker",
    images: ["Morant 1st generation DR8786-400(36-46)_4.jpg", "Morant 1st generation DR8786-400(36-46)_5.jpg"],
    tags: ["morant", "basketball"]
  },
  {
    id: "morant_1st_gen_fn6614_900",
    name: "Morant 1st generation FN6614 900(36-46)",
    price: 90,
    size: "36-46",
    category: "sneaker",
    images: ["Morant 1st generation FN6614 900(36-46)_3.jpg", "Morant 1st generation FN6614 900(36-46)_4.jpg", "Morant 1st generation FN6614 900(36-46)_6.jpg"],
    tags: ["morant", "basketball"]
  },
  {
    id: "morant_1st_gen_fq4796_800",
    name: "Morant 1st generation FQ4796-800(36-46)",
    price: 90,
    size: "36-46",
    category: "sneaker",
    images: ["Morant 1st generation FQ4796-800(36-46)_3.jpg", "Morant 1st generation FQ4796-800(36-46)_5.jpg", "Morant 1st generation FQ4796-800(36-46)_6.jpg"],
    tags: ["morant", "basketball"]
  },
  {
    id: "morant_1st_gen_fv1281_600",
    name: "Morant 1st generation FV1281-600(36-46)",
    price: 90,
    size: "36-46",
    category: "sneaker",
    images: ["Morant 1st generation FV1281-600(36-46)_2.jpg", "Morant 1st generation FV1281-600(36-46)_4.jpg"],
    tags: ["morant", "basketball"]
  },
  {
    id: "morant_1st_gen_fv1288_600",
    name: "Morant 1st generation FV1288 600(36-46)",
    price: 90,
    size: "36-46",
    category: "sneaker",
    images: ["Morant 1st generation FV1288 600(36-46)_2.jpg", "Morant 1st generation FV1288 600(36-46)_5.jpg"],
    tags: ["morant", "basketball"]
  },
  {
    id: "morant_1st_gen_fv1288_001",
    name: "Morant 1st generation FV1288-001(36-46)",
    price: 90,
    size: "36-46",
    category: "sneaker",
    images: ["Morant 1st generation FV1288-001(36-46)_3.jpg", "Morant 1st generation FV1288-001(36-46)_5.jpg"],
    tags: ["morant", "basketball"]
  },
  {
    id: "morant_1st_gen_fv1291_100",
    name: "Morant 1st generation FV1291-100(36-46)",
    price: 90,
    size: "36-46",
    category: "sneaker",
    images: ["Morant 1st generation FV1291-100(36-46)_4.jpg", "Morant 1st generation FV1291-100(36-46)_5.jpg"],
    tags: ["morant", "basketball"]
  },
  {
    id: "morant_1st_gen_fv6097_300",
    name: "Morant 1st generation FV6097 300(36-46)",
    price: 90,
    size: "36-46",
    category: "sneaker",
    images: ["Morant 1st generation FV6097 300(36-46)_2.jpg", "Morant 1st generation FV6097 300(36-46)_5.jpg"],
    tags: ["morant", "basketball"]
  }
];

// Produtos Nike Air Max (primeiro batch)
const airMaxProducts = [
  {
    id: "nike_air_max_1_86_og_big_bubble",
    name: "Nike Air Max 1 '86 OG Big Bubble Royal",
    price: 90,
    size: "N/A",
    category: "sneaker",
    images: ["Nike Air Max 1 '86 OG Big Bubble Royal_4.jpg"],
    tags: ["nike", "airmax", "retro"]
  },
  {
    id: "nike_air_max_1_86_og_preto_azul",
    name: "Nike Air Max 1 '86 OG Big preto azul",
    price: 90,
    size: "N/A",
    category: "sneaker",
    images: ["Nike Air Max 1 '86 OG Big preto azul_5.jpg"],
    tags: ["nike", "airmax"]
  },
  {
    id: "nike_air_max_1_86_og_golf",
    name: "Nike Air Max 1 '86 OG Golf Big Bubble Sport Vermelho",
    price: 90,
    size: "N/A",
    category: "sneaker",
    images: ["Nike Air Max 1 '86 OG Golf Big Bubble Sport Vermelho_5.jpg"],
    tags: ["nike", "airmax", "golf"]
  },
  {
    id: "nike_air_max_1_86_og_golf_dusty",
    name: "Nike Air Max 1 '86 OG Golf Dusty Cactus",
    price: 90,
    size: "N/A",
    category: "sneaker",
    images: ["Nike Air Max 1 '86 OG Golf Dusty Cactus_5.jpg"],
    tags: ["nike", "airmax"]
  },
  {
    id: "nike_air_max_1_86_og_obsidian",
    name: "Nike Air Max 1 '86 OG Golf Obsidian",
    price: 90,
    size: "N/A",
    category: "sneaker",
    images: ["Nike Air Max 1 '86 OG Golf Obsidian_5.jpg"],
    tags: ["nike", "airmax"]
  },
  {
    id: "nike_air_max_1_86_og_grande",
    name: "Nike Air Max 1 '86 OG Grande",
    price: 90,
    size: "N/A",
    category: "sneaker",
    images: ["Nike Air Max 1 '86 OG Grande_4.jpg"],
    tags: ["nike", "airmax"]
  },
  {
    id: "nike_air_max_1_87_malaquita",
    name: "Nike Air Max 1 '87 Malaquita",
    price: 90,
    size: "N/A",
    category: "sneaker",
    images: ["Nike Air Max 1 '87 Malaquita_5.jpg"],
    tags: ["nike", "airmax"]
  },
  {
    id: "nike_air_max_1_marrom_crepe",
    name: "Nike Air Max 1 Marrom Crepe (2022)",
    price: 90,
    size: "2022",
    category: "sneaker",
    images: ["Nike Air Max 1 Marrom Crepe (2022)_5.jpg"],
    tags: ["nike", "airmax"]
  },
  {
    id: "nike_air_max_1_patta_waves",
    name: "Nike Air Max 1 Patta Waves Branco",
    price: 90,
    size: "N/A",
    category: "sneaker",
    images: ["Nike Air Max 1 Patta Waves Branco_5.jpg"],
    tags: ["nike", "airmax", "patta"]
  },
  {
    id: "nike_air_max_1_patta_monarch",
    name: "Nike Air Max 1 Patta Waves Monarch (without Bracelet)",
    price: 90,
    size: "without Bracelet",
    category: "sneaker",
    images: ["Nike Air Max 1 Patta Waves Monarch (without Bracelet)_4.jpg"],
    tags: ["nike", "airmax", "patta"]
  },
  {
    id: "nike_air_max_1_patta_noise_aqua",
    name: "Nike Air Max 1 Patta Waves Noise Aqua (sem pulseira)",
    price: 90,
    size: "sem pulseira",
    category: "sneaker",
    images: ["Nike Air Max 1 Patta Waves Noise Aqua (sem pulseira)_5.jpg"],
    tags: ["nike", "airmax", "patta"]
  },
  {
    id: "nike_air_max_1_patta_noise_aqua_bracelet",
    name: "Nike Air Max 1 Patta Waves Noise Aqua (without Bracelet)",
    price: 90,
    size: "without Bracelet",
    category: "sneaker",
    images: ["Nike Air Max 1 Patta Waves Noise Aqua (without Bracelet)_5.jpg"],
    tags: ["nike", "airmax", "patta"]
  },
  {
    id: "nike_air_max_1",
    name: "Nike Air Max 1",
    price: 90,
    size: "N/A",
    category: "sneaker",
    images: ["Nike Air Max 1_5.jpg"],
    tags: ["nike", "airmax"]
  }
];

// Função para adicionar produtos
function addProducts(products) {
  products.forEach(product => {
    productsData[product.id] = {
      id: product.id,
      version: "v1",
      name: product.name,
      price: product.price,
      currency: "EUR",
      status: "available",
      size: product.size,
      category: product.category,
      images: product.images,
      tags: product.tags
    };
  });
}

// Adicionar produtos
addProducts(morantProducts);
addProducts(airMaxProducts);

// Salvar no arquivo
fs.writeFileSync('products.json', JSON.stringify(productsData, null, 2));

console.log('Produtos adicionados com sucesso!');
console.log(`Total de produtos: ${Object.keys(productsData).length}`);
