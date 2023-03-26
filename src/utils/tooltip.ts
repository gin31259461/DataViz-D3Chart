import { easeExpOut } from "d3-ease";
import { ChartStyle, MapDataProps } from "@/chart/chart-style";
import { pointer } from 'd3';

export function createTooltip(
  svg: d3.Selection<null, unknown, null, undefined>,
  props: ChartStyle) {
  const Tooltip = svg.append('g').style('pointer-events', 'none');

  function showTooltip (this: d3.BaseType, event: any, d: unknown) {
    Tooltip
      .transition()
      .attr('opacity', 1)
      .attr('transform', `translate(
        ${pointer(event, event.target)[0]},
        ${pointer(event, event.target)[1] - 10}
      )`)
      .duration(500)
      .ease(easeExpOut);

    const path = Tooltip
      .selectAll('path')
      .data([,])
      .join('path')
      .attr('fill', '#040509CC')

    const text = Tooltip
      .selectAll('text')
      .data([,])
      .join('text')
      .style('font-size', props.font.size)
      .call((text) =>
        text
          .selectAll('tspan')
          .data(`${props.tooltip.map(d)}`.split(/\n/))
          .join('tspan')
          .attr('x', 0)
          .attr('y', (_, i) => `${i * 1.5}em`)
          .attr('font-weight', (_, i) => (i ? null : 'bold'))
          .attr('fill', '#f2f0f0')
          .text((d) => d)
      );

    Tooltip.selectAll('path').attr('d', null);
    const textNode = text.node();
    const textBox = textNode === null ? {width: 0, height: 0} : (textNode as SVGGeometryElement).getBBox();
    const width = textBox.width;
    const height = textBox.height;
    text.attr('transform', `translate(${-width / 2}, ${-height + 7})`);
    path.attr('d',
      `M${-width / 2 - 5},5
      H-5
      l5,5
      l5,-5
      H${width / 2 + 5}
      v${-height - 15}
      h-${width + 10}
      z
    `);
  }
  function moveTooltip(this: d3.BaseType, event: any) {
    Tooltip
      .transition()
      .attr('opacity', 1)
      .attr('transform', `translate(
        ${pointer(event, event.target)[0]},
        ${pointer(event, event.target)[1] - 10}
      )`)
      .duration(500)
      .ease(easeExpOut);
  }
  function hideTooltip() {
    Tooltip
      .transition()
      .attr('opacity', 0)
      .duration(0)
      .delay(151);
  }
  return {showTooltip, moveTooltip, hideTooltip, Tooltip};
}