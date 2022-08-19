"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DonutChart = void 0;

var _react = _interopRequireDefault(require("react"));

var d3 = _interopRequireWildcard(require("d3"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _excluded = ["data"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var DonutChart = function (_React$Component) {
  _inherits(DonutChart, _React$Component);

  var _super = _createSuper(DonutChart);

  function DonutChart(props) {
    _classCallCheck(this, DonutChart);

    return _super.call(this, props);
  }

  _createClass(DonutChart, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          data = _this$props.data,
          attr = _objectWithoutProperties(_this$props, _excluded);

      var element = this.element,
          donut = new D3DonutChart(element);
      donut.render(data, attr);
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

  return DonutChart;
}(_react["default"].Component);

exports.DonutChart = DonutChart;

_defineProperty(DonutChart, "propTypes", {
  data: _propTypes["default"].array.isRequired,
  getName: _propTypes["default"].func,
  getValue: _propTypes["default"].func,
  width: _propTypes["default"].number,
  height: _propTypes["default"].number,
  nameDomain: _propTypes["default"].arrayOf(_propTypes["default"].string),
  color: _propTypes["default"].arrayOf(_propTypes["default"].string),
  chartTitleText: _propTypes["default"].string,
  format: _propTypes["default"].string,
  tooltipTitle: _propTypes["default"].func,
  textSize: _propTypes["default"].number,
  marginTop: _propTypes["default"].number,
  marginRight: _propTypes["default"].number,
  marginBottom: _propTypes["default"].number,
  marginLeft: _propTypes["default"].number,
  innerRadius: _propTypes["default"].number,
  outerRadius: _propTypes["default"].number,
  labelRadius: _propTypes["default"].number,
  stroke: _propTypes["default"].string,
  strokeWidth: _propTypes["default"].number,
  strokeLinejoin: _propTypes["default"].string,
  pieLabelStrokeColor: _propTypes["default"].string,
  pieLabelStrokeWidth: _propTypes["default"].number,
  padAngle: _propTypes["default"].number,
  animationTime: _propTypes["default"].number,
  enableAnimation: _propTypes["default"].bool,
  enablePieLabel: _propTypes["default"].bool,
  enableLegend: _propTypes["default"].bool
});

_defineProperty(DonutChart, "defaultProps", {
  getName: function getName(d) {
    return d.name;
  },
  getValue: function getValue(d) {
    return d.value;
  },
  width: 500,
  height: 300,
  nameDomain: undefined,
  color: undefined,
  chartTitleText: "",
  format: ",.0f",
  tooltipTitle: undefined,
  textSize: undefined,
  marginTop: 40,
  marginRight: 0,
  marginBottom: 40,
  marginLeft: 0,
  innerRadius: undefined,
  outerRadius: undefined,
  labelRadius: undefined,
  stroke: undefined,
  strokeWidth: 2,
  strokeLinejoin: "round",
  pieLabelStrokeColor: "black",
  pieLabelStrokeWidth: 1,
  padAngle: undefined,
  animationTime: 2000,
  enableAnimation: true,
  enablePieLabel: true,
  enableLegend: true
});

var D3DonutChart = function () {
  function D3DonutChart(element) {
    _classCallCheck(this, D3DonutChart);

    this.svg = d3.select(element);
  }

  _createClass(D3DonutChart, [{
    key: "render",
    value: function render(data, attr) {
      var getName = attr.getName,
          getValue = attr.getValue,
          width = attr.width,
          height = attr.height,
          nameDomain = attr.nameDomain,
          color = attr.color,
          format = attr.format,
          tooltipTitle = attr.tooltipTitle,
          innerRadius = attr.innerRadius,
          outerRadius = attr.outerRadius,
          labelRadius = attr.labelRadius,
          stroke = attr.stroke,
          strokeWidth = attr.strokeWidth,
          strokeLinejoin = attr.strokeLinejoin,
          padAngle = attr.padAngle,
          chartTitleText = attr.chartTitleText,
          animationTime = attr.animationTime,
          enableAnimation = attr.enableAnimation,
          textSize = attr.textSize,
          pieLabelStrokeColor = attr.pieLabelStrokeColor,
          pieLabelStrokeWidth = attr.pieLabelStrokeWidth,
          enablePieLabel = attr.enablePieLabel,
          marginBottom = attr.marginBottom,
          marginLeft = attr.marginLeft,
          marginRight = attr.marginRight,
          marginTop = attr.marginTop,
          enableLegend = attr.enableLegend;
      if (outerRadius === undefined) outerRadius = Math.min(width - marginLeft - marginRight, height - marginTop - marginBottom) / 2;
      if (innerRadius === undefined) innerRadius = outerRadius * 0.6;
      if (labelRadius === undefined) labelRadius = outerRadius * 1.1;
      if (stroke === undefined) stroke = innerRadius > 0 ? "none" : "white";
      if (padAngle === undefined) padAngle = stroke === "none" ? 1 / outerRadius : 0;
      var name = d3.map(data, getName),
          value = d3.map(d3.map(data, getValue), function (d) {
        return Number(d);
      });
      if (nameDomain === undefined) nameDomain = new d3.InternSet(name.filter(function (d) {
        return d != "";
      }));
      var I = d3.range(name.length).filter(function (i) {
        return !isNaN(value[i]) && nameDomain.has(name[i]);
      });
      var pieDefined = new Array(I.length),
          fontSize = new String();
      if (textSize === undefined) fontSize = (width + height) / 70 + "px";else fontSize = textSize + "px";

      if (tooltipTitle === undefined) {
        tooltipTitle = function tooltipTitle(i) {
          return "".concat(name[i], "\n").concat(value[i]);
        };
      }

      var divData = d3.pie().padAngle(padAngle).sort(null).value(function (i) {
        return value[i];
      })(I);
      var currentDivData = divData;
      name.push("all");
      I.push(name.length - 1);
      if (color === undefined) color = d3.quantize(function (t) {
        return d3.interpolateSpectral(t * 0.8 + 0.1);
      }, name.length);
      var colorScale = d3.scaleOrdinal(name, color);
      var arcs = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius),
          arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius),
          pieCentroid = [marginLeft + (width - marginLeft - marginRight) / 2, marginTop + (height - marginTop - marginBottom) / 2];
      var svg = this.svg.attr("width", width).attr("height", height).attr("overflow", "visible").attr("viewBox", [0, 0, width, height]);
      var pie = svg.append("g").attr("transform", "translate(".concat(pieCentroid, ")")).attr("stroke", stroke).attr("strokeWidth", strokeWidth).attr("strokeLinejoin", strokeLinejoin);

      function createPie(data) {
        pie.selectAll("path").data(data).join("path").attr("class", function (d) {
          return "all pie_" + name[d.data];
        }).attr("fill", function (d) {
          return colorScale(name[d.data]);
        }).attr("d", arcs);
      }

      function pieAnimation(animationTime) {
        pie.selectAll("path").attr("fill", "rgba(0, 0, 0, 0)").transition().attrTween("d", function (d) {
          var f = d3.interpolate(d.startAngle, d.endAngle);
          return function (t) {
            d.endAngle = f(t);
            return arcs(d);
          };
        }).attr("fill", function (d) {
          return colorScale(name[d.data]);
        }).duration(animationTime);
      }

      function pieTransformAnimation(animationTime) {
        pie.selectAll("path").transition().attrTween("d", function (d) {
          var Start = d3.interpolate(currentDivData[d.data].startAngle, d.startAngle),
              End = d3.interpolate(currentDivData[d.data].endAngle, d.endAngle);
          currentDivData[d.data].startAngle = d.startAngle;
          currentDivData[d.data].endAngle = d.endAngle;
          return function (t) {
            d.startAngle = Start(t);
            d.endAngle = End(t);
            return arcs(d);
          };
        }).duration(animationTime);
      }

      createPie(divData);
      var pieLabel = svg.append("g").attr("text-anchor", "middle").attr("transform", "translate(".concat(pieCentroid, ")"));

      function pieLabelLine(data) {
        pieLabel.selectAll("polyline").data(data).join("polyline").transition().attr("class", function (d) {
          return "all pieLabelLine_" + name[d.data];
        }).attr("stroke", pieLabelStrokeColor).style("fill", "none").attr("stroke-width", pieLabelStrokeWidth).attr("points", function (d) {
          if (d.endAngle - d.startAngle < Number(fontSize.slice(0, -2)) * 4 / 100) return [];
          var p1 = arcs.centroid(d),
              p2 = arcLabel.centroid(d),
              p3 = arcLabel.centroid(d),
              midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
          p3[0] = labelRadius * 1.05 * (midAngle < Math.PI ? 1 : -1);
          pieDefined[d.data] = true;
          return [p1, p2, p3];
        }).duration(500);
      }

      function pieLabelText(data) {
        pieLabel.selectAll("text").data(data).join("text").style("font-size", fontSize).attr("text-anchor", function (d) {
          var midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
          return midAngle < Math.PI ? "start" : "end";
        }).attr("class", function (d) {
          return "all pieLabelText_" + name[d.data];
        }).attr("transform", function (d) {
          var p = arcLabel.centroid(d),
              midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
          p[0] = labelRadius * 1.2 * (midAngle < Math.PI ? 1 : -1);
          return "translate(".concat(p, ")");
        });
      }

      function pieLabelTspan() {
        pieLabel.selectAll("text").selectAll("tspan").data(function (d) {
          var lines = "".concat(tooltipTitle(d.data)).split(/\n/);
          return d.endAngle - d.startAngle > Number(fontSize.slice(0, -2)) * 4 / 100 ? lines : lines.slice(0, 0);
        }).join("tspan").attr("x", 0).attr("y", function (_, i) {
          return "".concat(i * 1.1, "em");
        }).attr("font-weight", function (_, i) {
          return i ? null : "bold";
        }).text(function (d) {
          return d;
        });
      }

      if (enablePieLabel) {
        pieLabelLine(divData);
        pieLabelText(divData);
        pieLabelTspan();
      }

      var chartTitle = svg.append("g");
      chartTitle.call(function (g) {
        return g.append("text").attr("x", marginLeft + (width - marginRight - marginLeft) / 2).attr("y", marginTop / 2).attr("fill", "black").style("font-size", "20px").style("font-weight", 550).attr("text-anchor", "middle").text(chartTitleText);
      });

      if (enableAnimation) {
        pieAnimation(animationTime);

        if (enablePieLabel) {
          pieLabel.selectAll("polyline").attr("stroke-width", 0).transition().attr("stroke-width", 1).duration(animationTime);
          pieLabel.selectAll("tspan").transition().textTween(function (d) {
            if (isNaN(Number(d))) {
              return function (t) {
                return d;
              };
            }

            var formatValue = d3.format(format);
            var f = d3.interpolate(0, d);
            return function (t) {
              return formatValue(f(t));
            };
          }).duration(animationTime);
        }
      }

      var tooltip = svg.append("g").attr("pointer-events", "none");

      function showTooltip(_, d) {
        var p = arcs.centroid(d);
        tooltip.style("display", null);
        tooltip.attr("transform", "translate(".concat(p[0] + pieCentroid[0], ", ").concat(p[1] + pieCentroid[1] - 10, ")"));
        pieLabel.select(".pieLabelText_" + name[d.data]).style("opacity", 0);
        pieLabel.select(".pieLabelLine_" + name[d.data]).style("opacity", 0);
        var path = tooltip.selectAll("path").data([,]).join("path").attr("fill", "rgba(250, 250, 250, 0.8)").attr("stroke", "rgba(224, 224, 224, 1)").attr("color", "black");
        var text = tooltip.selectAll("text").data([,]).join("text").attr("id", "tooltip-text").style("font-size", fontSize).call(function (text) {
          return text.selectAll("tspan").data("".concat(tooltipTitle(d.data)).split(/\n/)).join("tspan").attr("x", 0).attr("y", function (_, i) {
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
        pieLabel.select(".pieLabelText_" + name[d.data]).style("opacity", 1);
        pieLabel.select(".pieLabelLine_" + name[d.data]).style("opacity", 1);
      }

      function setToolTop() {
        pie.selectAll("path").on("mouseover.tooltip", showTooltip).on("mouseleave.tooltip", hideTooltip);
      }

      setTimeout(function () {
        setToolTop();
      }, animationTime);

      if (enableLegend) {
        var highlight = function highlight(_, i) {
          if (!(name[i] === "all")) {
            pie.selectAll(".all").style("opacity", 0.2);
            pieLabel.selectAll(".all").style("opacity", 0.2);
            pie.select(".pie_" + name[i]).style("opacity", 1);
            pieLabel.select(".pieLabelText_" + name[i]).style("opacity", 1);
            pieLabel.select(".pieLabelLine_" + name[i]).style("opacity", 1);
          }
        };

        var noHighlight = function noHighlight() {
          pie.selectAll(".all").style("opacity", 1);
          pieLabel.selectAll(".all").style("opacity", 1);
        };

        var selectOne = function selectOne(_, i) {
          noHighlight();
          pieDefined[i] = !pieDefined[i];
          if (pieDefined[i] === false) legend.selectAll(".legend_" + name[i]).style("opacity", 0.2);else legend.selectAll(".legend_" + name[i]).style("opacity", 1);
          var newDivData = d3.pie().padAngle(padAngle).sort(null).value(function (i) {
            return value[i];
          })(I.slice(0, -1).filter(function (i) {
            return pieDefined[i] === true;
          }));
          createPie(newDivData);
          pieTransformAnimation(500);
          pieLabelLine(newDivData);
          pieLabelText(newDivData);
          pieLabelTspan();

          if (i > 0 && pieDefined[i] === true) {
            currentDivData[i].startAngle = currentDivData[i - 1].endAngle;
            currentDivData[i].endAngle = currentDivData[i - 1].endAngle;
          } else if (i == 0 && pieDefined[i] === true) {
            currentDivData[i].startAngle = 0;
            currentDivData[i].endAngle = 0;
          }

          setTimeout(function () {
            setToolTop();
          }, 500);
        };

        var selectAll = function selectAll() {
          pieDefined.map(function (_, i) {
            return pieDefined[i] = true;
          });
          legend.selectAll(".all").style("opacity", 1);
          var newDivData = d3.pie().padAngle(padAngle).sort(null).value(function (i) {
            return value[i];
          })(I.slice(0, -1).filter(function (i) {
            return pieDefined[i] === true;
          }));
          createPie(newDivData);
          pieTransformAnimation(500);
          pieLabelLine(newDivData);
          pieLabelText(newDivData);
          pieLabelTspan();
          setTimeout(function () {
            setToolTop();
          }, 500);
        };

        var legend = svg.append("g").attr("transform", "translate(".concat(width - marginRight + 25 + 20, ", ").concat(marginTop, ")"));
        legend.selectAll("circle").data(I).join("circle").style("cursor", "pointer").attr("class", function (i) {
          return "all legend_" + name[i];
        }).attr("cx", 0).attr("cy", function (_, i) {
          return i * 20 * 1.1;
        }).attr("r", 10).attr("fill", function (i) {
          return colorScale(name[i]);
        });
        legend.selectAll("text").data(I).join("text").attr("class", function (i) {
          return "all legend_" + name[i];
        }).attr("x", 20).attr("y", function (_, i) {
          return i * 20 * 1.1 + 4;
        }).attr("text-anchor", "start").style("font-size", "12px").style("font-weight", 300).text(function (i) {
          return name[i];
        });
        setTimeout(function () {
          divData.map(function (d) {
            legend.select(".legend_" + name[d.data]).on("mouseover", highlight).on("mouseleave", noHighlight).on("click", selectOne);
          });
          legend.select(".legend_all").on("click", selectAll);
        }, animationTime);
      }
    }
  }]);

  return D3DonutChart;
}();