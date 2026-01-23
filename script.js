const imageFolder = "imagens_produtos/";
const grid = document.getElementById("product-grid");

fetch(imageFolder)
  .then(res => res.text())
  .then(html => {
    const temp = document.createElement("div");
    temp.innerHTML = html;

    const files = [...temp.querySelectorAll("a")]
      .map(a => a.getAttribute("href"))
      .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

    const products = {};

    files.forEach(file => {
      const base = file
        .replace(/_\d+\.(jpg|jpeg|png|webp)$/i, "")
        .replace(/\.(jpg|jpeg|png|webp)$/i, "");

      if (!products[base]) products[base] = [];
      products[base].push(file);
    });

    Object.entries(products).forEach(([name, images]) => {
      createCard(name, images);
    });
  });

function createCard(name, images) {
  const card = document.createElement("div");
  card.className = "product-card";

  card.innerHTML = `
    <img class="product-image" loading="lazy" src="${imageFolder + images[0]}">
    <div class="product-info">
      <div class="product-price">€150</div>
      <div class="product-name">${formatName(name)}</div>
      <button class="btn-primary">View</button>
    </div>
  `;

  card.querySelector(".btn-primary").onclick = () => openModal(name, images);
  grid.appendChild(card);
}

const modal = document.getElementById("modal");
const modalImages = document.getElementById("modal-images");
const modalName = document.getElementById("modal-name");

function openModal(name, images) {
  modalImages.innerHTML = "";

  images.forEach(img => {
    const i = document.createElement("img");
    i.src = imageFolder + img;
    modalImages.appendChild(i);
  });

  modalName.textContent = formatName(name);
  modal.classList.remove("hidden");
}

document.querySelector(".modal-backdrop").onclick = () => {
  modal.classList.add("hidden");
};

function formatName(name) {
  return name.replace(/[-_]/g, " ");
}
