'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 source http://bl.ocks.org/brattonc/5e5ce9beee483220e2f6

 */
var LiquidFillGauge = function (_Component) {
    _inherits(LiquidFillGauge, _Component);

    function LiquidFillGauge() {
        _classCallCheck(this, LiquidFillGauge);

        return _possibleConstructorReturn(this, (LiquidFillGauge.__proto__ || Object.getPrototypeOf(LiquidFillGauge)).apply(this, arguments));
    }

    _createClass(LiquidFillGauge, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                intValue = _props.intValue,
                settings = _objectWithoutProperties(_props, ['intValue']);

            var el = this.el,
                liqidFillGaug = new d3liqidFillGauge(el);
            liqidFillGaug.render(intValue, settings);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement('svg', { ref: function ref(el) {
                    return _this2.el = el;
                } });
        }
    }]);

    return LiquidFillGauge;
}(_react.Component);

LiquidFillGauge.propTypes = {

    /** 輸入資料 */
    intValue: _propTypes2.default.number.isRequired,
    /** SVG 寬 */
    width: _propTypes2.default.number,
    /** SVG 高 */
    height: _propTypes2.default.number,
    /** 最小值 */
    minValue: _propTypes2.default.number,
    /** 最大值 */
    maxValue: _propTypes2.default.number,
    /** 圓的外厚度 (0-1) */
    circleThickness: _propTypes2.default.number,
    /** 圓的邊界(0-1) */
    circleFillGap: _propTypes2.default.number,
    /** 外圍圓的顏色 */
    circleColor: _propTypes2.default.string,
    /** 水波高度(0-1) */
    waveHeight: _propTypes2.default.number,
    /** 水波數量 */
    waveCount: _propTypes2.default.number,
    /** 水波上升速度 */
    waveRiseTime: _propTypes2.default.number,
    /** 水波移動速度 */
    waveAnimateTime: _propTypes2.default.number,
    /** 水波是否上升 */
    waveRise: _propTypes2.default.bool,
    /** 在最高值水波是否縮放 */
    waveHeightScaling: _propTypes2.default.bool,
    /** 水波是否移動 */
    waveAnimate: _propTypes2.default.bool,
    /** 水波的的顏色  */
    waveColor: _propTypes2.default.string,
    /** 水波的偏移量(0-1) */
    waveOffset: _propTypes2.default.number,
    /** 文字的所在位置(0-1) */
    textVertPosition: _propTypes2.default.number,
    /** 文字所顯示的相對高度 1=半徑高  */
    textSize: _propTypes2.default.number,
    /** 文字是否有上升變化 */
    valueCountUp: _propTypes2.default.bool,
    /** 是否顯示 % 單位 */
    displayPercent: _propTypes2.default.bool,
    /** 文字的顏色的的顏色 */
    textColor: _propTypes2.default.string,
    /** 文字在水中的顏色 */
    waveTextColor: _propTypes2.default.string
};
LiquidFillGauge.defaultProps = {
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

};
exports.default = LiquidFillGauge;

var d3liqidFillGauge = function () {
    function d3liqidFillGauge(el) {
        _classCallCheck(this, d3liqidFillGauge);

        this.svg = d3.select(el);
    }

    _createClass(d3liqidFillGauge, [{
        key: 'render',
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

            var g = gauge.attr('width', Settings.width).attr('height', Settings.height).append('g').attr('transform', 'translate(' + locationX + ',' + locationY + ')');

            var gaugeCircleArc = d3.arc().startAngle(gaugeCircleX(0)).endAngle(gaugeCircleX(1)).outerRadius(gaugeCircleY(radius)).innerRadius(gaugeCircleY(radius - circleThickness));

            g.append('path').attr('d', gaugeCircleArc).style('fill', Settings.circleColor).attr('transform', 'translate(' + radius + ',' + radius + ')');

            var text = g.append('text').text(textRounder(textStartValue) + percentText).attr("class", "liquidFillGaugeText").attr("text-anchor", "middle").attr("font-size", textPixels + 'px').style('fill', Settings.textColor).attr('transform', 'translate(' + radius + ',' + textRiseScaleY(Settings.textVertPosition) + ')');
            var clipArea = d3.area().x(function (d) {
                return waveScaleX(d.x);
            }).y0(function (d) {
                return waveScaleY(Math.sin(Math.PI * 2 * Settings.waveOffset * -1 + Math.PI * 2 * (1 - Settings.waveCount) + d.y * 2 * Math.PI));
            }).y1(function (d) {
                return fillCircleRadius * 2 + waveHeight;
            });
            var waveGroup = g.append('defs').append('clipPath').attr('id', 'clipWave' + rand);
            var wave = waveGroup.append("path").datum(data).attr("d", clipArea).attr("T", 0);
            var fillCircleGroup = g.append('g').attr('clip-path', 'url(#clipWave' + rand + ')');
            fillCircleGroup.append('circle').attr('cx', radius).attr('cy', radius).attr('r', fillCircleRadius).style('fill', Settings.waveColor);
            var text2 = fillCircleGroup.append('text').text(textRounder(textStartValue) + percentText).attr('class', 'liquidFillGaugeText').attr('text-anchor', 'middle').attr('font-size', textPixels + 'px').style('fill', Settings.waveTextColor).attr('transform', 'translate(' + radius + ',' + textRiseScaleY(Settings.textVertPosition) + ')');
            if (Settings.valueCountUp) {

                var textTween = function textTween() {
                    var _this3 = this;

                    var i = d3.interpolate(this.textContent, textFinalValue);

                    return function (t) {
                        _this3.textContent = textRounder(i(t)) + percentText;
                    };
                };
                text.transition().duration(Settings.waveRiseTime).tween('text', textTween);
                text2.transition().duration(Settings.waveRiseTime).tween('text', textTween);
            }
            var waveGroupXPosition = fillCircleMargin + fillCircleRadius * 2 - waveClipWidth;

            if (Settings.waveRise) {

                waveGroup.attr('transform', 'translate(' + waveGroupXPosition + ',' + waveRiseScale(0) + ')').transition().duration(Settings.waveRiseTime).attr('transform', 'translate(' + waveGroupXPosition + ',' + waveRiseScale(fillPercent) + ')');
            } else {
                waveGroup.attr('transform', 'translate(' + waveGroupXPosition + ',' + waveRiseScale(fillPercent) + ')');
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