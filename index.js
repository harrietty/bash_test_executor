const express = require('express');
const fs = require('fs')
const path = require('path')
const SshClient = require('node-ssh')
const ssh = new SshClient();
const challenges = require('./data/challenges.json');
const solutionsController = require('./controllers/solutions.controller');
const app = express();

const PORT = process.env.PORT || 3000;
const REMOTE_HOST = '178.62.51.68';


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

app.post('/remote/:id', (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.redirect('/');
  }

  const challengeId = Number(req.params.id);

  ssh.connect({
    host: REMOTE_HOST,
    username: 'root',
    privateKey: '/Users/harrietryder/.ssh/id_rsa'
  }).then(() => {
    console.log(`Connected to ${REMOTE_HOST}`);
    return ssh.execCommand(`docker run -i test_runner ${challengeId}`, {
      stdin: req.body.code,
    })
  })
  .then(sshRes => {
    console.log('Response received from remote host', {sshRes});

    if (sshRes.code === 0) return res.status(200).send('Pass');
    else return res.status(400).send('Fail');
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({err});
  })
  .then(() => {
    return ssh.dispose();
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
