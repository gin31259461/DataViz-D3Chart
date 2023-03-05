"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;var _react=_interopRequireWildcard(require("react")),_propTypes=_interopRequireDefault(require("prop-types")),d3=_interopRequireWildcard(require("d3")),_excluded=["data"],_excluded2=["data"];function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _getRequireWildcardCache(nodeInterop){if("function"!=typeof WeakMap)return null;var cacheBabelInterop=new WeakMap,cacheNodeInterop=new WeakMap;return(_getRequireWildcardCache=function(nodeInterop){return nodeInterop?cacheNodeInterop:cacheBabelInterop})(nodeInterop)}function _interopRequireWildcard(obj,nodeInterop){if(!nodeInterop&&obj&&obj.__esModule)return obj;if(null===obj||"object"!==_typeof(obj)&&"function"!=typeof obj)return{default:obj};var cache=_getRequireWildcardCache(nodeInterop);if(cache&&cache.has(obj))return cache.get(obj);var newObj={},hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj)if("default"!=key&&Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;desc&&(desc.get||desc.set)?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}return newObj["default"]=obj,cache&&cache.set(obj,newObj),newObj}function _typeof(obj){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=_objectWithoutPropertiesLoose(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],0<=excluded.indexOf(key)||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],0<=excluded.indexOf(key)||(target[key]=source[key]);return target}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _defineProperties(target,props){for(var descriptor,i=0;i<props.length;i++)descriptor=props[i],descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,_toPropertyKey(descriptor.key),descriptor)}function _createClass(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Object.defineProperty(Constructor,"prototype",{writable:!1}),Constructor}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function");subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:!0,configurable:!0}}),Object.defineProperty(subClass,"prototype",{writable:!1}),superClass&&_setPrototypeOf(subClass,superClass)}function _setPrototypeOf(o,p){return _setPrototypeOf=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(o,p){return o.__proto__=p,o},_setPrototypeOf(o,p)}function _createSuper(Derived){var hasNativeReflectConstruct=_isNativeReflectConstruct();return function(){var result,Super=_getPrototypeOf(Derived);if(hasNativeReflectConstruct){var NewTarget=_getPrototypeOf(this).constructor;result=Reflect.construct(Super,arguments,NewTarget)}else result=Super.apply(this,arguments);return _possibleConstructorReturn(this,result)}}function _possibleConstructorReturn(self,call){if(call&&("object"===_typeof(call)||"function"==typeof call))return call;if(void 0!==call)throw new TypeError("Derived constructors may only return object or undefined");return _assertThisInitialized(self)}function _assertThisInitialized(self){if(void 0===self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return self}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}function _getPrototypeOf(o){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(o){return o.__proto__||Object.getPrototypeOf(o)},_getPrototypeOf(o)}function _defineProperty(obj,key,value){return key=_toPropertyKey(key),key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _toPropertyKey(arg){var key=_toPrimitive(arg,"string");return"symbol"===_typeof(key)?key:key+""}function _toPrimitive(input,hint){if("object"!==_typeof(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(prim!==void 0){var res=prim.call(input,hint||"default");if("object"!==_typeof(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}var BubbleChart=function(_Component){function BubbleChart(props){return _classCallCheck(this,BubbleChart),_super.call(this,props)}_inherits(BubbleChart,_Component);var _super=_createSuper(BubbleChart);return _createClass(BubbleChart,[{key:"componentDidMount",value:function componentDidMount(){var _this$props=this.props,data=_this$props.data,attr=_objectWithoutProperties(_this$props,_excluded),element=this.element,bubble=new D3BubblePlot(element);bubble.render(data,attr)}},{key:"componentDidUpdate",value:function componentDidUpdate(){var _this$props2=this.props,data=_this$props2.data,attr=_objectWithoutProperties(_this$props2,_excluded2),element=this.element,bubble=new D3BubblePlot(element);bubble.render(data,attr)}},{key:"render",value:function render(){var _this=this;return _react["default"].createElement("svg",{ref:function ref(element){return _this.element=element}})}}]),BubbleChart}(_react.Component);exports["default"]=BubbleChart,_defineProperty(BubbleChart,"propTypes",{data:_propTypes["default"].array.isRequired,getX:_propTypes["default"].func,getY:_propTypes["default"].func,getZ:_propTypes["default"].func,getGroup:_propTypes["default"].func,getTipText:_propTypes["default"].func,width:_propTypes["default"].number,height:_propTypes["default"].number,chartTitleText:_propTypes["default"].string,tooltipTitle:_propTypes["default"].func,xAxisText:_propTypes["default"].string,yAxisText:_propTypes["default"].string,zMaxRadius:_propTypes["default"].number,color:_propTypes["default"].arrayOf(_propTypes["default"].string),xType:_propTypes["default"].string,marginTop:_propTypes["default"].number,marginRight:_propTypes["default"].number,marginBottom:_propTypes["default"].number,marginLeft:_propTypes["default"].number,xDomain:_propTypes["default"].arrayOf(_propTypes["default"].number),yDomain:_propTypes["default"].arrayOf(_propTypes["default"].number),zDomain:_propTypes["default"].arrayOf(_propTypes["default"].number),xDomainScale:_propTypes["default"].number,zDomainScale:_propTypes["default"].number,xRange:_propTypes["default"].arrayOf(_propTypes["default"].number),yRange:_propTypes["default"].arrayOf(_propTypes["default"].number),zRange:_propTypes["default"].arrayOf(_propTypes["default"].number),animationTime:_propTypes["default"].number,enableAnimation:_propTypes["default"].bool,enableLegend:_propTypes["default"].bool,enableXAxis:_propTypes["default"].bool,enableYAxis:_propTypes["default"].bool,enableTooltip:_propTypes["default"].bool}),_defineProperty(BubbleChart,"defaultProps",{getX:function getX(d){return d.x},getY:function getY(d){return d.y},getZ:function getZ(d){return d.z},getGroup:function getGroup(d){return d.color},getTipText:function getTipText(d){return d.tip},width:500,height:300,chartTitleText:"",tooltipTitle:void 0,xAxisText:"",yAxisText:"",zMaxRadius:30,color:void 0,xType:"scaleLinear",marginTop:40,marginRight:60,marginBottom:60,marginLeft:60,xDomain:void 0,yDomain:void 0,zDomain:void 0,xDomainScale:1,zDomainScale:1,xRange:void 0,yRange:void 0,zRange:void 0,animationTime:2e3,enableAnimation:!0,enableLegend:!0,enableXAxis:!0,enableYAxis:!0,enableTooltip:!0});var D3BubblePlot=function(){function D3BubblePlot(element){_classCallCheck(this,D3BubblePlot),d3.select(element).selectAll("g").remove(),this.svg=d3.select(element)}return _createClass(D3BubblePlot,[{key:"render",value:function render(data,attr){var getX=attr.getX,getY=attr.getY,getZ=attr.getZ,getGroup=attr.getGroup,getTipText=attr.getTipText,width=attr.width,height=attr.height,chartTitleText=attr.chartTitleText,tooltipTitle=attr.tooltipTitle,xAxisText=attr.xAxisText,yAxisText=attr.yAxisText,zMaxRadius=attr.zMaxRadius,color=attr.color,xType=attr.xType,marginTop=attr.marginTop,marginRight=attr.marginRight,marginBottom=attr.marginBottom,marginLeft=attr.marginLeft,xDomain=attr.xDomain,yDomain=attr.yDomain,zDomain=attr.zDomain,xDomainScale=attr.xDomainScale,zDomainScale=attr.zDomainScale,xRange=attr.xRange,yRange=attr.yRange,zRange=attr.zRange,animationTime=attr.animationTime,enableAnimation=attr.enableAnimation,enableLegend=attr.enableLegend,enableXAxis=attr.enableXAxis,enableYAxis=attr.enableYAxis,enableTooltip=attr.enableTooltip;void 0===xRange&&(xRange=[marginLeft,width-marginRight]),void 0===yRange&&(yRange=[height-marginBottom,marginTop]),void 0===zRange&&(zRange=[5,zMaxRadius]);var x=d3.map(data,getX),y=d3.map(data,getY),z=d3.map(d3.map(data,getZ),function(d){return+d}),c=d3.map(data,getGroup),t=d3.map(data,getTipText),cUnique=new d3.InternSet(c),I=d3.range(x.length);void 0===xDomain&&("scaleBand"===xType?xDomain=x:"scaleLinear"===xType&&(xDomain=[0,d3.max(x)*xDomainScale])),void 0===yDomain&&(yDomain=[d3.min(y),1.2*d3.max(y)]),void 0===zDomain&&(zDomain=[0,d3.max(z)*zDomainScale]);var xScale;"scaleBand"===xType?xScale=d3.scaleBand(xDomain,xRange):"scaleLinear"===xType&&(xScale=d3.scaleLinear(xDomain,xRange));var yScale=d3.scaleLinear(yDomain,yRange),zScale=d3.scaleLinear(zDomain,zRange);void 0===color&&(color=d3.schemeSet2);var cScale=d3.scaleOrdinal().domain(cUnique).range(color);void 0===tooltipTitle&&(tooltipTitle=function tooltipTitle(i){return"".concat(t[i],"\n").concat(xAxisText,":").concat(x[i],"\n").concat(yAxisText,":").concat(y[i],"\nscale:").concat(z[i])});var svg=this.svg.attr("width",width).attr("height",height).attr("overflow","visible").attr("viewBox",[0,0,width,height]),highlightGroup=function highlightGroup(_,d){bubbles.selectAll(".bubbles").style("opacity",.2),bubbles.selectAll("._"+d).style("opacity",1)},noHighlight=function noHighlight(_,d){bubbles.selectAll(".bubbles").style("opacity",1)};if(enableXAxis){var xAxis=svg.append("g").attr("transform","translate(0, ".concat(height-marginBottom+zMaxRadius,")"));xAxis.call(d3.axisBottom(xScale).tickSizeOuter(0)).call(function(g){return g.append("text").attr("x",width-marginRight).attr("y",12).attr("fill","black").attr("style","12px").text(xAxisText)})}if(enableYAxis){var yAxis=svg.append("g").attr("transform","translate(".concat(marginLeft,", 0)"));yAxis.call(d3.axisLeft(yScale).ticks(height/40).tickSizeOuter(0)).call(function(g){return g.selectAll(".domain").remove()}).call(function(g){return g.selectAll(".tick line").clone().attr("x2",width-marginLeft-marginRight).attr("stroke-opacity",.1)}).call(function(g){return g.append("text").attr("x",0).attr("y",marginTop-12).attr("fill","black").attr("style","12px").attr("text-anchor","start").text(yAxisText)})}var bubbles=svg.append("g");bubbles.selectAll("circle").data(I).join("circle").attr("class",function(i){return"bubbles _"+c[i]+" bubble_"+x[i]}).attr("fill",function(i){return cScale(c[i])}).attr("stroke","black").attr("stroke-width","0.5px").attr("cx",function(i){return xScale(x[i])}).attr("cy",function(i){return yScale(y[i])}).attr("r",0),"scaleBand"===xType?bubbles.selectAll(".bubbles").data(I).attr("cx",function(i){return xScale(x[i])+xScale.bandwidth()/2}):"scaleLinear"===xType&&bubbles.selectAll(".bubbles").data(I).attr("cx",function(i){return xScale(x[i])}),enableTooltip&&bubbles.selectAll("circle").on("mouseover",function showTooltip(_,i){tooltip.style("display",null),"scaleBand"===xType?tooltip.attr("transform","translate(".concat(xScale(x[i])+xScale.bandwidth()/2,", ").concat(yScale(y[i])-zScale(z[i])-10,")")):"scaleLinear"===xType&&tooltip.attr("transform","translate(".concat(xScale(x[i]),", ").concat(yScale(y[i])-zScale(z[i])-10,")"));var path=tooltip.selectAll("path").data([,]).join("path").attr("fill","rgba(250, 250, 250, 0.8)").attr("stroke","black").attr("color","black"),text=tooltip.selectAll("text").data([,]).join("text").attr("id","tooltip-text").style("font-size",(width+height)/1e3+"em").call(function(text){return text.selectAll("tspan").data("".concat(tooltipTitle(i)).split(/\n/)).join("tspan").attr("x",0).attr("y",function(_,i){return"".concat(1.1*i,"em")}).attr("font-weight",function(_,i){return i?null:"bold"}).text(function(d){return d})}),textBox=text.node().getBBox();text.attr("transform","translate(".concat(-textBox.width/2,", ").concat(-textBox.height+5,")")),path.attr("d","M".concat(-textBox.width/2-10,",5H-5l5,5l5,-5H").concat(textBox.width/2+10,"v").concat(-textBox.height-20,"h-").concat(textBox.width+20,"z"))}).on("mouseleave",function hideTooltip(){tooltip.style("display","none")});var chartTitle=svg.append("g");if(chartTitle.call(function(g){return g.append("text").attr("x",marginLeft+(width-marginRight-marginLeft)/2).attr("y",marginTop/2).attr("fill","black").style("font-size","20px").style("font-weight",550).attr("text-anchor","middle").text(chartTitleText)}),enableLegend){var legend=svg.append("g").style("cursor","pointer").attr("transform","translate(".concat(width-marginRight+20,", ").concat(marginTop,")")).selectAll("legend").data(cUnique);legend.join("circle").attr("cx",0).attr("cy",function(_,i){return 1.1*(20*i)}).attr("r",10).attr("fill",function(d){return cScale(d)}).on("mouseover",highlightGroup).on("mouseleave",noHighlight),legend.join("text").attr("x",20).attr("y",function(_,i){return 1.1*(20*i)+4}).attr("text-anchor","start").style("font-size","12px").style("font-weight",300).text(function(d){return d}).on("mouseover",highlightGroup).on("mouseleave",noHighlight)}enableAnimation?bubbles.selectAll("circle").data(I).transition().duration(animationTime).attr("r",function(i){return zScale(z[i])}):bubbles.selectAll("circle").data(I).attr("r",function(i){return zScale(z[i])});var tooltip=svg.append("g").attr("pointer-events","none")}}]),D3BubblePlot}();