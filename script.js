// Sample Product Data
const products = [
    {
        id: 1,
        name: "Premium Smartwatch",
        description: "Elegant and feature-rich smartwatch for your daily needs.",
        price: 199.99,
        image: "assets/product_watch.png",
        rating: 4.8
    },
    {
        id: 2,
        name: "Wireless Headphones",
        description: "High-fidelity sound with active noise cancellation.",
        price: 149.50,
        image: "assets/product_headphones.png",
        rating: 4.9
    },
    {
        id: 3,
        name: "Designer Leather Tote",
        description: "Spacious and stylish premium leather bag.",
        price: 89.00,
        image: "assets/product_bag.png",
        rating: 4.7
    },
    {
        id: 4,
        name: "Athletic Running Shoes",
        description: "Comfortable and lightweight shoes for optimal performance.",
        price: 120.00,
        image: "assets/product_shoes.png",
        rating: 4.6
    }
];

// Cart State
let cart = [];

// DOM Elements
const productGrid = document.getElementById('product-grid');
const cartIcon = document.getElementById('cart-icon');
const closeCartBtn = document.getElementById('close-cart');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountElement = document.getElementById('cart-count');
const cartTotalAmountElement = document.getElementById('cart-total-amount');
const mobileMenuBtn = document.getElementById('menu-icon');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

// Generate Product HTML
function renderProducts() {
    products.forEach(product => {
        const starHTML = generateStars(product.rating);
        
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-desc">${product.description}</p>
                <div class="product-price-row">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <div class="product-rating">
                        ${starHTML}
                    </div>
                </div>
                <div class="product-actions">
                    <div class="qty-control">
                        <button class="qty-btn minus" data-id="${product.id}">-</button>
                        <input type="number" class="qty-input" id="qty-${product.id}" value="1" min="1">
                        <button class="qty-btn plus" data-id="${product.id}">+</button>
                    </div>
                    <button class="btn btn-primary add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;
        productGrid.appendChild(productCard);
    });

    // Attach event listeners to quantity buttons and add to cart
    attachProductEvents();
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let html = '';
    
    for(let i=0; i<fullStars; i++) {
        html += "<i class='bx bxs-star'></i>";
    }
    if(hasHalfStar) {
        html += "<i class='bx bxs-star-half'></i>";
    }
    return html;
}

function attachProductEvents() {
    // Quantity Plus/Minus
    document.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const input = document.getElementById(`qty-${id}`);
            let val = parseInt(input.value);
            
            if(e.target.classList.contains('plus')) {
                input.value = val + 1;
            } else if(e.target.classList.contains('minus') && val > 1) {
                input.value = val - 1;
            }
        });
    });

    // Add to Cart
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            const qty = parseInt(document.getElementById(`qty-${id}`).value);
            addToCart(id, qty);
        });
    });
}

// Cart Functionality
function addToCart(productId, quantity) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }

    updateCartUI();
    openCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateCartItemQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

function updateCartUI() {
    // Update count badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;

    // Render cart items
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is currently empty.</p>';
        cartTotalAmountElement.textContent = '$0.00';
        return;
    }

    let totalPrice = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        const cartItemEl = document.createElement('div');
        cartItemEl.classList.add('cart-item');
        cartItemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-actions">
                    <div class="qty-control" style="transform: scale(0.8); transform-origin: left center;">
                        <button class="qty-btn cart-minus" data-id="${item.id}">-</button>
                        <input type="number" class="qty-input" value="${item.quantity}" readonly>
                        <button class="qty-btn cart-plus" data-id="${item.id}">+</button>
                    </div>
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemEl);
    });

    cartTotalAmountElement.textContent = `$${totalPrice.toFixed(2)}`;

    // Attach cart item events
    document.querySelectorAll('.cart-minus').forEach(btn => {
        btn.addEventListener('click', (e) => updateCartItemQuantity(parseInt(e.target.getAttribute('data-id')), -1));
    });
    
    document.querySelectorAll('.cart-plus').forEach(btn => {
        btn.addEventListener('click', (e) => updateCartItemQuantity(parseInt(e.target.getAttribute('data-id')), 1));
    });

    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => removeFromCart(parseInt(e.target.getAttribute('data-id'))));
    });
}

// Cart Sidebar Toggle
function openCart() {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

cartIcon.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    const icon = mobileMenu.classList.contains('active') ? 'bx-x' : 'bx-menu';
    mobileMenuBtn.innerHTML = `<i class='bx ${icon}'></i>`;
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.innerHTML = `<i class='bx bx-menu'></i>`;
    });
});

// Contact Form Simulation
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const originalText = btn.textContent;
    
    btn.textContent = 'Sending...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.textContent = 'Message Sent!';
        btn.style.backgroundColor = '#66BB6A';
        e.target.reset();
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.backgroundColor = '';
            btn.disabled = false;
        }, 3000);
    }, 1500);
});

// Sticky Navbar effect on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        navbar.style.height = '70px';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
        navbar.style.height = '80px';
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});
