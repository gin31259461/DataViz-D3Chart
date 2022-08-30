import React from "react";
import * as d3 from "d3";
import PropTypes from "prop-types";

function DirectoryTree(props) {
  const svgRef = React.useRef(null);
  const handleLoad = () => {
    const {data, ...attr} = props;
    D3DirectoryTree(svgRef.current, data, attr);
  };
  React.useEffect(() =>{
    handleLoad();
  }, [props]);
  return <svg ref={svgRef} />;
}

DirectoryTree.propTypes = {
  /** 資料*/
  data: PropTypes.array.isRequired,
  /** SVG 的寬度*/
  width: PropTypes.number,
  /** SVG 的高度 */
  height: PropTypes.number,
  /** SVG 的上邊界 */
  margintop: PropTypes.number,
  /** SVG 的下邊界 */
  marginbottom: PropTypes.number,
  /** SVG 的右邊界 */
  marginright: PropTypes.number,
  /** SVG 的左邊界*/
  marginleft: PropTypes.number,
  /** 每個的高度 */
  nodeHeight: PropTypes.number,
  /** 內縮的大小 */
  childIndent: PropTypes.number,
  /** 父層的 資料欄位 */
  getparentId: PropTypes.func,
  /** 自己的資料欄位 */
  getid: PropTypes.func,
  /** 取文字資料的函式 */
  gettext: PropTypes.func,
  /** 取出數值資料的函式 */
  getvalue: PropTypes.func,
  /** 取出數值資料的函式 */
  getvaluetext: PropTypes.func,
  /** 是否一開始就摺疊 */
  IsCollapse: PropTypes.bool,
  /** 動畫時間 (ms) */
  AnimateTime: PropTypes.number,
};
DirectoryTree.defaultProps = {
  width: 500,
  margintop: 0,
  marginbottom: 30,
  marginright: 50,
  marginleft: 40,
  nodeHeight: 40,
  childIndent: 30,
  getparentId: (d) => d.pcid,
  getid: (d) => d.cid,
  gettext: (d) => d.text,
  getvalue: (d) => d.value,
  getvaluetext: (d) => d.value,
  IsCollapse: true,
  AnimateTime: 500,
};

