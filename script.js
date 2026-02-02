const imageFolder = "./imagens_produtos/";
const grid = document.getElementById("product-grid");

let currentProduct = null;
let lastFocusedElement = null;

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

// 🎯 Load products from JSON
document.addEventListener('DOMContentLoaded', function() {
  loadProducts();
});

function loadProducts() {
  fetch("./products.json")
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} loading products.json`);
      }
      return res.json();
    })
    .then(products => {
      Object.entries(products).forEach(([key, data]) => {
        createCard(key, data);
      });
    })
    .catch(err => {
      console.error("Products load error:", err);
      grid.innerHTML = `
        <div style="text-align:center;padding:60px;color:#777">
          Products unavailable.<br>
          Check products.json path and encoding.
        </div>
      `;
    });
}

// 📦 Create product card for grid
function createCard(key, data) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.tabIndex = 0;
  
  // Count photos
  const photoCount = data.images ? data.images.length : 1;
  
  // Format size if available
  const size = data.size ? `<p class="size">${data.size}</p>` : '';
  
  card.innerHTML = `
    <div class="image-container">
      <span class="photo-count">${photoCount} fotos</span>
      <img
        loading="lazy"
        src="${imageFolder + (data.images ? data.images[0] : key + '.jpg')}"
        alt="Product image of ${data.name}"
        onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI4MCIgdmlld0JveD0iMCAwIDIwMCAyODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjgwIiBmaWxsPSIjMjAyMDIwIi8+CjxwYXRoIGQ9Ik04MCA5MEgxMjBWMTIwSDgwVjkwWiIgZmlsbD0iIzMzMzMzMyIvPgo8cGF0aCBkPSJNNjAgMTQwSDE0MFYxNjBINjBWMTQwWiIgZmlsbD0iIzMzMzMzMyIvPgo8L3N2Zz4='"
      >
    </div>
    <div class="product-info">
      <h3>${data.name}</h3>
      ${size}
      <p class="price">${data.currency || '€'} ${data.price}</p>
      <button class="btn-more">Ver mais</button>
    </div>
  `;

  // Safe event handling
  const btn = card.querySelector(".btn-more");
  btn.addEventListener("click", e => {
    e.stopPropagation();
    track("view_product", { product: data.name });
    openProductModal(key, data);
  });

  // Track product view on card click
  card.addEventListener('click', function(e) {
    if (!e.target.classList.contains('btn-more')) {
      track("view_product", { product: data.name });
      openProductModal(key, data);
    }
  });
  
  // Keyboard support
  card.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      track("view_product", { product: data.name });
      openProductModal(key, data);
    }
  });
  
  grid.appendChild(card);
}

// 📱 Open product modal with mobile design
function openProductModal(key, data) {
  lastFocusedElement = document.activeElement;
  currentProduct = data;
  
  const modal = document.getElementById('product-modal');
  const track = document.getElementById('modal-carousel-track');
  const dots = document.getElementById('modal-carousel-dots');
  
  // Update modal content
  document.getElementById('modal-product-name').textContent = data.name;
  document.getElementById('modal-product-price').textContent = `${data.currency || '€'} ${data.price}`;
  document.getElementById('modal-product-desc').textContent = data.description || `${data.name} — Disponível no STREETMOOD. Envio grátis 🇵🇹`;
  
  // Prepare images
  const images = data.images && data.images.length > 0 
    ? data.images.map(img => imageFolder + img)
    : [imageFolder + key + '.jpg'];
  
  // Load images into carousel
  track.innerHTML = '';
  dots.innerHTML = '';
  
  images.forEach((imgSrc, index) => {
    // Add image
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = `${data.name} - Image ${index + 1}`;
    img.loading = 'lazy';
    track.appendChild(img);
    
    // Add dot
    const dot = document.createElement('span');
    dot.className = 'dot';
    if (index === 0) dot.classList.add('active');
    dot.onclick = () => scrollToSlide(index);
    dots.appendChild(dot);
  });
  
  // Show modal
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  
  // Set up scroll listener for dots
  track.addEventListener('scroll', updateDots);
  
  // Focus management
  modal.querySelector('.close-btn').focus();
  
  // Track modal view
  track("view_modal", { product: data.name });
}

// 🎯 Update dots based on scroll position
function updateDots() {
  const track = document.getElementById('modal-carousel-track');
  const dots = document.querySelectorAll('.dot');
  
  const index = Math.round(track.scrollLeft / track.offsetWidth);
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

// 📱 Scroll to specific slide
function scrollToSlide(index) {
  const track = document.getElementById('modal-carousel-track');
  const slideWidth = track.offsetWidth;
  track.scrollTo({
    left: slideWidth * index,
    behavior: 'smooth'
  });
}

// ❌ Close product modal
function closeProductModal() {
  const modal = document.getElementById('product-modal');
  modal.classList.add('hidden');
  document.body.style.overflow = '';
  
  // Restore focus
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
  
  // Clean up scroll listener
  const track = document.getElementById('modal-carousel-track');
  track.removeEventListener('scroll', updateDots);
}

// 📷 Instagram contact function
function contactInstagram() {
  if (!currentProduct) return;
  
  const user = "streetm00d_";
  const message = encodeURIComponent(`Olá STREETMOOD 👟 Tenho interesse no ${currentProduct.name} (${currentProduct.currency || '€'}${currentProduct.price}). Ainda está disponível?`);
  
  // Try to open Instagram DM
  window.open(`https://www.instagram.com/direct/t/${user}?text=${message}`, '_blank');
  
  track("instagram_contact", { product: currentProduct.name });
}

// ⌨️ Keyboard navigation for modal
document.addEventListener('keydown', function(e) {
  const modal = document.getElementById('product-modal');
  
  if (!modal.classList.contains('hidden')) {
    if (e.key === 'Escape') {
      closeProductModal();
    }
    
    // Arrow keys for carousel
    if (e.key === 'ArrowLeft') {
      navigateCarousel(-1);
    } else if (e.key === 'ArrowRight') {
      navigateCarousel(1);
    }
  }
});

// 🔄 Navigate carousel with arrows
function navigateCarousel(direction) {
  const track = document.getElementById('modal-carousel-track');
  const dots = document.querySelectorAll('.dot');
  const currentIndex = Math.round(track.scrollLeft / track.offsetWidth);
  
  let newIndex = currentIndex + direction;
  if (newIndex < 0) newIndex = dots.length - 1;
  if (newIndex >= dots.length) newIndex = 0;
  
  scrollToSlide(newIndex);
}

// 📱 Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('DOMContentLoaded', function() {
  const track = document.getElementById('modal-carousel-track');
  
  track.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  track.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
});

function handleSwipe() {
  const track = document.getElementById('modal-carousel-track');
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe left - next slide
      navigateCarousel(1);
    } else {
      // Swipe right - previous slide
      navigateCarousel(-1);
    }
  }
}

// 🔄 Close modal when clicking backdrop
document.addEventListener('click', function(e) {
  const modal = document.getElementById('product-modal');
  if (e.target === modal) {
    closeProductModal();
  }
});

// 📱 Prevent body scroll when modal is open on iOS
document.addEventListener('touchmove', function(e) {
  const modal = document.getElementById('product-modal');
  if (!modal.classList.contains('hidden')) {
    const track = document.getElementById('modal-carousel-track');
    if (!track.contains(e.target)) {
      e.preventDefault();
    }
  }
}, { passive: false });
