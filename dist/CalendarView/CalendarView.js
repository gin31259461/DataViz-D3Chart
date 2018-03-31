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

var CalendarView = function (_Component) {
  _inherits(CalendarView, _Component);

  function CalendarView(props) {
    _classCallCheck(this, CalendarView);

    return _possibleConstructorReturn(this, (CalendarView.__proto__ || Object.getPrototypeOf(CalendarView)).call(this, props));
  }

  _createClass(CalendarView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          data = _props.data,
          settings = _objectWithoutProperties(_props, ['data']);

      var el = this.el,
          line = new d3Calendar(el);
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

  return CalendarView;
}(_react.Component);

CalendarView.propTypes = {
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
  /** 時間parse 的格式  
  * 
  * [連結](https://github.com/d3/d3-time-format#locale_format)
  * */
  timeParse: _propTypes2.default.string,
  /** 資料的年分 */
  year: _propTypes2.default.number,
  /** 圖表的標題 */
  title: _propTypes2.default.string,
  /** 顏色的原始資料範圍 */
  colordomain: _propTypes2.default.arrayOf(_propTypes2.default.number),
  /** 顏色的對應值 */
  colorrange: _propTypes2.default.objectOf(_propTypes2.default.string),
  /** 是否顯示月份 */
  showmonth: _propTypes2.default.bool,
  /** 是否顯示圖例 */
  showlegend: _propTypes2.default.bool,
  /** 月份在圖表高度的對應位置 */
  monthpos: _propTypes2.default.number,
  /** 取出日期欄位函式 */
  getdate: _propTypes2.default.func,
  /** 取出數值欄位的函式 */
  getvalue: _propTypes2.default.func,
  /** 取出提示字欄位的函式 */
  gettip: _propTypes2.default.func,
  /** 時間後觸發事件 */
  onClick: _propTypes2.default.func,
  /** 動畫時間 (ms) */
  AnimateTime: _propTypes2.default.number
};
CalendarView.defaultProps = {
  width: 800,
  height: 200,
  margintop: 50,
  marginbottom: 30,
  marginright: 50,
  marginleft: 40,
  year: 2018,
  title: '2018',
  dateParse: "%Y-%m-%d",
  colordomain: [1, 30],
  colorrange: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837"],
  showmonth: true,
  showlegend: true,
  monthpos: 1,
  getdate: function getdate(d) {
    return d.date;
  },
  getvalue: function getvalue(d) {
    return d.count;
  },
  gettip: function gettip(d) {
    return d.date + ' : ' + d.count;
  },
  onClick: function onClick(d, i) {},
  AnimateTime: 1000
};

var d3Calendar = function () {
  function d3Calendar(el) {
    _classCallCheck(this, d3Calendar);

    this.svg = d3.select(el);
  }

  _createClass(d3Calendar, [{
    key: 'render',
    value: function render(data, settings) {
      var width = settings.width,
          height = settings.height,
          margintop = settings.margintop,
          marginbottom = settings.marginbottom,
          marginright = settings.marginright,
          marginleft = settings.marginleft,
          title = settings.title,
          year = settings.year,
          colordomain = settings.colordomain,
          colorrange = settings.colorrange,
          getdate = settings.getdate,
          getvalue = settings.getvalue,
          gettip = settings.gettip,
          showmonth = settings.showmonth,
          monthpos = settings.monthpos,
          showlegend = settings.showlegend,
          dateParse = settings.dateParse,
          onClick = settings.onClick,
          AnimateTime = settings.AnimateTime;

      var color = d3.scaleQuantize().domain(colordomain).range(colorrange);
      var cellSize = width / 52,
          monthformat = d3.timeFormat(" %m 月");
      data.map(function (d) {
        d._date = getdate(d), d._count = getvalue(d);
      });

      var tmp = d3.nest().key(function (d) {
        return d._date;
      }).object(data);
      var g = this.svg.attr('width', width + marginleft + marginright).attr('height', height + margintop + marginbottom).append('g').attr('transform', 'translate( ' + marginleft + ' , ' + margintop + ' )');

      g.append('text').text(title).attr('fill', '#000').attr('font-size', 24).attr('font-weight', 'bold').attr('text-anchor', 'middle').attr('transform', 'translate( ' + width / 2 + ' , ' + -10 + ' )');
      var rect = g.selectAll("rect").data(d3.timeDays(new Date(year, 0, 1), new Date(year + 1, 0, 1))).enter().append("rect").attr("width", cellSize).attr("height", cellSize).attr("fill", "none").attr("stroke", "#ccc").attr("x", function (d) {
        return d3.timeWeek.count(d3.timeYear(d), d) * cellSize;
      }).attr("y", function (d) {
        return d.getDay() * cellSize;
      }).datum(d3.timeFormat(dateParse));

      var monthg = g.append("g").attr("fill", "none").attr("stroke", "#000").selectAll("path").data(d3.timeMonths(new Date(year, 0, 1), new Date(year + 1, 0, 1))).enter();

      monthg.append("path").attr("d", pathMonth);
      if (showmonth) {
        monthg.append('text').attr('text-anchor', 'middle').attr('transform', function (d) {
          var w0 = d3.timeWeek.count(d3.timeYear(d), d),
              t1 = new Date(d.getFullYear(), d.getMonth() + 1, 0),
              w1 = d3.timeWeek.count(d3.timeYear(t1), t1);
          return 'translate( ' + (w0 * cellSize + 2.5 * cellSize) + ' , ' + cellSize * 8 * monthpos + ' )';
        }).text(function (d) {
          return monthformat(d);
        });
      }

      var rectfiter = rect.filter(function (d) {
        return d in tmp;
      }).on('click', function (d, i) {
        return onClick(tmp[d][0], i);
      }).attr('cursor', 'pointer').on("mouseover", function () {
        d3.select(this).attr('stroke', '#f00').attr('stroke-width', 3);
      }).on("mouseout", function () {
        d3.select(this).attr('stroke', '#ccc').attr('stroke-width', 1);
      }).attr("width", 0);
      rectfiter.transition().duration(AnimateTime).attr("width", cellSize).attr("fill", function (d) {
        return color(tmp[d][0]._count);
      });
      rectfiter.append("title").text(function (d) {
        return gettip(tmp[d][0]);
      });

      if (showlegend) {
        var colorset = new Set();
        colorrange.map(function (d) {
          return colorset.add(parseInt(color.invertExtent(d)[1]));
        });
        var colorlen = [].concat(_toConsumableArray(colorset)).length;
        var colort = 500 / colorlen;
        var legend = g.append('g').selectAll("g").data([].concat(_toConsumableArray(colorset))).enter().append('g');
        var legendrect = legend.append('rect').transition().delay(AnimateTime - 500).attr('transform', function (d, i) {
          return 'translate( ' + 30 * i + ' , ' + cellSize * 8.5 + ')';
        }).attr('fill', 'rgba(0,0,0,0)').attr('width', 0).transition().delay(function (d, i) {
          return colort * i;
        }).duration(colort).attr('width', 30).attr('height', 10).style("fill", function (d, i) {
          return color(d);
        });

        var legendtext = legend.append('text').transition().delay(AnimateTime - 500).attr('text-anchor', 'middle').attr('font-size', 10).attr('transform', function (d, i) {
          return 'translate( ' + 30 * (i + 1) + ' , ' + cellSize * 10 + ')';
        }).attr('fill', 'rgba(0,0,0,0)').transition().delay(function (d, i) {
          return colort * i;
        }).duration(colort).attr('fill', '#000').text(function (d) {
          return d;
        });
      }

      function pathMonth(t0) {
        var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
            d0 = t0.getDay(),
            w0 = d3.timeWeek.count(d3.timeYear(t0), t0),
            d1 = t1.getDay(),
            w1 = d3.timeWeek.count(d3.timeYear(t1), t1);
        return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize + "H" + w0 * cellSize + "V" + 7 * cellSize + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize + "H" + (w1 + 1) * cellSize + "V" + 0 + "H" + (w0 + 1) * cellSize + "Z";
      }
    }
  }]);

  return d3Calendar;
}();

exports.default = CalendarView;