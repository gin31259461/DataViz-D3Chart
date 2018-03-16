import React, { Component, } from 'react'
import * as d3 from 'd3'
import "d3-selection-multi";
import PropTypes from 'prop-types'

class BarchartGroup extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    /** 資料*/
    data: PropTypes.array.isRequired,
    /** SVG 的寬度*/
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
    /** X軸的取資料函式 */
    getX: PropTypes.func,
    /** X軸 text 的屬性 */
    Xaxisattrs: PropTypes.object,
     /** X軸的間隔  ( 0 - 1 )*/
     Xpadding: PropTypes.number,
     /** 每個X軸群集的 資料 key 值 */
     Xgroup:PropTypes.arrayOf(PropTypes.string),
    /** Y軸的單位 */
    YaxisText: PropTypes.string,
   
    /** 給定 Xgroup 的對應顏色陣列 或者d3 顏色函式 */
    color: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    /** 是否呈現數值提示 */
    showtip: PropTypes.bool,
  
    /** 是否呈現網格*/
    showgrid: PropTypes.bool,
    /** 圖表是否上升動畫 */
    barAnimate: PropTypes.bool,
    /** 圖表上升動畫時間 */
    barAnimateTime: PropTypes.number,
    /** 長條圖點擊時觸發事件  */
    onClick: PropTypes.func,
    /** 圖例點擊動畫是否啟動 */
    legendClick:PropTypes.bool,
  }
  static defaultProps = {
    width: 500,
    height: 200,
    margintop: 50,
    marginbottom: 30,
    marginright: 150,
    marginleft: 40,
    getX: (d) => d.text,
    Xgroup: ['groupA', "groupB"],
    Xaxisattrs: {},
    YaxisText: '$',
    Xpadding: .1,
    color: d3.scaleOrdinal(d3.schemeCategory20),
    showgrid: true,
    showtip: true,
    barAnimate: true,
    legendClick: true,
    barAnimateTime: 1000,
    onClick: (d, i) => { },

  }
  componentDidMount() {
    const { data, ...settings } = this.props
    var el = this.el,
      bar = new d3bar(el)
    bar.render(data, settings)
  }
  render() {
    return <svg ref={(el) => this.el = el} />
  }
}

class d3bar {
  constructor(el) {
    this.svg = d3.select(el)
  }

  render(data, settings) {
    let { width, height,
      margintop, marginbottom, marginright, marginleft,
      getX,  Xpadding, YaxisText, Xgroup, Xaxisattrs,
      showgrid, showtip,
      color,
      barAnimate, barAnimateTime, legendClick,
      onClick
    } = settings

    let x = d3.scaleBand().rangeRound([0, width]).padding(Xpadding),
      x1 = d3.scaleBand().paddingInner(0.05),
      y = d3.scaleLinear().rangeRound([height, 0])

    x.domain(data.map((d) => getX(d)))
    let keys = Xgroup
    x1.domain(keys).rangeRound([0, x.bandwidth()])
    y.domain([0, d3.max(data, d => d3.max(keys, k => d[k]) * 1.2)])


    let g = this.svg
      .attr('width', width + marginleft + marginright)
      .attr('height', height + margintop + marginbottom)
      .append('g')
      .attr('transform', `translate( ${marginleft} , ${margintop} )`)

    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + (height) + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attrs(Xaxisattrs)
    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .attr('font-weight', 'bold')
      .attr('fill', 'rgba(0,0,0,1)')
      .text(YaxisText);
    if (showgrid) {
      let grid = g.append('g')
      grid
        .append("g")
        .call(d3.axisLeft(y)
          .tickSize(-width)
          .tickFormat("")
        )
        .attr("stroke-opacity", 0.3)
        .attr("stroke-width", 1)
        .attr("shape-rendering", "crispEdges")
        .select('path')
        .attr("stroke-width", 0)
    }
    let group = g.append("g")
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", d => `translate(${x(getX(d))},0)`)
      .on('click',onClick)
    let rect = group
      .selectAll("rect")
      .data(d => keys.map(key => { return { key: key, value: d[key] } }))
      .enter()
      .append("rect")
      .attr("x", d => x1(d.key))
      .attr("width", x1.bandwidth())
      .attr("y", height)
      .attr("height", 0)
      .attr('fill', 'rgba(255,0,0,0)')
    rect
      .transition()
      .duration(barAnimateTime)
      .attr("y", d => y(d.value))
      .attr("height", d => height - y(d.value))
      .attr("fill", (d, i) => Array.isArray(color) ? color[i % color.length] : color(d.key))



    let legend = g.append('g')
      .selectAll("g")
      .data([...keys, 'all'])
      .enter()
      .append('g')
    let legendrect = legend.append('rect')
      .attr('width', 15)
      .attr('height', 15)
      .attr('transform', (d, i) => { return `translate( ${width} , ${30 * i})` })
      .style("fill", (d, i) => Array.isArray(color) ? color[i % color.length] : color(d))
    let legendtext = legend.append('text')
      .attr('fill', '#000')
      .text(d => d)
      .attr('transform', (d, i) => { return `translate( ${width + 20} , ${30 * i + 15})` })

    if (legendClick) {
      legend.attr('cursor', 'pointer').on('mouseover', legendMouseOver)
        .on("mouseout", legendMouseOut)
        .on('click', legendclick)

      function legendclick(item, i) {
        if (item === 'all') {
          rect.transition()
            .duration(barAnimateTime)
            .attr("x", d => x1(d.key))
            .attr("width", x1.bandwidth())
            .attr("y", d => y(d.value))
            .attr("height", d => height - y(d.value))
            .attr("fill", (d, i) => Array.isArray(color) ? color[i % color.length] : color(d.key))
        }
        else {
          rect.transition()
            .duration(barAnimateTime)
            .attr("y", d => d.key == item ? y(d.value) : height)
            .attr("height", d => d.key == item ? height - y(d.value) : 0)
            .attr('fill', (d, i) => d.key == item ? Array.isArray(color) ? color[i % color.length] : color(d.key) : 'rgba(255,0,0,0)')

          rect.transition().delay(barAnimateTime)
            .duration(barAnimateTime)
            .attr("x", d => d.key == item ? x1(keys[0]) : x1(d.key))
            .attr("width", (d, i) => d.key == item ?x.bandwidth(): x1.bandwidth())
        }

      }

      function legendMouseOver() {
        let item = d3.select(this)
        item.select('text')
          .attr('fill', '#f00')
      }
      function legendMouseOut() {
        let item = d3.select(this)
        item.select('text')
          .attr('fill', '#000')

      }
    }


  }

}



export default BarchartGroup;