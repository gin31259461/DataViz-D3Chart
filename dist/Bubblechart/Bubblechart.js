"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;var _react=_interopRequireWildcard(require("react")),d3=_interopRequireWildcard(require("d3")),_propTypes=_interopRequireDefault(require("prop-types"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _getRequireWildcardCache(){if("function"!=typeof WeakMap)return null;var a=new WeakMap;return _getRequireWildcardCache=function(){return a},a}function _interopRequireWildcard(a){if(a&&a.__esModule)return a;if(null===a||"object"!==_typeof(a)&&"function"!=typeof a)return{default:a};var b=_getRequireWildcardCache();if(b&&b.has(a))return b.get(a);var c={},d=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var e in a)if(Object.prototype.hasOwnProperty.call(a,e)){var f=d?Object.getOwnPropertyDescriptor(a,e):null;f&&(f.get||f.set)?Object.defineProperty(c,e,f):c[e]=a[e]}return c["default"]=a,b&&b.set(a,c),c}function _typeof(a){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},_typeof(a)}function _objectWithoutProperties(a,b){if(null==a)return{};var c,d,e=_objectWithoutPropertiesLoose(a,b);if(Object.getOwnPropertySymbols){var f=Object.getOwnPropertySymbols(a);for(d=0;d<f.length;d++)c=f[d],!(0<=b.indexOf(c))&&Object.prototype.propertyIsEnumerable.call(a,c)&&(e[c]=a[c])}return e}function _objectWithoutPropertiesLoose(a,b){if(null==a)return{};var c,d,e={},f=Object.keys(a);for(d=0;d<f.length;d++)c=f[d],0<=b.indexOf(c)||(e[c]=a[c]);return e}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _defineProperties(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}function _createClass(a,b,c){return b&&_defineProperties(a.prototype,b),c&&_defineProperties(a,c),a}function _inherits(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function");a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,writable:!0,configurable:!0}}),b&&_setPrototypeOf(a,b)}function _setPrototypeOf(a,b){return _setPrototypeOf=Object.setPrototypeOf||function(a,b){return a.__proto__=b,a},_setPrototypeOf(a,b)}function _createSuper(a){var b=_isNativeReflectConstruct();return function(){var c,d=_getPrototypeOf(a);if(b){var e=_getPrototypeOf(this).constructor;c=Reflect.construct(d,arguments,e)}else c=d.apply(this,arguments);return _possibleConstructorReturn(this,c)}}function _possibleConstructorReturn(a,b){return b&&("object"===_typeof(b)||"function"==typeof b)?b:_assertThisInitialized(a)}function _assertThisInitialized(a){if(void 0===a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return a}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(a){return!1}}function _getPrototypeOf(a){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(a){return a.__proto__||Object.getPrototypeOf(a)},_getPrototypeOf(a)}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}var Bubblechart=function(a){function b(a){return _classCallCheck(this,b),c.call(this,a)}_inherits(b,a);var c=_createSuper(b);return _createClass(b,[{key:"componentDidMount",value:function componentDidMount(){var a=this.props,b=a.data,c=_objectWithoutProperties(a,["data"]),d=this.el,e=new d3bubble(d);e.render(b,c)}},{key:"render",value:function render(){var a=this;return _react["default"].createElement("svg",{ref:function ref(b){return a.el=b}})}}]),b}(_react.Component);_defineProperty(Bubblechart,"propTypes",{data:_propTypes["default"].array.isRequired,width:_propTypes["default"].number,height:_propTypes["default"].number,margintop:_propTypes["default"].number,marginbottom:_propTypes["default"].number,marginright:_propTypes["default"].number,marginleft:_propTypes["default"].number,getname:_propTypes["default"].func,getvalue:_propTypes["default"].func,getcolor:_propTypes["default"].func,gettip:_propTypes["default"].func,showtip:_propTypes["default"].bool,showlegend:_propTypes["default"].bool,padding:_propTypes["default"].number,color:_propTypes["default"].object,AnimateTime:_propTypes["default"].number,onClick:_propTypes["default"].func}),_defineProperty(Bubblechart,"defaultProps",{width:500,height:200,margintop:50,marginbottom:30,marginright:50,marginleft:40,getname:function getname(a){return a.name},getvalue:function getvalue(a){return a.value},getcolor:function getcolor(a){return a.color},gettip:function gettip(a){return a.value},padding:1,color:{},showtip:!0,showlegend:!0,AnimateTime:1e3,onClick:function onClick(){}});var d3bubble=function(){function a(b){_classCallCheck(this,a),this.svg=d3.select(b)}return _createClass(a,[{key:"render",value:function render(a,b){var c=b.width,d=b.height,e=b.margintop,f=b.marginbottom,h=b.marginright,i=b.marginleft,j=b.getname,k=b.getvalue,l=b.getcolor,m=b.gettip,n=b.padding,o=b.color,p=b.showlegend,q=b.showtip,r=b.AnimateTime,s=b.onClick,t=d3.scaleOrdinal(d3.schemeCategory20),u=[];a.map(function(a){a._name=j(a),a._value=k(a),a._color=l(a),-1==u.indexOf(l(a))&&u.push(l(a))});var v=d3.pack().padding(n).size([c,d]),w=d3.hierarchy({children:a}).sum(function(a){return a._value}).sort(function(c,a){return a.value-c.value}),x=this.svg.attr("width",c+i+h).attr("height",d+e+f).append("g").attr("transform","translate( ".concat(i," , ").concat(e," )")),g=x.selectAll(".node").data(v(w).leaves()).enter().append("g").attr("transform",function(a){return"translate( ".concat(a.x,",").concat(a.y," )")}).on("click",function(a){return s(a.data)});if(g.append("circle").transition().delay(function(b,c){return r*c/a.length}).duration(r).attr("r",function(a){return a.r}).style("fill",function(a){return o[a.data._color]?o[a.data._color]:t(a.data._color)}),g.append("text").style("text-anchor","middle").attr("font-weight","bold").attr("fill","rgba(0,0,0,1)").attr("dy","0.3em").attr("font-size",0).text(function(a){return a.data._name}).transition().delay(function(b,c){return r*c/a.length}).duration(r).attr("font-size",function(a){return"".concat(3*a.r/a.data._name.length,"px")}),q&&g.append("title").text(function(a){return m(a.data)}),p)var y=x.append("g").selectAll("g").data([].concat(u)).enter().append("g"),z=y.append("rect").attr("width",0).attr("height",15).attr("transform",function(a,b){return"translate( ".concat(c+10," , ").concat(30*b,")")}).style("fill",function(a){return o[a]?o[a]:t(a)}).transition().delay(r).duration(500).attr("width",15),A=y.append("text").attr("fill","rgba(0,0,0,0)").text(function(a){return a}).attr("transform",function(a,b){return"translate( ".concat(c+30," , ").concat(30*b+15,")")}).transition().delay(r).duration(500).attr("fill","#000")}}]),a}(),_default=Bubblechart;exports["default"]=_default;