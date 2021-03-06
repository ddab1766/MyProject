"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _BaseOverlay = _interopRequireDefault(require("./BaseOverlay"));

var _Fade = _interopRequireDefault(require("../Animation/Fade"));

var _refType = _interopRequireDefault(require("../utils/refType"));

var Overlay = function Overlay(_ref) {
  var _ref$animation = _ref.animation,
      animation = _ref$animation === void 0 ? true : _ref$animation,
      children = _ref.children,
      _ref$transition = _ref.transition,
      transition = _ref$transition === void 0 ? _Fade.default : _ref$transition,
      rest = (0, _objectWithoutPropertiesLoose2.default)(_ref, ["animation", "children", "transition"]);
  var child = children;

  if (!animation) {
    transition = undefined;
  }

  if (!transition) {
    child = React.Children.only(child);
    child = React.cloneElement(child, {
      className: (0, _classnames.default)('in', child.props.className)
    });
  }

  return React.createElement(_BaseOverlay.default, (0, _extends2.default)({}, rest, {
    transition: transition
  }), child);
};

Overlay.propTypes = {
  animation: _propTypes.default.bool,
  container: _propTypes.default.any,
  children: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  onRendered: _propTypes.default.func,
  className: _propTypes.default.string,
  containerPadding: _propTypes.default.number,
  placement: _propTypes.default.string,
  shouldUpdatePosition: _propTypes.default.bool,
  preventOverflow: _propTypes.default.bool,
  show: _propTypes.default.bool,
  rootClose: _propTypes.default.bool,
  transition: _propTypes.default.elementType,
  positionRef: _refType.default,
  target: _propTypes.default.func,
  onHide: _propTypes.default.func,
  onEnter: _propTypes.default.func,
  onEntering: _propTypes.default.func,
  onEntered: _propTypes.default.func,
  onExit: _propTypes.default.func,
  onExiting: _propTypes.default.func,
  onExited: _propTypes.default.func
};
var _default = Overlay;
exports.default = _default;
module.exports = exports.default;