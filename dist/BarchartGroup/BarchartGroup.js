'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

require('d3-selection-multi');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BarchartGroup = function (_Component) {
  _inherits(BarchartGroup, _Component);

  function BarchartGroup(props) {
    _classCallCheck(this, BarchartGroup);

    return _possibleConstructorReturn(this, (BarchartGroup.__proto__ || Object.getPrototypeOf(BarchartGroup)).call(this, props));
  }

  _createClass(BarchartGroup, [{
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

  return BarchartGroup;
}(_react.Component);

BarchartGroup.propTypes = {
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
BarchartGroup.defaultProps = {
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
  Xpadding: .1,
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
          x1 = d3.scaleBand().paddingInner(0.05),
          y = d3.scaleLinear().rangeRound([height, 0]);

      x.domain(data.map(function (d) {
        return getX(d);
      }));
      var keys = Xgroup;
      x1.domain(keys).rangeRound([0, x.bandwidth()]);
      y.domain([0, d3.max(data, function (d) {
        return d3.max(keys, function (k) {
          return d[k];
        }) * 1.2;
      })]);

      var g = this.svg.attr('width', width + marginleft + marginright).attr('height', height + margintop + marginbottom).append('g').attr('transform', 'translate( ' + marginleft + ' , ' + margintop + ' )');

      g.append("g").attr("class", "axis axis--x").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x)).selectAll("text").attrs(Xaxisattrs);
      g.append("g").attr("class", "axis axis--y").call(d3.axisLeft(y)).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").attr('font-weight', 'bold').attr('fill', 'rgba(0,0,0,1)').text(YaxisText);
      if (showgrid) {
        var grid = g.append('g');
        grid.append("g").call(d3.axisLeft(y).tickSize(-width).tickFormat("")).attr("stroke-opacity", 0.3).attr("stroke-width", 1).attr("shape-rendering", "crispEdges").select('path').attr("stroke-width", 0);
      }
      var group = g.append("g").selectAll("g").data(data).enter().append("g").attr("transform", function (d) {
        return 'translate(' + x(getX(d)) + ',0)';
      }).on('click', onClick);

      var rect = group.selectAll("rect").data(function (d) {
        return keys.map(function (key) {
          return { key: key, value: d[key] };
        });
      }).enter().append("rect").attr("x", function (d) {
        return x1(d.key);
      }).attr("width", x1.bandwidth()).attr("y", height).attr("height", 0).attr('fill', 'rgba(255,0,0,0)');
      rect.transition().duration(barAnimateTime).attr("y", function (d) {
        return y(d.value);
      }).attr("height", function (d) {
        return height - y(d.value);
      }).attr("fill", function (d, i) {
        return Array.isArray(color) ? color[i % color.length] : color(d.key);
      });

      var legend = g.append('g').selectAll("g").data([].concat(_toConsumableArray(keys), ['all'])).enter().append('g');
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

      if (legendClick) {
        var legendclick = function legendclick(item, i) {
          if (item === 'all') {
            rect.transition().duration(barAnimateTime).attr("x", function (d) {
              return x1(d.key);
            }).attr("width", x1.bandwidth()).attr("y", function (d) {
              return y(d.value);
            }).attr("height", function (d) {
              return height - y(d.value);
            }).attr("fill", function (d, i) {
              return Array.isArray(color) ? color[i % color.length] : color(d.key);
            });
          } else {
            rect.transition().duration(barAnimateTime).attr("y", function (d) {
              return d.key == item ? y(d.value) : height;
            }).attr("height", function (d) {
              return d.key == item ? height - y(d.value) : 0;
            }).attr('fill', function (d, i) {
              return d.key == item ? Array.isArray(color) ? color[i % color.length] : color(d.key) : 'rgba(255,0,0,0)';
            });

            rect.transition().delay(barAnimateTime).duration(barAnimateTime).attr("x", function (d) {
              return d.key == item ? x1(keys[0]) : x1(d.key);
            }).attr("width", function (d, i) {
              return d.key == item ? x.bandwidth() : x1.bandwidth();
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

exports.default = BarchartGroup;