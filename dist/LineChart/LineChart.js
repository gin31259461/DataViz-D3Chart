"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineChart = void 0;

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

var LineChart = function (_Component) {
  _inherits(LineChart, _Component);

  var _super = _createSuper(LineChart);

  function LineChart(props) {
    _classCallCheck(this, LineChart);

    return _super.call(this, props);
  }

  _createClass(LineChart, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          data = _this$props.data,
          attr = _objectWithoutProperties(_this$props, _excluded);

      var element = this.element,
          line = new D3LineChart(element);
      line.render(data, attr);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      return _react["default"].createElement("svg", {
        ref: function ref(element) {
          return _this.element = element;
        }
      });
    }
  }]);

  return LineChart;
}(_react.Component);

exports.LineChart = LineChart;

_defineProperty(LineChart, "propTypes", {
  data: _propTypes["default"].array.isRequired,
  getX: _propTypes["default"].func,
  getY: _propTypes["default"].func,
  width: _propTypes["default"].number,
  height: _propTypes["default"].number,
  chartTitleText: _propTypes["default"].string,
  tooltipTitle: _propTypes["default"].func,
  xAxisText: _propTypes["default"].string,
  yAxisText: _propTypes["default"].string,
  timeParse: _propTypes["default"].string,
  formatTimeType: _propTypes["default"].func,
  lineDefined: _propTypes["default"].func,
  curveType: _propTypes["default"].object,
  xType: _propTypes["default"].func,
  yType: _propTypes["default"].func,
  marginTop: _propTypes["default"].number,
  marginRight: _propTypes["default"].number,
  marginBottom: _propTypes["default"].number,
  marginLeft: _propTypes["default"].number,
  xDomain: [_propTypes["default"].number, _propTypes["default"].number],
  yDomain: [_propTypes["default"].number, _propTypes["default"].number],
  xRange: [_propTypes["default"].number, _propTypes["default"].number],
  yRange: [_propTypes["default"].number, _propTypes["default"].number],
  lineNodeRadius: _propTypes["default"].number,
  color: _propTypes["default"].string,
  strokeLinecap: _propTypes["default"].string,
  strokeLinejoin: _propTypes["default"].string,
  strokeWidth: _propTypes["default"].number,
  strokeOpacity: _propTypes["default"].number,
  animationTime: _propTypes["default"].number,
  enableAnimation: _propTypes["default"].bool,
  enableLineNode: _propTypes["default"].bool,
  enableTooltip: _propTypes["default"].bool,
  enableXAxis: _propTypes["default"].bool,
  enableYAxis: _propTypes["default"].bool
});

_defineProperty(LineChart, "defaultProps", {
  getX: function getX(d) {
    return d.x;
  },
  getY: function getY(d) {
    return d.y;
  },
  width: 500,
  height: 300,
  chartTitleText: "",
  tooltipTitle: undefined,
  xAxisText: "",
  yAxisText: "",
  timeParse: "%Y-%m-%d",
  lineDefined: undefined,
  formatTimeType: d3.timeParse,
  curveType: d3.curveLinear,
  xType: d3.scaleTime,
  yType: d3.scaleLinear,
  marginTop: 40,
  marginRight: 40,
  marginBottom: 20,
  marginLeft: 60,
  xDomain: undefined,
  yDomain: undefined,
  xRange: undefined,
  yRange: undefined,
  lineNodeRadius: 5,
  color: "steelblue",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: 1.5,
  strokeOpacity: 1,
  animationTime: 2000,
  enableAnimation: true,
  enableLineNode: true,
  enableTooltip: true,
  enableXAxis: true,
  enableYAxis: true
});

;

