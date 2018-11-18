const express = require('express');
const challenges = require('./data/challenges.json');
const solutionsController = require('./controllers/solutions.controller');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.render('index', {challenges});
});

app.get('/challenges/:id', (req, res) => {
  if (! isNaN(Number(req.params.id))) {
    const challenge = challenges[Number(req.params.id) - 1];
    return res.render('challenge', {challenge});
  } else {
    return res.redirect('/');
  }
});

app.post('/solutions/:id', solutionsController.validate);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
