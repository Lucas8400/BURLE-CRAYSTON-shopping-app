const articleList = document.querySelector('.article-list');
let articlesData = [];

async function fetchArticles() {
  try {
    const response = await fetch('http://localhost:3000/articles');
    const articles = await response.json();
    articlesData = articles; // stocker les articles récupérés
    displayArticles(articlesData);
  } catch (error) {
    console.error('Erreur lors de la récupération des articles :', error);
  }
}

function displayArticles(articles) {
    articleList.innerHTML = ''; // vider la liste avant de l'afficher à nouveau
  
    if (articles.length === 0) {
      const noArticlesMessage = document.createElement('p');
      noArticlesMessage.textContent = 'Aucun article trouvé';
      articleList.appendChild(noArticlesMessage);
    } else {
      articles.forEach(article => {
        const articleElement = createArticleElement(article);
        articleList.appendChild(articleElement);
      });
    }
  }
function createArticleElement(article) {
  // Créer un élément article
  const articleElement = document.createElement('article');
  articleElement.classList.add('article');

  // Ajouter les éléments du contenu de l'article
  const titleElement = document.createElement('h2');
  titleElement.classList.add('article-title');
  titleElement.textContent = article.titre;
  articleElement.appendChild(titleElement);

  const descriptionElement = document.createElement('p');
  descriptionElement.classList.add('article-description');
  descriptionElement.textContent = article.description;
  articleElement.appendChild(descriptionElement);

  const priceElement = document.createElement('p');
  priceElement.classList.add('article-price');
  priceElement.textContent = `${article.prix} €`;
  articleElement.appendChild(priceElement);

  const colorElement = document.createElement('p');
  colorElement.classList.add('article-color');
  colorElement.textContent = `Couleur : ${article.couleur}`;
  articleElement.appendChild(colorElement);

  const categoryElement = document.createElement('p');
  categoryElement.classList.add('article-category');
  categoryElement.textContent = `Catégorie : ${article.categorie}`;
  articleElement.appendChild(categoryElement);

  return articleElement;
}

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
      articleList.innerHTML = 'Aucun article trouvé';
    }
  }

const colorSelect = document.getElementById('color-select');
colorSelect.addEventListener('change', () => {
  const selectedColor = colorSelect.value;
  const categorySelect = document.getElementById('category-select');
  const selectedCategory = categorySelect.value;
  articleList.innerHTML = ''; 
  filterArticles(selectedColor, selectedCategory);
});

const categorySelect = document.getElementById('category-select');
categorySelect.addEventListener('change', () => {
  const selectedCategory = categorySelect.value;
  const colorSelect = document.getElementById('color-select');
  const selectedColor = colorSelect.value;
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
  articleList.innerHTML = '';
  filterArticles(selectedColor, selectedCategory, selectedPrice);
});

fetchArticles();