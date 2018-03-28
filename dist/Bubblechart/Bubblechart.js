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

var Bubblechart = function (_Component) {
    _inherits(Bubblechart, _Component);

    function Bubblechart(props) {
        _classCallCheck(this, Bubblechart);

        return _possibleConstructorReturn(this, (Bubblechart.__proto__ || Object.getPrototypeOf(Bubblechart)).call(this, props));
    }

    _createClass(Bubblechart, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                data = _props.data,
                settings = _objectWithoutProperties(_props, ['data']);

            var el = this.el;
            var bubble = new d3bubble(el);
            bubble.render(data, settings);
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

    return Bubblechart;
}(_react.Component);

Bubblechart.propTypes = {
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
    /** 取文字資料的函式 */
    getname: _propTypes2.default.func,
    /** 取關於大小資料的函式 */
    getvalue: _propTypes2.default.func,
    /** 取區分顏色資料的函式 */
    getcolor: _propTypes2.default.func,
    /** 取提示資料的函式 */
    gettip: _propTypes2.default.func,
    /** 是否顯示提示字 */
    showtip: _propTypes2.default.bool,
    /** 是否顯示圖例 */
    showlegend: _propTypes2.default.bool,
    /** 圓與圓的距離 */
    padding: _propTypes2.default.number,
    /** 圓的顏色的對應物件 */
    color: _propTypes2.default.object,
    /** 動畫時間 (ms) */
    AnimateTime: _propTypes2.default.number,
    /** 圖表點擊時觸發事件 */
    onClick: _propTypes2.default.func
};
Bubblechart.defaultProps = {
    width: 500,
    height: 200,
    margintop: 50,
    marginbottom: 30,
    marginright: 50,
    marginleft: 40,
    getname: function getname(d) {
        return d.name;
    },
    getvalue: function getvalue(d) {
        return d.value;
    },
    getcolor: function getcolor(d) {
        return d.color;
    },
    gettip: function gettip(d) {
        return d.value;
    },
    padding: 1,
    color: {},
    showtip: true,
    showlegend: true,
    AnimateTime: 1000,
    onClick: function onClick(d, i) {}

};

var d3bubble = function () {
    function d3bubble(el) {
        _classCallCheck(this, d3bubble);

        this.svg = d3.select(el);
    }

    _createClass(d3bubble, [{
        key: 'render',
        value: function render(data, settings) {
            var width = settings.width,
                height = settings.height,
                margintop = settings.margintop,
                marginbottom = settings.marginbottom,
                marginright = settings.marginright,
                marginleft = settings.marginleft,
                getname = settings.getname,
                getvalue = settings.getvalue,
                getcolor = settings.getcolor,
                gettip = settings.gettip,
                padding = settings.padding,
                color = settings.color,
                showlegend = settings.showlegend,
                showtip = settings.showtip,
                AnimateTime = settings.AnimateTime,
                onClick = settings.onClick;


            var defaultcolor = d3.scaleOrdinal(d3.schemeCategory20);
            var keys = [];
            data.map(function (d) {
                d._name = getname(d), d._value = getvalue(d), d._color = getcolor(d);
                if (keys.indexOf(getcolor(d)) == -1) {
                    keys.push(getcolor(d));
                }
            });
            var pack = d3.pack().padding(padding).size([width, height]);
            var dataobj = d3.hierarchy({ children: data }).sum(function (d) {
                return d._value;
            }).sort(function (a, b) {
                return b.value - a.value;
            });
            var g = this.svg.attr('width', width + marginleft + marginright).attr('height', height + margintop + marginbottom).append('g').attr('transform', 'translate( ' + marginleft + ' , ' + margintop + ' )');

            var node = g.selectAll(".node").data(pack(dataobj).leaves()).enter().append("g").attr("transform", function (d) {
                return 'translate( ' + d.x + ',' + d.y + ' )';
            }).on('click', function (d) {
                return onClick(d.data);
            });
            node.append("circle").transition().delay(function (d, i) {
                return AnimateTime * i / data.length;
            }).duration(AnimateTime).attr("r", function (d) {
                return d.r;
            }).style("fill", function (d) {
                return color[d.data._color] ? color[d.data._color] : defaultcolor(d.data._color);
            });

            node.append("text").style("text-anchor", "middle").attr('font-weight', 'bold').attr('fill', 'rgba(0,0,0,1)').attr('dy', '0.3em').attr('font-size', 0).text(function (d) {
                return d.data._name;
            }).transition().delay(function (d, i) {
                return AnimateTime * i / data.length;
            }).duration(AnimateTime).attr('font-size', function (d) {
                return d.r * 3 / d.data._name.length + 'px';
            });

            if (showtip) {
                node.append("title").text(function (d) {
                    return gettip(d.data);
                });
            }
            if (showlegend) {
                var legend = g.append('g').selectAll("g").data([].concat(keys)).enter().append('g');
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
            }
        }
    }]);

    return d3bubble;
}();

exports.default = Bubblechart;