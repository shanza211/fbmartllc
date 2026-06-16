document.addEventListener('DOMContentLoaded', () => {
    // --- Sticky Navbar ---
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('navbar-scrolled');
        } else {
            header.classList.remove('navbar-scrolled');
        }
    });

    // --- Scroll Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(element => {
        observer.observe(element);
    });

    // --- Product Data ---
    const products = [
        { id: 9, name: 'Kanikko Crispy Baby Crab Snacks', price: 7.99, desc: 'Delightfully crispy and savory baby crab snacks.', img: '41K-ryoansL._SY300_SX300_QL70_FMwebp_.webp', rating: 5 },
        { id: 10, name: "Andersen's Freeze-Dried Gummy Fish", price: 4.50, desc: 'Delicious freeze-dried gummy fish, red fishies flavor.', img: '71G5jpO7mZL._SX679_.jpg', rating: 4 },
        { id: 11, name: 'Hokkaido Cakes Anpan Sweet Buns', price: 12.50, desc: '5-pack of traditional Japanese artisan sweet buns.', img: '71o4gY8jozL._SX679_.jpg', rating: 5 },
        { id: 12, name: 'Marumochi Zenzai Red Bean Soup (2 Pack)', price: 9.99, desc: 'Sweet red bean soup with soft, delicious mochi cakes.', img: '81a3gQvth9L._SX679_PIbundle-2,TopRight,0,0_SX679SY706SH20_.jpg', rating: 5 },
        { id: 1, name: 'Fresh Fruits Basket', price: 24.99, desc: 'A mix of seasonal fresh fruits.', img: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=500&q=60', rating: 5 },
        { id: 2, name: 'Organic Vegetables Pack', price: 18.50, desc: 'Farm-fresh organic veggies.', img: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=500&q=60', rating: 4 },
        { id: 3, name: 'Premium Basmati Rice', price: 12.99, desc: 'Long-grain aromatic rice.', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=60', rating: 5 },
        { id: 4, name: 'Healthy Cooking Oil', price: 15.00, desc: '100% pure olive oil.', img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=60', rating: 4 },
        { id: 5, name: 'Dry Fruits Collection', price: 29.99, desc: 'Almonds, walnuts, and cashews.', img: 'https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?auto=format&fit=crop&w=500&q=60', rating: 5 },
        { id: 6, name: 'Snacks & Beverages', price: 9.99, desc: 'Tasty snacks for your cravings.', img: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=500&q=60', rating: 3 },
        { id: 7, name: 'Spices Collection', price: 14.50, desc: 'Authentic organic spices.', img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=500&q=60', rating: 5 },
        { id: 8, name: 'Fresh Bakery Items', price: 8.50, desc: 'Daily baked breads and buns.', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=60', rating: 4 },
    ];

    // --- Render Products ---
    const productsContainer = document.getElementById('products-container');
    
    function renderProducts() {
        if (!productsContainer) return;
        productsContainer.innerHTML = products.map((product, index) => {
            const delayClass = `delay-${(index % 4) + 1}`;
            const stars = Array(5).fill(0).map((_, i) => `<i class="fa-${i < product.rating ? 'solid' : 'regular'} fa-star"></i>`).join('');
            
            return `
                <div class="col-lg-3 col-md-4 col-sm-6 fade-in-up ${delayClass}">
                    <div class="card product-card h-100 rounded-4">
                        <div class="product-img-wrapper">
                            <img src="${product.img}" class="product-img" alt="${product.name}">
                        </div>
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title fw-bold fs-6 mb-1">${product.name}</h5>
                            <div class="star-rating mb-2">${stars}</div>
                            <p class="card-text text-muted small flex-grow-1">${product.desc}</p>
                            <div class="d-flex justify-content-between align-items-center mt-3">
                                <span class="fw-bold fs-5 text-green">$${product.price.toFixed(2)}</span>
                                <div class="quantity-selector">
                                    <button type="button" class="quantity-btn minus-btn" data-id="${product.id}">-</button>
                                    <input type="number" class="quantity-input qty-input-${product.id}" value="1" min="1" max="10" readonly>
                                    <button type="button" class="quantity-btn plus-btn" data-id="${product.id}">+</button>
                                </div>
                            </div>
                            <button class="btn btn-green w-100 mt-3 rounded-pill add-to-cart-btn" data-id="${product.id}">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        // Setup quantity buttons in product grid
        document.querySelectorAll('.minus-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const input = document.querySelector(`.qty-input-${id}`);
                if (input.value > 1) input.value = parseInt(input.value) - 1;
            });
        });
        
        document.querySelectorAll('.plus-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const input = document.querySelector(`.qty-input-${id}`);
                if (input.value < 10) input.value = parseInt(input.value) + 1;
            });
        });

        // Setup add to cart buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                const qty = parseInt(document.querySelector(`.qty-input-${id}`).value);
                addToCart(id, qty);
                
                // Show brief success animation on button
                const originalText = e.target.innerText;
                e.target.innerHTML = '<i class="fa-solid fa-check"></i> Added';
                e.target.classList.replace('btn-green', 'btn-success');
                setTimeout(() => {
                    e.target.innerText = originalText;
                    e.target.classList.replace('btn-success', 'btn-green');
                }, 1500);
            });
        });

        // Observe the dynamically rendered products for animations
        productsContainer.querySelectorAll('.fade-in-up').forEach(element => {
            observer.observe(element);
        });
    }

    renderProducts();

    // --- Shopping Cart Logic ---
    let cart = JSON.parse(localStorage.getItem('fbmart_cart')) || [];
    
    function saveCart() {
        localStorage.setItem('fbmart_cart', JSON.stringify(cart));
        updateCartUI();
    }

    function addToCart(productId, quantity) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ ...product, quantity });
        }
        saveCart();
        
        // Open offcanvas to show the item was added
        const cartOffcanvas = new bootstrap.Offcanvas(document.getElementById('cartOffcanvas'));
        cartOffcanvas.show();
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
    }

    function updateItemQuantity(productId, newQuantity) {
        if (newQuantity < 1) return;
        const item = cart.find(i => i.id === productId);
        if (item) {
            item.quantity = newQuantity;
            saveCart();
        }
    }

    function updateCartUI() {
        const cartCountEl = document.getElementById('cart-count');
        const cartItemsContainer = document.getElementById('cart-items');
        const emptyCartMsg = document.getElementById('empty-cart-msg');
        const cartTotalEl = document.getElementById('cart-total');
        
        // Update total items badge
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountEl.innerText = totalItems;
        
        // Calculate total price
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalEl.innerText = `$${totalPrice.toFixed(2)}`;

        // Render items
        if (cart.length === 0) {
            emptyCartMsg.classList.remove('d-none');
            // Remove all cart items except the empty message
            Array.from(cartItemsContainer.children).forEach(child => {
                if (child.id !== 'empty-cart-msg') child.remove();
            });
        } else {
            emptyCartMsg.classList.add('d-none');
            
            // Re-render all items (keeping the empty message hidden)
            const html = cart.map(item => `
                <div class="cart-item d-flex align-items-center">
                    <img src="${item.img}" alt="${item.name}" class="cart-item-img me-3 shadow-sm">
                    <div class="flex-grow-1">
                        <h6 class="mb-0 fw-bold fs-6 text-truncate" style="max-width: 150px;">${item.name}</h6>
                        <span class="text-green fw-bold">$${item.price.toFixed(2)}</span>
                        
                        <div class="d-flex align-items-center justify-content-between mt-2">
                            <div class="quantity-selector" style="transform: scale(0.8); transform-origin: left;">
                                <button type="button" class="quantity-btn cart-minus" data-id="${item.id}">-</button>
                                <input type="number" class="quantity-input" value="${item.quantity}" readonly>
                                <button type="button" class="quantity-btn cart-plus" data-id="${item.id}">+</button>
                            </div>
                            <button class="btn-remove" data-id="${item.id}">Remove</button>
                        </div>
                    </div>
                </div>
            `).join('');
            
            // Replace inner HTML but append empty msg to keep it in DOM
            cartItemsContainer.innerHTML = html;
            cartItemsContainer.appendChild(emptyCartMsg);
            
            // Attach events to new elements
            document.querySelectorAll('.cart-minus').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = parseInt(e.target.getAttribute('data-id'));
                    const item = cart.find(i => i.id === id);
                    if (item && item.quantity > 1) updateItemQuantity(id, item.quantity - 1);
                });
            });
            
            document.querySelectorAll('.cart-plus').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = parseInt(e.target.getAttribute('data-id'));
                    const item = cart.find(i => i.id === id);
                    if (item) updateItemQuantity(id, item.quantity + 1);
                });
            });
            
            document.querySelectorAll('.btn-remove').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = parseInt(e.target.getAttribute('data-id'));
                    removeFromCart(id);
                });
            });
        }
    }

    // Initialize UI on load
    updateCartUI();

    document.getElementById('checkout-btn').addEventListener('click', () => {
        if (cart.length > 0) {
            alert('Proceeding to checkout with ' + cart.length + ' items.');
            // In a real app, redirect to checkout page
        } else {
            alert('Your cart is empty.');
        }
    });

    // --- Contact Form Submission ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submit-btn');
            const submitSpinner = document.getElementById('submit-spinner');
            const alertBox = document.getElementById('form-alert');
            
            // Get data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            };

            // Loading state
            submitBtn.disabled = true;
            submitSpinner.classList.remove('d-none');
            alertBox.classList.add('d-none');
            
            try {
                // Determine base URL depending on environment
                // If running locally, it hits the same origin
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                
                if (response.ok) {
                    alertBox.className = 'alert alert-success';
                    alertBox.innerText = result.message || 'Message sent successfully!';
                    alertBox.classList.remove('d-none');
                    contactForm.reset();
                } else {
                    throw new Error(result.message || 'Failed to send message.');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                alertBox.className = 'alert alert-danger';
                alertBox.innerText = 'Could not send message. Please ensure the backend is running or try again later.';
                alertBox.classList.remove('d-none');
            } finally {
                submitBtn.disabled = false;
                submitSpinner.classList.add('d-none');
            }
        });
    }
});
