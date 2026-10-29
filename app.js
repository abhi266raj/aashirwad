/**
 * aashirwad - Professional Restaurant Home Delivery Web Application
 * Features:
 * - Cookie-persisted delivery location
 * - Multi-line phone calling options (all verified restaurant numbers)
 * - Searchable menu with live expected price totaling
 * - WhatsApp & SMS order dispatch to 7004230188
 */

// Application State
const state = {
  activeCategory: 'all',
  dietFilter: 'all', // 'all', 'veg', 'nonveg'
  searchQuery: '',
  cart: {}, // { [itemId]: quantity }
  delivery: {
    address: '',
    name: '',
    phone: '',
    notes: ''
  },
  isDrawerOpen: false
};

// Cookie Helpers
function setCookie(name, value, days = 60) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/;SameSite=Lax`;
}

function getCookie(name) {
  const cname = `${name}=`;
  const decoded = decodeURIComponent(document.cookie);
  const ca = decoded.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(cname) === 0) {
      return c.substring(cname.length, c.length);
    }
  }
  return '';
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
  loadSavedData();
  renderCategories();
  renderMenu();
  setupEventListeners();
  updateCartUI();
  updateLocationHeader();

  // If no delivery address set in cookies, prompt gently after slight delay
  if (!state.delivery.address) {
    setTimeout(() => {
      openLocationModal(false);
    }, 600);
  }
});

// Load Cookies & LocalStorage
function loadSavedData() {
  // Load Delivery from Cookies (with localStorage fallback)
  state.delivery.address = getCookie('aashirwad_addr') || localStorage.getItem('aashirwad_addr') || '';
  state.delivery.name = getCookie('aashirwad_name') || localStorage.getItem('aashirwad_name') || '';
  state.delivery.phone = getCookie('aashirwad_phone') || localStorage.getItem('aashirwad_phone') || '';
  state.delivery.notes = localStorage.getItem('aashirwad_notes') || '';

  // Load Cart
  try {
    const savedCart = localStorage.getItem('aashirwad_cart');
    if (savedCart) state.cart = JSON.parse(savedCart);
  } catch (e) {
    state.cart = {};
  }
}

function saveDeliveryData(address, name, phone, notes = '') {
  state.delivery.address = address.trim();
  state.delivery.name = name.trim();
  state.delivery.phone = phone.trim();
  state.delivery.notes = notes.trim();

  // Save to Cookies
  setCookie('aashirwad_addr', state.delivery.address);
  setCookie('aashirwad_name', state.delivery.name);
  setCookie('aashirwad_phone', state.delivery.phone);

  // Backup to localStorage
  localStorage.setItem('aashirwad_addr', state.delivery.address);
  localStorage.setItem('aashirwad_name', state.delivery.name);
  localStorage.setItem('aashirwad_phone', state.delivery.phone);
  localStorage.setItem('aashirwad_notes', state.delivery.notes);

  updateLocationHeader();
}

function saveCartToStorage() {
  try {
    localStorage.setItem('aashirwad_cart', JSON.stringify(state.cart));
  } catch (e) {
    console.error('Failed to save cart', e);
  }
}

// Update Top Bar Location Display
function updateLocationHeader() {
  const label = document.getElementById('header-location-label');
  if (!label) return;

  if (state.delivery.address) {
    label.innerHTML = `
      <span class="truncate max-w-[160px] sm:max-w-[280px] inline-block font-semibold text-stone-800">${state.delivery.address}</span>
      <span class="text-orange-600 font-bold ml-1 text-[11px] underline">Change</span>
    `;
  } else {
    label.innerHTML = `
      <span class="text-orange-700 font-bold">Select Delivery Location ▾</span>
    `;
  }
}

// Location Modal Controls
function openLocationModal(canClose = true) {
  const modal = document.getElementById('location-modal');
  const closeBtn = document.getElementById('close-location-modal-btn');
  const addrInput = document.getElementById('modal-address');
  const nameInput = document.getElementById('modal-name');
  const phoneInput = document.getElementById('modal-phone');

  if (modal) {
    if (addrInput) addrInput.value = state.delivery.address;
    if (nameInput) nameInput.value = state.delivery.name;
    if (phoneInput) phoneInput.value = state.delivery.phone;

    if (closeBtn) {
      if (canClose || state.delivery.address) {
        closeBtn.classList.remove('hidden');
      } else {
        closeBtn.classList.add('hidden');
      }
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeLocationModal() {
  const modal = document.getElementById('location-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

// Call Options Modal Controls
function openCallModal() {
  const modal = document.getElementById('call-modal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeCallModal() {
  const modal = document.getElementById('call-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

// Render Category Tabs
function renderCategories() {
  const container = document.getElementById('category-tabs');
  if (!container) return;

  container.innerHTML = MENU_CATEGORIES.map(cat => `
    <button
      class="category-tab px-3.5 py-1.5 rounded-full font-semibold text-xs border flex-shrink-0 transition-all cursor-pointer ${state.activeCategory === cat.id ? 'bg-orange-600 text-white border-orange-600 shadow-sm' : 'bg-white text-stone-700 border-stone-200 hover:border-orange-300 hover:bg-orange-50'}"
      data-category="${cat.id}">
      <span>${cat.icon}</span>
      <span class="ml-1">${cat.name}</span>
    </button>
  `).join('');

  container.querySelectorAll('.category-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeCategory = btn.dataset.category;
      renderCategories();
      renderMenu();
    });
  });
}

// Filter Items based on live search, diet, and category
function getFilteredItems() {
  return MENU_ITEMS.filter(item => {
    const categoryMatch = (state.activeCategory === 'all') || (item.category === state.activeCategory);

    let dietMatch = true;
    if (state.dietFilter === 'veg') dietMatch = item.isVeg;
    if (state.dietFilter === 'nonveg') dietMatch = !item.isVeg;

    let searchMatch = true;
    if (state.searchQuery.trim() !== '') {
      const q = state.searchQuery.toLowerCase().trim();
      searchMatch = item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
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
    countLabel.textContent = `${items.length} ${items.length === 1 ? 'dish' : 'dishes'}`;
  }

  if (items.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-12 text-center bg-white rounded-2xl border border-stone-200 p-8">
        <div class="text-3xl mb-2">🔍</div>
        <h3 class="text-sm font-bold text-stone-800">No matching dishes</h3>
        <p class="text-xs text-stone-500 mt-1">Try another search term or click All Dishes.</p>
        <button id="reset-search-btn" class="mt-3 px-4 py-1.5 bg-orange-600 text-white rounded-lg text-xs font-bold hover:bg-orange-700 transition cursor-pointer">
          Show All Dishes
        </button>
      </div>
    `;
    document.getElementById('reset-search-btn')?.addEventListener('click', () => {
      state.activeCategory = 'all';
      state.dietFilter = 'all';
      state.searchQuery = '';
      const searchInput = document.getElementById('search-input');
      if (searchInput) searchInput.value = '';
      renderCategories();
      updateDietFilterUI();
      renderMenu();
    });
    return;
  }

  grid.innerHTML = items.map(item => {
    const qty = state.cart[item.id] || 0;
    const lineTotal = item.price * qty;
    return `
      <div class="menu-card bg-white rounded-2xl border border-stone-200 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition">
        <div>
          <!-- Matching Dish Image -->
          <div class="relative w-full aspect-[4/3] bg-stone-100 overflow-hidden">
            <img 
              src="${item.image}" 
              alt="${item.name}" 
              loading="lazy" 
              class="w-full h-full object-cover"
              onerror="this.src='assets/veg/makhan-roti/dish.png';"
            />
            <div class="absolute top-2.5 left-2.5 flex items-center gap-1">
              <span class="food-badge ${item.isVeg ? 'veg' : 'non-veg'}"></span>
              <span class="text-[10px] font-bold px-1.5 py-0.5 rounded ${item.isVeg ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} backdrop-blur-sm">
                ${item.isVeg ? 'VEG' : 'NON-VEG'}
              </span>
            </div>
            ${item.bestseller ? `
              <span class="absolute top-2.5 right-2.5 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500 text-white shadow-sm">
                ★ Popular
              </span>
            ` : ''}
          </div>

          <!-- Dish Info -->
          <div class="p-3.5">
            <div class="flex items-start justify-between gap-1.5">
              <h3 class="font-bold text-stone-900 text-sm leading-snug">${item.name}</h3>
              <span class="text-sm sm:text-base font-extrabold text-stone-900 flex-shrink-0">₹${item.price}</span>
            </div>
            <p class="text-stone-500 text-xs mt-1 line-clamp-2">${item.description}</p>
          </div>
        </div>

        <!-- Add & Quantity Control -->
        <div class="p-3.5 pt-0">
          ${qty === 0 ? `
            <button 
              class="w-full py-2 px-3 rounded-xl bg-orange-50 hover:bg-orange-600 text-orange-700 hover:text-white font-bold text-xs border border-orange-200 hover:border-transparent transition flex items-center justify-center gap-1 add-to-order-btn cursor-pointer"
              data-item-id="${item.id}">
              <span>Add</span>
              <span>· ₹${item.price}</span>
            </button>
          ` : `
            <div>
              <div class="flex items-center justify-between bg-orange-600 text-white rounded-xl p-1 shadow-sm">
                <button 
                  class="qty-btn bg-white/20 hover:bg-white/30 text-white decrease-qty-btn cursor-pointer" 
                  data-item-id="${item.id}"
                  aria-label="Decrease quantity">
                  -
                </button>
                <span class="font-bold text-xs px-2 select-none">${qty} in cart</span>
                <button 
                  class="qty-btn bg-white/20 hover:bg-white/30 text-white increase-qty-btn cursor-pointer" 
                  data-item-id="${item.id}"
                  aria-label="Increase quantity">
                  +
                </button>
              </div>
              <div class="flex items-center justify-between mt-1 px-1 text-[11px] text-stone-500 font-medium">
                <span>Subtotal:</span>
                <span class="text-orange-700 font-bold">₹${lineTotal}</span>
              </div>
            </div>
          `}
        </div>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('.add-to-order-btn').forEach(btn => {
    btn.addEventListener('click', () => addToCart(btn.dataset.itemId));
  });
  grid.querySelectorAll('.increase-qty-btn').forEach(btn => {
    btn.addEventListener('click', () => addToCart(btn.dataset.itemId));
  });
  grid.querySelectorAll('.decrease-qty-btn').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(btn.dataset.itemId));
  });
}

// Cart State Modifications
function addToCart(itemId) {
  state.cart[itemId] = (state.cart[itemId] || 0) + 1;
  saveCartToStorage();
  updateCartUI();
  renderMenu();
  const item = MENU_ITEMS.find(i => i.id === itemId);
  if (item) {
    showToast(`Added ${item.name} (${state.cart[itemId]}x = ₹${item.price * state.cart[itemId]})`);
  }
}

function removeFromCart(itemId) {
  if (!state.cart[itemId]) return;
  state.cart[itemId] -= 1;
  if (state.cart[itemId] <= 0) delete state.cart[itemId];
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
  if (confirm("Clear your current order selection?")) {
    state.cart = {};
    saveCartToStorage();
    updateCartUI();
    renderMenu();
    showToast("Cart cleared");
  }
}

// Calculate Totals
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

// Update UI
function updateCartUI() {
  const { count, totalAmount, items } = getCartTotals();

  const navBadge = document.getElementById('nav-cart-count');
  const navAmount = document.getElementById('nav-cart-total');
  if (navBadge) navBadge.textContent = count;
  if (navAmount) navAmount.textContent = `₹${totalAmount}`;

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

  renderCartDrawer(items, count, totalAmount);
}

// Render Order Drawer
function renderCartDrawer(items, count, totalAmount) {
  const drawerItems = document.getElementById('cart-drawer-items');
  const drawerSummary = document.getElementById('cart-drawer-summary');
  const drawerEmpty = document.getElementById('cart-drawer-empty');
  const drawerCount = document.getElementById('cart-drawer-count');
  const notesBox = document.getElementById('delivery-notes-box');
  const drawerAddrDisplay = document.getElementById('drawer-delivery-addr');

  if (drawerCount) {
    drawerCount.textContent = `${count} ${count === 1 ? 'item' : 'items'} • Expected Total: ₹${totalAmount}`;
  }

  if (drawerAddrDisplay) {
    drawerAddrDisplay.textContent = state.delivery.address || 'Address not set (tap Change)';
  }

  if (count === 0) {
    if (drawerItems) drawerItems.innerHTML = '';
    if (drawerSummary) drawerSummary.classList.add('hidden');
    if (notesBox) notesBox.classList.add('hidden');
    if (drawerEmpty) drawerEmpty.classList.remove('hidden');
    return;
  }

  if (drawerEmpty) drawerEmpty.classList.add('hidden');
  if (drawerSummary) drawerSummary.classList.remove('hidden');
  if (notesBox) notesBox.classList.remove('hidden');

  if (drawerItems) {
    drawerItems.innerHTML = items.map(item => `
      <div class="flex items-center justify-between py-3 border-b border-stone-100 gap-2">
        <div class="flex items-center gap-2.5 min-w-0">
          <img src="${item.image}" alt="${item.name}" class="w-10 h-10 rounded-lg object-cover flex-shrink-0" onerror="this.src='assets/veg/makhan-roti/dish.png';"/>
          <div class="min-w-0">
            <h4 class="font-bold text-stone-900 text-xs truncate">${item.name}</h4>
            <span class="text-[11px] text-stone-500">₹${item.unitPrice} each</span>
          </div>
        </div>

        <div class="flex items-center gap-2 flex-shrink-0">
          <div class="flex items-center bg-stone-100 rounded-lg p-0.5 border border-stone-200">
            <button class="w-6 h-6 flex items-center justify-center font-bold text-stone-700 hover:text-orange-600 drawer-decrease-btn cursor-pointer" data-item-id="${item.id}">-</button>
            <span class="px-2 text-xs font-bold text-stone-800 select-none">${item.quantity}</span>
            <button class="w-6 h-6 flex items-center justify-center font-bold text-stone-700 hover:text-orange-600 drawer-increase-btn cursor-pointer" data-item-id="${item.id}">+</button>
          </div>
          <span class="font-bold text-stone-900 text-xs w-14 text-right">₹${item.lineTotal}</span>
          <button class="text-stone-400 hover:text-red-500 drawer-delete-btn p-1 cursor-pointer" data-item-id="${item.id}">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>
      </div>
    `).join('');

    drawerItems.querySelectorAll('.drawer-increase-btn').forEach(btn => {
      btn.addEventListener('click', () => addToCart(btn.dataset.itemId));
    });
    drawerItems.querySelectorAll('.drawer-decrease-btn').forEach(btn => {
      btn.addEventListener('click', () => removeFromCart(btn.dataset.itemId));
    });
    drawerItems.querySelectorAll('.drawer-delete-btn').forEach(btn => {
      btn.addEventListener('click', () => deleteEntireItem(btn.dataset.itemId));
    });
  }

  const drawerSubtotal = document.getElementById('cart-drawer-subtotal');
  const drawerGrandTotal = document.getElementById('cart-drawer-grand-total');
  if (drawerSubtotal) drawerSubtotal.textContent = `₹${totalAmount}`;
  if (drawerGrandTotal) drawerGrandTotal.textContent = `₹${totalAmount}`;
}

// Drawer Visibility
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
    setTimeout(() => overlay.classList.add('hidden'), 300);
    state.isDrawerOpen = false;
    document.body.style.overflow = '';
  }
}

// WhatsApp Order Compilation (Primary Channel)
function generateWhatsAppMessage() {
  const { items, totalAmount, count } = getCartTotals();
  if (count === 0) return null;

  const notes = document.getElementById('delivery-notes')?.value.trim() || state.delivery.notes;
  const address = state.delivery.address || 'Hazaribagh';
  const name = state.delivery.name || 'Valued Customer';
  const phone = state.delivery.phone || '';

  let msg = `🛵 *AASHIRWAD - HOME DELIVERY ORDER*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `📍 *Delivery Address:* ${address}\n`;
  msg += `👤 *Customer Name:* ${name}\n`;
  if (phone) msg += `📞 *Customer Phone:* ${phone}\n`;
  if (notes) msg += `📝 *Instructions:* ${notes}\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `🛒 *ORDERED DISHES & EXPECTED PRICE:*\n`;

  items.forEach((item, index) => {
    msg += `${index + 1}. *${item.name}*\n`;
    msg += `   • Qty: ${item.quantity}  |  Price: ₹${item.unitPrice} each\n`;
    msg += `   • Subtotal: ₹${item.lineTotal}\n`;
  });

  msg += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `💵 *TOTAL EXPECTED PRICE: ₹${totalAmount}*\n`;
  msg += `🚀 *Delivery:* Free Home Delivery\n`;
  msg += `\nPlease confirm availability and dispatch. Thank you!`;

  return msg;
}

// SMS Order Compilation
function generateSMSMessage() {
  const { items, totalAmount, count } = getCartTotals();
  if (count === 0) return null;

  const notes = document.getElementById('delivery-notes')?.value.trim() || state.delivery.notes;
  const address = state.delivery.address || 'Hazaribagh';
  const name = state.delivery.name || 'Customer';

  let sms = `AASHIRWAD HOME DELIVERY ORDER\n`;
  sms += `Address: ${address}\n`;
  sms += `Name: ${name} (${state.delivery.phone || ''})\n\n`;
  sms += `ITEMS & EXPECTED PRICE:\n`;

  items.forEach((item, idx) => {
    sms += `${idx + 1}. ${item.name} x${item.quantity} @ Rs.${item.unitPrice} = Rs.${item.lineTotal}\n`;
  });

  sms += `\nTOTAL EXPECTED PRICE: Rs.${totalAmount}\n`;
  if (notes) sms += `Note: ${notes}\n`;
  sms += `Please confirm & dispatch.`;

  return sms;
}

// Send via WhatsApp to 7004230188
function sendViaWhatsApp() {
  const { count } = getCartTotals();
  if (count === 0) {
    alert("Please select dishes first!");
    return;
  }

  if (!state.delivery.address) {
    openLocationModal(false);
    return;
  }

  const message = generateWhatsAppMessage();
  const phone = "917004230188"; // +91 7004230188
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
  showToast("Opening WhatsApp with your order & delivery address...");
}

// Send via SMS to 7004230188
function sendViaSMS() {
  const { count, totalAmount } = getCartTotals();
  if (count === 0) {
    alert("Please select dishes first!");
    return;
  }

  if (!state.delivery.address) {
    openLocationModal(false);
    return;
  }

  const smsText = generateSMSMessage();
  const phone = "7004230188";

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const separator = isIOS ? '&' : '?';
  const smsUrl = `sms:${phone}${separator}body=${encodeURIComponent(smsText)}`;

  copyOrderToClipboard(false);
  window.location.href = smsUrl;
  showToast(`Opening SMS to 7004230188 (Total Expected: ₹${totalAmount})...`);
}

function copyOrderToClipboard(showUserToast = true) {
  const message = generateWhatsAppMessage();
  if (!message) return;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(message).then(() => {
      if (showUserToast) showToast("Order & Expected Price copied to clipboard!");
    });
  }
}

// Toast Helper
function showToast(msg) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>🛵</span><span>${msg}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 2200);
}

// Event Listeners
function setupEventListeners() {
  // Live Instant Search
  document.getElementById('search-input')?.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderMenu();
  });

  // Dietary Toggle Buttons
  document.querySelectorAll('.diet-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.dietFilter = btn.dataset.diet;
      updateDietFilterUI();
      renderMenu();
    });
  });

  // Location Modal Triggers
  document.getElementById('header-location-btn')?.addEventListener('click', () => openLocationModal(true));
  document.getElementById('drawer-change-addr-btn')?.addEventListener('click', () => {
    closeCartDrawer();
    openLocationModal(true);
  });
  document.getElementById('close-location-modal-btn')?.addEventListener('click', closeLocationModal);

  // Location Form Save
  document.getElementById('save-location-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const addr = document.getElementById('modal-address').value;
    const name = document.getElementById('modal-name').value;
    const phone = document.getElementById('modal-phone').value;

    if (!addr.trim()) {
      alert("Please enter your delivery address!");
      return;
    }

    saveDeliveryData(addr, name, phone);
    closeLocationModal();
    showToast("Delivery address saved in cookies!");
  });

  // Call Options Modal Triggers
  document.getElementById('header-call-btn')?.addEventListener('click', openCallModal);
  document.getElementById('drawer-call-btn')?.addEventListener('click', openCallModal);
  document.getElementById('close-call-modal-btn')?.addEventListener('click', closeCallModal);

  // Drawer Triggers
  document.getElementById('nav-cart-btn')?.addEventListener('click', openCartDrawer);
  document.getElementById('floating-cart-btn')?.addEventListener('click', openCartDrawer);
  document.getElementById('close-drawer-btn')?.addEventListener('click', closeCartDrawer);
  document.getElementById('cart-drawer-overlay')?.addEventListener('click', closeCartDrawer);
  document.getElementById('clear-cart-btn')?.addEventListener('click', clearCart);

  // Dispatch Triggers
  document.getElementById('order-whatsapp-btn')?.addEventListener('click', sendViaWhatsApp);
  document.getElementById('order-sms-btn')?.addEventListener('click', sendViaSMS);
  document.getElementById('copy-order-btn')?.addEventListener('click', () => copyOrderToClipboard(true));

  // Escape Key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLocationModal();
      closeCallModal();
      if (state.isDrawerOpen) closeCartDrawer();
    }
  });
}

function updateDietFilterUI() {
  document.querySelectorAll('.diet-filter-btn').forEach(btn => {
    if (btn.dataset.diet === state.dietFilter) {
      btn.classList.add('bg-stone-900', 'text-white', 'border-stone-900');
      btn.classList.remove('bg-white', 'text-stone-700', 'border-stone-200');
    } else {
      btn.classList.remove('bg-stone-900', 'text-white', 'border-stone-900');
      btn.classList.add('bg-white', 'text-stone-700', 'border-stone-200');
    }
  });
}
