import React, { Component, } from 'react'
import * as d3 from 'd3'
import "d3-selection-multi";
import PropTypes from 'prop-types'

class Linechart extends Component {
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
    getX:PropTypes.func,
    /** Y軸的取資料函式 */
    getY:PropTypes.func,
    /** 提示字的取資料函式 */
    tiptext:PropTypes.func,
    /** 圖表線條 path 的屬性 */
    lineattrs:PropTypes.object,
    /** 圖表線條的 path 的 CSS 樣式*/
    linestyles:PropTypes.object,
    /** 圖表圓點的 circle 的屬性*/
    plotattrs:PropTypes.object,
    /** 圖表圓點的 circle 的 CSS 樣式*/
    plotstyles:PropTypes.object,
    /** 圖表圓點的 circle hover的屬性變化 */
    plotattrs_hover:PropTypes.object,
    /** 圖表圓點的 circle hover的樣式變化 */
    plotstyles_hover:PropTypes.object,
    /** 時間parse 的格式  
     * 
     * [連結](https://github.com/d3/d3-time-format#locale_format)
     * */
    timeParse:PropTypes.string,
    /** 時間呈現的格式  
     * 
     * [連結](https://github.com/d3/d3-time-format#locale_format)
     * */
    timeformat:PropTypes.string,
    /**
     * 是否呈現網格
     */
    showgrid:PropTypes.bool,
    /**
     * 是否呈現提示字
     */
    showgridtip:PropTypes.bool,
    /**
     * 是否呈現提示線
     */
    showplottip:PropTypes.bool,
    /**
     * 點擊圓點的觸發事件
     */
    plotclick:PropTypes.func,
    /**
     * 線的動畫時間 (ms)
     */
    lineAnimateTime:PropTypes.number,
  }
  static defaultProps = {
    width: 800,
    height: 300,
    margintop: 50,
    marginbottom: 30,
    marginright: 50,
    marginleft: 40,
    getX: (d) => d.date,
    getY: (d) => d.count,
    tiptext: (d) => d.count,
    lineattrs: {},
    linestyles: {},
    plotattrs: {},
    plotstyles: {},
    plotattrs_hover: {},
    plotstyles_hover: {},
    timeParse: "%Y-%m-%d",
    timeformat: "%m-%d",
    showgrid: true,
    showgridtip: true,
    showplottip: true,
    plotclick: (d, i) => { console.log(d, i) },
    lineAnimateTime: 1000,

  }
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { data, ...settings

    } = this.props
    let el = this.refs.el,
      line = new d3line(el)
    line.render(data, settings)
  }
  render() {
    return <svg ref='el' />
  }
}

class d3line {

  constructor(el) {
    this.svg = d3.select(el)
  }

  render(data, settings) {
    let {
      width, height,
      margintop, marginbottom, marginright, marginleft,
      lineattr, linestyles,
      plotattrs, plotstyles,
      plotattrs_hover, plotstyles_hover,
      getX, getY, tiptext,
      showgridtip, showplottip, showgrid,
      timeParse, timeformat,
      lineAnimateTime,
      plotclick
    } = settings
    let parseTime = d3.timeParse(timeParse)
    data.map(
      d => {
        d.X = parseTime(getX(d))
        d.Y = getY(d)
      }
    )
    let x = d3.scaleTime().range([0, width]),
      y = d3.scaleLinear().rangeRound([height, 0]),
      line = d3.line()
        .x(d => x(d.X))
        .y(d => y(d.Y))



    x.domain(d3.extent(data, d => d.X))
    y.domain([0, d3.max(data, d => d.Y * 1.05)])

    let g = this.svg
      .attr('width', width + marginleft + marginright)
      .attr('height', height + margintop + marginbottom)
      .append('g')
      .attr('transform', `translate( ${marginleft} , ${margintop} )`)
    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + (height) + ")")
      .call(d3.axisBottom(x).ticks(10).tickFormat(d3.timeFormat(timeformat)))
    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y))
    if (showgrid) {
      let grid = g.append('g')
      grid
        .append('g')
        .call(d3.axisBottom(x)
          .tickSize(height)
          .tickFormat("")
        )
        .attr("stroke-opacity", 0.3)
        .attr("stroke-width", 1)
        .attr("shape-rendering", "crispEdges")
        .select('path')
        .attr("stroke-width", 0)

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
    let path = g
      .datum(data)
      .append("path")

      .attrs({
        'stroke': '#ace',
        'stroke-linejoin': "round",
        'stroke-linecap': "round",
        'stroke-width': 1.5,
        ...lineattr
      })
      .styles({ ...linestyles })
      .attr("fill", "none")
      .attr('d', line)
    let totalLength = path.node().getTotalLength();
    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(lineAnimateTime)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0)

    let group = g.append('g')
      .selectAll('tip')
      .data(data)
      .enter()
      .append('g')
    group.on('mouseover', gridMouseOver)
      .on("mouseout", gridMouseOut)


    if (showgridtip) {
      group
        .append('line')
        .attr('x1', d => x(d.X))
        .attr('y1', 0)
        .attr('x2', d => x(d.X))
        .attr("y2", height)
        .attr("stroke", 'rgba(0,0,0,0)')
        .attr("stroke-width", 1)
    }
    group.append('rect')
      .attr("x", d => x(d.X))
      .attr("y", d => 0)
      .attr("width", 1)
      .attr("height", height)
      .attr('fill', 'rgba(0,0,0,0)')
    if (showplottip) {
      group.append('circle')
        .attr('cx', d => x(d.X))
        .attr('cy', d => y(d.Y))
        .attrs({
          r: 5,
          fill: '#ace',
          ...plotattrs
        })
        .styles({ 'cursor': 'pointer', ...plotstyles })

        .on('click', plotclick)
    }
    group
      .append('text')
      .text(tiptext)
      .attr("text-anchor", "start")
      .attr("font-size", 14)
      .attr('fill', 'rgba(0,0,0,0)')
      .attr('font-weight', 'bold')
      .attr('dy', '1em')
      .attr('dx', '0.8em')
      .attr('transform', d => `translate(${x(d.X)},${y(d.Y)})`)
    function gridMouseOver() {
      let item = d3.select(this)
      item.select('line')
        .transition()
        .duration(100)
        .attr("stroke", '#888')
        .attr("stroke-width", 2)
      item.select('text')
        .attr('dy', '12')
        .transition()
        .duration(800)
        .attr('dy', '0')
        .attr('fill', '#f00')


      item.select('circle')
        .transition()
        .duration(800)
        .attrs({
          fill: '#f00',
          ...plotattrs_hover
        })
        .styles({
          ...plotstyles_hover
        })
    }
    function gridMouseOut() {
      let item = d3.select(this)
      item.select('line')
        .transition()
        .duration(100)
        .attr("stroke", 'rgba(0,0,0,0)')
      item.select('text')
        .transition()
        .duration(500)
        .attr('fill', 'rgba(0,0,0,0)')
      item.select('circle')
        .transition()
        .duration(800)
        .attrs({
          r: 5,
          fill: '#ace',
          ...plotattrs
        })
        .styles({ ...plotstyles })
    }
  }
}



export default Linechart;