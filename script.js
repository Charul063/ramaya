const products = [
  {
    id: "mogra-crop-coord",
    name: "Mogra Crop Co-ord",
    category: "sets",
    price: 12800,
    color: "Ivory Chambray",
    summary: "Boxy crop top with high-waist wide-leg trousers.",
    description: "A modern co-ord cut in an ivory base with soft mogra-inspired handblock motifs. Designed as an easy full look, but simple enough to style as separates.",
    care: "Gentle hand wash or delicate machine wash. Dry in shade. Warm iron on reverse.",
    images: ["assets/product-coord.png", "assets/mogra-campaign.png"],
  },
  {
    id: "mogra-wrap-dress",
    name: "Mogra Wrap Dress",
    category: "dresses",
    price: 10600,
    color: "Ivory Clay",
    summary: "Sleeveless midi wrap dress with a soft printed border.",
    description: "A clean wrap silhouette made for day plans, holidays, and dressed-up evenings. The print stays delicate so the shape remains the focus.",
    care: "Gentle hand wash or delicate machine wash. Do not bleach. Dry in shade.",
    images: ["assets/product-wrap-dress.png", "assets/mogra-campaign.png"],
  },
  {
    id: "mogra-overlay",
    name: "Mogra Overlay",
    category: "layers",
    price: 8400,
    color: "Ivory Glacier",
    summary: "Open longline layer over a clean ivory base.",
    description: "A lightweight overlay that adds print without heaviness. Wear it over tanks, dresses, trousers, or future menswear-inspired styling.",
    care: "Dry flat in shade. Steam lightly to preserve the fall.",
    images: ["assets/product-overlay.png", "assets/ramaya-hero.png"],
  },
  {
    id: "clay-city-shirt",
    name: "Clay City Shirt",
    category: "shirts",
    price: 11800,
    color: "Soft Clay",
    summary: "Relaxed printed shirt with a refined city-ready fall.",
    description: "A crisp printed shirt designed for polished everyday wear. The cut is relaxed, the print is quiet, and the styling stays minimal.",
    care: "Gentle wash with mild detergent. Low heat iron on reverse.",
    images: ["assets/ramaya-hero.png", "assets/product-coord.png"],
  },
  {
    id: "bisque-day-dress",
    name: "Bisque Day Dress",
    category: "dresses",
    price: 9800,
    color: "Bisque Ivory",
    summary: "Easy midi dress in warm ivory and clay motifs.",
    description: "A soft day dress that keeps the Ramaya print language light and wearable, with enough structure to feel premium.",
    care: "Gentle wash. Dry away from direct sunlight.",
    images: ["assets/product-wrap-dress.png", "assets/product-overlay.png"],
  },
  {
    id: "glacier-trouser-set",
    name: "Glacier Trouser Set",
    category: "sets",
    price: 13200,
    color: "Glacier Blue",
    summary: "A calm set in glacier, chambray, and ivory tones.",
    description: "A fresh set built around comfort and proportion, balancing soft handblock-inspired artwork with clean modern tailoring.",
    care: "Delicate wash. Steam or warm iron on reverse.",
    images: ["assets/product-coord.png", "assets/ramaya-hero.png"],
  },
];

const collections = [
  {
    name: "Mogra",
    note: "Latest campaign in floral handblock language.",
    image: "assets/mogra-campaign.png",
  },
  {
    name: "Glacier",
    note: "Cool ivory and chambray pieces for clean day dressing.",
    image: "assets/product-coord.png",
  },
  {
    name: "Clay Bloom",
    note: "Earthy print stories for overlays and easy trousers.",
    image: "assets/product-overlay.png",
  },
  {
    name: "Bisque Hour",
    note: "Soft dresses and quiet occasion pieces.",
    image: "assets/product-wrap-dress.png",
  },
  {
    name: "Espresso Line",
    note: "Deeper accents, sharper silhouettes, quiet evening polish.",
    image: "assets/ramaya-hero.png",
  },
];

const state = {
  selectedSizes: Object.fromEntries(products.map((product) => [product.id, "M"])),
  cart: [],
  wishlist: JSON.parse(localStorage.getItem("ramayaWishlist") || "[]"),
};

