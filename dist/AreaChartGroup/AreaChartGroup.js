"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AreaChartGroup = void 0;

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

var AreaChartGroup = function (_Component) {
  _inherits(AreaChartGroup, _Component);

  var _super = _createSuper(AreaChartGroup);

  function AreaChartGroup(props) {
    _classCallCheck(this, AreaChartGroup);

    return _super.call(this, props);
  }

  _createClass(AreaChartGroup, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          data = _this$props.data,
          attr = _objectWithoutProperties(_this$props, _excluded);

      var element = this.element,
          area = new D3AreaChartGroup(element);
      area.render(data, attr);
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

  return AreaChartGroup;
}(_react.Component);

exports.AreaChartGroup = AreaChartGroup;

_defineProperty(AreaChartGroup, "propTypes", {
  data: _propTypes["default"].array.isRequired,
  getX: _propTypes["default"].func,
  keysOfGroups: _propTypes["default"].array,
  width: _propTypes["default"].number,
  height: _propTypes["default"].number,
  chartTitleText: _propTypes["default"].string,
  tooltipTitle: _propTypes["default"].func,
  xAxisText: _propTypes["default"].string,
  yAxisText: _propTypes["default"].string,
  timeParse: _propTypes["default"].string,
  formatTimeType: _propTypes["default"].func,
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
  strokeColor: _propTypes["default"].oneOfType[(_propTypes["default"].func, _propTypes["default"].arrayOf(_propTypes["default"].string))],
  areaColor: _propTypes["default"].oneOfType[(_propTypes["default"].func, _propTypes["default"].arrayOf(_propTypes["default"].string))],
  areaOpacity: _propTypes["default"].number,
  strokeLinecap: _propTypes["default"].string,
  strokeLinejoin: _propTypes["default"].string,
  strokeWidth: _propTypes["default"].number,
  strokeOpacity: _propTypes["default"].number,
  animationTime: _propTypes["default"].number,
  enableAnimation: _propTypes["default"].bool,
  enableLineNode: _propTypes["default"].bool,
  enableTooltip: _propTypes["default"].bool,
  enableXAxis: _propTypes["default"].bool,
  enableYAxis: _propTypes["default"].bool,
  enableLinePath: _propTypes["default"].bool,
  enableLegend: _propTypes["default"].bool
});

_defineProperty(AreaChartGroup, "defaultProps", {
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
  timeParse: "%Y-%m-%d",
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
  strokeColor: undefined,
  areaColor: undefined,
  areaOpacity: 0.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: 1.5,
  strokeOpacity: 1,
  animationTime: 1000,
  enableAnimation: true,
  enableLineNode: true,
  enableTooltip: true,
  enableXAxis: true,
  enableYAxis: true,
  enableLinePath: true,
  enableLegend: true
});

;

var D3AreaChartGroup = function () {
  function D3AreaChartGroup(element) {
    _classCallCheck(this, D3AreaChartGroup);

    this.svg = d3.select(element);
  }

  _createClass(D3AreaChartGroup, [{
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
          timeParse = attr.timeParse,
          marginTop = attr.marginTop,
          marginRight = attr.marginRight,
          marginBottom = attr.marginBottom,
          marginLeft = attr.marginLeft,
          xDomain = attr.xDomain,
          yDomain = attr.yDomain,
          xRange = attr.xRange,
          yRange = attr.yRange,
          lineNodeRadius = attr.lineNodeRadius,
          strokeColor = attr.strokeColor,
          areaColor = attr.areaColor,
          xType = attr.xType,
          yType = attr.yType,
          formatTimeType = attr.formatTimeType,
          curveType = attr.curveType,
          enableLinePath = attr.enableLinePath,
          areaOpacity = attr.areaOpacity,
          strokeLinecap = attr.strokeLinecap,
          strokeLinejoin = attr.strokeLinejoin,
          strokeWidth = attr.strokeWidth,
          strokeOpacity = attr.strokeOpacity,
          animationTime = attr.animationTime,
          enableAnimation = attr.enableAnimation,
          enableLineNode = attr.enableLineNode,
          enableTooltip = attr.enableTooltip,
          enableXAxis = attr.enableXAxis,
          enableYAxis = attr.enableYAxis,
          enableLegend = attr.enableLegend;
      if (xRange === undefined) xRange = [marginLeft, width - marginRight];
      if (yRange === undefined) yRange = [height - marginBottom, marginTop];
      var x = [];
      if (xType === d3.scaleTime) x = d3.map(d3.map(data, getX), function (d) {
        return formatTimeType(timeParse)(d);
      });
      var groupData = keysOfGroups.map(function (k) {
        var newData = [];
        d3.map(data, function (d, i) {
          newData.push({
            "x": x[i],
            "y": d[k],
            "group": k,
            "defined": !isNaN(x[i]) && !isNaN(d[k])
          });
        });
        return {
          "group": k,
          "value": newData
        };
      });
      keysOfGroups.push("all");
      if (xDomain === undefined) xDomain = d3.extent(x);
      if (yDomain === undefined) yDomain = [0, d3.max(data, function (d) {
        return d3.max(keysOfGroups, function (k) {
          return d[k];
        });
      }) * 1.2];
      var xScale = xType(xDomain, xRange),
          yScale = yType(yDomain, yRange),
          fontSize = (width + height) / 100 + "px",
          xAxisType = d3.axisBottom(xScale).ticks(width / 80).tickSizeOuter(0),
          yAxisType = d3.axisLeft(yScale).ticks(height / 40);
      var line = d3.line().defined(function (d) {
        return d.defined;
      }).curve(curveType).x(function (d) {
        return xScale(d.x);
      }).y(function (d) {
        return yScale(d.y);
      }),
          line0 = d3.line().x(function (d) {
        return xScale(d.x);
      }).y(height - marginBottom),
          area0 = d3.area().x(function (d) {
        return xScale(d.x);
      }).y0(height - marginBottom).y(height - marginBottom),
          area = d3.area().defined(function (d) {
        return d.defined;
      }).curve(curveType).x(function (d) {
        return xScale(d.x);
      }).y0(yScale(0)).y1(function (d) {
        return yScale(d.y);
      });
      if (tooltipTitle === undefined) tooltipTitle = function tooltipTitle(d) {
        return "group: ".concat(d.group, "\nx: ").concat(d3.timeFormat("%Y-%m-%d")(d.x), "\ny: ").concat(d.y);
      };
      var svg = this.svg.attr("width", width).attr("height", height).attr("viewBox", [0, 0, width, height]).attr("overflow", "visible");

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
      }

      var chartTitle = svg.append("g");
      chartTitle.call(function (g) {
        return g.append("text").attr("x", marginLeft + (width - marginRight - marginLeft) / 2).attr("y", marginTop / 2).attr("fill", "black").style("font-size", "20px").style("font-weight", 550).attr("text-anchor", "middle").text(chartTitleText);
      });
      if (areaColor === undefined) areaColor = d3.quantize(function (t) {
        return d3.interpolateSpectral(t * 0.8 + 0.1);
      }, keysOfGroups.length);
      if (strokeColor === undefined) strokeColor = areaColor;
      var areaColorScale = d3.scaleOrdinal(keysOfGroups, areaColor),
          strokeColorScale = d3.scaleOrdinal(keysOfGroups, strokeColor);
      var areaPath = svg.append("g"),
          linePath = svg.append("g"),
          lineNode = svg.append("g");

      if (enableLinePath) {
        linePath.selectAll("path").data(groupData).join("path").attr("class", function (d) {
          return "all _" + d.group;
        }).attr("fill", "none").attr("stroke", function (d) {
          return strokeColorScale(d.group);
        }).attr("stroke-width", strokeWidth).attr("stroke-linecap", strokeLinecap).attr("stroke-linejoin", strokeLinejoin).attr("stroke-opacity", strokeOpacity).attr("d", function (d) {
          return line(d.value);
        });
      }

      areaPath.selectAll("path").data(groupData).join("path").attr("class", function (d) {
        return "all _" + d.group;
      }).attr("fill", function (d) {
        return areaColorScale(d.group);
      }).style("opacity", areaOpacity).attr("d", function (d) {
        return area(d.value);
      });

      if (enableLineNode) {
        var createNode = lineNode.selectAll("circle");
        groupData.map(function (d, i) {
          createNode.data(d.value).join("circle").attr("class", "all _" + d.group).attr("cx", function (d) {
            return xScale(d.x);
          }).attr("cy", function (d) {
            return yScale(d.y);
          }).attr("r", lineNodeRadius).attr("fill", "white").attr("stroke", strokeColorScale(d.group)).attr("stroke-width", strokeWidth);
        });
      }

      if (enableTooltip) {
        lineNode.selectAll("circle").style("cursor", "pointer").on("mouseover", showTooltip).on("mouseleave", hideTooltip);
      }

      if (enableAnimation) {
        areaPath.selectAll("path").attr("fill", "rgba(0, 0, 0, 0)").attr("d", function (d) {
          return area0(d.value);
        }).transition().attr("fill", function (d) {
          return areaColorScale(d.group);
        }).attr("d", function (d) {
          return area(d.value);
        }).duration(animationTime);

        if (enableLinePath) {
          var pathLenth = linePath.selectAll("path").nodes().map(function (node) {
            return node.getTotalLength();
          });
          linePath.selectAll("path").data(pathLenth).attr("stroke-dasharray", function (d) {
            return d + " " + d;
          }).attr("stroke-dashoffset", function (d) {
            return d;
          }).transition().ease(d3.easeLinear).attr("stroke-dashoffset", 0).duration(animationTime).delay(animationTime);
        }

        if (enableLineNode) {
          lineNode.selectAll("circle").style("opacity", 0).transition().ease(d3.easeLinear).style("opacity", 1).duration(animationTime).delay(animationTime);
        }
      }

      var tooltip = svg.append("g").style("pointer-events", "none");

      function showTooltip(_, d) {
        tooltip.style("display", null);
        tooltip.attr("transform", "translate(".concat(xScale(d.x), ", ").concat(yScale(d.y) - 10, ")"));
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
        tooltip.selectAll("path").attr("d", null);
        text.attr("transform", "translate(".concat(-textBox.width / 2, ", ").concat(-textBox.height + 5, ")"));
        path.attr("d", "M".concat(-textBox.width / 2 - 10, ",5H-5l5,5l5,-5H").concat(textBox.width / 2 + 10, "v").concat(-textBox.height - 20, "h-").concat(textBox.width + 20, "z"));
      }

      function hideTooltip() {
        tooltip.style("display", "none");
      }

      var selectedOne = false;

      if (enableLegend) {
        var legend = svg.append("g").attr("transform", "translate(".concat(width - marginRight + 25 + 20, ", ").concat(marginTop, ")")).style("cursor", "pointer");
        legend.selectAll("circle").data(keysOfGroups).join("circle").attr("class", function (d) {
          return "legend_" + d;
        }).attr("cx", 0).attr("cy", function (_, i) {
          return i * 20 * 1.1;
        }).attr("r", 10).attr("fill", function (d) {
          return areaColorScale(d);
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
        }, animationTime * 2);
      }

      function highlight(_, d) {
        if (!(d === "all") && !selectedOne) {
          linePath.selectAll(".all").style("opacity", 0.2);
          lineNode.selectAll(".all").style("opacity", 0.2);
          areaPath.selectAll(".all").style("opacity", 0.2);
          linePath.selectAll("._" + d).style("opacity", strokeOpacity);
          lineNode.selectAll("._" + d).style("opacity", strokeOpacity);
          areaPath.selectAll("._" + d).style("opacity", areaOpacity);
        }
      }

      function noHighlight() {
        linePath.selectAll(".all").style("opacity", strokeOpacity);
        lineNode.selectAll(".all").style("opacity", strokeOpacity);
        areaPath.selectAll(".all").style("opacity", areaOpacity);
      }

      function selectOne(_, d) {
        selectedOne = true;
        groupData.map(function (data) {
          if (!(data.group === d) && !(d === "all")) {
            linePath.select("._" + data.group).transition().attr("d", line0(data.value)).duration(500);
            lineNode.selectAll("._" + data.group).transition().attr("cy", yScale(0)).attr("r", 0).duration(500);
            areaPath.select("._" + data.group).transition().attr("d", area0(data.value)).duration(500);
          } else if (data.group === d) {
            linePath.select("._" + data.group).transition().attr("d", line(data.value)).duration(500);
            lineNode.selectAll("._" + data.group).transition().attr("cy", function (d) {
              return yScale(d.y);
            }).attr("r", lineNodeRadius).duration(500);
            areaPath.select("._" + data.group).transition().attr("d", area(data.value)).duration(500);
          }
        });
      }

      function selectAll() {
        selectedOne = false;
        linePath.selectAll(".all").data(groupData).transition().attr("d", function (d) {
          return line(d.value);
        }).duration(500);
        lineNode.selectAll(".all").transition().attr("cy", function (d) {
          return yScale(d.y);
        }).attr("r", lineNodeRadius).duration(500);
        areaPath.selectAll(".all").transition().attr("d", function (d) {
          return area(d.value);
        }).duration(500);
      }
    }
  }]);

  return D3AreaChartGroup;
}();

;