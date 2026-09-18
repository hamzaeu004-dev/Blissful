/* ===== SORT & FILTER FUNCTIONALITY ===== */
const sortSelect = document.getElementById('sortSelect');
const productsGrid = document.getElementById('productsGrid');
const resultsCount = document.getElementById('resultsCount');

if (sortSelect && productsGrid) {
  sortSelect.addEventListener('change', () => {
    const cards = Array.from(productsGrid.querySelectorAll('.product-card'));
    const val = sortSelect.value;

    cards.sort((a, b) => {
      const priceA = parseFloat(a.dataset.price) || 0;
      const priceB = parseFloat(b.dataset.price) || 0;
      const nameA = (a.dataset.name || '').toLowerCase();
      const nameB = (b.dataset.name || '').toLowerCase();

      switch (val) {
        case 'price-low': return priceA - priceB;
        case 'price-high': return priceB - priceA;
        case 'name-az': return nameA.localeCompare(nameB);
        case 'name-za': return nameB.localeCompare(nameA);
        default: return 0;
      }
    });

    productsGrid.innerHTML = '';
    cards.forEach(card => productsGrid.appendChild(card));
  });
}

/* ===== EMPTY STATE & COUNT CHECK ===== */
function checkEmptyState() {
  if (!productsGrid) return;
  const cards = productsGrid.querySelectorAll('.product-card');
  const emptyState = document.getElementById('emptyState');
  const count = cards.length;

  if (resultsCount) {
    resultsCount.textContent = `Showing ${count} product${count !== 1 ? 's' : ''}`;
  }

  if (emptyState) {
    emptyState.style.display = count === 0 ? 'block' : 'none';
  }
}

document.addEventListener('DOMContentLoaded', checkEmptyState);