const productGrid = document.querySelector("[data-product-grid]");
const collectionGrid = document.querySelector("[data-collection-grid]");
const wishlistGrid = document.querySelector("[data-wishlist-grid]");
const wishlistEmpty = document.querySelector("[data-wishlist-empty]");
const productDetail = document.querySelector("[data-product-detail]");
const cartDrawer = document.querySelector("[data-cart-drawer]");
const cartItems = document.querySelector("[data-cart-items]");
const cartEmpty = document.querySelector("[data-cart-empty]");
const cartCount = document.querySelector("[data-cart-count]");
const cartTotal = document.querySelector("[data-cart-total]");
const wishlistCount = document.querySelector("[data-wishlist-count]");
const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const currency = new Intl.NumberFormat("en-IN");

function formatPrice(value) {
  return `Rs. ${currency.format(value)}`;
}

function saveWishlist() {
  localStorage.setItem("ramayaWishlist", JSON.stringify(state.wishlist));
}

function isWishlisted(id) {
  return state.wishlist.includes(id);
}

function productCard(product) {
  const active = isWishlisted(product.id) ? "active" : "";
  return `
    <article class="product-card">
      <div class="product-media" data-product-open="${product.id}" role="button" tabindex="0" aria-label="View ${product.name}">
        <img src="${product.images[0]}" alt="${product.name}" />
        <img src="${product.images[1]}" alt="${product.name} alternate view" />
        <button class="wish-button floating-wish ${active}" type="button" data-wishlist-toggle="${product.id}" aria-label="Save ${product.name}">&#9825;</button>
      </div>
      <div class="product-summary">
        <h3>${product.name}</h3>
        <span class="price">${formatPrice(product.price)}</span>
      </div>
    </article>
  `;
}

function renderProducts() {
  productGrid.innerHTML = products.map(productCard).join("");
}

function renderCollections() {
  collectionGrid.innerHTML = collections.map((collection) => `
    <article class="collection-card">
      <img src="${collection.image}" alt="${collection.name} collection" />
      <div class="collection-copy">
        <h3>${collection.name}</h3>
        <p>${collection.note}</p>
      </div>
    </article>
  `).join("");
}

function renderWishlist() {
  const savedProducts = products.filter((product) => isWishlisted(product.id));
  wishlistEmpty.hidden = savedProducts.length > 0;
  wishlistGrid.innerHTML = savedProducts.map(productCard).join("");
  wishlistCount.textContent = state.wishlist.length;
}

function renderCart() {
  cartCount.textContent = state.cart.length;
  const total = state.cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = formatPrice(total);
  cartEmpty.style.display = state.cart.length ? "none" : "block";
  cartItems.innerHTML = state.cart.map((item, index) => `
    <div class="cart-item">
      <img src="${item.images[0]}" alt="${item.name}" />
      <div>
        <h3>${item.name}</h3>
        <p>Size ${item.size} / ${formatPrice(item.price)}</p>
      </div>
      <button class="remove" type="button" data-remove="${index}">Remove</button>
    </div>
  `).join("");
}

function renderProductDetail(product) {
  const selected = state.selectedSizes[product.id] || "M";
  const active = isWishlisted(product.id) ? "active" : "";
  productDetail.innerHTML = `
    <article class="product-detail">
      <div class="detail-gallery">
        ${product.images.map((image) => `<img src="${image}" alt="${product.name}" />`).join("")}
      </div>
      <div class="detail-info">
        <p class="detail-tag">${product.category}</p>
        <h1>${product.name}</h1>
        <div class="detail-price"><span>MRP</span> ${formatPrice(product.price)}</div>
        <p class="tax-note">Inclusive of all taxes</p>
        <div class="color-row">
          <h3>Color: <span>${product.color}</span></h3>
          <div class="color-swatch" aria-label="${product.color}">
            <img src="${product.images[0]}" alt="" />
          </div>
        </div>
        <div class="size-head">
          <h3>Size</h3>
          <button type="button">Size Guide & Model Info ›</button>
        </div>
        <div class="size-grid">
          ${["XS", "S", "M", "L"].map((size) => `
            <button class="size ${selected === size ? "selected" : ""}" type="button" data-size="${size}" data-product="${product.id}">${size}</button>
          `).join("")}
        </div>
        <ul class="detail-list">
          <li><strong>Style</strong><span>${product.summary}</span></li>
          <li><strong>About</strong><span>${product.description}</span></li>
          <li><strong>Care</strong><span>${product.care}</span></li>
        </ul>
        <div class="detail-actions">
          <button class="wish-button ${active}" type="button" data-wishlist-toggle="${product.id}" aria-label="Save ${product.name}">&#9825;</button>
          <button class="detail-add" type="button" data-add="${product.id}">Add to bag</button>
        </div>
      </div>
    </article>
  `;
}

