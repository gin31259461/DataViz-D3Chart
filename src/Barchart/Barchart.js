import React, { Component, } from 'react'
import * as d3 from 'd3'
import PropTypes from 'prop-types'
class Barchart extends Component {
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
        /** Y軸的取資料函式 */
        getY: PropTypes.func,
        /** Y軸的單位 */
        YaxisText:PropTypes.string,
        /** X軸的間隔  ( 0 - 1 )*/
        Xpadding: PropTypes.number,
        /** 給定分類資料的對應顏色陣列 或者d3 顏色函式 */
        color: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.arrayOf(PropTypes.string),
        ]),
        /** 是否呈現數值提示 */
        showtip: PropTypes.bool,
        /** 提示的取資料函式 */
        gettip: PropTypes.func,
        /** 是否呈現網格*/
        showgrid: PropTypes.bool,
        /** 圖表是否上升動畫 */
        barAnimate: PropTypes.bool,
        /** 圖表上升動畫時間 */
        barAnimateTime: PropTypes.number,
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
        getX: (d) => d.text,
        getY: (d) => d.count,
        gettip: (d) => d.count,
        YaxisText:'$',
        Xpadding: .3,
        color: d3.scaleOrdinal(d3.schemeCategory20),
        showgrid: true,
        showtip: true,
        barAnimate: true,
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
            getX, getY, gettip, Xpadding,YaxisText,
            showgrid, showtip,
            color,
            barAnimate, barAnimateTime,
            onClick
        } = settings

        data.map(
            d => {
                d.X = getX(d)
                d.Y = getY(d)
            }
        )
        let x = d3.scaleBand().rangeRound([0, width]).padding(Xpadding),
            y = d3.scaleLinear().rangeRound([height, 0])

        x.domain(data.map(d => d.X))
        y.domain([0, d3.max(data, d => d.Y * 1.05)])

        let g = this.svg
            .attr('width', width + marginleft + marginright)
            .attr('height', height + margintop + marginbottom)
            .append('g')
            .attr('transform', `translate( ${marginleft} , ${margintop} )`)

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + (height) + ")")
            .call(d3.axisBottom(x))
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

        let bar = g.selectAll(".bar")
            .data(data)
            .enter()
            .append('g')
        let rect = bar.append("rect")
            .style('cursor', 'pointer')
            .attr("class", "bar")
            .attr("x", d => x(d.X))
            .attr("width", x.bandwidth())
        if (barAnimate) {
            rect.attr("y", d => height)
                .attr("height", 0)
                .attr("fill", 'rgba(0,0,0,0)')
                .on('click', onClick)
                .transition()
                .duration(barAnimateTime)
                .attr("y", d => y(d.Y))
                .attr("height", d => height - y(d.Y))
                .attr("fill", (d ,i)=> Array.isArray(color)?color[i% color.length]:color(i))
        }
        else {
            rect.attr("y", d => y(d.Y))
                .attr("height", d => height - y(d.Y))
                .attr("fill", (d ,i)=> Array.isArray(color)?color[i% color.length]:color(i))
        }
        if (showtip) {
            bar.append('text')
                .text(gettip)
                .attr("text-anchor", "middle")
                .attr("font-size", 14)
                .attr('fill', 'rgba(255,0,0,0)')
                .attr('font-weight', 'bold')
                .attr('dy', '-0.3em')
                .attr('transform', d => `translate(${x(d.X) + x.bandwidth() / 2},${y(d.Y)})`)
            bar.on('mouseover', function () {
                let item = d3.select(this)
                item.select('text')
                    .transition()
                    .duration(500)
                    .attr('fill', 'rgba(0,0,0,1)')
            })
                .on("mouseout", function () {
                    ''
                    let item = d3.select(this)
                    item.select('text')
                        .transition()
                        .duration(500)
                        .attr("fill", 'rgba(0,0,0,0)')
                })
        }


    }

}



export default Barchart;