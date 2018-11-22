const fs = require('fs');
const process = require('process');
const {spawn} = require('child_process');
const uuidv1 = require('uuid/v1');

function validate (req, res) {
  const solutionId = Number(req.params.id);
  if (isNaN(solutionId)) return res.redirect('/');

  if (req.body.code) {
    const filename = `${process.cwd()}/tmp/${uuidv1()}.sh`;
    console.log(`Saving temporary file ${filename}`);
    const testFilesDir = `${process.cwd()}/tests/`;

    const data = req.body.code.replace(/\r/g, '');

    fs.writeFile(filename, data, {mode: 0755}, (err) => {
      const runner = spawn(
        'docker', 
        ['run', '--rm', '-v', `${filename}:/code.sh`, '-v', `${testFilesDir}:/tests`, '-w', '/tests', 'test_runner', `./${solutionId}/tests.bats`],
        {detached: true},
      );

      const wait = setTimeout(function () {
        process.kill(-runner.pid);
        console.log(`Deleting temporary file ${filename}`);
        fs.unlink(filename, (err) => {
          console.log('Process timed out');
          return res.status(400).send('Timeout');
        });
      }, 3000);

      runner.on('exit', (code, signal) => {
        clearTimeout(wait);
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
        clearTimeout(wait);
        console.log(`Deleting temporary file ${filename}`);
        fs.unlink(filename, () => {
          console.log('Runner encountered error', {err});
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
