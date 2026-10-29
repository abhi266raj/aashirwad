/**
 * Ashirwad Restaurant - Core Application Logic
 * Supports Real-time Price Calculation, Menu Filtering, Live Search,
 * Cart State with LocalStorage, Lightbox, and SMS / WhatsApp Order Dispatch to 7004230188
 * with Item Names, Quantities, Expected Unit Prices, and Total Expected Price.
 */

// Application State
const state = {
  activeCategory: 'all',
  dietFilter: 'all', // 'all', 'veg', 'non-veg'
  searchQuery: '',
  cart: {}, // { [itemId]: quantity }
  isDrawerOpen: false
};

// SVG Placeholder fallback in case of network image load issues
const FALLBACK_IMAGE = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22600%22%20height%3D%22450%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20450%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22grad%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%3Cstop%20offset%3D%220%25%22%20style%3D%22stop-color%3A%23f97316%3Bstop-opacity%3A0.2%22%20%2F%3E%3Cstop%20offset%3D%22100%25%22%20style%3D%22stop-color%3A%23ea580c%3Bstop-opacity%3A0.4%22%20%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22url(%23grad)%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2224%22%20fill%3D%22%239a3412%22%3E%F0%9F%8D%B4%20Ashirwad%20Restaurant%3C%2Ftext%3E%3C%2Fsvg%3E';

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  loadCartFromStorage();
  renderCategories();
  renderMenu();
  setupEventListeners();
  updateCartUI();
});

// Load cart from LocalStorage
function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem('ashirwad_cart');
    if (saved) {
      state.cart = JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to parse cart storage', e);
    state.cart = {};
  }
}

// Persist cart
function saveCartToStorage() {
  try {
    localStorage.setItem('ashirwad_cart', JSON.stringify(state.cart));
  } catch (e) {
    console.error('Failed to save cart to storage', e);
  }
}

// Render Category Navigation Tabs
function renderCategories() {
  const container = document.getElementById('category-tabs');
  if (!container) return;

  container.innerHTML = MENU_CATEGORIES.map(cat => `
    <button
      class="category-tab px-4 py-2 rounded-full font-medium text-sm border flex-shrink-0 ${state.activeCategory === cat.id ? 'active' : 'bg-white text-stone-700 border-stone-200 hover:border-orange-300 hover:bg-orange-50'}"
      data-category="${cat.id}">
      <span>${cat.icon}</span>
      <span class="ml-1.5">${cat.name}</span>
    </button>
  `).join('');

  // Attach tab click events
  container.querySelectorAll('.category-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeCategory = btn.dataset.category;
      renderCategories();
      renderMenu();
    });
  });
}

// Filter Menu Items based on Category, Diet Filter, and Search
function getFilteredItems() {
  return MENU_ITEMS.filter(item => {
    // Category match
    const categoryMatch = (state.activeCategory === 'all') || (item.category === state.activeCategory);
    
    // Diet match
    let dietMatch = true;
    if (state.dietFilter === 'veg') dietMatch = item.isVeg;
    if (state.dietFilter === 'nonveg') dietMatch = !item.isVeg;

    // Search query match
    let searchMatch = true;
    if (state.searchQuery.trim() !== '') {
      const q = state.searchQuery.toLowerCase().trim();
      const inName = item.name.toLowerCase().includes(q);
      const inDesc = item.description.toLowerCase().includes(q);
      const inCat = item.category.toLowerCase().includes(q);
      searchMatch = inName || inDesc || inCat;
    }

    return categoryMatch && dietMatch && searchMatch;
  });
}

