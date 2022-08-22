import React from "react";
import * as d3 from "d3";
import PropTypes from "prop-types";

function CalendarHeatmap(props) {
  const svgRef = React.useRef(null);

  const handleLoad = () => {
    const { data, ...attr } = props;
    D3CalendarHeatmap(svgRef.current, data, attr);
  };

  React.useEffect(() => {
    handleLoad();
  }, []);

  return <svg ref={svgRef} />;
}

CalendarHeatmap.propTypes = {
  /** data for calender */
  data: PropTypes.array.isRequired,
  /** function to fetch x data */
  getX: PropTypes.func,
  /** function to fetch y data */
  getY: PropTypes.func,
  /** function for tooltipTitle */
  tipTitle: PropTypes.func,
  /** width of this chart */
  width: PropTypes.number,
  /** height of this chart */
  cellSize: PropTypes.number,
  /** title of chart */
  chartTitleText: PropTypes.string,
  /** margin top */
  marginTop: PropTypes.number,
  /** margin right */
  marginRight: PropTypes.number,
  /** margin bottom */
  marginBottom: PropTypes.number,
  /** margin left */
  marginLeft: PropTypes.number,
  /** give format string of time, base on strptime strftime of c standard library */
  utcParse: PropTypes.string,
  /** specifier string for format tip date */
  formatTipUTC: PropTypes.string,
  /** function to define day-of-week label in 0-6 */
  formatDay: PropTypes.func,
  /** format string for month */
  monthParse: PropTypes.string,
  /** weekday, monday or sunday */
  weekday: PropTypes.string,
  /** color array to render calendar */
  colors: PropTypes.array,
  /** legend title */
  legendTitle: PropTypes.string,
  /** legend tick format */
  tickFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /** animation time (ms) */
  animationTime: PropTypes.number,
  /** enable chart animation */
  enableAnimation: PropTypes.bool,
  /** enable chart legend */
  enableLegend: PropTypes.bool,
};

CalendarHeatmap.defaultProps = {
  getX: (d) => d.date,
  getY: (d) => d.value,
  tipTitle: undefined,
  width: 900,
  cellSize: 0,
  chartTitleText: "",
  marginTop: 65,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 40,
  formatTipUTC: "%Y-%m-%d",
  utcParse: "%Y-%m-%d",
  formatDay: (i) => "SMTWTFS"[i],
  monthParse: "%b",
  weekday: "sunday",
  colors: undefined,
  legendTitle: "",
  tickFormat: undefined,
  animationTime: 2000,
  enableAnimation: true,
  enableLegend: true,
};

