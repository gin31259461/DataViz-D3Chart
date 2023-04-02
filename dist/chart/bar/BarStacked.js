"use strict";function _typeof(obj){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=BarStacked;var _react=_interopRequireDefault(require("react")),d3=_interopRequireWildcard(require("d3")),_propTypes=_interopRequireDefault(require("prop-types")),_chart=require("../../components/chart"),_dom=require("../../utils/dom"),_data=require("../../utils/data"),_tooltip=require("../../components/tooltip"),_legend=require("../../components/legend"),_svg=require("../../components/svg"),_axis=require("../../components/axis"),_text=require("../../components/text");function _getRequireWildcardCache(nodeInterop){if("function"!=typeof WeakMap)return null;var cacheBabelInterop=new WeakMap,cacheNodeInterop=new WeakMap;return(_getRequireWildcardCache=function(nodeInterop){return nodeInterop?cacheNodeInterop:cacheBabelInterop})(nodeInterop)}function _interopRequireWildcard(obj,nodeInterop){if(!nodeInterop&&obj&&obj.__esModule)return obj;if(null===obj||"object"!==_typeof(obj)&&"function"!=typeof obj)return{default:obj};var cache=_getRequireWildcardCache(nodeInterop);if(cache&&cache.has(obj))return cache.get(obj);var newObj={},hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj)if("default"!=key&&Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;desc&&(desc.get||desc.set)?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}return newObj["default"]=obj,cache&&cache.set(obj,newObj),newObj}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function BarStacked(props){var svgRef=_react["default"].useRef(null),handleLoad=function(){(0,_chart.RemoveChart)(svgRef),CreateBarStacked(svgRef,props)};return _react["default"].useEffect(function(){handleLoad()},[props]),_react["default"].createElement("svg",{width:"100%",ref:svgRef})}function CreateBarStacked(element,props){var data=props.data,mapper=props.mapper,base=props.base,margin=props.margin,xAxis=props.xAxis,yAxis=props.yAxis,tooltip=props.tooltip,animation=props.animation,legend=props.legend,font=props.font,bar=props.bar;if(0!==data.length){void 0===base.width&&(base.width=(0,_dom.getElementWidth)(element)),void 0===base.height&&(base.height=(0,_dom.getElementHeight)(element)),void 0===xAxis.range&&(xAxis.range=[margin.left,base.width-margin.right]),void 0===yAxis.range&&(yAxis.range=[base.height-margin.bottom,margin.top]);var x=d3.map(data,mapper.getX),rowKeys=[];mapper.keys.forEach(function(key){return rowKeys.push(key)});var newData=(0,_data.groupData)(rowKeys,data,x);if(newData.forEach(function(g,i){g.value.map(function(_,k){1<=i&&(newData[i].value[k].stackedY+=newData[i-1].value[k].stackedY)})}),void 0===xAxis.domain&&(xAxis.domain=x.filter(function(d){return""!==d})),void 0===yAxis.domain){var domain2=d3.max(newData,function(obj){return d3.max(obj.value,function(obj){return obj.stackedY})});yAxis.domain=[0,void 0===domain2?0:1.15*domain2]}xAxis.domain=new d3.InternSet(xAxis.domain);var xScale=d3.scaleBand(xAxis.domain,xAxis.range).padding(xAxis.padding),yScale=d3.scaleLinear(yAxis.domain,yAxis.range),xAxisType=d3.axisBottom(xScale).ticks(base.width/80).tickSizeOuter(0),yAxisType=d3.axisLeft(yScale).ticks(base.height/40);void 0===tooltip.mapper&&(tooltip.mapper=function(d){return"Group : ".concat(d.key,"\nx : ").concat(d.x,"\ny : ").concat(d.y,"\nstacked : ").concat(d.stackedY)}),void 0===base.color&&(base.color=d3.schemeAccent);var colorScale=d3.scaleOrdinal(rowKeys,base.color),barWidth=xScale.bandwidth()/2;void 0===font.size&&(font.size=Math.min(base.width,base.height)/barWidth+"px");var svg=(0,_svg.createSVG)(element,base.width,base.height);xAxis.enabled&&(0,_axis.createXAxis)(svg,xAxisType,props,!1,barWidth*rowKeys.length*x.length,x);var YAxis;yAxis.enabled&&(YAxis=(0,_axis.createYAxis)(svg,yAxisType,props));var Bar=svg.append("g"),createBar=Bar.selectAll("rect");newData.forEach(function(d,i){createBar.data(d.value).join("rect").attr("class","bar_"+i).attr("fill",function(d){return colorScale(d.key)}).attr("rx",bar.radius.x).attr("width",0>barWidth?-1*barWidth:barWidth).attr("height",function(d){return yScale(0)-yScale(d.y)}).attr("x",function(d){var x=xScale(d.x.toString());return(void 0===x?0:x)+barWidth/2}).attr("y",function(d){return yScale(d.stackedY)})}),(0,_text.createTitle)(svg,props);var barValue=svg.append("g"),createBarValue=barValue.selectAll("text");bar.value.enabled&&newData.forEach(function(d,i){createBarValue.data(d.value).join("text").text(function(d){return d.y}).attr("class","barValue_"+i).attr("font-size",font.size).attr("fill",bar.value.color).attr("font-weight",600).attr("text-anchor","middle").attr("x",function(d){var x=xScale(d.x.toString());return(void 0===x?0:x)+barWidth}).attr("y",function(d){return yScale(d.stackedY)+15})}),animation.enabled&&newData.forEach(function(d,i){Bar.selectAll(".bar_"+i).data(d.value).attr("y",base.height-margin.bottom).attr("height",0).attr("fill","rgba(0, 0, 0, 0)").transition().attr("y",function(d){return yScale(d.stackedY)}).attr("height",function(d){return yScale(0)-yScale(d.y)}).attr("fill",function(d){return colorScale(d.key)}).duration(animation.duration).ease(d3.easeExpInOut),bar.value.enabled&&barValue.selectAll(".barValue_"+i).data(d.value).attr("y",base.height-margin.bottom).transition().attr("y",function(d){return yScale(d.stackedY)+15}).textTween(function(d){var f=d3.interpolate(0,d.y);return function(t){return"".concat(d3.format(".0f")(f(t)))}}).duration(animation.duration).ease(d3.easeExpInOut)});var onHover=function onHover(event,index){newData.forEach(function(data,i){if(i===index){var newDomain=d3.max(data.value,function(d){return d.y}),newYScale=d3.scaleLinear([0,void 0===newDomain?0:1.1*newDomain],yAxis.range);YAxis.recreate(d3.axisLeft(newYScale).ticks(base.height/40)),Bar.selectAll(".bar_"+i).data(data.value).transition().attr("height",function(d){return newYScale(0)-newYScale(d.y)}).attr("width",xScale.bandwidth()/2).attr("x",function(d){var x=xScale(d.x.toString());return(void 0===x?0:x)+xScale.bandwidth()/4}).attr("y",function(d){return newYScale(d.y)}).attr("fill",function(d){return colorScale(d.key)}).duration(500).ease(d3.easeExpOut),barValue.selectAll(".barValue_"+i).data(data.value).transition().attr("opacity",1).attr("x",function(d){var x=xScale(d.x.toString());return(void 0===x?0:x)+xScale.bandwidth()/2}).attr("y",function(d){return newYScale(d.y)+15}).duration(500).ease(d3.easeExpOut)}else Bar.selectAll(".bar_"+i).data(data.value).transition().attr("height",0).attr("width",xScale.bandwidth()/2).attr("x",function(d){var x=xScale(d.x.toString());return(void 0===x?0:x)+xScale.bandwidth()/4}).attr("y",base.height-margin.bottom).attr("fill","rgba(0, 0, 0, 0)").duration(500).ease(d3.easeExpOut),barValue.selectAll(".barValue_"+i).data(data.value).transition().attr("opacity",0).attr("x",function(d){var x=xScale(d.x.toString());return(void 0===x?0:x)+xScale.bandwidth()/2}).attr("y",yScale(0)).duration(500).ease(d3.easeExpOut)})},noHover=function noHover(){YAxis.recreate(yAxisType),newData.forEach(function(data,i){Bar.selectAll(".bar_"+i).data(data.value).transition().attr("height",function(d){return yScale(0)-yScale(d.y)}).attr("width",barWidth).attr("x",function(d){var x=xScale(d.x.toString());return(void 0===x?0:x)+barWidth/2}).attr("y",function(d){return yScale(d.stackedY)}).attr("fill",function(d){return colorScale(d.key)}).duration(500).ease(d3.easeExpOut),barValue.selectAll(".barValue_"+i).data(data.value).transition().attr("opacity",1).attr("x",function(d){var x=xScale(d.x.toString());return(void 0===x?0:x)+barWidth}).attr("y",function(d){return yScale(d.stackedY)+15}).duration(500).ease(d3.easeExpOut)})};if(legend.enabled&&(0,_legend.createLegend)(svg,rowKeys,colorScale,props,onHover,noHover),tooltip.enabled){var _createTooltip=(0,_tooltip.createTooltip)(svg,props),showTooltip=_createTooltip.showTooltip,moveTooltip=_createTooltip.moveTooltip,hideTooltip=_createTooltip.hideTooltip;Bar.selectAll("rect").on("mouseover",showTooltip).on("mousemove",moveTooltip).on("mouseleave",hideTooltip)}}}BarStacked.propTypes={data:_propTypes["default"].arrayOf(_propTypes["default"].object).isRequired,mapper:_propTypes["default"].objectOf(_propTypes["default"].any),base:_propTypes["default"].objectOf(_propTypes["default"].any),margin:_propTypes["default"].objectOf(_propTypes["default"].number),xAxis:_propTypes["default"].objectOf(_propTypes["default"].any),yAxis:_propTypes["default"].objectOf(_propTypes["default"].any),tooltip:_propTypes["default"].objectOf(_propTypes["default"].any),animation:_propTypes["default"].objectOf(_propTypes["default"].any),legend:_propTypes["default"].objectOf(_propTypes["default"].any),font:_propTypes["default"].objectOf(_propTypes["default"].any),bar:_propTypes["default"].objectOf(_propTypes["default"].any)},BarStacked.defaultProps={mapper:{getX:function getX(d){return d.x},keys:["y"]},base:{width:void 0,height:300,title:"",color:void 0},tooltip:{mapper:void 0,enabled:!0},xAxis:{title:"x",type:d3.scaleTime,domain:void 0,range:void 0,padding:0,tickRotation:void 0,tickOffset:void 0,enabled:!0},yAxis:{title:"y",type:d3.scaleLinear,domain:void 0,range:void 0,enabled:!0},margin:{top:40,right:80,bottom:60,left:60},animation:{duration:1e3,enabled:!0},legend:{enabled:!0},font:{size:"12px"},bar:{value:{color:"#f2f0f0",enabled:!0},radius:{x:8,y:0}}};