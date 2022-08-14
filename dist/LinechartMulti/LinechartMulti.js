"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var d3 = _interopRequireWildcard(require("d3"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _excluded = ["data"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

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

var LinechartMulti = function (_Component) {
  _inherits(LinechartMulti, _Component);

  var _super = _createSuper(LinechartMulti);

  function LinechartMulti(props) {
    _classCallCheck(this, LinechartMulti);

    return _super.call(this, props);
  }

  _createClass(LinechartMulti, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          data = _this$props.data,
          settings = _objectWithoutProperties(_this$props, _excluded);

      var el = this.el,
          line = new d3line(el);
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

  return LinechartMulti;
}(_react.Component);

_defineProperty(LinechartMulti, "propTypes", {
  data: _propTypes["default"].array.isRequired,
  width: _propTypes["default"].number,
  height: _propTypes["default"].number,
  margintop: _propTypes["default"].number,
  marginbottom: _propTypes["default"].number,
  marginright: _propTypes["default"].number,
  marginleft: _propTypes["default"].number,
  getX: _propTypes["default"].func,
  tiptext: _propTypes["default"].func,
  groupkey: _propTypes["default"].arrayOf(_propTypes["default"].string),
  color: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].arrayOf(_propTypes["default"].string)]),
  timeParse: _propTypes["default"].string,
  timeformat: _propTypes["default"].string,
  click: _propTypes["default"].func,
  lineAnimateTime: _propTypes["default"].number
});

_defineProperty(LinechartMulti, "defaultProps", {
  width: 500,
  height: 200,
  margintop: 50,
  marginbottom: 30,
  marginright: 50,
  marginleft: 40,
  getX: function getX(d) {
    return d.date;
  },
  tiptext: function tiptext(d, i) {
    return d.date;
  },
  groupkey: ['groupA', "groupB"],
  color: d3.scaleOrdinal(d3.schemeCategory20),
  timeParse: "%Y-%m-%d",
  timeformat: "%m-%d",
  click: function click(d, i) {},
  lineAnimateTime: 1000
});

