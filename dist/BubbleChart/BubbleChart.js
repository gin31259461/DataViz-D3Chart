"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BubbleChart = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var d3 = _interopRequireWildcard(require("d3"));

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

var BubbleChart = function (_Component) {
  _inherits(BubbleChart, _Component);

  var _super = _createSuper(BubbleChart);

  function BubbleChart(props) {
    _classCallCheck(this, BubbleChart);

    return _super.call(this, props);
  }

  _createClass(BubbleChart, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          data = _this$props.data,
          attr = _objectWithoutProperties(_this$props, _excluded);

      var element = this.element,
          bubble = new D3BubbleChart(element);
      bubble.render(data, attr);
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

  return BubbleChart;
}(_react.Component);

exports.BubbleChart = BubbleChart;

_defineProperty(BubbleChart, "propTypes", {
  data: _propTypes["default"].array.isRequired,
  getX: _propTypes["default"].func,
  getY: _propTypes["default"].func,
  getZ: _propTypes["default"].func,
  getC: _propTypes["default"].func,
  getT: _propTypes["default"].func,
  width: _propTypes["default"].number,
  height: _propTypes["default"].number,
  chartTitleText: _propTypes["default"].string,
  tooltipTitle: _propTypes["default"].func,
  xAxisText: _propTypes["default"].string,
  yAxisText: _propTypes["default"].string,
  zMaxRadius: _propTypes["default"].number,
  color: _propTypes["default"].arrayOf(_propTypes["default"].string),
  xType: _propTypes["default"].string,
  marginTop: _propTypes["default"].number,
  marginRight: _propTypes["default"].number,
  marginBottom: _propTypes["default"].number,
  marginLeft: _propTypes["default"].number,
  xDomain: _propTypes["default"].arrayOf(_propTypes["default"].number),
  yDomain: _propTypes["default"].arrayOf(_propTypes["default"].number),
  zDomain: _propTypes["default"].arrayOf(_propTypes["default"].number),
  xDomainScale: _propTypes["default"].number,
  zDomainScale: _propTypes["default"].number,
  xRange: _propTypes["default"].arrayOf(_propTypes["default"].number),
  yRange: _propTypes["default"].arrayOf(_propTypes["default"].number),
  zRange: _propTypes["default"].arrayOf(_propTypes["default"].number),
  animationTime: _propTypes["default"].number,
  enableAnimation: _propTypes["default"].bool,
  enableLegend: _propTypes["default"].bool,
  enableXAxis: _propTypes["default"].bool,
  enableYAxis: _propTypes["default"].bool
});

_defineProperty(BubbleChart, "defaultProps", {
  getX: function getX(d) {
    return d.x;
  },
  getY: function getY(d) {
    return d.y;
  },
  getZ: function getZ(d) {
    return d.z;
  },
  getC: function getC(d) {
    return d.color;
  },
  getT: function getT(d) {
    return d.tip;
  },
  width: 500,
  height: 300,
  chartTitleText: "",
  tooltipTitle: undefined,
  xAxisText: "",
  yAxisText: "",
  zMaxRadius: 30,
  color: undefined,
  xType: "scaleLinear",
  marginTop: 40,
  marginRight: 120,
  marginBottom: 20,
  marginLeft: 60,
  xDomain: undefined,
  yDomain: undefined,
  zDomain: undefined,
  xDomainScale: 1.2,
  zDomainScale: 1.2,
  xRange: undefined,
  yRange: undefined,
  zRange: undefined,
  animationTime: 2000,
  enableAnimation: true,
  enableLegend: true,
  enableXAxis: true,
  enableYAxis: true
});

var D3BubbleChart = function () {
  function D3BubbleChart(element) {
    _classCallCheck(this, D3BubbleChart);

    this.svg = d3.select(element);
  }

  _createClass(D3BubbleChart, [{
    key: "render",
    value: function render(data, attr) {
      var getX = attr.getX,
          getY = attr.getY,
          getZ = attr.getZ,
          getC = attr.getC,
          getT = attr.getT,
          width = attr.width,
          height = attr.height,
          chartTitleText = attr.chartTitleText,
          tooltipTitle = attr.tooltipTitle,
          xAxisText = attr.xAxisText,
          yAxisText = attr.yAxisText,
          zMaxRadius = attr.zMaxRadius,
          color = attr.color,
          xType = attr.xType,
          marginTop = attr.marginTop,
          marginRight = attr.marginRight,
          marginBottom = attr.marginBottom,
          marginLeft = attr.marginLeft,
          xDomain = attr.xDomain,
          yDomain = attr.yDomain,
          zDomain = attr.zDomain,
          xDomainScale = attr.xDomainScale,
          zDomainScale = attr.zDomainScale,
          xRange = attr.xRange,
          yRange = attr.yRange,
          zRange = attr.zRange,
          animationTime = attr.animationTime,
          enableAnimation = attr.enableAnimation,
          enableLegend = attr.enableLegend,
          enableXAxis = attr.enableXAxis,
          enableYAxis = attr.enableYAxis;
      if (xRange === undefined) xRange = [marginLeft, width - marginRight];
      if (yRange === undefined) yRange = [height - marginBottom, marginTop];
      if (zRange === undefined) zRange = [5, zMaxRadius];
      var x = d3.map(data, getX),
          y = d3.map(data, getY),
          z = d3.map(d3.map(data, getZ), function (d) {
        return Number(d);
      }),
          c = d3.map(data, getC),
          t = d3.map(data, getT),
          cUnique = new d3.InternSet(c),
          I = d3.range(x.length);
      if (xDomain === undefined) if (xType === "scaleBand") xDomain = x;else if (xType === "scaleLinear") xDomain = [0, d3.max(x) * xDomainScale];
      if (yDomain === undefined) yDomain = [d3.min(y) * 0.8, d3.max(y) * 1.2];
      if (zDomain === undefined) zDomain = [0, d3.max(z) * zDomainScale];
      var xScale = undefined;
      if (xType === "scaleBand") xScale = d3.scaleBand(xDomain, xRange);else if (xType === "scaleLinear") xScale = d3.scaleLinear(xDomain, xRange);
      var yScale = d3.scaleLinear(yDomain, yRange),
          zScale = d3.scaleLinear(zDomain, zRange),
          fontSize = (width + height) / 100 + "px";
      if (color === undefined) color = d3.quantize(function (t) {
        return d3.interpolateSpectral(t * 0.8 + 0.1);
      }, cUnique.size);
      var cScale = d3.scaleOrdinal().domain(cUnique).range(color);
      if (tooltipTitle === undefined) tooltipTitle = function tooltipTitle(i) {
        return "".concat(t[i]);
      };
      var svg = this.svg.attr("width", width).attr("height", height).attr("overflow", "visible").attr("viewBox", [0, 0, width, height]);

      var highlightGroup = function highlightGroup(_, d) {
        bubbles.selectAll(".bubbles").style("opacity", 0.2);
        bubbles.selectAll("._" + d).style("opacity", 1);
      };

      var noHighlight = function noHighlight(_, d) {
        bubbles.selectAll(".bubbles").style("opacity", 1);
      };

      if (enableXAxis) {
        var xAxis = svg.append("g").attr("transform", "translate(0, ".concat(height - marginBottom, ")"));
        xAxis.call(d3.axisBottom(xScale).tickSizeOuter(0)).call(function (g) {
          return g.append("text").attr("x", width - marginRight + 25).attr("y", 15).attr("fill", "black").attr("style", "12px").text(xAxisText);
        });
      }

      if (enableYAxis) {
        var yAxis = svg.append("g").attr("transform", "translate(".concat(marginLeft, ", 0)"));
        yAxis.call(d3.axisLeft(yScale).ticks(height / 40).tickSizeOuter(0)).call(function (g) {
          return g.selectAll(".domain").remove();
        }).call(function (g) {
          return g.selectAll(".tick line").clone().attr("x2", width - marginLeft - marginRight).attr("stroke-opacity", 0.1);
        }).call(function (g) {
          return g.append("text").attr("x", -20).attr("y", marginTop - 25).attr("fill", "black").attr("style", "12px").attr("text-anchor", "start").text(yAxisText);
        });
      }

      var bubbles = svg.append("g");
      bubbles.selectAll("circle").data(I).join("circle").attr("class", function (i) {
        return "bubbles _" + c[i] + " bubble_" + x[i];
      }).attr("fill", function (i) {
        return cScale(c[i]);
      }).attr("stroke", "black").attr("stroke-width", "0.5px").attr("cx", function (i) {
        return xScale(x[i]);
      }).attr("cy", function (i) {
        return yScale(y[i]);
      }).attr("r", 0);
      if (xType === "scaleBand") bubbles.selectAll(".bubbles").data(I).attr("cx", function (i) {
        return xScale(x[i]) + xScale.bandwidth() / 2;
      });else if (xType === "scaleLinear") bubbles.selectAll(".bubbles").data(I).attr("cx", function (i) {
        return xScale(x[i]);
      });
      bubbles.selectAll("circle").on("mouseover", showTooltip).on("mouseleave", hideTooltip);
      var chartTitle = svg.append("g");
      chartTitle.call(function (g) {
        return g.append("text").attr("x", marginLeft + (width - marginRight - marginLeft) / 2).attr("y", marginTop / 2).attr("fill", "black").style("font-size", "20px").style("font-weight", 550).attr("text-anchor", "middle").text(chartTitleText);
      });

      if (enableLegend) {
        var legend = svg.append("g").style("cursor", "pointer").attr("transform", "translate(".concat(width - marginRight + 25 + 20, ", ").concat(marginTop, ")")).selectAll("legend").data(cUnique);
        legend.join("circle").attr("cx", 0).attr("cy", function (_, i) {
          return i * 20 * 1.1;
        }).attr("r", 10).attr("fill", function (d) {
          return cScale(d);
        }).on("mouseover", highlightGroup).on("mouseleave", noHighlight);
        legend.join("text").attr("x", 20).attr("y", function (_, i) {
          return i * 20 * 1.1 + 4;
        }).attr("text-anchor", "start").style("font-size", "12px").style("font-weight", 300).text(function (d) {
          return d;
        }).on("mouseover", highlightGroup).on("mouseleave", noHighlight);
      }

      if (enableAnimation) {
        bubbles.selectAll("circle").data(I).transition().duration(animationTime).attr("r", function (i) {
          return zScale(z[i]);
        });
      } else {
        bubbles.selectAll("circle").data(I).attr("r", function (i) {
          return zScale(z[i]);
        });
      }

      var tooltip = svg.append("g").attr("pointer-events", "none");

      function showTooltip(_, i) {
        tooltip.style("display", null);
        if (xType === "scaleBand") tooltip.attr("transform", "translate(".concat(xScale(x[i]) + xScale.bandwidth() / 2, ", ").concat(yScale(y[i]) - zScale(z[i]) - 10, ")"));else if (xType === "scaleLinear") tooltip.attr("transform", "translate(".concat(xScale(x[i]), ", ").concat(yScale(y[i]) - zScale(z[i]) - 10, ")"));
        var path = tooltip.selectAll("path").data([,]).join("path").attr("fill", "rgba(250, 250, 250, 0.8)").attr("stroke", "rgba(224, 224, 224, 1)").attr("color", "black");
        var text = tooltip.selectAll("text").data([,]).join("text").attr("id", "tooltip-text").style("font-size", fontSize).call(function (text) {
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

      function hideTooltip() {
        tooltip.style("display", "none");
      }
    }
  }]);

  return D3BubbleChart;
}();

;