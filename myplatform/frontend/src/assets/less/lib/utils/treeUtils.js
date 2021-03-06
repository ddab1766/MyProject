"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.shouldShowNodeByExpanded = shouldShowNodeByExpanded;
exports.flattenTree = flattenTree;
exports.getNodeParents = getNodeParents;
exports.getVirtualLisHeight = getVirtualLisHeight;
exports.hasVisibleChildren = hasVisibleChildren;
exports.treeDeprecatedWarning = treeDeprecatedWarning;
exports.compareArray = compareArray;
exports.getExpandAll = getExpandAll;
exports.getExpandItemValues = getExpandItemValues;
exports.getExpandState = getExpandState;
exports.getDragNodeKeys = getDragNodeKeys;
exports.calDropNodePosition = calDropNodePosition;
exports.removeDragNode = removeDragNode;
exports.createUpdateTreeDataFunction = createUpdateTreeDataFunction;
exports.findNodeOfTree = findNodeOfTree;
exports.filterNodesOfTree = filterNodesOfTree;
exports.getExpandWhenSearching = getExpandWhenSearching;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));

var _clone2 = _interopRequireDefault(require("lodash/clone"));

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _intersection2 = _interopRequireDefault(require("lodash/intersection"));

var _shallowEqual = _interopRequireDefault(require("../utils/shallowEqual"));

var _shallowEqualArray = _interopRequireDefault(require("../utils/shallowEqualArray"));

var _constants = require("../constants");

var SEARCH_BAR_HEIGHT = 48;
var MENU_PADDING = 12; // Tree Node 之间的 间隔

var TREE_NODE_GAP = 4;
/**
 * 判断当前节点是否应该显示
 * @param {*} expandItemValues
 * @param {*} parentKeys
 */

function shouldShowNodeByExpanded(expandItemValues, parentKeys) {
  if (expandItemValues === void 0) {
    expandItemValues = [];
  }

  if (parentKeys === void 0) {
    parentKeys = [];
  }

  var intersectionKeys = (0, _intersection2.default)(expandItemValues, parentKeys);

  if (intersectionKeys.length === parentKeys.length) {
    return true;
  }

  return false;
}
/**
 * 拍平树结构为数组
 * @param {*} tree
 * @param {*} childrenKey
 * @param {*} executor
 */


function flattenTree(tree, childrenKey, executor) {
  if (childrenKey === void 0) {
    childrenKey = 'children';
  }

  var flattenData = [];

  var traverse = function traverse(data, parent) {
    if (!(0, _isArray2.default)(data)) {
      return;
    }

    data.forEach(function (item, index) {
      var node = typeof executor === 'function' ? executor(item, index) : item;
      node.parent = parent;
      flattenData.push((0, _extends2.default)({}, node));

      if (item[childrenKey]) {
        traverse(item[childrenKey], item);
      }
    });
  };

  traverse(tree, null);
  return flattenData;
}
/**
 * 获取树节点所有的祖先节点
 * @param {*} node
 */


function getNodeParents(node, parentKey, valueKey) {
  if (parentKey === void 0) {
    parentKey = 'parent';
  }

  var parents = [];

  var traverse = function traverse(node) {
    if (node === null || node === void 0 ? void 0 : node[parentKey]) {
      traverse(node[parentKey]);

      if (valueKey) {
        parents.push(node[parentKey][valueKey]);
      } else {
        parents.push(node[parentKey]);
      }
    }
  };

  traverse(node);
  return parents;
}
/**
 * 获取 VirtualList 的高度
 * @param {*} inline
 * @param {*} height
 */


function getVirtualLisHeight(inline, searchable, height) {
  if (height === void 0) {
    height = 0;
  }

  var searchBarHeight = searchable ? SEARCH_BAR_HEIGHT : 0;
  return inline ? height - MENU_PADDING * 2 : height - searchBarHeight - MENU_PADDING * 2;
}
/**
 * 判断节点是否存在可见的子节点。
 * @param node
 */


