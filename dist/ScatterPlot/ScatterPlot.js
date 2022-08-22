"use strict";function _typeof(obj){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.ScatterPlot=void 0;var _react=_interopRequireWildcard(require("react")),d3=_interopRequireWildcard(require("d3")),_propTypes=_interopRequireDefault(require("prop-types")),_excluded=["data"];function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _getRequireWildcardCache(nodeInterop){if("function"!=typeof WeakMap)return null;var cacheBabelInterop=new WeakMap,cacheNodeInterop=new WeakMap;return(_getRequireWildcardCache=function(nodeInterop){return nodeInterop?cacheNodeInterop:cacheBabelInterop})(nodeInterop)}function _interopRequireWildcard(obj,nodeInterop){if(!nodeInterop&&obj&&obj.__esModule)return obj;if(null===obj||"object"!==_typeof(obj)&&"function"!=typeof obj)return{default:obj};var cache=_getRequireWildcardCache(nodeInterop);if(cache&&cache.has(obj))return cache.get(obj);var newObj={},hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj)if("default"!=key&&Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;desc&&(desc.get||desc.set)?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}return newObj["default"]=obj,cache&&cache.set(obj,newObj),newObj}function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=_objectWithoutPropertiesLoose(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],0<=excluded.indexOf(key)||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],0<=excluded.indexOf(key)||(target[key]=source[key]);return target}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _defineProperties(target,props){for(var descriptor,i=0;i<props.length;i++)descriptor=props[i],descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}function _createClass(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Object.defineProperty(Constructor,"prototype",{writable:!1}),Constructor}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function");subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:!0,configurable:!0}}),Object.defineProperty(subClass,"prototype",{writable:!1}),superClass&&_setPrototypeOf(subClass,superClass)}function _setPrototypeOf(o,p){return _setPrototypeOf=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(o,p){return o.__proto__=p,o},_setPrototypeOf(o,p)}function _createSuper(Derived){var hasNativeReflectConstruct=_isNativeReflectConstruct();return function(){var result,Super=_getPrototypeOf(Derived);if(hasNativeReflectConstruct){var NewTarget=_getPrototypeOf(this).constructor;result=Reflect.construct(Super,arguments,NewTarget)}else result=Super.apply(this,arguments);return _possibleConstructorReturn(this,result)}}function _possibleConstructorReturn(self,call){if(call&&("object"===_typeof(call)||"function"==typeof call))return call;if(void 0!==call)throw new TypeError("Derived constructors may only return object or undefined");return _assertThisInitialized(self)}function _assertThisInitialized(self){if(void 0===self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return self}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}function _getPrototypeOf(o){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(o){return o.__proto__||Object.getPrototypeOf(o)},_getPrototypeOf(o)}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}var ScatterPlot=function(_Component){function ScatterPlot(props){return _classCallCheck(this,ScatterPlot),_super.call(this,props)}_inherits(ScatterPlot,_Component);var _super=_createSuper(ScatterPlot);return _createClass(ScatterPlot,[{key:"componentDidMount",value:function componentDidMount(){var _this$props=this.props,data=_this$props.data,attr=_objectWithoutProperties(_this$props,_excluded),element=this.element,scatter=new D3ScatterPlot(element);scatter.render(data,attr)}},{key:"render",value:function render(){var _this=this;return _react["default"].createElement("svg",{ref:function ref(element){return _this.element=element}})}}]),ScatterPlot}(_react.Component);exports.ScatterPlot=ScatterPlot,_defineProperty(ScatterPlot,"propTypes",{data:_propTypes["default"].array.isRequired,getX:_propTypes["default"].func,getY:_propTypes["default"].func,width:_propTypes["default"].number,height:_propTypes["default"].number,chartTitleText:_propTypes["default"].string,tooltipTitle:_propTypes["default"].func,xAxisText:_propTypes["default"].string,yAxisText:_propTypes["default"].string,xAxisTicksTextRotation:_propTypes["default"].number,xType:_propTypes["default"].func,xPadding:_propTypes["default"].number,yType:_propTypes["default"].func,marginTop:_propTypes["default"].number,marginRight:_propTypes["default"].number,marginBottom:_propTypes["default"].number,marginLeft:_propTypes["default"].number,xDomain:_propTypes["default"].arrayOf(_propTypes["default"].number),yDomain:_propTypes["default"].arrayOf(_propTypes["default"].number),xRange:_propTypes["default"].arrayOf(_propTypes["default"].number),yRange:_propTypes["default"].arrayOf(_propTypes["default"].number),dotRadius:_propTypes["default"].number,color:_propTypes["default"].string,animationTime:_propTypes["default"].number,enableAnimation:_propTypes["default"].bool,enableTooltip:_propTypes["default"].bool,enableXAxis:_propTypes["default"].bool,enableYAxis:_propTypes["default"].bool}),_defineProperty(ScatterPlot,"defaultProps",{getX:function getX(d){return d.x},getY:function getY(d){return d.y},width:500,height:300,chartTitleText:"",tooltipTitle:void 0,xAxisText:"",yAxisText:"",xAxisTicksTextRotation:0,xType:d3.scaleBand,xPadding:.1,yType:d3.scaleLinear,marginTop:40,marginRight:40,marginBottom:20,marginLeft:60,xDomain:void 0,yDomain:void 0,xRange:void 0,yRange:void 0,dotRadius:5,color:"steelblue",animationTime:2e3,enableAnimation:!0,enableTooltip:!0,enableXAxis:!0,enableYAxis:!0});var D3ScatterPlot=function(){function D3ScatterPlot(element){_classCallCheck(this,D3ScatterPlot),this.svg=d3.select(element)}return _createClass(D3ScatterPlot,[{key:"render",value:function render(data,attr){var getX=attr.getX,getY=attr.getY,width=attr.width,height=attr.height,chartTitleText=attr.chartTitleText,tooltipTitle=attr.tooltipTitle,xAxisText=attr.xAxisText,yAxisText=attr.yAxisText,marginTop=attr.marginTop,marginRight=attr.marginRight,marginBottom=attr.marginBottom,marginLeft=attr.marginLeft,xAxisTicksTextRotation=attr.xAxisTicksTextRotation,xDomain=attr.xDomain,yDomain=attr.yDomain,xRange=attr.xRange,yRange=attr.yRange,dotRadius=attr.dotRadius,color=attr.color,xType=attr.xType,xPadding=attr.xPadding,yType=attr.yType,animationTime=attr.animationTime,enableAnimation=attr.enableAnimation,enableTooltip=attr.enableTooltip,enableXAxis=attr.enableXAxis,enableYAxis=attr.enableYAxis;void 0===xRange&&(xRange=[marginLeft,width-marginRight]),void 0===yRange&&(yRange=[height-marginBottom,marginTop]);var x=d3.map(data,getX),y=d3.map(d3.map(data,getY),function(d){return+d});void 0===xDomain&&(xDomain=x.filter(function(d){return""!=d})),void 0===yDomain&&(yDomain=[0,1.2*d3.max(y)]),xDomain=new d3.InternSet(xDomain);var I=d3.range(x.length).filter(function(i){return xDomain.has(x[i])}),xScale=xType(xDomain,xRange).padding(xPadding),yScale=yType(yDomain,yRange),xAxisType=d3.axisBottom(xScale).tickSizeOuter(0),yAxisType=d3.axisLeft(yScale).ticks(height/40);void 0===tooltipTitle&&(tooltipTitle=function(i){return"x: ".concat(x[i],"\ny: ").concat(y[i])});var svg=this.svg.attr("width",width).attr("height",height).attr("viewBox",[0,0,width,height]).attr("overflow","visible");if(enableYAxis){var yAxis=svg.append("g").attr("transform","translate(".concat(marginLeft,", 0)"));yAxis.call(yAxisType).call(function(g){return g.select(".domain").remove()}).call(function(g){return g.selectAll(".tick line").clone().attr("x2",width-marginLeft-marginRight).attr("stroke-opacity",.1)}).call(function(g){return g.append("text").attr("x",-20).attr("y",marginTop-25).attr("fill","black").attr("style","12px").attr("text-anchor","start").text(yAxisText)})}if(enableXAxis){var xAxis=svg.append("g").attr("transform","translate(0, ".concat(height-marginBottom,")"));xAxis.call(xAxisType).call(function(g){return g.selectAll(".tick line").clone().attr("y2",-(height-marginTop-marginBottom)).attr("stroke-opacity",.1)}),0!=xAxisTicksTextRotation&&xAxis.selectAll("text").attr("text-anchor","start").attr("transform",function(){return"rotate(".concat(xAxisTicksTextRotation,")")}),xAxis.call(function(g){return g.append("text").attr("x",width-marginRight+25).attr("y",15).attr("fill","black").attr("style","12px").text(xAxisText)})}var chartTitle=svg.append("g");chartTitle.call(function(g){return g.append("text").attr("x",marginLeft+(width-marginRight-marginLeft)/2).attr("y",marginTop/2).attr("fill","black").style("font-size","20px").style("font-weight",550).attr("text-anchor","middle").text(chartTitleText)});var dot=svg.append("g");dot.selectAll("circle").data(I).join("circle").attr("cx",function(i){return xScale(x[i])+xScale.bandwidth()/2}).attr("cy",function(i){return yScale(y[i])}).attr("r",dotRadius).attr("fill",color).attr("stroke","black"),enableTooltip&&dot.selectAll("circle").on("mouseover",function(_,i){tooltip.style("display",null),tooltip.attr("transform","translate(".concat(xScale(x[i])+xScale.bandwidth()/2,", ").concat(yScale(y[i])-10,")"));var path=tooltip.selectAll("path").data([,]).join("path").attr("fill","rgba(250, 250, 250, 0.8)").attr("stroke","rgba(224, 224, 224, 1)").attr("color","black"),text=tooltip.selectAll("text").data([,]).join("text").style("font-size",(width+height)/100+"px").call(function(text){return text.selectAll("tspan").data("".concat(tooltipTitle(i)).split(/\n/)).join("tspan").attr("x",0).attr("y",function(_,i){return"".concat(1.1*i,"em")}).attr("font-weight",function(_,i){return i?null:"bold"}).text(function(d){return d})}),textBox=text.node().getBBox();tooltip.selectAll("path").attr("d",null),text.attr("transform","translate(".concat(-textBox.width/2,", ").concat(-textBox.height+5,")")),path.attr("d","M".concat(-textBox.width/2-10,",5H-5l5,5l5,-5H").concat(textBox.width/2+10,"v").concat(-textBox.height-20,"h-").concat(textBox.width+20,"z"))}).on("mouseleave",function(){tooltip.style("display","none")}),enableAnimation&&dot.selectAll("circle").attr("r",0).transition().attr("r",dotRadius).duration(animationTime);var tooltip=svg.append("g").style("pointer-events","none")}}]),D3ScatterPlot}();