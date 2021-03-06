"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _omit2 = _interopRequireDefault(require("lodash/omit"));

var _pick2 = _interopRequireDefault(require("lodash/pick"));

var _remove2 = _interopRequireDefault(require("lodash/remove"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _clone2 = _interopRequireDefault(require("lodash/clone"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _shallowEqual = _interopRequireDefault(require("../utils/shallowEqual"));

var _treeUtils = require("../utils/treeUtils");

var _utils = require("../utils");

var _IntlContext = _interopRequireDefault(require("../IntlProvider/IntlContext"));

var _FormattedMessage = _interopRequireDefault(require("../IntlProvider/FormattedMessage"));

var _Picker = require("../Picker");

var _DropdownMenu = _interopRequireWildcard(require("../Picker/DropdownMenu"));

var _propTypes2 = require("../Picker/propTypes");

var CheckPicker =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(CheckPicker, _React$Component);

  function CheckPicker(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.positionRef = void 0;
    _this.menuContainerRef = void 0;
    _this.toggleRef = void 0;
    _this.triggerRef = void 0;

    _this.getFocusableMenuItems = function () {
      var menuItems = _this.menuContainerRef.current.menuItems;

      if (!menuItems) {
        return [];
      }

      var items = Object.values(menuItems).map(function (item) {
        return item.props.getItemData();
      });
      return (0, _treeUtils.filterNodesOfTree)(items, function (item) {
        return _this.shouldDisplay(item);
      });
    };

    _this.setStickyItems = function () {
      var _this$props = _this.props,
          sticky = _this$props.sticky,
          data = _this$props.data,
          valueKey = _this$props.valueKey;

      var value = _this.getValue();

      if (!sticky) {
        return;
      }

      var stickyItems = [];

      if (data && value.length) {
        stickyItems = data.filter(function (item) {
          return value.some(function (v) {
            return v === item[valueKey];
          });
        });
      }

      _this.setState({
        stickyItems: stickyItems
      });
    };

    _this.focusNextMenuItem = function () {
      var valueKey = _this.props.valueKey;

      _this.findNode(function (items, index) {
        var focusItem = items[index + 1];

        if (!(0, _isUndefined2.default)(focusItem)) {
          _this.setState({
            focusItemValue: focusItem[valueKey]
          });
        }
      });
    };

    _this.focusPrevMenuItem = function () {
      var valueKey = _this.props.valueKey;

      _this.findNode(function (items, index) {
        var focusItem = items[index - 1];

        if (!(0, _isUndefined2.default)(focusItem)) {
          _this.setState({
            focusItemValue: focusItem[valueKey]
          });
        }
      });
    };

    _this.selectFocusMenuItem = function (event) {
      var value = _this.getValue();

      var _this$props2 = _this.props,
          data = _this$props2.data,
          valueKey = _this$props2.valueKey;
      var focusItemValue = _this.state.focusItemValue;

      if (!focusItemValue) {
        return;
      }

      if (!value.some(function (v) {
        return (0, _shallowEqual.default)(v, focusItemValue);
      })) {
        value.push(focusItemValue);
      } else {
        (0, _remove2.default)(value, function (itemVal) {
          return (0, _shallowEqual.default)(itemVal, focusItemValue);
        });
      }

      var focusItem = data.find(function (item) {
        return (0, _shallowEqual.default)(item === null || item === void 0 ? void 0 : item[valueKey], focusItemValue);
      });

      _this.setState({
        value: value
      });

      _this.handleSelect(value, focusItem, event);

      _this.handleChangeValue(value, event);
    };

    _this.handleKeyDown = function (event) {
      var _this$toggleRef, _this$toggleRef$curre, _this$toggleRef$curre2;

      var _this$state = _this.state,
          focusItemValue = _this$state.focusItemValue,
          active = _this$state.active; // enter

      if ((!focusItemValue || !active) && event.keyCode === 13) {
        _this.handleToggleDropdown();
      } // delete


      if (event.keyCode === 8 && event.target === ((_this$toggleRef = _this.toggleRef) === null || _this$toggleRef === void 0 ? void 0 : (_this$toggleRef$curre = _this$toggleRef.current) === null || _this$toggleRef$curre === void 0 ? void 0 : (_this$toggleRef$curre2 = _this$toggleRef$curre.getToggleNode) === null || _this$toggleRef$curre2 === void 0 ? void 0 : _this$toggleRef$curre2.call(_this$toggleRef$curre))) {
        _this.handleClean(event);
      }

      if (!_this.menuContainerRef.current) {
        return;
      }

      (0, _Picker.onMenuKeyDown)(event, {
        down: _this.focusNextMenuItem,
        up: _this.focusPrevMenuItem,
        enter: _this.selectFocusMenuItem,
        esc: _this.handleCloseDropdown
      });
    };

    _this.handleItemSelect = function (nextItemValue, item, event, checked) {
      var value = _this.getValue();

      if (checked) {
        value.push(nextItemValue);
      } else {
        (0, _remove2.default)(value, function (itemVal) {
          return (0, _shallowEqual.default)(itemVal, nextItemValue);
        });
      }

      var nextState = {
        value: value,
        focusItemValue: nextItemValue
      };

      _this.setState(nextState);

      _this.handleSelect(value, item, event);

      _this.handleChangeValue(value, event);
    };

    _this.handleSelect = function (nextItemValue, item, event) {
      var _this$props$onSelect, _this$props3;

      (_this$props$onSelect = (_this$props3 = _this.props).onSelect) === null || _this$props$onSelect === void 0 ? void 0 : _this$props$onSelect.call(_this$props3, nextItemValue, item, event);
    };

    _this.handleChangeValue = function (value, event) {
      var _this$props$onChange, _this$props4;

      (_this$props$onChange = (_this$props4 = _this.props).onChange) === null || _this$props$onChange === void 0 ? void 0 : _this$props$onChange.call(_this$props4, value, event);
    };

    _this.handleSearch = function (searchKeyword, event) {
      var _filteredData$;

      var _this$props5 = _this.props,
          onSearch = _this$props5.onSearch,
          valueKey = _this$props5.valueKey,
          data = _this$props5.data;
      var filteredData = (0, _treeUtils.filterNodesOfTree)(data, function (item) {
        return _this.shouldDisplay(item, searchKeyword);
      });

      _this.setState({
        searchKeyword: searchKeyword,
        focusItemValue: filteredData === null || filteredData === void 0 ? void 0 : (_filteredData$ = filteredData[0]) === null || _filteredData$ === void 0 ? void 0 : _filteredData$[valueKey]
      });

      onSearch === null || onSearch === void 0 ? void 0 : onSearch(searchKeyword, event);
    };

    _this.handleCloseDropdown = function () {
      var _this$triggerRef$curr, _this$triggerRef$curr2;

      var value = _this.getValue();

      (_this$triggerRef$curr = _this.triggerRef.current) === null || _this$triggerRef$curr === void 0 ? void 0 : (_this$triggerRef$curr2 = _this$triggerRef$curr.hide) === null || _this$triggerRef$curr2 === void 0 ? void 0 : _this$triggerRef$curr2.call(_this$triggerRef$curr);

      _this.setState({
        focusItemValue: value ? value[0] : undefined
      });
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

    _this.handleToggleDropdown = function () {
      var active = _this.state.active;

      if (active) {
        _this.handleCloseDropdown();

        return;
      }

      _this.handleOpenDropdown();
    };

    _this.handleClean = function (event) {
      var _this$props6 = _this.props,
          disabled = _this$props6.disabled,
          cleanable = _this$props6.cleanable;

      if (disabled || !cleanable) {
        return;
      }

      _this.setState({
        value: []
      });

      _this.handleChangeValue([], event);
    };

    _this.handleExit = function () {
      var _this$props$onClose, _this$props7;

      (_this$props$onClose = (_this$props7 = _this.props).onClose) === null || _this$props$onClose === void 0 ? void 0 : _this$props$onClose.call(_this$props7);

      _this.setState({
        searchKeyword: '',
        focusItemValue: null,
        active: false
      });
    };

    _this.handleOpen = function () {
      var _this$props$onOpen, _this$props8;

      (_this$props$onOpen = (_this$props8 = _this.props).onOpen) === null || _this$props$onOpen === void 0 ? void 0 : _this$props$onOpen.call(_this$props8);

      _this.setState({
        active: true
      });
    };

    _this.addPrefix = function (name) {
      return (0, _utils.prefix)(_this.props.classPrefix)(name);
    };

    _this.menuContainer = {
      menuItems: null
    };

    _this.getPositionInstance = function () {
      return _this.positionRef.current;
    };

    _this.getToggleInstance = function () {
      return _this.toggleRef.current;
    };

    var _value = props.value,
        defaultValue = props.defaultValue,
        groupBy = props.groupBy,
        _valueKey = props.valueKey,
        labelKey = props.labelKey;
    var nextValue = (0, _clone2.default)(_value || defaultValue) || [];
    _this.state = {
      value: nextValue,
      // Used to hover the active item  when trigger `onKeydown`
      focusItemValue: nextValue ? nextValue[0] : undefined,
      searchKeyword: ''
    };
    _this.positionRef = React.createRef();
    _this.menuContainerRef = React.createRef();
    _this.toggleRef = React.createRef();
    _this.triggerRef = React.createRef();

    if (groupBy === _valueKey || groupBy === labelKey) {
      throw Error('`groupBy` can not be equal to `valueKey` and `labelKey`');
    }

    return _this;
  }

  var _proto = CheckPicker.prototype;

  _proto.getValue = function getValue() {
    var value = this.props.value;
    var nextValue = (0, _isUndefined2.default)(value) ? this.state.value : value;
    return (0, _clone2.default)(nextValue) || [];
  };

  /**
   * Index of keyword  in `label`
   * @param {node} label
   */
  _proto.shouldDisplay = function shouldDisplay(item, word) {
    var _this$props9 = this.props,
        labelKey = _this$props9.labelKey,
        searchBy = _this$props9.searchBy;
    var label = item === null || item === void 0 ? void 0 : item[labelKey];
    var searchKeyword = typeof word === 'undefined' ? this.state.searchKeyword : word;

    if (typeof searchBy === 'function') {
      return searchBy(searchKeyword, label, item);
    }

    return (0, _Picker.shouldDisplay)(label, searchKeyword);
  };

  _proto.findNode = function findNode(focus) {
    var items = this.getFocusableMenuItems();
    var valueKey = this.props.valueKey;
    var focusItemValue = this.state.focusItemValue;

    for (var i = 0; i < items.length; i += 1) {
      if ((0, _shallowEqual.default)(focusItemValue, items[i][valueKey])) {
        focus(items, i);
        return;
      }
    }

    focus(items, -1);
  };

  _proto.renderDropdownMenu = function renderDropdownMenu() {
    var _this4 = this;

    var _this$props10 = this.props,
        data = _this$props10.data,
        valueKey = _this$props10.valueKey,
        groupBy = _this$props10.groupBy,
        searchable = _this$props10.searchable,
        renderExtraFooter = _this$props10.renderExtraFooter,
        locale = _this$props10.locale,
        renderMenu = _this$props10.renderMenu,
        menuClassName = _this$props10.menuClassName,
        menuStyle = _this$props10.menuStyle,
        menuAutoWidth = _this$props10.menuAutoWidth,
        sort = _this$props10.sort,
        virtualized = _this$props10.virtualized;
    var _this$state2 = this.state,
        focusItemValue = _this$state2.focusItemValue,
        stickyItems = _this$state2.stickyItems;
    var classes = (0, _classnames.default)(this.addPrefix('check-menu'), menuClassName);
    var filteredData = [];
    var filteredStickyItems = [];

    if (stickyItems) {
      filteredStickyItems = (0, _treeUtils.filterNodesOfTree)(stickyItems, function (item) {
        return _this4.shouldDisplay(item);
      });
      filteredData = (0, _treeUtils.filterNodesOfTree)(data, function (item) {
        return _this4.shouldDisplay(item) && !stickyItems.some(function (v) {
          return v[valueKey] === item[valueKey];
        });
      });
    } else {
      filteredData = (0, _treeUtils.filterNodesOfTree)(data, function (item) {
        return _this4.shouldDisplay(item);
      });
    } // Create a tree structure data when set `groupBy`


    if (groupBy) {
      filteredData = (0, _utils.getDataGroupBy)(filteredData, groupBy, sort);
    } else if (typeof sort === 'function') {
      filteredData = filteredData.sort(sort(false));
    }

    var menuProps = (0, _pick2.default)(this.props, Object.keys((0, _omit2.default)(_DropdownMenu.dropdownMenuPropTypes, ['className', 'style', 'classPrefix'])));
    var menu = filteredData.length || filteredStickyItems.length ? React.createElement(_DropdownMenu.default, (0, _extends2.default)({}, menuProps, {
      classPrefix: this.addPrefix('check-menu'),
      dropdownMenuItemComponentClass: _Picker.DropdownMenuCheckItem,
      ref: this.menuContainerRef,
      activeItemValues: this.getValue(),
      focusItemValue: focusItemValue,
      data: [].concat(filteredStickyItems, filteredData),
      group: !(0, _isUndefined2.default)(groupBy),
      onSelect: this.handleItemSelect,
      virtualized: virtualized
    })) : React.createElement("div", {
      className: this.addPrefix('none')
    }, locale.noResultsText);
    return React.createElement(_Picker.MenuWrapper, {
      autoWidth: menuAutoWidth,
      className: classes,
      style: menuStyle,
      onKeyDown: this.handleKeyDown,
      getToggleInstance: this.getToggleInstance,
      getPositionInstance: this.getPositionInstance
    }, searchable && React.createElement(_Picker.SearchBar, {
      placeholder: locale.searchPlaceholder,
      onChange: this.handleSearch,
      value: this.state.searchKeyword
    }), renderMenu ? renderMenu(menu) : menu, renderExtraFooter === null || renderExtraFooter === void 0 ? void 0 : renderExtraFooter());
  };

  _proto.render = function render() {
    var _this$props11 = this.props,
        data = _this$props11.data,
        valueKey = _this$props11.valueKey,
        labelKey = _this$props11.labelKey,
        placeholder = _this$props11.placeholder,
        renderValue = _this$props11.renderValue,
        disabled = _this$props11.disabled,
        cleanable = _this$props11.cleanable,
        locale = _this$props11.locale,
        toggleComponentClass = _this$props11.toggleComponentClass,
        style = _this$props11.style,
        onEnter = _this$props11.onEnter,
        onEntered = _this$props11.onEntered,
        onExited = _this$props11.onExited,
        onClean = _this$props11.onClean,
        countable = _this$props11.countable,
        positionRef = _this$props11.positionRef,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props11, ["data", "valueKey", "labelKey", "placeholder", "renderValue", "disabled", "cleanable", "locale", "toggleComponentClass", "style", "onEnter", "onEntered", "onExited", "onClean", "countable", "positionRef"]);
    var unhandled = (0, _utils.getUnhandledProps)(CheckPicker, rest);
    var value = this.getValue();
    var selectedItems = data.filter(function (item) {
      return value.some(function (val) {
        return (0, _shallowEqual.default)(item[valueKey], val);
      });
    }) || [];
    /**
     * 1.Have a value and the value is valid.
     * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
     */

    var hasValue = selectedItems.length > 0 || (value === null || value === void 0 ? void 0 : value.length) > 0 && (0, _isFunction2.default)(renderValue);
    var selectedElement = placeholder;

    if (selectedItems.length > 0) {
      selectedElement = React.createElement(_Picker.SelectedElement, {
        selectedItems: selectedItems,
        countable: countable,
        valueKey: valueKey,
        labelKey: labelKey,
        prefix: this.addPrefix
      });
    }

    if ((value === null || value === void 0 ? void 0 : value.length) > 0 && (0, _isFunction2.default)(renderValue)) {
      selectedElement = renderValue(value, selectedItems, selectedElement);

      if ((0, _isNil2.default)(selectedElement)) {
        hasValue = false;
      }
    }

    var classes = (0, _Picker.getToggleWrapperClassName)('check', this.addPrefix, this.props, hasValue);
    return React.createElement(_IntlContext.default.Provider, {
      value: locale
    }, React.createElement(_Picker.PickerToggleTrigger, {
      pickerProps: this.props,
      ref: this.triggerRef,
      positionRef: (0, _utils.mergeRefs)(this.positionRef, positionRef),
      onEnter: (0, _utils.createChainedFunction)(this.setStickyItems, onEnter),
      onEntered: (0, _utils.createChainedFunction)(this.handleOpen, onEntered),
      onExited: (0, _utils.createChainedFunction)(this.handleExit, onExited),
      speaker: this.renderDropdownMenu()
    }, React.createElement("div", {
      className: classes,
      style: style
    }, React.createElement(_Picker.PickerToggle, (0, _extends2.default)({}, unhandled, {
      ref: this.toggleRef,
      onClean: (0, _utils.createChainedFunction)(this.handleClean, onClean),
      onKeyDown: this.handleKeyDown,
      componentClass: toggleComponentClass,
      cleanable: cleanable && !disabled,
      hasValue: hasValue,
      active: this.state.active,
      "aria-disabled": disabled
    }), selectedElement || React.createElement(_FormattedMessage.default, {
      id: "placeholder"
    })))));
  };

  return CheckPicker;
}(React.Component);

CheckPicker.propTypes = (0, _extends2.default)({}, _propTypes2.listPickerPropTypes, {
  menuAutoWidth: _propTypes.default.bool,
  maxHeight: _propTypes.default.number,
  renderMenu: _propTypes.default.func,
  renderMenuItem: _propTypes.default.func,
  renderMenuGroup: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onGroupTitleClick: _propTypes.default.func,
  onSearch: _propTypes.default.func,
  groupBy: _propTypes.default.any,
  sort: _propTypes.default.func,
  searchable: _propTypes.default.bool,
  countable: _propTypes.default.bool,
  sticky: _propTypes.default.bool,
  virtualized: _propTypes.default.bool,
  searchBy: _propTypes.default.func
});
CheckPicker.defaultProps = (0, _extends2.default)({}, _propTypes2.listPickerDefaultProps, {
  maxHeight: 320,
  locale: {
    placeholder: 'Select',
    searchPlaceholder: 'Search',
    noResultsText: 'No results found'
  },
  searchable: true,
  countable: true,
  menuAutoWidth: true,
  virtualized: true
});

var _default = (0, _utils.defaultProps)({
  classPrefix: 'picker'
})(CheckPicker);

exports.default = _default;
module.exports = exports.default;