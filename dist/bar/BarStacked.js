"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;var _react=_interopRequireWildcard(require("react")),d3=_interopRequireWildcard(require("d3")),_propTypes=_interopRequireDefault(require("prop-types")),_excluded=["data"],_excluded2=["data"];function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _getRequireWildcardCache(nodeInterop){if("function"!=typeof WeakMap)return null;var cacheBabelInterop=new WeakMap,cacheNodeInterop=new WeakMap;return(_getRequireWildcardCache=function(nodeInterop){return nodeInterop?cacheNodeInterop:cacheBabelInterop})(nodeInterop)}function _interopRequireWildcard(obj,nodeInterop){if(!nodeInterop&&obj&&obj.__esModule)return obj;if(null===obj||"object"!==_typeof(obj)&&"function"!=typeof obj)return{default:obj};var cache=_getRequireWildcardCache(nodeInterop);if(cache&&cache.has(obj))return cache.get(obj);var newObj={},hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj)if("default"!=key&&Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;desc&&(desc.get||desc.set)?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}return newObj["default"]=obj,cache&&cache.set(obj,newObj),newObj}function _typeof(obj){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=_objectWithoutPropertiesLoose(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],0<=excluded.indexOf(key)||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],0<=excluded.indexOf(key)||(target[key]=source[key]);return target}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _defineProperties(target,props){for(var descriptor,i=0;i<props.length;i++)descriptor=props[i],descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,_toPropertyKey(descriptor.key),descriptor)}function _createClass(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Object.defineProperty(Constructor,"prototype",{writable:!1}),Constructor}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function");subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:!0,configurable:!0}}),Object.defineProperty(subClass,"prototype",{writable:!1}),superClass&&_setPrototypeOf(subClass,superClass)}function _setPrototypeOf(o,p){return _setPrototypeOf=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(o,p){return o.__proto__=p,o},_setPrototypeOf(o,p)}function _createSuper(Derived){var hasNativeReflectConstruct=_isNativeReflectConstruct();return function(){var result,Super=_getPrototypeOf(Derived);if(hasNativeReflectConstruct){var NewTarget=_getPrototypeOf(this).constructor;result=Reflect.construct(Super,arguments,NewTarget)}else result=Super.apply(this,arguments);return _possibleConstructorReturn(this,result)}}function _possibleConstructorReturn(self,call){if(call&&("object"===_typeof(call)||"function"==typeof call))return call;if(void 0!==call)throw new TypeError("Derived constructors may only return object or undefined");return _assertThisInitialized(self)}function _assertThisInitialized(self){if(void 0===self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return self}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}function _getPrototypeOf(o){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(o){return o.__proto__||Object.getPrototypeOf(o)},_getPrototypeOf(o)}function _defineProperty(obj,key,value){return key=_toPropertyKey(key),key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _toPropertyKey(arg){var key=_toPrimitive(arg,"string");return"symbol"===_typeof(key)?key:key+""}function _toPrimitive(input,hint){if("object"!==_typeof(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(prim!==void 0){var res=prim.call(input,hint||"default");if("object"!==_typeof(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}var BarStacked=function(_Component){function BarStacked(props){return _classCallCheck(this,BarStacked),_super.call(this,props)}_inherits(BarStacked,_Component);var _super=_createSuper(BarStacked);return _createClass(BarStacked,[{key:"componentDidMount",value:function componentDidMount(){var _this$props=this.props,data=_this$props.data,attr=_objectWithoutProperties(_this$props,_excluded),element=this.element,bar=new D3BarChartStacked(element);bar.render(data,attr)}},{key:"componentDidUpdate",value:function componentDidUpdate(){var _this$props2=this.props,data=_this$props2.data,attr=_objectWithoutProperties(_this$props2,_excluded2),element=this.element,bar=new D3BarChartStacked(element);bar.render(data,attr)}},{key:"render",value:function render(){var _this=this;return _react["default"].createElement("svg",{ref:function ref(element){return _this.element=element}})}}]),BarStacked}(_react.Component);exports["default"]=BarStacked,_defineProperty(BarStacked,"propTypes",{data:_propTypes["default"].array.isRequired,getX:_propTypes["default"].func,keysOfGroups:_propTypes["default"].arrayOf(_propTypes["default"].string),width:_propTypes["default"].number,height:_propTypes["default"].number,chartTitleText:_propTypes["default"].string,tooltipTitle:_propTypes["default"].func,xAxisText:_propTypes["default"].string,yAxisText:_propTypes["default"].string,xAxisTicksTextRotation:_propTypes["default"].number,xPadding:_propTypes["default"].number,marginTop:_propTypes["default"].number,marginRight:_propTypes["default"].number,marginBottom:_propTypes["default"].number,marginLeft:_propTypes["default"].number,xDomain:_propTypes["default"].arrayOf(_propTypes["default"].number),yDomain:_propTypes["default"].arrayOf(_propTypes["default"].number),xRange:_propTypes["default"].arrayOf(_propTypes["default"].number),yRange:_propTypes["default"].arrayOf(_propTypes["default"].number),color:_propTypes["default"].arrayOf(_propTypes["default"].string),animationTime:_propTypes["default"].number,enableAnimation:_propTypes["default"].bool,enableBarValue:_propTypes["default"].bool,enableXAxis:_propTypes["default"].bool,enableYAxis:_propTypes["default"].bool,enableLegend:_propTypes["default"].bool,enableTooltip:_propTypes["default"].bool}),_defineProperty(BarStacked,"defaultProps",{getX:function getX(d){return d.x},keysOfGroups:["y"],width:500,height:300,chartTitleText:"",tooltipTitle:void 0,xAxisText:"",yAxisText:"",xAxisTicksTextRotation:0,xPadding:.1,marginTop:40,marginRight:60,marginBottom:30,marginLeft:60,color:void 0,xDomain:void 0,yDomain:void 0,xRange:void 0,yRange:void 0,animationTime:2e3,enableAnimation:!0,enableBarValue:!0,enableXAxis:!0,enableYAxis:!0,enableLegend:!0,enableTooltip:!0});var D3BarChartStacked=function(){function D3BarChartStacked(element){_classCallCheck(this,D3BarChartStacked),d3.select(element).selectAll("g").remove(),this.svg=d3.select(element)}return _createClass(D3BarChartStacked,[{key:"render",value:function render(data,attr){function yAxisAttr(){yAxis.call(function(g){return g.select(".domain").remove()}).call(function(g){return g.selectAll(".tick line").clone().attr("x2",width-marginLeft-marginRight).attr("stroke-opacity",.1)}).call(function(g){return g.append("text").attr("x",0).attr("y",marginTop-12).attr("text-anchor","start").style("font-size","12px").style("fill","currentColor").text(yAxisText)})}function highlight(_,d){"all"===d||selectedOne||(bar.selectAll(".all").style("opacity",.2),barValue.selectAll(".all").style("opacity",.2),bar.selectAll("._"+d).style("opacity",1))}function noHighlight(){bar.selectAll(".all").style("opacity",1),barValue.selectAll(".all").style("opacity",1)}function selectOne(_,d){selectedOne=!0,groupData.map(function(data){data.group===d||"all"===d?data.group===d&&(selectOneYScale=d3.scaleLinear([0,1.1*d3.max(data.value,function(d){return d.y})],yRange),yAxis.selectAll(".tick").remove(),yAxis.selectAll("text").remove(),yAxis.transition().call(d3.axisLeft(selectOneYScale).ticks(height/40)).duration(500),yAxisAttr(),bar.selectAll("._"+data.group).transition().attr("height",function(d){return selectOneYScale(0)-selectOneYScale(d.y)}).attr("width",xScale.bandwidth()/2).attr("x",function(d){return xScale(d.x)+barWidth/2}).attr("y",function(d){return selectOneYScale(d.y)}).attr("fill",function(d){return colorScale(d.group)}).duration(500),barValue.selectAll("._"+data.group).transition().text(function(d){return d.y}).attr("x",function(d){return xScale(d.x)+barWidth}).attr("y",function(d){return selectOneYScale(d.y)-2}).style("fill","currentColor").duration(500)):(bar.selectAll("._"+data.group).transition().attr("height",0).attr("width",barWidth).attr("x",function(d){return xScale(d.x)+barWidth/2}).attr("y",height-marginBottom).attr("fill","rgba(0, 0, 0, 0)").duration(500),barValue.selectAll("._"+data.group).transition().attr("x",function(d){return xScale(d.x)+barWidth}).attr("y",yScale(0)).style("fill","none").duration(500))})}function selectAll(){selectedOne=!1,yAxis.selectAll(".tick").remove(),yAxis.selectAll("text").remove(),yAxis.transition().call(yAxisType).duration(500),yAxisAttr(),bar.selectAll(".all").transition().attr("height",function(d){return yScale(0)-yScale(d.y)}).attr("width",barWidth).attr("x",function(d){return xScale(d.x)+barWidth/2}).attr("y",function(d){return yScale(d.stackedY)}).attr("fill",function(d){return colorScale(d.group)}).duration(500),barValue.selectAll(".all").transition().attr("x",function(d){return xScale(d.x)+barWidth}).attr("y",function(d){return yScale(d.stackedY)-2}).style("fill","none").duration(500),barValue.selectAll("._"+rowKeys[rowKeys.length-2]).transition().text(function(d){return d.stackedY}).attr("x",function(d){return xScale(d.x)+barWidth}).attr("y",function(d){return yScale(d.stackedY)-2}).style("fill","currentColor").duration(500)}var getX=attr.getX,keysOfGroups=attr.keysOfGroups,width=attr.width,height=attr.height,chartTitleText=attr.chartTitleText,tooltipTitle=attr.tooltipTitle,xAxisText=attr.xAxisText,yAxisText=attr.yAxisText,xPadding=attr.xPadding,marginTop=attr.marginTop,marginRight=attr.marginRight,marginBottom=attr.marginBottom,marginLeft=attr.marginLeft,animationTime=attr.animationTime,color=attr.color,xRange=attr.xRange,yRange=attr.yRange,xDomain=attr.xDomain,yDomain=attr.yDomain,enableLegend=attr.enableLegend,xAxisTicksTextRotation=attr.xAxisTicksTextRotation,enableAnimation=attr.enableAnimation,enableBarValue=attr.enableBarValue,enableXAxis=attr.enableXAxis,enableYAxis=attr.enableYAxis,enableTooltip=attr.enableTooltip;void 0===xRange&&(xRange=[marginLeft,width-marginRight]),void 0===yRange&&(yRange=[height-marginBottom,marginTop]);var x=d3.map(data,getX),rowKeys=[];keysOfGroups.forEach(function(key){return rowKeys.push(key)});var groupData=rowKeys.map(function(k){var newData=[];return d3.map(data,function(d,i){newData.push({x:x[i],y:+d[k],stackedY:+d[k],group:k})}),{group:k,value:newData}});rowKeys.push("all"),groupData.map(function(g,i){g.value.map(function(_,k){1<=i&&(groupData[i].value[k].stackedY+=groupData[i-1].value[k].stackedY)})}),void 0===xDomain&&(xDomain=x.filter(function(d){return""!=d})),void 0===yDomain&&(yDomain=[0,1.1*d3.max(data,function(d){return d3.sum(d3.map(rowKeys,function(k){return d[k]}))})]),xDomain=new d3.InternSet(xDomain);var xScale=d3.scaleBand(xDomain,xRange).padding(xPadding),yScale=d3.scaleLinear(yDomain,yRange),xAxisType=d3.axisBottom(xScale).tickSizeOuter(0),yAxisType=d3.axisLeft(yScale).ticks(height/40),fontSize=(width+height)/1e3+"em";void 0===color&&(color=d3.schemeSet2);var colorScale=d3.scaleOrdinal(rowKeys,color);void 0===tooltipTitle&&(tooltipTitle=function tooltipTitle(d){return"group: ".concat(d.group,"\nx: ").concat(d.x,"\ny: ").concat(d.y)});var svg=this.svg.attr("width",width).attr("height",height).attr("viewBox",[0,0,width,height]).attr("overflow","visible"),yAxis=svg.append("g").attr("transform","translate(".concat(marginLeft,", 0)"));if(enableYAxis&&(yAxis.call(yAxisType),yAxisAttr()),enableXAxis){var xAxis=svg.append("g").attr("transform","translate(0, ".concat(height-marginBottom,")"));xAxis.call(xAxisType),0!=xAxisTicksTextRotation&&xAxis.selectAll("text").attr("text-anchor","start").attr("transform",function(d){return"rotate(".concat(xAxisTicksTextRotation,")")}),xAxis.call(function(g){return g.append("text").attr("x",width-marginRight).attr("y",12).attr("font-size","12px").style("fill","currentColor").text(xAxisText)})}var bar=svg.append("g"),barWidth=xScale.bandwidth()/2,createBar=bar.selectAll("rect"),currentY=[];groupData[0].value.map(function(d){return currentY.push(yScale(d.y))}),groupData.map(function(d,i){createBar.data(d.value).join("rect").attr("class","all _"+d.group).attr("fill",function(d){return colorScale(d.group)}).attr("height",function(d){return yScale(0)-yScale(d.y)}).attr("width",barWidth).attr("x",function(d){return xScale(d.x)+barWidth/2}).attr("y",function(d){return yScale(d.stackedY)})}),enableTooltip&&bar.selectAll("rect").on("mouseover",function showTooltip(_,d){tooltip.style("display",null),tooltip.attr("transform","translate(\n        ".concat(xScale(d.x)+barWidth,",\n        ").concat(selectedOne?selectOneYScale(d.y)-10:yScale(d.stackedY)-10,")")),barValue.select("._"+d.x).style("opacity",0);var path=tooltip.selectAll("path").data([,]).join("path").attr("fill","rgba(250, 250, 250, 0.8)").attr("stroke","rgba(224, 224, 224, 1)").attr("color","black"),text=tooltip.selectAll("text").data([,]).join("text").style("font-size",fontSize).call(function(text){return text.selectAll("tspan").data("".concat(tooltipTitle(d)).split(/\n/)).join("tspan").attr("x",0).attr("y",function(_,i){return"".concat(1.1*i,"em")}).attr("font-weight",function(_,i){return i?null:"bold"}).text(function(d){return d})}),textBox=text.node().getBBox();text.attr("transform","translate(".concat(-textBox.width/2,", ").concat(-textBox.height+5,")")),path.attr("d","M".concat(-textBox.width/2-10,",5H-5l5,5l5,-5H").concat(textBox.width/2+10,"v").concat(-textBox.height-20,"h-").concat(textBox.width+20,"z"))}).on("mouseleave",function hideTooltip(_,d){tooltip.style("display","none"),barValue.select("._"+d.x).style("opacity",1)});var barValue=svg.append("g"),createBarValue=barValue.selectAll("text");enableBarValue&&groupData.map(function(d){createBarValue.data(d.value).join("text").text(function(d){return d.stackedY}).attr("class",function(d){return"all _"+d.x+" _"+d.group}).style("font-size",fontSize).attr("fill","none").attr("text-anchor","middle").attr("x",function(d){return xScale(d.x)+barWidth}).attr("y",function(d){return yScale(d.stackedY)-2})}),barValue.selectAll("._"+rowKeys[rowKeys.length-2]).attr("fill","black");var chartTitle=svg.append("g");chartTitle.call(function(g){return g.append("text").attr("x",marginLeft+(width-marginRight-marginLeft)/2).attr("y",marginTop/2).style("font-weight",550).style("font-size","20px").attr("text-anchor","middle").style("fill","currentColor").text(chartTitleText)}),enableAnimation&&(bar.selectAll("rect").attr("y",height-marginBottom).attr("height",0).attr("fill","rgba(0, 0, 0, 0)").transition().attr("y",function(d){return yScale(d.stackedY)}).attr("height",function(d){return yScale(0)-yScale(d.y)}).attr("fill",function(d){return colorScale(d.group)}).duration(animationTime),enableBarValue&&barValue.selectAll("text").style("fill","currentColor").transition().attrTween("y",function(d){var f=d3.interpolate(yScale(0),yScale(d.stackedY)-2);return function(t){return f(t)}}).textTween(function(d){var f=d3.interpolate(0,d.stackedY);return function(t){return"".concat(d3.format(".0f")(f(t)))}}).duration(animationTime));var selectedOne=!1,selectOneYScale=d3.scaleLinear(),tooltip=svg.append("g").attr("pointer-events","none");if(enableLegend){var legend=svg.append("g").attr("transform","translate(".concat(width-marginRight+20,", ").concat(marginTop,")")).style("cursor","pointer");legend.selectAll("circle").data(rowKeys).join("circle").attr("class",function(d){return"legend_"+d}).attr("cx",0).attr("cy",function(_,i){return 1.1*(20*i)}).attr("r",10).attr("fill",function(d){return colorScale(d)}),legend.selectAll("text").data(rowKeys).join("text").attr("class",function(d){return"legend_"+d}).attr("x",20).attr("y",function(_,i){return 1.1*(20*i)+4}).attr("text-anchor","start").style("font-size","12px").style("font-weight",300).style("fill","currentColor").text(function(d){return d}),setTimeout(function(){rowKeys.slice(0,-1).map(function(d){legend.select(".legend_"+d).on("mouseover",highlight).on("mouseleave",noHighlight).on("click",selectOne)}),legend.select(".legend_all").on("click",selectAll)},animationTime)}}}]),D3BarChartStacked}();