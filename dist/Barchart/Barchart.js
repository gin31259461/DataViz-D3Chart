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

var Barchart = function (_Component) {
  _inherits(Barchart, _Component);

  var _super = _createSuper(Barchart);

  function Barchart(props) {
    _classCallCheck(this, Barchart);

    return _super.call(this, props);
  }

  _createClass(Barchart, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          data = _this$props.data,
          settings = _objectWithoutProperties(_this$props, _excluded);

      var el = this.el,
          bar = new d3bar(el);
      bar.render(data, settings);
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

  return Barchart;
}(_react.Component);

_defineProperty(Barchart, "propTypes", {
  data: _propTypes["default"].array.isRequired,
  width: _propTypes["default"].number,
  height: _propTypes["default"].number,
  margintop: _propTypes["default"].number,
  marginbottom: _propTypes["default"].number,
  marginright: _propTypes["default"].number,
  marginleft: _propTypes["default"].number,
  getX: _propTypes["default"].func,
  getY: _propTypes["default"].func,
  YaxisText: _propTypes["default"].string,
  Xpadding: _propTypes["default"].number,
  color: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].arrayOf(_propTypes["default"].string)]),
  showtip: _propTypes["default"].bool,
  gettip: _propTypes["default"].func,
  showgrid: _propTypes["default"].bool,
  barAnimate: _propTypes["default"].bool,
  barAnimateTime: _propTypes["default"].number,
  onClick: _propTypes["default"].func
});

_defineProperty(Barchart, "defaultProps", {
  width: 500,
  height: 200,
  margintop: 50,
  marginbottom: 30,
  marginright: 50,
  marginleft: 40,
  getX: function getX(d) {
    return d.text;
  },
  getY: function getY(d) {
    return d.count;
  },
  gettip: function gettip(d) {
    return d.count;
  },
  YaxisText: '$',
  Xpadding: .3,
  color: d3.scaleOrdinal(d3.schemeCategory20),
  showgrid: true,
  showtip: true,
  barAnimate: true,
  barAnimateTime: 1000,
  onClick: function onClick(d, i) {}
});

var d3bar = function () {
  function d3bar(el) {
    _classCallCheck(this, d3bar);

    this.svg = d3.select(el);
  }

  _createClass(d3bar, [{
    key: "render",
    value: function render(data, settings) {
      var width = settings.width,
          height = settings.height,
          margintop = settings.margintop,
          marginbottom = settings.marginbottom,
          marginright = settings.marginright,
          marginleft = settings.marginleft,
          getX = settings.getX,
          getY = settings.getY,
          gettip = settings.gettip,
          Xpadding = settings.Xpadding,
          YaxisText = settings.YaxisText,
          showgrid = settings.showgrid,
          showtip = settings.showtip,
          color = settings.color,
          barAnimate = settings.barAnimate,
          barAnimateTime = settings.barAnimateTime,
          onClick = settings.onClick;
      data.map(function (d) {
        d.X = getX(d);
        d.Y = getY(d);
      });
      var x = d3.scaleBand().rangeRound([0, width]).padding(Xpadding),
          y = d3.scaleLinear().rangeRound([height, 0]);
      x.domain(data.map(function (d) {
        return d.X;
      }));
      y.domain([0, d3.max(data, function (d) {
        return d.Y * 1.05;
      })]);
      var g = this.svg.attr('width', width + marginleft + marginright).attr('height', height + margintop + marginbottom).append('g').attr('transform', "translate( ".concat(marginleft, " , ").concat(margintop, " )"));
      g.append("g").attr("class", "axis axis--x").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));
      g.append("g").attr("class", "axis axis--y").call(d3.axisLeft(y)).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").attr('font-weight', 'bold').attr('fill', 'rgba(0,0,0,1)').text(YaxisText);

      if (showgrid) {
        var grid = g.append('g');
        grid.append("g").call(d3.axisLeft(y).tickSize(-width).tickFormat("")).attr("stroke-opacity", 0.3).attr("stroke-width", 1).attr("shape-rendering", "crispEdges").select('path').attr("stroke-width", 0);
      }

      var bar = g.selectAll(".bar").data(data).enter().append('g');
      var rect = bar.append("rect").style('cursor', 'pointer').attr("class", "bar").attr("x", function (d) {
        return x(d.X);
      }).attr("width", x.bandwidth());

      if (barAnimate) {
        rect.attr("y", function (d) {
          return height;
        }).attr("height", 0).attr("fill", 'rgba(0,0,0,0)').on('click', onClick).transition().duration(barAnimateTime).attr("y", function (d) {
          return y(d.Y);
        }).attr("height", function (d) {
          return height - y(d.Y);
        }).attr("fill", function (d, i) {
          return Array.isArray(color) ? color[i % color.length] : color(i);
        });
      } else {
        rect.attr("y", function (d) {
          return y(d.Y);
        }).attr("height", function (d) {
          return height - y(d.Y);
        }).attr("fill", function (d, i) {
          return Array.isArray(color) ? color[i % color.length] : color(i);
        });
      }

      if (showtip) {
        bar.append('text').text(gettip).attr("text-anchor", "middle").attr("font-size", 14).attr('fill', 'rgba(255,0,0,0)').attr('font-weight', 'bold').attr('dy', '-0.3em').attr('transform', function (d) {
          return "translate(".concat(x(d.X) + x.bandwidth() / 2, ",").concat(y(d.Y), ")");
        });
        bar.on('mouseover', function () {
          var item = d3.select(this);
          item.select('text').transition().duration(500).attr('fill', 'rgba(0,0,0,1)');
        }).on("mouseout", function () {
          '';

          var item = d3.select(this);
          item.select('text').transition().duration(500).attr("fill", 'rgba(0,0,0,0)');
        });
      }
    }
  }]);

  return d3bar;
}();

var _default = Barchart;
exports["default"] = _default;