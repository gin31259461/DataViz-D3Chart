import React, { Component, } from 'react'
import * as d3 from 'd3'
import PropTypes from 'prop-types'
class Bubblechart extends Component {
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
        /** 取文字資料的函式 */
        getname: PropTypes.func,
        /** 取關於大小資料的函式 */
        getvalue: PropTypes.func,
        /** 取區分顏色資料的函式 */
        getcolor: PropTypes.func,
        /** 取提示資料的函式 */
        gettip: PropTypes.func,
        /** 是否顯示提示字 */
        showtip: PropTypes.bool,
        /** 是否顯示圖例 */
        showlegend: PropTypes.bool,
        /** 圓與圓的距離 */
        padding:PropTypes.number,
        /** 圓的顏色的對應物件 */
        color: PropTypes.object,
        /** 動畫時間 (ms) */
        AnimateTime:PropTypes.number,
        /** 圖表點擊時觸發事件 */
        onClick: PropTypes.func,
    }
    static defaultProps = {
        width: 500,
        height: 200,
        margintop: 50,
        marginbottom: 30,
        marginright: 50,
        marginleft: 40,
        getname: (d) => d.name,
        getvalue: (d) => d.value,
        getcolor: (d) => d.color,
        gettip: (d) => d.value,
        padding: 1,
        color: {},
        showtip: true,
        showlegend: true,
        AnimateTime: 1000,
        onClick: (d, i) => { },

    }
    componentDidMount() {
        const { data, ...settings } = this.props
        let el = this.el;
        let bubble = new d3bubble(el)
        bubble.render(data, settings)
    }
    render() {
        return <svg ref={(el) => this.el = el} />
    }
}

class d3bubble {

    constructor(el) {
        this.svg = d3.select(el)
    }

    render(data, settings) {

        let { width, height,
            margintop, marginbottom, marginright, marginleft,
            getname, getvalue, getcolor, gettip, padding,
            color, showlegend, showtip,
            AnimateTime,
            onClick
        } = settings

        let defaultcolor = d3.scaleOrdinal(d3.schemeCategory20)
        let keys = []
        data.map((d) => {
            d._name = getname(d),
                d._value = getvalue(d),
                d._color = getcolor(d)
            if (keys.indexOf(getcolor(d)) == -1) {
                keys.push(getcolor(d))
            }

        })
        let pack = d3.pack().padding(padding).size([width, height])
        let dataobj = d3.hierarchy({ children: data }).sum(function (d) { return d._value; }).sort((a, b) => b.value - a.value)
        let g = this.svg
            .attr('width', width + marginleft + marginright)
            .attr('height', height + margintop + marginbottom)
            .append('g')
            .attr('transform', `translate( ${marginleft} , ${margintop} )`)

        var node = g.selectAll(".node")
            .data(pack(dataobj).leaves())
            .enter().append("g")
            .attr("transform", (d) => `translate( ${d.x},${d.y} )`)
            .on('click', (d) => onClick(d.data))
        node.append("circle")

            .transition()
            .delay((d, i) => AnimateTime * i / data.length)
            .duration(AnimateTime)
            .attr("r", (d) => d.r)
            .style("fill", d => color[d.data._color] ? color[d.data._color] : defaultcolor(d.data._color))

        node.append("text")
            .style("text-anchor", "middle")
            .attr('font-weight', 'bold')
            .attr('fill', 'rgba(0,0,0,1)')
            .attr('dy', '0.3em')
            .attr('font-size', 0)
            .text((d) => d.data._name)
            .transition()
            .delay((d, i) => AnimateTime * i / data.length)
            .duration(AnimateTime)
            .attr('font-size', (d) => `${d.r * 3 / (d.data._name.length)}px`)

        if (showtip) {
            node.append("title")
                .text(d => gettip(d.data));
        }
        if (showlegend) {
            let legend = g.append('g')
                .selectAll("g")
                .data([...keys])
                .enter()
                .append('g')
            let legendrect = legend.append('rect')
                .attr('width', 0)
                .attr('height', 15)
                .attr('transform', (d, i) => { return `translate( ${width + 10} , ${30 * i})` })
                .style("fill", d => color[d] ? color[d] : defaultcolor(d))
                .transition()
                .delay(AnimateTime)
                .duration(500)
                .attr('width', 15)

            let legendtext = legend.append('text')
                .attr('fill', 'rgba(0,0,0,0)')
                .text(d => d)
                .attr('transform', (d, i) => { return `translate( ${width + 30} , ${30 * i + 15})` })
                .transition()
                .delay(AnimateTime)
                .duration(500)
                .attr('fill', '#000')
        }
    }

}



export default Bubblechart;