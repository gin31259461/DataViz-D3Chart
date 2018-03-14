'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

require('d3-selection-multi');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Linechart = function (_Component) {
  _inherits(Linechart, _Component);

  function Linechart(props) {
    _classCallCheck(this, Linechart);

    return _possibleConstructorReturn(this, (Linechart.__proto__ || Object.getPrototypeOf(Linechart)).call(this, props));
  }

  _createClass(Linechart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          data = _props.data,
          settings = _props.settings;

      var el = (0, _reactDom.findDOMNode)(this),
          line = new d3line(el);
      line.render(data, settings);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('svg', null);
    }
  }]);

  return Linechart;
}(_react.Component);

var d3line = function () {
  function d3line(el) {
    _classCallCheck(this, d3line);

    this.svg = d3.select(el);
  }

  _createClass(d3line, [{
    key: 'render',
    value: function render(data, settings) {
      var _width$height$margint = _extends({
        width: 800,
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
          return d.count;
        },
        lineattrs: {},
        linestyles: {},
        plotattrs: {},
        plotstyles: {},
        plotattrs_hover: {},
        plotstykes_hover: {},
        timeParse: '%Y-%m-%d',
        timeformat: '%m-%d',
        showgrid: true,
        showgridtip: true,
        showplottip: true,
        plotclick: function plotclick(d, i) {
          console.log(d, i);
        },
        lineAnimateTime: 1000
      }, settings),
          width = _width$height$margint.width,
          height = _width$height$margint.height,
          margintop = _width$height$margint.margintop,
          marginbottom = _width$height$margint.marginbottom,
          marginright = _width$height$margint.marginright,
          marginleft = _width$height$margint.marginleft,
          lineattr = _width$height$margint.lineattr,
          linestyles = _width$height$margint.linestyles,
          plotattrs = _width$height$margint.plotattrs,
          plotstyles = _width$height$margint.plotstyles,
          plotattrs_hover = _width$height$margint.plotattrs_hover,
          plotstykes_hover = _width$height$margint.plotstykes_hover,
          getX = _width$height$margint.getX,
          getY = _width$height$margint.getY,
          tiptext = _width$height$margint.tiptext,
          showgridtip = _width$height$margint.showgridtip,
          showplottip = _width$height$margint.showplottip,
          showgrid = _width$height$margint.showgrid,
          timeParse = _width$height$margint.timeParse,
          timeformat = _width$height$margint.timeformat,
          lineAnimateTime = _width$height$margint.lineAnimateTime,
          plotclick = _width$height$margint.plotclick;

      var parseTime = d3.timeParse(timeParse);
      data.map(function (d) {
        d.X = parseTime(getX(d));
        d.Y = getY(d);
      });
      var x = d3.scaleTime().range([0, width]),
          y = d3.scaleLinear().rangeRound([height, 0]),
          line = d3.line().x(function (d) {
        return x(d.X);
      }).y(function (d) {
        return y(d.Y);
      });

      x.domain(d3.extent(data, function (d) {
        return d.X;
      }));
      y.domain([0, d3.max(data, function (d) {
        return d.Y * 1.05;
      })]);

      var g = this.svg.attr('width', width + marginleft + marginright).attr('height', height + margintop + marginbottom).append('g').attr('transform', 'translate( ' + marginleft + ' , ' + margintop + ' )');
      g.append("g").attr("class", "axis axis--x").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x).ticks(10).tickFormat(d3.timeFormat(timeformat)));
      g.append("g").attr("class", "axis axis--y").call(d3.axisLeft(y));
      if (showgrid) {
        var grid = g.append('g');
        grid.append('g').call(d3.axisBottom(x).tickSize(height).tickFormat("")).attr("stroke-opacity", 0.3).attr("stroke-width", 1).attr("shape-rendering", "crispEdges").select('path').attr("stroke-width", 0);

        grid.append("g").call(d3.axisLeft(y).tickSize(-width).tickFormat("")).attr("stroke-opacity", 0.3).attr("stroke-width", 1).attr("shape-rendering", "crispEdges").select('path').attr("stroke-width", 0);
      }
      var path = g.datum(data).append("path").attrs(_extends({
        'stroke': '#ace',
        'stroke-linejoin': "round",
        'stroke-linecap': "round",
        'stroke-width': 1.5
      }, lineattr)).styles(_extends({}, linestyles)).attr("fill", "none").attr('d', line);
      var totalLength = path.node().getTotalLength();
      path.attr("stroke-dasharray", totalLength + " " + totalLength).attr("stroke-dashoffset", totalLength).transition().duration(lineAnimateTime).ease(d3.easeLinear).attr("stroke-dashoffset", 0);

      var group = g.append('g').selectAll('tip').data(data).enter().append('g');
      group.on('mouseover', gridMouseOver).on("mouseout", gridMouseOut);

      if (showgridtip) {
        group.append('line').attr('x1', function (d) {
          return x(d.X);
        }).attr('y1', 0).attr('x2', function (d) {
          return x(d.X);
        }).attr("y2", height).attr("stroke", 'rgba(0,0,0,0)').attr("stroke-width", 1);
      }
      group.append('rect').attr("x", function (d) {
        return x(d.X);
      }).attr("y", function (d) {
        return 0;
      }).attr("width", 1).attr("height", height).attr('fill', 'rgba(0,0,0,0)');
      if (showplottip) {
        group.append('circle').attr('cx', function (d) {
          return x(d.X);
        }).attr('cy', function (d) {
          return y(d.Y);
        }).attrs(_extends({
          r: 5,
          fill: '#ace'
        }, plotattrs)).styles(_extends({ 'cursor': 'pointer' }, plotstyles)).on('click', plotclick);
      }
      group.append('text').text(tiptext).attr("text-anchor", "start").attr("font-size", 14).attr('fill', 'rgba(0,0,0,0)').attr('font-weight', 'bold').attr('dy', '1em').attr('dx', '0.8em').attr('transform', function (d) {
        return 'translate(' + x(d.X) + ',' + y(d.Y) + ')';
      });
      function gridMouseOver() {
        var item = d3.select(this);
        item.select('line').transition().duration(100).attr("stroke", '#888').attr("stroke-width", 2);
        item.select('text').attr('dy', '12').transition().duration(800).attr('dy', '0').attr('fill', '#f00');

        item.select('circle').transition().duration(800).attrs(_extends({
          fill: '#f00'
        }, plotattrs_hover)).styles(_extends({}, plotstykes_hover));
      }
      function gridMouseOut() {
        var item = d3.select(this);
        item.select('line').transition().duration(100).attr("stroke", 'rgba(0,0,0,0)');
        item.select('text').transition().duration(500).attr('fill', 'rgba(0,0,0,0)');
        item.select('circle').transition().duration(800).attrs(_extends({
          r: 5,
          fill: '#ace'
        }, plotattrs)).styles(_extends({}, plotstyles));
      }
    }
  }]);

  return d3line;
}();

exports.default = Linechart;