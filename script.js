// DAN MALAM COLLECTION - COMPLETE WORKING SCRIPT

// PRODUCT DATABASE WITH REAL WATCH IMAGES
const products = [
    { id: 1, name: "Heritage Chrono", price: 450000, image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 2, name: "Sport Diver Pro", price: 380000, image: "https://images.pexels.com/photos/2783873/pexels-photo-2783873.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 3, name: "Limited Edition Gold", price: 890000, image: "image-200.jpg" },
    { id: 4, name: "Classic Moonphase", price: 520000, image: "image-400.jpg" },
    { id: 5, name: "Aviator GMT", price: 495000, image: "image-300.jpg" },
    { id: 6, name: "Skeleton Elite", price: 750000, image: "image-100.jpg" }
];

// CART ARRAY
let cart = [];

// LOAD CART FROM STORAGE
function loadCart() {
    const savedCart = localStorage.getItem('danMalamCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    updateCartDisplay();
}

// SAVE CART TO STORAGE
function saveCart() {
    localStorage.setItem('danMalamCart', JSON.stringify(cart));
    updateCartDisplay();
}

// ADD TO CART FUNCTION
function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
        showMessage(`${name} quantity updated to ${existingItem.quantity}`);
    } else {
        cart.push({ id, name, price, quantity: 1 });
        showMessage(`${name} added to cart!`);
    }
    
    saveCart();
}

// REMOVE FROM CART
function removeFromCart(id) {
    const item = cart.find(item => item.id === id);
    if (item) {
        cart = cart.filter(item => item.id !== id);
        saveCart();
        renderCartPage();
        showMessage(`${item.name} removed`);
    }
}

// UPDATE QUANTITY
function updateQuantity(id, newQuantity) {
    newQuantity = parseInt(newQuantity);
    if (newQuantity < 1) {
        removeFromCart(id);
        return;
    }
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity = newQuantity;
        saveCart();
        renderCartPage();
    }
}

// GET CART TOTAL
function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// GET TOTAL ITEMS
function getCartItemCount() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}

// UPDATE CART DISPLAY (BADGE)
function updateCartDisplay() {
    const countElements = document.querySelectorAll('#cart-count');
    const count = getCartItemCount();
    countElements.forEach(el => {
        if (el) el.textContent = count;
    });
    
    if (document.getElementById('cart-container')) {
        renderCartPage();
    }
}

// RENDER CART PAGE
function renderCartPage() {
    const container = document.getElementById('cart-container');
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <h3>Your Cart is Empty</h3>
                <p>Looks like you haven't added any watches yet.</p>
                <a href="shop.html" class="btn btn-primary">Browse Collection</a>
            </div>
        `;
        return;
    }
    
    let html = `<table class="cart-table"><thead><tr><th>Product</th><th>Price</th><th>Quantity</th><th>Total</th><th></th></tr></thead><tbody>`;
    
    cart.forEach(item => {
        html += `
            <tr>
                <td><strong>${item.name}</strong></td>
                <td>₦${item.price.toLocaleString()}</td>
                <td><input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)" style="width:60px; padding:5px;"></td>
                <td>₦${(item.price * item.quantity).toLocaleString()}</td>
                <td><button class="btn-remove" onclick="removeFromCart(${item.id})">Remove</button></td>
            </tr>
        `;
    });
    
    html += `</tbody></table>`;
    html += `<div class="cart-total"><h4>Total: ₦${getCartTotal().toLocaleString()}</h4></div>`;
    html += `<div class="cart-actions"><a href="shop.html" class="btn btn-outline">Continue Shopping</a><button class="btn btn-primary" onclick="checkout()">Proceed to Checkout</button></div>`;
    
    container.innerHTML = html;
}

// CHECKOUT FUNCTION
function checkout() {
    if (cart.length === 0) return;
    alert(`Thank you for shopping at DAN MALAM COLLECTION!\n\nTotal: ₦${getCartTotal().toLocaleString()}\n\nWe will contact you shortly.`);
    cart = [];
    saveCart();
    renderCartPage();
}

// SHOW NOTIFICATION
function showMessage(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #1a1a2e;
        color: #c5a028;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 9999;
        font-weight: 500;
        animation: slideIn 0.3s ease;
        font-family: 'Poppins', sans-serif;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2500);
}

// DISPLAY FEATURED PRODUCTS ON HOME PAGE
function displayFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;
    
    const featured = products.slice(0, 3);
    container.innerHTML = featured.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h4>${product.name}</h4>
            <p class="product-price">₦${product.price.toLocaleString()}</p>
            <button class="btn-add-cart" onclick="addToCart(${product.id}, '${product.name}', ${product.price})">
                Add to Cart
            </button>
        </div>
    `).join('');
}

// DISPLAY ALL PRODUCTS ON SHOP PAGE
function displayAllProducts() {
    const container = document.getElementById('all-products');
    if (!container) return;
    
    container.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h4>${product.name}</h4>
            <p class="product-price">₦${product.price.toLocaleString()}</p>
            <button class="btn-add-cart" onclick="addToCart(${product.id}, '${product.name}', ${product.price})">
                Add to Cart
            </button>
        </div>
    `).join('');
}

// INITIALIZE EVERYTHING
document.addEventListener('DOMContentLoaded', function() {
    console.log('DAN MALAM COLLECTION - Website Loaded');
    loadCart();
    
    if (document.getElementById('featured-products')) displayFeaturedProducts();
    if (document.getElementById('all-products')) displayAllProducts();
    
    // Make functions global for onclick handlers
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
    window.updateQuantity = updateQuantity;
    window.checkout = checkout;
});

// ADD ANIMATION
const style = document.createElement('style');
style.textContent = `@keyframes slideIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}`;
document.head.appendChild(style);