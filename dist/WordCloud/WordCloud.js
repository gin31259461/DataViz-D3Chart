"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var d3 = _interopRequireWildcard(require("d3"));

var _d3Cloud = _interopRequireDefault(require("d3-cloud"));

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

var WordCloud = function (_PureComponent) {
  _inherits(WordCloud, _PureComponent);

  var _super = _createSuper(WordCloud);

  function WordCloud(props) {
    _classCallCheck(this, WordCloud);

    return _super.call(this, props);
  }

  _createClass(WordCloud, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          data = _this$props.data,
          settings = _objectWithoutProperties(_this$props, _excluded);

      var el = this.el;
      this.Wordcloud = new d3wordcloud(el);
      this.Wordcloud.render(data, settings);
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

  return WordCloud;
}(_react.PureComponent);

_defineProperty(WordCloud, "propTypes", {
  data: _propTypes["default"].array.isRequired,
  width: _propTypes["default"].number,
  height: _propTypes["default"].number,
  margintop: _propTypes["default"].number,
  marginbottom: _propTypes["default"].number,
  marginright: _propTypes["default"].number,
  marginleft: _propTypes["default"].number,
  fontSizedomain: _propTypes["default"].arrayOf(_propTypes["default"].number),
  fontSizerange: _propTypes["default"].arrayOf(_propTypes["default"].number),
  gettext: _propTypes["default"].func,
  getvalue: _propTypes["default"].func,
  colordomain: _propTypes["default"].arrayOf(_propTypes["default"].number),
  colorrange: _propTypes["default"].arrayOf(_propTypes["default"].string),
  rotate: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].func]),
  padding: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].func]),
  animation: _propTypes["default"].number,
  onClick: _propTypes["default"].func
});

_defineProperty(WordCloud, "defaultProps", {
  width: 300,
  height: 300,
  margintop: 50,
  marginbottom: 30,
  marginright: 50,
  marginleft: 40,
  fontSizedomain: [0.5, 2],
  fontSizerange: [15, 75],
  gettext: function gettext(d) {
    return d.text;
  },
  getvalue: function getvalue(d) {
    return d.value;
  },
  colorrange: ['#ace', '#0f0'],
  colordomain: [15, 75],
  rotate: 0,
  padding: 2,
  animation: 1000,
  onClick: function onClick(d, i) {}
});

var d3wordcloud = function () {
  function d3wordcloud(el) {
    _classCallCheck(this, d3wordcloud);

    this.svg = d3.select(el);
  }

  _createClass(d3wordcloud, [{
    key: "render",
    value: function render(data, settings) {
      var width = settings.width,
          height = settings.height,
          margintop = settings.margintop,
          marginbottom = settings.marginbottom,
          marginright = settings.marginright,
          marginleft = settings.marginleft,
          fontSizedomain = settings.fontSizedomain,
          fontSizerange = settings.fontSizerange,
          gettext = settings.gettext,
          getvalue = settings.getvalue,
          colorrange = settings.colorrange,
          colordomain = settings.colordomain,
          rotate = settings.rotate,
          padding = settings.padding,
          animation = settings.animation,
          onClick = settings.onClick;
      var fz_scale = d3.scaleLinear().domain(fontSizedomain).range(fontSizerange);
      this.g = this.svg.attr('width', width + marginleft + marginright).attr('height', height + margintop + marginbottom).append('g').attr('transform', "translate( ".concat((width + marginleft + marginright) / 2, " , ").concat((height + margintop + marginbottom) / 2, " )"));
      var words_data = data.map(function (d) {
        return {
          text: gettext(d),
          freq: getvalue(d)
        };
      });
      var color = d3.scaleLinear().range(colorrange).domain(colordomain);
      var layout = (0, _d3Cloud["default"])().size([width + marginleft + marginright, height + margintop + marginbottom]).words(words_data).rotate(rotate).padding(padding).fontSize(function (d) {
        return fz_scale(d.freq);
      }).start();
      this.tag = this.g.selectAll('.tag').data(words_data).enter().append('text');
      this.tag.on('click', function (d, i) {
        return onClick(d, i, d3.event);
      }).attr('class', 'tag').attr("text-anchor", "middle").style("fill", "#FFF").attr("transform", function (d) {
        return "translate(".concat(width * Math.random() - width / 2, ", ").concat(height * Math.random() - height / 2, ")");
      }).transition().duration(animation).attr("transform", function (d) {
        return "translate(".concat(d.x, ", ").concat(d.y, ")");
      }).attr('font-size', function (d) {
        return "".concat(d.size / 14, "rem");
      }).style("fill", function (d, i) {
        return color(d.size);
      }).text(function (d) {
        return d.text;
      });
    }
  }, {
    key: "update",
    value: function update(data, settings) {
      var width = settings.width,
          height = settings.height,
          margintop = settings.margintop,
          marginbottom = settings.marginbottom,
          marginright = settings.marginright,
          marginleft = settings.marginleft,
          fontSizedomain = settings.fontSizedomain,
          fontSizerange = settings.fontSizerange,
          gettext = settings.gettext,
          getvalue = settings.getvalue,
          colorrange = settings.colorrange,
          colordomain = settings.colordomain,
          rotate = settings.rotate,
          padding = settings.padding,
          animation = settings.animation,
          onClick = settings.onClick;
      var words_data = data.map(function (d) {
        return {
          text: gettext(d),
          freq: getvalue(d)
        };
      });
      var fz_scale = d3.scaleLinear().domain(fontSizedomain).range(fontSizerange);
      var color = d3.scaleLinear().range(colorrange).domain(colordomain);
      var layout = (0, _d3Cloud["default"])().size([width + marginleft + marginright, height + margintop + marginbottom]).words(words_data).rotate(rotate).padding(padding).fontSize(function (d) {
        return fz_scale(d.freq);
      }).start();
      this.tag.data(words_data).transition().duration(animation).attr("transform", function (d) {
        return "translate(".concat(d.x, ", ").concat(d.y, ")");
      }).attr('font-size', function (d) {
        return "".concat(d.size / 14, "rem");
      }).style("fill", function (d, i) {
        return color(d.size);
      }).text(function (d) {
        return d.text;
      });
      this.tag.data(words_data).exit().remove();
    }
  }]);

  return d3wordcloud;
}();

var _default = WordCloud;
exports["default"] = _default;