// Teste ultra simplificado
console.log('=== TESTE ULTRA SIMPLIFICADO ===');

// Teste 1: Verificar se o products.json existe
fetch("./products.json")
    .then(response => {
        console.log('✅ products.json encontrado:', response.status);
        return response.text();
    })
    .then(text => {
        console.log('✅ Texto do products.json (primeiros 200 chars):', text.substring(0, 200));
        
        try {
            const data = JSON.parse(text);
            console.log('✅ JSON válido');
            console.log('✅ Número de produtos:', Object.keys(data).length);
            
            // Testar uma imagem
            const firstProduct = Object.values(data)[0];
            if (firstProduct && firstProduct.images && firstProduct.images.length > 0) {
                const imagePath = "./imagens_produtos/" + firstProduct.images[0];
                console.log('✅ Testando imagem:', imagePath);
                
                const img = new Image();
                img.onload = () => console.log('✅ Imagem carregada com sucesso');
                img.onerror = () => console.error('❌ Erro ao carregar imagem:', imagePath);
                img.src = imagePath;
            }
            
            // Adicionar um produto na tela
            const catalog = document.getElementById("catalog");
            if (catalog) {
                catalog.innerHTML = `
                    <div style="padding: 20px; border: 1px solid #ccc; margin: 10px; border-radius: 8px;">
                        <h3>${firstProduct.name}</h3>
                        <p>Preço: €${firstProduct.price}</p>
                        <p>Status: ${firstProduct.status}</p>
                        <img src="./imagens_produtos/${firstProduct.images[0]}" style="width: 100px; height: 100px; object-fit: cover;" onerror="this.style.display='none'">
                        <p>Imagens: ${firstProduct.images ? firstProduct.images.length : 0}</p>
                    </div>
                `;
                console.log('✅ Produto adicionado ao catálogo');
            }
            
        } catch (e) {
            console.error('❌ Erro ao fazer parse do JSON:', e);
        }
    })
    .catch(error => {
        console.error('❌ Erro ao carregar products.json:', error);
    });

// Teste 2: Verificar elementos DOM
setTimeout(() => {
    console.log('=== VERIFICAÇÃO DOM ===');
    console.log('catalog:', !!document.getElementById("catalog"));
    console.log('loading:', !!document.getElementById("loading"));
    console.log('resultsCount:', !!document.getElementById("resultsCount"));
}, 1000);
