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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

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

var ScatterPlotGroup = function (_Component) {
  _inherits(ScatterPlotGroup, _Component);

  var _super = _createSuper(ScatterPlotGroup);

  function ScatterPlotGroup(props) {
    _classCallCheck(this, ScatterPlotGroup);

    return _super.call(this, props);
  }

  _createClass(ScatterPlotGroup, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          data = _this$props.data,
          settings = _objectWithoutProperties(_this$props, _excluded);

      var el = this.el,
          plot = new d3plot(el);
      plot.render(data, settings);
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

  return ScatterPlotGroup;
}(_react.Component);

_defineProperty(ScatterPlotGroup, "propTypes", {
  data: _propTypes["default"].array.isRequired,
  width: _propTypes["default"].number,
  height: _propTypes["default"].number,
  margintop: _propTypes["default"].number,
  marginbottom: _propTypes["default"].number,
  marginright: _propTypes["default"].number,
  marginleft: _propTypes["default"].number,
  getX: _propTypes["default"].func,
  getY: _propTypes["default"].func,
  gettip: _propTypes["default"].func,
  getcolor: _propTypes["default"].func,
  XaxisText: _propTypes["default"].string,
  YaxisText: _propTypes["default"].string,
  color: _propTypes["default"].object,
  size: _propTypes["default"].number,
  showgrid: _propTypes["default"].bool,
  AnimateTime: _propTypes["default"].number,
  onClick: _propTypes["default"].func
});

_defineProperty(ScatterPlotGroup, "defaultProps", {
  width: 500,
  height: 200,
  margintop: 50,
  marginbottom: 30,
  marginright: 50,
  marginleft: 40,
  getX: function getX(d) {
    return d.X;
  },
  getY: function getY(d) {
    return d.Y;
  },
  gettip: function gettip(d) {
    return "( ".concat(d._X, " , ").concat(d._Y, " )");
  },
  getcolor: function getcolor(d) {
    return d.color;
  },
  XaxisText: 'km/s',
  YaxisText: '$',
  color: {
    A: '#f00',
    B: '#ff7f0e'
  },
  size: 5,
  showgrid: true,
  AnimateTime: 1000,
  onClick: function onClick(d, i) {}
});

var d3plot = function () {
  function d3plot(el) {
    _classCallCheck(this, d3plot);

    this.svg = d3.select(el);
  }

  _createClass(d3plot, [{
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
          getcolor = settings.getcolor,
          XaxisText = settings.XaxisText,
          YaxisText = settings.YaxisText,
          color = settings.color,
          size = settings.size,
          showgrid = settings.showgrid,
          showtip = settings.showtip,
          onClick = settings.onClick,
          AnimateTime = settings.AnimateTime;
      var x = d3.scaleLinear().rangeRound([0, width]),
          y = d3.scaleLinear().rangeRound([height, 0]),
          defaultcolor = d3.scaleOrdinal(d3.schemeCategory20);
      var keys = [];
      data = data.map(function (d) {
        if (keys.indexOf(getcolor(d)) == -1) {
          keys.push(getcolor(d));
        }

        return _objectSpread(_objectSpread({}, d), {}, {
          _X: getX(d),
          _Y: getY(d),
          _color: getcolor(d)
        });
      });
      x.domain([0, d3.max(data, function (d) {
        return d._X * 1.05;
      })]);
      y.domain([0, d3.max(data, function (d) {
        return d._Y * 1.05;
      })]);
      var g = this.svg.attr('width', width + marginleft + marginright).attr('height', height + margintop + marginbottom).append('g').attr('transform', "translate( ".concat(marginleft, " , ").concat(margintop, " )"));
      g.append("g").attr("class", "axis axis--x").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x)).append("text").attr("x", width).attr("dy", "-.71em").style("text-anchor", "end").attr('font-weight', 'bold').attr('fill', 'rgba(0,0,0,1)').text(XaxisText);
      g.append("g").attr("class", "axis axis--y").call(d3.axisLeft(y)).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").attr('font-weight', 'bold').attr('fill', 'rgba(0,0,0,1)').text(YaxisText);

      if (showgrid) {
        var grid = g.append('g');
        grid.append("g").call(d3.axisLeft(y).tickSize(-width).tickFormat("")).attr("stroke-opacity", 0.2).attr("stroke-width", 1).attr("shape-rendering", "crispEdges").select('path').attr("stroke-width", 0);
        grid.append("g").call(d3.axisBottom(x).tickSize(height).tickFormat("")).attr("stroke-opacity", 0.2).attr("stroke-width", 1).attr("shape-rendering", "crispEdges").select('path').attr("stroke-width", 0);
      }

      var group = g.selectAll("group").data(data).enter().append('g').on('mouseover', tipMouseOver).on("mouseout", tipMouseOut).on('click', onClick).attr('cursor', 'pointer');
      var circle = group.append("circle").attr("class", "circle").attr("cx", function (d) {
        return x(d._X);
      }).attr("cy", function (d) {
        return y(d._Y);
      }).attr("stroke", 'rgba(255,255,255,0)').attr("fill", 'rgba(255,255,255,0)');
      circle.transition().delay(function (d) {
        return Math.random() * AnimateTime;
      }).duration(AnimateTime).attr("r", size).attr("stroke", '#000').attr("fill", function (d) {
        return color[d._color] ? color[d._color] : defaultcolor(d._color);
      });
      group.append('text').text(gettip).attr("font-size", 0).attr('fill', 'rgba(0,0,0,0)').attr('font-weight', 'bold').attr('dx', '0.3em').attr('dy', '-1em').attr('transform', function (d) {
        return "translate(".concat(x(d._X), ",").concat(y(d._Y), ")");
      });
      var legend = g.append('g').selectAll("g").data([].concat(keys, ['all'])).enter().append('g').style("opacity", function (d) {
        return d == 'all' ? 1 : 0.1;
      });
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
      legend.attr('cursor', 'pointer').on('click', legendclick);

      function legendclick(itemd, i) {
        legend.style("opacity", 0.1);
        var item = d3.select(this).style("opacity", 1);

        if (itemd == 'all') {
          circle.transition().duration(500).attr('r', size);
        } else {
          circle.transition().duration(500).attr('r', function (d) {
            return d._color == itemd ? size : 0;
          });
        }
      }

      function tipMouseOver() {
        var item = d3.select(this);
        item.select('text').transition().duration(500).attr("font-size", 10).attr('fill', 'rgba(0,0,0,1)');
      }

      function tipMouseOut() {
        var item = d3.select(this);
        item.select('text').transition().duration(500).attr("font-size", 0).attr('fill', 'rgba(0,0,0,0)');
      }
    }
  }]);

  return d3plot;
}();

var _default = ScatterPlotGroup;
exports["default"] = _default;