import React from "react";
import * as d3 from "d3";
import PropTypes from "prop-types";

function BubbleChart(props) {

  const svgRef = React.useRef(null);
  
  const handleLoad = () => {
    const {data, ...attr} = props;
    D3BubbleChart(svgRef.current, data, attr);
  }

  React.useEffect(() => {
    handleLoad();
  }, [])

  return <svg ref={svgRef} />;
};

BubbleChart.propTypes = {
  /** data of this chart*/
  data: PropTypes.array.isRequired,
  /** function to fetch name data */
  getName: PropTypes.func,
  /** function to fetch value data */
  getValue: PropTypes.func,
  /** function to fetch group for color */
  getGroup: PropTypes.func,
  /** group domain for color scale */
  groups: PropTypes.array,
  /** padding between bubbles */
  padding: PropTypes.number,
  /** bubble font size */
  fontSize: PropTypes.string,
  /** width of this chart */
  width: PropTypes.number,
  /** height of this chart */
  height: PropTypes.number,
  /** title of chart */
  chartTitleText: PropTypes.string,
  /** tip text for chart */
  tooltipTitle: PropTypes.func, 
  /** function to map bubble label text */
  bubbleLabel: PropTypes.func,
  /** margin top */
  marginTop: PropTypes.number,
  /** margin right */
  marginRight: PropTypes.number,
  /** margin bottom */
  marginBottom: PropTypes.number,
  /** margin left */
  marginLeft: PropTypes.number,
  /** array to render bar groups */
  color: PropTypes.arrayOf(PropTypes.string),
  /** bubble stroke color */
  stroke: PropTypes.string,
  /** bubble stroke width */
  strokeWidth: PropTypes.number,
  /** bubble stroke opacity*/
  strokeOpacity: PropTypes.number,
  /** fill color opacity */
  fillOpacity: PropTypes.number,
  /** chart animation time (ms) */
  animationTime: PropTypes.number,
  /** enable chart animation */
  enableAnimation: PropTypes.bool,
  /** enable legend of chart */
  enableLegend: PropTypes.bool,
};

BubbleChart.defaultProps = {
  getName: d => d.name,
  getValue: d => d.value,
  getGroup: undefined,
  groups: ["group1"],
  width: 500,
  height: 300,
  padding: 5,
  fontSize: undefined,
  chartTitleText: "",
  tooltipTitle: undefined, 
  bubbleLabel: undefined,
  marginTop: 60,
  marginRight: 40,
  marginBottom: 0,
  marginLeft: 0,
  color: ["steelblue"],
  stroke: "black",
  strokeWidth: 0.5,
  strokeOpacity: 1,
  fillOpacity: 1,
  animationTime: 500,
  enableAnimation: true,
  enableLegend: true,
  enableTooltip: true
};

