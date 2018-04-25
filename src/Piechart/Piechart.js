import React, { Component, } from 'react'
import * as d3 from 'd3'
import PropTypes from 'prop-types'
class Piechart extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    /** 資料的來源 */
    data: PropTypes.array.isRequired,
    /** SVG 的寬度 */
    width: PropTypes.number,
    /** SVG 的高度 */
    height: PropTypes.number,
    /** SVG 的上邊界 */
    margintop: PropTypes.number,
    /** SVG 的下邊界 */
    marginbottom: PropTypes.number,
    /** SVG 的右邊界 */
    marginright: PropTypes.number,
    /** SVG 的左邊界*/
    marginleft: PropTypes.number,
    /** 圓餅圖的半徑*/
    radius: PropTypes.number,
    /** 圓餅外圈的縮放倍數  */
    outerRadius: PropTypes.number,
    /** 圓餅內圈的半徑倍數  */
    innerRadius: PropTypes.number,
    /** 取出資料分類欄位的函式 */
    gettext: PropTypes.func,
    /** 取出資料數值欄位的函式 */
    getvalue: PropTypes.func,
    /** 顏色的取資料函式 */
    getcolor: PropTypes.func,
    /** 圓的顏色的對應物件 */
    color: PropTypes.object,
    /** 點擊圖表觸發函式 */
    onClick: PropTypes.func,
    /** 圖表的動畫時間 ( ms )*/
    AnimateTime: PropTypes.number,
  }
  static defaultProps = {
    width: 200,
    height: 200,
    margintop: 50,
    marginbottom: 30,
    marginright: 50,
    marginleft: 40,
    radius: 100,
    outerRadius: .9,
    innerRadius: 0,
    gettext: (d) => d.text,
    getvalue: (d) => d.count,
    getcolor: (d) => d.color,
    color: {},
    onClick: (d, i) => { },
    AnimateTime: 500

  }

  componentDidMount() {
    const { data, ...settings } = this.props
    var el = this.el,
      pie = new d3pie(el)
    pie.render(data, settings)
  }
  render() {
    return <svg ref={(el) => this.el = el} />
  }
}



class d3pie {

  constructor(el) {
    this.svg = d3.select(el)
  }

  render(data, settings) {

    let { width, height,
      margintop, marginbottom, marginright, marginleft,
      color, radius,
      outerRadius, innerRadius,
      gettext, getvalue, getcolor,
      onClick, AnimateTime
    }
      = settings

    let newdata = data.map(d => ({ ...d, text: gettext(d), value: getvalue(d), _color: getcolor(d), }))
    let defaultcolor = d3.scaleOrdinal(d3.schemeCategory20)
    let arc = d3.arc()
      .outerRadius(radius * outerRadius)
      .innerRadius(radius * innerRadius),
      pie = d3.pie()
        .sort(null)
        .value(d => d.value)
    let g = this.svg
      .attr('width', width + marginleft + marginright)
      .attr('height', height + margintop + marginbottom)
      .append('g')
      .attr('transform', `translate(  ${(width + marginright + marginleft) / 2} , ${(height + margintop + marginbottom) / 2} )`)

    let group = g.selectAll(".arc")
      .data(pie(newdata))
      .enter().append("g")
      .attr('cursor', 'pointer')
      .on('click', legendMouseClick)

    let gpath = group
      .append("path")
      .attr('class', 'gpath')
      .attr('stroke-width', 1)
      .attr('stroke', '#fff')
    gpath
      .transition("init")
      .duration(AnimateTime)
      .attrTween('d', d => {
        let start = {
          endAngle: d.startAngle
        };
        let interpolate_d = d3.interpolate(start, d);
        return t => arc(interpolate_d(t))
      })
      .attr("fill", d => color[d.data._color] ? color[d.data._color] : defaultcolor(d.data._color))


    let text = group.append("text")
      .attr('class', 'textval')
      .attr("transform", d => `translate( ${arc.centroid(d)} )`)
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .text(d => d.data.value)
      .style('font-size', 0)
      .transition()
      .duration(AnimateTime)
      .style('font-size', '14px')

    let legend = group.append('g')
      .attr('cursor', 'pointer')
    let legendrect = legend.append('rect')

      .attr('width', 15)
      .attr('height', 15)
      .attr('transform', (d, i) => { return `translate( ${radius} , ${30 * i - radius})` })
      .attr("fill", d => color[d.data._color] ? color[d.data._color] : defaultcolor(d.data._color))


    let legendtext = legend.append('text')
      .attr('fill', '#000')
      .text(d => d.data.text)
      .attr('transform', (d, i) => { return `translate( ${radius + 20} , ${30 * i - radius + 15})` })

    gpath
      .on('mouseover', legendMouseOver)
    // .on('mouseout', legendMouseOut)

    function legendMouseClick(d) {
      group.selectAll('.gpath')
        .attr('stroke', '#fff')
        .attr("stroke-width", `1px`)
      group.selectAll('rect')
        .attr("stroke", `#fff`)
      let item = d3.select(this)
      item.select('path')
        .attr("stroke", `#000`)
        .attr("stroke-width", `2px`)
      item.select('rect')
        .attr("stroke", `#000`)
      onClick(d.data)
    }
    function legendMouseOver(d, i) {
      group.selectAll('rect')
        .attr("stroke", `#fff`)
      group.selectAll('.gpath')
        .transition("legendMouseOut")
        .duration(500)
        .attr("transform", d => `translate( 0,0 )`)
      group.selectAll('.textval')
        .transition("legendMouseOut")
        .duration(500)
        .attr("transform", d => `translate( ${arc.centroid(d)} )`)
      let item = d3.select(this.parentNode)
      item.select('rect')
        .attr("stroke", `#000`)
      item.select('path')
        .transition("legendMouseOut")
        .duration(500)
        .delay(250)
        .attr("transform", `translate( ${arc.centroid(d)[0] * .2},${arc.centroid(d)[1] * .2} )`)

      item.select('.textval')
        .transition("legendMouseOut")
        .duration(500)
        .delay(250)
        .attr("transform", `translate( ${arc.centroid(d)[0] * 1.2},${arc.centroid(d)[1] * 1.2} )`)

    }
    function legendMouseOut(d, i) {
      group.selectAll('rect')
        .attr("stroke", `#fff`)
      group.selectAll('.gpath')
        .transition("legendMouseOut")
        .duration(500)
        .attr("transform", d => `translate( 0,0 )`)
      group.selectAll('.textval')
        .transition("legendMouseOut")
        .duration(500)
        .attr("transform", d => `translate( ${arc.centroid(d)} )`)
    }
  }
}



export default Piechart;