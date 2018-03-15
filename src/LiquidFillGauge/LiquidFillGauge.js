import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

/*
 source http://bl.ocks.org/brattonc/5e5ce9beee483220e2f6

 */
export default class LiquidFillGauge extends Component {
    static propTypes = {

        /** 輸入資料 */
        intValue: PropTypes.number.isRequired,
        /** SVG 寬 */
        width: PropTypes.number,
        /** SVG 高 */
        height: PropTypes.number,
        /** 最小值 */
        minValue: PropTypes.number,
        /** 最大值 */
        maxValue: PropTypes.number,
        /** 圓的外厚度 (0-1) */
        circleThickness: PropTypes.number,
        /** 圓的邊界(0-1) */
        circleFillGap: PropTypes.number,
        /** 外圍圓的顏色 */
        circleColor: PropTypes.string,
        /** 水波高度(0-1) */
        waveHeight: PropTypes.number,
        /** 水波數量 */
        waveCount: PropTypes.number,
        /** 水波上升速度 */
        waveRiseTime: PropTypes.number,
        /** 水波移動速度 */
        waveAnimateTime: PropTypes.number,
        /** 水波是否上升 */
        waveRise: PropTypes.bool,
        /** 在最高值水波是否縮放 */
        waveHeightScaling: PropTypes.bool,
        /** 水波是否移動 */
        waveAnimate: PropTypes.bool,
        /** 水波的的顏色  */
        waveColor: PropTypes.string,
        /** 水波的偏移量(0-1) */
        waveOffset: PropTypes.number,
        /** 文字的所在位置(0-1) */
        textVertPosition: PropTypes.number,
        /** 文字所顯示的相對高度 1=半徑高  */
        textSize: PropTypes.number,
        /** 文字是否有上升變化 */
        valueCountUp: PropTypes.bool,
        /** 是否顯示 % 單位 */
        displayPercent: PropTypes.bool,
        /** 文字的顏色的的顏色 */
        textColor: PropTypes.string,
        /** 文字在水中的顏色 */
        waveTextColor: PropTypes.string,
    }
    static defaultProps = {
        intValue: 50,
        width: 150,
        height: 200,
        minValue: 0,
        maxValue: 100,
        circleThickness: 0.05,
        circleFillGap: 0.05,
        circleColor: "#178BCA",
        waveHeight: 0.1,
        waveCount: 1,
        waveRiseTime: 2000,
        waveAnimateTime: 2000,
        waveRise: true,
        waveHeightScaling: true,
        waveAnimate: true,
        waveColor: "#178BCA",
        waveOffset: 0,
        textVertPosition: .9,
        textSize: .5,
        valueCountUp: true,
        displayPercent: true,
        textColor: "#045681",
        waveTextColor: "#A4DBf8",

    }
    componentDidMount() {
        const {
            intValue,
            ...settings
        } = this.props
        let el = this.el,
            liqidFillGaug = new d3liqidFillGauge(el)
        liqidFillGaug.render(intValue, settings)
    }
    render() {
        return <svg ref={(el) => this.el = el} />
    }
}
class d3liqidFillGauge {

    constructor(el) {
        this.svg = d3.select(el)
    }

