"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var d3 = _interopRequireWildcard(require("d3"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _excluded = ["data"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DirectoryTree = function (_Component) {
  _inherits(DirectoryTree, _Component);

  var _super = _createSuper(DirectoryTree);

  function DirectoryTree(props) {
    _classCallCheck(this, DirectoryTree);

    return _super.call(this, props);
  }

  _createClass(DirectoryTree, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          data = _this$props.data,
          settings = _objectWithoutProperties(_this$props, _excluded);

      var el = this.el,
          tree = new d3tree(el);
      tree.render(data, settings);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      return _react["default"].createElement("svg", {
        ref: function ref(el) {
          return _this.el = el;
        }
      });
    }
  }]);

  return DirectoryTree;
}(_react.Component);

exports["default"] = DirectoryTree;

_defineProperty(DirectoryTree, "propTypes", {
  data: _propTypes["default"].array.isRequired,
  width: _propTypes["default"].number,
  height: _propTypes["default"].number,
  margintop: _propTypes["default"].number,
  marginbottom: _propTypes["default"].number,
  marginright: _propTypes["default"].number,
  marginleft: _propTypes["default"].number,
  nodeHeight: _propTypes["default"].number,
  childIndent: _propTypes["default"].number,
  getparentId: _propTypes["default"].func,
  getid: _propTypes["default"].func,
  gettext: _propTypes["default"].func,
  getvalue: _propTypes["default"].func,
  getvaluetext: _propTypes["default"].func,
  IsCollapse: _propTypes["default"].bool,
  AnimateTime: _propTypes["default"].number
});

_defineProperty(DirectoryTree, "defaultProps", {
  width: 500,
  margintop: 0,
  marginbottom: 30,
  marginright: 50,
  marginleft: 40,
  nodeHeight: 40,
  childIndent: 30,
  getparentId: function getparentId(d) {
    return d.pcid;
  },
  getid: function getid(d) {
    return d.cid;
  },
  gettext: function gettext(d) {
    return d.text;
  },
  getvalue: function getvalue(d) {
    return d.value;
  },
  getvaluetext: function getvaluetext(d) {
    return d.value;
  },
  IsCollapse: true,
  AnimateTime: 500
});

