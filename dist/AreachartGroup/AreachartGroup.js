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

var AreachartGroup = function (_Component) {
    _inherits(AreachartGroup, _Component);

    function AreachartGroup(props) {
        _classCallCheck(this, AreachartGroup);

        return _possibleConstructorReturn(this, (AreachartGroup.__proto__ || Object.getPrototypeOf(AreachartGroup)).call(this, props));
    }

    _createClass(AreachartGroup, [{
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

    return AreachartGroup;
}(_react.Component);

AreachartGroup.propTypes = {
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
    color: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.arrayOf(_propTypes2.default.string)]),
    /** 是否呈現網格*/
    showgrid: _propTypes2.default.bool,
    /** 是否呈現圖例*/
    showlegend: _propTypes2.default.bool,
    /** 時間parse 的格式  
    * 
    * [連結](https://github.com/d3/d3-time-format#locale_format)
    * */
    timeParse: _propTypes2.default.string,
    /** 時間呈現的格式  
     * 
     * [連結](https://github.com/d3/d3-time-format#locale_format)
     * */
    timeformat: _propTypes2.default.string,
    /** 每個點 的觸發事件 */
    plotclick: _propTypes2.default.func,
    /** 線的動畫時間 (ms)*/
    AnimateTime: _propTypes2.default.number
};
AreachartGroup.defaultProps = {
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
    showgrid: true,
    showlegend: true,
    plotclick: function plotclick(d, i) {},
    AnimateTime: 1000

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
                showgrid = settings.showgrid,
                showlegend = settings.showlegend,
                color = settings.color,
                AnimateTime = settings.AnimateTime,
                plotclick = settings.plotclick,
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
                return x(d._X);
            }).y(function (d) {
                return y(d._Y);
            }),
                line2 = d3.line().curve(d3.curveLinear).x(function (d) {
                return x(d._X);
            }).y(function (d) {
                return height;
            }),
                area = d3.area().x(function (d) {
                return x(d._X);
            }).y1(function (d) {
                return y(d._Y);
            }).y0(height),
                area2 = d3.area().x(function (d) {
                return x(d._X);
            }).y1(height).y0(height);
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
                    if (d[k]) nd.push(_extends({ _X: d._X, _Y: d[k], _K: k }, d));
                });
                return { id: k, value: nd };
            });
            var g = this.svg.attr('width', width + marginleft + marginright).attr('height', height + margintop + marginbottom).append('g').attr('transform', 'translate( ' + marginleft + ' , ' + margintop + ' )');
            g.append("g").attr("class", "axis axis--x").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x).tickFormat(d3.timeFormat(timeformat)));
            g.append("g").attr("class", "axis axis--y").call(d3.axisLeft(y));

            if (showgrid) {
                var grid = g.append('g');
                grid.append("g").call(d3.axisLeft(y).tickSize(-width).tickFormat("")).attr("opacity", 0.3).attr("stroke-width", 1).attr("shape-rendering", "crispEdges").select('path').attr("stroke-width", 0);
            }

            var areag = g.selectAll('.areag').data(newdata).enter().append('g');

            var areapath = areag.append("path").attr("fill", function (d, i) {
                return Array.isArray(color) ? color[i % color.length] : color(d.id);
            }).style("opacity", 0.5).attr('d', function (d) {
                return area2(d.value);
            });
            areapath.transition().duration(AnimateTime / 2).attr('d', function (d) {
                return area(d.value);
            });
            var linepath = areag.append("path").attr("fill", "none").attr('d', function (d) {
                return line(d.value);
            }).call(transition);
            function transition(path) {
                path.transition().ease(d3.easeLinear).delay(AnimateTime / 2).duration(AnimateTime).attr("stroke", function (d, i) {
                    return Array.isArray(color) ? color[i % color.length] : color(d.id);
                }).attr("stroke-linejoin", "round").attr("stroke-linecap", "round").attr("stroke-width", 1.5).attrTween("stroke-dasharray", tweenDash);
            }
            function tweenDash() {
                var l = this.getTotalLength(),
                    i = d3.interpolateString("0," + l, l + "," + l);
                return function (t) {
                    return i(t);
                };
            }

            var tip = areag.selectAll('circle').data(function (d) {
                return d.value;
            }).enter().append('g').on('mouseover', tipMouseOver).on("mouseout", tipMouseOut);

            var circles = tip.append('circle').attr('cx', function (d) {
                return x(d._X);
            }).attr('cy', function (d) {
                return y(d._Y);
            }).attr("stroke", function (d, i) {
                return Array.isArray(color) ? color[i % color.length] : color(d._K);
            }).attr("stroke-width", 1.5).attr('r', 5).attr('fill', '#fff').on('click', plotclick).attr('cursor', 'pointer');
            tip.append('text').text(function (d) {
                return d._K + ' : ' + d._Y;
            }).attr("text-anchor", function (d) {
                return x(d._X) < width / 2 ? "start" : "end";
            }).attr("font-size", 0).attr('fill', 'rgba(0,0,0,0)').attr('font-weight', 'bold').attr('dy', '-0.7em').attr('dx', function (d) {
                return x(d._X) < width / 2 ? "0.8em" : '-0.8em';
            }).attr('transform', function (d) {
                return 'translate(' + x(d._X) + ',' + y(d._Y) + ')';
            });
            function tipMouseOver(d) {
                var item = d3.select(this);
                item.select('text').transition().duration(800).attr('fill', '#000').attr("font-size", 14);
            }
            function tipMouseOut() {
                var item = d3.select(this);
                item.select('text').transition().duration(500).attr('fill', 'rgba(0,0,0,0)').attr("font-size", 0);
            }
            if (showlegend) {
                var legendclick = function legendclick(item, i) {

                    legend.style("opacity", 0.1);
                    d3.select(this).style("opacity", 1);

                    if (item === 'all') {

                        circles.transition().duration(AnimateTime / 2).attr('cy', function (d) {
                            return y(d._Y);
                        }).attr('r', 5);
                        linepath.transition().duration(AnimateTime / 2).attr('d', function (d) {
                            return line(d.value);
                        });
                        areapath.transition().duration(AnimateTime / 2).attr('d', function (d) {
                            return area(d.value);
                        });
                    } else {
                        circles.transition().duration(AnimateTime / 2).attr('cy', function (d) {
                            return d._K == item ? y(d._Y) : height;
                        }).attr('r', function (d) {
                            return d._K == item ? 5 : 0;
                        });
                        areapath.transition().duration(AnimateTime / 2).attr('d', function (d) {
                            return d.id == item ? area(d.value) : area2(d.value);
                        });
                        linepath.transition().duration(AnimateTime / 2).attr('d', function (d) {
                            return d.id == item ? line(d.value) : line2(d.value);
                        });
                    }
                };

                var legend = g.append('g').selectAll("g").data([].concat(_toConsumableArray(keys), ['all'])).enter().append('g').style("opacity", function (d) {
                    return d == 'all' ? 1 : 0.1;
                });
                var legendrect = legend.append('rect').attr('transform', function (d, i) {
                    return 'translate( ' + (width + 10) + ' , ' + 30 * i + ')';
                }).attr('fill', 'rgba(0,0,0,0)').transition().delay(AnimateTime).duration(500).attr('width', 15).attr('height', 15).style("fill", function (d, i) {
                    return d == 'all' ? 'rgba(0,0,0,0)' : Array.isArray(color) ? color[i % color.length] : color(d);
                });

                var legendtext = legend.append('text').attr('transform', function (d, i) {
                    return 'translate( ' + (width + 30) + ' , ' + (30 * i + 15) + ')';
                }).attr('fill', 'rgba(0,0,0,0)').transition().delay(AnimateTime).duration(500).attr('fill', '#000').text(function (d) {
                    return d;
                });
                legend.attr('cursor', 'pointer').on('click', legendclick);
            }
        }
    }]);

    return d3line;
}();

exports.default = AreachartGroup;