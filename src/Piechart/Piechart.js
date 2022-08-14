import React, {Component} from "react";
import * as d3 from "d3"; 
import PropTypes from "prop-types";

class PieChart extends Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    data: PropTypes.array.isRequired,
    getName: PropTypes.func, // function to fetch x-axis data
    getValue: PropTypes.func, // function to fetch y-axis data
    getDetail: PropTypes.oneOfType [
      PropTypes.func,
      PropTypes.arrayOf(PropTypes.string)
    ], // function to fetch each piece of pie
    width: PropTypes.number, // chart width
    height: PropTypes.number, // chart height
    nameDomain: PropTypes.arrayOf([PropTypes.number, PropTypes.number]),
    color: PropTypes.oneOfType [
      PropTypes.func,
      PropTypes.arrayOf(PropTypes.string)
    ], // chart color
    chartTitleText: PropTypes.string,
    format: PropTypes.string, // value format
    tooltipTitle: PropTypes.func, // function for tooltip title
    marginTop: PropTypes.number,
    marginRight: PropTypes.number,
    marginBottom: PropTypes.number,
    marginLeft: PropTypes.number,
    innerRadius: PropTypes.number,
    outerRadius: PropTypes.number,
    labelRadius: PropTypes.number,
    stroke: PropTypes.string,
    strokeWidth: PropTypes.number,
    strokeLinejoin: PropTypes.string,
    padAngle: PropTypes.number,
    animationTime: PropTypes.number, // ms
    enableAnimation: PropTypes.bool,
    enablePieLabel: PropTypes.bool,
    enableLegend: PropTypes.bool
  };

  static defaultProps = {
    getName: d => d.name, // function to fetch x-axis data
    getValue: d => d.value, // function to fetch y-axis data
    getDetail: undefined,
    width: 500, // chart width
    height: 300, // chart height
    nameDomain: undefined,
    color: undefined, // chart color
    chartTitleText: "",
    format: ",.0f", // value format
    tooltipTitle: undefined, // function for tooltip title
    marginTop: 40,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    innerRadius: 0,
    outerRadius: undefined,
    labelRadius: undefined,
    stroke: undefined,
    strokeWidth: 2,
    strokeLinejoin: "round",
    padAngle: undefined,
    animationTime: 2000, // ms
    enableAnimation: true,
    enablePieLabel: true,
    enableLegend: true,
  };

  componentDidMount() {
    const {data, ...attr} = this.props;
    const element = this.element, pie = new D3PieChart(element);
    pie.render(data, attr);
  }
  
  render() {
    return <svg ref = { element => this.element = element} />;
  }

};

class D3PieChart {

  constructor(element) {
    this.svg = d3.select(element);
  }

