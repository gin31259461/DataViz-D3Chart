"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var d3 = _interopRequireWildcard(require("d3"));

require("d3-selection-multi");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _excluded = ["data"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var CalendarView = function (_Component) {
  _inherits(CalendarView, _Component);

  var _super = _createSuper(CalendarView);

  function CalendarView(props) {
    _classCallCheck(this, CalendarView);

    return _super.call(this, props);
  }

  _createClass(CalendarView, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          data = _this$props.data,
          settings = _objectWithoutProperties(_this$props, _excluded);

      var el = this.el,
          line = new d3Calendar(el);
      line.render(data, settings);
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

  return CalendarView;
}(_react.Component);

_defineProperty(CalendarView, "propTypes", {
  data: _propTypes["default"].array.isRequired,
  width: _propTypes["default"].number,
  height: _propTypes["default"].number,
  margintop: _propTypes["default"].number,
  marginbottom: _propTypes["default"].number,
  marginright: _propTypes["default"].number,
  marginleft: _propTypes["default"].number,
  timeParse: _propTypes["default"].string,
  year: _propTypes["default"].number,
  title: _propTypes["default"].string,
  colordomain: _propTypes["default"].arrayOf(_propTypes["default"].number),
  colorrange: _propTypes["default"].arrayOf(_propTypes["default"].string),
  showmonth: _propTypes["default"].bool,
  showlegend: _propTypes["default"].bool,
  monthpos: _propTypes["default"].number,
  getdate: _propTypes["default"].func,
  getvalue: _propTypes["default"].func,
  gettip: _propTypes["default"].func,
  onClick: _propTypes["default"].func,
  AnimateTime: _propTypes["default"].number
});

_defineProperty(CalendarView, "defaultProps", {
  width: 800,
  height: 200,
  margintop: 50,
  marginbottom: 30,
  marginright: 50,
  marginleft: 40,
  year: 2018,
  title: '2018',
  dateParse: "%Y-%m-%d",
  colordomain: [1, 30],
  colorrange: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837"],
  showmonth: true,
  showlegend: true,
  monthpos: 1,
  getdate: function getdate(d) {
    return d.date;
  },
  getvalue: function getvalue(d) {
    return d.count;
  },
  gettip: function gettip(d) {
    return "".concat(d.date, " : ").concat(d.count);
  },
  onClick: function onClick(d, i) {},
  AnimateTime: 1000
});

var d3Calendar = function () {
  function d3Calendar(el) {
    _classCallCheck(this, d3Calendar);

    this.svg = d3.select(el);
  }

  _createClass(d3Calendar, [{
    key: "render",
    value: function render(data, settings) {
      var width = settings.width,
          height = settings.height,
          margintop = settings.margintop,
          marginbottom = settings.marginbottom,
          marginright = settings.marginright,
          marginleft = settings.marginleft,
          title = settings.title,
          year = settings.year,
          colordomain = settings.colordomain,
          colorrange = settings.colorrange,
          getdate = settings.getdate,
          getvalue = settings.getvalue,
          gettip = settings.gettip,
          showmonth = settings.showmonth,
          monthpos = settings.monthpos,
          showlegend = settings.showlegend,
          dateParse = settings.dateParse,
          onClick = settings.onClick,
          AnimateTime = settings.AnimateTime;
      var color = d3.scaleQuantize().domain(colordomain).range(colorrange);
      var cellSize = width / 52,
          monthformat = d3.timeFormat(" %m 月");
      data.map(function (d) {
        d._date = getdate(d), d._count = getvalue(d);
      });
      var tmp = d3.nest().key(function (d) {
        return d._date;
      }).object(data);
      var g = this.svg.attr('width', width + marginleft + marginright).attr('height', height + margintop + marginbottom).append('g').attr('transform', "translate( ".concat(marginleft, " , ").concat(margintop, " )"));
      g.append('text').text(title).attr('fill', '#000').attr('font-size', 24).attr('font-weight', 'bold').attr('text-anchor', 'middle').attr('transform', "translate( ".concat(width / 2, " , ").concat(-10, " )"));
      var rect = g.selectAll("rect").data(d3.timeDays(new Date(year, 0, 1), new Date(year + 1, 0, 1))).enter().append("rect").attr("width", cellSize).attr("height", cellSize).attr("fill", "none").attr("stroke", "#ccc").attr("x", function (d) {
        return d3.timeWeek.count(d3.timeYear(d), d) * cellSize;
      }).attr("y", function (d) {
        return d.getDay() * cellSize;
      }).datum(d3.timeFormat(dateParse));
      var monthg = g.append("g").attr("fill", "none").attr("stroke", "#000").selectAll("path").data(d3.timeMonths(new Date(year, 0, 1), new Date(year + 1, 0, 1))).enter();
      monthg.append("path").attr("d", pathMonth);

      if (showmonth) {
        monthg.append('text').attr('text-anchor', 'middle').attr('transform', function (d) {
          var w0 = d3.timeWeek.count(d3.timeYear(d), d),
              t1 = new Date(d.getFullYear(), d.getMonth() + 1, 0),
              w1 = d3.timeWeek.count(d3.timeYear(t1), t1);
          return "translate( ".concat(w0 * cellSize + 2.5 * cellSize, " , ").concat(cellSize * 8 * monthpos, " )");
        }).text(function (d) {
          return monthformat(d);
        });
      }

      var rectfiter = rect.filter(function (d) {
        return d in tmp;
      }).on('click', function (d, i) {
        return onClick(tmp[d][0], i);
      }).attr('cursor', 'pointer').on("mouseover", function () {
        d3.select(this).attr('stroke', '#f00').attr('stroke-width', 3);
      }).on("mouseout", function () {
        d3.select(this).attr('stroke', '#ccc').attr('stroke-width', 1);
      }).attr("width", 0);
      rectfiter.transition().duration(AnimateTime).attr("width", cellSize).attr("fill", function (d) {
        return color(tmp[d][0]._count);
      });
      rectfiter.append("title").text(function (d) {
        return gettip(tmp[d][0]);
      });

      if (showlegend) {
        var colorset = new Set();
        colorrange.map(function (d) {
          return colorset.add(parseInt(color.invertExtent(d)[1]));
        });

        var colorlen = _toConsumableArray(colorset).length;

        var colort = 500 / colorlen;
        var legend = g.append('g').selectAll("g").data(_toConsumableArray(colorset)).enter().append('g');
        var legendrect = legend.append('rect').transition().delay(AnimateTime - 500).attr('transform', function (d, i) {
          return "translate( ".concat(30 * i, " , ").concat(cellSize * 8.5, ")");
        }).attr('fill', 'rgba(0,0,0,0)').attr('width', 0).transition().delay(function (d, i) {
          return colort * i;
        }).duration(colort).attr('width', 30).attr('height', 10).style("fill", function (d, i) {
          return color(d);
        });
        var legendtext = legend.append('text').transition().delay(AnimateTime - 500).attr('text-anchor', 'middle').attr('font-size', 10).attr('transform', function (d, i) {
          return "translate( ".concat(30 * (i + 1), " , ").concat(cellSize * 10, ")");
        }).attr('fill', 'rgba(0,0,0,0)').transition().delay(function (d, i) {
          return colort * i;
        }).duration(colort).attr('fill', '#000').text(function (d) {
          return d;
        });
      }

      function pathMonth(t0) {
        var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
            d0 = t0.getDay(),
            w0 = d3.timeWeek.count(d3.timeYear(t0), t0),
            d1 = t1.getDay(),
            w1 = d3.timeWeek.count(d3.timeYear(t1), t1);
        return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize + "H" + w0 * cellSize + "V" + 7 * cellSize + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize + "H" + (w1 + 1) * cellSize + "V" + 0 + "H" + (w0 + 1) * cellSize + "Z";
      }
    }
  }]);

  return d3Calendar;
}();

var _default = CalendarView;
exports["default"] = _default;