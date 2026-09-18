/* ============================================
   CART PAGE — JavaScript
   ============================================ */

/* ===== GET CART FROM LOCALSTORAGE ===== */
function getCart() {
  return JSON.parse(localStorage.getItem('blissfulCart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('blissfulCart', JSON.stringify(cart));
  updateCartCountUI();
}

function updateCartCountUI() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartCountEl = document.getElementById('cartCount');
  if (cartCountEl) cartCountEl.textContent = count;
}

/* ===== RENDER CART ===== */
function renderCart() {
  const cart = getCart();
  const cartEmpty = document.getElementById('cartEmpty');
  const cartContent = document.getElementById('cartContent');
  const cartItemsContainer = document.getElementById('cartItems');
  const cartItemCountEl = document.getElementById('cartItemCount');

  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartEmpty.style.display = 'block';
    cartContent.style.display = 'none';
    if (cartItemCountEl) cartItemCountEl.textContent = '0 items';
    return;
  }

  cartEmpty.style.display = 'none';
  cartContent.style.display = 'grid';

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  if (cartItemCountEl) cartItemCountEl.textContent = `${totalQty} item${totalQty > 1 ? 's' : ''}`;

  cartItemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <div class="item-product">
        <div class="item-img">
          <img src="${item.image}" alt="${item.name}" />
        </div>
        <div class="item-info">
          <h4>${item.name}</h4>
          ${item.tag ? `<span class="item-tag">${item.tag}</span>` : ''}
        </div>
      </div>
      <div class="item-price">
        <span>Rs. ${item.price.toLocaleString()}</span>
        ${item.oldPrice ? `<span class="old">Rs. ${item.oldPrice.toLocaleString()}</span>` : ''}
      </div>
      <div class="item-qty">
        <button class="qty-minus" data-id="${item.id}">−</button>
        <span>${item.qty}</span>
        <button class="qty-plus" data-id="${item.id}">+</button>
      </div>
      <div class="item-total">
        <span>Rs. ${(item.price * item.qty).toLocaleString()}</span>
      </div>
      <button class="item-remove" data-id="${item.id}" aria-label="Remove">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  `).join('');

  // Attach event listeners
  document.querySelectorAll('.qty-plus').forEach(btn => {
    btn.addEventListener('click', () => changeQty(btn.dataset.id, 1));
  });
  document.querySelectorAll('.qty-minus').forEach(btn => {
    btn.addEventListener('click', () => changeQty(btn.dataset.id, -1));
  });
  document.querySelectorAll('.item-remove').forEach(btn => {
    btn.addEventListener('click', () => removeItem(btn.dataset.id));
  });

  updateSummary();
}

/* ===== QUANTITY CHANGE ===== */
function changeQty(id, delta) {
  let cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  saveCart(cart);
  renderCart();
}

/* ===== REMOVE ITEM ===== */
function removeItem(id) {
  let cart = getCart().filter(i => i.id !== id);
  saveCart(cart);
  renderCart();
  showToast('Item removed from cart');
}

/* ===== UPDATE SUMMARY ===== */
function updateSummary() {
  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  // Discount from coupon
  const discount = parseInt(localStorage.getItem('blissfulDiscount')) || 0;
  const shipping = subtotal >= 2000 || subtotal === 0 ? 0 : 200;
  const total = subtotal - discount + shipping;

  document.getElementById('subtotal').textContent = `Rs. ${subtotal.toLocaleString()}`;
  document.getElementById('shipping').textContent = shipping === 0 ? 'Free' : `Rs. ${shipping}`;

  if (discount > 0) {
    document.getElementById('discountRow').style.display = 'flex';
    document.getElementById('discountAmount').textContent = `-Rs. ${discount.toLocaleString()}`;
  } else {
    document.getElementById('discountRow').style.display = 'none';
  }

  document.getElementById('total').textContent = `Rs. ${total.toLocaleString()}`;
}

/* ===== COUPON ===== */
const COUPONS = {
  'BLISS10': { type: 'percent', value: 10 },
  'WELCOME200': { type: 'flat', value: 200 },
  'GLOW15': { type: 'percent', value: 15 }
};

const applyCouponBtn = document.getElementById('applyCoupon');
const couponInput = document.getElementById('couponInput');
const couponMsg = document.getElementById('couponMsg');

if (applyCouponBtn) {
  applyCouponBtn.addEventListener('click', () => {
    const code = couponInput.value.trim().toUpperCase();
    if (!code) return;

    const coupon = COUPONS[code];
    if (!coupon) {
      couponMsg.textContent = '❌ Invalid coupon code';
      couponMsg.classList.add('error');
      return;
    }

    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    let discount = 0;

    if (coupon.type === 'percent') {
      discount = Math.round(subtotal * coupon.value / 100);
    } else {
      discount = coupon.value;
    }

    localStorage.setItem('blissfulDiscount', discount);
    couponMsg.textContent = `🎉 Coupon applied! You saved Rs. ${discount.toLocaleString()}`;
    couponMsg.classList.remove('error');
    couponInput.value = '';
    updateSummary();
  });
}

/* ===== CLEAR CART ===== */
const clearCartBtn = document.getElementById('clearCart');
if (clearCartBtn) {
  clearCartBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      localStorage.removeItem('blissfulCart');
      localStorage.removeItem('blissfulDiscount');
      renderCart();
      showToast('Cart cleared');
    }
  });
}

/* ===== TOAST ===== */
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  updateCartCountUI();
  renderCart();
});