  render(data, attr) {

    let {
      getName, getValue, width, height, nameDomain, color, format, tooltipTitle,
      innerRadius, outerRadius, labelRadius, stroke, strokeWidth, strokeLinejoin,
      padAngle, chartTitleText, animationTime, enableAnimation, getDetail,
      enablePieLabel, marginBottom, marginLeft, marginRight, marginTop, enableLegend
    } = attr;

    if (outerRadius === undefined) outerRadius = Math.min(width, height) / 3;
    if (labelRadius === undefined) labelRadius = (innerRadius * 0.2 + outerRadius * 0.8);
    if (stroke === undefined) stroke = innerRadius > 0 ? "none" :"white";
    if (padAngle === undefined) padAngle = stroke === "none" ? 1 / outerRadius :0;

    const
      name = d3.map(data, getName),
      value = d3.map(d3.map(data, getValue), d => Number(d));
    
    let detail = undefined;
    if (typeof getDetail === "function")
      detail = d3.map(data, getDetail);
    else if (typeof getDetail === "object")
      detail = getDetail;

    // unique set
    if (nameDomain === undefined)
      nameDomain = new d3.InternSet(name.filter(d => d != ""));

    const
      I = d3.range(name.length).filter(i => !isNaN(value[i]) && nameDomain.has(name[i])),
      fontSize = (width + height) / 100 + "px";

    // title function.
    if (tooltipTitle === undefined) {
      tooltipTitle = i => `${name[i]}\n${value[i]}`;
    }

    // Construct arcs.
    // d3.pie()(data); -> divide data to each group 
    const divData = d3.pie().padAngle(padAngle).sort(null).value(i => value[i])(I);
    name.push("all");
    I.push(name.length - 1);

    // Chose a default color scheme based on cardinality.
    if (color === undefined) color = d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), name.length);
    const colorScale = d3.scaleOrdinal(name, color);

    // d3.arc().innerRadius().outerRadius();
    // innerRadius 內半徑 outerRadius 外半徑
    const
      arcs = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius),
      arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);

    const svg = this.svg 
      .attr("width", width)
      .attr("height", height)
      .attr("overflow", "visible")
      .attr("viewBox", [0, 0, width, height]);
    
    // construct arc
    const pie = svg.append("g").attr("transform", `translate(${width / 2}, ${height / 2})`);
    pie
      .attr("stroke", stroke)
      .attr("strokeWidth", strokeWidth)
      .attr("strokeLinejoin", strokeLinejoin)
      .selectAll("path")
      .data(divData)
      .join("path")
        .attr("class", d => "all pie_" + name[d.data])
        .attr("fill", d => colorScale(name[d.data]))
        .attr("d", arcs);
    
    const pieLabel =  svg.append("g")
      .attr("text-anchor", "middle")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    if (enablePieLabel) {
      pieLabel
        .selectAll("text")
        .data(divData)
        .join("text")
          .style("font-size", fontSize)
          .attr("class", d => "all pieLabelText_" + name[d.data])
          .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
        .selectAll("tspan")
        .data(d => {
          const lines = `${tooltipTitle(d.data)}`.split(/\n/);
          return (d.endAngle - d.startAngle) > 0.25 ? lines : lines.slice(0, 0);
        })
        .join("tspan")
          .attr("x", 0)
          .attr("y", (_, i) => `${i * 1.1}em`)
          .attr("font-weight", (_, i) => i ? null : "bold")
          .text(d => d);
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

    // animation
    if (enableAnimation) {
      pie.selectAll("path")
        .attr("fill", "rgba(0, 0, 0, 0)")
        .transition()
        .attrTween("d", d => {
          const f = d3.interpolate(d.startAngle, d.endAngle);
          return t => {
            d.endAngle = f(t);
            return arcs(d);
          };
        })
        .attr("fill", d => colorScale(name[d.data]))
        .duration(animationTime);

      if (enablePieLabel) {
        pieLabel.selectAll("tspan")
          .transition()
          .textTween(d => {
            if (isNaN(Number(d))) {
              return t => {
                return d;
              };
            };
            const formatValue = d3.format(format);
            const f = d3.interpolate(0, d);
            return t => {
              return formatValue(f(t));
            }
          })
          .duration(animationTime);
      }
    }

    let selectedOne = false;

    // tooltip
    const tooltip = svg.append("g")
      .attr("pointer-events", "none");

    function showTooltip(_, d) {
      if (selectedOne) return;

      tooltip.style("display", null);
      const p = arcLabel.centroid(d);
      tooltip.attr("transform", `translate(${p[0] + width / 2}, ${p[1] + height / 2})`);

      pieLabel.select(".pieLabelText_" + name[d.data]).style("opacity", 0);

      const path = tooltip.selectAll("path")
        .data([,])
        .join("path")
          .attr("fill", "rgba(250, 250, 250, 0.8)")
          .attr("stroke", "rgba(224, 224, 224, 1)")
          .attr("color", "black");

      const text = tooltip.selectAll("text")
        .data([,])
        .join("text")
          .attr("id", "tooltip-text")
          .style("font-size", fontSize)
        .call(text => text
          .selectAll("tspan")
          .data(`${tooltipTitle(d.data)}`.split(/\n/))
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
      pieLabel.select(".pieLabelText_" + name[d.data]).style("opacity", 1);
    }
    function hoverPie (_, d) {
      if (!selectedOne) {
        const scale = 0.2;
        const hoverArc = d3.arc().innerRadius(innerRadius * scale).outerRadius(outerRadius * scale);
        pie.select(".pie_" + name[d.data])
          .transition()
          .ease(d3.easeLinear)
          .attr("transform", `translate(${hoverArc.centroid(d)})`)
          .duration(500)
      }
    }
    function noHoverPie (_, d) {
      if (!selectedOne) {
        pie.select(".pie_" + name[d.data])
          .transition()
          .ease(d3.easeLinear)
          .attr("transform", `translate(0, 0)`)
          .duration(500)
      }
    }

    setTimeout( () => {
      pie
        .selectAll("path")
        .on("mouseover.tooltip", showTooltip)
        .on("mouseleave.tooltip", hideTooltip)
        .on("mouseover.hover", hoverPie)
        .on("mouseleave.hover", noHoverPie);
    }, animationTime);

    // legend
    if (enableLegend) {
      const legend = svg.append("g")
        .attr("transform", `translate(${width - marginRight + 25 + 20}, ${marginTop})`)
        .style("cursor", "pointer");
      legend
        .selectAll("circle")
        .data(I)
        .join("circle")
          .attr("class", i => "legend_" + name[i])
          .attr("cx", 0)
          .attr("cy", (_, i) => i * 20 * 1.1)
          .attr("r", 10)
          .attr("fill", i => colorScale(name[i]));
      legend
        .selectAll("text")
        .data(I)
        .join("text")
          .attr("class", i => "legend_" + name[i])
          .attr("x", 20)
          .attr("y", (_, i) => i * 20 * 1.1 + 4)
          .attr("text-anchor", "start")
          .style("font-size", "12px")
          .style("font-weight", 300)
          .text(i => name[i]);
      setTimeout(() => {
        divData.map(d => {
          legend.select(".legend_" + name[d.data])
            .on("mouseover", highlight)
            .on("mouseleave", noHighlight)
            .on("click", selectOne);
        })
        legend.select(".legend_all").on("click", selectAll);
      }, animationTime);

      // d -> index
      function highlight(_, i) {
        if (!(name[i] === "all") && !selectedOne) {
          pie.selectAll(".all").style("opacity", 0.2);
          pieLabel.selectAll(".all").style("opacity", 0.2);
          pie.select(".pie_" + name[i]).style("opacity", 1)
          pieLabel.select(".pieLabelText_" + name[i]).style("opacity", 1);
        }
      }
      function noHighlight() {
        if (!selectedOne) {
          pie.selectAll(".all").style("opacity", 1)
          pieLabel.selectAll(".all").style("opacity", 1);
        }
      }

      const selectedDetail = svg.append("g").attr("transform", `translate(${width / 2}, ${height / 2})`);
      selectedDetail
        .append("text")
        .attr("text-anchor", "middle");

      function selectOne(_, i) {
        selectedOne = true;
        const
          scale = 2,
          newArc = d3.arc().innerRadius(innerRadius * scale).outerRadius(outerRadius * scale),
          deltaY = (outerRadius - innerRadius) * scale / 2,
          angle = divData[i],
          rotation = -1 * ( (angle.startAngle + (angle.endAngle - angle.startAngle) / 2) * 180 / Math.PI),
          newFontSize = Number(fontSize.slice(0, -2)) * scale + "px";

        pie.selectAll(".all")
          .transition()
          .ease(d3.easeLinear)
          .attr("transform", `translate(0, 0) rotate(0)`)
          .attr("d", arcs)
          .style("opacity", 0.2)
          .duration(250)
          .transition()
          .attr("d", null)
          .duration(250);
        pieLabel.selectAll("text")
          .transition()
          .style("font-size", "0")
          .duration(500);
        pie.select(".pie_" + name[i])
          .transition()
          .ease(d3.easeLinear)
          .attr("transform", `translate(0, ${deltaY}) rotate(${rotation})`)
          .attr("d", newArc)
          .style("opacity", 1)
          .duration(500);
        pieLabel.select(".pieLabelText_" + name[i])
          .transition()
          .attr("transform", `translate(0, 0)`)
          .style("font-size", newFontSize)
          .style("opacity", 1)
          .duration(500);
        
        if (!(detail === undefined)) {
          selectedDetail.select("text")
            .attr("transform", `translate(0, ${deltaY + 20})`)
            .transition()
            .style("font-size", newFontSize)
            .text(detail[i])
            .duration(500);
        }
      }
      function selectAll() {
        pie.selectAll(".all")
          .transition()
          .ease(d3.easeLinear)
          .attr("transform", `translate(0, 0) rotate(0)`)
          .style("opacity", 1)
          .duration(250)
          .transition()
          .attr("d", arcs)
          .duration(250);
        pieLabel.selectAll("text")
          .transition()
          .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
          .style("font-size", fontSize)
          .style("opacity", 1)
          .duration(500);
        if (!(detail === undefined)) {
          selectedDetail.select("text")
            .transition()
            .style("font-size", 0)
            .text("")
            .duration(500);
        }
        setTimeout( () => selectedOne = false, 600);
      }
    }
  }
}

export {PieChart};