var d3tree = function () {
  function d3tree(el) {
    _classCallCheck(this, d3tree);

    this.svg = d3.select(el);
  }

  _createClass(d3tree, [{
    key: "render",
    value: function render(data, settings) {
      var width = settings.width,
          margintop = settings.margintop,
          marginbottom = settings.marginbottom,
          marginright = settings.marginright,
          marginleft = settings.marginleft,
          getparentId = settings.getparentId,
          getid = settings.getid,
          gettext = settings.gettext,
          getvalue = settings.getvalue,
          getvaluetext = settings.getvaluetext,
          nodeHeight = settings.nodeHeight,
          childIndent = settings.childIndent,
          IsCollapse = settings.IsCollapse,
          AnimateTime = settings.AnimateTime;
      var height = data.length * nodeHeight;
      var svg = this.svg;
      var g = this.svg.attr('width', width + marginright + marginleft).attr('height', height + margintop + marginbottom).append('g').attr('transform', "translate( ".concat(marginleft, " , ").concat(margintop, " )"));
      data.map(function (d) {
        d._pcid = getparentId(d), d._cid = getid(d);
        d._value = getvalue(d);
        d._valuetext = getvaluetext(d);
        d._text = gettext(d);
      });
      var stratify = d3.stratify().parentId(function (d) {
        return d._pcid;
      }).id(function (d) {
        return d._cid;
      });
      var treemap = d3.tree().size([height, width]);
      var root = stratify(data);
      root.x0 = 0;
      root.y0 = 0;
      IsCollapse && root.children.forEach(collapse);

      function collapse(d) {
        if (d.children) {
          d._children = d.children;

          d._children.forEach(collapse);

          d.children = null;
        }
      }

      update(root);

      function update(source) {
        var treeData = treemap(root);
        layout(root);
        var nodes = treeData.descendants().slice(1);
        svg.transition().duration(AnimateTime).attr('height', nodes.length * nodeHeight + margintop + marginbottom);
        var node = g.selectAll('g.node').data(nodes, function (d) {
          return d.id || (d.id = ++i);
        });

        function visit(f, t, index, parent) {
          if (t) {
            f(t, index, parent);
          }

          var children = t.children;

          if (children && children.length) {
            children.forEach(function (child, ci) {
              visit(f, child, ci, t);
            });
          }
        }

        function layout(node) {
          var x = 0,
              y = 0;
          visit(function (n, index, parent) {
            x = x + nodeHeight;
            y = parent ? parent.y + childIndent : 0;
            n.y = y;
            n.x = x;
          }, node);
        }

        var nodeEnter = node.enter().append('g').attr('class', 'node').style("opacity", 1).attr("transform", function (d) {
          return "translate(  ".concat(source.y0, ", ").concat(source.x0, " )");
        }).attr('cursor', function (d) {
          return d.children || d._children ? 'pointer' : 'default';
        }).on('click', function (d) {
          return d.children || d._children ? click(d) : function () {};
        });
        nodeEnter.append('rect').attr('x', 0).attr('y', -nodeHeight / 2).attr('width', function (d) {
          return width - d.y;
        }).attr('height', nodeHeight * .8).style("fill", '#c8def4').attr('stroke', 'rgba(0,0,0,.2)');
        nodeEnter.append('text').attr('class', 'treeopen').attr('dx', '3px').text(function (d) {
          return d.children || d._children ? d.children ? '-' : '+' : '';
        }).attr('stroke', 'rgba(0,0,0,.2)');
        nodeEnter.append('text').text(function (d) {
          return d.data._text;
        }).attr('dx', '15px');
        var nodeEnterg = nodeEnter.append('g').attr("transform", function (d) {
          return "translate(  ".concat(width / 2 - d.y, ", ", 0, " )");
        });
        nodeEnterg.append('rect').attr('x', 0).attr('y', -nodeHeight / 3).attr('width', function (d) {
          return width / 2 - 10;
        }).attr('height', nodeHeight / 2).style("fill", 'rgba(255,255,255,1)').attr('stroke', 'rgba(0,0,0,.2)');
        nodeEnterg.append('rect').attr('x', 0).attr('y', -nodeHeight / 3).attr('width', 0).attr('height', nodeHeight / 2).style("fill", '#6da2dc').transition().delay(AnimateTime).duration(1000).attr('width', function (d) {
          return (width / 2 - 10) * d.data._value / 100;
        });
        nodeEnterg.append('text').text(function (d) {
          return "".concat(d.data._valuetext);
        }).attr('dx', '10px').attr('dy', '0.1em').style("fill", 'rgba(0,0,0,1)');
        var nodeUpdate = nodeEnter.merge(node);
        nodeUpdate.transition().duration(AnimateTime).style("opacity", 1).attr("transform", function (d) {
          return "translate(".concat(d.y - childIndent, " ,").concat(d.x - nodeHeight, ")");
        });
        nodeUpdate.select('.treeopen').text(function (d) {
          return d.children || d._children ? d.children ? '-' : '+' : '';
        });
        var nodeExit = node.exit().style("opacity", 1).transition('nodeExit').duration(AnimateTime).attr("transform", function (d) {
          return "translate(".concat(source.y, " ,").concat(source.x - nodeHeight / 2, " )");
        }).style("opacity", 0).remove();
        nodes.forEach(function (d) {
          d.x0 = d.x;
          d.y0 = d.y;
        });

        function click(d) {
          if (d.children) {
            d._children = d.children;
            d.children = null;
          } else {
            d.children = d._children;
            d._children = null;
          }

          update(d);
        }
      }
    }
  }]);

  return d3tree;
}();