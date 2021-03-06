"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _pick2 = _interopRequireDefault(require("lodash/pick"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _recompose = require("recompose");

var _elementResizeEvent = _interopRequireWildcard(require("element-resize-event"));

var _BaseModal = _interopRequireDefault(require("./BaseModal"));

var _Bounce = _interopRequireDefault(require("../Animation/Bounce"));

var _domLib = require("dom-lib");

var _utils = require("../utils");

var _ModalDialog = _interopRequireWildcard(require("./ModalDialog"));

var _ModalBody = _interopRequireDefault(require("./ModalBody"));

var _ModalHeader = _interopRequireDefault(require("./ModalHeader"));

var _ModalTitle = _interopRequireDefault(require("./ModalTitle"));

var _ModalFooter = _interopRequireDefault(require("./ModalFooter"));

var _constants = require("../constants");

var _ModalContext = _interopRequireDefault(require("./ModalContext"));

var _mergeRefs = _interopRequireDefault(require("../utils/mergeRefs"));

var BACKDROP_TRANSITION_DURATION = 150;

var Modal =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Modal, _React$Component);

  // for test
  function Modal(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.dialogElement = void 0;
    _this.modalRef = void 0;
    _this.windowResizeListener = null;
    _this.contentElement = null;

    _this.getBodyStyles = function () {
      return _this.state.bodyStyles;
    };

    _this.bindDialogRef = function (ref) {
      _this.dialogElement = ref;
    };

    _this.handleShow = function () {
      var dialogElement = _this.dialogElement;

      _this.updateModalStyles(dialogElement);

      _this.contentElement = dialogElement.querySelector("." + _this.addPrefix('content'));
      _this.windowResizeListener = (0, _domLib.on)(window, 'resize', _this.handleResize);
      (0, _elementResizeEvent.default)(_this.contentElement, _this.handleResize);
    };

    _this.handleShowing = function () {
      _this.updateModalStyles(_this.dialogElement, true);
    };

    _this.handleHide = function () {
      _this.destroyEvent();
    };

    _this.handleDialogClick = function (event) {
      var _this$props, _this$props$onHide;

      if (event.target !== event.currentTarget) {
        return;
      }

      (_this$props = _this.props) === null || _this$props === void 0 ? void 0 : (_this$props$onHide = _this$props.onHide) === null || _this$props$onHide === void 0 ? void 0 : _this$props$onHide.call(_this$props, event);
    };

    _this.handleResize = function () {
      _this.updateModalStyles(_this.dialogElement);
    };

    _this.addPrefix = function (name) {
      return (0, _utils.prefix)(_this.props.classPrefix)(name);
    };

    _this.state = {
      bodyStyles: {}
    };
    _this.modalRef = React.createRef();
    return _this;
  }

  var _proto = Modal.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.destroyEvent();
  };

  _proto.getBodyStylesByDialog = function getBodyStylesByDialog(dialogElement, entering) {
    var _this$props2 = this.props,
        overflow = _this$props2.overflow,
        drawer = _this$props2.drawer;
    var node = dialogElement || this.dialogElement;
    var scrollHeight = node ? node.scrollHeight : 0;

    if (!overflow) {
      return {};
    }

    var bodyStyles = {
      overflow: 'auto'
    };

    if (node) {
      // default margin
      var headerHeight = 46;
      var footerHeight = 46;
      var contentHeight = 30;
      var headerDOM = node.querySelector("." + this.addPrefix('header'));
      var footerDOM = node.querySelector("." + this.addPrefix('footer'));
      var contentDOM = node.querySelector("." + this.addPrefix('content'));
      headerHeight = headerDOM ? (0, _domLib.getHeight)(headerDOM) + headerHeight : headerHeight;
      footerHeight = footerDOM ? (0, _domLib.getHeight)(footerDOM) + headerHeight : headerHeight;
      contentHeight = contentDOM ? (0, _domLib.getHeight)(contentDOM) + contentHeight : contentHeight;

      if (drawer) {
        bodyStyles.height = contentHeight - (headerHeight + footerHeight);
      } else {
        /**
         * Header height + Footer height + Dialog margin
         */
        var excludeHeight = headerHeight + footerHeight + (entering ? 76 : 60);
        var bodyHeight = (0, _domLib.getHeight)(window) - excludeHeight;
        var maxHeight = scrollHeight >= bodyHeight ? bodyHeight : scrollHeight;
        bodyStyles.maxHeight = maxHeight;
      }
    }

    return bodyStyles;
  };

  _proto.destroyEvent = function destroyEvent() {
    var _this$windowResizeLis, _this$windowResizeLis2;

    (_this$windowResizeLis = this.windowResizeListener) === null || _this$windowResizeLis === void 0 ? void 0 : (_this$windowResizeLis2 = _this$windowResizeLis.off) === null || _this$windowResizeLis2 === void 0 ? void 0 : _this$windowResizeLis2.call(_this$windowResizeLis);

    if (this.contentElement) {
      (0, _elementResizeEvent.unbind)(this.contentElement);
    }
  };

  _proto.updateModalStyles = function updateModalStyles(dialogElement, entering) {
    this.setState({
      bodyStyles: this.getBodyStylesByDialog(dialogElement, entering)
    });
  };

  _proto.render = function render() {
    var _classNames,
        _classNames2,
        _this2 = this;

    var _this$props3 = this.props,
        className = _this$props3.className,
        children = _this$props3.children,
        dialogClassName = _this$props3.dialogClassName,
        backdropClassName = _this$props3.backdropClassName,
        dialogStyle = _this$props3.dialogStyle,
        animation = _this$props3.animation,
        classPrefix = _this$props3.classPrefix,
        show = _this$props3.show,
        size = _this$props3.size,
        full = _this$props3.full,
        dialogComponentClass = _this$props3.dialogComponentClass,
        animationProps = _this$props3.animationProps,
        animationTimeout = _this$props3.animationTimeout,
        onHide = _this$props3.onHide,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props3, ["className", "children", "dialogClassName", "backdropClassName", "dialogStyle", "animation", "classPrefix", "show", "size", "full", "dialogComponentClass", "animationProps", "animationTimeout", "onHide"]);
    var inClass = {
      in: show && !animation
    };
    var Dialog = dialogComponentClass;
    var classes = (0, _classnames.default)(this.addPrefix(size), className, (_classNames = {}, _classNames[this.addPrefix('full')] = full, _classNames));
    return React.createElement(_ModalContext.default.Provider, {
      value: {
        onModalHide: onHide,
        getBodyStyles: this.getBodyStyles
      }
    }, React.createElement(_BaseModal.default, (0, _extends2.default)({}, rest, {
      ref: this.modalRef,
      show: show,
      onHide: onHide,
      className: this.addPrefix('wrapper'),
      onEntered: (0, _utils.createChainedFunction)(this.handleShow, this.props.onEntered),
      onEntering: (0, _utils.createChainedFunction)(this.handleShowing, this.props.onEntering),
      onExited: (0, _utils.createChainedFunction)(this.handleHide, this.props.onExited),
      backdropClassName: (0, _classnames.default)(this.addPrefix('backdrop'), backdropClassName, inClass),
      containerClassName: (0, _classnames.default)(this.addPrefix('open'), (_classNames2 = {}, _classNames2[this.addPrefix('has-backdrop')] = rest.backdrop, _classNames2)),
      transition: animation ? animation : undefined,
      animationProps: animationProps,
      dialogTransitionTimeout: animationTimeout,
      backdropTransitionTimeout: BACKDROP_TRANSITION_DURATION
    }), function (transitionProps, ref) {
      var transitionClassName = transitionProps.className,
          transitionRest = (0, _objectWithoutPropertiesLoose2.default)(transitionProps, ["className"]);
      return React.createElement(Dialog, (0, _extends2.default)({}, transitionRest, (0, _pick2.default)(rest, Object.keys(_ModalDialog.modalDialogPropTypes)), {
        classPrefix: classPrefix,
        className: (0, _classnames.default)(classes, transitionClassName),
        dialogClassName: dialogClassName,
        dialogStyle: dialogStyle,
        onClick: rest.backdrop === true ? _this2.handleDialogClick : null,
        dialogRef: (0, _mergeRefs.default)(_this2.bindDialogRef, ref)
      }), children);
    }));
  };

  return Modal;
}(React.Component);

