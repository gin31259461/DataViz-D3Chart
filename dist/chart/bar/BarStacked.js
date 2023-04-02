import"core-js/modules/es.array.for-each.js";import"core-js/modules/es.object.to-string.js";import"core-js/modules/web.dom-collections.for-each.js";import"core-js/modules/es.array.iterator.js";import"core-js/modules/web.dom-collections.iterator.js";import"core-js/modules/es.array.map.js";import"core-js/modules/es.array.filter.js";import"core-js/modules/es.array.concat.js";import"core-js/modules/es.array.join.js";import"core-js/modules/es.date.to-string.js";import"core-js/modules/es.regexp.to-string.js";import React from"react";import*as d3 from"d3";import PropTypes from"prop-types";import{RemoveChart}from"../../components/chart";import{getElementHeight,getElementWidth}from"../../utils/dom";import{groupData}from"../../utils/data";import{easeExpInOut,easeExpOut}from"d3";import{createTooltip}from"../../components/tooltip";import{createLegend}from"../../components/legend";import{createSVG}from"../../components/svg";import{createXAxis,createYAxis}from"../../components/axis";import{createTitle}from"../../components/text";export default function BarStacked(props){var svgRef=React.useRef(null),handleLoad=function(){RemoveChart(svgRef),CreateBarStacked(svgRef,props)};return React.useEffect(function(){handleLoad()},[props]),React.createElement("svg",{width:"100%",ref:svgRef})}function CreateBarStacked(element,props){var data=props.data,mapper=props.mapper,base=props.base,margin=props.margin,xAxis=props.xAxis,yAxis=props.yAxis,tooltip=props.tooltip,animation=props.animation,legend=props.legend,font=props.font,bar=props.bar;if(0!==data.length){void 0===base.width&&(base.width=getElementWidth(element)),void 0===base.height&&(base.height=getElementHeight(element)),void 0===xAxis.range&&(xAxis.range=[margin.left,base.width-margin.right]),void 0===yAxis.range&&(yAxis.range=[base.height-margin.bottom,margin.top]);var x=d3.map(data,mapper.getX),rowKeys=[];mapper.keys.forEach(function(key){return rowKeys.push(key)});var newData=groupData(rowKeys,data,x);if(newData.forEach(function(g,i){g.value.map(function(_,k){1<=i&&(newData[i].value[k].stackedY+=newData[i-1].value[k].stackedY)})}),void 0===xAxis.domain&&(xAxis.domain=x.filter(function(d){return""!==d})),void 0===yAxis.domain){var domain2=d3.max(newData,function(obj){return d3.max(obj.value,function(obj){return obj.stackedY})});yAxis.domain=[0,void 0===domain2?0:1.15*domain2]}xAxis.domain=new d3.InternSet(xAxis.domain);var xScale=d3.scaleBand(xAxis.domain,xAxis.range).padding(xAxis.padding),yScale=d3.scaleLinear(yAxis.domain,yAxis.range),xAxisType=d3.axisBottom(xScale).ticks(base.width/80).tickSizeOuter(0),yAxisType=d3.axisLeft(yScale).ticks(base.height/40);void 0===tooltip.mapper&&(tooltip.mapper=function(d){return"Group : ".concat(d.key,"\nx : ").concat(d.x,"\ny : ").concat(d.y,"\nstacked : ").concat(d.stackedY)}),void 0===base.color&&(base.color=d3.schemeAccent);var colorScale=d3.scaleOrdinal(rowKeys,base.color),barWidth=xScale.bandwidth()/2;void 0===font.size&&(font.size=Math.min(base.width,base.height)/barWidth+"px");var svg=createSVG(element,base.width,base.height);xAxis.enabled&&createXAxis(svg,xAxisType,props,!1,barWidth*rowKeys.length*x.length,x);var YAxis;yAxis.enabled&&(YAxis=createYAxis(svg,yAxisType,props));var Bar=svg.append("g"),createBar=Bar.selectAll("rect");newData.forEach(function(d,i){createBar.data(d.value).join("rect").attr("class","bar_"+i).attr("fill",function(d){return colorScale(d.key)}).attr("rx",bar.radius.x).attr("width",0>barWidth?-1*barWidth:barWidth).attr("height",function(d){return yScale(0)-yScale(d.y)}).attr("x",function(d){var x=xScale(d.x.toString());return(void 0===x?0:x)+barWidth/2}).attr("y",function(d){return yScale(d.stackedY)})}),createTitle(svg,props);var barValue=svg.append("g"),createBarValue=barValue.selectAll("text");bar.value.enabled&&newData.forEach(function(d,i){createBarValue.data(d.value).join("text").text(function(d){return d.y}).attr("class","barValue_"+i).attr("font-size",font.size).attr("fill",bar.value.color).attr("font-weight",600).attr("text-anchor","middle").attr("x",function(d){var x=xScale(d.x.toString());return(void 0===x?0:x)+barWidth}).attr("y",function(d){return yScale(d.stackedY)+15})}),animation.enabled&&newData.forEach(function(d,i){Bar.selectAll(".bar_"+i).data(d.value).attr("y",base.height-margin.bottom).attr("height",0).attr("fill","rgba(0, 0, 0, 0)").transition().attr("y",function(d){return yScale(d.stackedY)}).attr("height",function(d){return yScale(0)-yScale(d.y)}).attr("fill",function(d){return colorScale(d.key)}).duration(animation.duration).ease(easeExpInOut),bar.value.enabled&&barValue.selectAll(".barValue_"+i).data(d.value).attr("y",base.height-margin.bottom).transition().attr("y",function(d){return yScale(d.stackedY)+15}).textTween(function(d){var f=d3.interpolate(0,d.y);return function(t){return"".concat(d3.format(".0f")(f(t)))}}).duration(animation.duration).ease(easeExpInOut)});var onHover=function onHover(event,index){newData.forEach(function(data,i){if(i===index){var newDomain=d3.max(data.value,function(d){return d.y}),newYScale=d3.scaleLinear([0,void 0===newDomain?0:1.1*newDomain],yAxis.range);YAxis.recreate(d3.axisLeft(newYScale).ticks(base.height/40)),Bar.selectAll(".bar_"+i).data(data.value).transition().attr("height",function(d){return newYScale(0)-newYScale(d.y)}).attr("width",xScale.bandwidth()/2).attr("x",function(d){var x=xScale(d.x.toString());return(void 0===x?0:x)+xScale.bandwidth()/4}).attr("y",function(d){return newYScale(d.y)}).attr("fill",function(d){return colorScale(d.key)}).duration(500).ease(easeExpOut),barValue.selectAll(".barValue_"+i).data(data.value).transition().attr("opacity",1).attr("x",function(d){var x=xScale(d.x.toString());return(void 0===x?0:x)+xScale.bandwidth()/2}).attr("y",function(d){return newYScale(d.y)+15}).duration(500).ease(easeExpOut)}else Bar.selectAll(".bar_"+i).data(data.value).transition().attr("height",0).attr("width",xScale.bandwidth()/2).attr("x",function(d){var x=xScale(d.x.toString());return(void 0===x?0:x)+xScale.bandwidth()/4}).attr("y",base.height-margin.bottom).attr("fill","rgba(0, 0, 0, 0)").duration(500).ease(easeExpOut),barValue.selectAll(".barValue_"+i).data(data.value).transition().attr("opacity",0).attr("x",function(d){var x=xScale(d.x.toString());return(void 0===x?0:x)+xScale.bandwidth()/2}).attr("y",yScale(0)).duration(500).ease(easeExpOut)})},noHover=function noHover(){YAxis.recreate(yAxisType),newData.forEach(function(data,i){Bar.selectAll(".bar_"+i).data(data.value).transition().attr("height",function(d){return yScale(0)-yScale(d.y)}).attr("width",barWidth).attr("x",function(d){var x=xScale(d.x.toString());return(void 0===x?0:x)+barWidth/2}).attr("y",function(d){return yScale(d.stackedY)}).attr("fill",function(d){return colorScale(d.key)}).duration(500).ease(easeExpOut),barValue.selectAll(".barValue_"+i).data(data.value).transition().attr("opacity",1).attr("x",function(d){var x=xScale(d.x.toString());return(void 0===x?0:x)+barWidth}).attr("y",function(d){return yScale(d.stackedY)+15}).duration(500).ease(easeExpOut)})};if(legend.enabled&&createLegend(svg,rowKeys,colorScale,props,onHover,noHover),tooltip.enabled){var _createTooltip=createTooltip(svg,props),showTooltip=_createTooltip.showTooltip,moveTooltip=_createTooltip.moveTooltip,hideTooltip=_createTooltip.hideTooltip;Bar.selectAll("rect").on("mouseover",showTooltip).on("mousemove",moveTooltip).on("mouseleave",hideTooltip)}}}BarStacked.propTypes={data:PropTypes.arrayOf(PropTypes.object).isRequired,mapper:PropTypes.objectOf(PropTypes.any),base:PropTypes.objectOf(PropTypes.any),margin:PropTypes.objectOf(PropTypes.number),xAxis:PropTypes.objectOf(PropTypes.any),yAxis:PropTypes.objectOf(PropTypes.any),tooltip:PropTypes.objectOf(PropTypes.any),animation:PropTypes.objectOf(PropTypes.any),legend:PropTypes.objectOf(PropTypes.any),font:PropTypes.objectOf(PropTypes.any),bar:PropTypes.objectOf(PropTypes.any)},BarStacked.defaultProps={mapper:{getX:function getX(d){return d.x},keys:["y"]},base:{width:void 0,height:300,title:"",color:void 0},tooltip:{mapper:void 0,enabled:!0},xAxis:{title:"x",type:d3.scaleTime,domain:void 0,range:void 0,padding:0,tickRotation:void 0,tickOffset:void 0,enabled:!0},yAxis:{title:"y",type:d3.scaleLinear,domain:void 0,range:void 0,enabled:!0},margin:{top:40,right:80,bottom:60,left:60},animation:{duration:1e3,enabled:!0},legend:{enabled:!0},font:{size:"12px"},bar:{value:{color:"#f2f0f0",enabled:!0},radius:{x:8,y:0}}};