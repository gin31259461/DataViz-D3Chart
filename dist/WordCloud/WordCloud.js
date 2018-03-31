'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _d3Cloud = require('d3-cloud');

var _d3Cloud2 = _interopRequireDefault(_d3Cloud);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WordCloud = function (_Component) {
  _inherits(WordCloud, _Component);

  function WordCloud(props) {
    _classCallCheck(this, WordCloud);

    return _possibleConstructorReturn(this, (WordCloud.__proto__ || Object.getPrototypeOf(WordCloud)).call(this, props));
  }

  _createClass(WordCloud, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          data = _props.data,
          settings = _objectWithoutProperties(_props, ['data']);

      var el = this.el;
      this.Wordcloud = new d3wordcloud(el);
      this.Wordcloud.render(data, settings);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var _props2 = this.props,
          data = _props2.data,
          settings = _objectWithoutProperties(_props2, ['data']);

      this.Wordcloud.update(data, settings);
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

  return WordCloud;
}(_react.Component);

WordCloud.propTypes = {
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
  /** 文字大小的原始資料的數值範圍   */
  fontSizedomain: _propTypes2.default.arrayOf(_propTypes2.default.number),
  /** 文字大小呈現的對應範圍     */
  fontSizerange: _propTypes2.default.arrayOf(_propTypes2.default.number),
  /** 取得文字資料欄位的函式 */
  gettext: _propTypes2.default.func,
  /** 取得文字數值欄位的函式*/
  getvalue: _propTypes2.default.func,
  /** 文字顏色原始資料的數值範圍*/
  colordomain: _propTypes2.default.arrayOf(_propTypes2.default.number),
  /** 文字顏色呈現的對應範圍*/
  colorrange: _propTypes2.default.arrayOf(_propTypes2.default.string),
  /** 給定文字旋轉的數值角度或者函式 */
  rotate: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.func]),
  /** 給定文字邊界的數值或者函式 */
  padding: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.func]),
  /** 動畫時間 (ms)*/
  animation: _propTypes2.default.number,
  /** 點擊文字的觸發事件*/
  onClick: _propTypes2.default.func
};
WordCloud.defaultProps = {
  width: 300,
  height: 300,
  margintop: 50,
  marginbottom: 30,
  marginright: 50,
  marginleft: 40,
  fontSizedomain: [0.5, 2],
  fontSizerange: [15, 75],
  gettext: function gettext(d) {
    return d.text;
  },
  getvalue: function getvalue(d) {
    return d.value;
  },
  colorrange: ['#ace', '#0f0'],
  colordomain: [15, 75],
  rotate: 0,
  padding: 2,
  animation: 1000,
  onClick: function onClick(d, i) {}
};

var d3wordcloud = function () {
  function d3wordcloud(el) {
    _classCallCheck(this, d3wordcloud);

    this.svg = d3.select(el);
  }

  _createClass(d3wordcloud, [{
    key: 'render',
    value: function render(data, settings) {
      var width = settings.width,
          height = settings.height,
          margintop = settings.margintop,
          marginbottom = settings.marginbottom,
          marginright = settings.marginright,
          marginleft = settings.marginleft,
          fontSizedomain = settings.fontSizedomain,
          fontSizerange = settings.fontSizerange,
          gettext = settings.gettext,
          getvalue = settings.getvalue,
          colorrange = settings.colorrange,
          colordomain = settings.colordomain,
          rotate = settings.rotate,
          padding = settings.padding,
          animation = settings.animation,
          onClick = settings.onClick;


      var fz_scale = d3.scaleLinear().domain(fontSizedomain).range(fontSizerange);
      this.g = this.svg.attr('width', width + marginleft + marginright).attr('height', height + margintop + marginbottom).append('g').attr('transform', 'translate( ' + (width + marginleft + marginright) / 2 + ' , ' + (height + margintop + marginbottom) / 2 + ' )');

      var words_data = data.map(function (d) {
        return {
          text: gettext(d),
          freq: getvalue(d)
        };
      });
      var color = d3.scaleLinear().range(colorrange).domain(colordomain);
      var layout = (0, _d3Cloud2.default)().size([width + marginleft + marginright, height + margintop + marginbottom]).words(words_data).rotate(rotate).padding(padding).fontSize(function (d) {
        return fz_scale(d.freq);
      }).start();

      this.tag = this.g.selectAll('.tag').data(words_data).enter().append('text');

      this.tag.on('click', onClick).attr('class', 'tag').attr("text-anchor", "middle").style("fill", "#FFF").attr("transform", function (d) {
        return 'translate(' + (width * Math.random() - width / 2) + ', ' + (height * Math.random() - height / 2) + ')';
      }).transition().duration(animation).attr("transform", function (d) {
        return 'translate(' + d.x + ', ' + d.y + ')';
      }).attr('font-size', function (d) {
        return d.size + 'px';
      }).style("fill", function (d, i) {
        return color(d.size);
      }).text(function (d) {
        return d.text;
      });
    }
  }, {
    key: 'update',
    value: function update(data, settings) {
      var width = settings.width,
          height = settings.height,
          margintop = settings.margintop,
          marginbottom = settings.marginbottom,
          marginright = settings.marginright,
          marginleft = settings.marginleft,
          fontSizedomain = settings.fontSizedomain,
          fontSizerange = settings.fontSizerange,
          gettext = settings.gettext,
          getvalue = settings.getvalue,
          colorrange = settings.colorrange,
          colordomain = settings.colordomain,
          rotate = settings.rotate,
          padding = settings.padding,
          animation = settings.animation,
          onClick = settings.onClick;

      var words_data = data.map(function (d) {
        return {
          text: gettext(d),
          freq: getvalue(d)
        };
      });
      var fz_scale = d3.scaleLinear().domain(fontSizedomain).range(fontSizerange);
      var color = d3.scaleLinear().range(colorrange).domain(colordomain);
      var layout = (0, _d3Cloud2.default)().size([width + marginleft + marginright, height + margintop + marginbottom]).words(words_data).rotate(rotate).padding(padding).fontSize(function (d) {
        return fz_scale(d.freq);
      }).start();
      this.tag.data(words_data).transition().duration(animation).attr("transform", function (d) {
        return 'translate(' + d.x + ', ' + d.y + ')';
      }).attr('font-size', function (d) {
        return d.size + 'px';
      }).style("fill", function (d, i) {
        return color(d.size);
      }).text(function (d) {
        return d.text;
      });
      this.tag.data(words_data).exit().remove();
    }
  }]);

  return d3wordcloud;
}();

exports.default = WordCloud;