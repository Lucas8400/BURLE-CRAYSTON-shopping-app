
let articlesData = [];

async function fetchArticles() {
    try {
        const response = await fetch('http://localhost:3000/articles');
        articlesData = await response.json();
        displayArticles(articlesData);
    } catch (error) {
        console.error('Erreur lors de la récupération des articles :', error);
    }
}

function displayArticles(articles) {
    const articleList = document.querySelector('.article-list');
    articleList.innerHTML = '';

    articles.forEach(article => {
        const articlePreview = document.createElement('div');
        articlePreview.classList.add('article-preview');

        const img = document.createElement('div');
        img.className = 'ctn-img';
        img.style.backgroundImage = `url('${article.img1}')`;

        img.addEventListener('mouseenter', () => {
            img.style.backgroundImage = `url('${article.img2}')`;
        });
        img.addEventListener('mouseleave', () => {
            img.style.backgroundImage = `url('${article.img1}')`;
        });

        const title = document.createElement('h2');
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

        const addToCartBtn = document.createElement('button');
        addToCartBtn.className = 'add-to-cart-btn';
        addToCartBtn.textContent = 'Ajouter au panier';
        addToCartBtn.addEventListener('click', () => {
            addToCart({
                id: article.id,
                titre: article.titre,
                prix: article.prix,
                img1: article.img1,
                reduction: article.reduction,
                quantity: article.quantity
            });
            displayCart();
        });

        const viewDetailsBtn = document.createElement('button');
        viewDetailsBtn.textContent = 'Voir la fiche produit';
        viewDetailsBtn.addEventListener("click", () => {
            window.location.href = `details.html?id=${article.id}`;
        });

        const ctnButtons = document.createElement('div');
        ctnButtons.classList.add('ctn-buttons');
        ctnButtons.append(addToCartBtn, viewDetailsBtn);

        articlePreview.append(img, title, price, ctnButtons);
        articleList.appendChild(articlePreview);
    });
}

fetchArticles();

function filterArticles(selectedColor, selectedCategory, selectedPrice) {
    let filteredArticles = articlesData.filter(article => {
        if (selectedColor === 'all' && selectedCategory === 'all') {
            return true;
        } else if (selectedColor === 'all' && selectedCategory !== 'all') {
            return article.categorie === selectedCategory;
        } else if (selectedColor !== 'all' && selectedCategory === 'all') {
            return article.couleur === selectedColor;
        } else {
            return article.couleur === selectedColor && article.categorie === selectedCategory;
        }
    });

    if (selectedPrice === 'price-asc') {
        filteredArticles.sort((a, b) => a.prix - b.prix);
    } else if (selectedPrice === 'price-desc') {
        filteredArticles.sort((a, b) => b.prix - a.prix);
    }

    if (filteredArticles.length > 0) {
        displayArticles(filteredArticles);
    } else {
        const articleList = document.querySelector('.article-list');
        articleList.innerHTML = 'Aucun article trouvé';
    }
}

const colorSelect = document.getElementById('color-select');
colorSelect.addEventListener('change', () => {
    const selectedColor = colorSelect.value;
    const categorySelect = document.getElementById('category-select');
    const selectedCategory = categorySelect.value;
    const articleList = document.querySelector('.article-list');
    articleList.innerHTML = '';
    filterArticles(selectedColor, selectedCategory);
});

const categorySelect = document.getElementById('category-select');
categorySelect.addEventListener('change', () => {
    const selectedCategory = categorySelect.value;
    const colorSelect = document.getElementById('color-select');
    const selectedColor = colorSelect.value;
    const articleList = document.querySelector('.article-list');
    articleList.innerHTML = '';
    filterArticles(selectedColor, selectedCategory);
});

const priceSelect = document.getElementById('price-select');
priceSelect.addEventListener('change', () => {
    const selectedPrice = priceSelect.value;
    const colorSelect = document.getElementById('color-select');
    const selectedColor = colorSelect.value;
    const categorySelect = document.getElementById('category-select');
    const selectedCategory = categorySelect.value;
    const articleList = document.querySelector('.article-list');
    articleList.innerHTML = '';
    filterArticles(selectedColor, selectedCategory, selectedPrice);
});