function hasVisibleChildren(node, childrenKey) {
  if (!Array.isArray(node[childrenKey])) {
    return false;
  }

  return node[childrenKey].some(function (child) {
    return child.visible;
  });
}
/**
 * 废弃 prop warning
 * @param prop
 */


function treeDeprecatedWarning(props, keys) {
  if (keys === void 0) {
    keys = [];
  }

  keys.forEach(function (key) {
    if (!(0, _isUndefined2.default)(props[key])) {
      console.warn("'Warning: " + key + " is deprecated and will be removed in a future release.'");
    }
  });
}
/**
 * 浅比较两个数组是否不一样
 * @param a
 * @param b
 */


function compareArray(a, b) {
  if (!((0, _isArray2.default)(a) && (0, _isArray2.default)(b))) {
    return a !== b;
  }

  return !(0, _shallowEqualArray.default)(a, b);
}
/**
 * 获取 expandAll 的 value
 * @param props
 */


function getExpandAll(props) {
  var expandAll = props.expandAll,
      defaultExpandAll = props.defaultExpandAll;
  return !(0, _isUndefined2.default)(expandAll) ? expandAll : defaultExpandAll;
}
/**
 * 获取 expandItemValues 的 value
 * @param props
 */


function getExpandItemValues(props) {
  var expandItemValues = props.expandItemValues,
      defaultExpandItemValues = props.defaultExpandItemValues;

  if (!(0, _isUndefined2.default)(expandItemValues) && Array.isArray(expandItemValues)) {
    return expandItemValues;
  }

  if (!(0, _isUndefined2.default)(defaultExpandItemValues) && Array.isArray(defaultExpandItemValues)) {
    return defaultExpandItemValues;
  }

  return [];
}
/**
 * 获取节点展开状态
 * @param node
 * @param props
 */


function getExpandState(node, props) {
  var _node$childrenKey;

  var valueKey = props.valueKey,
      childrenKey = props.childrenKey,
      expandItemValues = props.expandItemValues;
  var expandAll = getExpandAll(props);
  var expand = getExpandItemValues(props).some(function (value) {
    return (0, _shallowEqual.default)(node[valueKey], value);
  });

  if (!(0, _isUndefined2.default)(expandItemValues)) {
    return expand;
  } else if ((_node$childrenKey = node[childrenKey]) === null || _node$childrenKey === void 0 ? void 0 : _node$childrenKey.length) {
    if (!(0, _isNil2.default)(node.expand)) {
      return !!node.expand;
    } else if (expandAll) {
      return true;
    }

    return false;
  }

  return false;
}
/**
 * 获取拖拽节点及子节点的key
 * @param node
 * @param childrenKey
 * @param valueKey
 */


function getDragNodeKeys(dragNode, childrenKey, valueKey) {
  var dragNodeKeys = [dragNode[valueKey]];

  var traverse = function traverse(data) {
    if ((data === null || data === void 0 ? void 0 : data.length) > 0) {
      data.forEach(function (node) {
        dragNodeKeys = dragNodeKeys.concat([node[valueKey]]);

        if (node[childrenKey]) {
          traverse(node[childrenKey]);
        }
      });
    }
  };

  traverse(dragNode[childrenKey]);
  return dragNodeKeys;
}

function calDropNodePosition(event, treeNodeElement) {
  var clientY = event.clientY;

  var _treeNodeElement$getB = treeNodeElement.getBoundingClientRect(),
      top = _treeNodeElement$getB.top,
      bottom = _treeNodeElement$getB.bottom;

  var gap = TREE_NODE_GAP; // 处于节点下方

  if (clientY >= bottom - gap && clientY <= bottom) {
    return _constants.TREE_NODE_DROP_POSITION.DRAG_OVER_BOTTOM;
  } // 处于节点上方


  if (clientY <= top + gap && clientY >= top) {
    return _constants.TREE_NODE_DROP_POSITION.DRAG_OVER_TOP;
  }

  if (clientY >= top + gap && clientY <= bottom - gap) {
    return _constants.TREE_NODE_DROP_POSITION.DRAG_OVER;
  }

  return -1;
}