function D3CalendarHeatmap(
  element,
  data,
  {
    getX,
    getY,
    tipTitle,
    width,
    cellSize,
    chartTitleText,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    formatTipUTC,
    utcParse,
    formatDay,
    monthParse,
    weekday,
    colors,
    legendTitle,
    tickFormat,
    animationTime,
    enableAnimation,
    enableLegend,
  }
) {
  const x = d3.map(d3.map(data, getX), (d) => d3.utcParse(utcParse)(d)),
    y = d3.map(d3.map(data, getY), (d) => Number(d)),
    I = d3.range(x.length);

  /* utc day 
    Sun - Sat
    0   - 7
  */

  cellSize = (width - marginLeft - marginRight) / 53;

  if (tipTitle === undefined)
    tipTitle = (i) =>
      `date: ${d3.utcFormat(formatTipUTC)(x[i])}\nvalue: ${y[i]}`;

  const // if sun position no change, mon (weekday also) position fix eg. Mon = 1 => 0
    countDay = weekday === "sunday" ? (i) => i : (i) => (i + 6) % 7,
    timeWeek = weekday === "sunday" ? d3.utcSunday : d3.utcMonday,
    weekDays = weekday === "weekday" ? 5 : 7,
    height = cellSize * (weekDays + 2),
    fontSize = (width + height) / 100,
    years = d3.groups(I, (i) => x[i].getFullYear()).reverse();

  if (colors === undefined) colors = d3.interpolatePiYG;

  const max = d3.quantile(y, 0.9975, Math.abs),
    colorScale = d3.scaleSequential([-max, max], colors).unknown("none");

  const formatMonth = d3.utcFormat(monthParse);

  const svg = d3
    .select(element)
    .attr("width", width)
    .attr("height", height * years.length + marginTop + marginBottom)
    .attr("viewbox", [
      0,
      0,
      width,
      height * years.length + marginTop + marginBottom,
    ])
    .attr("overflow", "visible");

  // create year group object
  const year = svg
    .selectAll("g")
    .data(years)
    .join("g")
    .attr(
      "transform",
      (d, i) =>
        `translate(${marginLeft}, ${marginTop + height * i + cellSize * 1.5})`
    );

  // year group title
  year
    .append("text")
    .attr("x", -5)
    .attr("y", -5)
    .attr("font-size", fontSize)
    .attr("font-weight", "bold")
    .attr("text-anchor", "end")
    .text(([key]) => key);

  // year group month
  year
    .append("g")
    .attr("text-anchor", "end")
    .attr("font-size", fontSize)
    .selectAll("text")
    .data(weekday === "weekday" ? d3.range(1, 6) : d3.range(7))
    .join("text")
    .attr("x", -5)
    .attr("y", (i) => (countDay(i) + 0.5) * cellSize)
    .attr("dy", "0.31em")
    .text(formatDay);

  // year group cell
  const cell = year.append("g");
  cell
    .selectAll("rect")
    .data(
      weekday === "weekday"
        ? ([, I]) => I.filter((i) => ![0, 6].includes(x[i].getUTCDay())) // filt Sun Sat
        : ([, I]) => I
    )
    .join("rect")
    .attr("class", (i) => "cell_" + x[i].getUTCMonth())
    .attr("width", cellSize - 1)
    .attr("height", cellSize - 1)
    .attr("x", (i) => timeWeek.count(d3.utcYear(x[i]), x[i]) * cellSize + 0.5)
    .attr("y", (i) => countDay(x[i].getUTCDay()) * cellSize + 0.5)
    .attr("fill", (i) => colorScale(y[i]));

  // divide each month
  function pathMonth(t) {
    const d = Math.max(0, Math.min(weekDays, countDay(t.getUTCDay())));
    const w = timeWeek.count(d3.utcYear(t), t);
    return `${
      d === 0
        ? `M${w * cellSize},0`
        : d === weekDays
        ? `M${(w + 1) * cellSize},0`
        : `M${(w + 1) * cellSize},0V${d * cellSize}H${w * cellSize}`
    }V${weekDays * cellSize}`;
  }

  // create month object for each year group
  const month = year
    .append("g")
    .selectAll("g")
    .data(([, I]) => d3.utcMonths(d3.utcMonth(x[I[0]]), x[I[I.length - 1]]))
    .join("g");

  // divide each month
  month
    .filter((d, i) => i)
    .append("path")
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-width", 3)
    .attr("d", pathMonth);

  // append months to each year group
  month
    .append("text")
    .attr(
      "x",
      (d) => timeWeek.count(d3.utcYear(d), timeWeek.ceil(d)) * cellSize + 2
    )
    .attr("y", -5)
    .attr("font-size", fontSize)
    .text(formatMonth);

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

  // tooltip
  const tooltip = svg.append("g").attr("pointer-events", "none");

  function showTooltip(_, i) {
    tooltip.style("display", null);
    const yearIndex = years.findIndex(([key]) => key === x[i].getFullYear());
    tooltip.attr(
      "transform",
      `translate(
        ${
          marginLeft +
          timeWeek.count(d3.utcYear(x[i]), x[i]) * cellSize +
          0.5 +
          (cellSize - 1) / 2
        },
        ${
          marginTop +
          countDay(x[i].getUTCDay()) * cellSize +
          0.5 -
          10 +
          (height * yearIndex + cellSize * 1.5)
        }
      )`
    );

    const path = tooltip
      .selectAll("path")
      .data([,])
      .join("path")
      .attr("fill", "rgba(250, 250, 250, 0.8)")
      //.attr("stroke", "rgba(200, 200, 200, 1)")
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
          .data(`${tipTitle(i)}`.split(/\n/))
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
  }

  function setToolTop() {
    cell
      .selectAll("rect")
      .on("mouseover.tooltip", showTooltip)
      .on("mouseleave.tooltip", hideTooltip);
  }

  setToolTop();

  if (enableAnimation) {
    for (let i = 0; i < 11; i++) {
      cell
        .selectAll("rect")
        .attr("fill", "none")
        .attr("width", 0)
        .transition()
        .attr("width", cellSize - 1)
        .attr("fill", (i) => colorScale(y[i]))
        .duration(animationTime)
    }
  }

  // create canvas ramp
  function ramp(color, n = 256) {
    const canvas = document.createElement("canvas");
    canvas.width = n;
    canvas.height = 1;
    const context = canvas.getContext("2d");
    for (let i = 0; i < n; i++) {
      context.fillStyle = color(i / (n - 1));
      context.fillRect(i, 0, 1, 1);
    }
    return canvas;
  }

  if (enableLegend) {
    // color scale => new legend x scale
    const legendX = Object.assign(
      colorScale.copy().interpolator(d3.interpolateRound(0, 200)),
      {
        range() {
          return [0, 200];
        },
      }
    );

    // legend rect
    const legend = svg
      .append("g")
      .attr("transform", `translate(10, ${marginTop / 3})`);
    legend
      .append("image")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 200)
      .attr("height", 10)
      .attr("preserveAspectRatio", "none")
      .attr("xlink:href", ramp(colorScale.interpolator()).toDataURL());

    const ticks = width / 250,
      n = Math.round(ticks + 1),
      tickValues = d3
        .range(n)
        .map((i) => d3.quantile(colorScale.domain(), i / (n - 1)));

    if (typeof tickFormat !== "function")
      tickFormat = d3.format(tickFormat === undefined ? ",.0f" : tickFormat);

    // legend axis and title
    legend
      .append("g")
      .attr("transform", `translate(0, 10)`)
      .call(
        d3
          .axisBottom(legendX)
          .ticks(ticks, typeof tickFormat === "string" ? tickFormat : undefined)
          .tickFormat(typeof tickFormat === "function" ? tickFormat : undefined)
          .tickSize(6)
          .tickValues(tickValues)
      )
      .call((g) => g.selectAll(".tick line").attr("y1", -10))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .append("text")
          .attr("x", 0)
          .attr("y", -16)
          .attr("fill", "black")
          .attr("text-anchor", "start")
          .attr("font-weight", "bold")
          .text(legendTitle)
      );
  }
}

export { CalendarHeatmap };
