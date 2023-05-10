let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(article) {
    const existingArticle = cart.find(item => item.id === article.id);
    if (existingArticle) {
        existingArticle.quantity++;
    } else {
        cart.push({ ...article, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(cart);
}

function removeArticleFromCart(id) {
    cart = cart.filter(article => article.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function emptyCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

const cartState = document.querySelector('#cart-icon');
const cartContainer = document.querySelector('.cart');
const overlay = document.querySelector('.overlay');

cartState.addEventListener('click', () => {
    if (cartContainer.classList.contains('open')) {
        cartContainer.classList.remove('open');
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none'
    } else {
        cartContainer.classList.add('open');
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'auto'
    }
});


function displayCart() {
    const cartList = document.querySelector('.cart-list');
    cartList.innerHTML = '';

    cart.forEach((article) => {
        const articleItem = document.createElement('li');
        articleItem.classList.add('cart-item');

        const img = document.createElement('img');
        img.src = article.img1;
        img.style.width = '50px';

        const title = document.createElement('h3');
        title.classList.add('article-title-cart');
        title.textContent = article.titre;

        const price = document.createElement('p');
        price.className = 'article-price-cart';
        price.textContent = `${article.prix - article.prix * article.reduction / 100} €`;

        const quantity = document.createElement('p');
        quantity.className = 'article-quantity-cart';
        quantity.textContent = `Quantité : ${article.quantity}`;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Supprimer';
        removeBtn.className = 'remove-btn-cart';
        removeBtn.addEventListener('click', () => {
            removeArticleFromCart(article.id);
        });
        const ctnPriceTitle = document.createElement('div');
        ctnPriceTitle.classList.add('ctn-price-title');
        ctnPriceTitle.append(title, price);

        articleItem.append(img,ctnPriceTitle, quantity, removeBtn);
        cartList.appendChild(articleItem);
    });

    const total = cart.reduce((sum, article) => sum + (article.prix - article.prix * article.reduction / 100) * article.quantity, 0);
    const cartTotal = document.querySelector('.cart-total');
    cartTotal.textContent = `Total : ${total} €`;
}

const emptyCartBtn = document.querySelector('.empty-cart-btn');
emptyCartBtn.addEventListener('click', emptyCart);

const checkoutBtn = document.querySelector('.checkout-btn');
checkoutBtn.addEventListener('click', () => {
    alert('Merci pour votre commande!');
});

displayCart();

