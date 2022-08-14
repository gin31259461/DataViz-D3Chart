"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BarChartStacked = void 0;

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

var BarChartStacked = function (_Component) {
  _inherits(BarChartStacked, _Component);

  var _super = _createSuper(BarChartStacked);

  function BarChartStacked(props) {
    _classCallCheck(this, BarChartStacked);

    return _super.call(this, props);
  }

  _createClass(BarChartStacked, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          data = _this$props.data,
          attr = _objectWithoutProperties(_this$props, _excluded);

      var element = this.element,
          bar = new D3BarChartStacked(element);
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

  return BarChartStacked;
}(_react.Component);

exports.BarChartStacked = BarChartStacked;

_defineProperty(BarChartStacked, "propTypes", {
  data: _propTypes["default"].array.isRequired,
  getX: _propTypes["default"].func,
  keysOfGroups: _propTypes["default"].arrayOf(_propTypes["default"].string),
  width: _propTypes["default"].number,
  height: _propTypes["default"].number,
  chartTitleText: _propTypes["default"].string,
  tooltipTitle: _propTypes["default"].func,
  xAxisText: _propTypes["default"].string,
  yAxisText: _propTypes["default"].string,
  xAxisTicksTextRotation: _propTypes["default"].number,
  xPadding: _propTypes["default"].number,
  marginTop: _propTypes["default"].number,
  marginRight: _propTypes["default"].number,
  marginBottom: _propTypes["default"].number,
  marginLeft: _propTypes["default"].number,
  color: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].arrayOf(_propTypes["default"].string)]),
  xDomain: [_propTypes["default"].number, _propTypes["default"].number],
  yDomain: [_propTypes["default"].number, _propTypes["default"].number],
  xRange: [_propTypes["default"].number, _propTypes["default"].number],
  yRange: [_propTypes["default"].number, _propTypes["default"].number],
  animationTime: _propTypes["default"].number,
  enableAnimation: _propTypes["default"].bool,
  enableBarValue: _propTypes["default"].bool,
  enableXAxis: _propTypes["default"].bool,
  enableYAxis: _propTypes["default"].bool,
  enableLegend: _propTypes["default"].bool
});

_defineProperty(BarChartStacked, "defaultProps", {
  getX: function getX(d) {
    return d.x;
  },
  keysOfGroups: ["y"],
  width: 500,
  height: 300,
  chartTitleText: "",
  tooltipTitle: undefined,
  xAxisText: "",
  yAxisText: "",
  xAxisTicksTextRotation: 0,
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
  enableYAxis: true,
  enableLegend: true
});

;

