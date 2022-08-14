import React, { Component } from "react";
import * as d3 from "d3";
import PropTypes from "prop-types";

class BarChartStacked extends Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    data: PropTypes.array.isRequired,
    getX: PropTypes.func, // function to fetch x-axis data
    keysOfGroups: PropTypes.arrayOf(PropTypes.string), // fetch y-axis data
    width: PropTypes.number, // chart width
    height: PropTypes.number, // chart height
    chartTitleText: PropTypes.string, // title of chart
    tooltipTitle: PropTypes.func, // function of tooltip title
    xAxisText: PropTypes.string, // x axis label
    yAxisText: PropTypes.string, // y axis label
    xAxisTicksTextRotation: PropTypes.number, // rotate x axis ticks text, recommend range[30 - 45]
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
    enableLegend: PropTypes.bool,
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
    xAxisTicksTextRotation: 0,
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
    enableLegend: true,
  };

  componentDidMount() {
    const { data, ...attr } = this.props;
    const element = this.element, bar = new D3BarChartStacked(element);
    bar.render(data, attr);
  }

  render() {
    return <svg ref = { element => this.element = element} />;
  }

};

class D3BarChartStacked {

  constructor(element) {
    this.svg = d3.select(element)
  }

  render(data, attr) {

    let {
      getX, keysOfGroups, width, height, chartTitleText, tooltipTitle, xAxisText, yAxisText,
      xPadding, marginTop, marginRight, marginBottom, marginLeft, animationTime,
      color, xRange, yRange, xDomain, yDomain, enableLegend, xAxisTicksTextRotation,
      enableAnimation, enableBarValue, enableXAxis, enableYAxis,
    } = attr;

    if (xRange === undefined) xRange = [marginLeft, width - marginRight];
    if (yRange === undefined) yRange = [height - marginBottom, marginTop];

    const x = d3.map(data, getX);

    const groupData = keysOfGroups.map(k => {
      const newData = [];
      d3.map(data, (d, i) => {
        newData.push({
          "x": x[i],
          "y": Number(d[k]),
          "stackedY": Number(d[k]),
          "group": k,
        });
      });
      return { "group": k, "value": newData};
    });
    keysOfGroups.push("all");

    // stack data
    groupData.map( (g, i) => {
      g.value.map( (_, k) => {
        if (i >= 1)
          groupData[i].value[k].stackedY += groupData[i-1].value[k].stackedY; 
      });
    });

    if(xDomain === undefined) xDomain = x.filter( d => d != "");
    if(yDomain === undefined) yDomain = [0, d3.max(data, d => d3.sum(d3.map(keysOfGroups, k => d[k]))) * 1.2];

    // unique domain
    xDomain = new d3.InternSet(xDomain);

    const
      xScale = d3.scaleBand(xDomain, xRange).padding(xPadding),
      yScale = d3.scaleLinear(yDomain, yRange),
      xAxisType = d3.axisBottom(xScale).tickSizeOuter(0),
      yAxisType = d3.axisLeft(yScale).ticks(height / 40),
      fontSize = (width + height) / 100 + "px";

    if (color === undefined)
      color = d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), keysOfGroups.length);

    const colorScale = d3.scaleOrdinal(keysOfGroups, color);

    if(tooltipTitle === undefined)
      tooltipTitle = d => {
        return `group: ${d.group}\nx: ${d.x}\ny: ${d.y}`;
      };

    const svg = this.svg 
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("overflow", "visible");

    function yAxisAttr() {
      yAxis
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
        )
    }

    const yAxis = svg.append("g").attr("transform", `translate(${marginLeft}, 0)`);
    if (enableYAxis) {
      yAxis
        .call(yAxisType);
      yAxisAttr();
    }

    if (enableXAxis) {
      const xAxis = svg.append("g").attr("transform", `translate(0, ${height - marginBottom})`);
      xAxis
        .call(xAxisType)
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
        
    const 
      bar = svg.append("g"),
      barWidth = xScale.bandwidth() / 2,
      createBar = bar.selectAll("rect");

    let currentY = [];
    groupData[1].value.map(d => currentY.push(yScale(d.y)));
    
    groupData.map( (d, i) => {
      createBar
        .data(d.value)
        .join("rect")
          .attr("class", "all _" + d.group)
          .attr("fill", d => colorScale(d.group))
          .attr("height", d => yScale(0) - yScale(d.y))
          .attr("width", barWidth)
          .attr("x", d => xScale(d.x) + barWidth / 2) 
          .attr("y", d => yScale(d.stackedY))
        .on("mouseover", showTooltip)
        .on("mouseleave", hideTooltip);
    });

    const
      barValue = svg.append("g"),
      createBarValue = barValue.selectAll("text");
    if (enableBarValue) {
      groupData.map( d => {
        createBarValue
          .data(d.value)
          .join("text")
          .text(d => d.stackedY)
            .attr("class", d => "all _" + d.x + " _" + d.group)
            .style("font-size", fontSize)
            .attr("fill", "none")
            .attr("text-anchor", "middle")
            .attr("x", d => xScale(d.x) + barWidth) 
            .attr("y", d => yScale(d.stackedY) - 2);
      })
    }
    barValue.selectAll("._" + keysOfGroups[keysOfGroups.length - 2]).attr("fill", "black");

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
        .attr("y", height - marginBottom)
        .attr("height", 0)
        .attr("fill", "rgba(0, 0, 0, 0)")
        .transition()
        .attr("y", d => yScale(d.stackedY))
        .attr("height", d => yScale(0) - yScale(d.y))
        .attr("fill", d => colorScale(d.group))
        .duration(animationTime);

      if (enableBarValue) {
        barValue.selectAll("text")
          .transition()
          .attrTween("y", d => {
            const f = d3.interpolate(yScale(0), yScale(d.stackedY) - 2);
            return t => {
                return f(t);
            };
          })
          .textTween( d => {
            const f = d3.interpolate(0, d.stackedY);
            return t => {
              return `${d3.format(".0f")(f(t))}`;
            };
          })
          .duration(animationTime);
        }
    }

    // control tooltip
    let selectedOne = false;

    // tooltip
    const tooltip = svg.append("g")
      .attr("pointer-events", "none")

    function showTooltip(_, d) {
      const i = keysOfGroups.indexOf(d.group);
      tooltip.style("display", null);
      tooltip.attr("transform", `translate(${xScale(d.x) + barWidth}, ${yScale(d.stackedY) - 10})`);
      barValue.select("._" + d.x).style("opacity", 0);

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
      text.attr("transform", `translate(${-textBox.width / 2}, ${-textBox.height + 5})`);
      path.attr("d", `M${-textBox.width / 2 - 10},5H-5l5,5l5,-5H${textBox.width / 2 + 10}v${-textBox.height - 20}h-${textBox.width + 20}z`);
    }
    function hideTooltip(_, d) {
      tooltip.style("display", "none");
      barValue.select("._" + d.x).style("opacity", 1);
    }

    // legend
    if (enableLegend) {
      const legend = svg.append("g")
        .attr("transform", `translate(${width - marginRight + 25 + 20}, ${marginTop})`)
        .style("cursor", "pointer");
      legend
        .selectAll("circle")
        .data(keysOfGroups)
        .join("circle")
          .attr("class", d => "legend_" + d)
          .attr("cx", 0)
          .attr("cy", (_, i) => i * 20 * 1.1)
          .attr("r", 10)
          .attr("fill", d => colorScale(d));
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
          .text(d => d);
      setTimeout(() => {
        keysOfGroups.slice(0, -1).map(d => {
          legend.select(".legend_" + d)
            .on("mouseover", highlight)
            .on("mouseleave", noHighlight)
            .on("click", selectOne);
        });
        legend.select(".legend_all").on("click", selectAll);
      }, animationTime);
    }

    function highlight(_, d) {
      if (!(d === "all") && !selectedOne) {
        bar.selectAll(".all").style("opacity", 0.2);
        barValue.selectAll(".all").style("opacity", 0.2);
        bar.selectAll("._" + d).style("opacity", 1);
      }
    }
    function noHighlight() {
        bar.selectAll(".all").style("opacity", 1);
        barValue.selectAll(".all").style("opacity", 1);
    }
    function selectOne(_, d) {
      selectedOne = true;
      groupData.map(data => {
        if (!(data.group === d) && !(d === "all")) {
          bar.selectAll("._" + data.group)
            .transition()
            .attr("height", 0)
            .attr("width", barWidth)
            .attr("x", d => xScale(d.x) + barWidth / 2)
            .attr("y", height - marginBottom)
            .attr("fill", "rgba(0, 0, 0, 0)")
            .duration(500);
          barValue.selectAll("._" + data.group)
            .transition()
            .attr("x", d => xScale(d.x) + barWidth)
            .attr("y", yScale(0))
            .style("fill", "none")
            .duration(500);
        }
        else if (data.group === d) {
          const selectOneYScale = d3.scaleLinear([0, d3.max(data.value, d => d.y) * 1.2], yRange);
          yAxis.selectAll(".tick").remove();
          yAxis
            .transition()
            .call(d3.axisLeft(selectOneYScale).ticks(height / 40))
            .duration(500);
          yAxisAttr();
          bar.selectAll("._" + data.group)
            .transition()
            .attr("height", d => selectOneYScale(0) - selectOneYScale(d.y))
            .attr("width", xScale.bandwidth() / 2)
            .attr("x", d => xScale(d.x) + barWidth / 2)
            .attr("y", d => selectOneYScale(d.y))
            .attr("fill", d => colorScale(d.group))
            .duration(500);
          barValue.selectAll("._" + data.group)
            .transition()
            .text(d => d.y)
            .attr("x", d => xScale(d.x) + barWidth)
            .attr("y", d => selectOneYScale(d.y) - 2)
            .style("fill", "black")
            .duration(500);
        }
      });
    }
    function selectAll() {
      selectedOne = false;
      yAxis.selectAll(".tick").remove();
      yAxis
        .transition()
        .call(yAxisType)
        .duration(500);
      yAxisAttr();
      bar.selectAll(".all")
        .transition()
        .attr("height", d => yScale(0) - yScale(d.y))
        .attr("width", barWidth)
        .attr("x", d => xScale(d.x) + barWidth / 2) 
        .attr("y", d => yScale(d.stackedY))
        .attr("fill", d => colorScale(d.group))
        .duration(500);
      barValue.selectAll(".all")
        .transition()
        .attr("x", d => xScale(d.x) + barWidth) 
        .attr("y", d => yScale(d.stackedY) - 2)
        .style("fill", "none")
        .duration(500);
      barValue.selectAll("._" + keysOfGroups[keysOfGroups.length - 2])
        .transition()
        .text(d => d.stackedY)
        .attr("x", d => xScale(d.x) + barWidth) 
        .attr("y", d => yScale(d.stackedY) - 2)
        .style("fill", "black")
        .duration(500);
    }
  }

};

export {BarChartStacked};