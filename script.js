// STREETMOOD 2.0 - Sistema Ultra Simplificado
console.log('🚀 Iniciando sistema ultra simplificado...');

// Esperar o DOM carregar completamente
window.addEventListener('load', function() {
    console.log('📱 Página completamente carregada');
    
    // Verificar elementos
    const catalog = document.getElementById("catalog");
    const loading = document.getElementById("loading");
    const resultsCount = document.getElementById("resultsCount");
    
    console.log('Elementos encontrados:', {
        catalog: !!catalog,
        loading: !!loading,
        resultsCount: !!resultsCount
    });
    
    // Carregar produtos imediatamente
    loadProducts();
});

async function loadProducts() {
    console.log('📦 Carregando produtos...');
    
    try {
        // Mostrar loading
        const loading = document.getElementById("loading");
        if (loading) {
            loading.style.display = 'flex';
            loading.innerHTML = '<div style="font-size: 18px;">🔄 Carregando produtos...</div>';
        }
        
        // Carregar JSON
        const response = await fetch("./products.json");
        console.log('Status do fetch:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Dados recebidos:', typeof data, Object.keys(data).length, 'produtos');
        
        // Converter para array
        const products = Object.entries(data);
        console.log('Array criado com', products.length, 'produtos');
        
        // Esconder loading
        if (loading) {
            loading.style.display = 'none';
        }
        
        // Renderizar produtos
        renderProducts(products);
        
    } catch (error) {
        console.error('❌ Erro completo:', error);
        
        const catalog = document.getElementById("catalog");
        if (catalog) {
            catalog.innerHTML = `
                <div style="text-align:center;padding:60px;grid-column:1/-1;">
                    <h3>❌ Erro ao carregar produtos</h3>
                    <p>${error.message}</p>
                    <button onclick="location.reload()" style="padding:10px 20px;background:#007bff;color:white;border:none;border-radius:5px;cursor:pointer;">Recarregar</button>
                </div>
            `;
        }
    }
}

function renderProducts(products) {
    console.log('🎨 Renderizando', products.length, 'produtos');
    
    const catalog = document.getElementById("catalog");
    const resultsCount = document.getElementById("resultsCount");
    
    if (!catalog) {
        console.error('❌ Catálogo não encontrado');
        return;
    }
    
    // Limpar catálogo
    catalog.innerHTML = '';
    
    // Atualizar contador
    if (resultsCount) {
        resultsCount.textContent = `${products.length} produtos encontrados`;
    }
    
    // Renderizar primeiros 10 produtos para teste
    const productsToRender = products.slice(0, 10);
    
    productsToRender.forEach(([key, product], index) => {
        console.log(`Renderizando produto ${index + 1}:`, product.name);
        
        const card = document.createElement('div');
        card.style.cssText = `
            background: white;
            border-radius: 12px;
            padding: 20px;
            margin: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            border: 1px solid #e0e0e0;
            transition: transform 0.3s ease;
        `;
        
        const firstImage = product.images && product.images.length > 0 ? product.images[0] : null;
        
        card.innerHTML = `
            <div style="text-align:center;">
                ${firstImage ? `
                    <img src="./imagens_produtos/${firstImage}" 
                         alt="${product.name}" 
                         style="width:150px;height:150px;object-fit:cover;border-radius:8px;margin-bottom:15px;"
                         onerror="this.style.display='none';this.nextElementSibling.style.display='block';">
                    <div style="display:none;width:150px;height:150px;background:#f0f0f0;border-radius:8px;margin:0 auto 15px;display:flex;align-items:center;justify-content:center;color:#666;">
                        📷 Sem imagem
                    </div>
                ` : ''}
                <h3 style="margin:0 0 10px 0;font-size:16px;color:#333;">${product.name}</h3>
                <p style="margin:0 0 15px 0;font-size:20px;font-weight:bold;color:#007bff;">€${product.price}</p>
                <button onclick="quickBuy('${product.name}', ${product.price})" 
                        style="padding:10px 20px;background:#007bff;color:white;border:none;border-radius:5px;cursor:pointer;font-weight:bold;">
                    🛒 Comprar
                </button>
            </div>
        `;
        
        // Hover effect
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 5px 20px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        });
        
        catalog.appendChild(card);
    });
    
    console.log('✅ Produtos renderizados com sucesso!');
}

function quickBuy(name, price) {
    const message = encodeURIComponent(`Olá STREETMOOD 👟 quero comprar o ${name} ainda está disponível?`);
    window.open(`https://www.instagram.com/direct/t/streetm00d_/?text=${message}`, '_blank');
}

// Função global para recarregar
window.reloadProducts = loadProducts;

console.log('✅ Script carregado e pronto!');
