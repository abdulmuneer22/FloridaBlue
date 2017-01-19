#!/usr/local/bin/node
console.log("Executing post install generators")
const exec = require('child_process').exec;

// run apisauce-mod generator
exec('yo apisauce-mod --force', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});
