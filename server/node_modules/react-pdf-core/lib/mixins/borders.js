'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Borders = {
  traceBorder: function traceBorder(style, width) {
    switch (style) {
      case 'dashed':
        this.root.dash(width * 2, { space: width * 1.2 }).stroke();
        break;
      case 'dotted':
        this.root.dash(width, { space: width * 1.2 }).stroke();
        break;
      default:
        this.root.stroke();
    }
  },
  drawHorizontalBorder: function drawHorizontalBorder(p1, p2, r1, r2, width, color, style) {
    if (width <= 0) return;

    this.root.lineWidth(width).moveTo(p1[0], p1[1] + r1).quadraticCurveTo(p1[0], p1[1], p1[0] + r1, p1[1]).lineTo(p2[0] - r2, p2[1]).quadraticCurveTo(p2[0], p2[1], p2[0], p2[1] + r2).strokeColor(color);

    this.traceBorder(style, width);
  },
  drawVerticalBorder: function drawVerticalBorder(p1, p2, r1, r2, width, color, style) {
    if (width <= 0) return;

    this.root.lineWidth(width).moveTo(p1[0] + r1, p1[1]).quadraticCurveTo(p1[0], p1[1], p1[0], p1[1] - r1).lineTo(p2[0], p2[1] + r2).quadraticCurveTo(p2[0], p2[1], p2[0] + r2, p2[1]).strokeColor(color);

    this.traceBorder(style, width);
  },
  drawBorders: function drawBorders() {
    var _getAbsoluteLayout = this.getAbsoluteLayout(),
        left = _getAbsoluteLayout.left,
        top = _getAbsoluteLayout.top,
        width = _getAbsoluteLayout.width,
        height = _getAbsoluteLayout.height;

    var _style = this.style,
        _style$borderTopWidth = _style.borderTopWidth,
        borderTopWidth = _style$borderTopWidth === undefined ? 0 : _style$borderTopWidth,
        _style$borderRightWid = _style.borderRightWidth,
        borderRightWidth = _style$borderRightWid === undefined ? 0 : _style$borderRightWid,
        _style$borderBottomWi = _style.borderBottomWidth,
        borderBottomWidth = _style$borderBottomWi === undefined ? 0 : _style$borderBottomWi,
        _style$borderLeftWidt = _style.borderLeftWidth,
        borderLeftWidth = _style$borderLeftWidt === undefined ? 0 : _style$borderLeftWidt,
        _style$borderTopLeftR = _style.borderTopLeftRadius,
        borderTopLeftRadius = _style$borderTopLeftR === undefined ? 0 : _style$borderTopLeftR,
        _style$borderTopRight = _style.borderTopRightRadius,
        borderTopRightRadius = _style$borderTopRight === undefined ? 0 : _style$borderTopRight,
        _style$borderBottomRi = _style.borderBottomRightRadius,
        borderBottomRightRadius = _style$borderBottomRi === undefined ? 0 : _style$borderBottomRi,
        _style$borderBottomLe = _style.borderBottomLeftRadius,
        borderBottomLeftRadius = _style$borderBottomLe === undefined ? 0 : _style$borderBottomLe,
        _style$borderTopColor = _style.borderTopColor,
        borderTopColor = _style$borderTopColor === undefined ? 'black' : _style$borderTopColor,
        _style$borderRightCol = _style.borderRightColor,
        borderRightColor = _style$borderRightCol === undefined ? 'black' : _style$borderRightCol,
        _style$borderBottomCo = _style.borderBottomColor,
        borderBottomColor = _style$borderBottomCo === undefined ? 'black' : _style$borderBottomCo,
        _style$borderLeftColo = _style.borderLeftColor,
        borderLeftColor = _style$borderLeftColo === undefined ? 'black' : _style$borderLeftColo,
        _style$borderTopStyle = _style.borderTopStyle,
        borderTopStyle = _style$borderTopStyle === undefined ? 'solid' : _style$borderTopStyle,
        _style$borderRightSty = _style.borderRightStyle,
        borderRightStyle = _style$borderRightSty === undefined ? 'solid' : _style$borderRightSty,
        _style$borderBottomSt = _style.borderBottomStyle,
        borderBottomStyle = _style$borderBottomSt === undefined ? 'solid' : _style$borderBottomSt,
        _style$borderLeftStyl = _style.borderLeftStyle,
        borderLeftStyle = _style$borderLeftStyl === undefined ? 'solid' : _style$borderLeftStyl;

    // Save current graphics stack

    this.root.save();

    // border top
    this.drawHorizontalBorder([left + borderTopWidth / 2, top + borderTopWidth / 2], [left + width - borderTopWidth / 2, top + borderTopWidth / 2], borderTopLeftRadius, borderTopRightRadius, borderTopWidth, borderTopColor, borderTopStyle);

    // border right
    this.drawVerticalBorder([left + width - borderRightWidth / 2, top + borderRightWidth / 2], [left + width - borderRightWidth / 2, top + height - borderRightWidth / 2], -borderTopRightRadius, -borderBottomRightRadius, borderRightWidth, borderRightColor, borderRightStyle);

    // border bottom
    this.drawHorizontalBorder([left + width - borderBottomWidth / 2, top + height - borderBottomWidth / 2], [left + borderBottomWidth / 2, top + height - borderBottomWidth / 2], -borderBottomRightRadius, -borderBottomLeftRadius, borderBottomWidth, borderBottomColor, borderBottomStyle);

    // border left
    this.drawVerticalBorder([left + borderLeftWidth / 2, top + height - borderLeftWidth / 2], [left + borderLeftWidth / 2, top + borderLeftWidth / 2], borderBottomLeftRadius, borderTopLeftRadius, borderLeftWidth, borderLeftColor, borderLeftStyle);

    // Restore graphics stack to avoid side effects
    this.root.restore();
  }
};

exports.default = Borders;