"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalendarHeatmap = CalendarHeatmap;

var _react = _interopRequireDefault(require("react"));

var d3 = _interopRequireWildcard(require("d3"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _excluded = ["data"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function CalendarHeatmap(props) {
  var svgRef = _react["default"].useRef(null);

  var handleLoad = function handleLoad() {
    var data = props.data,
        attr = _objectWithoutProperties(props, _excluded);

    D3CalendarHeatmap(svgRef.current, data, attr);
  };

  _react["default"].useEffect(function () {
    handleLoad();
  }, []);

  return _react["default"].createElement("svg", {
    ref: svgRef
  });
}

CalendarHeatmap.propTypes = {
  data: _propTypes["default"].array.isRequired,
  getX: _propTypes["default"].func,
  getY: _propTypes["default"].func,
  tipTitle: _propTypes["default"].func,
  width: _propTypes["default"].number,
  cellSize: _propTypes["default"].number,
  chartTitleText: _propTypes["default"].string,
  marginTop: _propTypes["default"].number,
  marginRight: _propTypes["default"].number,
  marginBottom: _propTypes["default"].number,
  marginLeft: _propTypes["default"].number,
  utcParse: _propTypes["default"].string,
  formatTipUTC: _propTypes["default"].string,
  formatDay: _propTypes["default"].func,
  monthParse: _propTypes["default"].string,
  weekday: _propTypes["default"].string,
  colors: _propTypes["default"].array,
  legendTitle: _propTypes["default"].string,
  tickFormat: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
  animationTime: _propTypes["default"].number,
  enableAnimation: _propTypes["default"].bool,
  enableLegend: _propTypes["default"].bool
};
CalendarHeatmap.defaultProps = {
  getX: function getX(d) {
    return d.date;
  },
  getY: function getY(d) {
    return d.value;
  },
  tipTitle: undefined,
  width: 900,
  cellSize: 0,
  chartTitleText: "",
  marginTop: 65,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 40,
  formatTipUTC: "%Y-%m-%d",
  utcParse: "%Y-%m-%d",
  formatDay: function formatDay(i) {
    return "SMTWTFS"[i];
  },
  monthParse: "%b",
  weekday: "sunday",
  colors: undefined,
  legendTitle: "",
  tickFormat: undefined,
  animationTime: 2000,
  enableAnimation: true,
  enableLegend: true
};

function D3CalendarHeatmap(element, data, _ref) {
  var getX = _ref.getX,
      getY = _ref.getY,
      tipTitle = _ref.tipTitle,
      width = _ref.width,
      cellSize = _ref.cellSize,
      chartTitleText = _ref.chartTitleText,
      marginTop = _ref.marginTop,
      marginRight = _ref.marginRight,
      marginBottom = _ref.marginBottom,
      marginLeft = _ref.marginLeft,
      formatTipUTC = _ref.formatTipUTC,
      utcParse = _ref.utcParse,
      formatDay = _ref.formatDay,
      monthParse = _ref.monthParse,
      weekday = _ref.weekday,
      colors = _ref.colors,
      legendTitle = _ref.legendTitle,
      tickFormat = _ref.tickFormat,
      animationTime = _ref.animationTime,
      enableAnimation = _ref.enableAnimation,
      enableLegend = _ref.enableLegend;
  var x = d3.map(d3.map(data, getX), function (d) {
    return d3.utcParse(utcParse)(d);
  }),
      y = d3.map(d3.map(data, getY), function (d) {
    return Number(d);
  }),
      I = d3.range(x.length);
  cellSize = (width - marginLeft - marginRight) / 53;
  if (tipTitle === undefined) tipTitle = function tipTitle(i) {
    return "date: ".concat(d3.utcFormat(formatTipUTC)(x[i]), "\nvalue: ").concat(y[i]);
  };
  var countDay = weekday === "sunday" ? function (i) {
    return i;
  } : function (i) {
    return (i + 6) % 7;
  },
      timeWeek = weekday === "sunday" ? d3.utcSunday : d3.utcMonday,
      weekDays = weekday === "weekday" ? 5 : 7,
      height = cellSize * (weekDays + 2),
      fontSize = (width + height) / 100,
      years = d3.groups(I, function (i) {
    return x[i].getFullYear();
  }).reverse();
  if (colors === undefined) colors = d3.interpolatePiYG;
  var max = d3.quantile(y, 0.9975, Math.abs),
      colorScale = d3.scaleSequential([-max, max], colors).unknown("none");
  var formatMonth = d3.utcFormat(monthParse);
  var svg = d3.select(element).attr("width", width).attr("height", height * years.length + marginTop + marginBottom).attr("viewbox", [0, 0, width, height * years.length + marginTop + marginBottom]).attr("overflow", "visible");
  var year = svg.selectAll("g").data(years).join("g").attr("transform", function (d, i) {
    return "translate(".concat(marginLeft, ", ").concat(marginTop + height * i + cellSize * 1.5, ")");
  });
  year.append("text").attr("x", -5).attr("y", -5).attr("font-size", fontSize).attr("font-weight", "bold").attr("text-anchor", "end").text(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 1),
        key = _ref3[0];

    return key;
  });
  year.append("g").attr("text-anchor", "end").attr("font-size", fontSize).selectAll("text").data(weekday === "weekday" ? d3.range(1, 6) : d3.range(7)).join("text").attr("x", -5).attr("y", function (i) {
    return (countDay(i) + 0.5) * cellSize;
  }).attr("dy", "0.31em").text(formatDay);
  var cell = year.append("g");
  cell.selectAll("rect").data(weekday === "weekday" ? function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
        I = _ref5[1];

    return I.filter(function (i) {
      return ![0, 6].includes(x[i].getUTCDay());
    });
  } : function (_ref6) {
    var _ref7 = _slicedToArray(_ref6, 2),
        I = _ref7[1];

    return I;
  }).join("rect").attr("class", function (i) {
    return "cell_" + x[i].getUTCMonth();
  }).attr("width", cellSize - 1).attr("height", cellSize - 1).attr("x", function (i) {
    return timeWeek.count(d3.utcYear(x[i]), x[i]) * cellSize + 0.5;
  }).attr("y", function (i) {
    return countDay(x[i].getUTCDay()) * cellSize + 0.5;
  }).attr("fill", function (i) {
    return colorScale(y[i]);
  });

  function pathMonth(t) {
    var d = Math.max(0, Math.min(weekDays, countDay(t.getUTCDay())));
    var w = timeWeek.count(d3.utcYear(t), t);
    return "".concat(d === 0 ? "M".concat(w * cellSize, ",0") : d === weekDays ? "M".concat((w + 1) * cellSize, ",0") : "M".concat((w + 1) * cellSize, ",0V").concat(d * cellSize, "H").concat(w * cellSize), "V").concat(weekDays * cellSize);
  }

  var month = year.append("g").selectAll("g").data(function (_ref8) {
    var _ref9 = _slicedToArray(_ref8, 2),
        I = _ref9[1];

    return d3.utcMonths(d3.utcMonth(x[I[0]]), x[I[I.length - 1]]);
  }).join("g");
  month.filter(function (d, i) {
    return i;
  }).append("path").attr("fill", "none").attr("stroke", "white").attr("stroke-width", 3).attr("d", pathMonth);
  month.append("text").attr("x", function (d) {
    return timeWeek.count(d3.utcYear(d), timeWeek.ceil(d)) * cellSize + 2;
  }).attr("y", -5).attr("font-size", fontSize).text(formatMonth);
  var chartTitle = svg.append("g");
  chartTitle.call(function (g) {
    return g.append("text").attr("x", marginLeft + (width - marginRight - marginLeft) / 2).attr("y", marginTop / 2).attr("fill", "black").style("font-size", "20px").style("font-weight", 550).attr("text-anchor", "middle").text(chartTitleText);
  });
  var tooltip = svg.append("g").attr("pointer-events", "none");

  function showTooltip(_, i) {
    tooltip.style("display", null);
    var yearIndex = years.findIndex(function (_ref10) {
      var _ref11 = _slicedToArray(_ref10, 1),
          key = _ref11[0];

      return key === x[i].getFullYear();
    });
    tooltip.attr("transform", "translate(\n        ".concat(marginLeft + timeWeek.count(d3.utcYear(x[i]), x[i]) * cellSize + 0.5 + (cellSize - 1) / 2, ",\n        ").concat(marginTop + countDay(x[i].getUTCDay()) * cellSize + 0.5 - 10 + (height * yearIndex + cellSize * 1.5), "\n      )"));
    var path = tooltip.selectAll("path").data([,]).join("path").attr("fill", "rgba(250, 250, 250, 0.8)").attr("stroke", "black").attr("color", "black");
    var text = tooltip.selectAll("text").data([,]).join("text").attr("id", "tooltip-text").style("font-size", fontSize).call(function (text) {
      return text.selectAll("tspan").data("".concat(tipTitle(i)).split(/\n/)).join("tspan").attr("x", 0).attr("y", function (_, i) {
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
  }

  function setToolTop() {
    cell.selectAll("rect").on("mouseover.tooltip", showTooltip).on("mouseleave.tooltip", hideTooltip);
  }

  setToolTop();

  if (enableAnimation) {
    for (var i = 0; i < 11; i++) {
      cell.selectAll("rect").attr("fill", "none").attr("width", 0).transition().attr("width", cellSize - 1).attr("fill", function (i) {
        return colorScale(y[i]);
      }).duration(animationTime);
    }
  }

  function ramp(color) {
    var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 256;
    var canvas = document.createElement("canvas");
    canvas.width = n;
    canvas.height = 1;
    var context = canvas.getContext("2d");

    for (var _i2 = 0; _i2 < n; _i2++) {
      context.fillStyle = color(_i2 / (n - 1));
      context.fillRect(_i2, 0, 1, 1);
    }

    return canvas;
  }

  if (enableLegend) {
    var legendX = Object.assign(colorScale.copy().interpolator(d3.interpolateRound(0, 200)), {
      range: function range() {
        return [0, 200];
      }
    });
    var legend = svg.append("g").attr("transform", "translate(10, ".concat(marginTop / 3, ")"));
    legend.append("image").attr("x", 0).attr("y", 0).attr("width", 200).attr("height", 10).attr("preserveAspectRatio", "none").attr("xlink:href", ramp(colorScale.interpolator()).toDataURL());
    var ticks = width / 250,
        n = Math.round(ticks + 1),
        tickValues = d3.range(n).map(function (i) {
      return d3.quantile(colorScale.domain(), i / (n - 1));
    });
    if (typeof tickFormat !== "function") tickFormat = d3.format(tickFormat === undefined ? ",.0f" : tickFormat);
    legend.append("g").attr("transform", "translate(0, 10)").call(d3.axisBottom(legendX).ticks(ticks, typeof tickFormat === "string" ? tickFormat : undefined).tickFormat(typeof tickFormat === "function" ? tickFormat : undefined).tickSize(6).tickValues(tickValues)).call(function (g) {
      return g.selectAll(".tick line").attr("y1", -10);
    }).call(function (g) {
      return g.select(".domain").remove();
    }).call(function (g) {
      return g.append("text").attr("x", 0).attr("y", -16).attr("fill", "black").attr("text-anchor", "start").attr("font-weight", "bold").text(legendTitle);
    });
  }
}