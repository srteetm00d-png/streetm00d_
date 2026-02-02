// CATÁLOGO STREETMOOD - DESIGN SIMPLES

const imageFolder = "./imagens_produtos/";
const catalog = document.getElementById("catalog");

// Carregar produtos
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
                createProductCard(key, data);
            });
        })
        .catch(err => {
            console.error("Erro ao carregar catálogo:", err);
            catalog.innerHTML = `
                <div style="text-align:center;padding:60px;color:#666;grid-column:1/-1">
                    Catálogo indisponível no momento.
                </div>
            `;
        });
}

function createProductCard(key, data) {
    const card = document.createElement("div");
    card.className = "product-card";
    
    card.innerHTML = `
        <img
            loading="lazy"
            src="${imageFolder + (data.images ? data.images[0] : key + '.jpg')}"
            alt="${data.name}"
            onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDIwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjZjBmMGYwIi8+CjxwYXRoIGQ9Ik04MCA5MEgxMjBWMTIwSDgwVjkwWiIgZmlsbD0iIzMzMzMzMyIvPgo8cGF0aCBkPSJNNjAgMTQwSDE0MFYxNjBINjBWMTQwWiIgZmlsbD0iIzMzMzMzMyIvPgo8L3N2Zz4='"
        >
        <div class="product-info">
            <h3 class="product-name">${data.name}</h3>
            <p class="product-price">${data.currency || '€'} ${data.price}</p>
            <button class="contact-btn" onclick="contactProduct('${data.name}', '${data.currency || '€'} ${data.price}')">
                ENVIAR MENSAGEM
            </button>
        </div>
    `;
    
    catalog.appendChild(card);
}

function contactProduct(name, price) {
    const message = encodeURIComponent(`Olá STREETMOOD! Tenho interesse no ${name} (${price}).`);
    window.open(`https://wa.me/351912345678?text=${message}`, '_blank');
}
