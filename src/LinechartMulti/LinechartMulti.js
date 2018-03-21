import React, { Component, } from 'react'
import * as d3 from 'd3'
import PropTypes from 'prop-types'
class LinechartMulti extends Component {
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
        ]), /** 時間parse 的格式  
        * 
        * [連結](https://github.com/d3/d3-time-format#locale_format)
        * */
        timeParse: PropTypes.string,
        /** 時間呈現的格式  
         * 
         * [連結](https://github.com/d3/d3-time-format#locale_format)
         * */
        timeformat: PropTypes.string,
        /** 每個提示線 的 callback */
        click: PropTypes.func,
        /** 線的動畫時間 (ms)*/
        lineAnimateTime: PropTypes.number,
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
        click: (d, i) => { },

        lineAnimateTime: 1000,

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
            color, lineAnimateTime,
            click, tiptext
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
                .x(d => x(d.X))
                .y(d => y(d.Y))
        x.domain(d3.extent(data, d => d._X))
        y.domain([0, d3.max(data, d => d3.max(keys, k => d[k]) * 1.2)])
        let newdata = keys.map(k => { return { id: k, value: data.map(d => { return { X: d._X, Y: d[k], K: k } }) } })
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



        let lines = g.selectAll('.lines')
            .data(newdata)
            .enter()
            .append('g')
        lines
            .append("path")
            .attr("fill", "none")
            .attr("stroke", (d, i) => Array.isArray(color) ? color[i % color.length] : color(d.id))
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr('d', d => line(d.value))
            .call(transition)
        function transition(path) {
            path.transition()
                .ease(d3.easeLinear)
                .duration(lineAnimateTime)
                .attrTween("stroke-dasharray", tweenDash);
        }
        function tweenDash() {
            var l = this.getTotalLength(),
                i = d3.interpolateString("0," + l, l + "," + l);
            return function (t) { return i(t); };
        }


        let tip = g.append('g').selectAll('.tipline')
            .data(data)
            .enter()
            .append('g')


        tip.append('line')
            .attr("x1", d => x(d._X))
            .attr("y1", d => 0)
            .attr("x2", d => x(d._X))
            .attr("y2", height)
            .attr("stroke-width", 2.5)
            .attr('stroke', 'rgba(0,0,0,0)')
            .on('mouseover', tipMouseOver)
            .on("mouseout", tipMouseOut)
            .on('click', click)
            .attr('cursor', 'pointer')


        tip.append('text')
            .text(tiptext)
            .attr("text-anchor", d => x(d._X) < width / 2 ? "start" : "end")
            .attr("font-size", 14)
            .attr('fill', 'rgba(0,0,0,0)')
            .attr('font-weight', 'bold')
            .attr('dy', '1em')
            .attr('dx', d => x(d._X) < width / 2 ? "0.3em" : '-0.3em')
            .attr('transform', d => `translate(${x(d._X)},0)`)
        let circles = lines
            .selectAll('circle')
            .data(d => d.value)
            .enter()
        circles
            .append('circle')
            .attr('cx', d => x(d.X))
            .attr('cy', d => y(d.Y))
            .attr("stroke", (d, i) => Array.isArray(color) ? color[i % color.length] : color(d.K))
            .attr("stroke-width", 1.5)
            .attr('r', 5)
            .attr('fill', '#fff')

        let legend = g.append('g')
            .selectAll("g")
            .data(keys)
            .enter()
            .append('g')
        let legendrect = legend.append('rect')
            .attr('transform', (d, i) => { return `translate( ${width + 10} , ${30 * i})` })
            .attr('fill', 'rgba(0,0,0,0)')
            .transition()
            .delay(lineAnimateTime)
            .duration(500)
            .attr('width', 15)
            .attr('height', 15)
            .style("fill", (d, i) => Array.isArray(color) ? color[i % color.length] : color(d))

        let legendtext = legend.append('text')
            .attr('transform', (d, i) => { return `translate( ${width + 30} , ${30 * i + 15})` })
            .attr('fill', 'rgba(0,0,0,0)')
            .transition()
            .delay(lineAnimateTime)
            .duration(500)
            .attr('fill', '#000')
            .text(d => d)

        legend.attr('cursor', 'default')
            .on('mouseover', legendMouseOver)
            .on("mouseout", legendMouseOut)

        function tipMouseOver(d, i) {
            tip.select('line')
                .transition()
                .duration(100)
                .attr("stroke", ({ _X }) => _X == d._X ? '#888' : 'rgba(0,0,0,0)')
            tip.select('text')
                .transition()
                .duration(100)
                .attr("fill", ({ _X }) => _X == d._X ? '#888' : 'rgba(0,0,0,0)')

        }
        function tipMouseOut(d, i) {
            tip.select('line')
                .transition()
                .duration(100)
                .attr("stroke", 'rgba(0,0,0,0)')
            tip.select('text')
                .transition()
                .duration(100)
                .attr("fill", 'rgba(0,0,0,0)')


        }



        function legendMouseOver(key, i) {

            legend.select('text')
                .transition()
                .duration(500)
                .attr('fill', (d, i) => d == key ? '#f00' : '#000')
            lines.select("path").transition()
                .duration(500)
                .attr("stroke", (d, i) => d.id == key ? Array.isArray(color) ? color[i % color.length] : color(d.id) : 'rgba(0,0,0,0)')

            circles.selectAll("circle").transition()
                .duration(500)
                .attr("r", (d, i) => d.K == key ? 5 : 0)
        }

        function legendMouseOut() {
            legend.select('text')
                .transition()
                .duration(500)
                .attr('fill', (d, i) => '#000')
            lines.select("path").transition()
                .duration(500)
                .attr("stroke", (d, i) => Array.isArray(color) ? color[i % color.length] : color(d.id))
            circles.selectAll("circle").transition()
                .duration(500)
                .attr("r", 5)
        }
    }
}



export default LinechartMulti;