"use strict";function _typeof(obj){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.DirectoryTree=DirectoryTree;var _react=_interopRequireDefault(require("react")),d3=_interopRequireWildcard(require("d3")),_propTypes=_interopRequireDefault(require("prop-types")),_excluded=["data"];function _getRequireWildcardCache(nodeInterop){if("function"!=typeof WeakMap)return null;var cacheBabelInterop=new WeakMap,cacheNodeInterop=new WeakMap;return(_getRequireWildcardCache=function(nodeInterop){return nodeInterop?cacheNodeInterop:cacheBabelInterop})(nodeInterop)}function _interopRequireWildcard(obj,nodeInterop){if(!nodeInterop&&obj&&obj.__esModule)return obj;if(null===obj||"object"!==_typeof(obj)&&"function"!=typeof obj)return{default:obj};var cache=_getRequireWildcardCache(nodeInterop);if(cache&&cache.has(obj))return cache.get(obj);var newObj={},hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj)if("default"!=key&&Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;desc&&(desc.get||desc.set)?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}return newObj["default"]=obj,cache&&cache.set(obj,newObj),newObj}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=_objectWithoutPropertiesLoose(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],0<=excluded.indexOf(key)||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],0<=excluded.indexOf(key)||(target[key]=source[key]);return target}function DirectoryTree(props){var svgRef=_react["default"].useRef(null),handleLoad=function(){var data=props.data,attr=_objectWithoutProperties(props,_excluded);D3DirectoryTree(svgRef.current,data,attr)};return _react["default"].useEffect(function(){handleLoad()},[props]),_react["default"].createElement("svg",{ref:svgRef})}DirectoryTree.propTypes={data:_propTypes["default"].array.isRequired,width:_propTypes["default"].number,height:_propTypes["default"].number,margintop:_propTypes["default"].number,marginbottom:_propTypes["default"].number,marginright:_propTypes["default"].number,marginleft:_propTypes["default"].number,nodeHeight:_propTypes["default"].number,childIndent:_propTypes["default"].number,getparentId:_propTypes["default"].func,getid:_propTypes["default"].func,gettext:_propTypes["default"].func,getvalue:_propTypes["default"].func,getvaluetext:_propTypes["default"].func,IsCollapse:_propTypes["default"].bool,AnimateTime:_propTypes["default"].number},DirectoryTree.defaultProps={width:500,margintop:0,marginbottom:30,marginright:50,marginleft:40,nodeHeight:40,childIndent:30,getparentId:function getparentId(d){return d.pcid},getid:function getid(d){return d.cid},gettext:function gettext(d){return d.text},getvalue:function getvalue(d){return d.value},getvaluetext:function getvaluetext(d){return d.value},IsCollapse:!0,AnimateTime:500};function D3DirectoryTree(element,data,_ref){function collapse(d){d.children&&(d._children=d.children,d._children.forEach(collapse),d.children=null)}function update(source){function visit(f,t,index,parent){t&&f(t,index,parent);var children=t.children;children&&children.length&&children.forEach(function(child,ci){visit(f,child,ci,t)})}function click(d){d.children?(d._children=d.children,d.children=null):(d.children=d._children,d._children=null),update(d)}var treeData=treemap(root);(function(node){var x=0,y=0;visit(function(n,index,parent){x+=nodeHeight,y=parent?parent.y+childIndent:0,n.y=y,n.x=x},node)})(root);var nodes=treeData.descendants().slice(1);svg.transition().duration(AnimateTime).attr("height",nodes.length*nodeHeight+margintop+marginbottom);var node=g.selectAll("g.node").data(nodes,function(d){return d.id||(d.id=++i)}),nodeEnter=node.enter().append("g").attr("class","node").style("opacity",1).attr("transform",function(){return"translate(  ".concat(source.y0,", ").concat(source.x0," )")}).attr("cursor",function(d){return d.children||d._children?"pointer":"default"}).on("click",function(_,d){return d.children||d._children?click(d):function(){}});nodeEnter.append("rect").attr("x",0).attr("y",-nodeHeight/2).attr("width",function(d){return width-d.y}).attr("height",.8*nodeHeight).style("fill","#c8def4").attr("stroke","rgba(0,0,0,.2)"),nodeEnter.append("text").attr("class","treeopen").attr("dx","3px").text(function(d){return d.children||d._children?d.children?"-":"+":""}).attr("stroke","rgba(0,0,0,.2)"),nodeEnter.append("text").text(function(d){return d.data._text}).attr("dx","15px");var nodeEnterg=nodeEnter.append("g").attr("transform",function(d){return"translate(  ".concat(width/2-d.y,", ",0," )")});nodeEnterg.append("rect").attr("x",0).attr("y",-nodeHeight/3).attr("width",function(){return width/2-10}).attr("height",nodeHeight/2).style("fill","rgba(255,255,255,1)").attr("stroke","rgba(0,0,0,.2)"),nodeEnterg.append("rect").attr("x",0).attr("y",-nodeHeight/3).attr("width",function(d){return(width/2-10)*d.data._value/100}).attr("height",nodeHeight/2).attr("class","valueBar").style("fill","#6da2dc"),initFlag&&nodeEnterg.selectAll(".valueBar").attr("width",0).transition().delay(AnimateTime).duration(1e3).attr("width",function(d){return(width/2-10)*d.data._value/100}),nodeEnterg.append("text").text(function(d){return"".concat(d.data._valuetext)}).attr("dx","10px").attr("dy","0.1em").style("fill","rgba(0,0,0,1)");var nodeUpdate=nodeEnter.merge(node);initFlag?nodeUpdate.transition().style("opacity",1).attr("transform",function(d){return"translate(".concat(d.y-childIndent," ,").concat(d.x-nodeHeight,")")}).duration(AnimateTime):(nodeUpdate.style("opacity",1).attr("transform",function(d){return"translate(".concat(d.y-childIndent," ,").concat(d.x-nodeHeight,")")}),initFlag=~initFlag),nodeUpdate.select(".treeopen").text(function(d){return d.children||d._children?d.children?"-":"+":""});node.exit().style("opacity",1).transition("nodeExit").duration(AnimateTime).attr("transform",function(){return"translate(".concat(source.y," ,").concat(source.x-nodeHeight/2," )")}).style("opacity",0).remove();nodes.forEach(function(d){d.x0=d.x,d.y0=d.y})}var width=_ref.width,margintop=_ref.margintop,marginbottom=_ref.marginbottom,marginright=_ref.marginright,marginleft=_ref.marginleft,getparentId=_ref.getparentId,getid=_ref.getid,gettext=_ref.gettext,getvalue=_ref.getvalue,getvaluetext=_ref.getvaluetext,nodeHeight=_ref.nodeHeight,childIndent=_ref.childIndent,IsCollapse=_ref.IsCollapse,AnimateTime=_ref.AnimateTime,initFlag=!1,height=data.length*nodeHeight,svg=d3.select(element);svg.selectAll("g").remove();var g=svg.attr("width",width+marginright+marginleft).attr("height",height+margintop+marginbottom).append("g").attr("transform","translate( ".concat(marginleft," , ").concat(margintop," )"));data.map(function(d){d._pcid=getparentId(d),d._cid=getid(d),d._value=getvalue(d),d._valuetext=getvaluetext(d),d._text=gettext(d)});var stratify=d3.stratify().parentId(function(d){return d._pcid}).id(function(d){return d._cid}),treemap=d3.tree().size([height,width]),root=stratify(data);root.x0=0,root.y0=0,IsCollapse&&root.children.forEach(collapse),update(root)}