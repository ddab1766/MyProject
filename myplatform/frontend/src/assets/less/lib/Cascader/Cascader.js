"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var _omit2 = _interopRequireDefault(require("lodash/omit"));

var _pick2 = _interopRequireDefault(require("lodash/pick"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _shallowEqual = _interopRequireDefault(require("../utils/shallowEqual"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _treeUtils = require("../utils/treeUtils");

var _IntlContext = _interopRequireDefault(require("../IntlProvider/IntlContext"));

var _FormattedMessage = _interopRequireDefault(require("../IntlProvider/FormattedMessage"));

var _DropdownMenu = _interopRequireWildcard(require("./DropdownMenu"));

var _stringToObject2 = _interopRequireDefault(require("../utils/stringToObject"));

var _getSafeRegExpString = _interopRequireDefault(require("../utils/getSafeRegExpString"));

var _utils = require("./utils");

var _utils2 = require("../utils");

var _Picker = require("../Picker");

var _propTypes2 = require("../Picker/propTypes");

var Cascader =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Cascader, _React$Component);

  function Cascader(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.triggerRef = void 0;
    _this.containerRef = void 0;
    _this.positionRef = void 0;
    _this.menuContainerRef = void 0;
    _this.isControlled = void 0;

    _this.handleSelect = function (node, cascadeItems, activePaths, isLeafNode, event) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          onSelect = _this$props.onSelect,
          valueKey = _this$props.valueKey,
          childrenKey = _this$props.childrenKey,
          parentSelectable = _this$props.parentSelectable;

      var prevValue = _this.getValue();

      var value = node[valueKey];
      onSelect === null || onSelect === void 0 ? void 0 : onSelect(node, activePaths, (0, _Picker.createConcatChildrenFunction)(node, value, {
        valueKey: valueKey,
        childrenKey: childrenKey
      }), event);
      /**
       Determines whether the option is a leaf node, and if so, closes the picker.
       */

      if (isLeafNode) {
        _this.handleCloseDropdown();

        var _nextState = {
          selectNode: node
        };

        if (!_this.isControlled) {
          _nextState = (0, _extends3.default)({}, _nextState, {
            value: value
          }, (0, _utils.getDerivedStateForCascade)(_this.props, _this.state, value));
        }

        _this.setState(_nextState);

        if (!(0, _shallowEqual.default)(value, prevValue)) {
          onChange === null || onChange === void 0 ? void 0 : onChange(value, event);
        }

        return;
      }

      var nextState = {
        selectNode: node,
        items: cascadeItems,
        tempActivePaths: activePaths
      };
      /** When the parent is optional, the value and the displayed path are updated. */

      if (parentSelectable) {
        nextState.value = value;
        nextState.activePaths = activePaths;

        if (!(0, _shallowEqual.default)(value, prevValue)) {
          onChange === null || onChange === void 0 ? void 0 : onChange(value, event);
        }
      }

      _this.setState(nextState, function () {
        var _this$positionRef$cur, _this$positionRef$cur2;

        // Update menu position
        (_this$positionRef$cur = _this.positionRef.current) === null || _this$positionRef$cur === void 0 ? void 0 : (_this$positionRef$cur2 = _this$positionRef$cur.updatePosition) === null || _this$positionRef$cur2 === void 0 ? void 0 : _this$positionRef$cur2.call(_this$positionRef$cur);
      });
    };

    _this.handleSearchRowSelect = function (item, event) {
      var _this$props2 = _this.props,
          valueKey = _this$props2.valueKey,
          onChange = _this$props2.onChange,
          onSelect = _this$props2.onSelect;
      var value = item[valueKey];

      _this.handleCloseDropdown();

      var nextState = {
        selectNode: item,
        searchKeyword: ''
      };

      if (!_this.isControlled) {
        nextState = (0, _extends3.default)({}, nextState, {}, (0, _utils.getDerivedStateForCascade)(_this.props, _this.state, value), {
          value: value
        });
      }

      _this.setState(nextState);

      onSelect === null || onSelect === void 0 ? void 0 : onSelect(item, null, null, event);
      onChange === null || onChange === void 0 ? void 0 : onChange(value, event);
    };

    _this.handleCloseDropdown = function () {
      var _this$triggerRef$curr, _this$triggerRef$curr2;

      (_this$triggerRef$curr = _this.triggerRef.current) === null || _this$triggerRef$curr === void 0 ? void 0 : (_this$triggerRef$curr2 = _this$triggerRef$curr.hide) === null || _this$triggerRef$curr2 === void 0 ? void 0 : _this$triggerRef$curr2.call(_this$triggerRef$curr);
    };

    _this.handleOpenDropdown = function () {
      var _this$triggerRef$curr3, _this$triggerRef$curr4;

      (_this$triggerRef$curr3 = _this.triggerRef.current) === null || _this$triggerRef$curr3 === void 0 ? void 0 : (_this$triggerRef$curr4 = _this$triggerRef$curr3.show) === null || _this$triggerRef$curr4 === void 0 ? void 0 : _this$triggerRef$curr4.call(_this$triggerRef$curr3);
    };

    _this.open = function () {
      var _this$handleOpenDropd, _this2;

      (_this$handleOpenDropd = (_this2 = _this).handleOpenDropdown) === null || _this$handleOpenDropd === void 0 ? void 0 : _this$handleOpenDropd.call(_this2);
    };

    _this.close = function () {
      var _this$handleCloseDrop, _this3;

      (_this$handleCloseDrop = (_this3 = _this).handleCloseDropdown) === null || _this$handleCloseDrop === void 0 ? void 0 : _this$handleCloseDrop.call(_this3);
    };

    _this.handleClean = function (event) {
      var _this$props3 = _this.props,
          disabled = _this$props3.disabled,
          onChange = _this$props3.onChange,
          data = _this$props3.data;

      if (disabled) {
        return;
      }

      var nextState = {
        items: [data],
        value: null,
        selectNode: null,
        activePaths: [],
        tempActivePaths: []
      };

      _this.setState(nextState, function () {
        onChange === null || onChange === void 0 ? void 0 : onChange(null, event);
      });
    };

    _this.handleSearch = function (searchKeyword, event) {
      var _this$props$onSearch, _this$props4;

      _this.setState({
        searchKeyword: searchKeyword
      });

      (_this$props$onSearch = (_this$props4 = _this.props).onSearch) === null || _this$props$onSearch === void 0 ? void 0 : _this$props$onSearch.call(_this$props4, searchKeyword, event);
    };

    _this.handleEntered = function () {
      var _this$props$onOpen, _this$props5;

      (_this$props$onOpen = (_this$props5 = _this.props).onOpen) === null || _this$props$onOpen === void 0 ? void 0 : _this$props$onOpen.call(_this$props5);

      _this.setState({
        active: true
      });
    };

    _this.handleExit = function () {
      var _this$props$onClose, _this$props6;

      (_this$props$onClose = (_this$props6 = _this.props).onClose) === null || _this$props$onClose === void 0 ? void 0 : _this$props$onClose.call(_this$props6);

      _this.setState({
        searchKeyword: '',
        active: false
      });
    };

    _this.addPrefix = function (name) {
      return (0, _utils2.prefix)(_this.props.classPrefix)(name);
    };

    _this.renderSearchRow = function (item, key) {
      var _classNames;

      var _this$props7 = _this.props,
          labelKey = _this$props7.labelKey,
          valueKey = _this$props7.valueKey,
          _this$props7$disabled = _this$props7.disabledItemValues,
          disabledItemValues = _this$props7$disabled === void 0 ? [] : _this$props7$disabled;
      var searchKeyword = _this.state.searchKeyword;
      var regx = new RegExp((0, _getSafeRegExpString.default)(searchKeyword), 'ig');
      var nodes = (0, _treeUtils.getNodeParents)(item);
      nodes.push(item);
      nodes = nodes.map(function (node) {
        var _extends2;

        var labelElements = [];
        var a = node[labelKey].split(regx);
        var b = node[labelKey].match(regx);

        for (var i = 0; i < a.length; i++) {
          labelElements.push(a[i]);

          if (b && b[i]) {
            labelElements.push(React.createElement("strong", {
              key: i
            }, b[i]));
          }
        }

        return (0, _extends3.default)({}, node, (_extends2 = {}, _extends2[labelKey] = labelElements, _extends2));
      });
      var disabled = disabledItemValues.some(function (value) {
        return nodes.some(function (node) {
          return node[valueKey] === value;
        });
      });
      var itemClasses = (0, _classnames.default)(_this.addPrefix('cascader-row'), (_classNames = {}, _classNames[_this.addPrefix('cascader-row-disabled')] = disabled, _classNames));
      return React.createElement("div", {
        key: key,
        className: itemClasses,
        onClick: function onClick(event) {
          if (!disabled) {
            _this.handleSearchRowSelect(item, event);
          }
        }
      }, nodes.map(function (node, index) {
        return React.createElement("span", {
          key: "col-" + index,
          className: _this.addPrefix('cascader-col')
        }, node[labelKey]);
      }));
    };

    var initState = {
      searchKeyword: '',
      selectNode: null,
      data: props.data,
      value: props.defaultValue,

      /**
       * ??????????????????
       */
      activePaths: [],

      /**
       * ????????????????????????????????????????????????????????????
       * ????????? data ??????????????????????????????????????????????????????????????????????????????
       */
      items: []
    };
    _this.state = (0, _extends3.default)({}, initState, {}, (0, _utils.getDerivedStateForCascade)(props, initState), {
      flattenData: (0, _treeUtils.flattenTree)(props.data)
    });
    _this.isControlled = !(0, _isUndefined2.default)(props.value);
    _this.triggerRef = React.createRef();
    _this.containerRef = React.createRef();
    _this.positionRef = React.createRef(); // for test

    _this.menuContainerRef = React.createRef();
    return _this;
  }

  Cascader.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var value = nextProps.value,
        data = nextProps.data,
        labelKey = nextProps.labelKey,
        valueKey = nextProps.valueKey;

    if (data !== prevState.data) {
      var _prevState$selectNode;

      // First get the value of the clicked node `selectNodeValue`, and then get the new `newChildren`.
      var selectNodeValue = prevState === null || prevState === void 0 ? void 0 : (_prevState$selectNode = prevState.selectNode) === null || _prevState$selectNode === void 0 ? void 0 : _prevState$selectNode[valueKey];

      if (selectNodeValue) {
        var _findNodeOfTree;

        var newChildren = ((_findNodeOfTree = (0, _treeUtils.findNodeOfTree)(data, function (item) {
          return (0, _shallowEqual.default)(item[valueKey], selectNodeValue);
        })) === null || _findNodeOfTree === void 0 ? void 0 : _findNodeOfTree.children) || [];
        return (0, _extends3.default)({}, (0, _utils.getDerivedStateForCascade)(nextProps, prevState, selectNodeValue, newChildren.map(function (item) {
          return (0, _stringToObject2.default)(item, labelKey, valueKey);
        })), {
          data: data,
          flattenData: (0, _treeUtils.flattenTree)(data)
        });
      }

      return (0, _extends3.default)({}, (0, _utils.getDerivedStateForCascade)(nextProps, prevState), {
        flattenData: (0, _treeUtils.flattenTree)(data),
        data: data
      });
    }

    if (typeof value !== 'undefined' && !(0, _shallowEqual.default)(value, prevState.value)) {
      return (0, _extends3.default)({}, (0, _utils.getDerivedStateForCascade)(nextProps, prevState), {
        value: value
      });
    }

    return null;
  };

  var _proto = Cascader.prototype;

  _proto.getValue = function getValue(nextProps) {
    var _ref = nextProps || this.props,
        value = _ref.value;

    return (0, _isUndefined2.default)(value) ? this.state.value : value;
  };

  /**
   * ??? data ??????????????????????????????????????????: ['foo']
   * ??????????????????????????????????????? [{name:'foo':value:'foo'}]
   */
  _proto.stringToObject = function stringToObject(value) {
    var _this$props8 = this.props,
        labelKey = _this$props8.labelKey,
        valueKey = _this$props8.valueKey;
    return (0, _stringToObject2.default)(value, labelKey, valueKey);
  };

  _proto.someKeyword = function someKeyword(item) {
    var labelKey = this.props.labelKey;
    var searchKeyword = this.state.searchKeyword;

    if (item[labelKey].match(new RegExp((0, _getSafeRegExpString.default)(searchKeyword), 'i'))) {
      return true;
    }

    if (item.parent && this.someKeyword(item.parent)) {
      return true;
    }

    return false;
  };

  _proto.getSearchResult = function getSearchResult() {
    var _this4 = this;

    var childrenKey = this.props.childrenKey;
    var flattenData = this.state.flattenData;
    var items = [];
    var result = flattenData.filter(function (item) {
      if (item[childrenKey]) {
        return false;
      }

      return _this4.someKeyword(item);
    });

    for (var i = 0; i < result.length; i++) {
      items.push(result[i]);

      if (i === 99) {
        return items;
      }
    }

    return items;
  };

  _proto.renderSearchResultPanel = function renderSearchResultPanel() {
    var locale = this.props.locale;
    var searchKeyword = this.state.searchKeyword;

    if (searchKeyword === '') {
      return null;
    }

    var items = this.getSearchResult();
    return React.createElement("div", {
      className: this.addPrefix('cascader-search-panel')
    }, items.length ? items.map(this.renderSearchRow) : React.createElement("div", {
      className: this.addPrefix('none')
    }, locale.noResultsText));
  };

  _proto.renderDropdownMenu = function renderDropdownMenu() {
    var _classNames2;

    var _this$state = this.state,
        items = _this$state.items,
        tempActivePaths = _this$state.tempActivePaths,
        activePaths = _this$state.activePaths,
        searchKeyword = _this$state.searchKeyword;
    var _this$props9 = this.props,
        renderMenu = _this$props9.renderMenu,
        renderExtraFooter = _this$props9.renderExtraFooter,
        menuClassName = _this$props9.menuClassName,
        menuStyle = _this$props9.menuStyle,
        searchable = _this$props9.searchable,
        locale = _this$props9.locale,
        inline = _this$props9.inline;
    var classes = (0, _classnames.default)(this.addPrefix('cascader-menu'), menuClassName, (_classNames2 = {}, _classNames2[this.addPrefix('inline')] = inline, _classNames2));
    var menuProps = (0, _pick2.default)(this.props, Object.keys((0, _omit2.default)(_DropdownMenu.dropdownMenuPropTypes, ['classPrefix'])));
    return React.createElement(_Picker.MenuWrapper, {
      className: classes,
      style: menuStyle
    }, searchable && React.createElement(_Picker.SearchBar, {
      placeholder: locale.searchPlaceholder,
      onChange: this.handleSearch,
      value: searchKeyword
    }), this.renderSearchResultPanel(), searchKeyword === '' && React.createElement(_DropdownMenu.default, (0, _extends3.default)({}, menuProps, {
      classPrefix: this.addPrefix('cascader-menu'),
      ref: this.menuContainerRef,
      cascadeItems: items,
      cascadePathItems: tempActivePaths || activePaths,
      activeItemValue: this.getValue(),
      onSelect: this.handleSelect,
      renderMenu: renderMenu
    })), renderExtraFooter === null || renderExtraFooter === void 0 ? void 0 : renderExtraFooter());
  };

  _proto.render = function render() {
    var _this$props10 = this.props,
        valueKey = _this$props10.valueKey,
        labelKey = _this$props10.labelKey,
        placeholder = _this$props10.placeholder,
        renderValue = _this$props10.renderValue,
        disabled = _this$props10.disabled,
        cleanable = _this$props10.cleanable,
        locale = _this$props10.locale,
        toggleComponentClass = _this$props10.toggleComponentClass,
        style = _this$props10.style,
        onEnter = _this$props10.onEnter,
        onExited = _this$props10.onExited,
        onClean = _this$props10.onClean,
        inline = _this$props10.inline,
        positionRef = _this$props10.positionRef,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props10, ["valueKey", "labelKey", "placeholder", "renderValue", "disabled", "cleanable", "locale", "toggleComponentClass", "style", "onEnter", "onExited", "onClean", "inline", "positionRef"]);

    if (inline) {
      return this.renderDropdownMenu();
    }

    var _this$state2 = this.state,
        activePaths = _this$state2.activePaths,
        active = _this$state2.active;
    var unhandled = (0, _utils2.getUnhandledProps)(Cascader, rest);
    var value = this.getValue();
    /**
     * 1.Have a value and the value is valid.
     * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
     */

    var hasValue = activePaths.length > 0 || !(0, _isNil2.default)(value) && (0, _isFunction2.default)(renderValue);
    var activeItemLabel = placeholder;

    if (activePaths.length > 0) {
      activeItemLabel = [];
      activePaths.forEach(function (item, index) {
        var key = item[valueKey] || item[labelKey];
        activeItemLabel.push(React.createElement("span", {
          key: key
        }, item[labelKey]));

        if (index < activePaths.length - 1) {
          activeItemLabel.push(React.createElement("span", {
            className: "separator",
            key: key + "-separator"
          }, ' / '));
        }
      });
    }

    if (!(0, _isNil2.default)(value) && (0, _isFunction2.default)(renderValue)) {
      activeItemLabel = renderValue(value, activePaths, activeItemLabel);

      if ((0, _isNil2.default)(activeItemLabel)) {
        hasValue = false;
      }
    }

    var classes = (0, _Picker.getToggleWrapperClassName)('cascader', this.addPrefix, this.props, hasValue);
    return React.createElement(_IntlContext.default.Provider, {
      value: locale
    }, React.createElement("div", {
      className: classes,
      style: style,
      tabIndex: -1,
      role: "menu",
      ref: this.containerRef
    }, React.createElement(_Picker.PickerToggleTrigger, {
      pickerProps: this.props,
      ref: this.triggerRef,
      positionRef: (0, _utils2.mergeRefs)(this.positionRef, positionRef),
      onEnter: (0, _utils2.createChainedFunction)(this.handleEntered, onEnter),
      onExited: (0, _utils2.createChainedFunction)(this.handleExit, onExited),
      speaker: this.renderDropdownMenu()
    }, React.createElement(_Picker.PickerToggle, (0, _extends3.default)({}, unhandled, {
      componentClass: toggleComponentClass,
      onClean: (0, _utils2.createChainedFunction)(this.handleClean, onClean),
      cleanable: cleanable && !disabled,
      hasValue: hasValue,
      active: active,
      "aria-disabled": disabled
    }), activeItemLabel || React.createElement(_FormattedMessage.default, {
      id: "placeholder"
    })))));
  };

  return Cascader;
}(React.Component);

Cascader.propTypes = (0, _extends3.default)({}, _propTypes2.listPickerPropTypes, {
  renderMenu: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onSearch: _propTypes.default.func,
  cleanable: _propTypes.default.bool,
  renderMenuItem: _propTypes.default.func,
  menuWidth: _propTypes.default.number,
  menuHeight: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  searchable: _propTypes.default.bool,
  inline: _propTypes.default.bool,
  parentSelectable: _propTypes.default.bool
});
Cascader.defaultProps = (0, _extends3.default)({}, _propTypes2.listPickerDefaultProps, {
  searchable: true,
  locale: {
    placeholder: 'Select',
    searchPlaceholder: 'Search',
    noResultsText: 'No results found'
  }
});
(0, _reactLifecyclesCompat.polyfill)(Cascader);

var _default = (0, _utils2.defaultProps)({
  classPrefix: 'picker'
})(Cascader);

exports.default = _default;
module.exports = exports.default;