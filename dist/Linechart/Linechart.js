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

var Linechart = function (_Component) {
  _inherits(Linechart, _Component);

  var _super = _createSuper(Linechart);

  function Linechart(props) {
    _classCallCheck(this, Linechart);

    return _super.call(this, props);
  }

  _createClass(Linechart, [{
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

  return Linechart;
}(_react.Component);

_defineProperty(Linechart, "propTypes", {
  data: _propTypes["default"].array.isRequired,
  width: _propTypes["default"].number,
  height: _propTypes["default"].number,
  margintop: _propTypes["default"].number,
  marginbottom: _propTypes["default"].number,
  marginright: _propTypes["default"].number,
  marginleft: _propTypes["default"].number,
  getX: _propTypes["default"].func,
  getY: _propTypes["default"].func,
  tiptext: _propTypes["default"].func,
  lineattrs: _propTypes["default"].object,
  linestyles: _propTypes["default"].object,
  plotattrs: _propTypes["default"].object,
  plotstyles: _propTypes["default"].object,
  plotattrs_hover: _propTypes["default"].object,
  plotstyles_hover: _propTypes["default"].object,
  timeParse: _propTypes["default"].string,
  timeformat: _propTypes["default"].string,
  showgrid: _propTypes["default"].bool,
  showgridtip: _propTypes["default"].bool,
  showplottip: _propTypes["default"].bool,
  plotclick: _propTypes["default"].func,
  lineAnimateTime: _propTypes["default"].number
});

_defineProperty(Linechart, "defaultProps", {
  width: 800,
  height: 300,
  margintop: 50,
  marginbottom: 30,
  marginright: 50,
  marginleft: 40,
  getX: function getX(d) {
    return d.date;
  },
  getY: function getY(d) {
    return d.count;
  },
  tiptext: function tiptext(d) {
    return d.count;
  },
  lineattrs: {},
  linestyles: {},
  plotattrs: {},
  plotstyles: {},
  plotattrs_hover: {},
  plotstyles_hover: {},
  timeParse: "%Y-%m-%d",
  timeformat: "%m-%d",
  showgrid: true,
  showgridtip: true,
  showplottip: true,
  plotclick: function plotclick(d, i) {},
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
          plotattrs = settings.plotattrs,
          plotstyles = settings.plotstyles,
          plotattrs_hover = settings.plotattrs_hover,
          plotstyles_hover = settings.plotstyles_hover,
          getX = settings.getX,
          getY = settings.getY,
          tiptext = settings.tiptext,
          showgridtip = settings.showgridtip,
          showplottip = settings.showplottip,
          showgrid = settings.showgrid,
          timeParse = settings.timeParse,
          timeformat = settings.timeformat,
          lineAnimateTime = settings.lineAnimateTime,
          plotclick = settings.plotclick;
      var parseTime = d3.timeParse(timeParse);
      data.map(function (d) {
        d.X = parseTime(getX(d));
        d.Y = getY(d);
      });
      var x = d3.scaleTime().range([0, width]),
          y = d3.scaleLinear().rangeRound([height, 0]),
          line = d3.line().x(function (d) {
        return x(d.X);
      }).y(function (d) {
        return y(d.Y);
      });
      x.domain(d3.extent(data, function (d) {
        return d.X;
      }));
      y.domain([0, d3.max(data, function (d) {
        return d.Y * 1.05;
      })]);
      var g = this.svg.attr('width', width + marginleft + marginright).attr('height', height + margintop + marginbottom).append('g').attr('transform', "translate( ".concat(marginleft, " , ").concat(margintop, " )"));
      g.append("g").attr("class", "axis axis--x").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x).ticks(10).tickFormat(d3.timeFormat(timeformat)));
      g.append("g").attr("class", "axis axis--y").call(d3.axisLeft(y));

      if (showgrid) {
        var grid = g.append('g');
        grid.append('g').call(d3.axisBottom(x).tickSize(height).tickFormat("")).attr("stroke-opacity", 0.3).attr("stroke-width", 1).attr("shape-rendering", "crispEdges").select('path').attr("stroke-width", 0);
        grid.append("g").call(d3.axisLeft(y).tickSize(-width).tickFormat("")).attr("stroke-opacity", 0.3).attr("stroke-width", 1).attr("shape-rendering", "crispEdges").select('path').attr("stroke-width", 0);
      }

      var path = g.datum(data).append("path").attrs(_objectSpread({
        'stroke': '#ace',
        'stroke-linejoin': "round",
        'stroke-linecap': "round",
        'stroke-width': 1.5
      }, lineattr)).styles(_objectSpread({}, linestyles)).attr("fill", "none").attr('d', line);
      var totalLength = path.node().getTotalLength();
      path.attr("stroke-dasharray", totalLength + " " + totalLength).attr("stroke-dashoffset", totalLength).transition().duration(lineAnimateTime).ease(d3.easeLinear).attr("stroke-dashoffset", 0);
      var group = g.append('g').selectAll('tip').data(data).enter().append('g');
      group.on('mouseover', gridMouseOver).on("mouseout", gridMouseOut);

      if (showgridtip) {
        group.append('line').attr('x1', function (d) {
          return x(d.X);
        }).attr('y1', 0).attr('x2', function (d) {
          return x(d.X);
        }).attr("y2", height).attr("stroke", 'rgba(0,0,0,0)').attr("stroke-width", 1);
      }

      group.append('rect').attr("x", function (d) {
        return x(d.X);
      }).attr("y", function (d) {
        return 0;
      }).attr("width", 1).attr("height", height).attr('fill', 'rgba(0,0,0,0)');

      if (showplottip) {
        group.append('circle').attr('cx', function (d) {
          return x(d.X);
        }).attr('cy', function (d) {
          return y(d.Y);
        }).attrs(_objectSpread({
          r: 5,
          fill: '#ace'
        }, plotattrs)).styles(_objectSpread({
          'cursor': 'pointer'
        }, plotstyles)).on('click', plotclick);
      }

      group.append('text').text(tiptext).attr("text-anchor", "start").attr("font-size", 14).attr('fill', 'rgba(0,0,0,0)').attr('font-weight', 'bold').attr('dy', '1em').attr('dx', '0.8em').attr('transform', function (d) {
        return "translate(".concat(x(d.X), ",").concat(y(d.Y), ")");
      });

      function gridMouseOver() {
        var item = d3.select(this);
        item.select('line').transition().duration(100).attr("stroke", '#888').attr("stroke-width", 2);
        item.select('text').attr('dy', '12').transition().duration(800).attr('dy', '0').attr('fill', '#f00');
        item.select('circle').transition().duration(800).attrs(_objectSpread({
          fill: '#f00'
        }, plotattrs_hover)).styles(_objectSpread({}, plotstyles_hover));
      }

      function gridMouseOut() {
        var item = d3.select(this);
        item.select('line').transition().duration(100).attr("stroke", 'rgba(0,0,0,0)');
        item.select('text').transition().duration(500).attr('fill', 'rgba(0,0,0,0)');
        item.select('circle').transition().duration(800).attrs(_objectSpread({
          r: 5,
          fill: '#ace'
        }, plotattrs)).styles(_objectSpread({}, plotstyles));
      }
    }
  }]);

  return d3line;
}();

var _default = Linechart;
exports["default"] = _default;