"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

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

var Bubblechart = function (_Component) {
  _inherits(Bubblechart, _Component);

  var _super = _createSuper(Bubblechart);

  function Bubblechart(props) {
    _classCallCheck(this, Bubblechart);

    return _super.call(this, props);
  }

  _createClass(Bubblechart, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          data = _this$props.data,
          settings = _objectWithoutProperties(_this$props, _excluded);

      var el = this.el;
      var bubble = new d3bubble(el);
      bubble.render(data, settings);
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

  return Bubblechart;
}(_react.Component);

_defineProperty(Bubblechart, "propTypes", {
  data: _propTypes["default"].array.isRequired,
  width: _propTypes["default"].number,
  height: _propTypes["default"].number,
  margintop: _propTypes["default"].number,
  marginbottom: _propTypes["default"].number,
  marginright: _propTypes["default"].number,
  marginleft: _propTypes["default"].number,
  getname: _propTypes["default"].func,
  getvalue: _propTypes["default"].func,
  getcolor: _propTypes["default"].func,
  gettip: _propTypes["default"].func,
  showtip: _propTypes["default"].bool,
  showlegend: _propTypes["default"].bool,
  padding: _propTypes["default"].number,
  color: _propTypes["default"].object,
  AnimateTime: _propTypes["default"].number,
  onClick: _propTypes["default"].func
});

_defineProperty(Bubblechart, "defaultProps", {
  width: 500,
  height: 200,
  margintop: 50,
  marginbottom: 30,
  marginright: 50,
  marginleft: 40,
  getname: function getname(d) {
    return d.name;
  },
  getvalue: function getvalue(d) {
    return d.value;
  },
  getcolor: function getcolor(d) {
    return d.color;
  },
  gettip: function gettip(d) {
    return d.value;
  },
  padding: 1,
  color: {},
  showtip: true,
  showlegend: true,
  AnimateTime: 1000,
  onClick: function onClick(d, i) {}
});

var d3bubble = function () {
  function d3bubble(el) {
    _classCallCheck(this, d3bubble);

    this.svg = d3.select(el);
  }

  _createClass(d3bubble, [{
    key: "render",
    value: function render(data, settings) {
      var width = settings.width,
          height = settings.height,
          margintop = settings.margintop,
          marginbottom = settings.marginbottom,
          marginright = settings.marginright,
          marginleft = settings.marginleft,
          getname = settings.getname,
          getvalue = settings.getvalue,
          getcolor = settings.getcolor,
          gettip = settings.gettip,
          padding = settings.padding,
          color = settings.color,
          showlegend = settings.showlegend,
          showtip = settings.showtip,
          AnimateTime = settings.AnimateTime,
          onClick = settings.onClick;
      var defaultcolor = d3.scaleOrdinal(d3.schemeCategory20);
      var keys = [];
      data.map(function (d) {
        d._name = getname(d), d._value = getvalue(d), d._color = getcolor(d);

        if (keys.indexOf(getcolor(d)) == -1) {
          keys.push(getcolor(d));
        }
      });
      var pack = d3.pack().padding(padding).size([width, height]);
      var dataobj = d3.hierarchy({
        children: data
      }).sum(function (d) {
        return d._value;
      }).sort(function (a, b) {
        return b.value - a.value;
      });
      var g = this.svg.attr('width', width + marginleft + marginright).attr('height', height + margintop + marginbottom).append('g').attr('transform', "translate( ".concat(marginleft, " , ").concat(margintop, " )"));
      var node = g.selectAll(".node").data(pack(dataobj).leaves()).enter().append("g").attr("transform", function (d) {
        return "translate( ".concat(d.x, ",").concat(d.y, " )");
      }).on('click', function (d) {
        return onClick(d.data);
      });
      node.append("circle").transition().delay(function (d, i) {
        return AnimateTime * i / data.length;
      }).duration(AnimateTime).attr("r", function (d) {
        return d.r;
      }).style("fill", function (d) {
        return color[d.data._color] ? color[d.data._color] : defaultcolor(d.data._color);
      });
      node.append("text").style("text-anchor", "middle").attr('font-weight', 'bold').attr('fill', 'rgba(0,0,0,1)').attr('dy', '0.3em').attr('font-size', 0).text(function (d) {
        return d.data._name;
      }).transition().delay(function (d, i) {
        return AnimateTime * i / data.length;
      }).duration(AnimateTime).attr('font-size', function (d) {
        return "".concat(d.r * 3 / d.data._name.length, "px");
      });

      if (showtip) {
        node.append("title").text(function (d) {
          return gettip(d.data);
        });
      }

      if (showlegend) {
        var legend = g.append('g').selectAll("g").data([].concat(keys)).enter().append('g');
        var legendrect = legend.append('rect').attr('width', 0).attr('height', 15).attr('transform', function (d, i) {
          return "translate( ".concat(width + 10, " , ").concat(30 * i, ")");
        }).style("fill", function (d) {
          return color[d] ? color[d] : defaultcolor(d);
        }).transition().delay(AnimateTime).duration(500).attr('width', 15);
        var legendtext = legend.append('text').attr('fill', 'rgba(0,0,0,0)').text(function (d) {
          return d;
        }).attr('transform', function (d, i) {
          return "translate( ".concat(width + 30, " , ").concat(30 * i + 15, ")");
        }).transition().delay(AnimateTime).duration(500).attr('fill', '#000');
      }
    }
  }]);

  return d3bubble;
}();

var _default = Bubblechart;
exports["default"] = _default;