var d3line = function () {
  function d3line(el) {
    _classCallCheck(this, d3line);

    this.svg = d3.select(el);
  }

  _createClass(d3line, [{
    key: "render",
    value: function render(data, settings) {
      var width = settings.width,
          height = settings.height,
          margintop = settings.margintop,
          marginbottom = settings.marginbottom,
          marginright = settings.marginright,
          marginleft = settings.marginleft,
          lineattr = settings.lineattr,
          linestyles = settings.linestyles,
          getX = settings.getX,
          groupkey = settings.groupkey,
          timeParse = settings.timeParse,
          timeformat = settings.timeformat,
          color = settings.color,
          lineAnimateTime = settings.lineAnimateTime,
          click = settings.click,
          tiptext = settings.tiptext;
      var parseTime = d3.timeParse(timeParse);
      data = data.map(function (d) {
        return _objectSpread(_objectSpread({}, d), {}, {
          _X: parseTime(getX(d))
        });
      });
      var x = d3.scaleTime().rangeRound([0, width]),
          y = d3.scaleLinear().rangeRound([height, 0]),
          keys = groupkey,
          line = d3.line().curve(d3.curveLinear).x(function (d) {
        return x(d.X);
      }).y(function (d) {
        return y(d.Y);
      });
      x.domain(d3.extent(data, function (d) {
        return d._X;
      }));
      y.domain([0, d3.max(data, function (d) {
        return d3.max(keys, function (k) {
          return d[k];
        }) * 1.2;
      })]);
      var newdata = keys.map(function (k) {
        var nd = [];
        data.map(function (d) {
          if (d[k]) nd.push({
            X: d._X,
            Y: d[k],
            K: k
          });
        });
        return {
          id: k,
          value: nd
        };
      });
      var g = this.svg.attr('width', width + marginleft + marginright).attr('height', height + margintop + marginbottom).append('g').attr('transform', "translate( ".concat(marginleft, " , ").concat(margintop, " )"));
      g.append("g").attr("class", "axis axis--x").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x).tickFormat(d3.timeFormat(timeformat)));
      g.append("g").attr("class", "axis axis--y").call(d3.axisLeft(y));
      var lines = g.selectAll('.lines').data(newdata).enter().append('g');
      lines.append("path").attr("fill", "none").attr("stroke", function (d, i) {
        return Array.isArray(color) ? color[i % color.length] : color(d.id);
      }).attr("stroke-linejoin", "round").attr("stroke-linecap", "round").attr("stroke-width", 1.5).attr('d', function (d) {
        return line(d.value);
      }).call(transition);

      function transition(path) {
        path.transition().ease(d3.easeLinear).duration(lineAnimateTime).attrTween("stroke-dasharray", tweenDash);
      }

      function tweenDash() {
        var l = this.getTotalLength(),
            i = d3.interpolateString("0," + l, l + "," + l);
        return function (t) {
          return i(t);
        };
      }

      var tip = g.append('g').selectAll('.tipline').data(data).enter().append('g');
      tip.append('line').attr("x1", function (d) {
        return x(d._X);
      }).attr("y1", function (d) {
        return 0;
      }).attr("x2", function (d) {
        return x(d._X);
      }).attr("y2", height).attr("stroke-width", 2.5).attr('stroke', 'rgba(0,0,0,0)').on('mouseover', tipMouseOver).on("mouseout", tipMouseOut).on('click', click).attr('cursor', 'pointer');
      tip.append('text').text(tiptext).attr("text-anchor", function (d) {
        return x(d._X) < width / 2 ? "start" : "end";
      }).attr("font-size", 14).attr('fill', 'rgba(0,0,0,0)').attr('font-weight', 'bold').attr('dy', '1em').attr('dx', function (d) {
        return x(d._X) < width / 2 ? "0.3em" : '-0.3em';
      }).attr('transform', function (d) {
        return "translate(".concat(x(d._X), ",0)");
      });
      var circles = lines.selectAll('circle').data(function (d) {
        return d.value;
      }).enter();
      circles.append('circle').attr('cx', function (d) {
        return x(d.X);
      }).attr('cy', function (d) {
        return y(d.Y);
      }).attr("stroke", function (d, i) {
        return Array.isArray(color) ? color[i % color.length] : color(d.K);
      }).attr("stroke-width", 1.5).attr('r', 5).attr('fill', '#fff');
      var legend = g.append('g').selectAll("g").data(keys).enter().append('g');
      var legendrect = legend.append('rect').attr('transform', function (d, i) {
        return "translate( ".concat(width + 10, " , ").concat(30 * i, ")");
      }).attr('fill', 'rgba(0,0,0,0)').transition().delay(lineAnimateTime).duration(500).attr('width', 15).attr('height', 15).style("fill", function (d, i) {
        return Array.isArray(color) ? color[i % color.length] : color(d);
      });
      var legendtext = legend.append('text').attr('transform', function (d, i) {
        return "translate( ".concat(width + 30, " , ").concat(30 * i + 15, ")");
      }).attr('fill', 'rgba(0,0,0,0)').transition().delay(lineAnimateTime).duration(500).attr('fill', '#000').text(function (d) {
        return d;
      });
      legend.attr('cursor', 'default').on('mouseover', legendMouseOver).on("mouseout", legendMouseOut);

      function tipMouseOver(d, i) {
        tip.select('line').transition().duration(100).attr("stroke", function (_ref) {
          var _X = _ref._X;
          return _X == d._X ? '#888' : 'rgba(0,0,0,0)';
        });
        tip.select('text').transition().duration(100).attr("fill", function (_ref2) {
          var _X = _ref2._X;
          return _X == d._X ? '#888' : 'rgba(0,0,0,0)';
        });
      }

      function tipMouseOut(d, i) {
        tip.select('line').transition().duration(100).attr("stroke", 'rgba(0,0,0,0)');
        tip.select('text').transition().duration(100).attr("fill", 'rgba(0,0,0,0)');
      }

      function legendMouseOver(key, i) {
        legend.select('text').transition().duration(500).attr('fill', function (d, i) {
          return d == key ? '#f00' : '#000';
        });
        lines.select("path").transition().duration(500).attr("stroke", function (d, i) {
          return d.id == key ? Array.isArray(color) ? color[i % color.length] : color(d.id) : 'rgba(0,0,0,0)';
        });
        circles.selectAll("circle").transition().duration(500).attr("r", function (d, i) {
          return d.K == key ? 5 : 0;
        });
      }

      function legendMouseOut() {
        legend.select('text').transition().duration(500).attr('fill', function (d, i) {
          return '#000';
        });
        lines.select("path").transition().duration(500).attr("stroke", function (d, i) {
          return Array.isArray(color) ? color[i % color.length] : color(d.id);
        });
        circles.selectAll("circle").transition().duration(500).attr("r", 5);
      }
    }
  }]);

  return d3line;
}();

var _default = LinechartMulti;
exports["default"] = _default;