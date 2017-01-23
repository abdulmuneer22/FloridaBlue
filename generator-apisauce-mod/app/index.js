#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApisauceModGenerator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _yeomanGenerator = require('yeoman-generator');

var _yeomanGenerator2 = _interopRequireDefault(_yeomanGenerator);

var _safe = require('colors/safe');

var _safe2 = _interopRequireDefault(_safe);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _pluralize = require('pluralize');

var _pluralize2 = _interopRequireDefault(_pluralize);

var _strp = require('strp');

var _strp2 = _interopRequireDefault(_strp);

var _nodeDir = require('node-dir');

var _nodeDir2 = _interopRequireDefault(_nodeDir);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ApisauceModGenerator = exports.ApisauceModGenerator = function (_Generators$Base) {
  _inherits(ApisauceModGenerator, _Generators$Base);

  function ApisauceModGenerator(args, options) {
    _classCallCheck(this, ApisauceModGenerator);

    return _possibleConstructorReturn(this, (ApisauceModGenerator.__proto__ || Object.getPrototypeOf(ApisauceModGenerator)).call(this, args, options));
  }

  _createClass(ApisauceModGenerator, [{
    key: 'initializing',
    value: function initializing() {
      this.log('Welcome to ' + _safe2.default.red('generator-apisauce-mod') + ' generator!');

      if (!fs.existsSync('./node_modules/apisauce')) {
        console.log();
        console.log("  ./node_modules/apisauce directory not found");
        console.log();
        _shelljs2.default.exit(-1);
      }
      this.destinationRoot(this.destinationPath('node_modules/apisauce/dist'));
    }
  }, {
    key: 'writing',
    value: function writing() {
      var _this = this;
      _nodeDir2.default.files(this.templatePath(), function (err, files) {
        if (err) {
          throw err;
        }
        files.forEach(function (file) {
          file = file.replace(_this.templatePath(), '.');

          console.log(file);

          _this.fs.copyTpl(_this.templatePath(file), _this.destinationPath(file), {});
        });
      });
    }
  }]);

  return ApisauceModGenerator;
}(_yeomanGenerator2.default.Base);

module.exports = ApisauceModGenerator;