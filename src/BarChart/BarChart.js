import React, { Component } from "react";
import * as d3 from "d3";
import PropTypes from "prop-types";

class BarChart extends Component {

  constructor(props) {
    super(props);
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
    xPadding: PropTypes.number,
    marginTop: PropTypes.number,
    marginRight: PropTypes.number,
    marginBottom: PropTypes.number,
    marginLeft: PropTypes.number,
    color: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.arrayOf(PropTypes.string) 
    ]), // bar color
    xDomain: [PropTypes.number, PropTypes.number],
    yDomain: [PropTypes.number, PropTypes.number],
    xRange: [PropTypes.number, PropTypes.number],
    yRange: [PropTypes.number, PropTypes.number],
    animationTime: PropTypes.number, // ms
    enableAnimation: PropTypes.bool,
    enableBarValue: PropTypes.bool,
    enableXAxis: PropTypes.bool,
    enableYAxis: PropTypes.bool,
  };

  static defaultProps = {
    getX: d => d.x,
    getY: d => d.y,
    width: 500,
    height: 300,
    chartTitleText: "",
    tooltipTitle: undefined, 
    xAxisText: "",
    yAxisText: "", 
    xPadding: 0.1,
    marginTop: 40,
    marginRight: 40,
    marginBottom: 30,
    marginLeft: 60,
    color: undefined,
    xDomain: undefined,
    yDomain: undefined,
    xRange: undefined,
    yRange: undefined,
    animationTime: 2000,
    enableAnimation: true,
    enableBarValue: true,
    enableXAxis: true,
    enableYAxis: true,
  };

  componentDidMount() {
    const { data, ...attr } = this.props;
    const element = this.element, bar = new D3BarChart(element);
    bar.render(data, attr);
  }

  render() {
    return <svg ref = { element => this.element = element} />;
  }

};

class D3BarChart {

  constructor(element) {
    this.svg = d3.select(element)
  }

  render(data, attr) {

    let {
      getX, getY, width, height, chartTitleText, tooltipTitle, xAxisText, yAxisText,
      xPadding, marginTop, marginRight, marginBottom, marginLeft, animationTime,
      color, xRange, yRange, xDomain, yDomain,
      enableAnimation, enableBarValue, enableXAxis, enableYAxis,
    } = attr;

    if (xRange === undefined) xRange = [marginLeft, width - marginRight];
    if (yRange === undefined) yRange = [height - marginBottom, marginTop];

    const
      x = d3.map(data, getX),
      y = d3.map(d3.map(data, getY), d => Number(d));
    
    if(xDomain === undefined) xDomain = x.filter( d => d != "");
    if(yDomain === undefined) yDomain = [0, d3.max(y)];

    // unique domain
    xDomain = new d3.InternSet(xDomain);
    const I = d3.range(x.length).filter(i => xDomain.has(x[i]));

    const
      xScale = d3.scaleBand(xDomain, xRange).padding(xPadding),
      yScale = d3.scaleLinear(yDomain, yRange),
      xAxisType = d3.axisBottom(xScale).tickSizeOuter(0),
      yAxisType = d3.axisLeft(yScale).ticks(height / 40),
      fontSize = (width + height) / 100 + "px";

    if (color === undefined)
      color = d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), xDomain.size);
    else
      color = settings.color;

    const colorScale = d3.scaleOrdinal(xDomain, color);

    if(tooltipTitle === undefined)
      tooltipTitle = i => {
        return `x: ${x[i]}\ny: ${y[i]}`;
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
        .attr("text-anchor", "start")
        .style("font-size", "12px")
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
        .style("font-size", "12px")
        .text(xAxisText)
      );
    }
        
    const bar = svg.append("g");
    bar
      .selectAll("rect")
      .data(I)
      .join("rect")
        .attr("fill", i => colorScale(x[i]))
        .style("cursor", "pointer")
        .attr("width", xScale.bandwidth() / 2)
        .attr("height", i => yScale(0) - yScale(y[i]))
        .attr("x", i => xScale(x[i]) + xScale.bandwidth()/4) 
        .attr("y", i => yScale(y[i]))
      .on("mouseover", showTooltip)
      .on("mouseleave", hideTooltip);

    const barValue = svg.append("g");
    if (enableBarValue) {
      barValue
      .selectAll("text")
      .data(I)
      .join("text")
      .text(i => y[i])
        .attr("class", i => "barValue_" + i)
        .style("font-size", fontSize)
        .attr("text-anchor", "middle")
        .attr("x", i => xScale(x[i]) + xScale.bandwidth()/2) 
        .attr("y", i => yScale(y[i]) - 2);
    }

    const chartTitle = svg.append("g");
    chartTitle
    .call(g => g.append("text")
      .attr("x", marginLeft + (width - marginRight - marginLeft) / 2)
      .attr("y", marginTop / 2)
      .attr("fill", "black")
      .style("font-weight", 550)
      .style("font-size", "20px")
      .attr("text-anchor", "middle")
      .text(chartTitleText)
    );

    // animation
    if (enableAnimation) {
      bar.selectAll("rect")
      .data(I)
        .attr("y", height - marginBottom)
        .attr("height", 0)
        .attr("fill", "rgba(0, 0, 0, 0)")
      .transition()
      .attr("y", i => yScale(y[i]))
      .attr("height", i => yScale(0) - yScale(y[i]))
      .attr("fill", i => colorScale(x[i]))
      .duration(animationTime);

      if (enableBarValue) {
        barValue.selectAll("text")
          .transition()
          .attrTween("y", i => {
            const f = d3.interpolate(yScale(0), yScale(y[i]) - 2);
            return t => {
                return f(t);
            };
          })
          .textTween( i => {
            const f = d3.interpolate(0, y[i]);
            return t => {
              return `${d3.format(".0f")(f(t))}`;
            };
          })
          .duration(animationTime);
        }
    }

    // tooltip
    const tooltip = svg.append("g")
      .attr("pointer-events", "none")

    function showTooltip(_, i) {
      tooltip.style("display", null);
      tooltip.attr("transform", `translate(${xScale(x[i]) + xScale.bandwidth()/2}, ${yScale(y[i]) - 10})`);
      barValue.select(".barValue_" + i).style("opacity", 0);

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
      text.attr("transform", `translate(${-textBox.width / 2}, ${-textBox.height + 5})`);
      path.attr("d", `M${-textBox.width / 2 - 10},5H-5l5,5l5,-5H${textBox.width / 2 + 10}v${-textBox.height - 20}h-${textBox.width + 20}z`);
    }
    function hideTooltip(_, i) {
      tooltip.style("display", "none");
      barValue.select(".barValue_" + i).style("opacity", 1);
    }
  }
};

export {BarChart};