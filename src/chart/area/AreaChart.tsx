import React from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import { ChartStyle, MapDataProps } from '../chart-style';
import { createTooltip } from '@/utils/tooltip';
import { createLegend } from '@/utils/legend';
import { groupData } from '@/utils/analysis';
import { getElementWidth } from '@/utils/dom';

export default function AreaChart(props: ChartStyle) {
  const svgRef = React.useRef(null);

  const handleLoad = () => {
    RemoveAreaChart(svgRef);
    CreateAreaChart(svgRef, props);
  };

  React.useEffect(() => {
    handleLoad();
  }, [props]);

  return <svg id='svg-area' width={'100%'} ref={svgRef} fontFamily={'Source Sans Pro, sans-serif'} />;
}

function RemoveAreaChart(element: React.MutableRefObject<null>) {
  d3.select(element.current).selectAll('g').remove();
}

function CreateAreaChart(element: React.MutableRefObject<null>, props: ChartStyle) {
  let {
    data,
    map,
    base,
    margin,
    xAxis,
    yAxis,
    stroke,
    node,
    parser,
    fill,
    time,
    tooltip,
    animation,
    legend,
    font
  } = props;

  if (data.length == 0)
    return;

  if (base.width === undefined) {
    base.width = getElementWidth('svg-area');
  }

  if (xAxis.range === undefined)
    xAxis.range = [margin.left, base.width - margin.right];

  if (yAxis.range === undefined)
    yAxis.range = [base.height - margin.bottom, margin.top];

  let x: any = [];
  if (xAxis.type === d3.scaleTime) x = d3.map(d3.map(data, map.getX), (d) => time.type(parser.time)(d));

  let rowKeys: string[] = [];
  map.keys.forEach((key) => rowKeys.push(key));

  const newData = groupData(rowKeys, data, x);

  if (xAxis.domain === undefined)
    xAxis.domain = d3.extent(x);
  if (yAxis.domain === undefined) {
    const domain2 = d3.max(newData, (obj) => d3.max(obj.value, (obj) => obj.y * 1.1));
    yAxis.domain = ['0', domain2 !== undefined ? domain2.toString() : '0']
  }


  const xScale = xAxis.type(xAxis.domain, xAxis.range);
  const yScale = yAxis.type(yAxis.domain, yAxis.range);

  if (font.size === undefined)
    font.size = Math.min(base.width, base.height) / 25 + 'px';

  const xAxisType = d3
    .axisBottom(xScale)
    .ticks(base.width / 80)
    .tickSizeOuter(0);
  const yAxisType = d3
    .axisLeft(yScale)
    .ticks(base.height / 40);

  // d: newData -> value
  const line = d3
      .line<MapDataProps>()
      .defined((d) => d.defined)
      .curve(stroke.type)
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y)),
    line0 = d3
      .line<MapDataProps>()
      .x((d) => xScale(d.x))
      .y(base.height - margin.bottom),
    area0 = d3
      .area<MapDataProps>()
      .x((d) => xScale(d.x))
      .y0(base.height - margin.bottom)
      .y(base.height - margin.bottom),
    area = d3
      .area<MapDataProps>()
      .defined((d) => d.defined)
      .curve(fill.type)
      .x((d) => xScale(d.x))
      .y0(yScale(0))
      .y1((d) => yScale(d.y));

  if (tooltip.map === undefined)
    tooltip.map = (d: MapDataProps) => {
      return `Group : ${d.key}\nx : ${d3.timeFormat('%Y-%m-%d')(d.x as Date)}\ny : ${d.y}`;
    };

  const svg = d3
    .select(element.current)
    .attr('width', base.width)
    .attr('height', base.height)
    .attr('viewBox', [0, 0, base.width, base.height])
    .attr('overflow', 'visible');

  if (yAxis.enabled) {
    const YAxis = svg.append('g').attr('transform', `translate(${margin.left}, 0)`);
    YAxis
      .call(yAxisType)
      .call((g) => g.select('.domain').remove())
      .call((g) =>
        g
          .selectAll('.tick line')
          .clone()
          .attr('x2', base.width - margin.left - margin.right)
          .attr('stroke-opacity', 0.1)
      )
      .call((g) =>
        g
          .append('text')
          .attr('x', 0)
          .attr('y', margin.top - 12)
          .attr('font-size', '12px')
          .attr('text-anchor', 'end')
          .attr('fill', 'currentColor')
          .text(yAxis.title)
      );
  }

  if (xAxis.enabled) {
    const XAxis = svg.append('g').attr('transform', `translate(0, ${base.height - margin.bottom})`);
    XAxis.call(xAxisType).call((g) =>
      g
        .append('text')
        .attr('x', base.width - margin.right + 12)
        .attr('y', 0)
        .attr('font-size', '12px')
        .attr('text-anchor', 'start')
        .attr('fill', 'currentColor')
        .text(xAxis.title)
    );
  }

  const chartTitle = svg.append('g');
  chartTitle.call((g) =>
    g
      .append('text')
      .attr('x', margin.left + (base.width - margin.right - margin.left) / 2)
      .attr('y', margin.top / 2)
      .attr('text-anchor', 'middle')
      .attr('font-size', '20px')
      .attr('fill', 'currentColor')
      .attr('font-weight', 550)
      .text(base.title)
  );

  if (fill.color === undefined)
    fill.color = d3.schemeAccent as Iterable<string>;
  //areaColor = d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1) , rowKeys.length);
  if (stroke.color === undefined)
    stroke.color = fill.color;

  const areaColorScale = d3.scaleOrdinal(rowKeys, fill.color);
  const strokeColorScale = d3.scaleOrdinal(rowKeys, stroke.color);

  const areaPath = svg.append('g'),
    linePath = svg.append('g'),
    lineNode = svg.append('g');

  if (stroke.enabled) {
    linePath
      .selectAll('path')
      .data(newData)
      .join('path')
      .attr('class', (d) => 'all _' + d.group)
      .attr('fill', 'none')
      .attr('stroke', (d) => strokeColorScale(d.group))
      .attr('stroke-base.width', stroke.width)
      .attr('stroke-linecap', stroke.linecap)
      .attr('stroke-linejoin', stroke.linejoin)
      .attr('stroke-opacity', stroke.opacity)
      .attr('d', (d) => line(d.value));
  }

  areaPath
    .selectAll('path')
    .data(newData)
    .join('path')
    .attr('class', (d) => 'all _' + d.group)
    .attr('fill', (d) => areaColorScale(d.group))
    .attr('opacity', fill.opacity)
    .attr('d', (d) => area(d.value));

  if (node.enabled) {
    const createNode = lineNode.selectAll('circle');
    newData.map((d, i) => {
      createNode
        .data(d.value)
        .join('circle')
        .attr('class', 'all _' + d.group)
        .attr('cx', (d) => xScale(d.x))
        .attr('cy', (d) => yScale(d.y))
        .attr('r', node.radius)
        .attr('fill', strokeColorScale(d.group))
        .attr('stroke', strokeColorScale(d.group))
        .attr('stroke-base.width', stroke.width);
    });
  }

  const {showTooltip, moveTooltip, hideTooltip} = createTooltip(svg, props);

  if (tooltip.enabled) {
    lineNode.selectAll('circle').on('mouseover', showTooltip).on('mousemove', moveTooltip).on('mouseleave', hideTooltip);
  }

  // animation
  if (animation.enabled) {
    areaPath
      .selectAll('path')
      .data(newData)
      .attr('fill', 'rgba(0, 0, 0, 0)')
      .attr('d', (d) => area0(d.value))
      .transition()
      .attr('fill', (d) => areaColorScale(d.group))
      .attr('opacity', fill.opacity)
      .attr('d', (d) => area(d.value))
      .duration(animation.duration);

    if (stroke.enabled) {
      const pathLength = linePath
        .selectAll('path')
        .nodes()
        .map((node) => {
          return node === null ? 0 : (node as SVGGeometryElement).getTotalLength();
        });
      linePath
        .selectAll('path')
        .data(pathLength)
        .attr('stroke-dasharray', (d) => d + ' ' + d)
        .attr('stroke-dashoffset', (d) => d)
        .transition()
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', 0)
        .duration(animation.duration)
        .delay(animation.duration);
    }
    if (node.enabled) {
      lineNode
        .selectAll('circle')
        .style('opacity', 0)
        .transition()
        .ease(d3.easeLinear)
        .style('opacity', 1)
        .duration(animation.duration)
        .delay(animation.duration);
    }
  }

  const onHover = (_: any, d: any) => {
    linePath.selectAll('.all').style('opacity', 0.1);
    lineNode.selectAll('.all').style('opacity', 0.1);
    areaPath.selectAll('.all').style('opacity', 0.1);
    linePath.selectAll('._' + d).style('opacity', stroke.opacity);
    lineNode.selectAll('._' + d).style('opacity', stroke.opacity);
    areaPath.selectAll('._' + d).style('opacity', fill.opacity);
  }
  const noHover = () => {
    linePath.selectAll('.all').style('opacity', stroke.opacity);
    lineNode.selectAll('.all').style('opacity', stroke.opacity);
    areaPath.selectAll('.all').style('opacity', fill.opacity);
  }

  // legend
  if (legend.enabled) {
    createLegend(svg, rowKeys, areaColorScale, props, onHover, noHover);
  }
}

AreaChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  map: PropTypes.objectOf(PropTypes.any),
  base: PropTypes.objectOf(PropTypes.any),
  margin: PropTypes.objectOf(PropTypes.number),
  xAxis: PropTypes.objectOf(PropTypes.any),
  yAxis: PropTypes.objectOf(PropTypes.any),
  stroke: PropTypes.objectOf(PropTypes.any),
  node: PropTypes.objectOf(PropTypes.any),
  parser: PropTypes.objectOf(PropTypes.any),
  fill: PropTypes.objectOf(PropTypes.any),
  time: PropTypes.objectOf(PropTypes.any),
  tooltip: PropTypes.objectOf(PropTypes.any),
  animation: PropTypes.objectOf(PropTypes.any),
  legend: PropTypes.objectOf(PropTypes.any)
};

AreaChart.defaultProps = {
  map: {
    getX: (d: any) => d.x,
    keys: ['y']
  },
  base: {
    width: undefined,
    height: 300,
    title: ''
  },
  tooltip: {
    map: undefined,
    enabled: true,
  },
  xAxis: {
    title: 'x',
    type: d3.scaleTime,
    domain: undefined,
    range: undefined,
    enabled: true,
  },
  yAxis: {
    title: 'y',
    type: d3.scaleLinear,
    domain: undefined,
    range: undefined,
    enabled: true,
  },
  parser: {
    time: '%Y-%m-%d',
  },
  time: {
    type: d3.timeParse
  },
  stroke: {
    color: undefined,
    type: d3.curveLinear,
    linecap: 'round',
    linejoin: 'round',
    width: 1.5,
    opacity: 1,
    enabled: true
  },
  margin: {
    top: 40,
    right: 60,
    bottom: 60,
    left: 60
  },
  node: {
    radius: 5,
    enabled: true
  },
  fill: {
    color: undefined,
    opacity: 0.3,
    type: d3.curveLinear
  },
  animation: {
    duration: 1000,
    enabled: true
  },
  legend: {
    enabled: true,
  },
  font: {
    size: undefined,
  }
};
