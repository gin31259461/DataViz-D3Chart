"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var d3 = _interopRequireWildcard(require("d3"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _excluded = ["data"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AreachartGroup = function (_Component) {
  _inherits(AreachartGroup, _Component);

  var _super = _createSuper(AreachartGroup);

  function AreachartGroup(props) {
    _classCallCheck(this, AreachartGroup);

    return _super.call(this, props);
  }

  _createClass(AreachartGroup, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          data = _this$props.data,
          settings = _objectWithoutProperties(_this$props, _excluded);

      var el = this.el,
          line = new d3line(el);
      line.render(data, settings);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      return _react["default"].createElement("svg", {
        ref: function ref(el) {
          return _this.el = el;
        }
      });
    }
  }]);

  return AreachartGroup;
}(_react.Component);

_defineProperty(AreachartGroup, "propTypes", {
  data: _propTypes["default"].array.isRequired,
  width: _propTypes["default"].number,
  height: _propTypes["default"].number,
  margintop: _propTypes["default"].number,
  marginbottom: _propTypes["default"].number,
  marginright: _propTypes["default"].number,
  marginleft: _propTypes["default"].number,
  getX: _propTypes["default"].func,
  tiptext: _propTypes["default"].func,
  groupkey: _propTypes["default"].arrayOf(_propTypes["default"].string),
  color: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].arrayOf(_propTypes["default"].string)]),
  showgrid: _propTypes["default"].bool,
  showlegend: _propTypes["default"].bool,
  timeParse: _propTypes["default"].string,
  timeformat: _propTypes["default"].string,
  plotclick: _propTypes["default"].func,
  AnimateTime: _propTypes["default"].number
});

_defineProperty(AreachartGroup, "defaultProps", {
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
});

var d3line = function () {
  function d3line(el) {
    _classCallCheck(this, d3line);

    this.svg = d3.select(el);
  }

  _createClass(d3line, [{
    key: "render",
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
        return _objectSpread(_objectSpread({}, d), {}, {
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
          if (d[k]) nd.push(_objectSpread({
            _X: d._X,
            _Y: d[k],
            _K: k
          }, d));
        });
        return {
          id: k,
          value: nd
        };
      });
      var g = this.svg.attr('width', width + marginleft + marginright).attr('height', height + margintop + marginbottom).append('g').attr('transform', "translate( ".concat(marginleft, " , ").concat(margintop, " )"));
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
        return "".concat(d._K, " : ").concat(d._Y);
      }).attr("text-anchor", function (d) {
        return x(d._X) < width / 2 ? "start" : "end";
      }).attr("font-size", 0).attr('fill', 'rgba(0,0,0,0)').attr('font-weight', 'bold').attr('dy', '-0.7em').attr('dx', function (d) {
        return x(d._X) < width / 2 ? "0.8em" : '-0.8em';
      }).attr('transform', function (d) {
        return "translate(".concat(x(d._X), ",").concat(y(d._Y), ")");
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
          return "translate( ".concat(width + 10, " , ").concat(30 * i, ")");
        }).attr('fill', 'rgba(0,0,0,0)').transition().delay(AnimateTime).duration(500).attr('width', 15).attr('height', 15).style("fill", function (d, i) {
          return d == 'all' ? 'rgba(0,0,0,0)' : Array.isArray(color) ? color[i % color.length] : color(d);
        });
        var legendtext = legend.append('text').attr('transform', function (d, i) {
          return "translate( ".concat(width + 30, " , ").concat(30 * i + 15, ")");
        }).attr('fill', 'rgba(0,0,0,0)').transition().delay(AnimateTime).duration(500).attr('fill', '#000').text(function (d) {
          return d;
        });
        legend.attr('cursor', 'pointer').on('click', legendclick);
      }
    }
  }]);

  return d3line;
}();

var _default = AreachartGroup;
exports["default"] = _default;