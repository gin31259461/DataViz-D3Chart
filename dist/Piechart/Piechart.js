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

var Piechart = function (_Component) {
  _inherits(Piechart, _Component);

  function Piechart(props) {
    _classCallCheck(this, Piechart);

    return _possibleConstructorReturn(this, (Piechart.__proto__ || Object.getPrototypeOf(Piechart)).call(this, props));
  }

  _createClass(Piechart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          data = _props.data,
          settings = _objectWithoutProperties(_props, ['data']);

      var el = this.el,
          pie = new d3pie(el);
      pie.render(data, settings);
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

  return Piechart;
}(_react.Component);

Piechart.propTypes = {
  /** 資料的來源 */
  data: _propTypes2.default.array.isRequired,
  /** SVG 的寬度 */
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
  /** 圓餅圖的半徑*/

  radius: _propTypes2.default.number,
  /** 圓餅外圈的縮放倍數  */
  outerRadius: _propTypes2.default.number,
  /** 圓餅內圈的半徑倍數  */
  innerRadius: _propTypes2.default.number,
  /** 取出資料分類欄位的函式 */
  gettext: _propTypes2.default.func,
  /** 取出資料數值欄位的函式 */
  getvalue: _propTypes2.default.func,
  /** 給定分類資料的對樣顏色 */
  color: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.arrayOf(_propTypes2.default.string)]),
  /** 點擊圖表觸發函式 */
  onClick: _propTypes2.default.func
};
Piechart.defaultProps = {
  width: 200,
  height: 200,
  margintop: 50,
  marginbottom: 30,
  marginright: 50,
  marginleft: 40,
  radius: 100,
  outerRadius: .9,
  innerRadius: 0,
  gettext: function gettext(d) {
    return d.text;
  },
  getvalue: function getvalue(d) {
    return d.count;
  },
  color: d3.scaleOrdinal(d3.schemeCategory20),
  onClick: function onClick(d, i) {}

};

var d3pie = function () {
  function d3pie(el) {
    _classCallCheck(this, d3pie);

    this.svg = d3.select(el);
  }

  _createClass(d3pie, [{
    key: 'render',
    value: function render(data, settings) {
      var width = settings.width,
          height = settings.height,
          margintop = settings.margintop,
          marginbottom = settings.marginbottom,
          marginright = settings.marginright,
          marginleft = settings.marginleft,
          color = settings.color,
          radius = settings.radius,
          outerRadius = settings.outerRadius,
          innerRadius = settings.innerRadius,
          gettext = settings.gettext,
          getvalue = settings.getvalue,
          onClick = settings.onClick;


      var newdata = data.map(function (d) {
        return { text: gettext(d), value: getvalue(d) };
      });
      var arc = d3.arc().outerRadius(radius * outerRadius).innerRadius(radius * innerRadius),
          pie = d3.pie().sort(null).value(function (d) {
        return d.value;
      });
      var g = this.svg.attr('width', width + marginleft + marginright).attr('height', height + margintop + marginbottom).append('g').attr('transform', 'translate(  ' + (width + marginright + marginleft) / 2 + ' , ' + (height + margintop + marginbottom) / 2 + ' )');

      var group = g.selectAll(".arc").data(pie(newdata)).enter().append("g").on('click', onClick);

      group.append("path").attr('class', 'gpath').attr('stroke-width', 1).attr('stroke', '#fff').transition().duration(1500).attrTween('d', function (d) {
        var start = {
          endAngle: d.startAngle
        };
        var interpolate_d = d3.interpolate(start, d);
        return function (t) {
          return arc(interpolate_d(t));
        };
      }).style("fill", function (d) {
        return color(d.data.text);
      });
      var text = group.append("text").attr('class', 'textval').attr("transform", function (d) {
        return 'translate( ' + arc.centroid(d) + ' )';
      }).attr("dy", ".35em").attr("text-anchor", "middle").text(function (d) {
        return d.data.value;
      }).style('font-size', 0).transition().duration(1500).style('font-size', '14px');

      var legend = group.append('g').attr('cursor', 'pointer');
      var legendrect = legend.append('rect').attr('width', 15).attr('height', 15).attr('transform', function (d, i) {
        return 'translate( ' + radius + ' , ' + (30 * i - radius) + ')';
      }).style("fill", function (d) {
        return color(d.data.text);
      });

      var legendtext = legend.append('text').attr('fill', '#000').text(function (d) {
        return d.data.text;
      }).attr('transform', function (d, i) {
        return 'translate( ' + (radius + 20) + ' , ' + (30 * i - radius + 15) + ')';
      });

      legend.on('mouseover', legendMouseOver);
      legend.on('mouseout', legendMouseOut);
      function legendMouseOver(d, i) {

        var item = d3.select(this.parentNode);
        item.select('rect').attr("stroke", '#000');
        item.select('path').attr("transform", 'translate( ' + arc.centroid(d)[0] * .2 + ',' + arc.centroid(d)[1] * .2 + ' )');
        item.select('.textval').attr("transform", 'translate( ' + arc.centroid(d)[0] * 1.2 + ',' + arc.centroid(d)[1] * 1.2 + ' )');
      }
      function legendMouseOut(d, i) {
        group.selectAll('rect').attr("stroke", '#fff');
        group.selectAll('.gpath').attr("transform", function (d) {
          return 'translate( 0,0 )';
        });

        group.selectAll('.textval').attr("transform", function (d) {
          return 'translate( ' + arc.centroid(d) + ' )';
        });
      }
    }
  }]);

  return d3pie;
}();

exports.default = Piechart;