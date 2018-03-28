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

var Areachart = function (_Component) {
    _inherits(Areachart, _Component);

    function Areachart(props) {
        _classCallCheck(this, Areachart);

        return _possibleConstructorReturn(this, (Areachart.__proto__ || Object.getPrototypeOf(Areachart)).call(this, props));
    }

    _createClass(Areachart, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                data = _props.data,
                settings = _objectWithoutProperties(_props, ['data']);

            var el = this.el,
                area = new d3area(el);
            area.render(data, settings);
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

    return Areachart;
}(_react.Component);

Areachart.propTypes = {
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
    tiptext: _propTypes2.default.func,
    /** X軸的單位 */
    XaxisText: _propTypes2.default.string,
    /** Y軸的單位 */
    YaxisText: _propTypes2.default.string,
    /** 線的顏色 */
    pathcolor: _propTypes2.default.string,
    /** 區塊的顏色 */
    areacolor: _propTypes2.default.string,
    /** 圖表圓點的 circle 的屬性*/
    plotattrs: _propTypes2.default.object,
    /** 圖表圓點的 circle 的 CSS 樣式*/
    plotstyles: _propTypes2.default.object,
    /** 圖表圓點的 circle hover的屬性變化 */
    plotattrs_hover: _propTypes2.default.object,
    /** 圖表圓點的 circle hover的樣式變化 */
    plotstyles_hover: _propTypes2.default.object,
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
    /** 是否呈現網格*/
    showgrid: _propTypes2.default.bool,
    /** 是否呈現提示點*/
    showplottip: _propTypes2.default.bool,
    /** 點擊圓點的觸發事件 */
    plotclick: _propTypes2.default.func,
    /** 動畫時間 (ms) */
    AnimateTime: _propTypes2.default.number
};
Areachart.defaultProps = {
    width: 500,
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
        return d.date + '\n' + d.count;
    },
    plotattrs: {},
    plotstyles: {},
    plotattrs_hover: {},
    plotstyles_hover: {},
    XaxisText: "日",
    YaxisText: "$",
    timeParse: "%Y-%m-%d",
    timeformat: "%m-%d",
    showgrid: true,
    showplottip: true,
    pathcolor: '#ace',
    areacolor: '#a7eae2',
    plotclick: function plotclick(d, i) {
        console.log(d, i);
    },
    AnimateTime: 1000

};

