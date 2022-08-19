"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BubbleChart = void 0;

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

var BubbleChart = function (_React$Component) {
  _inherits(BubbleChart, _React$Component);

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
}(_react["default"].Component);

exports.BubbleChart = BubbleChart;

_defineProperty(BubbleChart, "propTypes", {
  data: _propTypes["default"].array.isRequired,
  getName: _propTypes["default"].func,
  getValue: _propTypes["default"].func,
  getGroup: _propTypes["default"].func,
  groups: _propTypes["default"].array,
  padding: _propTypes["default"].number,
  fontSize: _propTypes["default"].string,
  width: _propTypes["default"].number,
  height: _propTypes["default"].number,
  chartTitleText: _propTypes["default"].string,
  tooltipTitle: _propTypes["default"].func,
  bubbleLabel: _propTypes["default"].func,
  marginTop: _propTypes["default"].number,
  marginRight: _propTypes["default"].number,
  marginBottom: _propTypes["default"].number,
  marginLeft: _propTypes["default"].number,
  color: _propTypes["default"].arrayOf(_propTypes["default"].string),
  stroke: _propTypes["default"].string,
  strokeWidth: _propTypes["default"].number,
  strokeOpacity: _propTypes["default"].number,
  fillOpacity: _propTypes["default"].number,
  animationTime: _propTypes["default"].number,
  enableAnimation: _propTypes["default"].bool,
  enableLegend: _propTypes["default"].bool
});

_defineProperty(BubbleChart, "defaultProps", {
  getName: function getName(d) {
    return d.name;
  },
  getValue: function getValue(d) {
    return d.value;
  },
  getGroup: undefined,
  groups: ["group1"],
  width: 500,
  height: 300,
  padding: 5,
  fontSize: undefined,
  chartTitleText: "",
  tooltipTitle: undefined,
  bubbleLabel: undefined,
  marginTop: 60,
  marginRight: 40,
  marginBottom: 0,
  marginLeft: 0,
  color: ["steelblue"],
  stroke: "black",
  strokeWidth: 0.5,
  strokeOpacity: 1,
  fillOpacity: 1,
  animationTime: 500,
  enableAnimation: true,
  enableLegend: true,
  enableTooltip: true
});

;

