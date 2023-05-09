let panier = [];

function addToCart(article) {
  // ajoute l'article au panier
  panier.push(article);

  // met à jour l'affichage du panier
  const cartItems = document.querySelector('.cart-items');
  const cartTotal = document.querySelector('.cart-total');

  // supprime tous les éléments existants dans la liste des articles du panier
  while (cartItems.firstChild) {
    cartItems.removeChild(cartItems.firstChild);
  }

  // ajoute chaque article dans la liste des articles du panier
  panier.forEach((article) => {
    const item = document.createElement('li');
    item.textContent = `${article.titre} - ${article.prix} €`;
    cartItems.appendChild(item);
  });

  // calcule le total du panier
  const total = panier.reduce((sum, article) => sum + article.prix, 0);
  cartTotal.textContent = `Total : ${total} €`;
}

function displayCart(cart) {
    const cartList = document.querySelector('.cart-list');
    cartList.innerHTML = ''; // on vide la liste avant de l'afficher
  
    cart.forEach(article => {
      const articleItem = document.createElement('li');
      articleItem.classList.add('cart-item');
  
      const title = document.createElement('h3');
      title.classList.add('article-title');
      title.textContent = article.titre;
  
      const price = document.createElement('p');
      price.className = 'article-price';
      if (article.reduction) {
        const originalPrice = document.createElement('span');
        originalPrice.classList.add('original-price');
        originalPrice.textContent = `${article.prix} €`;
  
        const discountedPrice = document.createElement('span');
        discountedPrice.textContent = `${article.prix - article.prix * article.reduction / 100} €`;
  
        price.append(originalPrice, discountedPrice);
      } else {
        price.textContent = `${article.prix} €`;
      }
  
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Supprimer';
      removeBtn.addEventListener('click', () => {
        removeArticleFromCart(article.id);
        displayCart(getCart());
      });
  
      articleItem.append(title, price, removeBtn);
      cartList.appendChild(articleItem);
    });
  }

function addToCart(article) {
    let cart = getCart();
    cart.push(article);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart(cart);
  }

function removeItem(id) {
    panier = panier.filter(item => item.id !== id);
    displayCart();
}