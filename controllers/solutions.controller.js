const fs = require('fs');
const {spawn} = require('child_process');
const uuidv1 = require('uuid/v1');

function validate (req, res) {
  const solutionId = Number(req.params.id);
  if (isNaN(solutionId)) return res.redirect('/');

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
      });
    });
  } else {
    return res.redirect(`/challenges/${solutionId}`);
  }
}

module.exports = {
  validate,
};
