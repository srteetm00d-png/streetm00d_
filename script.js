// CATÁLOGO STREETMOOD - APENAS CARREGAMENTO DE PRODUTOS

const imageFolder = "./imagens_produtos/";
const catalog = document.getElementById("catalog-grid");

// Carregar produtos do JSON
document.addEventListener('DOMContentLoaded', function() {
    loadCatalog();
});

function loadCatalog() {
    fetch("./products.json")
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP ${res.status} ao carregar products.json`);
            }
            return res.json();
        })
        .then(products => {
            Object.entries(products).forEach(([key, data]) => {
                createCatalogItem(key, data);
            });
        })
        .catch(err => {
            console.error("Erro ao carregar catálogo:", err);
            catalog.innerHTML = `
                <div style="text-align:center;padding:60px;color:#777;grid-column:1/-1">
                    Catálogo indisponível no momento.<br>
                    Entre em contato direto pelo WhatsApp.
                </div>
            `;
        });
}

// Criar item do catálogo
function createCatalogItem(key, data) {
    const item = document.createElement("article");
    item.className = "catalog-item";
    
    // Contar fotos
    const photoCount = data.images ? data.images.length : 1;
    
    // Formatar tamanho se disponível
    const size = data.size ? `<p class="size">${data.size}</p>` : '';
    
    item.innerHTML = `
        <div class="image-container">
            <span class="photo-count">${photoCount} fotos</span>
            <img
                loading="lazy"
                src="${imageFolder + (data.images ? data.images[0] : key + '.jpg')}"
                alt="${data.name}"
                onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI4MCIgdmlld0JveD0iMCAwIDIwMCAyODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjgwIiBmaWxsPSIjMjAyMDIwIi8+CjxwYXRoIGQ9Ik04MCA5MEgxMjBWMTIwSDgwVjkwWiIgZmlsbD0iIzMzMzMzMyIvPgo8cGF0aCBkPSJNNjAgMTQwSDE0MFYxNjBINjBWMTQwWiIgZmlsbD0iIzMzMzMzMyIvPgo8L3N2Zz4='"
            >
        </div>
        <div class="product-info">
            <h3>${data.name}</h3>
            ${size}
            <p class="price">${data.currency || '€'} ${data.price}</p>
            <button class="contact-btn" onclick="contactAboutProduct('${data.name}', '${data.currency || '€'} ${data.price}')">
                ENVIAR MENSAGEM
            </button>
        </div>
    `;
    
    catalog.appendChild(item);
}

// Contato sobre produto (abre WhatsApp)
function contactAboutProduct(productName, price) {
    const message = encodeURIComponent(`Olá STREETMOOD 👟 Tenho interesse no ${productName} (${price}). Gostaria de mais informações.`);
    window.open(`https://wa.me/351912345678?text=${message}`, '_blank');
}
