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

  articles.forEach(article => {
    // Vérifier si l'article doit être affiché en fonction du filtre
    const categorySelect = document.getElementById('category-select');
    const selectedCategory = categorySelect.value;
    if (selectedCategory === 'all' || article.categorie === selectedCategory) {
      const articleElement = createArticleElement(article);
      articleList.appendChild(articleElement);
    }
  });
}

function filterArticles(selectedCategory) {
  const filteredArticles = articlesData.filter(article => {
    if (selectedCategory === 'all') {
      return true; // inclure tous les articles
    } else {
      return article.categorie === selectedCategory;
    }
  });

  displayArticles(filteredArticles);
}

const categorySelect = document.getElementById('category-select');
categorySelect.addEventListener('change', () => {
  const selectedCategory = categorySelect.value;
  articleList.innerHTML = ''; // vider la liste avant d'afficher les nouveaux articles
  filterArticles(selectedCategory);
});

fetchArticles();