    render(value, set) {
       
        let Settings = set
        let gauge = this.svg
        let radius = Math.min(Settings.width, Settings.height) / 2 - 10
        let locationX = Settings.width / 2 - radius
        let locationY = Settings.height / 2 - radius
        let fillPercent = Math.max(Settings.minValue, Math.min(Settings.maxValue, value)) / Settings.maxValue

        let waveHeightScale = Settings.waveHeightScaling ?
            d3.scaleLinear().range([0, Settings.waveHeight], 0).domain([0, 50, 100]) :
            d3.scaleLinear().range([Settings.waveHeight, Settings.waveHeight]).domain([0, 100])


        let textPixels = Settings.textSize * radius / 2
        let textFinalValue = parseFloat(value).toFixed(2)
        let textStartValue = Settings.valueCountUp ? Settings.minValue : textFinalValue
        let percentText = Settings.displayPercent ? "%" : ""
        let circleThickness = Settings.circleThickness * radius
        let circleFillGap = Settings.circleFillGap * radius
        let fillCircleMargin = circleThickness + circleFillGap
        let fillCircleRadius = radius - fillCircleMargin
        let waveHeight = fillCircleRadius * waveHeightScale(fillPercent * 100)
        let waveLength = fillCircleRadius * 2 / Settings.waveCount
        let waveClipCount = 1 + Settings.waveCount
        let waveClipWidth = waveLength * waveClipCount
        let textRounder = v => Math.round(v)
        let rand= Math.random()
        if (parseFloat(textFinalValue) != parseFloat(textRounder(textFinalValue))) {
            textRounder = v => parseFloat(v).toFixed(1)
        }
        if (parseFloat(textFinalValue) != parseFloat(textRounder(textFinalValue))) {
            textRounder = v => parseFloat(v).toFixed(2)
        }

        let data = [];
        for (let i = 0; i <= 40 * waveClipCount; i++) {
            data.push({
                x: i / (40 * waveClipCount),
                y: (i / 40)
            })
        }

        let gaugeCircleX = d3.scaleLinear().range([0, 2 * Math.PI]).domain([0, 1])
        let gaugeCircleY = d3.scaleLinear().range([0, radius]).domain([0, radius])

        let waveScaleX = d3.scaleLinear().range([0, waveClipWidth]).domain([0, 1])
        let waveScaleY = d3.scaleLinear().range([0, waveHeight]).domain([0, 1])

        let waveRiseScale = d3.scaleLinear().range([(fillCircleMargin + fillCircleRadius * 2 + waveHeight), fillCircleMargin - waveHeight]).domain([0, 1])
        let waveAnimateScale = d3.scaleLinear().range([0, waveClipWidth - fillCircleRadius * 2])

        let textRiseScaleY = d3.scaleLinear().range([fillCircleMargin + fillCircleRadius * 2, fillCircleMargin + textPixels * 0.7]).domain([0, 1])

        let g = gauge
            .attr('width', Settings.width)
            .attr('height', Settings.height)
            .append('g')
            .attr('transform', `translate(${locationX},${locationY})`)

        let gaugeCircleArc = d3.arc()
            .startAngle(gaugeCircleX(0))
            .endAngle(gaugeCircleX(1))
            .outerRadius(gaugeCircleY(radius))
            .innerRadius(gaugeCircleY(radius - circleThickness))

        g.append('path')
            .attr('d', gaugeCircleArc)
            .style('fill', Settings.circleColor)
            .attr('transform', `translate(${radius},${radius})`)

        let text = g.append('text')
            .text(textRounder(textStartValue) + percentText)
            .attr("class", "liquidFillGaugeText")
            .attr("text-anchor", "middle")
            .attr("font-size", `${textPixels}px`)
            .style('fill', Settings.textColor)
            .attr('transform', `translate(${radius},${textRiseScaleY(Settings.textVertPosition)})`)
        let clipArea = d3.area()
            .x(d => waveScaleX(d.x))
            .y0(d => waveScaleY(Math.sin(Math.PI * 2 * Settings.waveOffset * -1 + Math.PI * 2 * (1 - Settings.waveCount) + d.y * 2 * Math.PI)))
            .y1(d => fillCircleRadius * 2 + waveHeight)
        let waveGroup = g.append('defs')
            .append('clipPath')
            .attr('id', `clipWave${rand}`)
        let wave = waveGroup.append("path")
            .datum(data)
            .attr("d", clipArea)
            .attr("T", 0)
        let fillCircleGroup = g.append('g')
            .attr('clip-path', `url(#clipWave${rand})`)
        fillCircleGroup.append('circle')
            .attr('cx', radius)
            .attr('cy', radius)
            .attr('r', fillCircleRadius)
            .style('fill', Settings.waveColor)
        let text2 = fillCircleGroup.append('text')
            .text(textRounder(textStartValue) + percentText)
            .attr('class', 'liquidFillGaugeText')
            .attr('text-anchor', 'middle')
            .attr('font-size', `${textPixels}px`)
            .style('fill', Settings.waveTextColor)
            .attr('transform', `translate(${radius},${textRiseScaleY(Settings.textVertPosition)})`)
        if (Settings.valueCountUp) {

            let textTween = function () {
                let i = d3.interpolate(this.textContent, textFinalValue)

                return t => { this.textContent = textRounder(i(t)) + percentText }
            }
            text.transition()
                .duration(Settings.waveRiseTime)
                .tween('text', textTween)
            text2.transition()
                .duration(Settings.waveRiseTime)
                .tween('text', textTween)
        }
        let waveGroupXPosition = fillCircleMargin + fillCircleRadius * 2 - waveClipWidth

        if (Settings.waveRise) {

            waveGroup
                .attr('transform', `translate(${waveGroupXPosition},${waveRiseScale(0)})`)
                .transition()
                .duration(Settings.waveRiseTime)
                .attr('transform', `translate(${waveGroupXPosition},${waveRiseScale(fillPercent)})`)
        }
        else {
            waveGroup
                .attr('transform', `translate(${waveGroupXPosition},${waveRiseScale(fillPercent)})`)
        }
        function animateWave() {
            wave.attr('transform', 'translate(' + waveAnimateScale(wave.attr('T')) + ',0)');
            wave.transition()
                .duration(Settings.waveAnimateTime * (1 - wave.attr('T')))
                .ease(d3.easeLinear)
                .attr('transform', 'translate(' + waveAnimateScale(1) + ',0)')
                .attr('T', 1)
                .on('end', function () {
                    wave.attr('T', 0);
                    animateWave(Settings.waveAnimateTime);
                });
        }
        if (Settings.waveAnimate) {

            animateWave()
        }
    }
}