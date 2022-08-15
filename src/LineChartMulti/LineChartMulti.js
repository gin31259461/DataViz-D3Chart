import React, {Component} from "react";
import * as d3 from "d3"; 
import PropTypes from "prop-types";

class LineChartMulti extends Component {

  constructor(props) {
    super(props)
  }

  static propTypes = {
    data: PropTypes.array.isRequired,
    getX: PropTypes.func, // function to fetch x-axis data
    keysOfGroups: PropTypes.array, // array to map y keys of group
    width: PropTypes.number, // chart width
    height: PropTypes.number, // chart height
    chartTitleText: PropTypes.string, // title of chart
    tooltipTitle: PropTypes.func, // function of tooltip title
    xAxisText: PropTypes.string, // x axis label
    yAxisText: PropTypes.string, // y axis label
    timeParse: PropTypes.string, // give format string of time, base on strptime strftime of c standard library
    formatTimeType: PropTypes.func, // parse string time to format time, timeParse(formatTime)(data)
    curveType: PropTypes.object, // method of interplate between point
    xType: PropTypes.func,
    yType: PropTypes.func,
    marginTop: PropTypes.number,
    marginRight: PropTypes.number,
    marginBottom: PropTypes.number,
    marginLeft: PropTypes.number,
    xDomain: [PropTypes.number, PropTypes.number],
    yDomain: [PropTypes.number, PropTypes.number],
    xRange: [PropTypes.number, PropTypes.number],
    yRange: [PropTypes.number, PropTypes.number],
    lineNodeRadius: PropTypes.number,
    strokeColor: PropTypes.oneOfType [
      PropTypes.func,
      PropTypes.arrayOf(PropTypes.string)   
    ],
    strokeLinecap: PropTypes.string,
    strokeLinejoin: PropTypes.string,
    strokeWidth: PropTypes.number,
    strokeOpacity: PropTypes.number,
    animationTime: PropTypes.number, // ms
    enableAnimation: PropTypes.bool,
    enableLineNode: PropTypes.bool,
    enableTooltip: PropTypes.bool,
    enableXAxis: PropTypes.bool,
    enableYAxis: PropTypes.bool,
    enableLegend: PropTypes.bool
  };

  static defaultProps = {
    getX: d => d.x,
    keysOfGroups: ["y"],
    width: 500,
    height: 300,
    chartTitleText: "",
    tooltipTitle: undefined,
    xAxisText: "",
    yAxisText: "",
    timeParse: "%Y-%m-%d",
    formatTimeType: d3.timeParse,
    curveType: d3.curveLinear,
    xType: d3.scaleTime,
    yType: d3.scaleLinear,
    marginTop: 40,
    marginRight: 40,
    marginBottom: 20,
    marginLeft: 60,
    xDomain: undefined,
    yDomain: undefined,
    xRange: undefined,
    yRange: undefined,
    lineNodeRadius: 5,
    strokeColor: undefined,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.5,
    strokeOpacity: 1,
    animationTime: 1000,
    enableAnimation: true,
    enableLineNode: true,
    enableTooltip: true,
    enableXAxis: true,
    enableYAxis: true,
    enableLegend: true
  };

  componentDidMount(){
    const {data, ...attr} = this.props;
    const element = this.element, line = new D3LineChartMulti(element); 
    line.render(data, attr);
  }

  render() {
    return <svg ref={ element => this.element = element} />;
  }
};

class D3LineChartMulti {
  
  constructor(element) {
    this.svg = d3.select(element);
  }

