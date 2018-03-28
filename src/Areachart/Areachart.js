import React, { Component, } from 'react'
import * as d3 from 'd3'
import PropTypes from 'prop-types'
class Areachart extends Component {
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
        tiptext: PropTypes.func,
        /** X軸的單位 */
        XaxisText: PropTypes.string,
        /** Y軸的單位 */
        YaxisText: PropTypes.string,
        /** 線的顏色 */
        pathcolor:PropTypes.string,
        /** 區塊的顏色 */
        areacolor:PropTypes.string,
        /** 圖表圓點的 circle 的屬性*/
        plotattrs: PropTypes.object,
        /** 圖表圓點的 circle 的 CSS 樣式*/
        plotstyles: PropTypes.object,
        /** 圖表圓點的 circle hover的屬性變化 */
        plotattrs_hover: PropTypes.object,
        /** 圖表圓點的 circle hover的樣式變化 */
        plotstyles_hover: PropTypes.object,
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
        /** 是否呈現網格*/
        showgrid: PropTypes.bool,
        /** 是否呈現提示點*/
        showplottip: PropTypes.bool,
        /** 點擊圓點的觸發事件 */
        plotclick: PropTypes.func,
        /** 動畫時間 (ms) */
        AnimateTime: PropTypes.number,
    }
    static defaultProps = {
        width: 500,
        height: 300,
        margintop: 50,
        marginbottom: 30,
        marginright: 50,
        marginleft: 40,
        getX: (d) => d.date,
        getY: (d) => d.count,
        tiptext: (d) => `${d.date}\n${d.count}`,
        plotattrs: {},
        plotstyles: {},
        plotattrs_hover: {},
        plotstyles_hover: {},
        XaxisText: "日",
        YaxisText: "$",
        timeParse: "%Y-%m-%d",
        timeformat: "%m-%d",
        showgrid: true,
        showplottip: true,
        pathcolor:'#ace',
        areacolor:'#a7eae2',
        plotclick: (d, i) => { console.log(d, i) },
        AnimateTime: 1000,

    }
    componentDidMount() {
        const { data, ...settings } = this.props
        let el = this.el,
            area = new d3area(el)
        area.render(data, settings)
    }
    render() {
        return <svg ref={(el) => this.el = el} />
    }
}

class d3area {

    constructor(el) {
        this.svg = d3.select(el)
    }

    render(data, settings) {
        let {
            width, height,
            margintop, marginbottom, marginright, marginleft,
            lineattr,
            plotattrs, plotstyles,
            plotattrs_hover, plotstyles_hover,
            getX, getY, tiptext,
            areacolor,pathcolor,
            showplottip, showgrid,
            timeParse, timeformat,
            XaxisText, YaxisText,
            AnimateTime,
            plotclick
        } = settings
        let x = d3.scaleTime().rangeRound([0, width]),
            y = d3.scaleLinear().rangeRound([height, 0]),
            area = d3.area()
                .x(d => x(d._X))
                .y1(d => y(d._Y))
                .y0(height),
            area2 = d3.area()
                .x(d => x(d._X))
                .y1(height)
                .y0(height),
            line = d3.line()
                .x(d => x(d._X))
                .y(d => y(d._Y))
        let parseTime = d3.timeParse(timeParse)
        data.map(
            d => {
                d._X = parseTime(getX(d))
                d._Y = getY(d)
            }
        )
        x.domain(d3.extent(data, d => d._X))
        y.domain([0, d3.max(data, d => d._Y)])

        let g = this.svg
            .attr('width', width + marginleft + marginright)
            .attr('height', height + margintop + marginbottom)
            .append('g')
            .attr('transform', `translate( ${marginleft} , ${margintop} )`)



        if (showgrid) {
            let grid = g.append('g')
            grid.append("g")
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
        let gdata = g.datum(data)
        gdata.append("path")
            .attr("fill", areacolor)
            .style("opacity", 0.5)
            .attr('d', (d) => area2(d))
            .transition()
            .duration(AnimateTime / 2)
            .attr('d', (d) => area(d))

        gdata.append("path")
            .attr("fill", "none")
            .attr('d', (d) => line(d))
            .call(transition)
        function transition(path) {
            path.transition()
                .ease(d3.easeLinear)
                .delay(AnimateTime / 2)
                .duration(AnimateTime)
                .attr("stroke", pathcolor)
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

        let group = g.append('g')
            .selectAll('tip')
            .data(data)
            .enter()
            .append('g')
        group.on('mouseover', gridMouseOver)
            .on("mouseout", gridMouseOut)
        if (showplottip) {
            group.append('circle')
                .attr('cx', d => x(d._X))
                .attr('cy', d => y(d._Y))
                .attrs({
                    r: 5,
                    fill: pathcolor,
                    ...plotattrs
                })
                .style("opacity", 0)
                .styles({ 'cursor': 'pointer', ...plotstyles })
                .on('click', plotclick)
        }
        group
            .append('text')
            .text(tiptext)
            .attr("text-anchor", d => x(d._X) < width / 2 ? "start" : "end")
            .attr("font-size", 0)
            .attr('fill', 'rgba(0,0,0,0)')
            .attr('font-weight', 'bold')
            .attr('dy', '-0.7em')
            .attr('dx', d => x(d._X) < width / 2 ? "0.8em" : '-0.8em')
            .attr('transform', d => `translate(${x(d._X)},${y(d._Y)})`)

        function gridMouseOver() {
            let item = d3.select(this)
            item.select('text')
                .transition()
                .duration(800)
                .attr('fill', '#000')
                .attr("font-size", 14)
            item.select('circle')
                .transition()
                .duration(800)
                .attrs({
                    fill:pathcolor,
                    ...plotattrs_hover
                })
                .style("opacity", 1)
                .styles({
                    ...plotstyles_hover
                })
        }
        function gridMouseOut() {
            let item = d3.select(this)
            item.select('text')
                .transition()
                .duration(500)
                .attr('fill', 'rgba(0,0,0,0)')
                .attr("font-size", 0)
            item.select('circle')
                .transition()
                .duration(800)
                .style("opacity", 0)
                .styles({ ...plotstyles })
        }
        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + (height) + ")")
            .call(d3.axisBottom(x))
            .append("text")
            .attr("x", width + 10)
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

    }
}



export default Areachart;