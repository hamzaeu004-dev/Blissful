/* ============================================
   GLOBAL SCRIPT — Blissful Beauty
   ============================================ */

/* ===== NAVBAR SCROLL EFFECT ===== */
const navbar = document.getElementById('navbar');

if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* ===== MOBILE MENU TOGGLE & OVERLAY ===== */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
let navOverlay = document.getElementById('navOverlay');

if (!navOverlay) {
  navOverlay = document.createElement('div');
  navOverlay.id = 'navOverlay';
  navOverlay.className = 'nav-overlay';
  document.body.appendChild(navOverlay);
}

function closeMobileMenu() {
  if (navLinks) navLinks.classList.remove('active');
  if (hamburger) hamburger.classList.remove('open');
  if (navOverlay) navOverlay.classList.remove('active');
  document.body.classList.remove('menu-open');
  document.documentElement.classList.remove('menu-open');
  document.body.style.overflow = '';
}

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isActive = navLinks.classList.contains('active');
    if (isActive) {
      closeMobileMenu();
    } else {
      navLinks.classList.add('active');
      hamburger.classList.add('open');
      if (navOverlay) navOverlay.classList.add('active');
      document.body.classList.add('menu-open');
      document.documentElement.classList.add('menu-open');
      document.body.style.overflow = 'hidden';
    }
  });

  if (navOverlay) {
    navOverlay.addEventListener('click', closeMobileMenu);
    navOverlay.addEventListener('touchmove', (e) => {
      e.preventDefault();
    }, { passive: false });
  }

  // Close menu on link click (except dropdown trigger)
  navLinks.querySelectorAll('a:not(.dropdown-trigger)').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });
}

/* ===== MOBILE DROPDOWN TOGGLE ===== */
const navDropdowns = document.querySelectorAll('.nav-dropdown');

navDropdowns.forEach(dropdown => {
  const trigger = dropdown.querySelector('.dropdown-trigger');

  if (trigger) {
    trigger.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const isOpen = dropdown.classList.contains('open');
        // Close other dropdowns
        navDropdowns.forEach(d => {
          if (d !== dropdown) d.classList.remove('open');
        });
        dropdown.classList.toggle('open', !isOpen);
      }
    });
  }
});

/* ===== PRODUCT DATA & HELPERS ===== */
function getProductImage(name) {
  const images = {
    'Barrier Skin Moisturizer': 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80',
    'Tinted Sunscreen SPF 60': 'https://images.unsplash.com/photo-1556228852-80b6e5eeff06?w=500&q=80',
    'Brightening Vitamin C Serum': 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&q=80',
    'Brightening Serum': 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&q=80',
    'Vitamin C Hydrating Cleanser': 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&q=80',
    'Hydrating Cleanser': 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&q=80',
    'Barrier Repair Cleanser': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&q=80',
    'Barrier Repair Moisturizer': 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?w=500&q=80',
    'AHA/BHA Toner': 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&q=80',
    'Acne Serum': 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80',
    'Hyaluronic Acid': 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80',
    'Miracle Moisturiser': 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&q=80',
    'Water Cream': 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=500&q=80',
    'Complexion Correcting Serum': 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=500&q=80',
    'Melt Away Cleansing Oil': 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&q=80',
    'Multi-Peptide Centella Serum': 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=500&q=80',
    'Glow Starter Kit': 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&q=80',
    'Acne Care Bundle': 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&q=80',
    'Bright & Glowing Skin Bundle': 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&q=80',
    'Teenage Skincare Bundle': 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&q=80',
    'Hydrated & Plump Skin Bundle': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80',
    'Bride-to-Be Glow Kit': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80'
  };
  return images[name] || 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&q=80';
}

