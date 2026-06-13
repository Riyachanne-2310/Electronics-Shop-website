// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});


// ===== NAVBAR SCROLL SHADOW =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.style.boxShadow = '0 2px 16px rgba(91, 33, 182, 0.08)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});


// ===== COUNTDOWN TIMER =====
function startCountdown(hoursLeft, minutesLeft, secondsLeft) {
  let total = hoursLeft * 3600 + minutesLeft * 60 + secondsLeft;

  const hoursEl   = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');

  const timer = setInterval(() => {
    if (total <= 0) {
      clearInterval(timer);
      hoursEl.textContent   = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    total--;

    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;

    hoursEl.textContent   = String(h).padStart(2, '0');
    minutesEl.textContent = String(m).padStart(2, '0');
    secondsEl.textContent = String(s).padStart(2, '0');
  }, 1000);
}

startCountdown(8, 45, 12);


// ===== PRODUCT FILTER TABS =====
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {

    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    productCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.display = match ? 'block' : 'none';
    });
  });
});


// ===== SORT PRODUCTS =====
const sortSelect = document.querySelector('.sort-select');
const productsGrid = document.getElementById('productsGrid');

const productData = [
  { name: 'Pro Studio Headphones', brand: 'Beats',    price: 2499, rating: 5, category: 'audio',     el: null },
  { name: 'Galaxy Watch 6',        brand: 'Samsung',  price: 4999, rating: 4, category: 'wearables', el: null },
  { name: 'Hero 12 Mini Cam',      brand: 'GoPro',    price: 8999, rating: 5, category: 'cameras',   el: null },
  { name: 'Elite Controller',      brand: 'Xbox',     price: 1799, rating: 4, category: 'gaming',    el: null },
  { name: 'Flip 6 Speaker',        brand: 'JBL',      price: 3299, rating: 5, category: 'audio',     el: null },
  { name: 'AirPods Pro 2nd Gen',   brand: 'Apple',    price: 16999,rating: 5, category: 'wearables', el: null },
  { name: 'G Pro X Superlight',    brand: 'Logitech', price: 5499, rating: 5, category: 'gaming',    el: null },
  { name: 'Instax Mini 12',        brand: 'Fujifilm', price: 6499, rating: 4, category: 'cameras',   el: null },
];

// Link DOM elements to data
document.querySelectorAll('.product-card').forEach((card, i) => {
  productData[i].el = card;
});

sortSelect.addEventListener('change', () => {
  const value = sortSelect.value;
  if (!value) return;

  const sorted = [...productData].sort((a, b) => {
    if (value === 'price-asc')  return a.price  - b.price;
    if (value === 'price-desc') return b.price  - a.price;
    if (value === 'rating')     return b.rating - a.rating;
    return 0;
  });

  sorted.forEach(item => productsGrid.appendChild(item.el));
});


// ===== CART COUNTER =====
let cartCount = 3;
const cartBadge = document.querySelector('.cart-badge');

document.querySelectorAll('.btn-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    cartCount++;
    cartBadge.textContent = cartCount;

    // Button feedback
    btn.textContent = 'Added ✓';
    btn.style.background = '#7c3aed';
    setTimeout(() => {
      btn.textContent = 'Add to Cart';
      btn.style.background = '';
    }, 1500);
  });
});


// ===== WISHLIST TOGGLE =====
document.querySelectorAll('.wishlist-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const isWishlisted = btn.dataset.wishlisted === 'true';
    btn.dataset.wishlisted = !isWishlisted;
    btn.textContent = isWishlisted ? '♡' : '♥';
    btn.style.color = isWishlisted ? '' : '#5b21b6';
    btn.style.background = isWishlisted ? '' : '#ede9fe';
  });
});


// ===== NEWSLETTER FORM =====
const newsletterForm = document.querySelector('.newsletter-form');

newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
});

const subscribeBtn = newsletterForm.querySelector('.btn-primary');
const emailInput   = newsletterForm.querySelector('input[type="email"]');

subscribeBtn.addEventListener('click', () => {
  const email = emailInput.value.trim();

  if (!email || !email.includes('@')) {
    emailInput.style.borderColor = '#f87171';
    emailInput.placeholder = 'Please enter a valid email';
    setTimeout(() => {
      emailInput.style.borderColor = '';
      emailInput.placeholder = 'Enter your email address';
    }, 2000);
    return;
  }

  subscribeBtn.textContent = 'Subscribed ✓';
  subscribeBtn.style.background = '#ede9fe';
  emailInput.value = '';
  setTimeout(() => {
    subscribeBtn.textContent = 'Subscribe';
    subscribeBtn.style.background = '';
  }, 2500);
});


// ===== SMOOTH SCROLL ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + entry.target.id
          ? '#5b21b6'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => observer.observe(section));


// ===== LOAD MORE BUTTON =====
const loadMoreBtn = document.querySelector('.load-more-wrap .btn-outline');

loadMoreBtn.addEventListener('click', () => {
  loadMoreBtn.textContent = 'No more products';
  loadMoreBtn.disabled = true;
  loadMoreBtn.style.opacity = '0.5';
  loadMoreBtn.style.cursor = 'default';
});