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

var _d3Cloud = require('d3-cloud');

var _d3Cloud2 = _interopRequireDefault(_d3Cloud);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Other = function (_Component) {
  _inherits(Other, _Component);

  function Other(props) {
    _classCallCheck(this, Other);

    return _possibleConstructorReturn(this, (Other.__proto__ || Object.getPrototypeOf(Other)).call(this, props));
  }

  _createClass(Other, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          data = _props.data,
          settings = _props.settings;

      var el = this.refs.el;
      this.Wordcloud = new d3wordcloud(el);
      this.Wordcloud.render(data, settings);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('svg', { ref: 'el' });
    }
  }]);

  return Other;
}(_react.Component);

var d3wordcloud = function () {
  function d3wordcloud(el) {
    _classCallCheck(this, d3wordcloud);

    this.svg = d3.select(el);
  }

  _createClass(d3wordcloud, [{
    key: 'render',
    value: function render(data, settings) {
      var _width$height$margint = _extends({
        width: 600,
        height: 600,
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
        onClick: function onClick(d, i) {
          console.log(d, i);
        }
      }, settings),
          width = _width$height$margint.width,
          height = _width$height$margint.height,
          margintop = _width$height$margint.margintop,
          marginbottom = _width$height$margint.marginbottom,
          marginright = _width$height$margint.marginright,
          marginleft = _width$height$margint.marginleft,
          fontSizedomain = _width$height$margint.fontSizedomain,
          fontSizerange = _width$height$margint.fontSizerange,
          gettext = _width$height$margint.gettext,
          getvalue = _width$height$margint.getvalue,
          colorrange = _width$height$margint.colorrange,
          colordomain = _width$height$margint.colordomain,
          rotate = _width$height$margint.rotate,
          padding = _width$height$margint.padding,
          animation = _width$height$margint.animation,
          onClick = _width$height$margint.onClick;

      var fz_scale = d3.scaleLinear().domain(fontSizedomain).range(fontSizerange);
      this.g = this.svg.attr('width', width + marginleft + marginright).attr('height', height + margintop + marginbottom).append('g').attr('transform', 'translate( ' + (width + marginleft + marginright) / 2 + ' , ' + (height + margintop + marginbottom) / 2 + ' )');

      var words_data = data.map(function (d) {
        return {
          text: gettext(d),
          freq: getvalue(d)
        };
      }).sort(function (a, b) {
        return getvalue(b) - getvalue(a);
      });
      var color = d3.scaleLinear().range(colorrange).domain(colordomain);
      var layout = (0, _d3Cloud2.default)().size([width + marginleft + marginright, height + margintop + marginbottom]).words(words_data).rotate(rotate).padding(padding).fontSize(function (d) {
        return fz_scale(getvalue(d));
      }).start();

      this.tag = this.g.selectAll('.tag').data(words_data);
      this.tag.enter().append('text').on('click', onClick).attr('class', 'tag').attr("text-anchor", "middle").style("fill", "#FFF").attr("transform", function (d) {
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
  }]);

  return d3wordcloud;
}();

exports.default = Other;