function getProductPrice(name) {
  const prices = {
    'Barrier Skin Moisturizer': { price: 2200, oldPrice: null },
    'Tinted Sunscreen SPF 60': { price: 1950, oldPrice: null },
    'Brightening Vitamin C Serum': { price: 2400, oldPrice: null },
    'Brightening Serum': { price: 2400, oldPrice: null },
    'Vitamin C Hydrating Cleanser': { price: 1850, oldPrice: null },
    'Hydrating Cleanser': { price: 1317, oldPrice: 1550 },
    'Barrier Repair Cleanser': { price: 1487, oldPrice: 1750 },
    'Barrier Repair Moisturizer': { price: 1020, oldPrice: 1200 },
    'AHA/BHA Toner': { price: 1657, oldPrice: 1950 },
    'Acne Serum': { price: 1870, oldPrice: 2200 },
    'Hyaluronic Acid': { price: 1870, oldPrice: 2200 },
    'Miracle Moisturiser': { price: 1275, oldPrice: 1500 },
    'Water Cream': { price: 1232, oldPrice: 1450 },
    'Complexion Correcting Serum': { price: 1870, oldPrice: 2200 },
    'Melt Away Cleansing Oil': { price: 2252, oldPrice: 2650 },
    'Multi-Peptide Centella Serum': { price: 2082, oldPrice: 2450 },
    'Glow Starter Kit': { price: 5200, oldPrice: 6000 },
    'Acne Care Bundle': { price: 4800, oldPrice: 5700 },
    'Bright & Glowing Skin Bundle': { price: 3400, oldPrice: 4000 },
    'Teenage Skincare Bundle': { price: 3867, oldPrice: 4550 },
    'Hydrated & Plump Skin Bundle': { price: 6460, oldPrice: 7600 },
    'Bride-to-Be Glow Kit': { price: 8500, oldPrice: 10000 }
  };
  return prices[name] || { price: 1500, oldPrice: null };
}

/* ===== CART LOCAL STORAGE HELPERS ===== */
function addToCartStorage(productName, qty = 1) {
  if (!productName) return;

  let cart = JSON.parse(localStorage.getItem('blissfulCart')) || [];
  const existingItem = cart.find(item => item.name === productName);
  const { price, oldPrice } = getProductPrice(productName);

  if (existingItem) {
    existingItem.qty += qty;
  } else {
    cart.push({
      id: 'p-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
      name: productName,
      price: price,
      oldPrice: oldPrice,
      qty: qty,
      image: getProductImage(productName),
      tag: 'Blissful Beauty'
    });
  }

  localStorage.setItem('blissfulCart', JSON.stringify(cart));
  syncCartCountUI();
}

function syncCartCountUI() {
  const cart = JSON.parse(localStorage.getItem('blissfulCart')) || [];
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartCountEl = document.getElementById('cartCount');

  if (cartCountEl) {
    cartCountEl.textContent = count;
  }
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = msg;
  toast.classList.add('show');

  const cartIcon = document.querySelector('.cart-btn');
  if (cartIcon) {
    cartIcon.style.transform = 'scale(1.2)';
    setTimeout(() => cartIcon.style.transform = 'scale(1)', 250);
  }

  clearTimeout(window.toastTimeout);
  window.toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}

/* ===== GLOBAL ADD TO CART LISTENER ===== */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.add-cart');
  if (btn) {
    e.preventDefault();
    const productName = btn.getAttribute('data-name') || 'Product';
    const qtyInput = document.getElementById('qtyInput');
    const qty = qtyInput ? (parseInt(qtyInput.value) || 1) : 1;

    addToCartStorage(productName, qty);
    showToast(`${productName} added to cart ✓`);
  }
});

/* ===== NEWSLETTER FORM ===== */
const newsletterForm = document.getElementById('newsletterForm');
const newsletterMsg = document.getElementById('newsletterMsg');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input').value;

    if (email) {
      if (newsletterMsg) {
        newsletterMsg.textContent = '🎉 Thank you! Check your email for 10% off code.';
      } else {
        showToast('🎉 Thank you! Check your email for 10% off code.');
      }
      newsletterForm.reset();

      if (newsletterMsg) {
        setTimeout(() => {
          newsletterMsg.textContent = '';
        }, 4000);
      }
    }
  });
}