function D3BubbleChart(element, data, {
  getName,
  getValue,
  getGroup,
  groups,
  width,
  height,
  padding,
  fontSize,
  chartTitleText,
  tooltipTitle,
  bubbleLabel,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  color,
  stroke,
  strokeWidth,
  strokeOpacity,
  fillOpacity,
  animationTime,
  enableAnimation,
  enableLegend,
}) {
  
  const name = d3.map(data, getName),
    value = d3.map(d3.map(data, getValue), d => Number(d)),
    I = d3.range(name.length).filter(i => name[i] != "");

  let group = [];
  if (getGroup === undefined) {
    group = new Array(name.length);
    group.map((d, i) => {group[i] = groups[0]});
  } else {
    group = d3.map(data, getGroup);
    groups = new d3.InternSet(group);
    color = d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), groups.size);
  }
  const colorScale = d3.scaleOrdinal(groups, color);

  if (fontSize === undefined) fontSize = (width + height) / 70 + "px";
  if (bubbleLabel === undefined)
    bubbleLabel = i => [name[i], value[i]];
  if (tooltipTitle === undefined)
    tooltipTitle = i => `${name[i]}\n${value[i]}`;

  const svg = d3.select(element)
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("overflow", "visible");
  
  const pack = d3
    .pack()
    .size([width - marginLeft - marginRight, height - marginTop - marginBottom])
    .padding(padding),
    rootNode = d3.hierarchy({children: I}),
    nodes = pack(
      rootNode.sum(i => value[i])
    ).children;

  // bubble chart
  const bubbles = svg.append("g").attr("transform", `translate(${marginLeft}, ${marginTop})`);
  bubbles
    .selectAll("g")
    .data(I)
    .join("g")
    .append("circle")
    .attr("class", (i) => "all bubble_" + i + " _" + group[i])
    .attr("cx", i => nodes[i].x)
    .attr("cy", i => nodes[i].y)
    .attr("r", i => nodes[i].r)
    .attr("stroke", stroke)
    .attr("stroke-width", strokeWidth)
    .attr("stroke-opacity", strokeOpacity)
    .attr("fill-opacity", fillOpacity)
    .attr("fill", i => colorScale(group[i]));
  
  // bubbles text
  bubbles
    .selectAll("g")
    .append("text")
    .attr("transform", i => `translate(${nodes[i].x}, ${nodes[i].y})`)
    .attr("class", (i) => "all bubbleText_" + i + " _" + group[i])
    .attr("text-anchor", "middle")
    .attr("fill", "black")
    .style("font-size", i => (fontSize.slice(0, -2) < nodes[i].r * 0.7 ? fontSize : "0px"))
  bubbles
    .selectAll("text")
    .selectAll("tspan")
    .data(i => bubbleLabel(i))
    .join("tspan")
    .attr("x", 0)
    .attr("y", (_, i) => `${i * 1.1}em`)
    .attr("font-weight", (_, i) => (i ? null : "bold"))
    .text((d) => d);

  const chartTitle = svg.append("g");
  chartTitle.call((g) =>
    g
      .append("text")
      .attr("x", marginLeft + (width - marginRight - marginLeft) / 2)
      .attr("y", marginTop / 2)
      .attr("fill", "black")
      .style("font-size", "20px")
      .style("font-weight", 550)
      .attr("text-anchor", "middle")
      .text(chartTitleText)
  );

  if (enableAnimation) {
    bubbles
      .select(".bubble_0")
      .attr("r", 0)
      .transition()
      .attr("r", i => nodes[i].r)
      .duration(animationTime);
    bubbles
      .select(".bubbleText_0")
      .style("opacity", 0)
      .transition()
      .style("opacity", 1)
      .duration(animationTime);
    for (let t = 1; t < nodes.length; t++) {
      bubbles
        .select(".bubble_" + t)
        .attr("r", 0)
        .transition()
        .attr("r", i => nodes[i].r)
        .duration(animationTime).delay(animationTime / 10 * t);
      bubbles
        .select(".bubbleText_" + t)
        .style("opacity", 0)
        .transition()
        .style("opacity", 1)
        .duration(animationTime).delay(animationTime / 10 * t);
    }
  }

  // tooltip
  const tooltip = svg.append("g").attr("pointer-events", "none");

  function showTooltip(_, i) {
    tooltip.style("display", null);
    tooltip.attr(
      "transform",
      `translate(${nodes[i].x + marginLeft}, ${nodes[i].y + marginTop - nodes[i].r - 10})`
    );

    bubbles.select(".bubbleText_" + i).attr("fill", "none");

    const path = tooltip
      .selectAll("path")
      .data([,])
      .join("path")
      .attr("fill", "rgba(250, 250, 250, 0.8)")
      //.attr("stroke", "rgba(224, 224, 224, 1)")
      .attr("stroke", "black")
      .attr("color", "black");

    const text = tooltip
      .selectAll("text")
      .data([,])
      .join("text")
      .attr("id", "tooltip-text")
      .style("font-size", fontSize)
      .call((text) =>
        text
          .selectAll("tspan")
          .data(`${tooltipTitle(i)}`.split(/\n/))
          .join("tspan")
          .attr("x", 0)
          .attr("y", (_, i) => `${i * 1.1}em`)
          .attr("font-weight", (_, i) => (i ? null : "bold"))
          .text((d) => d)
      );

    const textBox = text.node().getBBox();
    text.attr(
      "transform",
      `translate(${-textBox.width / 2}, ${-textBox.height + 5})`
    );
    path.attr(
      "d",
      `M${-textBox.width / 2 - 10},5H-5l5,5l5,-5H${textBox.width / 2 + 10}v${
        -textBox.height - 20
      }h-${textBox.width + 20}z`
    );
  }

  function hideTooltip(_, i) {
    tooltip.style("display", "none");
    bubbles.select(".bubbleText_" + i).attr("fill", "black");
  }

  function setToolTop() {
    bubbles
      .selectAll(".all")
      .on("mouseover.tooltip", showTooltip)
      .on("mouseleave.tooltip", hideTooltip);
  }

  setToolTop();

  // legend
  if (enableLegend) {
    const legend = svg
      .append("g")
      .attr(
        "transform",
        `translate(${width - marginRight + 25 + 20}, ${marginTop})`
      );
    legend
      .selectAll("circle")
      .data(groups)
      .join("circle")
      .style("cursor", "pointer")
      .attr("class", (g) => "all legend_" + g)
      .attr("cx", 0)
      .attr("cy", (_, i) => i * 20 * 1.1)
      .attr("r", 10)
      .attr("fill", (g) => colorScale(g));
    legend
      .selectAll("text")
      .data(groups)
      .join("text")
      .attr("class", (g) => "all legend_" + g)
      .attr("x", 20)
      .attr("y", (_, i) => i * 20 * 1.1 + 4)
      .attr("text-anchor", "start")
      .style("font-size", "12px")
      .style("font-weight", 300)
      .text((g) => g);
    setTimeout(() => {
      legend
        .selectAll("circle")
        .on("mouseover", highlight)
        .on("mouseleave", noHighlight)
    }, animationTime);

    // g -> groups
    function highlight(_, g) {
      bubbles.selectAll(".all").style("opacity", 0.2)
      bubbles.selectAll("._" + g).style("opacity", 1)
    }

    function noHighlight() {
      bubbles.selectAll(".all").style("opacity", 1)
    }
  }
}

export {BubbleChart};
