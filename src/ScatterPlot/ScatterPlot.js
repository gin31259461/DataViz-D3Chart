import React, { Component, } from 'react'
import * as d3 from 'd3'
import PropTypes from 'prop-types'
class ScatterPlot extends Component {
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
        /** 提示字的取資料函式 */
        gettip: PropTypes.func,
        /** X軸的單位 */
        XaxisText: PropTypes.string,
        /** Y軸的單位 */
        YaxisText: PropTypes.string,
        /** 圓的顏色軸的單位 */
        color: PropTypes.string,
        /**  圓的大小*/
        size: PropTypes.string,
        /** 是否呈現網格*/
        showgrid: PropTypes.bool,
        /** 動畫時間 (ms)*/
        AnimateTime: PropTypes.number,
        /** 點擊圓觸發事件*/
        onClick: PropTypes.func,

    }
    static defaultProps = {
        width: 500,
        height: 200,
        margintop: 50,
        marginbottom: 30,
        marginright: 50,
        marginleft: 40,
        getX: (d) => d.X,
        getY: (d) => d.Y,
        gettip: (d) => `( ${d._X} , ${d._Y} )`,
        XaxisText: 'km/s',
        YaxisText: '$',
        color: '#1f77b4',
        size: 5,
        showgrid: true,
        AnimateTime: 1000,
        onClick: (d, i) => { }

    }
    componentDidMount() {
        const { data, ...settings } = this.props
        var el = this.el,
            plot = new d3plot(el)
        plot.render(data, settings)
    }
    render() {
        return <svg ref={(el) => this.el = el} />
    }
}

class d3plot {

    constructor(el) {
        this.svg = d3.select(el)
    }

    render(data, settings) {
        let {
            width, height,
            margintop, marginbottom, marginright, marginleft,
            getX, getY, gettip,
            XaxisText, YaxisText,
            color,size,
            showgrid, showtip,
            onClick,
            AnimateTime
        } = settings

        let x = d3.scaleLinear().rangeRound([0, width]),
            y = d3.scaleLinear().rangeRound([height, 0])
        data = data.map(d => ({
            ...d,
            _X: getX(d),
            _Y: getY(d),
        })
        )
        x.domain([0, d3.max(data, function (d) { return d._X * 1.05; })])
        y.domain([0, d3.max(data, function (d) { return d._Y * 1.05; })])

        let g = this.svg
            .attr('width', width + marginleft + marginright)
            .attr('height', height + margintop + marginbottom)
            .append('g')
            .attr('transform', `translate( ${marginleft} , ${margintop} )`)

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + (height) + ")")
            .call(d3.axisBottom(x))
            .append("text")
            .attr("x", width)
            .attr("dy", "-.71em")
            .style("text-anchor", "end")
            .attr('font-weight', 'bold')
            .attr('fill', 'rgba(0,0,0,1)')
            .text(XaxisText);

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
                .attr("stroke-opacity", 0.2)
                .attr("stroke-width", 1)
                .attr("shape-rendering", "crispEdges")
                .select('path')
                .attr("stroke-width", 0)

            grid
                .append("g")
                .call(d3.axisBottom(x)
                    .tickSize(height)
                    .tickFormat("")
                )
                .attr("stroke-opacity", 0.2)
                .attr("stroke-width", 1)
                .attr("shape-rendering", "crispEdges")
                .select('path')
                .attr("stroke-width", 0)


        }

        let group = g.selectAll("group")
            .data(data)
            .enter()
            .append('g')
            .on('mouseover', tipMouseOver)
            .on("mouseout", tipMouseOut)
            .on('click', onClick)
            .attr('cursor', 'pointer')
        group.append("circle")
            .attr("class", "circle")
            .attr("cx", d => x(d._X))
            .attr("cy", d => y(d._Y))
            .attr("stroke", 'rgba(255,255,255,0)')
            .attr("fill", 'rgba(255,255,255,0)')
            .transition()
            .delay(d => Math.random() * AnimateTime)
            .duration(AnimateTime)
            .attr("r", size)
            .attr("stroke", '#000')
            .attr("fill", color)


        group.append('text')
            .text(gettip)
            .attr("font-size", 0)
            .attr('fill', 'rgba(0,0,0,0)')
            .attr('font-weight', 'bold')
            .attr('dx', '0.3em')
            .attr('dy', '-1em')
            .attr('transform', d => `translate(${x(d._X)},${y(d._Y)})`)
        function tipMouseOver() {
            let item = d3.select(this)
            item.select('text')
                .transition()
                .duration(500)
                .attr("font-size", 10)
                .attr('fill', 'rgba(0,0,0,1)')
        }
        function tipMouseOut() {
            let item = d3.select(this)
            item.select('text')

                .transition()
                .duration(500)
                .attr("font-size", 0)
                .attr('fill', 'rgba(0,0,0,0)')
        }


    }

}



export default ScatterPlot;