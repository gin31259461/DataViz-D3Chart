'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var LinechartMulti = function (_Component) {
    _inherits(LinechartMulti, _Component);

    function LinechartMulti(props) {
        _classCallCheck(this, LinechartMulti);

        return _possibleConstructorReturn(this, (LinechartMulti.__proto__ || Object.getPrototypeOf(LinechartMulti)).call(this, props));
    }

    _createClass(LinechartMulti, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                data = _props.data,
                settings = _objectWithoutProperties(_props, ['data']);

            var el = this.el,
                line = new d3line(el);
            line.render(data, settings);
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

    return LinechartMulti;
}(_react.Component);

LinechartMulti.propTypes = {
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
    /** 提示字的取資料函式 */
    tiptext: _propTypes2.default.func,
    /** 每條線的 資料 key 值 */
    groupkey: _propTypes2.default.arrayOf(_propTypes2.default.string),
    /** 給定 Xgroup 的對應顏色陣列 或者d3 顏色函式 */
    color: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.arrayOf(_propTypes2.default.string)]), /** 時間parse 的格式  
                                                                                                                               * 
                                                                                                                               * [連結](https://github.com/d3/d3-time-format#locale_format)
                                                                                                                               * */
    timeParse: _propTypes2.default.string,
    /** 時間呈現的格式  
     * 
     * [連結](https://github.com/d3/d3-time-format#locale_format)
     * */
    timeformat: _propTypes2.default.string,
    /** 每個提示線 的 callback */
    click: _propTypes2.default.func,
    /** 線的動畫時間 (ms)*/
    lineAnimateTime: _propTypes2.default.number
};
LinechartMulti.defaultProps = {
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

};

var d3line = function () {
    function d3line(el) {
        _classCallCheck(this, d3line);

        this.svg = d3.select(el);
    }

    _createClass(d3line, [{
        key: 'render',
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
                return _extends({}, d, {
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
                    if (d[k]) nd.push({ X: d._X, Y: d[k], K: k });
                });
                return { id: k, value: nd };
            });
            var g = this.svg.attr('width', width + marginleft + marginright).attr('height', height + margintop + marginbottom).append('g').attr('transform', 'translate( ' + marginleft + ' , ' + margintop + ' )');
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
                return 'translate(' + x(d._X) + ',0)';
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
                return 'translate( ' + (width + 10) + ' , ' + 30 * i + ')';
            }).attr('fill', 'rgba(0,0,0,0)').transition().delay(lineAnimateTime).duration(500).attr('width', 15).attr('height', 15).style("fill", function (d, i) {
                return Array.isArray(color) ? color[i % color.length] : color(d);
            });

            var legendtext = legend.append('text').attr('transform', function (d, i) {
                return 'translate( ' + (width + 30) + ' , ' + (30 * i + 15) + ')';
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

exports.default = LinechartMulti;