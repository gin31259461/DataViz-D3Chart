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

var ScatterPlotGroup = function (_Component) {
    _inherits(ScatterPlotGroup, _Component);

    function ScatterPlotGroup(props) {
        _classCallCheck(this, ScatterPlotGroup);

        return _possibleConstructorReturn(this, (ScatterPlotGroup.__proto__ || Object.getPrototypeOf(ScatterPlotGroup)).call(this, props));
    }

    _createClass(ScatterPlotGroup, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                data = _props.data,
                settings = _objectWithoutProperties(_props, ['data']);

            var el = this.el,
                plot = new d3plot(el);
            plot.render(data, settings);
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

    return ScatterPlotGroup;
}(_react.Component);

ScatterPlotGroup.propTypes = {
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
    /** 提示字的取資料函式 */
    gettip: _propTypes2.default.func,
    /** 顏色的取資料函式 */
    getcolor: _propTypes2.default.func,
    /** X軸的單位 */
    XaxisText: _propTypes2.default.string,
    /** Y軸的單位 */
    YaxisText: _propTypes2.default.string,
    /** 圓的顏色的對應物件 */
    color: _propTypes2.default.object,
    /**  圓的大小*/
    size: _propTypes2.default.number,
    /** 是否呈現網格*/
    showgrid: _propTypes2.default.bool,
    /** 動畫時間 (ms)*/
    AnimateTime: _propTypes2.default.number,
    /** 點擊圓觸發事件*/
    onClick: _propTypes2.default.func

};
ScatterPlotGroup.defaultProps = {
    width: 500,
    height: 200,
    margintop: 50,
    marginbottom: 30,
    marginright: 50,
    marginleft: 40,
    getX: function getX(d) {
        return d.X;
    },
    getY: function getY(d) {
        return d.Y;
    },
    gettip: function gettip(d) {
        return '( ' + d._X + ' , ' + d._Y + ' )';
    },
    getcolor: function getcolor(d) {
        return d.color;
    },
    XaxisText: 'km/s',
    YaxisText: '$',
    color: { A: '#f00', B: '#ff7f0e' },
    size: 5,
    showgrid: true,
    AnimateTime: 1000,
    onClick: function onClick(d, i) {}

};

var d3plot = function () {
    function d3plot(el) {
        _classCallCheck(this, d3plot);

        this.svg = d3.select(el);
    }

    _createClass(d3plot, [{
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
                getcolor = settings.getcolor,
                XaxisText = settings.XaxisText,
                YaxisText = settings.YaxisText,
                color = settings.color,
                size = settings.size,
                showgrid = settings.showgrid,
                showtip = settings.showtip,
                onClick = settings.onClick,
                AnimateTime = settings.AnimateTime;


            var x = d3.scaleLinear().rangeRound([0, width]),
                y = d3.scaleLinear().rangeRound([height, 0]),
                defaultcolor = d3.scaleOrdinal(d3.schemeCategory20);
            var keys = [];
            data = data.map(function (d) {
                if (keys.indexOf(getcolor(d)) == -1) {
                    keys.push(getcolor(d));
                }

                return _extends({}, d, {
                    _X: getX(d),
                    _Y: getY(d),
                    _color: getcolor(d)
                });
            });

            x.domain([0, d3.max(data, function (d) {
                return d._X * 1.05;
            })]);
            y.domain([0, d3.max(data, function (d) {
                return d._Y * 1.05;
            })]);

            var g = this.svg.attr('width', width + marginleft + marginright).attr('height', height + margintop + marginbottom).append('g').attr('transform', 'translate( ' + marginleft + ' , ' + margintop + ' )');

            g.append("g").attr("class", "axis axis--x").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x)).append("text").attr("x", width).attr("dy", "-.71em").style("text-anchor", "end").attr('font-weight', 'bold').attr('fill', 'rgba(0,0,0,1)').text(XaxisText);

            g.append("g").attr("class", "axis axis--y").call(d3.axisLeft(y)).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").attr('font-weight', 'bold').attr('fill', 'rgba(0,0,0,1)').text(YaxisText);
            if (showgrid) {
                var grid = g.append('g');
                grid.append("g").call(d3.axisLeft(y).tickSize(-width).tickFormat("")).attr("stroke-opacity", 0.2).attr("stroke-width", 1).attr("shape-rendering", "crispEdges").select('path').attr("stroke-width", 0);

                grid.append("g").call(d3.axisBottom(x).tickSize(height).tickFormat("")).attr("stroke-opacity", 0.2).attr("stroke-width", 1).attr("shape-rendering", "crispEdges").select('path').attr("stroke-width", 0);
            }

            var group = g.selectAll("group").data(data).enter().append('g').on('mouseover', tipMouseOver).on("mouseout", tipMouseOut).on('click', onClick).attr('cursor', 'pointer');
            var circle = group.append("circle").attr("class", "circle").attr("cx", function (d) {
                return x(d._X);
            }).attr("cy", function (d) {
                return y(d._Y);
            }).attr("stroke", 'rgba(255,255,255,0)').attr("fill", 'rgba(255,255,255,0)');

            circle.transition().delay(function (d) {
                return Math.random() * AnimateTime;
            }).duration(AnimateTime).attr("r", size).attr("stroke", '#000').attr("fill", function (d) {
                return color[d._color] ? color[d._color] : defaultcolor(d._color);
            });

            group.append('text').text(gettip).attr("font-size", 0).attr('fill', 'rgba(0,0,0,0)').attr('font-weight', 'bold').attr('dx', '0.3em').attr('dy', '-1em').attr('transform', function (d) {
                return 'translate(' + x(d._X) + ',' + y(d._Y) + ')';
            });

            var legend = g.append('g').selectAll("g").data([].concat(keys, ['all'])).enter().append('g').style("opacity", function (d) {
                return d == 'all' ? 1 : 0.1;
            });
            var legendrect = legend.append('rect').attr('width', 0).attr('height', 15).attr('transform', function (d, i) {
                return 'translate( ' + (width + 10) + ' , ' + 30 * i + ')';
            }).style("fill", function (d) {
                return color[d] ? color[d] : defaultcolor(d);
            }).transition().delay(AnimateTime).duration(500).attr('width', 15);

            var legendtext = legend.append('text').attr('fill', 'rgba(0,0,0,0)').text(function (d) {
                return d;
            }).attr('transform', function (d, i) {
                return 'translate( ' + (width + 30) + ' , ' + (30 * i + 15) + ')';
            }).transition().delay(AnimateTime).duration(500).attr('fill', '#000');

            legend.attr('cursor', 'pointer').on('click', legendclick);

            function legendclick(itemd, i) {
                legend.style("opacity", 0.1);
                var item = d3.select(this).style("opacity", 1);
                if (itemd == 'all') {
                    circle.transition().duration(500).attr('r', size);
                } else {
                    circle.transition().duration(500).attr('r', function (d) {
                        return d._color == itemd ? size : 0;
                    });
                }
            }
            function tipMouseOver() {
                var item = d3.select(this);
                item.select('text').transition().duration(500).attr("font-size", 10).attr('fill', 'rgba(0,0,0,1)');
            }
            function tipMouseOut() {
                var item = d3.select(this);
                item.select('text').transition().duration(500).attr("font-size", 0).attr('fill', 'rgba(0,0,0,0)');
            }
        }
    }]);

    return d3plot;
}();

exports.default = ScatterPlotGroup;