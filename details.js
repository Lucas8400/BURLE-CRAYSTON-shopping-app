function getArticleIdFromUrl() {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('id');
}

async function fetchArticleDetails(articleId) {
    try {
        const response = await fetch(`http://localhost:3000/articles/${articleId}`);
        const article = await response.json();
        displayArticleDetails(article);
    } catch (error) {
        console.error('Erreur lors de la récupération des détails de l\'article :', error);
    }
}

function displayArticleDetails(article) {
    const articleDetails = document.querySelector('.article-details');

    const title = document.createElement('h2');
    title.className = 'article-title-details';
    title.textContent = article.titre;

    const imagesContainer = document.querySelector('.ctn-img-details');
    imagesContainer.style.backgroundImage = `url('${article.img1}')`;


    const price = document.createElement('p');
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

    const description = document.createElement('p');
    description.textContent = article.description;
    description.className = 'article-description';

    const addToCartBtn = document.createElement('button');
    addToCartBtn.className = 'add-to-cart-btn-details';
    addToCartBtn.textContent = 'Ajouter au panier';

    articleDetails.append(title, price, addToCartBtn, description);
}

fetchArticleDetails(getArticleIdFromUrl());