/* ===== SCROLL REVEAL ANIMATION ===== */
const revealElements = document.querySelectorAll(
  '.routine-card, .product-card, .bundle-card, .testimonial-card, .about-grid, .section-head, .category-hero-text, .info-item'
);

if (revealElements.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
  });
}

/* ===== WISHLIST TOGGLE (Global) ===== */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.wishlist');
  if (btn) {
    e.preventDefault();
    const icon = btn.querySelector('i');
    if (!icon) return;

    icon.classList.toggle('fa-regular');
    icon.classList.toggle('fa-solid');
    const isSaved = icon.classList.contains('fa-solid');
    btn.style.background = isSaved ? '#d97784' : '';
    btn.style.color = isSaved ? '#fff' : '';

    const card = btn.closest('.product-card');
    const productName = card ? (card.getAttribute('data-name') || 'Product') : 'Product';
    showToast(isSaved ? `${productName} added to wishlist ❤️` : `${productName} removed from wishlist`);
  }
});

/* ===== ACTIVE PAGE HIGHLIGHT & NAVBAR ENHANCEMENT ===== */
document.addEventListener('DOMContentLoaded', () => {
  syncCartCountUI();

  let currentPage = window.location.pathname.split('/').pop();
  if (!currentPage || currentPage === '' || currentPage === '/') {
    currentPage = 'index.html';
  }

  // Clear previous active states
  document.querySelectorAll('.nav-links > a, .dropdown-menu a, .dropdown-trigger').forEach(el => {
    el.classList.remove('active');
  });

  // 1. Direct top nav link matching
  document.querySelectorAll('.nav-links > a').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage && linkPage === currentPage) {
      link.classList.add('active');
    }
  });

  // Special case: Single Product Detail page (product.html) highlights "Shop All"
  if (currentPage === 'product.html') {
    const shopAllLink = document.querySelector('.nav-links > a[href="products.html"]');
    if (shopAllLink) shopAllLink.classList.add('active');
  }

  // 2. Dropdown item matching & parent dropdown trigger activation
  document.querySelectorAll('.dropdown-menu a').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage && linkPage === currentPage) {
      link.classList.add('active');
      const parentDropdown = link.closest('.nav-dropdown');
      if (parentDropdown) {
        const trigger = parentDropdown.querySelector('.dropdown-trigger');
        if (trigger) trigger.classList.add('active');
      }
    }
  });
});

