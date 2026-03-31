// DAN MALAM COLLECTION - COMPLETE WORKING SCRIPT
console.log('script.js loaded successfully!');

// PRODUCTS WITH YOUR OWN IMAGES
const products = [
    { id: 1, name: "Heritage Chrono", price: 450000, image: "image-100.jpg" },
    { id: 2, name: "Sport Diver Pro", price: 380000, image: "image-200.jpg" },
    { id: 3, name: "Limited Edition Gold", price: 890000, image: "image-300.jpg" },
    { id: 4, name: "Classic Moonphase", price: 520000, image: "image-400.jpg" },
    
    
];

// CART
let cart = [];

function loadCart() {
    const saved = localStorage.getItem('danMalamCart');
    if (saved) cart = JSON.parse(saved);
    updateCartCount();
    if (document.getElementById('cart-container')) renderCartPage();
}

function saveCart() {
    localStorage.setItem('danMalamCart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('#cart-count').forEach(el => {
        if (el) el.textContent = total;
    });
}

function addToCart(id, name, price) {
    console.log('Adding:', name);
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    saveCart();
    showMessage(`${name} added to cart!`);
    if (document.getElementById('cart-container')) renderCartPage();
}

function removeFromCart(id) {
    const item = cart.find(item => item.id === id);
    if (item) {
        cart = cart.filter(item => item.id !== id);
        saveCart();
        showMessage(`${item.name} removed`);
        renderCartPage();
    }
}

function updateQuantity(id, qty) {
    qty = parseInt(qty);
    if (qty < 1) {
        removeFromCart(id);
        return;
    }
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity = qty;
        saveCart();
        renderCartPage();
    }
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function renderCartPage() {
    const container = document.getElementById('cart-container');
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <h3>Your Cart is Empty</h3>
                <a href="shop.html" class="btn btn-primary">Shop Now</a>
            </div>
        `;
        return;
    }
    
    let html = `<table class="cart-table"><thead><tr><th>Product</th><th>Price</th><th>Qty</th><th>Total</th><th></th></tr></thead><tbody>`;
    
    cart.forEach(item => {
        html += `
            <tr>
                <td><strong>${item.name}</strong></td>
                <td>₦${item.price.toLocaleString()}</td>
                <td><input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)" style="width:60px"></td>
                <td>₦${(item.price * item.quantity).toLocaleString()}</td>
                <td><button class="btn-remove" onclick="removeFromCart(${item.id})">Remove</button></td>
            </tr>
        `;
    });
    
    html += `</tbody></table>`;
    html += `<div class="cart-total"><h3>Total: ₦${getCartTotal().toLocaleString()}</h3></div>`;
    html += `<div class="cart-actions"><a href="shop.html" class="btn btn-outline">Continue Shopping</a><button class="btn btn-primary" onclick="checkout()">Checkout</button></div>`;
    
    container.innerHTML = html;
}

function checkout() {
    if (cart.length === 0) return;
    alert(`Order placed!\nTotal: ₦${getCartTotal().toLocaleString()}\n\nThank you for shopping at DAN MALAM COLLECTION!`);
    cart = [];
    saveCart();
    renderCartPage();
    updateCartCount();
}

function showMessage(msg) {
    const div = document.createElement('div');
    div.textContent = msg;
    div.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#1a1a2e;color:#c5a028;padding:12px 24px;border-radius:8px;z-index:9999;font-family:Poppins,sans-serif';
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 2000);
}

function displayFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;
    container.innerHTML = products.slice(0,3).map(p => `
        <div class="product-card">
            <img src="${p.image}" alt="${p.name}" style="width:100%;height:250px;object-fit:cover;border-radius:12px 12px 0 0">
            <h4>${p.name}</h4>
            <p class="product-price">₦${p.price.toLocaleString()}</p>
            <button class="btn-add-cart" onclick="addToCart(${p.id}, '${p.name}', ${p.price})">Add to Cart</button>
        </div>
    `).join('');
}

function displayAllProducts() {
    const container = document.getElementById('all-products');
    if (!container) return;
    container.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.image}" alt="${p.name}" style="width:100%;height:250px;object-fit:cover;border-radius:12px 12px 0 0">
            <h4>${p.name}</h4>
            <p class="product-price">₦${p.price.toLocaleString()}</p>
            <button class="btn-add-cart" onclick="addToCart(${p.id}, '${p.name}', ${p.price})">Add to Cart</button>
        </div>
    `).join('');
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('DAN MALAM COLLECTION - Ready!');
    loadCart();
    
    if (document.getElementById('featured-products')) displayFeaturedProducts();
    if (document.getElementById('all-products')) displayAllProducts();
    
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
    window.updateQuantity = updateQuantity;
    window.checkout = checkout;
});
