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
        title.classList.add('article-title');
        title.textContent = article.titre;

        const price = document.createElement('p');
        price.className = 'article-price';
        price.textContent = `${article.prix} €`;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Supprimer';
        removeBtn.addEventListener('click', () => {
            removeArticleFromCart(article.id);
        });

        articleItem.append(img, title, price, removeBtn);
        cartList.appendChild(articleItem);
    });

    const total = cart.reduce((sum, article) => sum + Number(article.prix), 0);
    const cartTotal = document.querySelector('.cart-total');
    cartTotal.textContent = `Total : ${total} €`;
}

const emptyCartBtn = document.querySelector('.empty-cart-btn');
emptyCartBtn.addEventListener('click', emptyCart);

displayCart();

