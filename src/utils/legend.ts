import { ChartStyle } from '@/chart/chart-style';

export function createLegend(
  svg: d3.Selection<null, unknown, null, undefined>,
  keys: string[],
  colorScale: any,
  props: ChartStyle,
  onHover: (this: d3.BaseType, event: any, d: unknown) => void,
  noHover: (this: d3.BaseType, event: any, d: unknown) => void
) {
  const legend = svg
    .append('g')
    .attr('transform', `translate(${props.width - props.margin.right + 20}, ${props.margin.top})`)
  legend
    .selectAll('circle')
    .data(keys)
    .join('circle')
    .attr('class', (d) => 'legend_' + d)
    .attr('cx', 0)
    .attr('cy', (_, i) => i * 20 * 1.1)
    .attr('r', 10)
    .attr('fill', (d) => colorScale(d))
    .style('cursor', 'pointer');
  legend
    .selectAll('text')
    .data(keys)
    .join('text')
    .attr('class', (d) => 'legend_' + d)
    .attr('x', 20)
    .attr('y', (_, i) => i * 20 * 1.1 + 4)
    .attr('text-anchor', 'start')
    .style('fill', 'currentColor')
    .style('font-size', '12px')
    .style('font-weight', 300)
    .text((d) => d);
  setTimeout(() => {
    keys.map((d) => {
      legend
        .select('.legend_' + d)
        .on('mouseover', onHover)
        .on('mouseleave', noHover)
    });
  }, props.animation.duration * 2);
  return legend;
}
