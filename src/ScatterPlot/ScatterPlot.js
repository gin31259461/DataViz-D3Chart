import React, {Component} from "react";
import * as d3 from "d3"; 
import PropTypes from "prop-types";

class ScatterPlot extends Component {

  constructor(props) {
    super(props)
  }

  static propTypes = {
    /** data for chart */
    data: PropTypes.array.isRequired,
    /** function to fetch x-axis data */
    getX: PropTypes.func,
    /** function to fetch y-axis data */
    getY: PropTypes.func,
    /** width of chart */
    width: PropTypes.number,
    /** height of chart */
    height: PropTypes.number,
    /** title of chart */
    chartTitleText: PropTypes.string,
    /** tip text for chart */
    tooltipTitle: PropTypes.func,
    /** x-axis label */
    xAxisText: PropTypes.string,
    /** y-axis label */
    yAxisText: PropTypes.string,
    /** x-axis ticks rotate angle */
    xAxisTicksTextRotation: PropTypes.number,
    /** method for x data map */
    xType: PropTypes.func,
    /** padding between band */
    xPadding: PropTypes.number,
    /** method for y data map */
    yType: PropTypes.func,
    /** margin top */
    marginTop: PropTypes.number,
    /** margin right */
    marginRight: PropTypes.number,
    /** margin bottom */
    marginBottom: PropTypes.number,
    /** margin left */
    marginLeft: PropTypes.number,
    /** domain of x data [start, end] */
    /** domain of x data [start, end] */
    xDomain: PropTypes.arrayOf(PropTypes.number),
    /** domain of y data [start, end] */
    yDomain: PropTypes.arrayOf(PropTypes.number),
    /** domain of x scale range [start, end] */
    xRange: PropTypes.arrayOf(PropTypes.number),
    /** domain of y scale range [start, end] */
    yRange: PropTypes.arrayOf(PropTypes.number),
    /** dot radius */
    dotRadius: PropTypes.number,
    /** dot color */
    color: PropTypes.string,
    /** chart animation time (ms) */
    animationTime: PropTypes.number,
    /** enable chart animation */
    enableAnimation: PropTypes.bool,
    /** enable to show tip */
    enableTooltip: PropTypes.bool,
    /** enable x-axis */
    enableXAxis: PropTypes.bool,
    /** enable y-axis */
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
    xAxisTicksTextRotation: 0,
    xType: d3.scaleBand,
    xPadding: 0.1,
    yType: d3.scaleLinear,
    marginTop: 40,
    marginRight: 40,
    marginBottom: 20,
    marginLeft: 60,
    xDomain: undefined,
    yDomain: undefined,
    xRange: undefined,
    yRange: undefined,
    dotRadius: 5,
    color: "steelblue",
    animationTime: 2000,
    enableAnimation: true,
    enableTooltip: true,
    enableXAxis: true,
    enableYAxis: true,
  };

  componentDidMount(){
    const {data, ...attr} = this.props;
    const element = this.element, scatter = new D3ScatterPlot(element); 
    scatter.render(data, attr);
  }

  render() {
    return <svg ref={ element => this.element = element} />;
  }

};

class D3ScatterPlot {
  
  constructor(element) {
    this.svg = d3.select(element);
  }

  render(data, attr) {

    let {
      getX, getY, width, height, chartTitleText, tooltipTitle, xAxisText, yAxisText,
      marginTop, marginRight, marginBottom, marginLeft, xAxisTicksTextRotation,
      xDomain, yDomain, xRange, yRange, dotRadius, color, xType, xPadding, yType,
      animationTime, enableAnimation, enableTooltip, enableXAxis, enableYAxis,
    } = attr;

    if (xRange === undefined) xRange = [marginLeft, width - marginRight];
    if (yRange === undefined) yRange = [height - marginBottom, marginTop];

    const
      x = d3.map(data, getX),
      y = d3.map(d3.map(data, getY), d => Number(d));

    if (xDomain === undefined) xDomain = x.filter(d => d != "");
    if (yDomain === undefined) yDomain = [0, d3.max(y) * 1.2];

    xDomain = new d3.InternSet(xDomain);
    const I = d3.range(x.length).filter(i => xDomain.has(x[i]));

    const
      xScale = xType(xDomain, xRange).padding(xPadding),
      yScale = yType(yDomain, yRange),
      xAxisType = d3.axisBottom(xScale).tickSizeOuter(0),
      yAxisType = d3.axisLeft(yScale).ticks(height / 40),
      fontSize = (width + height) / 100 + "px";

    if(tooltipTitle === undefined)
      tooltipTitle = i => {
        return `x: ${(x[i])}\ny: ${y[i]}`;
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
        .call(g => g.selectAll(".tick line").clone()
          .attr("y2", -(height - marginTop - marginBottom) )
          .attr("stroke-opacity", 0.1)
        );
      if (xAxisTicksTextRotation != 0)
        xAxis
          .selectAll("text")
            .attr("text-anchor", "start")
            .attr("transform", d => `rotate(${xAxisTicksTextRotation})`)
      xAxis
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

    const dot = svg.append("g");
      dot
        .selectAll("circle")
        .data(I)
        .join("circle")
          .attr("cx", i => xScale(x[i]) + xScale.bandwidth() / 2)
          .attr("cy", i => yScale(y[i]))
          .attr("r", dotRadius)
          .attr("fill", color)
          .attr("stroke", "black");

    if (enableTooltip) {
      dot
        .selectAll("circle")
        .on("mouseover", showTooltip)
        .on("mouseleave", hideTooltip);
    }

    // animation
    if (enableAnimation) {
      dot
        .selectAll("circle")
        .attr("r", 0)
        .transition()
        .attr("r", dotRadius)
        .duration(animationTime)
    }

    // tooltip
    const tooltip = svg.append("g")
      .style("pointer-events", "none");

    function showTooltip(_, i) {
      tooltip.style("display", null);
      tooltip.attr("transform", `translate(${xScale(x[i]) + xScale.bandwidth() / 2}, ${yScale(y[i]) - 10})`);

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
      text.attr("transform", `translate(${-textBox.width / 2}, ${-textBox.height + 5})`);
      path.attr("d", `M${-textBox.width / 2 - 10},5H-5l5,5l5,-5H${textBox.width / 2 + 10}v${-textBox.height - 20}h-${textBox.width + 20}z`);
    }
    function hideTooltip() {
      tooltip.style("display", "none");
    }
  }
};

export {ScatterPlot};