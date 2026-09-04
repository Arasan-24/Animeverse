let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
  const countEl = document.getElementById('cart-count');
  if (countEl) countEl.innerText = cart.length;
}

function addToCart(productId) {
  const item = products.find(p => p.id === productId);
  if (item) {
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${item.name} added to cart!`);
  }
}

function renderProducts(containerId, productList) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = productList.map(p => `
    <div class="card">
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  `).join('');
}

// Initial Rendering
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();

  if (document.getElementById('featured-products')) {
    renderProducts('featured-products', products.slice(0, 3));
  }

  if (document.getElementById('all-products')) {
    renderProducts('all-products', products);

    // Search & Filter Listeners
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');

    function filterData() {
      const query = searchInput.value.toLowerCase();
      const cat = categoryFilter.value;
      const filtered = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(query);
        const matchesCat = cat === 'All' || p.category === cat;
        return matchesSearch && matchesCat;
      });
      renderProducts('all-products', filtered);
    }

    searchInput.addEventListener('input', filterData);
    categoryFilter.addEventListener('change', filterData);
  }

  if (document.getElementById('cart-items')) {
    renderCart();
  }
});

function renderCart() {
  const cartContainer = document.getElementById('cart-items');
  const totalContainer = document.getElementById('cart-total');
  
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalContainer.innerText = "0";
    return;
  }

  cartContainer.innerHTML = cart.map((p, index) => `
    <div class="cart-item">
      <span>${p.name}</span>
      <span>₹${p.price}</span>
    </div>
  `).join('');

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  totalContainer.innerText = total;
}

function clearCart() {
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  renderCart();
  alert("Thank you for your purchase!");
}