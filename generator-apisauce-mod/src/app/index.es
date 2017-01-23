#!/usr/bin/env node
'use strict';

import Generators from 'yeoman-generator'
import colors from 'colors/safe'
import shell from 'shelljs'
import * as fs from 'fs'
import pluralize from 'pluralize'
import strp from 'strp'
import dir from 'node-dir'

export class ApisauceModGenerator extends Generators.Base {
  constructor (args, options) {
    super(args, options)
  }

  initializing () {
    this.log('Welcome to ' + colors.red('generator-apisauce-mod') + ' generator!');

    if (!fs.existsSync('./node_modules/apisauce')) {
      console.log()
      console.log("  ./node_modules/apisauce directory not found")
      console.log()
      shell.exit(-1)
    }
    this.destinationRoot(this.destinationPath('node_modules/apisauce/dist'));
  }

  writing () {
    var _this = this
    dir.files(this.templatePath(), function(err, files) {
      if (err) {
        throw err
      }
      files.forEach(file => {
        file = file.replace(_this.templatePath(), '.')

        console.log(file);

        _this.fs.copyTpl(
          _this.templatePath(file),
          _this.destinationPath(file),
          {}
        )
      })

    });
  }
}

module.exports = ApisauceModGenerator
