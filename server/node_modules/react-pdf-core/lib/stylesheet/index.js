'use strict';

var _transformStyles = require('./transformStyles');

var _transformStyles2 = _interopRequireDefault(_transformStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = function create(styles) {
  return styles;
};

var flatten = function flatten(input) {
  if (!Array.isArray(input)) {
    input = [input];
  }

  var result = input.reduce(function (acc, style) {
    if (style) {
      Object.keys(style).forEach(function (key) {
        if (style[key]) {
          acc[key] = style[key];
        }
      });
    }

    return acc;
  }, {});

  return result;
};

var resolve = function resolve(styles) {
  if (!styles) {
    return null;
  }

  styles = flatten(styles);

  return (0, _transformStyles2.default)(styles);
};

var absoluteFillObject = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0
};

module.exports = {
  hairlineWidth: 1,
  create: create,
  resolve: resolve,
  flatten: flatten,
  absoluteFillObject: absoluteFillObject
};