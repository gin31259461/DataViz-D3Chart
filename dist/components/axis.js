"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.createXAxis=createXAxis,exports.createYAxis=createYAxis;var _dom=require("../utils/dom"),_d=require("d3");function createXAxis(svg,xAxisGenerator,props){var enableTickLine=!!(3<arguments.length&&void 0!==arguments[3])&&arguments[3],ticksWidthLimit=4<arguments.length?arguments[4]:void 0,xData=5<arguments.length?arguments[5]:void 0;if(void 0===props.xAxis.tickRotation&&void 0!==ticksWidthLimit&&void 0!==xData){var textWidthSum=(0,_dom.getTextWidthSum)(xData,props.font.family);textWidthSum>20*ticksWidthLimit?(props.xAxis.tickRotation=90,props.xAxis.tickXOffset=6,props.xAxis.tickYOffset=-3):textWidthSum>ticksWidthLimit&&(props.xAxis.tickRotation=45,props.xAxis.tickXOffset=6,props.xAxis.tickYOffset=6)}var xAxis=svg.append("g").attr("transform","translate(0, ".concat(props.base.height-props.margin.bottom,")"));return xAxis.call(xAxisGenerator),void 0!==props.xAxis.tickRotation&&xAxis.selectAll("text").attr("text-anchor","start").attr("x",props.xAxis.tickXOffset).attr("y",props.xAxis.tickYOffset).attr("transform","rotate(".concat(props.xAxis.tickRotation,")")),enableTickLine&&xAxis.call(function(g){g.selectAll(".tick line").clone().attr("y2",-(props.base.height-props.margin.top-props.margin.bottom)).attr("stroke-opacity",.1)}),xAxis.call(function(g){return g.append("text").attr("x",props.base.width-props.margin.right+12).attr("y",0).attr("font-size","12px").attr("text-anchor","start").attr("fill","currentColor").text(props.xAxis.title)}),xAxis}function createYAxis(svg,yAxisGenerator,props){function YAxis(){}var yAxis=svg.append("g").attr("transform","translate(".concat(props.margin.left,", 0)"));return yAxis.call(yAxisGenerator).call(function(g){return g.select(".domain").remove()}).call(function(g){return g.selectAll(".tick line").clone().attr("x2",props.base.width-props.margin.left-props.margin.right).attr("stroke-opacity",.1)}).call(function(g){return g.append("text").attr("x",0).attr("y",props.margin.top-12).attr("font-size","12px").attr("text-anchor","end").attr("fill","currentColor").text(props.yAxis.title)}),YAxis.element=yAxis,YAxis.recreate=function(generator){return reCreateYAxis(yAxis,generator,props)},YAxis}function reCreateYAxis(yAxis,yAxisGenerator,props){yAxis.selectAll(".tick").remove(),yAxis.selectAll("text").remove(),yAxis.transition().call(yAxisGenerator).duration(500).ease(_d.easeExpOut),yAxis.call(function(g){return g.select(".domain").remove()}).call(function(g){return g.selectAll(".tick line").clone().attr("x2",props.base.width-props.margin.left-props.margin.right).attr("stroke-opacity",.1)}).call(function(g){return g.append("text").attr("x",0).attr("y",props.margin.top-12).attr("font-size","12px").attr("text-anchor","end").attr("fill","currentColor").text(props.yAxis.title)})}