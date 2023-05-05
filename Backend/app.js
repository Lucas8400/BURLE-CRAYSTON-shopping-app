const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const articlesRoutes = require('./api/routes/articles');

app.use(cors({
    origin: '*'
}));

app.use('/', articlesRoutes);

app.listen(port, () => console.log(`Server listening on port : ${port}`));