  render(data, attr) {

    let {
      getX, keysOfGroups, width, height, chartTitleText, tooltipTitle, xAxisText, yAxisText,
      timeParse, marginTop, marginRight, marginBottom, marginLeft, 
      xDomain, yDomain, xRange, yRange, lineNodeRadius, strokeColor,
      xType, yType, formatTimeType, curveType,
      strokeLinecap, strokeLinejoin, strokeWidth, strokeOpacity, animationTime,
      enableAnimation, enableLineNode, enableTooltip, enableXAxis, enableYAxis, enableLegend
    } = attr;

    if (xRange === undefined) xRange = [marginLeft, width - marginRight];
    if (yRange === undefined) yRange = [height - marginBottom, marginTop];

    let x = [];
    if (xType === d3.scaleTime)
      x = d3.map(d3.map(data, getX), d => formatTimeType(timeParse)(d));

    // map groups
    const groupData = keysOfGroups.map(k => {
      const newData = [];
      d3.map(data, (d, i) => {
        newData.push({
          "x": x[i],
          "y": d[k],
          "group": k,
          "defined": !isNaN(x[i]) && !isNaN(d[k])
        });
      });
      return { "group": k, "value": newData};
    });
    keysOfGroups.push("all");

    if (xDomain === undefined) xDomain = d3.extent(x);
    if (yDomain === undefined) yDomain = [0, d3.max(data, d => d3.max(keysOfGroups, k => d[k])) * 1.2];

    const
      xScale = xType(xDomain, xRange),
      yScale = yType(yDomain, yRange),
      fontSize = (width + height) / 100 + "px",
      xAxisType = d3.axisBottom(xScale).ticks(width / 80).tickSizeOuter(0),
      yAxisType = d3.axisLeft(yScale).ticks(height / 40);

    // d: groupData -> value
    const
      line = d3.line()
        .defined(d => d.defined)
        .curve(curveType)
        .x(d => xScale(d.x))
        .y(d => yScale(d.y)),
      line0 = d3.line()
        .x(d => xScale(d.x))
        .y(height - marginBottom);

    if(tooltipTitle === undefined)
      tooltipTitle = d => {
        return `group: ${d.group}\nx: ${d3.timeFormat("%Y-%m-%d")(d.x)}\ny: ${d.y}`;
      };

    const svg = this.svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("overflow", "visible");

    if (enableYAxis) {
      const yAxis = svg.append("g").attr("transform", `translate(${marginLeft}, 0)`);
      yAxis
        .call(yAxisType)
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
          .attr('x2', width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.1)
        )
        .call(g => g.append("text")
          .attr("x", -20)
          .attr("y", marginTop - 25)
          .attr("fill", "black")
          .attr("style", "12px")
          .attr("text-anchor", "start")
          .text(yAxisText)
        );
    }

    if (enableXAxis) {
      const xAxis = svg.append("g").attr("transform", `translate(0, ${height - marginBottom})`);
      xAxis
        .call(xAxisType)
        .call(g => g.append("text")
          .attr("x", width - marginRight + 25) 
          .attr("y", 15)
          .attr("fill", "black") 
          .attr("style", "12px")
          .text(xAxisText)
        );
    }

    const chartTitle = svg.append("g");
    chartTitle
      .call(g => g.append("text")
        .attr("x", marginLeft + (width - marginRight - marginLeft) / 2)
        .attr("y", marginTop / 2)
        .attr("fill", "black")
        .style("font-size", "20px")
        .style("font-weight", 550)
        .attr("text-anchor", "middle")
        .text(chartTitleText)
      );

