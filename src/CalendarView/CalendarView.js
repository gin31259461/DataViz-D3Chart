import React, { Component, } from 'react'
import * as d3 from 'd3'
import "d3-selection-multi";
import PropTypes from 'prop-types'

class CalendarView extends Component {
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
    /** 時間parse 的格式  
   * 
   * [連結](https://github.com/d3/d3-time-format#locale_format)
   * */
    timeParse: PropTypes.string,
    /** 資料的年分 */
    year: PropTypes.number,
    /** 圖表的標題 */
    title: PropTypes.string,
    /** 顏色的原始資料範圍 */
    colordomain: PropTypes.arrayOf(PropTypes.number),
    /** 顏色的對應值 */
    colorrange: PropTypes.objectOf(PropTypes.string),
    /** 是否顯示月份 */
    showmonth: PropTypes.bool,
    /** 是否顯示圖例 */
    showlegend:PropTypes.bool,
    /** 月份在圖表高度的對應位置 */
    monthpos: PropTypes.number,
    /** 取出日期欄位函式 */
    getdate:  PropTypes.func,
    /** 取出數值欄位的函式 */
     getvalue: PropTypes.func,
     /** 取出提示字欄位的函式 */
    gettip: PropTypes.func,
    /** 時間後觸發事件 */
    onClick: PropTypes.func,
    /** 動畫時間 (ms) */
     AnimateTime: PropTypes.number,
  }
  static defaultProps = {
    width: 800,
    height: 200,
    margintop: 50,
    marginbottom: 30,
    marginright: 50,
    marginleft: 40,
    year:2018,
    title: '2018',
    dateParse: "%Y-%m-%d",
    colordomain: [1, 30],
    colorrange: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837"],
    showmonth: true,
    showlegend: true,
    monthpos: 1,
    getdate: (d) => d.date,
    getvalue: (d) => d.count,
    gettip: (d) => `${d.date} : ${d.count}`,
    onClick: (d, i) => { },
    AnimateTime: 1000
  }
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { data, ...settings } = this.props
    let el = this.el,
      line = new d3Calendar(el)
    line.render(data, settings)
  }
  render() {
    return <svg ref={(el) => this.el = el} />
  }
}

class d3Calendar {

  constructor(el) {
    this.svg = d3.select(el)
  }

  render(data, settings) {
    let {
      width, height,
      margintop, marginbottom, marginright, marginleft,
      title,year,
      colordomain, colorrange,
      getdate, getvalue, gettip,
      showmonth, monthpos, showlegend,
      dateParse,
      onClick, AnimateTime
    } = settings
    let color = d3.scaleQuantize()
      .domain(colordomain)
      .range(colorrange);
    let cellSize = width / 52, monthformat = d3.timeFormat(" %m 月")
    data.map((d) => {
      d._date = getdate(d),
        d._count = getvalue(d)
    })

    let tmp = d3.nest()
      .key((d) => d._date)
      .object(data)
    let g = this.svg
      .attr('width', width + marginleft + marginright)
      .attr('height', height + margintop + marginbottom)
      .append('g')
      .attr('transform', `translate( ${marginleft} , ${margintop} )`)

    g.append('text')
      .text(title)
      .attr('fill', '#000')
      .attr('font-size', 24)
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'middle')
      .attr('transform', `translate( ${width / 2} , ${-10} )`)
    let rect = g.selectAll("rect")
      .data(d3.timeDays(new Date(year, 0, 1), new Date(year + 1, 0, 1)))
      .enter().append("rect")
      .attr("width", cellSize)
      .attr("height", cellSize)
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("x", (d) => d3.timeWeek.count(d3.timeYear(d), d) * cellSize)
      .attr("y", (d) => d.getDay() * cellSize)
      .datum(d3.timeFormat(dateParse));


    let monthg = g.append("g")
      .attr("fill", "none")
      .attr("stroke", "#000")
      .selectAll("path")
      .data(d3.timeMonths(new Date(year, 0, 1), new Date(year + 1, 0, 1)))
      .enter()

    monthg.append("path")
      .attr("d", pathMonth)
    if (showmonth) {
      monthg.append('text')
        .attr('text-anchor', 'middle')
        .attr('transform', d => {
          let w0 = d3.timeWeek.count(d3.timeYear(d), d),
            t1 = new Date(d.getFullYear(), d.getMonth() + 1, 0),
            w1 = d3.timeWeek.count(d3.timeYear(t1), t1);
          return `translate( ${w0 * cellSize + 2.5 * cellSize} , ${cellSize * 8 * monthpos} )`
        })
        .text((d) => monthformat(d))
    }

    let rectfiter = rect.filter((d) => d in tmp)
      .on('click', (d, i) => onClick(tmp[d][0], i)).attr('cursor', 'pointer')
      .on("mouseover", function () { d3.select(this).attr('stroke', '#f00').attr('stroke-width', 3) })
      .on("mouseout", function () { d3.select(this).attr('stroke', '#ccc').attr('stroke-width', 1) })
      .attr("width", 0)
    rectfiter
      .transition()
      .duration(AnimateTime)
      .attr("width", cellSize)
      .attr("fill", (d) => color(tmp[d][0]._count))
    rectfiter
      .append("title")
      .text((d) => gettip(tmp[d][0]))

    if (showlegend) {
      let colorset = new Set()
      colorrange.map((d) => colorset.add(parseInt(color.invertExtent(d)[1])))
      let colorlen = [...colorset].length
      let colort = 500 / colorlen
      let legend = g.append('g')
        .selectAll("g")
        .data([...colorset])
        .enter()
        .append('g')
      let legendrect = legend
        .append('rect')
        .transition()
        .delay(AnimateTime - 500)
        .attr('transform', (d, i) => { return `translate( ${30 * i} , ${cellSize * 8.5})` })
        .attr('fill', 'rgba(0,0,0,0)')
        .attr('width', 0)
        .transition()
        .delay((d, i) => colort * i)
        .duration(colort)
        .attr('width', 30)
        .attr('height', 10)
        .style("fill", (d, i) => color(d))

      let legendtext = legend
        .append('text')
        .transition()
        .delay(AnimateTime - 500)
        .attr('text-anchor', 'middle')
        .attr('font-size', 10)
        .attr('transform', (d, i) => { return `translate( ${30 * (i + 1)} , ${cellSize * 10})` })
        .attr('fill', 'rgba(0,0,0,0)')
        .transition()
        .delay((d, i) => colort * i)
        .duration(colort)
        .attr('fill', '#000')
        .text(d => d)

    }

    function pathMonth(t0) {
      let t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
        d0 = t0.getDay(),
        w0 = d3.timeWeek.count(d3.timeYear(t0), t0),
        d1 = t1.getDay(),
        w1 = d3.timeWeek.count(d3.timeYear(t1), t1);
      return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
        + "H" + w0 * cellSize + "V" + 7 * cellSize
        + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
        + "H" + (w1 + 1) * cellSize + "V" + 0
        + "H" + (w0 + 1) * cellSize + "Z";
    }
  }
}



export default CalendarView;