/* ===== LIVE SEARCH MODAL & ACCOUNT MODAL INTEGRATION ===== */
function initSearchModal() {
  // Inject Search Modal if not present
  if (!document.getElementById('searchModal')) {
    const modalHTML = `
      <div class="search-modal" id="searchModal">
        <div class="search-box">
          <div class="search-header">
            <div class="search-input-wrap">
              <i class="fa-solid fa-magnifying-glass"></i>
              <input type="text" id="searchInput" placeholder="Search products, ingredients, skin concerns..." autocomplete="off" />
            </div>
            <button class="search-close" id="searchClose"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <div class="search-results" id="searchResults">
            <p class="search-hint">Start typing to search our catalog...</p>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  const searchModal = document.getElementById('searchModal');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  const searchClose = document.getElementById('searchClose');

  const products = [
    { name: 'Barrier Skin Moisturizer', cat: 'Moisturizers', price: 'Rs. 2,200', img: getProductImage('Barrier Skin Moisturizer'), link: 'product.html' },
    { name: 'Tinted Sunscreen SPF 60', cat: 'Sunscreens', price: 'Rs. 1,950', img: getProductImage('Tinted Sunscreen SPF 60'), link: 'product.html' },
    { name: 'Brightening Serum', cat: 'Serums', price: 'Rs. 2,400', img: getProductImage('Brightening Serum'), link: 'product.html' },
    { name: 'Vitamin C Hydrating Cleanser', cat: 'Cleansers', price: 'Rs. 1,850', img: getProductImage('Vitamin C Hydrating Cleanser'), link: 'product.html' },
    { name: 'AHA/BHA Toner', cat: 'Toners', price: 'Rs. 1,657', img: getProductImage('AHA/BHA Toner'), link: 'product.html' },
    { name: 'Barrier Repair Cleanser', cat: 'Cleansers', price: 'Rs. 1,487', img: getProductImage('Barrier Repair Cleanser'), link: 'product.html' },
    { name: 'Acne Serum', cat: 'Serums', price: 'Rs. 1,870', img: getProductImage('Acne Serum'), link: 'product.html' },
    { name: 'Glow Starter Kit', cat: 'Bundles', price: 'Rs. 5,200', img: getProductImage('Glow Starter Kit'), link: 'product.html' },
    { name: 'Acne Care Bundle', cat: 'Bundles', price: 'Rs. 4,800', img: getProductImage('Acne Care Bundle'), link: 'product.html' },
    { name: 'Bride-to-Be Glow Kit', cat: 'Bundles', price: 'Rs. 8,500', img: getProductImage('Bride-to-Be Glow Kit'), link: 'product.html' }
  ];

  document.querySelectorAll('.search-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      searchModal.classList.add('show');
      setTimeout(() => searchInput.focus(), 100);
    });
  });

  if (searchClose) {
    searchClose.addEventListener('click', () => {
      searchModal.classList.remove('show');
    });
  }

  if (searchModal) {
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) searchModal.classList.remove('show');
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim().toLowerCase();
      if (!q) {
        searchResults.innerHTML = '<p class="search-hint">Start typing to search our catalog...</p>';
        return;
      }

      const matches = products.filter(p => p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q));

      if (matches.length === 0) {
        searchResults.innerHTML = '<p class="search-hint">No matching products found.</p>';

        return;
      }

      searchResults.innerHTML = matches.map(p => `
        <div class="search-item">
          <img src="${p.img}" alt="${p.name}" />
          <div class="search-item-info">
            <span class="search-item-cat">${p.cat}</span>
            <h4><a href="${p.link}">${p.name}</a></h4>
            <span class="search-item-price">${p.price}</span>
          </div>
          <button class="btn btn-primary add-cart" data-name="${p.name}">Add</button>
        </div>
      `).join('');
    });
  }
}

// User trigger feedback
document.querySelectorAll('.user-trigger').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    showToast('👤 Account Feature Coming Soon! Enjoy Shopping');
  });
});

/* ===== THEME TOGGLE (LIGHT & DARK MODE) ===== */
(function() {
  const savedTheme = localStorage.getItem('blissfulTheme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
})();

function initThemeToggle() {
  // Inject Theme Button into .nav-icons if not present
  document.querySelectorAll('.nav-icons').forEach(navIcons => {
    if (!navIcons.querySelector('.theme-trigger')) {
      const themeBtn = document.createElement('button');
      themeBtn.className = 'icon-btn theme-trigger';
      themeBtn.setAttribute('aria-label', 'Toggle Theme');
      themeBtn.setAttribute('title', 'Toggle Light/Dark Mode');
      const isDark = document.body.classList.contains('dark-mode');
      themeBtn.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-regular fa-moon"></i>';
      
      const cartBtn = navIcons.querySelector('.cart-btn');
      if (cartBtn) {
        navIcons.insertBefore(themeBtn, cartBtn);
      } else {
        navIcons.appendChild(themeBtn);
      }
    }
  });

  // Handle click on theme button
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.theme-trigger');
    if (btn) {
      e.preventDefault();
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('blissfulTheme', isDark ? 'dark' : 'light');

      document.querySelectorAll('.theme-trigger').forEach(b => {
        b.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-regular fa-moon"></i>';
      });

      showToast(isDark ? '🌙 Switched to Dark Mode' : '☀️ Switched to Light Mode');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initSearchModal();
  initThemeToggle();
});