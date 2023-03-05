"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;var _react=_interopRequireWildcard(require("react")),d3=_interopRequireWildcard(require("d3")),_propTypes=_interopRequireDefault(require("prop-types")),_excluded=["data"],_excluded2=["data"];function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _getRequireWildcardCache(nodeInterop){if("function"!=typeof WeakMap)return null;var cacheBabelInterop=new WeakMap,cacheNodeInterop=new WeakMap;return(_getRequireWildcardCache=function(nodeInterop){return nodeInterop?cacheNodeInterop:cacheBabelInterop})(nodeInterop)}function _interopRequireWildcard(obj,nodeInterop){if(!nodeInterop&&obj&&obj.__esModule)return obj;if(null===obj||"object"!==_typeof(obj)&&"function"!=typeof obj)return{default:obj};var cache=_getRequireWildcardCache(nodeInterop);if(cache&&cache.has(obj))return cache.get(obj);var newObj={},hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj)if("default"!=key&&Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;desc&&(desc.get||desc.set)?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}return newObj["default"]=obj,cache&&cache.set(obj,newObj),newObj}function _typeof(obj){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=_objectWithoutPropertiesLoose(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],0<=excluded.indexOf(key)||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],0<=excluded.indexOf(key)||(target[key]=source[key]);return target}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _defineProperties(target,props){for(var descriptor,i=0;i<props.length;i++)descriptor=props[i],descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,_toPropertyKey(descriptor.key),descriptor)}function _createClass(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Object.defineProperty(Constructor,"prototype",{writable:!1}),Constructor}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function");subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:!0,configurable:!0}}),Object.defineProperty(subClass,"prototype",{writable:!1}),superClass&&_setPrototypeOf(subClass,superClass)}function _setPrototypeOf(o,p){return _setPrototypeOf=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(o,p){return o.__proto__=p,o},_setPrototypeOf(o,p)}function _createSuper(Derived){var hasNativeReflectConstruct=_isNativeReflectConstruct();return function(){var result,Super=_getPrototypeOf(Derived);if(hasNativeReflectConstruct){var NewTarget=_getPrototypeOf(this).constructor;result=Reflect.construct(Super,arguments,NewTarget)}else result=Super.apply(this,arguments);return _possibleConstructorReturn(this,result)}}function _possibleConstructorReturn(self,call){if(call&&("object"===_typeof(call)||"function"==typeof call))return call;if(void 0!==call)throw new TypeError("Derived constructors may only return object or undefined");return _assertThisInitialized(self)}function _assertThisInitialized(self){if(void 0===self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return self}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}function _getPrototypeOf(o){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(o){return o.__proto__||Object.getPrototypeOf(o)},_getPrototypeOf(o)}function _defineProperty(obj,key,value){return key=_toPropertyKey(key),key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _toPropertyKey(arg){var key=_toPrimitive(arg,"string");return"symbol"===_typeof(key)?key:key+""}function _toPrimitive(input,hint){if("object"!==_typeof(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(prim!==void 0){var res=prim.call(input,hint||"default");if("object"!==_typeof(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}var Pie=function(_Component){function Pie(props){return _classCallCheck(this,Pie),_super.call(this,props)}_inherits(Pie,_Component);var _super=_createSuper(Pie);return _createClass(Pie,[{key:"componentDidMount",value:function componentDidMount(){var _this$props=this.props,data=_this$props.data,attr=_objectWithoutProperties(_this$props,_excluded),element=this.element,pie=new D3PieChart(element);pie.render(data,attr)}},{key:"componentDidUpdate",value:function componentDidUpdate(){var _this$props2=this.props,data=_this$props2.data,attr=_objectWithoutProperties(_this$props2,_excluded2),element=this.element,pie=new D3PieChart(element);pie.render(data,attr)}},{key:"render",value:function render(){var _this=this;return _react["default"].createElement("svg",{ref:function ref(element){return _this.element=element}})}}]),Pie}(_react.Component);exports["default"]=Pie,_defineProperty(Pie,"propTypes",{data:_propTypes["default"].array.isRequired,getX:_propTypes["default"].func,keysOfGroups:_propTypes["default"].arrayOf(_propTypes["default"].string),getDetail:_propTypes["default"].oneOfType([_propTypes["default"].func,_propTypes["default"].arrayOf(_propTypes["default"].string)]),width:_propTypes["default"].number,height:_propTypes["default"].number,nameDomain:_propTypes["default"].arrayOf(_propTypes["default"].string),color:_propTypes["default"].arrayOf(_propTypes["default"].string),chartTitleText:_propTypes["default"].string,format:_propTypes["default"].string,tooltipTitle:_propTypes["default"].func,textSize:_propTypes["default"].number,marginTop:_propTypes["default"].number,marginRight:_propTypes["default"].number,marginBottom:_propTypes["default"].number,marginLeft:_propTypes["default"].number,innerRadius:_propTypes["default"].number,outerRadius:_propTypes["default"].number,labelRadius:_propTypes["default"].number,stroke:_propTypes["default"].string,strokeWidth:_propTypes["default"].number,strokeLinejoin:_propTypes["default"].string,padAngle:_propTypes["default"].number,animationTime:_propTypes["default"].number,enableAnimation:_propTypes["default"].bool,enablePieLabel:_propTypes["default"].bool,enableLegend:_propTypes["default"].bool,enableTooltip:_propTypes["default"].bool}),_defineProperty(Pie,"defaultProps",{getX:function getX(d){return d.name},keysOfGroups:["y"],getDetail:function getDetail(d){return d.detail},width:500,height:300,nameDomain:void 0,color:void 0,chartTitleText:"",format:",.0f",tooltipTitle:void 0,textSize:void 0,marginTop:40,marginRight:60,marginBottom:40,marginLeft:0,innerRadius:0,outerRadius:void 0,labelRadius:void 0,stroke:void 0,strokeWidth:2,strokeLinejoin:"round",padAngle:void 0,animationTime:2e3,enableAnimation:!0,enablePieLabel:!0,enableLegend:!0,enableTooltip:!0});var D3PieChart=function(){function D3PieChart(element){_classCallCheck(this,D3PieChart),d3.select(element).selectAll("g").remove(),this.svg=d3.select(element)}return _createClass(D3PieChart,[{key:"render",value:function render(data,attr){function showTooltip(_,d){if(!selectedOne){tooltip.style("display",null);var p=arcLabel.centroid(d);tooltip.attr("transform","translate(".concat(p[0]+width/2,", ").concat(p[1]+height/2,")")),pieLabel.select(".pieLabelText_"+newName[d.data]).style("opacity",0);var path=tooltip.selectAll("path").data([,]).join("path").attr("fill","rgba(250, 250, 250, 0.8)").attr("stroke","rgba(224, 224, 224, 1)").attr("color","black"),text=tooltip.selectAll("text").data([,]).join("text").attr("id","tooltip-text").style("font-size",fontSize).call(function(text){return text.selectAll("tspan").data("".concat(tooltipTitle(d.data)).split(/\n/)).join("tspan").attr("x",0).attr("y",function(_,i){return"".concat(1.1*i,"em")}).attr("font-weight",function(_,i){return i?null:"bold"}).text(function(d){return d})}),textBox=text.node().getBBox();text.attr("transform","translate(".concat(-textBox.width/2,", ").concat(-textBox.height+5,")")),path.attr("d","M".concat(-textBox.width/2-10,",5H-5l5,5l5,-5H").concat(textBox.width/2+10,"v").concat(-textBox.height-20,"h-").concat(textBox.width+20,"z"))}}function hideTooltip(_,d){tooltip.style("display","none"),pieLabel.select(".pieLabelText_"+newName[d.data]).style("opacity",1)}function hoverPie(_,d){if(!selectedOne){var scale=.2,hoverArc=d3.arc().innerRadius(innerRadius*scale).outerRadius(outerRadius*scale);pie.select(".pie_"+newName[d.data]).transition().ease(d3.easeLinear).attr("transform","translate(".concat(hoverArc.centroid(d),")")).duration(500)}}function noHoverPie(_,d){selectedOne||pie.select(".pie_"+newName[d.data]).transition().ease(d3.easeLinear).attr("transform","translate(0, 0)").duration(500)}var getX=attr.getX,keysOfGroups=attr.keysOfGroups,width=attr.width,height=attr.height,nameDomain=attr.nameDomain,color=attr.color,format=attr.format,tooltipTitle=attr.tooltipTitle,innerRadius=attr.innerRadius,outerRadius=attr.outerRadius,labelRadius=attr.labelRadius,stroke=attr.stroke,strokeWidth=attr.strokeWidth,strokeLinejoin=attr.strokeLinejoin,padAngle=attr.padAngle,chartTitleText=attr.chartTitleText,animationTime=attr.animationTime,enableAnimation=attr.enableAnimation,getDetail=attr.getDetail,textSize=attr.textSize,enablePieLabel=attr.enablePieLabel,marginBottom=attr.marginBottom,marginLeft=attr.marginLeft,marginRight=attr.marginRight,marginTop=attr.marginTop,enableLegend=attr.enableLegend,enableTooltip=attr.enableTooltip;void 0===outerRadius&&(outerRadius=Math.min(width-marginLeft-marginRight,height-marginTop-marginBottom)/2),void 0===labelRadius&&(labelRadius=.3*innerRadius+.7*outerRadius),void 0===stroke&&(stroke=0<innerRadius?"none":"white"),void 0===padAngle&&(padAngle="none"===stroke?1/outerRadius:0);var name=d3.map(data,getX),value=d3.map(d3.map(data,function(d){return d[keysOfGroups[0]]}),function(d){return+d}),detail=void 0;"function"==typeof getDetail?detail=d3.map(data,getDetail):"object"===_typeof(getDetail)&&(detail=getDetail),void 0===nameDomain&&(nameDomain=new d3.InternSet(name.filter(function(d){return""!=d})));var I=d3.range(name.length).filter(function(i){return!isNaN(value[i])&&nameDomain.has(name[i])}),fontSize=new String;fontSize=void 0===textSize?(width+height)/1e3+"em":textSize+"em",void 0===tooltipTitle&&(tooltipTitle=function tooltipTitle(i){return"".concat(name[i],"\n").concat(value[i])});var newName=[];name.forEach(function(key){return newName.push(key)});var divData=d3.pie().padAngle(padAngle).sort(null).value(function(i){return value[i]})(I);newName.push("all"),I.push(newName.length-1),void 0===color&&(color=d3.schemeSet2);var colorScale=d3.scaleOrdinal(newName,color),arcs=d3.arc().innerRadius(innerRadius).outerRadius(outerRadius),arcLabel=d3.arc().innerRadius(labelRadius).outerRadius(labelRadius),svg=this.svg.attr("width",width).attr("height",height).attr("overflow","visible").attr("viewBox",[0,0,width,height]),pie=svg.append("g").attr("transform","translate(".concat(marginLeft+(width-marginLeft-marginRight)/2,", ").concat(marginTop+(height-marginTop-marginBottom)/2,")"));pie.attr("stroke",stroke).attr("strokeWidth",strokeWidth).attr("strokeLinejoin",strokeLinejoin).selectAll("path").data(divData).join("path").attr("class",function(d){return"all pie_"+newName[d.data]}).attr("fill",function(d){return colorScale(newName[d.data])}).attr("d",arcs);var pieLabel=svg.append("g").attr("text-anchor","middle").attr("transform","translate(".concat(marginLeft+(width-marginLeft-marginRight)/2,", ").concat(marginTop+(height-marginTop-marginBottom)/2,")"));enablePieLabel&&pieLabel.selectAll("text").data(divData).join("text").style("font-size",fontSize).attr("class",function(d){return"all pieLabelText_"+newName[d.data]}).attr("transform",function(d){return"translate(".concat(arcLabel.centroid(d),")")}).selectAll("tspan").data(function(d){var lines="".concat(tooltipTitle(d.data)).split(/\n/);return .25<d.endAngle-d.startAngle&&d3.max(lines.map(function(d){return(d+"").length}))<outerRadius/fontSize.slice(0,-2)?lines:lines.slice(0,0)}).join("tspan").attr("x",0).attr("y",function(_,i){return"".concat(1.1*i,"em")}).attr("font-weight",function(_,i){return i?null:"bold"}).text(function(d){return d});var chartTitle=svg.append("g");chartTitle.call(function(g){return g.append("text").attr("x",marginLeft+(width-marginRight-marginLeft)/2).attr("y",marginTop/2).style("font-size","20px").style("font-weight",550).attr("text-anchor","middle").style("fill","currentColor").text(chartTitleText)}),enableAnimation&&(pie.selectAll("path").attr("fill","rgba(0, 0, 0, 0)").transition().attrTween("d",function(d){var f=d3.interpolate(d.startAngle,d.endAngle);return function(t){return d.endAngle=f(t),arcs(d)}}).attr("fill",function(d){return colorScale(newName[d.data])}).duration(animationTime),enablePieLabel&&pieLabel.selectAll("tspan").style("fill","currentColor").transition().textTween(function(d){if(isNaN(+d))return function(t){return d};var formatValue=d3.format(format),f=d3.interpolate(0,d);return function(t){return formatValue(f(t))}}).duration(animationTime));var selectedOne=!1,tooltip=svg.append("g").attr("pointer-events","none");if(enableTooltip&&setTimeout(function(){pie.selectAll("path").on("mouseover.tooltip",showTooltip).on("mouseleave.tooltip",hideTooltip).on("mouseover.hover",hoverPie).on("mouseleave.hover",noHoverPie)},animationTime),enableLegend){var highlight=function highlight(_,i){"all"===newName[i]||selectedOne||(pie.selectAll(".all").style("opacity",.2),pieLabel.selectAll(".all").style("opacity",.2),pie.select(".pie_"+newName[i]).style("opacity",1),pieLabel.select(".pieLabelText_"+newName[i]).style("opacity",1))},noHighlight=function noHighlight(){selectedOne||(pie.selectAll(".all").style("opacity",1),pieLabel.selectAll(".all").style("opacity",1))},selectOne=function selectOne(_,i){selectedOne=!0;var scale=1,newArc=d3.arc().innerRadius(innerRadius*scale).outerRadius(outerRadius*scale),deltaY=(outerRadius-innerRadius)*scale/2,angle=divData[i],rotation=-1*(180*(angle.startAngle+(angle.endAngle-angle.startAngle)/2)/Math.PI),newFontSize=+fontSize.slice(0,-2)*scale+"em";pie.selectAll(".all").transition().ease(d3.easeLinear).attr("transform","translate(0, 0) rotate(0)").attr("d",arcs).style("opacity",.2).duration(250).transition().attr("d",null).duration(250),pieLabel.selectAll("text").transition().style("font-size","0").duration(500),angle.endAngle-angle.startAngle<Math.PI?(pie.select(".pie_"+newName[i]).transition().ease(d3.easeLinear).attr("transform","translate(0, ".concat(deltaY,") rotate(").concat(rotation,")")).attr("d",newArc).style("opacity",1).duration(500),pieLabel.select(".pieLabelText_"+newName[i]).transition().attr("transform","translate(0, 0)").style("font-size",newFontSize).style("opacity",1).duration(500)):angle.endAngle-angle.startAngle>Math.PI&&(pie.select(".pie_"+newName[i]).transition().ease(d3.easeLinear).attr("transform","rotate(".concat(rotation,")")).attr("d",newArc).style("opacity",1).duration(500),pieLabel.select(".pieLabelText_"+newName[i]).transition().attr("transform","translate(0, ".concat(-deltaY,")")).style("font-size",newFontSize).style("opacity",1).duration(500)),void 0===detail||selectedDetail.select("text").style("font-size",0).transition().style("font-size",newFontSize).text(detail[i]).duration(500)},selectAll=function selectAll(){pie.selectAll(".all").transition().ease(d3.easeLinear).attr("transform","translate(0, 0) rotate(0)").style("opacity",1).duration(250).transition().attr("d",arcs).duration(250),pieLabel.selectAll("text").transition().attr("transform",function(d){return"translate(".concat(arcLabel.centroid(d),")")}).style("font-size",fontSize).style("opacity",1).duration(500),void 0===detail||selectedDetail.select("text").transition().style("font-size",0).text("").duration(500),setTimeout(function(){return selectedOne=!1},600)},legend=svg.append("g").attr("transform","translate(".concat(width-marginRight,", ").concat(marginTop,")")).style("cursor","pointer");legend.selectAll("circle").data(I).join("circle").attr("class",function(i){return"legend_"+newName[i]}).attr("cx",0).attr("cy",function(_,i){return 1.1*(20*i)}).attr("r",10).attr("fill",function(i){return colorScale(newName[i])}),legend.selectAll("text").data(I).join("text").attr("class",function(i){return"legend_"+newName[i]}).attr("x",20).attr("y",function(_,i){return 1.1*(20*i)+4}).attr("text-anchor","start").style("font-size","12px").style("font-weight",300).style("fill","currentColor").text(function(i){return newName[i]}),setTimeout(function(){divData.map(function(d){legend.select(".legend_"+newName[d.data]).on("mouseover",highlight).on("mouseleave",noHighlight).on("click",selectOne)}),legend.select(".legend_all").on("click",selectAll)},animationTime);var selectedDetail=svg.append("g").attr("transform","translate(".concat(marginLeft+(width-marginLeft-marginRight)/2,", ").concat(height-marginBottom/2,")"));selectedDetail.append("text").attr("text-anchor","middle")}}}]),D3PieChart}();