import React, { Component, } from 'react'
import * as d3 from 'd3'
import cloud from 'd3-cloud'
import PropTypes from 'prop-types'
class WordCloud extends Component {
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
    /** 文字大小的原始資料的數值範圍   */
    fontSizedomain: PropTypes.arrayOf(PropTypes.number),
    /** 文字大小呈現的對應範圍     */
    fontSizerange: PropTypes.arrayOf(PropTypes.number),
    /** 取得文字資料欄位的函式 */
    gettext: PropTypes.func,
    /** 取得文字數值欄位的函式*/
    getvalue: PropTypes.func,
    /** 文字顏色原始資料的數值範圍*/
    colordomain: PropTypes.arrayOf(PropTypes.number),
    /** 文字顏色呈現的對應範圍*/
    colorrange: PropTypes.arrayOf(PropTypes.string),
    /** 給定文字旋轉的數值角度或者函式 */
    rotate:PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.func,
    ]),
    /** 給定文字邊界的數值或者函式 */
    padding: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.func,
    ]),
    /** 動畫時間 (ms)*/
    animation: PropTypes.number,
    /** 點擊文字的觸發事件*/
    onClick: PropTypes.func,
  }
  static defaultProps = {
    width: 300,
    height: 300,
    margintop: 50,
    marginbottom: 30,
    marginright: 50,
    marginleft: 40,
    fontSizedomain: [0.5, 2],
    fontSizerange: [15, 75],
    gettext: (d) => d.text,
    getvalue: (d) => d.value,
    colorrange: ['#ace', '#0f0'],
    colordomain: [15, 75],
    rotate: 0,
    padding: 2,
    animation: 1000,
    onClick: (d, i) => {  },
  }
  componentDidMount() {
    const { data, ...settings } = this.props
    let el = this.el
    this.Wordcloud = new d3wordcloud(el)
    this.Wordcloud.render(data, settings)
  }

  render() {
    return <svg ref={(el)=>this.el=el}  />
  }
}

class d3wordcloud {

  constructor(el) {
    this.svg = d3.select(el)

  }

  render(data, settings) {
    let {
      width, height,
      margintop, marginbottom, marginright, marginleft,
      fontSizedomain, fontSizerange,
      gettext, getvalue,
      colorrange, colordomain,
      rotate, padding, animation, onClick
    } = settings

    let fz_scale = d3.scaleLinear().domain(fontSizedomain).range(fontSizerange)
    this.g = this.svg
      .attr('width', width + marginleft + marginright)
      .attr('height', height + margintop + marginbottom)
      .append('g')
      .attr('transform', `translate( ${(width + marginleft + marginright) / 2} , ${(height + margintop + marginbottom) / 2} )`)


    let words_data = data.map((d) => {
      return {
        text: gettext(d),
        freq: getvalue(d),
      }
    }).sort((a, b) => getvalue(b) - getvalue(a))
    let color = d3.scaleLinear().range(colorrange).domain(colordomain)
    const layout = cloud()
      .size([width + marginleft + marginright, height + margintop + marginbottom])
      .words(words_data)
      .rotate(rotate)
      .padding(padding)
      .fontSize((d) => fz_scale(d.freq))
      .start();

    console.log(words_data)

    this.tag = this.g.selectAll('.tag').data(words_data)
    this.tag
      .enter()
      .append('text')
      .on('click', onClick)
      .attr('class', 'tag')
      .attr("text-anchor", "middle")
      .style("fill", "#FFF")
      .attr("transform", d => `translate(${width * Math.random() - width / 2}, ${height * Math.random() - height / 2})`)
      .transition()
      .duration(animation)
      .attr("transform", d => `translate(${d.x}, ${d.y})`)
      .attr('font-size', d => `${d.size}px`)
      .style("fill", (d, i) => color(d.size))
      .text(d => d.text)


  }

}



export default WordCloud;