// Versão simplificada para teste
console.log('=== INICIANDO VERSÃO SIMPLIFICADA ===');

// Verificar se o DOM está pronto
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado');
    
    // Verificar elementos
    const catalog = document.getElementById("catalog");
    const loading = document.getElementById("loading");
    
    console.log('Elementos encontrados:', {
        catalog: !!catalog,
        loading: !!loading
    });
    
    // Carregar produtos de forma simples
    fetch("./products.json")
        .then(response => {
            console.log('Response status:', response.status);
            return response.json();
        })
        .then(data => {
            console.log('Produtos carregados:', Object.keys(data).length);
            
            // Limpar loading
            if (loading) {
                loading.style.display = 'none';
                console.log('Loading escondido');
            }
            
            // Renderizar produtos de forma simples
            if (catalog) {
                catalog.innerHTML = '';
                
                const products = Object.entries(data);
                products.slice(0, 5).forEach(([key, product]) => {
                    const div = document.createElement('div');
                    div.style.cssText = 'padding: 20px; border: 1px solid #ccc; margin: 10px; border-radius: 8px;';
                    div.innerHTML = `
                        <h3>${product.name}</h3>
                        <p>Preço: €${product.price}</p>
                        <img src="./imagens_produtos/${product.images[0]}" style="width: 100px; height: 100px; object-fit: cover;" onerror="this.style.display='none'">
                    `;
                    catalog.appendChild(div);
                });
                
                console.log('Produtos renderizados');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            if (loading) {
                loading.innerHTML = '<p>Erro ao carregar produtos</p>';
            }
        });
});
