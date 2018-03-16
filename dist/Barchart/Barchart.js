'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Barchart = function (_Component) {
    _inherits(Barchart, _Component);

    function Barchart(props) {
        _classCallCheck(this, Barchart);

        return _possibleConstructorReturn(this, (Barchart.__proto__ || Object.getPrototypeOf(Barchart)).call(this, props));
    }

    _createClass(Barchart, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                data = _props.data,
                settings = _objectWithoutProperties(_props, ['data']);

            var el = this.el,
                bar = new d3bar(el);
            bar.render(data, settings);
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

    return Barchart;
}(_react.Component);

Barchart.propTypes = {
    /** 資料*/
    data: _propTypes2.default.array.isRequired,
    /** SVG 的寬度*/
    width: _propTypes2.default.number,
    /** SVG 的高度 */
    height: _propTypes2.default.number,
    /** SVG 的上邊界 */
    margintop: _propTypes2.default.number,
    /** SVG 的下邊界 */
    marginbottom: _propTypes2.default.number,
    /** SVG 的右邊界 */
    marginright: _propTypes2.default.number,
    /** SVG 的左邊界*/
    marginleft: _propTypes2.default.number,
    /** X軸的取資料函式 */
    getX: _propTypes2.default.func,
    /** Y軸的取資料函式 */
    getY: _propTypes2.default.func,
    /** Y軸的單位 */
    YaxisText: _propTypes2.default.string,
    /** X軸的間隔  ( 0 - 1 )*/
    Xpadding: _propTypes2.default.number,
    /** 給定分類資料的對應顏色陣列 或者d3 顏色函式 */
    color: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.arrayOf(_propTypes2.default.string)]),
    /** 是否呈現數值提示 */
    showtip: _propTypes2.default.bool,
    /** 提示的取資料函式 */
    gettip: _propTypes2.default.func,
    /** 是否呈現網格*/
    showgrid: _propTypes2.default.bool,
    /** 圖表是否上升動畫 */
    barAnimate: _propTypes2.default.bool,
    /** 圖表上升動畫時間 */
    barAnimateTime: _propTypes2.default.number,
    /** 圖表點擊時觸發事件 */
    onClick: _propTypes2.default.func
};
Barchart.defaultProps = {
    width: 500,
    height: 200,
    margintop: 50,
    marginbottom: 30,
    marginright: 50,
    marginleft: 40,
    getX: function getX(d) {
        return d.text;
    },
    getY: function getY(d) {
        return d.count;
    },
    gettip: function gettip(d) {
        return d.count;
    },
    YaxisText: '$',
    Xpadding: .3,
    color: d3.scaleOrdinal(d3.schemeCategory20),
    showgrid: true,
    showtip: true,
    barAnimate: true,
    barAnimateTime: 1000,
    onClick: function onClick(d, i) {}

};

var d3bar = function () {
    function d3bar(el) {
        _classCallCheck(this, d3bar);

        this.svg = d3.select(el);
    }

    _createClass(d3bar, [{
        key: 'render',
        value: function render(data, settings) {
            var width = settings.width,
                height = settings.height,
                margintop = settings.margintop,
                marginbottom = settings.marginbottom,
                marginright = settings.marginright,
                marginleft = settings.marginleft,
                getX = settings.getX,
                getY = settings.getY,
                gettip = settings.gettip,
                Xpadding = settings.Xpadding,
                YaxisText = settings.YaxisText,
                showgrid = settings.showgrid,
                showtip = settings.showtip,
                color = settings.color,
                barAnimate = settings.barAnimate,
                barAnimateTime = settings.barAnimateTime,
                onClick = settings.onClick;


            data.map(function (d) {
                d.X = getX(d);
                d.Y = getY(d);
            });
            var x = d3.scaleBand().rangeRound([0, width]).padding(Xpadding),
                y = d3.scaleLinear().rangeRound([height, 0]);

            x.domain(data.map(function (d) {
                return d.X;
            }));
            y.domain([0, d3.max(data, function (d) {
                return d.Y * 1.05;
            })]);

            var g = this.svg.attr('width', width + marginleft + marginright).attr('height', height + margintop + marginbottom).append('g').attr('transform', 'translate( ' + marginleft + ' , ' + margintop + ' )');

            g.append("g").attr("class", "axis axis--x").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));
            g.append("g").attr("class", "axis axis--y").call(d3.axisLeft(y)).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").attr('font-weight', 'bold').attr('fill', 'rgba(0,0,0,1)').text(YaxisText);
            if (showgrid) {
                var grid = g.append('g');
                grid.append("g").call(d3.axisLeft(y).tickSize(-width).tickFormat("")).attr("stroke-opacity", 0.3).attr("stroke-width", 1).attr("shape-rendering", "crispEdges").select('path').attr("stroke-width", 0);
            }

            var bar = g.selectAll(".bar").data(data).enter().append('g');
            var rect = bar.append("rect").style('cursor', 'pointer').attr("class", "bar").attr("x", function (d) {
                return x(d.X);
            }).attr("width", x.bandwidth());
            if (barAnimate) {
                rect.attr("y", function (d) {
                    return height;
                }).attr("height", 0).attr("fill", 'rgba(0,0,0,0)').on('click', onClick).transition().duration(barAnimateTime).attr("y", function (d) {
                    return y(d.Y);
                }).attr("height", function (d) {
                    return height - y(d.Y);
                }).attr("fill", function (d, i) {
                    return Array.isArray(color) ? color[i % color.length] : color(i);
                });
            } else {
                rect.attr("y", function (d) {
                    return y(d.Y);
                }).attr("height", function (d) {
                    return height - y(d.Y);
                }).attr("fill", function (d, i) {
                    return Array.isArray(color) ? color[i % color.length] : color(i);
                });
            }
            if (showtip) {
                bar.append('text').text(gettip).attr("text-anchor", "middle").attr("font-size", 14).attr('fill', 'rgba(255,0,0,0)').attr('font-weight', 'bold').attr('dy', '-0.3em').attr('transform', function (d) {
                    return 'translate(' + (x(d.X) + x.bandwidth() / 2) + ',' + y(d.Y) + ')';
                });
                bar.on('mouseover', function () {
                    var item = d3.select(this);
                    item.select('text').transition().duration(500).attr('fill', 'rgba(0,0,0,1)');
                }).on("mouseout", function () {
                    '';

                    var item = d3.select(this);
                    item.select('text').transition().duration(500).attr("fill", 'rgba(0,0,0,0)');
                });
            }
        }
    }]);

    return d3bar;
}();

exports.default = Barchart;