import { MapDataProps } from "@/chart/chart-style";

export function createTooltip(svg: d3.Selection<null, unknown, null, undefined>, horizontalScale: any, verticalScale: any,
  xOffset: number, yOffset: number, xBase: number, yBase: number, props: {nodeRadius: number, tooltipTitle: Function, fontSize: string}) {
  const Tooltip = svg.append('g').style('pointer-events', 'none');

  function showTooltip (this: d3.BaseType, event: any, d: unknown) {
    Tooltip.style('display', null);
    Tooltip.attr('transform', `translate(${horizontalScale((d as MapDataProps).x) + xOffset + props.nodeRadius * xBase},
      ${verticalScale((d as MapDataProps).y) + yOffset + props.nodeRadius * yBase})`);

    const path = Tooltip
      .selectAll('path')
      .data([,])
      .join('path')
      .attr('fill', 'rgba(250, 250, 250, 0.8)')
      .attr('stroke', 'rgba(200, 200, 200, 1)')
      .attr('stroke', 'black')
      .attr('color', 'black');

    const text = Tooltip
      .selectAll('text')
      .data([,])
      .join('text')
      .style('font-size', props.fontSize)
      .call((text) =>
        text
          .selectAll('tspan')
          .data(`${props.tooltipTitle(d)}`.split(/\n/))
          .join('tspan')
          .attr('x', 0)
          .attr('y', (_, i) => `${i * 1.1}em`)
          .attr('font-weight', (_, i) => (i ? null : 'bold'))
          .text((d) => d)
      );

    const textNode = text.node();
    const textBox = textNode === null ? {width: 0, height: 0} : (textNode as SVGGeometryElement).getBBox();
    Tooltip.selectAll('path').attr('d', null);
    text.attr('transform', `translate(${-textBox.width / 2}, ${-textBox.height + 5})`);
    path.attr(
      'd',
      `M${-textBox.width / 2 - 10},5H-5l5,5l5,-5H${textBox.width / 2 + 10}v${-textBox.height - 20}h-${
        textBox.width + 20
      }z`
    );
  }
  function hideTooltip() {
    Tooltip.style('display', 'none');
  }

  return {showTooltip, hideTooltip, Tooltip};
}
