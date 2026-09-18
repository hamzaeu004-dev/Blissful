/* ============================================
   CHECKOUT PAGE — JavaScript
   ============================================ */

/* ===== GET CART ===== */
function getCart() {
  return JSON.parse(localStorage.getItem('blissfulCart')) || [];
}

function updateCartCountUI() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartCountEl = document.getElementById('cartCount');
  if (cartCountEl) cartCountEl.textContent = count;
}

/* ===== RENDER ORDER SUMMARY ===== */
function renderSummary() {
  const cart = getCart();
  const itemsContainer = document.getElementById('checkoutItems');

  if (!itemsContainer) return;

  if (cart.length === 0) {
    window.location.href = 'cart.html';
    return;
  }

  itemsContainer.innerHTML = cart.map(item => `
    <div class="co-item">
      <div class="co-item-img" data-qty="${item.qty}">
        <img src="${item.image}" alt="${item.name}" />
      </div>
      <div class="co-item-info">
        <h4>${item.name}</h4>
        <span>Rs. ${item.price.toLocaleString()} × ${item.qty}</span>
      </div>
      <div class="co-item-price">Rs. ${(item.price * item.qty).toLocaleString()}</div>
    </div>
  `).join('');

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const discount = parseInt(localStorage.getItem('blissfulDiscount')) || 0;
  const shipping = subtotal >= 2000 ? 0 : 200;
  const total = subtotal - discount + shipping;

  document.getElementById('coSubtotal').textContent = `Rs. ${subtotal.toLocaleString()}`;
  document.getElementById('coShipping').textContent = shipping === 0 ? 'Free' : `Rs. ${shipping}`;

  const discountRow = document.getElementById('coDiscountRow');
  if (discount > 0) {
    discountRow.style.display = 'flex';
    document.getElementById('coDiscount').textContent = `-Rs. ${discount.toLocaleString()}`;
  } else {
    discountRow.style.display = 'none';
  }

  document.getElementById('coTotal').textContent = `Rs. ${total.toLocaleString()}`;

  return { subtotal, discount, shipping, total };
}

/* ===== PAYMENT OPTION SELECTION ===== */
document.querySelectorAll('.payment-option').forEach(opt => {
  opt.addEventListener('click', () => {
    document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('active'));
    opt.classList.add('active');
    opt.querySelector('input').checked = true;
  });
});

/* ===== PLACE ORDER ===== */
const placeOrderBtn = document.getElementById('placeOrder');

if (placeOrderBtn) {
  placeOrderBtn.addEventListener('click', () => {
    // Validate required fields
    const requiredFields = [
      { id: 'firstName', label: 'First Name' },
      { id: 'lastName', label: 'Last Name' },
      { id: 'email', label: 'Email' },
      { id: 'phone', label: 'Phone Number' },
      { id: 'address', label: 'Street Address' },
      { id: 'city', label: 'City' },
      { id: 'province', label: 'Province' }
    ];

    for (const field of requiredFields) {
      const input = document.getElementById(field.id);
      if (!input || !input.value.trim()) {
        input.focus();
        input.style.borderColor = '#d97784';
        input.style.boxShadow = '0 0 0 3px rgba(217, 119, 132, 0.15)';
        alert(`Please fill in: ${field.label}`);
        return;
      }
    }

    // Email validation
    const email = document.getElementById('email').value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      const emailInput = document.getElementById('email');
      emailInput.style.borderColor = '#d97784';
      emailInput.focus();
      alert('Please enter a valid email address');
      return;
    }

    // Get payment method
    const payment = document.querySelector('input[name="payment"]:checked').value;
    const paymentLabel = {
      cod: 'Cash on Delivery',
      jazzcash: 'JazzCash / Easypaisa',
      card: 'Credit / Debit Card'
    }[payment];

    // Simulate processing
    placeOrderBtn.disabled = true;
    placeOrderBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';

    setTimeout(() => {
      // Generate order number
      const orderNumber = 'BSF-' + Math.floor(100000 + Math.random() * 900000);
      const summary = renderSummary();

      // Populate modal
      document.getElementById('orderNumber').textContent = orderNumber;
      document.getElementById('orderTotal').textContent = `Rs. ${summary.total.toLocaleString()}`;
      document.getElementById('orderPayment').textContent = paymentLabel;

      // Show modal
      document.getElementById('successModal').classList.add('show');

      // Clear cart
      localStorage.removeItem('blissfulCart');
      localStorage.removeItem('blissfulDiscount');
      updateCartCountUI();

      // Reset button (in case user closes modal)
      placeOrderBtn.disabled = false;
      placeOrderBtn.innerHTML = '<i class="fa-solid fa-lock"></i> Place Order';
    }, 1500);
  });
}

/* ===== CLEAR RED BORDER ON INPUT ===== */
document.querySelectorAll('input, textarea, select').forEach(input => {
  input.addEventListener('input', () => {
    input.style.borderColor = '';
    input.style.boxShadow = '';
  });
});

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  updateCartCountUI();
  renderSummary();
});