var D3BarChartStacked = function () {
  function D3BarChartStacked(element) {
    _classCallCheck(this, D3BarChartStacked);

    this.svg = d3.select(element);
  }

  _createClass(D3BarChartStacked, [{
    key: "render",
    value: function render(data, attr) {
      var getX = attr.getX,
          keysOfGroups = attr.keysOfGroups,
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
          enableLegend = attr.enableLegend,
          xAxisTicksTextRotation = attr.xAxisTicksTextRotation,
          enableAnimation = attr.enableAnimation,
          enableBarValue = attr.enableBarValue,
          enableXAxis = attr.enableXAxis,
          enableYAxis = attr.enableYAxis;
      if (xRange === undefined) xRange = [marginLeft, width - marginRight];
      if (yRange === undefined) yRange = [height - marginBottom, marginTop];
      var x = d3.map(data, getX);
      var groupData = keysOfGroups.map(function (k) {
        var newData = [];
        d3.map(data, function (d, i) {
          newData.push({
            "x": x[i],
            "y": Number(d[k]),
            "stackedY": Number(d[k]),
            "group": k
          });
        });
        return {
          "group": k,
          "value": newData
        };
      });
      keysOfGroups.push("all");
      groupData.map(function (g, i) {
        g.value.map(function (_, k) {
          if (i >= 1) groupData[i].value[k].stackedY += groupData[i - 1].value[k].stackedY;
        });
      });
      if (xDomain === undefined) xDomain = x.filter(function (d) {
        return d != "";
      });
      if (yDomain === undefined) yDomain = [0, d3.max(data, function (d) {
        return d3.sum(d3.map(keysOfGroups, function (k) {
          return d[k];
        }));
      }) * 1.2];
      xDomain = new d3.InternSet(xDomain);
      var xScale = d3.scaleBand(xDomain, xRange).padding(xPadding),
          yScale = d3.scaleLinear(yDomain, yRange),
          xAxisType = d3.axisBottom(xScale).tickSizeOuter(0),
          yAxisType = d3.axisLeft(yScale).ticks(height / 40),
          fontSize = (width + height) / 100 + "px";
      if (color === undefined) color = d3.quantize(function (t) {
        return d3.interpolateSpectral(t * 0.8 + 0.1);
      }, keysOfGroups.length);
      var colorScale = d3.scaleOrdinal(keysOfGroups, color);
      if (tooltipTitle === undefined) tooltipTitle = function tooltipTitle(d) {
        return "group: ".concat(d.group, "\nx: ").concat(d.x, "\ny: ").concat(d.y);
      };
      var svg = this.svg.attr("width", width).attr("height", height).attr("viewBox", [0, 0, width, height]).attr("overflow", "visible");

      function yAxisAttr() {
        yAxis.call(function (g) {
          return g.select(".domain").remove();
        }).call(function (g) {
          return g.selectAll(".tick line").clone().attr('x2', width - marginLeft - marginRight).attr("stroke-opacity", 0.1);
        }).call(function (g) {
          return g.append("text").attr("x", -20).attr("y", marginTop - 25).attr("fill", "black").attr("text-anchor", "start").style("font-size", "12px").text(yAxisText);
        });
      }

      var yAxis = svg.append("g").attr("transform", "translate(".concat(marginLeft, ", 0)"));

      if (enableYAxis) {
        yAxis.call(yAxisType);
        yAxisAttr();
      }

      if (enableXAxis) {
        var xAxis = svg.append("g").attr("transform", "translate(0, ".concat(height - marginBottom, ")"));
        xAxis.call(xAxisType);
        if (xAxisTicksTextRotation != 0) xAxis.selectAll("text").attr("text-anchor", "start").attr("transform", function (d) {
          return "rotate(".concat(xAxisTicksTextRotation, ")");
        });
        xAxis.call(function (g) {
          return g.append("text").attr("x", width - marginRight + 25).attr("y", 15).attr("fill", "black").attr("style", "12px").text(xAxisText);
        });
      }

      var bar = svg.append("g"),
          barWidth = xScale.bandwidth() / 2,
          createBar = bar.selectAll("rect");
      var currentY = [];
      groupData[1].value.map(function (d) {
        return currentY.push(yScale(d.y));
      });
      groupData.map(function (d, i) {
        createBar.data(d.value).join("rect").attr("class", "all _" + d.group).attr("fill", function (d) {
          return colorScale(d.group);
        }).attr("height", function (d) {
          return yScale(0) - yScale(d.y);
        }).attr("width", barWidth).attr("x", function (d) {
          return xScale(d.x) + barWidth / 2;
        }).attr("y", function (d) {
          return yScale(d.stackedY);
        }).on("mouseover", showTooltip).on("mouseleave", hideTooltip);
      });
      var barValue = svg.append("g"),
          createBarValue = barValue.selectAll("text");

      if (enableBarValue) {
        groupData.map(function (d) {
          createBarValue.data(d.value).join("text").text(function (d) {
            return d.stackedY;
          }).attr("class", function (d) {
            return "all _" + d.x + " _" + d.group;
          }).style("font-size", fontSize).attr("fill", "none").attr("text-anchor", "middle").attr("x", function (d) {
            return xScale(d.x) + barWidth;
          }).attr("y", function (d) {
            return yScale(d.stackedY) - 2;
          });
        });
      }

      barValue.selectAll("._" + keysOfGroups[keysOfGroups.length - 2]).attr("fill", "black");
      var chartTitle = svg.append("g");
      chartTitle.call(function (g) {
        return g.append("text").attr("x", marginLeft + (width - marginRight - marginLeft) / 2).attr("y", marginTop / 2).attr("fill", "black").style("font-weight", 550).style("font-size", "20px").attr("text-anchor", "middle").text(chartTitleText);
      });

      if (enableAnimation) {
        bar.selectAll("rect").attr("y", height - marginBottom).attr("height", 0).attr("fill", "rgba(0, 0, 0, 0)").transition().attr("y", function (d) {
          return yScale(d.stackedY);
        }).attr("height", function (d) {
          return yScale(0) - yScale(d.y);
        }).attr("fill", function (d) {
          return colorScale(d.group);
        }).duration(animationTime);

        if (enableBarValue) {
          barValue.selectAll("text").transition().attrTween("y", function (d) {
            var f = d3.interpolate(yScale(0), yScale(d.stackedY) - 2);
            return function (t) {
              return f(t);
            };
          }).textTween(function (d) {
            var f = d3.interpolate(0, d.stackedY);
            return function (t) {
              return "".concat(d3.format(".0f")(f(t)));
            };
          }).duration(animationTime);
        }
      }

      var selectedOne = false;
      var tooltip = svg.append("g").attr("pointer-events", "none");

      function showTooltip(_, d) {
        var i = keysOfGroups.indexOf(d.group);
        tooltip.style("display", null);
        tooltip.attr("transform", "translate(".concat(xScale(d.x) + barWidth, ", ").concat(yScale(d.stackedY) - 10, ")"));
        barValue.select("._" + d.x).style("opacity", 0);
        var path = tooltip.selectAll("path").data([,]).join("path").attr("fill", "rgba(250, 250, 250, 0.8)").attr("stroke", "rgba(224, 224, 224, 1)").attr("color", "black");
        var text = tooltip.selectAll("text").data([,]).join("text").style("font-size", fontSize).call(function (text) {
          return text.selectAll("tspan").data("".concat(tooltipTitle(d)).split(/\n/)).join("tspan").attr("x", 0).attr("y", function (_, i) {
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

      function hideTooltip(_, d) {
        tooltip.style("display", "none");
        barValue.select("._" + d.x).style("opacity", 1);
      }

      if (enableLegend) {
        var legend = svg.append("g").attr("transform", "translate(".concat(width - marginRight + 25 + 20, ", ").concat(marginTop, ")")).style("cursor", "pointer");
        legend.selectAll("circle").data(keysOfGroups).join("circle").attr("class", function (d) {
          return "legend_" + d;
        }).attr("cx", 0).attr("cy", function (_, i) {
          return i * 20 * 1.1;
        }).attr("r", 10).attr("fill", function (d) {
          return colorScale(d);
        });
        legend.selectAll("text").data(keysOfGroups).join("text").attr("class", function (d) {
          return "legend_" + d;
        }).attr("x", 20).attr("y", function (_, i) {
          return i * 20 * 1.1 + 4;
        }).attr("text-anchor", "start").style("font-size", "12px").style("font-weight", 300).text(function (d) {
          return d;
        });
        setTimeout(function () {
          keysOfGroups.slice(0, -1).map(function (d) {
            legend.select(".legend_" + d).on("mouseover", highlight).on("mouseleave", noHighlight).on("click", selectOne);
          });
          legend.select(".legend_all").on("click", selectAll);
        }, animationTime);
      }

      function highlight(_, d) {
        if (!(d === "all") && !selectedOne) {
          bar.selectAll(".all").style("opacity", 0.2);
          barValue.selectAll(".all").style("opacity", 0.2);
          bar.selectAll("._" + d).style("opacity", 1);
        }
      }

      function noHighlight() {
        bar.selectAll(".all").style("opacity", 1);
        barValue.selectAll(".all").style("opacity", 1);
      }

      function selectOne(_, d) {
        selectedOne = true;
        groupData.map(function (data) {
          if (!(data.group === d) && !(d === "all")) {
            bar.selectAll("._" + data.group).transition().attr("height", 0).attr("width", barWidth).attr("x", function (d) {
              return xScale(d.x) + barWidth / 2;
            }).attr("y", height - marginBottom).attr("fill", "rgba(0, 0, 0, 0)").duration(500);
            barValue.selectAll("._" + data.group).transition().attr("x", function (d) {
              return xScale(d.x) + barWidth;
            }).attr("y", yScale(0)).style("fill", "none").duration(500);
          } else if (data.group === d) {
            var selectOneYScale = d3.scaleLinear([0, d3.max(data.value, function (d) {
              return d.y;
            }) * 1.2], yRange);
            yAxis.selectAll(".tick").remove();
            yAxis.transition().call(d3.axisLeft(selectOneYScale).ticks(height / 40)).duration(500);
            yAxisAttr();
            bar.selectAll("._" + data.group).transition().attr("height", function (d) {
              return selectOneYScale(0) - selectOneYScale(d.y);
            }).attr("width", xScale.bandwidth() / 2).attr("x", function (d) {
              return xScale(d.x) + barWidth / 2;
            }).attr("y", function (d) {
              return selectOneYScale(d.y);
            }).attr("fill", function (d) {
              return colorScale(d.group);
            }).duration(500);
            barValue.selectAll("._" + data.group).transition().text(function (d) {
              return d.y;
            }).attr("x", function (d) {
              return xScale(d.x) + barWidth;
            }).attr("y", function (d) {
              return selectOneYScale(d.y) - 2;
            }).style("fill", "black").duration(500);
          }
        });
      }

      function selectAll() {
        selectedOne = false;
        yAxis.selectAll(".tick").remove();
        yAxis.transition().call(yAxisType).duration(500);
        yAxisAttr();
        bar.selectAll(".all").transition().attr("height", function (d) {
          return yScale(0) - yScale(d.y);
        }).attr("width", barWidth).attr("x", function (d) {
          return xScale(d.x) + barWidth / 2;
        }).attr("y", function (d) {
          return yScale(d.stackedY);
        }).attr("fill", function (d) {
          return colorScale(d.group);
        }).duration(500);
        barValue.selectAll(".all").transition().attr("x", function (d) {
          return xScale(d.x) + barWidth;
        }).attr("y", function (d) {
          return yScale(d.stackedY) - 2;
        }).style("fill", "none").duration(500);
        barValue.selectAll("._" + keysOfGroups[keysOfGroups.length - 2]).transition().text(function (d) {
          return d.stackedY;
        }).attr("x", function (d) {
          return xScale(d.x) + barWidth;
        }).attr("y", function (d) {
          return yScale(d.stackedY) - 2;
        }).style("fill", "black").duration(500);
      }
    }
  }]);

  return D3BarChartStacked;
}();

;