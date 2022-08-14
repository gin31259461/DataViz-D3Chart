import React, {Component} from "react";
import * as d3 from "d3"; 
import PropTypes from "prop-types";

class LineChart extends Component {

  constructor(props) {
    super(props)
  }

  static propTypes = {
    data: PropTypes.array.isRequired,
    getX: PropTypes.func, // function to fetch x-axis data
    getY: PropTypes.func, // function to fetch y-axis data
    width: PropTypes.number, // chart width
    height: PropTypes.number, // chart height
    chartTitleText: PropTypes.string, // title of chart
    tooltipTitle: PropTypes.func, // function of tooltip title
    xAxisText: PropTypes.string, // x axis label
    yAxisText: PropTypes.string, // y axis label
    timeParse: PropTypes.string, // give format string of time, base on strptime strftime of c standard library
    formatTimeType: PropTypes.func, // parse string time to format time, timeParse(formatTime)(data)
    lineDefined: PropTypes.func,
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
    color: PropTypes.string,
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
  };

  static defaultProps = {
    getX: d => d.x, // function to fetch x-axis data
    getY: d => d.y, // function to fetch y-axis data
    width: 500, // chart width
    height: 300, // chart height
    chartTitleText: "", // title of chart
    tooltipTitle: undefined, // function of tooltip title
    xAxisText: "", // x axis label
    yAxisText: "", // y axis label
    timeParse: "%Y-%m-%d", // give format string of time, base on strptime strftime of c standard library
    lineDefined: undefined,
    formatTimeType: d3.timeParse, // parse string time to format time, timeParse(formatTime)(data)
    curveType: d3.curveLinear, // method of interplate between point
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
    color: "steelblue",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.5,
    strokeOpacity: 1,
    animationTime: 2000,
    enableAnimation: true,
    enableLineNode: true,
    enableTooltip: true,
    enableXAxis: true,
    enableYAxis: true,
  };

  componentDidMount(){
    const {data, ...attr} = this.props;
    const element = this.element, line = new D3LineChart(element); 
    line.render(data, attr);
  }

  render() {
    return <svg ref={ element => this.element = element} />;
  }

};

class D3LineChart {
  
  constructor(element) {
    this.svg = d3.select(element);
  }

  render(data, attr) {

    let {
      getX, getY, width, height, chartTitleText, tooltipTitle, xAxisText, yAxisText,
      timeParse, lineDefined, marginTop, marginRight, marginBottom, marginLeft, 
      xDomain, yDomain, xRange, yRange, lineNodeRadius, color, xType, yType, formatTimeType, curveType,
      strokeLinecap, strokeLinejoin, strokeWidth, strokeOpacity, animationTime,
      enableAnimation, enableLineNode, enableTooltip, enableXAxis, enableYAxis,
    } = attr;

    if (xRange === undefined) xRange = [marginLeft, width - marginRight];
    if (yRange === undefined) yRange = [height - marginBottom, marginTop];

    let x = [];
    if (xType === d3.scaleTime)
      x = d3.map(d3.map(data, getX), d => formatTimeType(timeParse)(d));

    const
      y = d3.map(d3.map(data, getY), d => Number(d)),
      I = d3.range(x.length);

    if (xDomain === undefined) xDomain = d3.extent(x);
    if (yDomain === undefined) yDomain = [0, d3.max(y)];

    const
      xScale = xType(xDomain, xRange),
      yScale = yType(yDomain, yRange),
      xAxisType = d3.axisBottom(xScale).ticks(width / 80).tickSizeOuter(0),
      yAxisType = d3.axisLeft(yScale).ticks(height / 40),
      fontSize = (width + height) / 100 + "px";

    if (lineDefined === undefined) lineDefined = (_, i) => !isNaN(x[i]) && !isNaN(y[i]);
    const defined = d3.map(data, lineDefined); // bool set of each point

    // require index data
    const line = d3.line()
      .defined(i => defined[i])
      .curve(curveType)
      .x(i => xScale(x[i]))
      .y(i => yScale(y[i]));

    if(tooltipTitle === undefined)
      tooltipTitle = i => {
        return `x: ${d3.timeFormat("%Y-%m-%d")(x[i])}\ny: ${y[i]}`;
      };

    const svg = this.svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("overflow", "visible");

    if (enableTooltip) {
      svg
        .on("pointerenter pointermove", showTooltip)
        .on("pointerleave", hideTooltip)
        .on("touchstart", event => event.preventDefault());
    }

    if (enableYAxis) {
      const yAxis = svg.append("g").attr("transform", `translate(${marginLeft}, 0)`);
      yAxis
        .call(yAxisType)
        .call(g => g.select(".domain").remove()) // remove y axis domain line
        .call(g => g.selectAll(".tick line").clone() // copy y axis tick line
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
    }

    // draw line path
    // path attribute "d" need a "data series"

    const linePath = svg.append("g");
    linePath
      .append("path")
      .datum(I)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", strokeWidth)
        .attr("stroke-linecap", strokeLinecap)
        .attr("stroke-linejoin", strokeLinejoin)
        .attr("stroke-opacity", strokeOpacity)
        .attr("d", line); 
    
    const lineNode = svg.append("g");
    if (enableLineNode) {
      lineNode
        .selectAll("circle")
        .data(I)
        .join("circle")
          .attr("cx", i => xScale(x[i]))
          .attr("cy", i => yScale(y[i]))
          .attr("r", lineNodeRadius)
          .attr("fill", color);
    }

    // animation
    if (enableAnimation) {
      const pathLenth = linePath.select("path").node().getTotalLength();
      linePath
        .attr("stroke-dasharray", pathLenth + " " + pathLenth)
        .attr("stroke-dashoffset", pathLenth)
        .transition()
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0)
        .duration(animationTime);
      
      lineNode
        .selectAll("circle")
        .style("opacity", 0)
        .transition()
        .ease(d3.easeLinear)
        .style("opacity", 1)
        .duration(animationTime)
    }

    // tooltip
    const tooltip = svg.append("g")
      .style("pointer-events", "none");

    function showTooltip(event) {
      // return the index of the value closest to the given value in an array of numbers
      const i = d3.bisectCenter(x, xScale.invert(d3.pointer(event)[0]));
      tooltip.style("display", null);
      tooltip.attr("transform", `translate(${xScale(x[i])}, ${yScale(y[i])})`);

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
          .data(`${tooltipTitle(i)}`.split(/\n/))
          .join("tspan")
            .attr("x", 0)
            .attr("y", (_, i) => `${i * 1.1}em`)
            .attr("font-weight", (_, i) => i ? null : "bold")
            .text(d => d)
        );

      const textBox = text.node().getBBox(); 
      tooltip.selectAll("path").attr("d", null);
      text.attr("transform", `translate(${-textBox.width / 2},${15 - textBox.y})`);
      path.attr("d", `M${-textBox.width / 2 - 10},5H-5l5,-5l5,5H${textBox.width / 2 + 10}v${textBox.height + 20}h-${textBox.width + 20}z`);
    }
    function hideTooltip() {
      tooltip.style("display", "none");
    }
  }
};

export {LineChart};