function openCart() {
  document.body.classList.add("cart-open");
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
}

function closeCart() {
  document.body.classList.remove("cart-open");
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
}

function showView() {
  const hash = window.location.hash || "#home";
  const productId = hash.startsWith("#product-") ? hash.replace("#product-", "") : null;
  const product = productId ? products.find((item) => item.id === productId) : null;
  const view = hash === "#wishlist" ? "wishlist" : product ? "product" : "home";

  document.querySelectorAll("[data-view]").forEach((section) => {
    section.hidden = section.dataset.view !== view;
  });

  if (view === "product") renderProductDetail(product);
  if (view === "wishlist") renderWishlist();
  document.body.classList.toggle("product-open", view === "product");
  document.body.classList.remove("menu-open");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleWishlist(id) {
  state.wishlist = isWishlisted(id)
    ? state.wishlist.filter((item) => item !== id)
    : [...state.wishlist, id];
  saveWishlist();
  renderProducts();
  renderWishlist();
  const detailProduct = (window.location.hash || "").replace("#product-", "");
  const product = products.find((item) => item.id === detailProduct);
  if (product) renderProductDetail(product);
}

document.addEventListener("click", (event) => {
  const productOpen = event.target.closest("[data-product-open]");
  const add = event.target.closest("[data-add]");
  const remove = event.target.closest("[data-remove]");
  const size = event.target.closest("[data-size]");
  const wishlist = event.target.closest("[data-wishlist-toggle]");
  const railButton = event.target.closest("[data-scroll-target]");

  if (productOpen && !wishlist && !add) {
    window.location.hash = `#product-${productOpen.dataset.productOpen}`;
  }

  if (add) {
    const product = products.find((item) => item.id === add.dataset.add);
    state.cart.push({ ...product, size: state.selectedSizes[product.id] || "M" });
    renderCart();
    openCart();
  }

  if (remove) {
    state.cart.splice(Number(remove.dataset.remove), 1);
    renderCart();
  }

  if (size) {
    state.selectedSizes[size.dataset.product] = size.dataset.size;
    const product = products.find((item) => item.id === size.dataset.product);
    renderProductDetail(product);
  }

  if (wishlist) {
    toggleWishlist(wishlist.dataset.wishlistToggle);
  }

  if (railButton) {
    const rail = document.querySelector(`[data-rail="${railButton.dataset.scrollTarget}"]`);
    const distance = rail.clientWidth * 0.86 * Number(railButton.dataset.scrollDir);
    rail.scrollBy({ left: distance, behavior: "smooth" });
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCart();
    document.body.classList.remove("menu-open");
  }
  if (event.key === "Enter" && event.target.matches("[data-product-open]")) {
    window.location.hash = `#product-${event.target.dataset.productOpen}`;
  }
});

document.querySelector("[data-menu-toggle]").addEventListener("click", () => {
  document.body.classList.toggle("menu-open");
});

nav.addEventListener("click", () => document.body.classList.remove("menu-open"));
document.querySelector("[data-cart-open]").addEventListener("click", openCart);
document.querySelector("[data-cart-close]").addEventListener("click", closeCart);
document.querySelector("[data-back]").addEventListener("click", () => {
  window.location.hash = "#latest";
});

cartDrawer.addEventListener("click", (event) => {
  if (event.target === cartDrawer) closeCart();
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 12);
});

window.addEventListener("hashchange", showView);

let slideIndex = 0;
setInterval(() => {
  const slides = document.querySelectorAll(".campaign-slide");
  slides[slideIndex].classList.remove("active");
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].classList.add("active");
}, 4200);

renderProducts();
renderCollections();
renderWishlist();
renderCart();
showView();
