const express = require('express');
const fs = require('fs');
var os = require('os');
const path = require('path');
const SshClient = require('node-ssh');
const ssh = new SshClient();
const challenges = require('./data/challenges.json');
const solutionsController = require('./controllers/solutions.controller');
const app = express();

const PORT = process.env.PORT || 3000;
const REMOTE_HOST = '178.62.51.68';
const USERNAME = os.userInfo().username;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/challenges/all', (req, res) => {
  res.render('challenges', {challenges});
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

  const code = req.body.code.replace(/\r/g, '');
  console.log({code});

  const challengeId = Number(req.params.id);

  ssh.connect({
    host: REMOTE_HOST,
    username: 'root',
    privateKey: `/Users/${USERNAME}/.ssh/programmatic_id`
  }).then(() => {
    console.log(`Connected to ${REMOTE_HOST}`);
    // Attempt to pull from DockerHub first so the image is always up to date? or schedule 5 min cron job to pull on the droplet
    // OR create a server endpoint here to use as a webhook endpoint for when docker repo is built, this could perform a pull via SSH on the droplet

    // Instead of a challenge ID, provide an input from current test, and ouput for current test.
    // These would be used in the test, the same test could be used many times, just providing different arguments. e.g.
    // @test "test" {
    //   result="$(${1})"
    //   [ "$result" -eq ${2} ]
    // }
    // Would have to run the execCommand multiple times?
    // How to make it work with the additional files? 

    // Or perhaps the docker container could have node script which collects the test input/output data and accociated files,
    // executes all the tests for a given challenge and logs the output, which becomes stdout, if this were JSON
    // then it could be parsed at this end and displayed by the front end


    // The nodeJS script can go to DB, get all tests and assiated file contents (or filenames?)
    //# From the DB:
    // {expected: 5,
    // file: "s3/foo/1.txt" OR "foo\nbar\ncat",
    // input: ""}
    // and then for each one, provide the user input script as stdin, the expected output and the command to run as params, and any file contents as virtual file descriptors
    // it could also make the files and then cleanup but this shouldn't be necessary
    // From Node, to run a test with stdin user input, test script args, expected output and associated file provided as virtual file descriptor
    // `echo $userscript | test.sh "5 10"  15 <(printf "${filecontents}")`

    return ssh.execCommand(`docker run -i harrietty/remote_runner ${challengeId}`, {
      stdin: code,
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