// Render Menu Cards
function renderMenu() {
  const grid = document.getElementById('menu-grid');
  const countLabel = document.getElementById('menu-count-label');
  if (!grid) return;

  const items = getFilteredItems();

  if (countLabel) {
    const activeCatObj = MENU_CATEGORIES.find(c => c.id === state.activeCategory);
    const catName = activeCatObj ? activeCatObj.name : 'All Items';
    countLabel.textContent = `Showing ${items.length} ${items.length === 1 ? 'item' : 'items'} in ${catName}`;
  }

  if (items.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-16 text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-600 mb-4 text-2xl">
          🔍
        </div>
        <h3 class="text-xl font-bold text-stone-800">No dishes found</h3>
        <p class="text-stone-500 mt-1">Try clearing your search or switching categories.</p>
        <button id="reset-filter-btn" class="mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-semibold hover:bg-orange-700 transition">
          Reset All Filters
        </button>
      </div>
    `;
    const resetBtn = document.getElementById('reset-filter-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        state.activeCategory = 'all';
        state.dietFilter = 'all';
        state.searchQuery = '';
        const searchInput = document.getElementById('search-input');
        if (searchInput) searchInput.value = '';
        renderCategories();
        updateDietFilterUI();
        renderMenu();
      });
    }
    return;
  }

  grid.innerHTML = items.map(item => {
    const qty = state.cart[item.id] || 0;
    const lineTotal = item.price * qty;
    return `
      <div class="menu-card bg-white rounded-2xl border border-stone-200/80 overflow-hidden flex flex-col justify-between shadow-sm hover:border-orange-300">
        <div>
          <!-- Image Wrapper with Badges -->
          <div class="menu-img-wrap relative">
            <img 
              src="${item.image}" 
              alt="${item.name}" 
              loading="lazy" 
              onerror="this.onerror=null; this.src='${FALLBACK_IMAGE}';"
            />
            <div class="absolute top-3 left-3 flex gap-1.5 items-center">
              <span class="food-badge ${item.isVeg ? 'veg' : 'non-veg'}" title="${item.isVeg ? 'Pure Veg' : 'Non-Veg'}"></span>
              <span class="text-[11px] font-semibold px-2 py-0.5 rounded-full ${item.isVeg ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'} backdrop-blur-md">
                ${item.isVeg ? 'VEG' : 'NON-VEG'}
              </span>
            </div>
            ${item.bestseller ? `
              <div class="absolute top-3 right-3">
                <span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white shadow-sm flex items-center gap-1">
                  ★ Bestseller
                </span>
              </div>
            ` : ''}
          </div>

          <!-- Content Details -->
          <div class="p-4">
            <div class="flex items-start justify-between gap-2">
              <h3 class="font-bold text-stone-900 text-base leading-snug">${item.name}</h3>
              <div class="text-right flex-shrink-0">
                <span class="text-xs text-stone-400 block font-medium">Expected Price</span>
                <span class="text-lg font-extrabold text-stone-900">₹${item.price}</span>
              </div>
            </div>
            <p class="text-stone-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">${item.description}</p>
          </div>
        </div>

        <!-- Add / Qty Control Footer with Totaling -->
        <div class="p-4 pt-0">
          ${qty === 0 ? `
            <button 
              class="w-full py-2 px-4 rounded-xl bg-orange-50 hover:bg-orange-600 text-orange-700 hover:text-white font-bold text-sm border border-orange-200 hover:border-transparent transition-all flex items-center justify-center gap-1.5 add-to-order-btn"
              data-item-id="${item.id}">
              <span>Add to Order</span>
              <span class="text-xs font-semibold opacity-75">· ₹${item.price}</span>
              <svg class="w-4 h-4 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
            </button>
          ` : `
            <div>
              <div class="flex items-center justify-between bg-orange-600 text-white rounded-xl p-1 shadow-sm">
                <button 
                  class="qty-btn bg-white/20 hover:bg-white/30 text-white decrease-qty-btn" 
                  data-item-id="${item.id}"
                  aria-label="Decrease quantity">
                  -
                </button>
                <span class="font-bold text-sm px-2 select-none">${qty} in order</span>
                <button 
                  class="qty-btn bg-white/20 hover:bg-white/30 text-white increase-qty-btn" 
                  data-item-id="${item.id}"
                  aria-label="Increase quantity">
                  +
                </button>
              </div>
              <div class="flex items-center justify-between mt-1.5 px-1 text-[11px] text-stone-500 font-semibold">
                <span>Subtotal:</span>
                <span class="text-orange-700 font-bold">₹${lineTotal}</span>
              </div>
            </div>
          `}
        </div>
      </div>
    `;
  }).join('');

  // Attach Item Card Button Handlers
  grid.querySelectorAll('.add-to-order-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      addToCart(btn.dataset.itemId);
    });
  });

  grid.querySelectorAll('.increase-qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      addToCart(btn.dataset.itemId);
    });
  });

  grid.querySelectorAll('.decrease-qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFromCart(btn.dataset.itemId);
    });
  });
}

// Cart Management Functions
function addToCart(itemId) {
  state.cart[itemId] = (state.cart[itemId] || 0) + 1;
  saveCartToStorage();
  updateCartUI();
  renderMenu();
  const item = MENU_ITEMS.find(i => i.id === itemId);
  if (item) {
    const curQty = state.cart[itemId];
    showToast(`Added ${item.name} (${curQty}x = ₹${item.price * curQty})`);
  }
}

function removeFromCart(itemId) {
  if (!state.cart[itemId]) return;
  state.cart[itemId] -= 1;
  if (state.cart[itemId] <= 0) {
    delete state.cart[itemId];
  }
  saveCartToStorage();
  updateCartUI();
  renderMenu();
}

function deleteEntireItem(itemId) {
  delete state.cart[itemId];
  saveCartToStorage();
  updateCartUI();
  renderMenu();
}

function clearCart() {
  if (Object.keys(state.cart).length === 0) return;
  if (confirm("Are you sure you want to clear your current order selection?")) {
    state.cart = {};
    saveCartToStorage();
    updateCartUI();
    renderMenu();
    showToast("Order cleared");
  }
}

// Calculate Order Totals
function getCartTotals() {
  let count = 0;
  let totalAmount = 0;
  const items = [];

  for (const [id, qty] of Object.entries(state.cart)) {
    const item = MENU_ITEMS.find(i => i.id === id);
    if (item && qty > 0) {
      count += qty;
      const lineTotal = item.price * qty;
      totalAmount += lineTotal;
      items.push({
        ...item,
        quantity: qty,
        unitPrice: item.price,
        lineTotal: lineTotal
      });
    }
  }

  return { count, totalAmount, items };
}

// Update Cart Badge and Drawer UI
function updateCartUI() {
  const { count, totalAmount, items } = getCartTotals();

  // Header Cart Badge & Amount
  const navBadge = document.getElementById('nav-cart-count');
  const navAmount = document.getElementById('nav-cart-total');
  if (navBadge) navBadge.textContent = count;
  if (navAmount) navAmount.textContent = `₹${totalAmount}`;

  // Floating Cart Button
  const floatBtn = document.getElementById('floating-cart-btn');
  const floatCount = document.getElementById('floating-cart-count');
  const floatAmount = document.getElementById('floating-cart-amount');
  if (floatBtn) {
    if (count > 0) {
      floatBtn.classList.remove('hidden');
    } else {
      floatBtn.classList.add('hidden');
    }
  }
  if (floatCount) floatCount.textContent = count;
  if (floatAmount) floatAmount.textContent = `₹${totalAmount}`;

  // Drawer Contents
  renderCartDrawer(items, count, totalAmount);
}

// Render Cart Drawer with item breakdown & expected prices
function renderCartDrawer(items, count, totalAmount) {
  const drawerItemsContainer = document.getElementById('cart-drawer-items');
  const drawerSummary = document.getElementById('cart-drawer-summary');
  const drawerEmpty = document.getElementById('cart-drawer-empty');
  const orderForm = document.getElementById('order-info-form');
  const drawerHeaderCount = document.getElementById('cart-drawer-count');

  if (drawerHeaderCount) {
    drawerHeaderCount.textContent = `${count} ${count === 1 ? 'item' : 'items'} selected • Expected Total: ₹${totalAmount}`;
  }

  if (count === 0) {
    if (drawerItemsContainer) drawerItemsContainer.innerHTML = '';
    if (drawerSummary) drawerSummary.classList.add('hidden');
    if (orderForm) orderForm.classList.add('hidden');
    if (drawerEmpty) drawerEmpty.classList.remove('hidden');
    return;
  }

  if (drawerEmpty) drawerEmpty.classList.add('hidden');
  if (drawerSummary) drawerSummary.classList.remove('hidden');
  if (orderForm) orderForm.classList.remove('hidden');

  if (drawerItemsContainer) {
    drawerItemsContainer.innerHTML = items.map(item => `
      <div class="flex items-center justify-between py-3 border-b border-stone-100 gap-2">
        <div class="flex items-center gap-2.5 min-w-0">
          <span class="food-badge ${item.isVeg ? 'veg' : 'non-veg'} flex-shrink-0"></span>
          <div class="min-w-0">
            <h4 class="font-bold text-stone-900 text-sm truncate">${item.name}</h4>
            <span class="text-xs text-stone-500">Expected: ₹${item.unitPrice} each</span>
          </div>
        </div>

        <div class="flex items-center gap-2.5 flex-shrink-0">
          <div class="flex items-center bg-stone-100 rounded-lg p-0.5 border border-stone-200">
            <button 
              class="w-6 h-6 flex items-center justify-center font-bold text-stone-700 hover:text-orange-600 drawer-decrease-btn"
              data-item-id="${item.id}">
              -
            </button>
            <span class="px-2 text-xs font-bold text-stone-800 select-none">${item.quantity}</span>
            <button 
              class="w-6 h-6 flex items-center justify-center font-bold text-stone-700 hover:text-orange-600 drawer-increase-btn"
              data-item-id="${item.id}">
              +
            </button>
          </div>
          <div class="text-right w-16">
            <span class="font-extrabold text-stone-900 text-sm block">₹${item.lineTotal}</span>
            <span class="text-[10px] text-stone-400">Total</span>
          </div>
          <button 
            class="text-stone-400 hover:text-red-500 drawer-delete-btn p-1"
            data-item-id="${item.id}"
            title="Remove item">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>
      </div>
    `).join('');

    // Attach drawer +/- and delete listeners
    drawerItemsContainer.querySelectorAll('.drawer-increase-btn').forEach(btn => {
      btn.addEventListener('click', () => addToCart(btn.dataset.itemId));
    });
    drawerItemsContainer.querySelectorAll('.drawer-decrease-btn').forEach(btn => {
      btn.addEventListener('click', () => removeFromCart(btn.dataset.itemId));
    });
    drawerItemsContainer.querySelectorAll('.drawer-delete-btn').forEach(btn => {
      btn.addEventListener('click', () => deleteEntireItem(btn.dataset.itemId));
    });
  }

  // Update summary numbers
  const drawerSubtotal = document.getElementById('cart-drawer-subtotal');
  const drawerGrandTotal = document.getElementById('cart-drawer-grand-total');
  if (drawerSubtotal) drawerSubtotal.textContent = `₹${totalAmount}`;
  if (drawerGrandTotal) drawerGrandTotal.textContent = `₹${totalAmount}`;
}

// Open & Close Drawer
function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-drawer-overlay');
  if (drawer && overlay) {
    overlay.classList.remove('hidden');
    setTimeout(() => {
      overlay.classList.remove('opacity-0');
      overlay.classList.add('opacity-100');
      drawer.classList.remove('translate-x-full');
      drawer.classList.add('translate-x-0');
    }, 10);
    state.isDrawerOpen = true;
    document.body.style.overflow = 'hidden';
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-drawer-overlay');
  if (drawer && overlay) {
    overlay.classList.remove('opacity-100');
    overlay.classList.add('opacity-0');
    drawer.classList.remove('translate-x-0');
    drawer.classList.add('translate-x-full');
    setTimeout(() => {
      overlay.classList.add('hidden');
    }, 300);
    state.isDrawerOpen = false;
    document.body.style.overflow = '';
  }
}

// Generate Detailed Order Message for WhatsApp & Clipboard
// Explicitly includes Menu Items, Quantities, Unit Expected Price, and Total Expected Price
function generateOrderMessage() {
  const { items, totalAmount, count } = getCartTotals();
  if (count === 0) return null;

  const orderType = document.querySelector('input[name="orderType"]:checked')?.value || 'Dine-In';
  const name = document.getElementById('cust-name')?.value.trim() || 'Valued Guest';
  const phone = document.getElementById('cust-phone')?.value.trim() || 'Not Provided';
  const locationOrTable = document.getElementById('cust-table-address')?.value.trim() || (orderType === 'Dine-In' ? 'Table at Restaurant' : 'Pickup at Counter');
  const instructions = document.getElementById('cust-notes')?.value.trim();

  let message = `🍽️ *ASHIRWAD RESTAURANT - ORDER SUMMARY*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `📍 *Order Type:* ${orderType.toUpperCase()}\n`;
  message += `👤 *Customer Name:* ${name}\n`;
  message += `📞 *Customer Phone:* ${phone}\n`;
  message += `🏢 *Table / Address:* ${locationOrTable}\n`;
  if (instructions) {
    message += `📝 *Cooking Notes:* ${instructions}\n`;
  }
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `🛒 *SELECTED MENU ITEMS & EXPECTED PRICE:*\n`;

  items.forEach((item, index) => {
    message += `${index + 1}. *${item.name}*\n`;
    message += `   • Qty: ${item.quantity} | Expected Price: ₹${item.unitPrice} each\n`;
    message += `   • Expected Line Total: ₹${item.lineTotal}\n`;
  });

  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `💵 *TOTAL EXPECTED PRICE: ₹${totalAmount}*\n`;
  message += `🚚 *Home Delivery:* Free (As per restaurant menu)\n`;
  message += `⏰ *Timestamp:* ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}\n`;
  message += `\n*Note:* Expected prices are fetched directly from the restaurant menu. Please confirm and prepare our order. Thank you!`;

  return message;
}

// Generate SMS Message to 7004230188
// Explicitly formatted with menu items, quantities, and expected price breakdown
function generateSMSMessage() {
  const { items, totalAmount, count } = getCartTotals();
  if (count === 0) return null;

  const orderType = document.querySelector('input[name="orderType"]:checked')?.value || 'Dine-In';
  const name = document.getElementById('cust-name')?.value.trim() || 'Guest';
  const locationOrTable = document.getElementById('cust-table-address')?.value.trim() || (orderType === 'Dine-In' ? 'Table' : 'Takeaway');
  const instructions = document.getElementById('cust-notes')?.value.trim();

  let sms = `ASHIRWAD RESTAURANT ORDER [${orderType}]\n`;
  sms += `Name: ${name} (${locationOrTable})\n`;
  sms += `\nSELECTED ITEMS & EXPECTED PRICE:\n`;
  
  items.forEach((i, idx) => {
    sms += `${idx + 1}. ${i.name} x${i.quantity} @ Rs.${i.unitPrice} = Rs.${i.lineTotal}\n`;
  });

  sms += `\nTOTAL EXPECTED PRICE: Rs.${totalAmount}\n`;
  if (instructions) {
    sms += `Note: ${instructions}\n`;
  }
  sms += `Please confirm availability & prepare order.`;

  return sms;
}

// Dispatch: WhatsApp
function sendViaWhatsApp() {
  const { count } = getCartTotals();
  if (count === 0) {
    alert("Please select menu items first!");
    return;
  }

  const message = generateOrderMessage();
  const phone = RESTAURANT_INFO.whatsappNumber; // 917004230188
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
  showToast("Opening WhatsApp with menu items & expected price...");
}

// Dispatch: SMS (Directly to 7004230188)
function sendViaSMS() {
  const { count, totalAmount } = getCartTotals();
  if (count === 0) {
    alert("Please select menu items first!");
    return;
  }

  const smsText = generateSMSMessage();
  const phone = RESTAURANT_INFO.primaryHotline; // 7004230188

  // Detect iOS vs Android for correct SMS protocol
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const separator = isIOS ? '&' : '?';
  const smsUrl = `sms:${phone}${separator}body=${encodeURIComponent(smsText)}`;

  // Also copy to clipboard for convenience
  copyOrderToClipboard(false);

  // Trigger SMS Link
  window.location.href = smsUrl;
  showToast(`Opening SMS to 7004230188 (Total Expected Price: ₹${totalAmount})...`);
}

// Copy Order to Clipboard
function copyOrderToClipboard(showUserToast = true) {
  const message = generateOrderMessage();
  if (!message) return;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(message).then(() => {
      if (showUserToast) showToast("Order & Expected Price copied to clipboard!");
    }).catch(() => {
      fallbackCopyText(message, showUserToast);
    });
  } else {
    fallbackCopyText(message, showUserToast);
  }
}