    if (strokeColor === undefined)
      strokeColor = d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1) , keysOfGroups.length);

    const strokeColorScale = d3.scaleOrdinal(keysOfGroups, strokeColor);

    const 
      linePath = svg.append("g"),
      lineNode = svg.append("g");

    linePath
      .selectAll("path")
      .data(groupData)
      .join("path")
        .attr("class", d => "all _" + d.group)
        .attr("fill", "none")
        .attr("stroke", d => strokeColorScale(d.group))
        .attr("stroke-width", strokeWidth)
        .attr("stroke-linecap", strokeLinecap)
        .attr("stroke-linejoin", strokeLinejoin)
        .attr("stroke-opacity", strokeOpacity)
        .attr("d", d => line(d.value)); 
    
    if (enableLineNode) {
      const createNode = lineNode.selectAll("circle");
      groupData.map( (d, i) => {
        createNode
          .data(d.value)
          .join("circle")
            .attr("class", "all _" + d.group)
            .attr("cx", d => xScale(d.x))
            .attr("cy", d => yScale(d.y))
            .attr("r", lineNodeRadius)
            .attr("fill", "white")
            .attr("stroke", strokeColorScale(d.group))
            .attr("stroke-width", strokeWidth);
      })
    }

    if (enableTooltip) {
      lineNode.selectAll("circle")
        .on("mouseover", showTooltip)
        .on("mouseleave", hideTooltip)
    }

    // animation
    if (enableAnimation) {
      const pathLenth = linePath.selectAll("path").nodes().map(node => node.getTotalLength());
      linePath
        .selectAll("path")
        .data(pathLenth)
          .attr("stroke-dasharray", d => d + " " + d)
          .attr("stroke-dashoffset", d => d)
        .transition()
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0)
        .duration(animationTime).delay(animationTime);
      if (enableLineNode) {
        lineNode
          .selectAll("circle")
            .style("opacity", 0)
          .transition()
          .ease(d3.easeLinear)
          .style("opacity", 1)
          .duration(animationTime).delay(animationTime);
      } 
    }

    // tooltip
    const tooltip = svg.append("g")
      .style("pointer-events", "none");

    function showTooltip(_, d) {
      tooltip.style("display", null);
      tooltip.attr("transform", `translate(${xScale(d.x)}, ${yScale(d.y) - 10})`);

      const path = tooltip.selectAll("path")
        .data([,])
        .join("path")
          .attr("fill", "rgba(250, 250, 250, 0.8)")
          .attr("stroke", "rgba(224, 224, 224, 1)")
          .attr("color", "black");

      const text = tooltip.selectAll("text")
        .data([,])
        .join("text")
          .style("font-size", fontSize)
        .call(text => text
          .selectAll("tspan")
          .data(`${tooltipTitle(d)}`.split(/\n/))
          .join("tspan")
            .attr("x", 0)
            .attr("y", (_, i) => `${i * 1.1}em`)
            .attr("font-weight", (_, i) => i ? null : "bold")
            .text(d => d)
        );

      const textBox = text.node().getBBox(); 
      tooltip.selectAll("path").attr("d", null);
      text.attr("transform", `translate(${-textBox.width / 2}, ${-textBox.height + 5})`);
      path.attr("d", `M${-textBox.width / 2 - 10},5H-5l5,5l5,-5H${textBox.width / 2 + 10}v${-textBox.height - 20}h-${textBox.width + 20}z`);
    }
    function hideTooltip() {
      tooltip.style("display", "none");
    }

    let selectedOne = false;

    // legend
    if (enableLegend) {
      const legend = svg.append("g")
        .attr("transform", `translate(${width - marginRight + 25 + 20}, ${marginTop})`)
        .style("cursor", "pointer")
      legend
        .selectAll("circle")
        .data(keysOfGroups)
        .join("circle")
          .attr("class", d => "legend_" + d)
          .attr("cx", 0)
          .attr("cy", (_, i) => i * 20 * 1.1)
          .attr("r", 10)
          .attr("fill", d => strokeColorScale(d))
      legend
        .selectAll("text")
        .data(keysOfGroups)
        .join("text")
          .attr("class", d => "legend_" + d)
          .attr("x", 20)
          .attr("y", (_, i) => i * 20 * 1.1 + 4)
          .attr("text-anchor", "start")
          .style("font-size", "12px")
          .style("font-weight", 300)
          .text(d => d)
      setTimeout(() => {
        keysOfGroups.slice(0, -1).map(d => {
          legend.select(".legend_" + d)
            .on("mouseover", highlight)
            .on("mouseleave", noHighlight)
            .on("click", selectOne);
        });
        legend.select(".legend_all").on("click", selectAll);
      }, animationTime * 2);
    }

    function highlight(_, d) {
      if (!(d === "all") && !selectedOne) {
        linePath.selectAll(".all").style("opacity", 0.2);
        lineNode.selectAll(".all").style("opacity", 0.2);
        linePath.selectAll("._" + d).style("opacity", strokeOpacity);
        lineNode.selectAll("._" + d).style("opacity", strokeOpacity);
      }
    }
    function noHighlight() {
      linePath.selectAll(".all").style("opacity", strokeOpacity);
      lineNode.selectAll(".all").style("opacity", strokeOpacity);
    }
    function selectOne(_, d) {
      selectedOne = true;
      groupData.map(data => {
        if (!(data.group === d) && !(d === "all")) {
          linePath.select("._" + data.group)
            .transition()
            .attr("stroke-width", 0)
            .duration(500);
          lineNode.selectAll("._" + data.group)
            .transition()
            .attr("r", 0)
            .duration(500);
        }
        else if (data.group === d) {
          linePath.select("._" + data.group)
            .transition()
            .attr("stroke-width", strokeWidth)
            .duration(500);
          lineNode.selectAll("._" + data.group)
            .transition()
            .attr("r", lineNodeRadius)
            .duration(500);
        }
      });
    }
    function selectAll() {
      selectedOne = false;
      linePath.selectAll(".all")
        .data(groupData)
        .transition()
        .attr("stroke-width", strokeWidth)
        .duration(500);
      lineNode.selectAll(".all")
        .transition()
        .attr("r", lineNodeRadius)
        .duration(500);
    }
  }
};

export {LineChartMulti};