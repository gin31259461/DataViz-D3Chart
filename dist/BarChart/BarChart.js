"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BarChart = void 0;

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

var BarChart = function (_Component) {
  _inherits(BarChart, _Component);

  var _super = _createSuper(BarChart);

  function BarChart(props) {
    _classCallCheck(this, BarChart);

    return _super.call(this, props);
  }

  _createClass(BarChart, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          data = _this$props.data,
          attr = _objectWithoutProperties(_this$props, _excluded);

      var element = this.element,
          bar = new D3BarChart(element);
      bar.render(data, attr);
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

  return BarChart;
}(_react.Component);

exports.BarChart = BarChart;

_defineProperty(BarChart, "propTypes", {
  data: _propTypes["default"].array.isRequired,
  getX: _propTypes["default"].func,
  getY: _propTypes["default"].func,
  width: _propTypes["default"].number,
  height: _propTypes["default"].number,
  chartTitleText: _propTypes["default"].string,
  tooltipTitle: _propTypes["default"].func,
  xAxisText: _propTypes["default"].string,
  yAxisText: _propTypes["default"].string,
  xPadding: _propTypes["default"].number,
  marginTop: _propTypes["default"].number,
  marginRight: _propTypes["default"].number,
  marginBottom: _propTypes["default"].number,
  marginLeft: _propTypes["default"].number,
  color: _propTypes["default"].arrayOf(_propTypes["default"].string),
  xDomain: _propTypes["default"].arrayOf(_propTypes["default"].number),
  yDomain: _propTypes["default"].arrayOf(_propTypes["default"].number),
  xRange: _propTypes["default"].arrayOf(_propTypes["default"].number),
  yRange: _propTypes["default"].arrayOf(_propTypes["default"].number),
  animationTime: _propTypes["default"].number,
  enableAnimation: _propTypes["default"].bool,
  enableBarValue: _propTypes["default"].bool,
  enableXAxis: _propTypes["default"].bool,
  enableYAxis: _propTypes["default"].bool
});

_defineProperty(BarChart, "defaultProps", {
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
  xPadding: 0.1,
  marginTop: 40,
  marginRight: 40,
  marginBottom: 30,
  marginLeft: 60,
  color: undefined,
  xDomain: undefined,
  yDomain: undefined,
  xRange: undefined,
  yRange: undefined,
  animationTime: 2000,
  enableAnimation: true,
  enableBarValue: true,
  enableXAxis: true,
  enableYAxis: true
});

;

var D3BarChart = function () {
  function D3BarChart(element) {
    _classCallCheck(this, D3BarChart);

    this.svg = d3.select(element);
  }

  _createClass(D3BarChart, [{
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
          xPadding = attr.xPadding,
          marginTop = attr.marginTop,
          marginRight = attr.marginRight,
          marginBottom = attr.marginBottom,
          marginLeft = attr.marginLeft,
          animationTime = attr.animationTime,
          color = attr.color,
          xRange = attr.xRange,
          yRange = attr.yRange,
          xDomain = attr.xDomain,
          yDomain = attr.yDomain,
          enableAnimation = attr.enableAnimation,
          enableBarValue = attr.enableBarValue,
          enableXAxis = attr.enableXAxis,
          enableYAxis = attr.enableYAxis;
      if (xRange === undefined) xRange = [marginLeft, width - marginRight];
      if (yRange === undefined) yRange = [height - marginBottom, marginTop];
      var x = d3.map(data, getX),
          y = d3.map(d3.map(data, getY), function (d) {
        return Number(d);
      });
      if (xDomain === undefined) xDomain = x.filter(function (d) {
        return d != "";
      });
      if (yDomain === undefined) yDomain = [0, d3.max(y) * 1.2];
      xDomain = new d3.InternSet(xDomain);
      var I = d3.range(x.length).filter(function (i) {
        return xDomain.has(x[i]);
      });
      var xScale = d3.scaleBand(xDomain, xRange).padding(xPadding),
          yScale = d3.scaleLinear(yDomain, yRange),
          xAxisType = d3.axisBottom(xScale).tickSizeOuter(0),
          yAxisType = d3.axisLeft(yScale).ticks(height / 40),
          fontSize = (width + height) / 100 + "px";
      if (color === undefined) color = d3.quantize(function (t) {
        return d3.interpolateSpectral(t * 0.8 + 0.1);
      }, xDomain.size);else color = settings.color;
      var colorScale = d3.scaleOrdinal(xDomain, color);
      if (tooltipTitle === undefined) tooltipTitle = function tooltipTitle(i) {
        return "x: ".concat(x[i], "\ny: ").concat(y[i]);
      };
      var svg = this.svg.attr("width", width).attr("height", height).attr("viewBox", [0, 0, width, height]).attr("overflow", "visible");

      if (enableYAxis) {
        var yAxis = svg.append("g").attr("transform", "translate(".concat(marginLeft, ", 0)"));
        yAxis.call(yAxisType).call(function (g) {
          return g.select(".domain").remove();
        }).call(function (g) {
          return g.selectAll(".tick line").clone().attr('x2', width - marginLeft - marginRight).attr("stroke-opacity", 0.1);
        }).call(function (g) {
          return g.append("text").attr("x", -20).attr("y", marginTop - 25).attr("fill", "black").attr("text-anchor", "start").style("font-size", "12px").text(yAxisText);
        });
      }

      if (enableXAxis) {
        var xAxis = svg.append("g").attr("transform", "translate(0, ".concat(height - marginBottom, ")"));
        xAxis.call(xAxisType).call(function (g) {
          return g.append("text").attr("x", width - marginRight + 25).attr("y", 15).attr("fill", "black").style("font-size", "12px").text(xAxisText);
        });
      }

      var bar = svg.append("g");
      bar.selectAll("rect").data(I).join("rect").attr("fill", function (i) {
        return colorScale(x[i]);
      }).attr("width", xScale.bandwidth() / 2).attr("height", function (i) {
        return yScale(0) - yScale(y[i]);
      }).attr("x", function (i) {
        return xScale(x[i]) + xScale.bandwidth() / 4;
      }).attr("y", function (i) {
        return yScale(y[i]);
      }).on("mouseover", showTooltip).on("mouseleave", hideTooltip);
      var barValue = svg.append("g");

      if (enableBarValue) {
        barValue.selectAll("text").data(I).join("text").text(function (i) {
          return y[i];
        }).attr("class", function (i) {
          return "barValue_" + i;
        }).style("font-size", fontSize).attr("text-anchor", "middle").attr("x", function (i) {
          return xScale(x[i]) + xScale.bandwidth() / 2;
        }).attr("y", function (i) {
          return yScale(y[i]) - 2;
        });
      }

      var chartTitle = svg.append("g");
      chartTitle.call(function (g) {
        return g.append("text").attr("x", marginLeft + (width - marginRight - marginLeft) / 2).attr("y", marginTop / 2).attr("fill", "black").style("font-weight", 550).style("font-size", "20px").attr("text-anchor", "middle").text(chartTitleText);
      });

      if (enableAnimation) {
        bar.selectAll("rect").data(I).attr("y", height - marginBottom).attr("height", 0).attr("fill", "rgba(0, 0, 0, 0)").transition().attr("y", function (i) {
          return yScale(y[i]);
        }).attr("height", function (i) {
          return yScale(0) - yScale(y[i]);
        }).attr("fill", function (i) {
          return colorScale(x[i]);
        }).duration(animationTime);

        if (enableBarValue) {
          barValue.selectAll("text").transition().attrTween("y", function (i) {
            var f = d3.interpolate(yScale(0), yScale(y[i]) - 2);
            return function (t) {
              return f(t);
            };
          }).textTween(function (i) {
            var f = d3.interpolate(0, y[i]);
            return function (t) {
              return "".concat(d3.format(".0f")(f(t)));
            };
          }).duration(animationTime);
        }
      }

      var tooltip = svg.append("g").attr("pointer-events", "none");

      function showTooltip(_, i) {
        tooltip.style("display", null);
        tooltip.attr("transform", "translate(".concat(xScale(x[i]) + xScale.bandwidth() / 2, ", ").concat(yScale(y[i]) - 10, ")"));
        barValue.select(".barValue_" + i).style("opacity", 0);
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
        text.attr("transform", "translate(".concat(-textBox.width / 2, ", ").concat(-textBox.height + 5, ")"));
        path.attr("d", "M".concat(-textBox.width / 2 - 10, ",5H-5l5,5l5,-5H").concat(textBox.width / 2 + 10, "v").concat(-textBox.height - 20, "h-").concat(textBox.width + 20, "z"));
      }

      function hideTooltip(_, i) {
        tooltip.style("display", "none");
        barValue.select(".barValue_" + i).style("opacity", 1);
      }
    }
  }]);

  return D3BarChart;
}();

;