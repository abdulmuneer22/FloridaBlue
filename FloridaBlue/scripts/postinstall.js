#!/usr/local/bin/node
console.tron.log('Executing post install generators')
const exec = require('child_process').exec

// run apisauce-mod generator
exec('yo apisauce-mod --force', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`)
    return
  }
  console.tron.log(`stdout: ${stdout}`)
  console.tron.log(`stderr: ${stderr}`)
})