function removeDragNode(data, params, _ref) {
  var valueKey = _ref.valueKey,
      childrenKey = _ref.childrenKey;
  var dragNode = params.dragNode;

  var traverse = function traverse(items, parent) {
    for (var _index = 0; _index < items.length; _index += 1) {
      var item = items[_index];

      if ((0, _shallowEqual.default)(item[valueKey], dragNode[valueKey])) {
        items.splice(_index, 1); // 当 children 为空，需要删除 children 属性，不显示角标

        if (items.length === 0 && parent) {
          delete parent.children;
        }

        break;
      }

      if (Array.isArray(item[childrenKey])) {
        traverse(item[childrenKey], item);
      }
    }
  };

  traverse(data);
}
/**
 * 移动节点valueKey，先删除 dragNode 原本所在的数据，再将 dragNode 移动到拖动的位置
 * @param data
 * @param params
 */


function createUpdateTreeDataFunction(params, _ref2) {
  var valueKey = _ref2.valueKey,
      childrenKey = _ref2.childrenKey;
  return function (tree) {
    var data = [].concat(tree);
    var dragNode = params.dragNode,
        dropNode = params.dropNode,
        dropNodePosition = params.dropNodePosition;
    removeDragNode(data, params, {
      valueKey: valueKey,
      childrenKey: childrenKey
    });

    var updateTree = function updateTree(items) {
      for (var _index2 = 0; _index2 < items.length; _index2 += 1) {
        var item = items[_index2];

        if ((0, _shallowEqual.default)(item[valueKey], dropNode[valueKey])) {
          // 拖拽到 dropNode内，作为 dropNode 的子节点
          if (dropNodePosition === _constants.TREE_NODE_DROP_POSITION.DRAG_OVER) {
            item[childrenKey] = (0, _isNil2.default)(item[childrenKey]) ? [] : item[childrenKey];
            item[childrenKey].push(dragNode);
            break;
          } else if (dropNodePosition === _constants.TREE_NODE_DROP_POSITION.DRAG_OVER_TOP) {
            // 拖拽到 dropNode 的上面
            items.splice(_index2, 0, dragNode);
            break;
          } else if (dropNodePosition === _constants.TREE_NODE_DROP_POSITION.DRAG_OVER_BOTTOM) {
            // 拖拽到 dropNode 的下面
            items.splice(_index2 + 1, 0, dragNode);
            break;
          }
        }

        if (Array.isArray(item[childrenKey]) && item[childrenKey].length > 0) {
          updateTree(item[childrenKey]);
        }
      }
    };

    updateTree(data);
    return [].concat(data);
  };
}

function findNodeOfTree(data, check) {
  var findNode = function findNode(nodes) {
    if (nodes === void 0) {
      nodes = [];
    }

    for (var i = 0; i < nodes.length; i += 1) {
      var item = nodes[i];

      if ((0, _isArray2.default)(item.children)) {
        var _node = findNode(item.children);

        if (_node) {
          return _node;
        }
      }

      if (check(item)) {
        return item;
      }
    }

    return undefined;
  };

  return findNode(data);
}

function filterNodesOfTree(data, check) {
  var findNodes = function findNodes(nodes) {
    if (nodes === void 0) {
      nodes = [];
    }

    var nextNodes = [];

    for (var i = 0; i < nodes.length; i += 1) {
      if ((0, _isArray2.default)(nodes[i].children)) {
        var nextChildren = findNodes(nodes[i].children);

        if (nextChildren.length) {
          var item = (0, _clone2.default)(nodes[i]);
          item.children = nextChildren;
          nextNodes.push(item);
          continue;
        }
      }

      if (check(nodes[i])) {
        nextNodes.push(nodes[i]);
      }
    }

    return nextNodes;
  };

  return findNodes(data);
}
/**
 * 根据是否处于搜索状态来返回 expand 的值。如果处于搜索状态下，则展开所有的节点
 * @param searchKeyword
 * @param expand
 */


function getExpandWhenSearching(searchKeyword, expand) {
  return !(0, _isEmpty2.default)(searchKeyword) ? true : expand;
}