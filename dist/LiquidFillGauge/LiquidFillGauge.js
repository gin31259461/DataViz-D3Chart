"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var d3 = _interopRequireWildcard(require("d3"));

var _excluded = ["intValue"];

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

var LiquidFillGauge = function (_Component) {
  _inherits(LiquidFillGauge, _Component);

  var _super = _createSuper(LiquidFillGauge);

  function LiquidFillGauge() {
    _classCallCheck(this, LiquidFillGauge);

    return _super.apply(this, arguments);
  }

  _createClass(LiquidFillGauge, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          intValue = _this$props.intValue,
          settings = _objectWithoutProperties(_this$props, _excluded);

      var el = this.el,
          liqidFillGaug = new d3liqidFillGauge(el);
      liqidFillGaug.render(intValue, settings);
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

  return LiquidFillGauge;
}(_react.Component);

exports["default"] = LiquidFillGauge;

_defineProperty(LiquidFillGauge, "propTypes", {
  intValue: _propTypes["default"].number.isRequired,
  width: _propTypes["default"].number,
  height: _propTypes["default"].number,
  minValue: _propTypes["default"].number,
  maxValue: _propTypes["default"].number,
  circleThickness: _propTypes["default"].number,
  circleFillGap: _propTypes["default"].number,
  circleColor: _propTypes["default"].string,
  waveHeight: _propTypes["default"].number,
  waveCount: _propTypes["default"].number,
  waveRiseTime: _propTypes["default"].number,
  waveAnimateTime: _propTypes["default"].number,
  waveRise: _propTypes["default"].bool,
  waveHeightScaling: _propTypes["default"].bool,
  waveAnimate: _propTypes["default"].bool,
  waveColor: _propTypes["default"].string,
  waveOffset: _propTypes["default"].number,
  textVertPosition: _propTypes["default"].number,
  textSize: _propTypes["default"].number,
  valueCountUp: _propTypes["default"].bool,
  displayPercent: _propTypes["default"].bool,
  textColor: _propTypes["default"].string,
  waveTextColor: _propTypes["default"].string
});

_defineProperty(LiquidFillGauge, "defaultProps", {
  intValue: 50,
  width: 150,
  height: 200,
  minValue: 0,
  maxValue: 100,
  circleThickness: 0.05,
  circleFillGap: 0.05,
  circleColor: "#178BCA",
  waveHeight: 0.1,
  waveCount: 1,
  waveRiseTime: 2000,
  waveAnimateTime: 2000,
  waveRise: true,
  waveHeightScaling: true,
  waveAnimate: true,
  waveColor: "#178BCA",
  waveOffset: 0,
  textVertPosition: .9,
  textSize: .5,
  valueCountUp: true,
  displayPercent: true,
  textColor: "#045681",
  waveTextColor: "#A4DBf8"
});

var d3liqidFillGauge = function () {
  function d3liqidFillGauge(el) {
    _classCallCheck(this, d3liqidFillGauge);

    this.svg = d3.select(el);
  }

  _createClass(d3liqidFillGauge, [{
    key: "render",
    value: function render(value, set) {
      var Settings = set;
      var gauge = this.svg;
      var radius = Math.min(Settings.width, Settings.height) / 2 - 10;
      var locationX = Settings.width / 2 - radius;
      var locationY = Settings.height / 2 - radius;
      var fillPercent = Math.max(Settings.minValue, Math.min(Settings.maxValue, value)) / Settings.maxValue;
      var waveHeightScale = Settings.waveHeightScaling ? d3.scaleLinear().range([0, Settings.waveHeight], 0).domain([0, 50, 100]) : d3.scaleLinear().range([Settings.waveHeight, Settings.waveHeight]).domain([0, 100]);
      var textPixels = Settings.textSize * radius / 2;
      var textFinalValue = parseFloat(value).toFixed(2);
      var textStartValue = Settings.valueCountUp ? Settings.minValue : textFinalValue;
      var percentText = Settings.displayPercent ? "%" : "";
      var circleThickness = Settings.circleThickness * radius;
      var circleFillGap = Settings.circleFillGap * radius;
      var fillCircleMargin = circleThickness + circleFillGap;
      var fillCircleRadius = radius - fillCircleMargin;
      var waveHeight = fillCircleRadius * waveHeightScale(fillPercent * 100);
      var waveLength = fillCircleRadius * 2 / Settings.waveCount;
      var waveClipCount = 1 + Settings.waveCount;
      var waveClipWidth = waveLength * waveClipCount;

      var textRounder = function textRounder(v) {
        return Math.round(v);
      };

      var rand = Math.random();

      if (parseFloat(textFinalValue) != parseFloat(textRounder(textFinalValue))) {
        textRounder = function textRounder(v) {
          return parseFloat(v).toFixed(1);
        };
      }

      if (parseFloat(textFinalValue) != parseFloat(textRounder(textFinalValue))) {
        textRounder = function textRounder(v) {
          return parseFloat(v).toFixed(2);
        };
      }

      var data = [];

      for (var i = 0; i <= 40 * waveClipCount; i++) {
        data.push({
          x: i / (40 * waveClipCount),
          y: i / 40
        });
      }

      var gaugeCircleX = d3.scaleLinear().range([0, 2 * Math.PI]).domain([0, 1]);
      var gaugeCircleY = d3.scaleLinear().range([0, radius]).domain([0, radius]);
      var waveScaleX = d3.scaleLinear().range([0, waveClipWidth]).domain([0, 1]);
      var waveScaleY = d3.scaleLinear().range([0, waveHeight]).domain([0, 1]);
      var waveRiseScale = d3.scaleLinear().range([fillCircleMargin + fillCircleRadius * 2 + waveHeight, fillCircleMargin - waveHeight]).domain([0, 1]);
      var waveAnimateScale = d3.scaleLinear().range([0, waveClipWidth - fillCircleRadius * 2]);
      var textRiseScaleY = d3.scaleLinear().range([fillCircleMargin + fillCircleRadius * 2, fillCircleMargin + textPixels * 0.7]).domain([0, 1]);
      var g = gauge.attr('width', Settings.width).attr('height', Settings.height).append('g').attr('transform', "translate(".concat(locationX, ",").concat(locationY, ")"));
      var gaugeCircleArc = d3.arc().startAngle(gaugeCircleX(0)).endAngle(gaugeCircleX(1)).outerRadius(gaugeCircleY(radius)).innerRadius(gaugeCircleY(radius - circleThickness));
      g.append('path').attr('d', gaugeCircleArc).style('fill', Settings.circleColor).attr('transform', "translate(".concat(radius, ",").concat(radius, ")"));
      var text = g.append('text').text(textRounder(textStartValue) + percentText).attr("class", "liquidFillGaugeText").attr("text-anchor", "middle").attr("font-size", "".concat(textPixels, "px")).style('fill', Settings.textColor).attr('transform', "translate(".concat(radius, ",").concat(textRiseScaleY(Settings.textVertPosition), ")"));
      var clipArea = d3.area().x(function (d) {
        return waveScaleX(d.x);
      }).y0(function (d) {
        return waveScaleY(Math.sin(Math.PI * 2 * Settings.waveOffset * -1 + Math.PI * 2 * (1 - Settings.waveCount) + d.y * 2 * Math.PI));
      }).y1(function (d) {
        return fillCircleRadius * 2 + waveHeight;
      });
      var waveGroup = g.append('defs').append('clipPath').attr('id', "clipWave".concat(rand));
      var wave = waveGroup.append("path").datum(data).attr("d", clipArea).attr("T", 0);
      var fillCircleGroup = g.append('g').attr('clip-path', "url(#clipWave".concat(rand, ")"));
      fillCircleGroup.append('circle').attr('cx', radius).attr('cy', radius).attr('r', fillCircleRadius).style('fill', Settings.waveColor);
      var text2 = fillCircleGroup.append('text').text(textRounder(textStartValue) + percentText).attr('class', 'liquidFillGaugeText').attr('text-anchor', 'middle').attr('font-size', "".concat(textPixels, "px")).style('fill', Settings.waveTextColor).attr('transform', "translate(".concat(radius, ",").concat(textRiseScaleY(Settings.textVertPosition), ")"));

      if (Settings.valueCountUp) {
        var textTween = function textTween() {
          var _this2 = this;

          var i = d3.interpolate(this.textContent, textFinalValue);
          return function (t) {
            _this2.textContent = textRounder(i(t)) + percentText;
          };
        };

        text.transition().duration(Settings.waveRiseTime).tween('text', textTween);
        text2.transition().duration(Settings.waveRiseTime).tween('text', textTween);
      }

      var waveGroupXPosition = fillCircleMargin + fillCircleRadius * 2 - waveClipWidth;

      if (Settings.waveRise) {
        waveGroup.attr('transform', "translate(".concat(waveGroupXPosition, ",").concat(waveRiseScale(0), ")")).transition().duration(Settings.waveRiseTime).attr('transform', "translate(".concat(waveGroupXPosition, ",").concat(waveRiseScale(fillPercent), ")"));
      } else {
        waveGroup.attr('transform', "translate(".concat(waveGroupXPosition, ",").concat(waveRiseScale(fillPercent), ")"));
      }

      function animateWave() {
        wave.attr('transform', 'translate(' + waveAnimateScale(wave.attr('T')) + ',0)');
        wave.transition().duration(Settings.waveAnimateTime * (1 - wave.attr('T'))).ease(d3.easeLinear).attr('transform', 'translate(' + waveAnimateScale(1) + ',0)').attr('T', 1).on('end', function () {
          wave.attr('T', 0);
          animateWave(Settings.waveAnimateTime);
        });
      }

      if (Settings.waveAnimate) {
        animateWave();
      }
    }
  }]);

  return d3liqidFillGauge;
}();