function fallbackCopyText(text, showUserToast) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    if (showUserToast) showToast("Order & Expected Price copied to clipboard!");
  } catch (err) {
    console.error('Fallback copy error', err);
  }
  document.body.removeChild(textArea);
}

// Open Lightbox for Menu Card or Storefront Image
function openLightbox(src, title) {
  const modal = document.getElementById('image-lightbox');
  const img = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');
  if (modal && img && caption) {
    img.src = src;
    caption.textContent = title;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const modal = document.getElementById('image-lightbox');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

// Toast notification helper
function showToast(msg) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span>✨</span>
    <span>${msg}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

// Event Listeners Setup
function setupEventListeners() {
  // Search Input with debounce
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderMenu();
    });
  }

  // Diet Filter Buttons (All, Pure Veg, Non-Veg)
  const dietButtons = document.querySelectorAll('.diet-filter-btn');
  dietButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      state.dietFilter = btn.dataset.diet;
      updateDietFilterUI();
      renderMenu();
    });
  });

  // Drawer Open Buttons
  const navCartBtn = document.getElementById('nav-cart-btn');
  if (navCartBtn) navCartBtn.addEventListener('click', openCartDrawer);

  const floatCartBtn = document.getElementById('floating-cart-btn');
  if (floatCartBtn) floatCartBtn.addEventListener('click', openCartDrawer);

  // Drawer Close Buttons
  const drawerCloseBtn = document.getElementById('close-drawer-btn');
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeCartDrawer);

  const drawerOverlay = document.getElementById('cart-drawer-overlay');
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeCartDrawer);

  // Lightbox Close
  const closeLightboxBtn = document.getElementById('close-lightbox-btn');
  if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', closeLightbox);

  const lightbox = document.getElementById('image-lightbox');
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Escape key to close drawer or lightbox
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!document.getElementById('image-lightbox')?.classList.contains('hidden')) {
        closeLightbox();
      } else if (state.isDrawerOpen) {
        closeCartDrawer();
      }
    }
  });

  // Clear Cart Button
  const clearCartBtn = document.getElementById('clear-cart-btn');
  if (clearCartBtn) clearCartBtn.addEventListener('click', clearCart);

  // WhatsApp Order Button
  const waBtn = document.getElementById('order-whatsapp-btn');
  if (waBtn) waBtn.addEventListener('click', sendViaWhatsApp);

  // SMS Order Button
  const smsBtn = document.getElementById('order-sms-btn');
  if (smsBtn) smsBtn.addEventListener('click', sendViaSMS);

  // Copy Order Button
  const copyBtn = document.getElementById('copy-order-btn');
  if (copyBtn) copyBtn.addEventListener('click', () => copyOrderToClipboard(true));

  // Dynamic order type toggle (shows table # vs delivery address placeholder)
  const orderTypeRadios = document.querySelectorAll('input[name="orderType"]');
  const tableAddressInput = document.getElementById('cust-table-address');
  const tableAddressLabel = document.getElementById('cust-table-label');

  orderTypeRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (!tableAddressInput) return;
      if (radio.value === 'Dine-In') {
        if (tableAddressLabel) tableAddressLabel.textContent = "Table Number";
        tableAddressInput.placeholder = "e.g. Table 4 / Family AC Cabin";
      } else if (radio.value === 'Takeaway') {
        if (tableAddressLabel) tableAddressLabel.textContent = "Pickup Time & Notes";
        tableAddressInput.placeholder = "e.g. Ready in 20 mins / Counter pickup";
      } else {
        if (tableAddressLabel) tableAddressLabel.textContent = "Delivery Address in Hazaribagh (Free Home Delivery)";
        tableAddressInput.placeholder = "e.g. Near Bansilal Chowk, Main Road";
      }
    });
  });

  // Mobile navigation hamburger toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('hidden');
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileNav.classList.add('hidden'));
    });
  }

  // Lightbox triggers for menu photo and storefront photo
  document.querySelectorAll('[data-lightbox-src]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(el.dataset.lightboxSrc, el.dataset.lightboxTitle || 'Ashirwad Restaurant Image');
    });
  });
}

function updateDietFilterUI() {
  const buttons = document.querySelectorAll('.diet-filter-btn');
  buttons.forEach(btn => {
    if (btn.dataset.diet === state.dietFilter) {
      btn.classList.add('bg-stone-900', 'text-white', 'border-stone-900');
      btn.classList.remove('bg-white', 'text-stone-700', 'border-stone-200');
    } else {
      btn.classList.remove('bg-stone-900', 'text-white', 'border-stone-900');
      btn.classList.add('bg-white', 'text-stone-700', 'border-stone-200');
    }
  });
}