function D3DirectoryTree(
  element,
  data,
  {
    width,
    margintop,
    marginbottom,
    marginright,
    marginleft,
    getparentId,
    getid,
    gettext,
    getvalue,
    getvaluetext,
    nodeHeight,
    childIndent,
    IsCollapse,
    AnimateTime,
  }
) {
  let initFlag = false;
  const height = data.length * nodeHeight;
  const svg = d3.select(element);
  svg.selectAll("g").remove();
  const g = svg
    .attr("width", width + marginright + marginleft)
    .attr("height", height + margintop + marginbottom)
    .append("g")
    .attr("transform", `translate( ${marginleft} , ${margintop} )`);
  data.map((d) => {
    (d._pcid = getparentId(d)), (d._cid = getid(d));
    d._value = getvalue(d);
    d._valuetext = getvaluetext(d);
    d._text = gettext(d);
  });
  const stratify = d3
    .stratify()
    .parentId(function (d) {
      return d._pcid;
    })
    .id(function (d) {
      return d._cid;
    });

  const treemap = d3.tree().size([height, width]);

  const root = stratify(data);
  root.x0 = 0;
  root.y0 = 0;

  IsCollapse && root.children.forEach(collapse);

  function collapse(d) {
    if (d.children) {
      d._children = d.children;
      d._children.forEach(collapse);
      d.children = null;
    }
  }

  update(root);
  function update(source) {
    const treeData = treemap(root);
    layout(root);
    const nodes = treeData.descendants().slice(1);

    svg
      .transition()
      .duration(AnimateTime)
      .attr("height", nodes.length * nodeHeight + margintop + marginbottom);
    const node = g.selectAll("g.node").data(nodes, (d) => d.id || (d.id = ++i));
    function visit(f, t, index, parent) {
      if (t) {
        f(t, index, parent);
      }
      var children = t.children;
      if (children && children.length) {
        children.forEach(function (child, ci) {
          visit(f, child, ci, t);
        });
      }
    }

    function layout(node) {
      var x = 0,
        y = 0;
      visit(function (n, index, parent) {
        x = x + nodeHeight;
        y = parent ? parent.y + childIndent : 0;
        n.y = y;
        n.x = x;
      }, node);
    }

    const nodeEnter = node
      .enter()
      .append("g")
      .attr("class", "node")
      .style("opacity", 1)
      .attr("transform", (d) => `translate(  ${source.y0}, ${source.x0} )`)
      .attr("cursor", (d) =>
        d.children || d._children ? "pointer" : "default"
      )
      .on("click", (_, d) => d.children || d._children ? click(d) : () => {});

    nodeEnter
      .append("rect")
      .attr("x", 0)
      .attr("y", -nodeHeight / 2)
      .attr("width", (d) => width - d.y)
      .attr("height", nodeHeight * 0.8)
      .style("fill", "#c8def4")
      .attr("stroke", "rgba(0,0,0,.2)");
    nodeEnter
      .append("text")
      .attr("class", "treeopen")
      .attr("dx", "3px")
      .text((d) => (d.children || d._children ? (d.children ? "-" : "+") : ""))
      .attr("stroke", "rgba(0,0,0,.2)");
    nodeEnter
      .append("text")
      .text((d) => d.data._text)
      .attr("dx", "15px");

    const nodeEnterg = nodeEnter
      .append("g")
      .attr("transform", (d) => `translate(  ${width / 2 - d.y}, ${0} )`);
    nodeEnterg
      .append("rect")
      .attr("x", 0)
      .attr("y", -nodeHeight / 3)
      .attr("width", (d) => width / 2 - 10)
      .attr("height", nodeHeight / 2)
      .style("fill", "rgba(255,255,255,1)")
      .attr("stroke", "rgba(0,0,0,.2)");
    nodeEnterg
      .append("rect")
      .attr("x", 0)
      .attr("y", -nodeHeight / 3)
      .attr("width", (d) => ((width / 2 - 10) * d.data._value) / 100)
      .attr("height", nodeHeight / 2)
      .attr("class", "valueBar")
      .style("fill", "#6da2dc");
    if (initFlag) {
      nodeEnterg
        .selectAll(".valueBar")
        .attr("width", 0)
        .transition()
        .delay(AnimateTime)
        .duration(1000)
        .attr("width", (d) => ((width / 2 - 10) * d.data._value) / 100);
    }
    nodeEnterg
      .append("text")
      .text((d) => `${d.data._valuetext}`)
      .attr("dx", "10px")
      .attr("dy", "0.1em")
      .style("fill", "rgba(0,0,0,1)");
    const nodeUpdate = nodeEnter.merge(node);
    if (initFlag) {
      nodeUpdate
        .transition()
        .style("opacity", 1)
        .attr(
          "transform",
          (d) => `translate(${d.y - childIndent} ,${d.x - nodeHeight})`
        )
        .duration(AnimateTime);
    } else {
      nodeUpdate
        .style("opacity", 1)
        .attr(
          "transform",
          (d) => `translate(${d.y - childIndent} ,${d.x - nodeHeight})`
        );
      initFlag = ~initFlag;
    }

    nodeUpdate
      .select(".treeopen")
      .text((d) => (d.children || d._children ? (d.children ? "-" : "+") : ""));
    const nodeExit = node
      .exit()
      .style("opacity", 1)
      .transition("nodeExit")
      .duration(AnimateTime)
      .attr(
        "transform",
        (d) => `translate(${source.y} ,${source.x - nodeHeight / 2} )`
      )
      .style("opacity", 0)
      .remove();

    nodes.forEach(function (d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });

    function click(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      update(d);
    }
  }
}

export { DirectoryTree };
