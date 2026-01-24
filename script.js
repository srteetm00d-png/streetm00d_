const imageFolder = "./imagens_produtos/";
const grid = document.getElementById("product-grid");

let lastFocusedElement = null;

// 🛒 E-commerce cart base
const cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(product) {
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  
  // Show feedback
  const button = event.target;
  const originalText = button.textContent;
  button.textContent = "Added ✓";
  button.style.background = "#4CAF50";
  
  setTimeout(() => {
    button.textContent = originalText;
    button.style.background = "";
  }, 1500);
  
  // Track event
  track("add_to_cart", { product: product.name });
}

// 📊 Analytics tracking
function track(event, data = {}) {
  if (window.gtag) {
    gtag("event", event, data);
  }
  // Production-ready logging
  if (location.hostname === "localhost") {
    console.log("Track:", event, data);
  }
}

// 🎯 Drop-specific loading
function loadDrop(tag) {
  fetch("./products.json")
    .then(res => res.json())
    .then(products => {
      Object.entries(products)
        .filter(([key, data]) => data.tags && data.tags.includes(tag))
        .forEach(([key, data]) => createCard(key, data));
    })
    .catch(err => {
      console.error("Drop load error:", err);
      grid.innerHTML = '<div style="text-align: center; color: #666; padding: 60px;">No products available for this drop</div>';
    });
}

document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on a drop page
  if (window.location.pathname.includes('/drop-')) {
    // Let the drop page handle loading
    return;
  }
  loadProducts();
});

function loadProducts() {
  fetch("./products.json")
    .then(res => res.json())
    .then(products => {
      Object.entries(products).forEach(([key, data]) => {
        createCard(key, data);
      });
    })
    .catch(err => {
      console.error("Products load error:", err);
      // Fallback: show empty state
      grid.innerHTML = '<div style="text-align: center; color: #666; padding: 60px;">No products available</div>';
    });
}

function createCard(key, data) {
  const card = document.createElement("div");
  card.className = "product-card";
  
  // Add staggered animation
  const delay = Array.from(grid.children).length * 0.1;
  card.style.animationDelay = `${delay}s`;

  card.innerHTML = `
    <img
      class="product-image"
      loading="lazy"
      src="${imageFolder + data.images[0]}"
      alt="Product image of ${data.name}"
      onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI4MCIgdmlld0JveD0iMCAwIDIwMCAyODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjgwIiBmaWxsPSIjMjAyMDIwIi8+CjxwYXRoIGQ9Ik04MCA5MEgxMjBWMTIwSDgwVjkwWiIgZmlsbD0iIzMzMzMzMyIvPgo8cGF0aCBkPSJNNjAgMTQwSDE0MFYxNjBINjBWMTQwWiIgZmlsbD0iIzMzMzMzMyIvPgo8L3N2Zz4='"
    >
    <div class="product-info">
      <div class="product-price">${data.currency} ${data.price}</div>
      <div class="product-name">${data.name}</div>
      <button class="btn-primary">Add to cart</button>
    </div>
  `;

  // Safe event handling (no inline JS)
  const btn = card.querySelector(".btn-primary");
  btn.addEventListener("click", e => {
    e.stopPropagation();
    addToCart(data);
  });

  // Track product view
  card.addEventListener('click', function(e) {
    if (!e.target.classList.contains('btn-primary')) {
      track("view_product", { product: data.name });
      openModal(key, data);
    }
  });
  
  grid.appendChild(card);
  
  // Observe immediately for scroll animations
  observer.observe(card);
}

const modal = document.getElementById("modal");
const modalImages = document.getElementById("modal-images");
const modalName = document.getElementById("modal-name");

function openModal(key, data) {
  lastFocusedElement = document.activeElement;

  modalImages.innerHTML = "";

  data.images.forEach(img => {
    const i = document.createElement("img");
    i.src = imageFolder + img;
    i.alt = `Detail image of ${data.name}`;
    i.loading = "lazy";
    modalImages.appendChild(i);
  });

  modalName.textContent = data.name;
  modal.classList.remove("hidden");
  
  // Focus management for accessibility
  modal.querySelector(".modal-close").focus();
  
  // Prevent body scroll when modal is open
  document.body.style.overflow = 'hidden';
  
  // Track modal view
  track("view_modal", { product: data.name });
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

// 🧬 Scroll-driven animations (fixed race condition)
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  },
  { threshold: 0.2 }
);

function formatName(name) {
  return name.replace(/[-_]/g, " ");
}
