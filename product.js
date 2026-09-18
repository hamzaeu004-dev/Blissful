/* ============================================
   PRODUCT PAGE — JavaScript
   ============================================ */

/* ===== IMAGE GALLERY ===== */
const mainImage = document.getElementById('mainImage');
const thumbs = document.querySelectorAll('.thumb');

thumbs.forEach(thumb => {
  thumb.addEventListener('click', () => {
    thumbs.forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
    const newSrc = thumb.getAttribute('data-img');
    if (mainImage) {
      mainImage.style.opacity = '0';
      setTimeout(() => {
        mainImage.src = newSrc;
        mainImage.style.opacity = '1';
      }, 150);
    }
  });
});

/* ===== QUANTITY SELECTOR ===== */
const qtyInput = document.getElementById('qtyInput');
const qtyBtns = document.querySelectorAll('.qty-btn');

qtyBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (!qtyInput) return;
    let current = parseInt(qtyInput.value) || 1;
    const action = btn.getAttribute('data-action');

    if (action === 'plus') {
      current++;
    } else if (action === 'minus' && current > 1) {
      current--;
    }

    qtyInput.value = current;
  });
});

/* ===== VARIANT SELECTION ===== */
const variantBtns = document.querySelectorAll('.variant-btn');

variantBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    variantBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

/* ===== TABS ===== */
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-tab');

    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));

    btn.classList.add('active');
    const targetEl = document.getElementById(`tab-${target}`);
    if (targetEl) targetEl.classList.add('active');
  });
});

/* ===== ADD TO CART (Main button) ===== */
const addToCartMain = document.querySelector('.add-to-cart-main');
const buyNowBtn = document.querySelector('.buy-now-btn');

if (addToCartMain) {
  addToCartMain.addEventListener('click', () => {
    const name = addToCartMain.getAttribute('data-name') || 'AHA/BHA Toner';
    const qty = qtyInput ? (parseInt(qtyInput.value) || 1) : 1;
    if (typeof addToCartStorage === 'function') {
      addToCartStorage(name, qty);
      showToast(`${name} (${qty}) added to cart ✓`);
    }
  });
}

if (buyNowBtn) {
  buyNowBtn.addEventListener('click', () => {
    const name = buyNowBtn.getAttribute('data-name') || 'AHA/BHA Toner';
    const qty = qtyInput ? (parseInt(qtyInput.value) || 1) : 1;
    if (typeof addToCartStorage === 'function') {
      addToCartStorage(name, qty);
    }
    window.location.href = 'checkout.html';
  });
}

/* ===== WISHLIST TOGGLE ===== */
const wishlistBtn = document.querySelector('.wishlist-btn');
if (wishlistBtn) {
  wishlistBtn.addEventListener('click', () => {
    const icon = wishlistBtn.querySelector('i');
    if (!icon) return;

    icon.classList.toggle('fa-regular');
    icon.classList.toggle('fa-solid');
    const isSaved = icon.classList.contains('fa-solid');

    if (isSaved) {
      wishlistBtn.style.background = '#d97784';
      wishlistBtn.style.color = '#fff';
    } else {
      wishlistBtn.style.background = '';
      wishlistBtn.style.color = '';
    }
    if (typeof showToast === 'function') {
      showToast(isSaved ? 'Added to wishlist ❤️' : 'Removed from wishlist');
    }
  });
}