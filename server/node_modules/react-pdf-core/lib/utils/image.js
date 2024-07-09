'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchImage = undefined;

var _pngJs = require('png-js');

var _pngJs2 = _interopRequireDefault(_pngJs);

var _jpeg = require('./jpeg');

var _jpeg2 = _interopRequireDefault(_jpeg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = require('request');

var fetchImage = exports.fetchImage = function fetchImage(src) {
  var extension = src.split('.').pop();

  return new Promise(function (resolve, reject) {
    request({
      url: src,
      method: 'GET',
      encoding: null
    }, function (error, response, body) {
      if (error) {
        return reject(error);
      }

      var image = void 0;
      switch (extension.toLowerCase()) {
        case 'jpg':
        case 'jpeg':
          image = new _jpeg2.default(body);
          break;
        case 'png':
          image = new _pngJs2.default(body);
          break;
        default:
          throw new Error('Image type not supported: ' + extension);
      }

      return resolve(image);
    });
  });
};