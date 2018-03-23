import React, { Component, } from 'react'
import * as d3 from 'd3'
import PropTypes from 'prop-types'
class ScatterPlotGroup extends Component {
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
        /** 顏色的取資料函式 */
        getcolor: PropTypes.func,
        /** X軸的單位 */
        XaxisText: PropTypes.string,
        /** Y軸的單位 */
        YaxisText: PropTypes.string,
        /** 圓的顏色的對應物件 */
        color: PropTypes.object,
        /**  圓的大小*/
        size: PropTypes.number,
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
        getcolor: (d) => d.color,
        XaxisText: 'km/s',
        YaxisText: '$',
        color: { A: '#f00', B: '#ff7f0e' },
        size: 5,
        showgrid: true,
        AnimateTime: 1000,
        onClick: (d, i) => {  }

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
            getX, getY, gettip, getcolor,
            XaxisText, YaxisText,
            color, size,
            showgrid, showtip,
            onClick,
            AnimateTime
        } = settings

        let x = d3.scaleLinear().rangeRound([0, width]),
            y = d3.scaleLinear().rangeRound([height, 0]),
            defaultcolor = d3.scaleOrdinal(d3.schemeCategory20)
        let keys = []
        data = data.map(d => {
            if (keys.indexOf(getcolor(d)) == -1) {
                keys.push(getcolor(d))
            }

            return {
                ...d,
                _X: getX(d),
                _Y: getY(d),
                _color: getcolor(d),
            }
        }
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
        let circle = group.append("circle")
            .attr("class", "circle")
            .attr("cx", d => x(d._X))
            .attr("cy", d => y(d._Y))
            .attr("stroke", 'rgba(255,255,255,0)')
            .attr("fill", 'rgba(255,255,255,0)')

        circle
            .transition()
            .delay(d => Math.random() * AnimateTime)
            .duration(AnimateTime)
            .attr("r", size)
            .attr("stroke", '#000')
            .attr("fill", d => color[d._color] ? color[d._color] : defaultcolor(d._color))


        group.append('text')
            .text(gettip)
            .attr("font-size", 0)
            .attr('fill', 'rgba(0,0,0,0)')
            .attr('font-weight', 'bold')
            .attr('dx', '0.3em')
            .attr('dy', '-1em')
            .attr('transform', d => `translate(${x(d._X)},${y(d._Y)})`)

        let legend = g.append('g')
            .selectAll("g")
            .data([...keys, 'all'])
            .enter()
            .append('g')
            .style("opacity", d => d == 'all' ? 1 : 0.1)
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


        legend.attr('cursor', 'pointer')
            .on('click', legendclick)

        function legendclick(itemd, i) {
            legend.style("opacity", 0.1)
            let item = d3.select(this).style("opacity", 1)
            if (itemd == 'all') {
                circle
                    .transition()
                    .duration(500)
                    .attr('r', size)
            }
            else {
                circle
                    .transition()
                    .duration(500)
                    .attr('r', d => d._color == itemd ? size : 0)
            }
        }
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



export default ScatterPlotGroup;