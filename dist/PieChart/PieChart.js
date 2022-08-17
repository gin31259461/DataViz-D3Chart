"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PieChart = void 0;

var _react = _interopRequireWildcard(require("react"));

var d3 = _interopRequireWildcard(require("d3"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _excluded = ["data"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

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

var PieChart = function (_Component) {
  _inherits(PieChart, _Component);

  var _super = _createSuper(PieChart);

  function PieChart(props) {
    _classCallCheck(this, PieChart);

    return _super.call(this, props);
  }

  _createClass(PieChart, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          data = _this$props.data,
          attr = _objectWithoutProperties(_this$props, _excluded);

      var element = this.element,
          pie = new D3PieChart(element);
      pie.render(data, attr);
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

  return PieChart;
}(_react.Component);

exports.PieChart = PieChart;

_defineProperty(PieChart, "propTypes", {
  data: _propTypes["default"].array.isRequired,
  getName: _propTypes["default"].func,
  getValue: _propTypes["default"].func,
  getDetail: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].arrayOf(_propTypes["default"].string)]),
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
  padAngle: _propTypes["default"].number,
  animationTime: _propTypes["default"].number,
  enableAnimation: _propTypes["default"].bool,
  enablePieLabel: _propTypes["default"].bool,
  enableLegend: _propTypes["default"].bool
});

_defineProperty(PieChart, "defaultProps", {
  getName: function getName(d) {
    return d.name;
  },
  getValue: function getValue(d) {
    return d.value;
  },
  getDetail: function getDetail(d) {
    return d.detail;
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
  innerRadius: 0,
  outerRadius: undefined,
  labelRadius: undefined,
  stroke: undefined,
  strokeWidth: 2,
  strokeLinejoin: "round",
  padAngle: undefined,
  animationTime: 2000,
  enableAnimation: true,
  enablePieLabel: true,
  enableLegend: true
});

var D3PieChart = function () {
  function D3PieChart(element) {
    _classCallCheck(this, D3PieChart);

    this.svg = d3.select(element);
  }

  _createClass(D3PieChart, [{
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
          getDetail = attr.getDetail,
          textSize = attr.textSize,
          enablePieLabel = attr.enablePieLabel,
          marginBottom = attr.marginBottom,
          marginLeft = attr.marginLeft,
          marginRight = attr.marginRight,
          marginTop = attr.marginTop,
          enableLegend = attr.enableLegend;
      if (outerRadius === undefined) outerRadius = Math.min(width - marginLeft - marginRight, height - marginTop - marginBottom) / 2;
      if (labelRadius === undefined) labelRadius = innerRadius * 0.3 + outerRadius * 0.7;
      if (stroke === undefined) stroke = innerRadius > 0 ? "none" : "white";
      if (padAngle === undefined) padAngle = stroke === "none" ? 1 / outerRadius : 0;
      var name = d3.map(data, getName),
          value = d3.map(d3.map(data, getValue), function (d) {
        return Number(d);
      });
      var detail = undefined;
      if (typeof getDetail === "function") detail = d3.map(data, getDetail);else if (_typeof(getDetail) === "object") detail = getDetail;
      if (nameDomain === undefined) nameDomain = new d3.InternSet(name.filter(function (d) {
        return d != "";
      }));
      var I = d3.range(name.length).filter(function (i) {
        return !isNaN(value[i]) && nameDomain.has(name[i]);
      });
      var fontSize = new String();
      if (textSize === undefined) fontSize = (width + height) / 70 + "px";else fontSize = textSize + "px";

      if (tooltipTitle === undefined) {
        tooltipTitle = function tooltipTitle(i) {
          return "".concat(name[i], "\n").concat(value[i]);
        };
      }

      var divData = d3.pie().padAngle(padAngle).sort(null).value(function (i) {
        return value[i];
      })(I);
      name.push("all");
      I.push(name.length - 1);
      if (color === undefined) color = d3.quantize(function (t) {
        return d3.interpolateSpectral(t * 0.8 + 0.1);
      }, name.length);
      var colorScale = d3.scaleOrdinal(name, color);
      var arcs = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius),
          arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);
      var svg = this.svg.attr("width", width).attr("height", height).attr("overflow", "visible").attr("viewBox", [0, 0, width, height]);
      var pie = svg.append("g").attr("transform", "translate(".concat(marginLeft + (width - marginLeft - marginRight) / 2, ", ").concat(marginTop + (height - marginTop - marginBottom) / 2, ")"));
      pie.attr("stroke", stroke).attr("strokeWidth", strokeWidth).attr("strokeLinejoin", strokeLinejoin).selectAll("path").data(divData).join("path").attr("class", function (d) {
        return "all pie_" + name[d.data];
      }).attr("fill", function (d) {
        return colorScale(name[d.data]);
      }).attr("d", arcs);
      var pieLabel = svg.append("g").attr("text-anchor", "middle").attr("transform", "translate(".concat(marginLeft + (width - marginLeft - marginRight) / 2, ", ").concat(marginTop + (height - marginTop - marginBottom) / 2, ")"));

      if (enablePieLabel) {
        pieLabel.selectAll("text").data(divData).join("text").style("font-size", fontSize).attr("class", function (d) {
          return "all pieLabelText_" + name[d.data];
        }).attr("transform", function (d) {
          return "translate(".concat(arcLabel.centroid(d), ")");
        }).selectAll("tspan").data(function (d) {
          var lines = "".concat(tooltipTitle(d.data)).split(/\n/);
          return d.endAngle - d.startAngle > 0.25 && d3.max(lines.map(function (d) {
            return String(d).length;
          })) < outerRadius / fontSize.slice(0, -2) ? lines : lines.slice(0, 0);
        }).join("tspan").attr("x", 0).attr("y", function (_, i) {
          return "".concat(i * 1.1, "em");
        }).attr("font-weight", function (_, i) {
          return i ? null : "bold";
        }).text(function (d) {
          return d;
        });
      }

      var chartTitle = svg.append("g");
      chartTitle.call(function (g) {
        return g.append("text").attr("x", marginLeft + (width - marginRight - marginLeft) / 2).attr("y", marginTop / 2).attr("fill", "black").style("font-size", "20px").style("font-weight", 550).attr("text-anchor", "middle").text(chartTitleText);
      });

      if (enableAnimation) {
        pie.selectAll("path").attr("fill", "rgba(0, 0, 0, 0)").transition().attrTween("d", function (d) {
          var f = d3.interpolate(d.startAngle, d.endAngle);
          return function (t) {
            d.endAngle = f(t);
            return arcs(d);
          };
        }).attr("fill", function (d) {
          return colorScale(name[d.data]);
        }).duration(animationTime);

        if (enablePieLabel) {
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

      var selectedOne = false;
      var tooltip = svg.append("g").attr("pointer-events", "none");

      function showTooltip(_, d) {
        if (selectedOne) return;
        tooltip.style("display", null);
        var p = arcLabel.centroid(d);
        tooltip.attr("transform", "translate(".concat(p[0] + width / 2, ", ").concat(p[1] + height / 2, ")"));
        pieLabel.select(".pieLabelText_" + name[d.data]).style("opacity", 0);
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
      }

      function hoverPie(_, d) {
        if (!selectedOne) {
          var scale = 0.2;
          var hoverArc = d3.arc().innerRadius(innerRadius * scale).outerRadius(outerRadius * scale);
          pie.select(".pie_" + name[d.data]).transition().ease(d3.easeLinear).attr("transform", "translate(".concat(hoverArc.centroid(d), ")")).duration(500);
        }
      }

      function noHoverPie(_, d) {
        if (!selectedOne) {
          pie.select(".pie_" + name[d.data]).transition().ease(d3.easeLinear).attr("transform", "translate(0, 0)").duration(500);
        }
      }

      setTimeout(function () {
        pie.selectAll("path").on("mouseover.tooltip", showTooltip).on("mouseleave.tooltip", hideTooltip).on("mouseover.hover", hoverPie).on("mouseleave.hover", noHoverPie);
      }, animationTime);

      if (enableLegend) {
        var highlight = function highlight(_, i) {
          if (!(name[i] === "all") && !selectedOne) {
            pie.selectAll(".all").style("opacity", 0.2);
            pieLabel.selectAll(".all").style("opacity", 0.2);
            pie.select(".pie_" + name[i]).style("opacity", 1);
            pieLabel.select(".pieLabelText_" + name[i]).style("opacity", 1);
          }
        };

        var noHighlight = function noHighlight() {
          if (!selectedOne) {
            pie.selectAll(".all").style("opacity", 1);
            pieLabel.selectAll(".all").style("opacity", 1);
          }
        };

        var selectOne = function selectOne(_, i) {
          selectedOne = true;
          var scale = 1,
              newArc = d3.arc().innerRadius(innerRadius * scale).outerRadius(outerRadius * scale),
              deltaY = (outerRadius - innerRadius) * scale / 2,
              angle = divData[i],
              rotation = -1 * ((angle.startAngle + (angle.endAngle - angle.startAngle) / 2) * 180 / Math.PI),
              newFontSize = Number(fontSize.slice(0, -2)) * scale + "px";
          pie.selectAll(".all").transition().ease(d3.easeLinear).attr("transform", "translate(0, 0) rotate(0)").attr("d", arcs).style("opacity", 0.2).duration(250).transition().attr("d", null).duration(250);
          pieLabel.selectAll("text").transition().style("font-size", "0").duration(500);

          if (angle.endAngle - angle.startAngle < Math.PI) {
            pie.select(".pie_" + name[i]).transition().ease(d3.easeLinear).attr("transform", "translate(0, ".concat(deltaY, ") rotate(").concat(rotation, ")")).attr("d", newArc).style("opacity", 1).duration(500);
            pieLabel.select(".pieLabelText_" + name[i]).transition().attr("transform", "translate(0, 0)").style("font-size", newFontSize).style("opacity", 1).duration(500);
          } else if (angle.endAngle - angle.startAngle > Math.PI) {
            pie.select(".pie_" + name[i]).transition().ease(d3.easeLinear).attr("transform", "rotate(".concat(rotation, ")")).attr("d", newArc).style("opacity", 1).duration(500);
            pieLabel.select(".pieLabelText_" + name[i]).transition().attr("transform", "translate(0, ".concat(-deltaY, ")")).style("font-size", newFontSize).style("opacity", 1).duration(500);
          }

          if (!(detail === undefined)) {
            selectedDetail.select("text").style("font-size", 0).transition().style("font-size", newFontSize).text(detail[i]).duration(500);
          }
        };

        var selectAll = function selectAll() {
          pie.selectAll(".all").transition().ease(d3.easeLinear).attr("transform", "translate(0, 0) rotate(0)").style("opacity", 1).duration(250).transition().attr("d", arcs).duration(250);
          pieLabel.selectAll("text").transition().attr("transform", function (d) {
            return "translate(".concat(arcLabel.centroid(d), ")");
          }).style("font-size", fontSize).style("opacity", 1).duration(500);

          if (!(detail === undefined)) {
            selectedDetail.select("text").transition().style("font-size", 0).text("").duration(500);
          }

          setTimeout(function () {
            return selectedOne = false;
          }, 600);
        };

        var legend = svg.append("g").attr("transform", "translate(".concat(width - marginRight + 25 + 20, ", ").concat(marginTop, ")")).style("cursor", "pointer");
        legend.selectAll("circle").data(I).join("circle").attr("class", function (i) {
          return "legend_" + name[i];
        }).attr("cx", 0).attr("cy", function (_, i) {
          return i * 20 * 1.1;
        }).attr("r", 10).attr("fill", function (i) {
          return colorScale(name[i]);
        });
        legend.selectAll("text").data(I).join("text").attr("class", function (i) {
          return "legend_" + name[i];
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
        var selectedDetail = svg.append("g").attr("transform", "translate(".concat(marginLeft + (width - marginLeft - marginRight) / 2, ", ").concat(height - marginBottom / 2, ")"));
        selectedDetail.append("text").attr("text-anchor", "middle");
      }
    }
  }]);

  return D3PieChart;
}();