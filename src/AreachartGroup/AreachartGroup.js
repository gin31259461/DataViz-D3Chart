import React, { Component, } from 'react'
import * as d3 from 'd3'
import PropTypes from 'prop-types'
class AreachartGroup extends Component {
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
        /** 提示字的取資料函式 */
        tiptext: PropTypes.func,
        /** 每條線的 資料 key 值 */
        groupkey: PropTypes.arrayOf(PropTypes.string),
        /** 給定 Xgroup 的對應顏色陣列 或者d3 顏色函式 */
        color: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.arrayOf(PropTypes.string),
        ]),
        /** 是否呈現網格*/
        showgrid: PropTypes.bool,
        /** 是否呈現圖例*/
        showlegend: PropTypes.bool,
        /** 時間parse 的格式  
        * 
        * [連結](https://github.com/d3/d3-time-format#locale_format)
        * */
        timeParse: PropTypes.string,
        /** 時間呈現的格式  
         * 
         * [連結](https://github.com/d3/d3-time-format#locale_format)
         * */
        timeformat: PropTypes.string,
        /** 每個點 的觸發事件 */
        plotclick: PropTypes.func,
        /** 線的動畫時間 (ms)*/
        AnimateTime: PropTypes.number,
    }
    static defaultProps = {
        width: 500,
        height: 200,
        margintop: 50,
        marginbottom: 30,
        marginright: 50,
        marginleft: 40,
        getX: (d) => d.date,
        tiptext: (d, i) => d.date,
        groupkey: ['groupA', "groupB"],
        color: d3.scaleOrdinal(d3.schemeCategory20),
        timeParse: "%Y-%m-%d",
        timeformat: "%m-%d",
        showgrid: true,
        showlegend: true,
        plotclick: (d, i) => { },
        AnimateTime: 1000,

    }
    componentDidMount() {
        const { data, ...settings } = this.props
        var el = this.el,
            line = new d3line(el)
        line.render(data, settings)
    }
    render() {
        return <svg ref={(el) => this.el = el} />
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
            getX, groupkey,
            timeParse, timeformat,
            showgrid, showlegend,
            color, AnimateTime,
            plotclick, tiptext
        } = settings
        let parseTime = d3.timeParse(timeParse)
        data = data.map(
            d => ({
                ...d,
                _X: parseTime(getX(d)),

            })
        )
        let x = d3.scaleTime().rangeRound([0, width]),
            y = d3.scaleLinear().rangeRound([height, 0]),
            keys = groupkey,
            line = d3.line()
                .curve(d3.curveLinear)
                .x(d => x(d._X))
                .y(d => y(d._Y)),
            line2 = d3.line()
                .curve(d3.curveLinear)
                .x(d => x(d._X))
                .y(d => height),
            area = d3.area()
                .x(d => x(d._X))
                .y1(d => y(d._Y))
                .y0(height),
            area2 = d3.area()
                .x(d => x(d._X))
                .y1(height)
                .y0(height)
        x.domain(d3.extent(data, d => d._X))
        y.domain([0, d3.max(data, d => d3.max(keys, k => d[k]) * 1.2)])
        let newdata = keys.map(k => {
            let nd = []
            data.map(d => { if (d[k]) nd.push({ _X: d._X, _Y: d[k], _K: k, ...d }) })
            return { id: k, value: nd }
        })
        let g = this.svg
            .attr('width', width + marginleft + marginright)
            .attr('height', height + margintop + marginbottom)
            .append('g')
            .attr('transform', `translate( ${marginleft} , ${margintop} )`)
        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + (height) + ")")
            .call(d3.axisBottom(x).tickFormat(d3.timeFormat(timeformat)))
        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y))

        if (showgrid) {
            let grid = g.append('g')
            grid.append("g")
                .call(d3.axisLeft(y)
                    .tickSize(-width)
                    .tickFormat("")
                )
                .attr("opacity", 0.3)
                .attr("stroke-width", 1)
                .attr("shape-rendering", "crispEdges")
                .select('path')
                .attr("stroke-width", 0)
        }

        let areag = g.selectAll('.areag')
            .data(newdata)
            .enter()
            .append('g')


        let areapath = areag.append("path")
            .attr("fill", (d, i) => Array.isArray(color) ? color[i % color.length] : color(d.id))
            .style("opacity", 0.5)
            .attr('d', (d) => area2(d.value))
        areapath.transition()
            .duration(AnimateTime / 2)
            .attr('d', (d) => area(d.value))
        let linepath = areag
            .append("path")
            .attr("fill", "none")
            .attr('d', d => line(d.value))
            .call(transition)
        function transition(path) {
            path.transition()
                .ease(d3.easeLinear)
                .delay(AnimateTime / 2)
                .duration(AnimateTime)
                .attr("stroke", (d, i) => Array.isArray(color) ? color[i % color.length] : color(d.id))
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("stroke-width", 1.5)
                .attrTween("stroke-dasharray", tweenDash);
        }
        function tweenDash() {
            var l = this.getTotalLength(),
                i = d3.interpolateString("0," + l, l + "," + l);
            return function (t) { return i(t); };
        }

        let tip = areag
            .selectAll('circle')
            .data(d => d.value)
            .enter()
            .append('g')
            .on('mouseover', tipMouseOver)
            .on("mouseout", tipMouseOut)

        let circles = tip
            .append('circle')
            .attr('cx', d => x(d._X))
            .attr('cy', d => y(d._Y))
            .attr("stroke", (d, i) => Array.isArray(color) ? color[i % color.length] : color(d._K))
            .attr("stroke-width", 1.5)
            .attr('r', 5)
            .attr('fill', '#fff')
            .on('click', plotclick)
            .attr('cursor', 'pointer')
        tip.append('text')
            .text((d) => `${d._K} : ${d._Y}`)
            .attr("text-anchor", d => x(d._X) < width / 2 ? "start" : "end")
            .attr("font-size", 0)
            .attr('fill', 'rgba(0,0,0,0)')
            .attr('font-weight', 'bold')
            .attr('dy', '-0.7em')
            .attr('dx', d => x(d._X) < width / 2 ? "0.8em" : '-0.8em')
            .attr('transform', d => `translate(${x(d._X)},${y(d._Y)})`)
        function tipMouseOver(d) {
            let item = d3.select(this)
            item.select('text')
                .transition()
                .duration(800)
                .attr('fill', '#000')
                .attr("font-size", 14)

        }
        function tipMouseOut() {
            let item = d3.select(this)
            item.select('text')
                .transition()
                .duration(500)
                .attr('fill', 'rgba(0,0,0,0)')
                .attr("font-size", 0)
        }
        if (showlegend) {
            let legend = g.append('g')
                .selectAll("g")
                .data([...keys, 'all'])
                .enter()
                .append('g')
                .style("opacity", d => d == 'all' ? 1 : 0.1)
            let legendrect = legend.append('rect')
                .attr('transform', (d, i) => { return `translate( ${width + 10} , ${30 * i})` })
                .attr('fill', 'rgba(0,0,0,0)')
                .transition()
                .delay(AnimateTime)
                .duration(500)
                .attr('width', 15)
                .attr('height', 15)
                .style("fill", (d, i) => d == 'all' ? 'rgba(0,0,0,0)' : Array.isArray(color) ? color[i % color.length] : color(d))

            let legendtext = legend.append('text')
                .attr('transform', (d, i) => { return `translate( ${width + 30} , ${30 * i + 15})` })
                .attr('fill', 'rgba(0,0,0,0)')
                .transition()
                .delay(AnimateTime)
                .duration(500)
                .attr('fill', '#000')
                .text(d => d)
            legend.attr('cursor', 'pointer')
                .on('click', legendclick)

            function legendclick(item, i) {

                legend.style("opacity", 0.1)
                d3.select(this).style("opacity", 1)

                if (item === 'all') {


                    circles.transition()
                        .duration(AnimateTime / 2)
                        .attr('cy', d => y(d._Y))
                        .attr('r', 5)
                    linepath.transition()
                        .duration(AnimateTime / 2)
                        .attr('d', (d) => line(d.value))
                    areapath.transition()
                        .duration(AnimateTime / 2)
                        .attr('d', (d) => area(d.value))
                }
                else {
                    circles.transition()
                        .duration(AnimateTime / 2)
                        .attr('cy', (d) => d._K == item ? y(d._Y) : height)
                        .attr('r', (d) => d._K == item ? 5 : 0)
                    areapath.transition()
                        .duration(AnimateTime / 2)
                        .attr('d', (d) => d.id == item ? area(d.value) : area2(d.value))
                    linepath.transition()
                        .duration(AnimateTime / 2)
                        .attr('d', (d) => d.id == item ? line(d.value) : line2(d.value))

                }
            }
        }
    }
}



export default AreachartGroup;