Modal.propTypes = {
  classPrefix: _propTypes.default.string,
  size: _propTypes.default.oneOf(_constants.SIZE),
  container: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  onRendered: _propTypes.default.func,
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  dialogClassName: _propTypes.default.string,
  backdropClassName: _propTypes.default.string,
  style: _propTypes.default.object,
  dialogStyle: _propTypes.default.object,
  backdropStyle: _propTypes.default.object,
  show: _propTypes.default.bool,
  full: _propTypes.default.bool,
  backdrop: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.string]),
  keyboard: _propTypes.default.bool,
  transition: _propTypes.default.elementType,
  dialogTransitionTimeout: _propTypes.default.number,
  backdropTransitionTimeout: _propTypes.default.number,
  autoFocus: _propTypes.default.bool,
  enforceFocus: _propTypes.default.bool,
  overflow: _propTypes.default.bool,
  drawer: _propTypes.default.bool,
  dialogComponentClass: _propTypes.default.elementType,
  animation: _propTypes.default.any,
  animationProps: _propTypes.default.object,
  animationTimeout: _propTypes.default.number,
  onEscapeKeyUp: _propTypes.default.func,
  onBackdropClick: _propTypes.default.func,
  onShow: _propTypes.default.func,
  onHide: _propTypes.default.func,
  onEnter: _propTypes.default.func,
  onEntering: _propTypes.default.func,
  onEntered: _propTypes.default.func,
  onExit: _propTypes.default.func,
  onExiting: _propTypes.default.func,
  onExited: _propTypes.default.func
};
Modal.defaultProps = {
  size: 'sm',
  backdrop: true,
  keyboard: true,
  autoFocus: true,
  enforceFocus: true,
  animation: _Bounce.default,
  animationTimeout: 300,
  dialogComponentClass: _ModalDialog.default,
  overflow: true
};
var EnhancedModal = (0, _utils.defaultProps)({
  classPrefix: 'modal'
})(Modal);
(0, _recompose.setStatic)('Body', _ModalBody.default)(EnhancedModal);
(0, _recompose.setStatic)('Header', _ModalHeader.default)(EnhancedModal);
(0, _recompose.setStatic)('Title', _ModalTitle.default)(EnhancedModal);
(0, _recompose.setStatic)('Footer', _ModalFooter.default)(EnhancedModal);
(0, _recompose.setStatic)('Dialog', _ModalDialog.default)(EnhancedModal);
var _default = EnhancedModal;
exports.default = _default;
module.exports = exports.default;