var D3BubbleChart = function () {
  function D3BubbleChart(element) {
    _classCallCheck(this, D3BubbleChart);

    this.svg = d3.select(element);
  }

  _createClass(D3BubbleChart, [{
    key: "render",
    value: function render(data, attr) {
      var getName = attr.getName,
          getValue = attr.getValue,
          getGroup = attr.getGroup,
          groups = attr.groups,
          width = attr.width,
          height = attr.height,
          padding = attr.padding,
          fontSize = attr.fontSize,
          chartTitleText = attr.chartTitleText,
          tooltipTitle = attr.tooltipTitle,
          bubbleLabel = attr.bubbleLabel,
          marginTop = attr.marginTop,
          marginRight = attr.marginRight,
          marginBottom = attr.marginBottom,
          marginLeft = attr.marginLeft,
          color = attr.color,
          stroke = attr.stroke,
          strokeWidth = attr.strokeWidth,
          strokeOpacity = attr.strokeOpacity,
          fillOpacity = attr.fillOpacity,
          animationTime = attr.animationTime,
          enableAnimation = attr.enableAnimation,
          enableLegend = attr.enableLegend;
      var name = d3.map(data, getName),
          value = d3.map(d3.map(data, getValue), function (d) {
        return Number(d);
      }),
          I = d3.range(name.length).filter(function (i) {
        return name[i] != "";
      });
      var group = [];

      if (getGroup === undefined) {
        group = new Array(name.length);
        group.map(function (d, i) {
          group[i] = groups[0];
        });
      } else {
        group = d3.map(data, getGroup);
        groups = new d3.InternSet(group);
        color = d3.quantize(function (t) {
          return d3.interpolateSpectral(t * 0.8 + 0.1);
        }, groups.size);
      }

      var colorScale = d3.scaleOrdinal(groups, color);
      if (fontSize === undefined) fontSize = (width + height) / 70 + "px";
      if (bubbleLabel === undefined) bubbleLabel = function bubbleLabel(i) {
        return [name[i], value[i]];
      };
      if (tooltipTitle === undefined) tooltipTitle = function tooltipTitle(i) {
        return "".concat(name[i], "\n").concat(value[i]);
      };
      var svg = this.svg.attr("width", width).attr("height", height).attr("viewBox", [0, 0, width, height]).attr("overflow", "visible");
      var pack = d3.pack().size([width - marginLeft - marginRight, height - marginTop - marginBottom]).padding(padding),
          rootNode = d3.hierarchy({
        children: I
      }),
          nodes = pack(rootNode.sum(function (i) {
        return value[i];
      })).children;
      var bubbles = svg.append("g").attr("transform", "translate(".concat(marginLeft, ", ").concat(marginTop, ")"));
      bubbles.selectAll("g").data(I).join("g").append("circle").attr("class", function (i) {
        return "all bubble_" + i + " _" + group[i];
      }).attr("cx", function (i) {
        return nodes[i].x;
      }).attr("cy", function (i) {
        return nodes[i].y;
      }).attr("r", function (i) {
        return nodes[i].r;
      }).attr("stroke", stroke).attr("stroke-width", strokeWidth).attr("stroke-opacity", strokeOpacity).attr("fill-opacity", fillOpacity).attr("fill", function (i) {
        return colorScale(group[i]);
      });
      bubbles.selectAll("g").append("text").attr("transform", function (i) {
        return "translate(".concat(nodes[i].x, ", ").concat(nodes[i].y, ")");
      }).attr("class", function (i) {
        return "all bubbleText_" + i + " _" + group[i];
      }).attr("text-anchor", "middle").attr("fill", "black").style("font-size", function (i) {
        return fontSize.slice(0, -2) < nodes[i].r * 0.7 ? fontSize : "0px";
      });
      bubbles.selectAll("text").selectAll("tspan").data(function (i) {
        return bubbleLabel(i);
      }).join("tspan").attr("x", 0).attr("y", function (_, i) {
        return "".concat(i * 1.1, "em");
      }).attr("font-weight", function (_, i) {
        return i ? null : "bold";
      }).text(function (d) {
        return d;
      });
      var chartTitle = svg.append("g");
      chartTitle.call(function (g) {
        return g.append("text").attr("x", marginLeft + (width - marginRight - marginLeft) / 2).attr("y", marginTop / 2).attr("fill", "black").style("font-size", "20px").style("font-weight", 550).attr("text-anchor", "middle").text(chartTitleText);
      });

      if (enableAnimation) {
        bubbles.select(".bubble_0").attr("r", 0).transition().attr("r", function (i) {
          return nodes[i].r;
        }).duration(animationTime);
        bubbles.select(".bubbleText_0").style("opacity", 0).transition().style("opacity", 1).duration(animationTime);

        for (var t = 1; t < nodes.length; t++) {
          bubbles.select(".bubble_" + t).attr("r", 0).transition().attr("r", function (i) {
            return nodes[i].r;
          }).duration(animationTime).delay(animationTime / 10 * t);
          bubbles.select(".bubbleText_" + t).style("opacity", 0).transition().style("opacity", 1).duration(animationTime).delay(animationTime / 10 * t);
        }
      }

      var tooltip = svg.append("g").attr("pointer-events", "none");

      function showTooltip(_, i) {
        tooltip.style("display", null);
        tooltip.attr("transform", "translate(".concat(nodes[i].x + marginLeft, ", ").concat(nodes[i].y + marginTop - nodes[i].r - 10, ")"));
        bubbles.select(".bubbleText_" + i).attr("fill", "none");
        var path = tooltip.selectAll("path").data([,]).join("path").attr("fill", "rgba(250, 250, 250, 0.8)").attr("stroke", "black").attr("color", "black");
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

      function hideTooltip(_, i) {
        tooltip.style("display", "none");
        bubbles.select(".bubbleText_" + i).attr("fill", "black");
      }

      function setToolTop() {
        bubbles.selectAll(".all").on("mouseover.tooltip", showTooltip).on("mouseleave.tooltip", hideTooltip);
      }

      setToolTop();

      if (enableLegend) {
        var highlight = function highlight(_, g) {
          bubbles.selectAll(".all").style("opacity", 0.2);
          bubbles.selectAll("._" + g).style("opacity", 1);
        };

        var noHighlight = function noHighlight() {
          bubbles.selectAll(".all").style("opacity", 1);
        };

        var legend = svg.append("g").attr("transform", "translate(".concat(width - marginRight + 25 + 20, ", ").concat(marginTop, ")"));
        legend.selectAll("circle").data(groups).join("circle").style("cursor", "pointer").attr("class", function (g) {
          return "all legend_" + g;
        }).attr("cx", 0).attr("cy", function (_, i) {
          return i * 20 * 1.1;
        }).attr("r", 10).attr("fill", function (g) {
          return colorScale(g);
        });
        legend.selectAll("text").data(groups).join("text").attr("class", function (g) {
          return "all legend_" + g;
        }).attr("x", 20).attr("y", function (_, i) {
          return i * 20 * 1.1 + 4;
        }).attr("text-anchor", "start").style("font-size", "12px").style("font-weight", 300).text(function (g) {
          return g;
        });
        setTimeout(function () {
          legend.selectAll("circle").on("mouseover", highlight).on("mouseleave", noHighlight);
        }, animationTime);
      }
    }
  }]);

  return D3BubbleChart;
}();