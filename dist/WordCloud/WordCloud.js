'use strict';var _createClass=function(){function a(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,'value'in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),_react=require('react'),_react2=_interopRequireDefault(_react),_d=require('d3'),d3=_interopRequireWildcard(_d),_d3Cloud=require('d3-cloud'),_d3Cloud2=_interopRequireDefault(_d3Cloud),_propTypes=require('prop-types'),_propTypes2=_interopRequireDefault(_propTypes);Object.defineProperty(exports,'__esModule',{value:!0});function _interopRequireWildcard(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b.default=a,b}function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _objectWithoutProperties(a,b){var c={};for(var d in a)0<=b.indexOf(d)||Object.prototype.hasOwnProperty.call(a,d)&&(c[d]=a[d]);return c}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b&&('object'==typeof b||'function'==typeof b)?b:a}function _inherits(a,b){if('function'!=typeof b&&null!==b)throw new TypeError('Super expression must either be null or a function, not '+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var WordCloud=function(a){function b(a){return _classCallCheck(this,b),_possibleConstructorReturn(this,(b.__proto__||Object.getPrototypeOf(b)).call(this,a))}return _inherits(b,a),_createClass(b,[{key:'componentDidMount',value:function componentDidMount(){var a=this.props,b=a.data,c=_objectWithoutProperties(a,['data']),d=this.refs.el;this.Wordcloud=new d3wordcloud(d),this.Wordcloud.render(b,c)}},{key:'render',value:function render(){return _react2.default.createElement('svg',{ref:'el'})}}]),b}(_react.Component);WordCloud.propTypes={data:_propTypes2.default.array.isRequired,width:_propTypes2.default.number,height:_propTypes2.default.number,margintop:_propTypes2.default.number,marginbottom:_propTypes2.default.number,marginright:_propTypes2.default.number,marginleft:_propTypes2.default.number,fontSizedomain:_propTypes2.default.arrayOf(_propTypes2.default.number),fontSizerange:_propTypes2.default.arrayOf(_propTypes2.default.number),gettext:_propTypes2.default.func,getvalue:_propTypes2.default.func,colordomain:_propTypes2.default.arrayOf(_propTypes2.default.number),colorrange:_propTypes2.default.arrayOf(_propTypes2.default.string),rotate:_propTypes2.default.oneOfType([_propTypes2.default.number,_propTypes2.default.func]),padding:_propTypes2.default.oneOfType([_propTypes2.default.number,_propTypes2.default.func]),animation:_propTypes2.default.number,onClick:_propTypes2.default.func},WordCloud.defaultProps={width:600,height:600,margintop:50,marginbottom:30,marginright:50,marginleft:40,fontSizedomain:[0.5,2],fontSizerange:[15,75],gettext:function gettext(a){return a.text},getvalue:function getvalue(a){return a.value},colorrange:['#ace','#0f0'],colordomain:[15,75],rotate:0,padding:2,animation:1e3,onClick:function onClick(){}};var d3wordcloud=function(){function a(b){_classCallCheck(this,a),this.svg=d3.select(b)}return _createClass(a,[{key:'render',value:function render(a,b){var c=b.width,d=b.height,e=b.margintop,f=b.marginbottom,g=b.marginright,h=b.marginleft,i=b.fontSizedomain,j=b.fontSizerange,k=b.gettext,l=b.getvalue,m=b.colorrange,n=b.colordomain,o=b.rotate,p=b.padding,q=b.animation,r=b.onClick,s=d3.scaleLinear().domain(i).range(j);this.g=this.svg.attr('width',c+h+g).attr('height',d+e+f).append('g').attr('transform','translate( '+(c+h+g)/2+' , '+(d+e+f)/2+' )');var t=a.map(function(a){return{text:k(a),freq:l(a)}}).sort(function(c,a){return l(a)-l(c)}),u=d3.scaleLinear().range(m).domain(n),v=(0,_d3Cloud2.default)().size([c+h+g,d+e+f]).words(t).rotate(o).padding(p).fontSize(function(a){return s(a.freq)}).start();console.log(t),this.tag=this.g.selectAll('.tag').data(t),this.tag.enter().append('text').on('click',r).attr('class','tag').attr('text-anchor','middle').style('fill','#FFF').attr('transform',function(){return'translate('+(c*Math.random()-c/2)+', '+(d*Math.random()-d/2)+')'}).transition().duration(q).attr('transform',function(a){return'translate('+a.x+', '+a.y+')'}).attr('font-size',function(a){return a.size+'px'}).style('fill',function(a){return u(a.size)}).text(function(a){return a.text})}}]),a}();exports.default=WordCloud;