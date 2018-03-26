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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BarchartStacked = function (_Component) {
    _inherits(BarchartStacked, _Component);

    function BarchartStacked(props) {
        _classCallCheck(this, BarchartStacked);

        return _possibleConstructorReturn(this, (BarchartStacked.__proto__ || Object.getPrototypeOf(BarchartStacked)).call(this, props));
    }

    _createClass(BarchartStacked, [{
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

    return BarchartStacked;
}(_react.Component);

BarchartStacked.propTypes = {
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
    /** X軸 text 的屬性 */
    Xaxisattrs: _propTypes2.default.object,
    /** X軸的間隔  ( 0 - 1 )*/
    Xpadding: _propTypes2.default.number,
    /** 每個X軸群集的 資料 key 值 */
    Xgroup: _propTypes2.default.arrayOf(_propTypes2.default.string),
    /** Y軸的單位 */
    YaxisText: _propTypes2.default.string,
    /** 給定 Xgroup 的對應顏色陣列 或者d3 顏色函式 */
    color: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.arrayOf(_propTypes2.default.string)]),
    /** 是否呈現網格*/
    showgrid: _propTypes2.default.bool,
    /** 圖表上升動畫時間 */
    barAnimateTime: _propTypes2.default.number,
    /** 長條圖點擊時觸發事件  */
    onClick: _propTypes2.default.func,
    /** 圖例點擊動畫是否啟動 */
    legendClick: _propTypes2.default.bool
};
BarchartStacked.defaultProps = {
    width: 500,
    height: 200,
    margintop: 50,
    marginbottom: 30,
    marginright: 150,
    marginleft: 40,
    getX: function getX(d) {
        return d.text;
    },
    Xgroup: ['groupA', "groupB"],
    Xaxisattrs: {},
    YaxisText: '$',
    Xpadding: .3,
    color: d3.scaleOrdinal(d3.schemeCategory20),
    showgrid: true,
    legendClick: true,
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
                Xpadding = settings.Xpadding,
                YaxisText = settings.YaxisText,
                Xgroup = settings.Xgroup,
                Xaxisattrs = settings.Xaxisattrs,
                showgrid = settings.showgrid,
                color = settings.color,
                barAnimateTime = settings.barAnimateTime,
                legendClick = settings.legendClick,
                onClick = settings.onClick;


            var x = d3.scaleBand().rangeRound([0, width]).padding(Xpadding),
                y = d3.scaleLinear().rangeRound([height, 0]);
            var keys = Xgroup;
            data = data.map(function (d) {
                var total = 0;
                keys.map(function (k) {
                    total += d[k];
                });
                return _extends({}, d, {
                    total: total,
                    X: getX(d)
                });
            });

            x.domain(data.map(function (d) {
                return d.X;
            }));
            y.domain([0, d3.max(data, function (d) {
                return d.total;
            })]).nice();
            var g = this.svg.attr('width', width + marginleft + marginright).attr('height', height + margintop + marginbottom).append('g').attr('transform', 'translate( ' + marginleft + ' , ' + margintop + ' )');

            g.append("g").attr("class", "axis axis--x").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x)).selectAll("text").attrs(Xaxisattrs);

            var axisY = g.append("g").attr("class", "axis axis--y").call(d3.axisLeft(y).ticks(10));

            axisY.append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").attr('font-weight', 'bold').attr('fill', 'rgba(0,0,0,1)').text(YaxisText);
            if (showgrid) {
                var grid = g.append('g');
                grid.append("g").call(d3.axisLeft(y).tickSize(-width).tickFormat("")).attr("stroke-opacity", 0.3).attr("stroke-width", 1).attr("shape-rendering", "crispEdges").select('path').attr("stroke-width", 0);
            }
            var legend = g.append('g').selectAll("g").data([].concat(_toConsumableArray(keys), ['all'])).enter().append('g').style("opacity", function (d) {
                return d == 'all' ? 1 : 0.1;
            });
            var legendrect = legend.append('rect').attr('width', 15).attr('height', 15).attr('transform', function (d, i) {
                return 'translate( ' + width + ' , ' + 30 * i + ')';
            }).style("fill", function (d, i) {
                return Array.isArray(color) ? color[i % color.length] : color(d);
            });
            var legendtext = legend.append('text').attr('fill', '#000').text(function (d) {
                return d;
            }).attr('transform', function (d, i) {
                return 'translate( ' + (width + 20) + ' , ' + (30 * i + 15) + ')';
            });

            var group = g.append("g").selectAll("g").data(d3.stack().keys(keys)(data)).enter().append("g");

            var rect = group.selectAll("rect").data(function (d) {
                d.map(function (item) {
                    return item.key = d.key;
                });return d;
            }).enter().append("rect").attr("x", function (d) {
                return x(d.data.X);
            }).attr("y", function (d) {
                return height;
            }).attr("height", 0).attr("width", x.bandwidth()).on('click', function (d, i) {
                return onClick(d.data, i);
            });

            rect.transition().duration(barAnimateTime).attr("y", function (d) {
                return y(d[1]);
            }).attr("height", function (d) {
                return y(d[0]) - y(d[1]);
            }).attr("fill", function (d) {
                return Array.isArray(color) ? color[i % color.length] : color(d.key);
            });

            if (legendClick) {
                var legendclick = function legendclick(item, i) {
                    legend.style("opacity", 0.1);
                    d3.select(this).style("opacity", 1);
                    if (item === 'all') {
                        y.domain([0, d3.max(data, function (d) {
                            return d.total;
                        })]).nice();
                        axisY.transition().duration(750).call(d3.axisLeft(y).ticks(10));
                        rect.transition().duration(barAnimateTime).attr("y", function (d) {
                            return y(d[1]);
                        }).attr("height", function (d) {
                            return y(d[0]) - y(d[1]);
                        }).attr("fill", function (d) {
                            return Array.isArray(color) ? color[i % color.length] : color(d.key);
                        });
                    } else {
                        y.domain([0, d3.max(data, function (d) {
                            return d[item];
                        })]).nice();
                        axisY.transition().duration(barAnimateTime).call(d3.axisLeft(y).ticks(10));
                        rect.transition().duration(barAnimateTime).attr("y", function (d) {
                            return d.key == item ? height - y(d[0]) + y(d[1]) : height;
                        }).attr("height", function (d) {
                            return d.key == item ? y(d[0]) - y(d[1]) : 0;
                        }).attr('fill', function (d, i) {
                            return d.key == item ? Array.isArray(color) ? color[i % color.length] : color(d.key) : 'rgba(255,0,0,0)';
                        });
                    }
                };

                var legendMouseOver = function legendMouseOver() {
                    var item = d3.select(this);
                    item.select('text').attr('fill', '#f00');
                };

                var legendMouseOut = function legendMouseOut() {
                    var item = d3.select(this);
                    item.select('text').attr('fill', '#000');
                };

                legend.attr('cursor', 'pointer').on('mouseover', legendMouseOver).on("mouseout", legendMouseOut).on('click', legendclick);
            }
        }
    }]);

    return d3bar;
}();

exports.default = BarchartStacked;