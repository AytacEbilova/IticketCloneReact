'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bin = require('../../bin');

var _bin2 = _interopRequireDefault(_bin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var yogaValue = function yogaValue(prop, value) {
  var isAlignType = function isAlignType(prop) {
    return prop === 'alignItems' || prop === 'alignContent' || prop === 'alignSelf';
  };

  switch (value) {
    case 'auto':
      if (prop === 'alignSelf') {
        return _bin2.default.ALIGN_AUTO;
      }
      break;
    case 'flex':
      return _bin2.default.DISPLAY_FLEX;
    case 'none':
      return _bin2.default.DISPLAY_NONE;
    case 'row':
      return _bin2.default.FLEX_DIRECTION_ROW;
    case 'row-reverse':
      return _bin2.default.FLEX_DIRECTION_ROW_REVERSE;
    case 'column':
      return _bin2.default.FLEX_DIRECTION_COLUMN;
    case 'column-reverse':
      return _bin2.default.FLEX_DIRECTION_COLUMN_REVERSE;
    case 'stretch':
      return _bin2.default.ALIGN_STRETCH;
    case 'baseline':
      return _bin2.default.ALIGN_BASELINE;
    case 'space-around':
      if (prop === 'justifyContent') {
        return _bin2.default.JUSTIFY_SPACE_AROUND;
      } else if (isAlignType(prop)) {
        return _bin2.default.ALIGN_SPACE_AROUND;
      }
      break;
    case 'space-between':
      if (prop === 'justifyContent') {
        return _bin2.default.JUSTIFY_SPACE_BETWEEN;
      } else if (isAlignType(prop)) {
        return _bin2.default.ALIGN_SPACE_BETWEEN;
      }
      break;
    case 'around':
      return _bin2.default.JUSTIFY_SPACE_AROUND;
    case 'between':
      return _bin2.default.JUSTIFY_SPACE_BETWEEN;
    case 'wrap':
      return _bin2.default.WRAP_WRAP;
    case 'wrap-reverse':
      return _bin2.default.WRAP_WRAP_REVERSE;
    case 'nowrap':
      return _bin2.default.WRAP_NO_WRAP;
    case 'flex-start':
      if (prop === 'justifyContent') {
        return _bin2.default.JUSTIFY_FLEX_START;
      } else if (isAlignType(prop)) {
        return _bin2.default.ALIGN_FLEX_START;
      }
      break;
    case 'flex-end':
      if (prop === 'justifyContent') {
        return _bin2.default.JUSTIFY_FLEX_END;
      } else if (isAlignType(prop)) {
        return _bin2.default.ALIGN_FLEX_END;
      }
      break;
    case 'center':
      if (prop === 'justifyContent') {
        return _bin2.default.JUSTIFY_CENTER;
      } else if (isAlignType(prop)) {
        return _bin2.default.ALIGN_CENTER;
      }
      break;
    default:
      return value;
  }
};

// These are not supported yet

// ALIGN_AUTO: 0,
// DIMENSION_WIDTH: 0,
// DIMENSION_HEIGHT: 1,
// DIRECTION_INHERIT: 0,
// DIRECTION_LTR: 1,
// DIRECTION_RTL: 2,
// EDGE_LEFT: 0,
// EDGE_TOP: 1,
// EDGE_RIGHT: 2,
// EDGE_BOTTOM: 3,
// EDGE_START: 4,
// EDGE_END: 5,
// EDGE_HORIZONTAL: 6,
// EDGE_VERTICAL: 7,
// EDGE_ALL: 8,
// MEASURE_MODE_UNDEFINED: 0,
// MEASURE_MODE_EXACTLY: 1,
// MEASURE_MODE_AT_MOST: 2,
// NODE_TYPE_DEFAULT: 0,
// NODE_TYPE_TEXT: 1,
// OVERFLOW_VISIBLE: 0,
// OVERFLOW_HIDDEN: 1,
// OVERFLOW_SCROLL: 2,
// POSITION_TYPE_RELATIVE: 0,
// POSITION_TYPE_ABSOLUTE: 1,
// PRINT_OPTIONS_LAYOUT: 1,
// PRINT_OPTIONS_STYLE: 2,
// PRINT_OPTIONS_CHILDREN: 4,
// UNIT_UNDEFINED: 0,
// UNIT_POINT: 1,
// UNIT_PERCENT: 2,
// UNIT_AUTO: 3,

exports.default = yogaValue;