const imageFolder = "./imagens_produtos/";
const grid = document.getElementById("product-grid");

let lastFocusedElement = null;

document.addEventListener('DOMContentLoaded', function() {
  loadProducts();
});

function loadProducts() {
  fetch("./products.json")
    .then(res => res.json())
    .then(products => {
      Object.entries(products).forEach(([name, data]) => {
        createCard(name, data);
      });
    })
    .catch(err => {
      console.error("Products load error:", err);
      // Fallback: show empty state
      grid.innerHTML = '<div style="text-align: center; color: #666; padding: 60px;">No products available</div>';
    });
}

function createCard(name, data) {
  const card = document.createElement("div");
  card.className = "product-card";

  card.innerHTML = `
    <img
      class="product-image"
      loading="lazy"
      src="${imageFolder + data.images[0]}"
      alt="Product image of ${formatName(name)}"
      onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI4MCIgdmlld0JveD0iMCAwIDIwMCAyODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjgwIiBmaWxsPSIjMjAyMDIwIi8+CjxwYXRoIGQ9Ik04MCA5MEgxMjBWMTIwSDgwVjkwWiIgZmlsbD0iIzMzMzMzMyIvPgo8cGF0aCBkPSJNNjAgMTQwSDE0MFYxNjBINjBWMTQwWiIgZmlsbD0iIzMzMzMzMyIvPgo8L3N2Zz4='"
    >
    <div class="product-info">
      <div class="product-price">${data.price}</div>
      <div class="product-name">${formatName(name)}</div>
      <button class="btn-primary">View</button>
    </div>
  `;

  card.querySelector(".btn-primary").onclick = () => openModal(name, data);
  grid.appendChild(card);
}

const modal = document.getElementById("modal");
const modalImages = document.getElementById("modal-images");
const modalName = document.getElementById("modal-name");

function openModal(name, data) {
  lastFocusedElement = document.activeElement;

  modalImages.innerHTML = "";

  data.images.forEach(img => {
    const i = document.createElement("img");
    i.src = imageFolder + img;
    i.alt = `Detail image of ${formatName(name)}`;
    i.loading = "lazy";
    modalImages.appendChild(i);
  });

  modalName.textContent = formatName(name);
  modal.classList.remove("hidden");
  
  // Focus management for accessibility
  modal.querySelector(".modal-close").focus();
  
  // Prevent body scroll when modal is open
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.add("hidden");
  document.body.style.overflow = '';
  
  // Restore focus to previous element
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

document.querySelector(".modal-backdrop").onclick = closeModal;
document.querySelector(".modal-close").onclick = closeModal;

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Trap focus within modal for accessibility
document.addEventListener('keydown', function(e) {
  if (!modal.classList.contains('hidden')) {
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  }
});

function formatName(name) {
  return name.replace(/[-_]/g, " ");
}