var D3LineChart = function () {
  function D3LineChart(element) {
    _classCallCheck(this, D3LineChart);

    this.svg = d3.select(element);
  }

  _createClass(D3LineChart, [{
    key: "render",
    value: function render(data, attr) {
      var getX = attr.getX,
          getY = attr.getY,
          width = attr.width,
          height = attr.height,
          chartTitleText = attr.chartTitleText,
          tooltipTitle = attr.tooltipTitle,
          xAxisText = attr.xAxisText,
          yAxisText = attr.yAxisText,
          timeParse = attr.timeParse,
          lineDefined = attr.lineDefined,
          marginTop = attr.marginTop,
          marginRight = attr.marginRight,
          marginBottom = attr.marginBottom,
          marginLeft = attr.marginLeft,
          xDomain = attr.xDomain,
          yDomain = attr.yDomain,
          xRange = attr.xRange,
          yRange = attr.yRange,
          lineNodeRadius = attr.lineNodeRadius,
          color = attr.color,
          xType = attr.xType,
          yType = attr.yType,
          formatTimeType = attr.formatTimeType,
          curveType = attr.curveType,
          strokeLinecap = attr.strokeLinecap,
          strokeLinejoin = attr.strokeLinejoin,
          strokeWidth = attr.strokeWidth,
          strokeOpacity = attr.strokeOpacity,
          animationTime = attr.animationTime,
          enableAnimation = attr.enableAnimation,
          enableLineNode = attr.enableLineNode,
          enableTooltip = attr.enableTooltip,
          enableXAxis = attr.enableXAxis,
          enableYAxis = attr.enableYAxis;
      if (xRange === undefined) xRange = [marginLeft, width - marginRight];
      if (yRange === undefined) yRange = [height - marginBottom, marginTop];
      var x = [];
      if (xType === d3.scaleTime) x = d3.map(d3.map(data, getX), function (d) {
        return formatTimeType(timeParse)(d);
      });
      var y = d3.map(d3.map(data, getY), function (d) {
        return Number(d);
      }),
          I = d3.range(x.length);
      if (xDomain === undefined) xDomain = d3.extent(x);
      if (yDomain === undefined) yDomain = [0, d3.max(y)];
      var xScale = xType(xDomain, xRange),
          yScale = yType(yDomain, yRange),
          xAxisType = d3.axisBottom(xScale).ticks(width / 80).tickSizeOuter(0),
          yAxisType = d3.axisLeft(yScale).ticks(height / 40),
          fontSize = (width + height) / 100 + "px";
      if (lineDefined === undefined) lineDefined = function lineDefined(_, i) {
        return !isNaN(x[i]) && !isNaN(y[i]);
      };
      var defined = d3.map(data, lineDefined);
      var line = d3.line().defined(function (i) {
        return defined[i];
      }).curve(curveType).x(function (i) {
        return xScale(x[i]);
      }).y(function (i) {
        return yScale(y[i]);
      });
      if (tooltipTitle === undefined) tooltipTitle = function tooltipTitle(i) {
        return "x: ".concat(d3.timeFormat("%Y-%m-%d")(x[i]), "\ny: ").concat(y[i]);
      };
      var svg = this.svg.attr("width", width).attr("height", height).attr("viewBox", [0, 0, width, height]).attr("overflow", "visible");

      if (enableTooltip) {
        svg.on("pointerenter pointermove", showTooltip).on("pointerleave", hideTooltip).on("touchstart", function (event) {
          return event.preventDefault();
        });
      }

      if (enableYAxis) {
        var yAxis = svg.append("g").attr("transform", "translate(".concat(marginLeft, ", 0)"));
        yAxis.call(yAxisType).call(function (g) {
          return g.select(".domain").remove();
        }).call(function (g) {
          return g.selectAll(".tick line").clone().attr('x2', width - marginLeft - marginRight).attr("stroke-opacity", 0.1);
        }).call(function (g) {
          return g.append("text").attr("x", -20).attr("y", marginTop - 25).attr("fill", "black").attr("style", "12px").attr("text-anchor", "start").text(yAxisText);
        });
      }

      if (enableXAxis) {
        var xAxis = svg.append("g").attr("transform", "translate(0, ".concat(height - marginBottom, ")"));
        xAxis.call(xAxisType).call(function (g) {
          return g.append("text").attr("x", width - marginRight + 25).attr("y", 15).attr("fill", "black").attr("style", "12px").text(xAxisText);
        });
        var chartTitle = svg.append("g");
        chartTitle.call(function (g) {
          return g.append("text").attr("x", marginLeft + (width - marginRight - marginLeft) / 2).attr("y", marginTop / 2).attr("fill", "black").style("font-size", "20px").style("font-weight", 550).attr("text-anchor", "middle").text(chartTitleText);
        });
      }

      var linePath = svg.append("g");
      linePath.append("path").datum(I).attr("fill", "none").attr("stroke", color).attr("stroke-width", strokeWidth).attr("stroke-linecap", strokeLinecap).attr("stroke-linejoin", strokeLinejoin).attr("stroke-opacity", strokeOpacity).attr("d", line);
      var lineNode = svg.append("g");

      if (enableLineNode) {
        lineNode.selectAll("circle").data(I).join("circle").attr("cx", function (i) {
          return xScale(x[i]);
        }).attr("cy", function (i) {
          return yScale(y[i]);
        }).attr("r", lineNodeRadius).attr("fill", color);
      }

      if (enableAnimation) {
        var pathLenth = linePath.select("path").node().getTotalLength();
        linePath.attr("stroke-dasharray", pathLenth + " " + pathLenth).attr("stroke-dashoffset", pathLenth).transition().ease(d3.easeLinear).attr("stroke-dashoffset", 0).duration(animationTime);
        lineNode.selectAll("circle").style("opacity", 0).transition().ease(d3.easeLinear).style("opacity", 1).duration(animationTime);
      }

      var tooltip = svg.append("g").style("pointer-events", "none");

      function showTooltip(event) {
        var i = d3.bisectCenter(x, xScale.invert(d3.pointer(event)[0]));
        tooltip.style("display", null);
        tooltip.attr("transform", "translate(".concat(xScale(x[i]), ", ").concat(yScale(y[i]), ")"));
        var path = tooltip.selectAll("path").data([,]).join("path").attr("fill", "rgba(250, 250, 250, 0.8)").attr("stroke", "rgba(224, 224, 224, 1)").attr("color", "black");
        var text = tooltip.selectAll("text").data([,]).join("text").style("font-size", fontSize).call(function (text) {
          return text.selectAll("tspan").data("".concat(tooltipTitle(i)).split(/\n/)).join("tspan").attr("x", 0).attr("y", function (_, i) {
            return "".concat(i * 1.1, "em");
          }).attr("font-weight", function (_, i) {
            return i ? null : "bold";
          }).text(function (d) {
            return d;
          });
        });
        var textBox = text.node().getBBox();
        tooltip.selectAll("path").attr("d", null);
        text.attr("transform", "translate(".concat(-textBox.width / 2, ",").concat(15 - textBox.y, ")"));
        path.attr("d", "M".concat(-textBox.width / 2 - 10, ",5H-5l5,-5l5,5H").concat(textBox.width / 2 + 10, "v").concat(textBox.height + 20, "h-").concat(textBox.width + 20, "z"));
      }

      function hideTooltip() {
        tooltip.style("display", "none");
      }
    }
  }]);

  return D3LineChart;
}();

;