var d3area = function () {
    function d3area(el) {
        _classCallCheck(this, d3area);

        this.svg = d3.select(el);
    }

    _createClass(d3area, [{
        key: 'render',
        value: function render(data, settings) {
            var width = settings.width,
                height = settings.height,
                margintop = settings.margintop,
                marginbottom = settings.marginbottom,
                marginright = settings.marginright,
                marginleft = settings.marginleft,
                lineattr = settings.lineattr,
                plotattrs = settings.plotattrs,
                plotstyles = settings.plotstyles,
                plotattrs_hover = settings.plotattrs_hover,
                plotstyles_hover = settings.plotstyles_hover,
                getX = settings.getX,
                getY = settings.getY,
                tiptext = settings.tiptext,
                areacolor = settings.areacolor,
                pathcolor = settings.pathcolor,
                showplottip = settings.showplottip,
                showgrid = settings.showgrid,
                timeParse = settings.timeParse,
                timeformat = settings.timeformat,
                XaxisText = settings.XaxisText,
                YaxisText = settings.YaxisText,
                AnimateTime = settings.AnimateTime,
                plotclick = settings.plotclick;

            var x = d3.scaleTime().rangeRound([0, width]),
                y = d3.scaleLinear().rangeRound([height, 0]),
                area = d3.area().x(function (d) {
                return x(d._X);
            }).y1(function (d) {
                return y(d._Y);
            }).y0(height),
                area2 = d3.area().x(function (d) {
                return x(d._X);
            }).y1(height).y0(height),
                line = d3.line().x(function (d) {
                return x(d._X);
            }).y(function (d) {
                return y(d._Y);
            });
            var parseTime = d3.timeParse(timeParse);
            data.map(function (d) {
                d._X = parseTime(getX(d));
                d._Y = getY(d);
            });
            x.domain(d3.extent(data, function (d) {
                return d._X;
            }));
            y.domain([0, d3.max(data, function (d) {
                return d._Y;
            })]);

            var g = this.svg.attr('width', width + marginleft + marginright).attr('height', height + margintop + marginbottom).append('g').attr('transform', 'translate( ' + marginleft + ' , ' + margintop + ' )');

            if (showgrid) {
                var grid = g.append('g');
                grid.append("g").call(d3.axisLeft(y).tickSize(-width).tickFormat("")).attr("stroke-opacity", 0.3).attr("stroke-width", 1).attr("shape-rendering", "crispEdges").select('path').attr("stroke-width", 0);
            }
            var gdata = g.datum(data);
            gdata.append("path").attr("fill", areacolor).style("opacity", 0.5).attr('d', function (d) {
                return area2(d);
            }).transition().duration(AnimateTime / 2).attr('d', function (d) {
                return area(d);
            });

            gdata.append("path").attr("fill", "none").attr('d', function (d) {
                return line(d);
            }).call(transition);
            function transition(path) {
                path.transition().ease(d3.easeLinear).delay(AnimateTime / 2).duration(AnimateTime).attr("stroke", pathcolor).attr("stroke-linejoin", "round").attr("stroke-linecap", "round").attr("stroke-width", 1.5).attrTween("stroke-dasharray", tweenDash);
            }
            function tweenDash() {
                var l = this.getTotalLength(),
                    i = d3.interpolateString("0," + l, l + "," + l);
                return function (t) {
                    return i(t);
                };
            }

            var group = g.append('g').selectAll('tip').data(data).enter().append('g');
            group.on('mouseover', gridMouseOver).on("mouseout", gridMouseOut);
            if (showplottip) {
                group.append('circle').attr('cx', function (d) {
                    return x(d._X);
                }).attr('cy', function (d) {
                    return y(d._Y);
                }).attrs(_extends({
                    r: 5,
                    fill: pathcolor
                }, plotattrs)).style("opacity", 0).styles(_extends({ 'cursor': 'pointer' }, plotstyles)).on('click', plotclick);
            }
            group.append('text').text(tiptext).attr("text-anchor", function (d) {
                return x(d._X) < width / 2 ? "start" : "end";
            }).attr("font-size", 0).attr('fill', 'rgba(0,0,0,0)').attr('font-weight', 'bold').attr('dy', '-0.7em').attr('dx', function (d) {
                return x(d._X) < width / 2 ? "0.8em" : '-0.8em';
            }).attr('transform', function (d) {
                return 'translate(' + x(d._X) + ',' + y(d._Y) + ')';
            });

            function gridMouseOver() {
                var item = d3.select(this);
                item.select('text').transition().duration(800).attr('fill', '#000').attr("font-size", 14);
                item.select('circle').transition().duration(800).attrs(_extends({
                    fill: pathcolor
                }, plotattrs_hover)).style("opacity", 1).styles(_extends({}, plotstyles_hover));
            }
            function gridMouseOut() {
                var item = d3.select(this);
                item.select('text').transition().duration(500).attr('fill', 'rgba(0,0,0,0)').attr("font-size", 0);
                item.select('circle').transition().duration(800).style("opacity", 0).styles(_extends({}, plotstyles));
            }
            g.append("g").attr("class", "axis axis--x").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x)).append("text").attr("x", width + 10).attr("dy", "-.71em").style("text-anchor", "end").attr('font-weight', 'bold').attr('fill', 'rgba(0,0,0,1)').text(XaxisText);

            g.append("g").attr("class", "axis axis--y").call(d3.axisLeft(y)).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").attr('font-weight', 'bold').attr('fill', 'rgba(0,0,0,1)').text(YaxisText);
        }
    }]);

    return d3area;
}();

exports.default = Areachart;