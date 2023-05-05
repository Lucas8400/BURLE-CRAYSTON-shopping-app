const data = require('../../data.json');

exports.getAllArticles = (req, res) => {
    res.json(data);
};

exports.getArticleById = (req, res) => {
    const articleId = req.params.id;
    const article = data.find((item) => item.id === articleId);

    if (article) {
        res.json(article);
    } else {
        res.status(404).json({ message: 'Aucun article' });
    }
};
