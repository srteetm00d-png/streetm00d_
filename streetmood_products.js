// STREETMOOD Products - Baseado nos arquivos reais da pasta imagens_produtos
// Formato: nome, tamanho, preço, imagem

if (typeof products === 'undefined') {
    var products = [
        // ADIDAS
        {id: 1, name: "Adidas Adizero SL", size: "40-45", tipo: "stock", price_eur: 110, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", images: ["imagens_produtos/Adidas Adizero SL (40-45)_4.jpeg", "imagens_produtos/Adidas Adizero SL (40-45)_5.jpeg"]},
        {id: 2, name: "Adidas AE1", size: "40-45", tipo: "stock", price_eur: 120, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", images: ["imagens_produtos/Adidas AE1 (40-45)_5.jpg", "imagens_produtos/Adidas AE1 (40-45)_5.png"]},
        {id: 3, name: "Adidas Dexun", size: "36-45", tipo: "stock", price_eur: 95, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", images: ["imagens_produtos/Adidas Dexun_4.jpg", "imagens_produtos/Adidas Dexun_5.jpg"]},
        {id: 4, name: "Adidas Forum 84", size: "36-40", tipo: "stock", price_eur: 85, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", images: ["imagens_produtos/Adidas Forum 84 (36-39)_5.jpg", "imagens_produtos/Adidas Forum 84 (36-40)_5.jpg"]},
        {id: 5, name: "Adidas Originals Samba", size: "36-45", tipo: "stock", price_eur: 80, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", isBestSeller: true, images: ["imagens_produtos/Adidas Originals Samba_4.png", "imagens_produtos/Adidas Originals Samba_5.jpg", "imagens_produtos/Adidas Originals Samba_5.png"]},
        
        // AIR JORDANS
        {id: 6, name: "Air Jordan 312", size: "36-46", tipo: "stock", price_eur: 130, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", images: ["imagens_produtos/Air Jordan 312_1.jpg"]},
        {id: 7, name: "Air Jordan 4 Retro Black Particle", size: "40-46", tipo: "stock", price_eur: 140, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", isBestSeller: true, images: ["imagens_produtos/Air Jordan 4 Retro black particle40-46_4.jpg", "imagens_produtos/Air Jordan 4 Retro black particle40-46_6.jpg"]},
        {id: 8, name: "Air Jordan 4 Retro Black White", size: "36-46", tipo: "stock", price_eur: 135, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", images: ["imagens_produtos/Air Jordan 4 Retro black-white36-46_1.jpg", "imagens_produtos/Air Jordan 4 Retro black-white36-46_2.jpg", "imagens_produtos/Air Jordan 4 Retro black-white36-46_5.jpg", "imagens_produtos/Air Jordan 4 Retro black-white36-46_6.jpg"]},
        {id: 9, name: "Air Jordan 4 Retro Particle Beige", size: "40-46", tipo: "stock", price_eur: 145, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", images: ["imagens_produtos/Air Jordan 4 Retro particle beige40-46_1.jpg", "imagens_produtos/Air Jordan 4 Retro particle beige40-46_4.jpg", "imagens_produtos/Air Jordan 4 Retro particle beige40-46_6.jpg"]},
        {id: 10, name: "Air Jordan 4 Retro", size: "36-46", tipo: "stock", price_eur: 125, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", images: ["imagens_produtos/Air Jordan 4 Retro_2 (2).jpg", "imagens_produtos/Air Jordan 4 Retro_2.jpg"]},
        {id: 11, name: "Air Jordans 1 CD4487-100", size: "36-46", tipo: "stock", price_eur: 150, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", isBestSeller: true, images: ["imagens_produtos/Air Jordans 1 CD4487-100_1.jpg", "imagens_produtos/Air Jordans 1 CD4487-100_2.jpg"]},
        {id: 12, name: "Air Jordans 1 High University Blue", size: "36-46", tipo: "stock", price_eur: 160, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", isBestSeller: true, images: ["imagens_produtos/Air Jordans 1 High University Blue 555088-134_1.jpg", "imagens_produtos/Air Jordans 1 High University Blue 555088-134_2.jpg"]},
        {id: 13, name: "Air Jordans 1 High Zoom Racer Blue", size: "36-46", tipo: "stock", price_eur: 155, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", images: ["imagens_produtos/AIR JORDANS 1 HIGH ZOOM \"Racer Blue\" CK6637-104_1.jpg", "imagens_produtos/AIR JORDANS 1 HIGH ZOOM \"Racer Blue\" CK6637-104_2.jpg"]},
        {id: 14, name: "Air Jordans 1 Low Mystic Green", size: "36-46", tipo: "stock", price_eur: 145, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", images: ["imagens_produtos/AIR JORDANS 1 LOW \"Mystic Green\"553558-113_1.jpg", "imagens_produtos/AIR JORDANS 1 LOW \"Mystic Green\"553558-113_2.jpg"]},
        {id: 15, name: "Air Jordans 1 Mid GS", size: "36-40", tipo: "stock", price_eur: 110, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", images: ["imagens_produtos/Air Jordans 1 Mid (GS)555112-500_1.jpg", "imagens_produtos/Air Jordans 1 Mid (GS)555112-500_2.jpg"]},
        {id: 16, name: "Air Jordans 1 Mid GS Light Smoke Grey", size: "36-40", tipo: "stock", price_eur: 115, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", images: ["imagens_produtos/Air Jordans 1 Mid GS \"Light Smoke Grey\"554724-092_1.jpg", "imagens_produtos/Air Jordans 1 Mid GS \"Light Smoke Grey\"554724-092_2.jpg"]},
        {id: 17, name: "Air Jordans 1 Mid SE", size: "36-40", tipo: "stock", price_eur: 120, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", images: ["imagens_produtos/Air Jordans 1 Mid SE 852542-400_1.jpg", "imagens_produtos/Air Jordans 1 Mid SE 852542-400_2.jpg"]},
        {id: 18, name: "Air Jordans 1 Mid SE South Beach", size: "36-40", tipo: "stock", price_eur: 125, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", isBestSeller: true, images: ["imagens_produtos/Air Jordans 1 MID SE \"South Beach\"852542-306_1.jpg", "imagens_produtos/Air Jordans 1 MID SE \"South Beach\"852542-306_2.jpg"]},
        {id: 19, name: "Air Jordans 1 Mid Candy", size: "36-40", tipo: "stock", price_eur: 130, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", images: ["imagens_produtos/Air Jordans 1 Mid 'Candy' 554725-083_1.jpg", "imagens_produtos/Air Jordans 1 Mid 'Candy' 554725-083_2.jpg"]},
        {id: 20, name: "Air Jordans 1 Mid Black Cone", size: "36-40", tipo: "stock", price_eur: 135, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", images: ["imagens_produtos/Air Jordans 1 Mid \"Black Cone\" 554724-062_1.jpg", "imagens_produtos/Air Jordans 1 Mid \"Black Cone\" 554724-062_2.jpg"]},
        {id: 21, name: "Air Jordans 1 Mid Chicago Black Toe", size: "36-40", tipo: "stock", price_eur: 140, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", isBestSeller: true, images: ["imagens_produtos/Air Jordans 1 Mid \"Chicago Black Toe\" 554724-069_1.jpg", "imagens_produtos/Air Jordans 1 Mid \"Chicago Black Toe\" 554724-069_2.jpg"]},
        {id: 22, name: "Air Jordans 1 Mid Lakers Top 3", size: "36-40", tipo: "stock", price_eur: 150, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", isBestSeller: true, images: ["imagens_produtos/Air Jordans 1 Mid \"Lakers Top 3\"852542-005_1.jpg", "imagens_produtos/Air Jordans 1 Mid \"Lakers Top 3\"852542-005_2.jpg"]},
        {id: 23, name: "Air Jordans 1 Mid Multicolor", size: "36-40", tipo: "stock", price_eur: 145, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", images: ["imagens_produtos/Air Jordans 1 Mid \"Multicolor\" 554724-125_1.jpg", "imagens_produtos/Air Jordans 1 Mid \"Multicolor\" 554724-125_2.jpg"]},
        {id: 24, name: "Air Jordans 1 Mid Top 3", size: "36-40", tipo: "stock", price_eur: 135, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", images: ["imagens_produtos/Air Jordans 1 MID \"Top 3\" 554724-124_1.jpg"]},
        
        // NIKE
        {id: 25, name: "Nike Dunk Low Panda", size: "36-45", tipo: "stock", price_eur: 110, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", isBestSeller: true, images: ["imagens_produtos/Nike Dunk Low Panda_1.jpg", "imagens_produtos/Nike Dunk Low Panda_2.jpg", "imagens_produtos/Nike Dunk Low Panda_3.jpg"]},
        {id: 26, name: "Nike Air Force 1", size: "36-46", tipo: "stock", price_eur: 95, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", isBestSeller: true, images: ["imagens_produtos/Nike Air Force 1_1.jpg", "imagens_produtos/Nike Air Force 1_2.jpg", "imagens_produtos/Nike Air Force 1_3.jpg"]},
        {id: 27, name: "Nike Air Max 90", size: "36-45", tipo: "stock", price_eur: 125, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", images: ["imagens_produtos/Nike Air Max 90_1.jpg", "imagens_produtos/Nike Air Max 90_2.jpg"]},
        {id: 28, name: "Nike Air Max 95", size: "36-45", tipo: "stock", price_eur: 130, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", images: ["imagens_produtos/Nike Air Max 95_1.jpg", "imagens_produtos/Nike Air Max 95_2.jpg"]},
        {id: 29, name: "Nike Air Max 270", size: "36-45", tipo: "stock", price_eur: 120, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", images: ["imagens_produtos/Nike Air Max 270_1.jpg", "imagens_produtos/Nike Air Max 270_2.jpg"]},
        {id: 30, name: "Nike Air Max Plus TN", size: "36-45", tipo: "stock", price_eur: 115, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", images: ["imagens_produtos/Nike Air Max Plus TN_1.jpg", "imagens_produtos/Nike Air Max Plus TN_2.jpg"]},
        {id: 31, name: "Nike Blazer Mid", size: "36-45", tipo: "stock", price_eur: 90, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", images: ["imagens_produtos/Nike Blazer Mid_1.jpg", "imagens_produtos/Nike Blazer Mid_2.jpg"]},
        {id: 32, name: "Nike Cortez", size: "36-45", tipo: "stock", price_eur: 85, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", images: ["imagens_produtos/Nike Cortez_1.jpg", "imagens_produtos/Nike Cortez_2.jpg"]},
        {id: 33, name: "Nike Vapormax", size: "36-45", tipo: "stock", price_eur: 100, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", images: ["imagens_produtos/Nike Vapormax_1.jpg", "imagens_produtos/Nike Vapormax_2.jpg"]},
        
        // NEW BALANCE
        {id: 34, name: "New Balance 550", size: "36-45", tipo: "stock", price_eur: 120, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", isBestSeller: true, images: ["imagens_produtos/New Balance 550_1.jpg", "imagens_produtos/New Balance 550_2.jpg"]},
        {id: 35, name: "New Balance 574", size: "36-45", tipo: "stock", price_eur: 110, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", images: ["imagens_produtos/New Balance 574_1.jpg", "imagens_produtos/New Balance 574_2.jpg"]},
        {id: 36, name: "New Balance 990", size: "36-45", tipo: "stock", price_eur: 105, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", images: ["imagens_produtos/New Balance 990_1.jpg", "imagens_produtos/New Balance 990_2.jpg"]},
        
        // PUMA
        {id: 37, name: "Puma Suede Classic", size: "36-45", tipo: "stock", price_eur: 80, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", images: ["imagens_produtos/Puma Suede Classic_1.jpg", "imagens_produtos/Puma Suede Classic_2.jpg"]},
        {id: 38, name: "Puma RS-X3", size: "36-45", tipo: "stock", price_eur: 95, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", images: ["imagens_produtos/Puma RS-X3_1.jpg", "imagens_produtos/Puma RS-X3_2.jpg"]},
        
        // VANS
        {id: 39, name: "Vans Old Skool", size: "36-45", tipo: "stock", price_eur: 75, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", images: ["imagens_produtos/Vans Old Skool_1.jpg", "imagens_produtos/Vans Old Skool_2.jpg"]},
        {id: 40, name: "Vans SK8", size: "36-45", tipo: "stock", price_eur: 70, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", images: ["imagens_produtos/Vans SK8_1.jpg", "imagens_produtos/Vans SK8_2.jpg"]},
        
        // CONVERSE
        {id: 41, name: "Converse Chuck Taylor 70", size: "36-46", tipo: "stock", price_eur: 85, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", images: ["imagens_produtos/Converse Chuck Taylor 70_1.jpg", "imagens_produtos/Converse Chuck Taylor 70_2.jpg"]},
        
        // YEEZY
        {id: 42, name: "Yeezy Boost 350", size: "36-45", tipo: "stock", price_eur: 180, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", isBestSeller: true, images: ["imagens_produtos/Yeezy Boost 350_1.jpg", "imagens_produtos/Yeezy Boost 350_2.jpg"]},
        {id: 43, name: "Yeezy Slide", size: "36-46", tipo: "stock", price_eur: 60, desc: "Estado: Novo. Envio grátis. Caixa STREETMOOD incluída.", images: ["imagens_produtos/Yeezy Slide_1.jpg", "imagens_produtos/Yeezy Slide_2.jpg"]},
        
        // ROUPAS
        {id: 44, name: "Versace Chain Reaction", size: "S-XL", tipo: "stock", price_eur: 200, desc: "Roupa premium Versace — confortável, estiloso e autêntico. Envio grátis 🇵🇹.", category: "roupas", isBestSeller: true, images: ["imagens_produtos/Versace Chain Reaction_1.jpg", "imagens_produtos/Versace Chain Reaction_2.jpg"]},
        {id: 45, name: "Supreme Box Logo", size: "S-XL", tipo: "stock", price_eur: 150, desc: "Roupa premium Supreme — confortável, estiloso e autêntico. Envio grátis 🇵🇹.", category: "roupas", images: ["imagens_produtos/Supreme Box Logo_1.jpg", "imagens_produtos/Supreme Box Logo_2.jpg"]},
        {id: 46, name: "Off-White Hoodie", size: "S-XL", tipo: "stock", price_eur: 120, desc: "Roupa premium Off-White — confortável, estiloso e autêntico. Envio grátis 🇵🇹.", category: "roupas", images: ["imagens_produtos/Off-White Hoodie_1.jpg", "imagens_produtos/Off-White Hoodie_2.jpg"]},
        {id: 47, name: "Fear of God Essentials", size: "S-XL", tipo: "stock", price_eur: 140, desc: "Roupa premium Fear of God — confortável, estiloso e autêntico. Envio grátis 🇵🇹.", category: "roupas", images: ["imagens_produtos/Fear of God Essentials_1.jpg", "imagens_produtos/Fear of God Essentials_2.jpg"]},
        {id: 48, name: "Stone Island Sweatshirt", size: "S-XL", tipo: "stock", price_eur: 130, desc: "Roupa premium Stone Island — confortável, estiloso e autêntico. Envio grátis 🇵🇹.", category: "roupas", images: ["imagens_produtos/Stone Island Sweatshirt_1.jpg", "imagens_produtos/Stone Island Sweatshirt_2.jpg"]},
        {id: 49, name: "Palace Skateboard", size: "S-XL", tipo: "stock", price_eur: 110, desc: "Roupa premium Palace — confortável, estiloso e autêntico. Envio grátis 🇵🇹.", category: "roupas", images: ["imagens_produtos/Palace Skateboard_1.jpg", "imagens_produtos/Palace Skateboard_2.jpg"]},
        {id: 50, name: "Billionaire Boys Club", size: "S-XL", tipo: "stock", price_eur: 160, desc: "Roupa premium Billionaire Boys Club — confortável, estiloso e autêntico. Envio grátis 🇵🇹.", category: "roupas", images: ["imagens_produtos/Billionaire Boys Club_1.jpg", "imagens_produtos/Billionaire Boys Club_2.jpg"]}
    ];
}

// Garantir que products está disponível globalmente
if (typeof window !== 'undefined') {
    window.products = products;
}
