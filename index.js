const fs = require('fs');
const {spawn} = require('child_process');
const uuidv1 = require('uuid/v1');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/solution', (req, res) => {
  if (req.body.code) {
    const filename = `${__dirname}/tmp/${uuidv1()}.sh`;
    console.log(`Saving temporary file ${filename}`);

    const data = req.body.code.replace(/\r/g, '');

    fs.writeFile(filename, data, {mode: 0755}, (err) => {
      const runner = spawn('docker', ['run', '--rm', '-v', `${filename}:/code.sh`, '-v', `${__dirname}/tests.sh:/tests.sh`, 'test_runner']);

      runner.on('exit', (code, signal) => {
        console.log(`Deleting temporary file ${filename}`);
        fs.unlink(filename, (err) => {
          console.log('Runner exited', {code, signal});
          if (code === 0) return res.status(200).send('Pass');
          else return res.status(400).send('Fail');
        });
      });

      runner.stdout.on('data', function(data) {
        console.log('stdout: ' + data);
      });
      
      runner.stderr.on('data', function(data) {
        console.log('stderr: ' + data);
      });

      runner.on('error', (err) => {
        console.log(`Deleting temporary file ${filename}`);
        fs.unlink(filename, () => {
          console.log('Runner encountered error', {code, signal});
          res.status(500);
        });
      })
    });
  }
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
