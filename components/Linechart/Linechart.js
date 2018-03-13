import React, { Component, } from 'react'
import { findDOMNode } from 'react-dom'
import * as d3 from 'd3'
import "d3-selection-multi";
import PropTypes from 'prop-types'

class Linechart extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { data, settings

  } = this.props
    let el = findDOMNode(this),
      line = new d3line(el)
    line.render(data, settings)
  }
  render() {
    return <svg />
  }
}

class d3line {

  constructor(el) {
    this.svg = d3.select(el)
  }

  render(data, settings) {
    let { width, height,
      margintop, marginbottom, marginright, marginleft,
      lineattr, linestyles,
      plotattrs, plotstyles,
      plotattrs_hover,plotstykes_hover,
      getX, getY,tiptext,
      showgridtip, showplottip, showgrid,
      timeParse, timeformat,
      lineAnimateTime,
      plotclick } = {
        width: 800,
        height: 300,
        margintop: 50,
        marginbottom: 30,
        marginright: 50,
        marginleft: 40,
        getX: (d) => d.date,
        getY: (d) => d.count,
        tiptext:(d)=>d.count,
        lineattrs: {},
        linestyles: {},
        plotattrs: {},
        plotstyles: {},
        plotattrs_hover:{},
        plotstykes_hover:{},
        timeParse: '%Y-%m-%d',
        timeformat: '%m-%d',
        showgrid: true,
        showgridtip: true,
        showplottip: true,
        plotclick: (d, i) => { console.log(d, i) },
        lineAnimateTime: 1000,
        ...settings

      }


    let parseTime = d3.timeParse(timeParse)
    data.map(
      d => {
        d.X = parseTime(getX(d))
        d.Y = getY(d)
      }
    )
    let x = d3.scaleTime().range([0, width]),
      y = d3.scaleLinear().rangeRound([height, 0]),
      line = d3.line()
        .x(d => x(d.X))
        .y(d => y(d.Y))



    x.domain(d3.extent(data, d => d.X))
    y.domain([0, d3.max(data, d => d.Y * 1.05)])

    let g = this.svg
      .attr('width', width + marginleft + marginright)
      .attr('height', height + margintop + marginbottom)
      .append('g')
      .attr('transform', `translate( ${marginleft} , ${margintop} )`)
    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + (height) + ")")
      .call(d3.axisBottom(x).ticks(10).tickFormat(d3.timeFormat(timeformat)))
    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y))
    if (showgrid) {
      let grid = g.append('g')
      grid
        .append('g')
        .call(d3.axisBottom(x)
          .tickSize(height)
          .tickFormat("")
        )
        .attr("stroke-opacity", 0.3)
        .attr("stroke-width", 1)
        .attr("shape-rendering", "crispEdges")
        .select('path')
        .attr("stroke-width", 0)

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
    let path = g
      .datum(data)
      .append("path")

      .attrs({
        'stroke': '#ace',
        'stroke-linejoin': "round",
        'stroke-linecap': "round",
        'stroke-width': 1.5,
        ...lineattr
      })
      .styles({ ...linestyles })
      .attr("fill", "none")
      .attr('d', line)
    let totalLength = path.node().getTotalLength();
    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(lineAnimateTime)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0)

    let group = g.append('g')
      .selectAll('tip')
      .data(data)
      .enter()
      .append('g')
    group.on('mouseover', gridMouseOver)
      .on("mouseout", gridMouseOut)


    if (showgridtip) {
      group
        .append('line')
        .attr('x1', d => x(d.X))
        .attr('y1', 0)
        .attr('x2', d => x(d.X))
        .attr("y2", height)
        .attr("stroke", 'rgba(0,0,0,0)')
        .attr("stroke-width", 1)
    }
    group.append('rect')
      .attr("x", d => x(d.X))
      .attr("y", d => 0)
      .attr("width", 1)
      .attr("height", height)
      .attr('fill', 'rgba(0,0,0,0)')
    if (showplottip) {
      group.append('circle')
        .attr('cx', d => x(d.X))
        .attr('cy', d => y(d.Y))
        .attrs({
          r: 5,
          fill: '#ace',
          ...plotattrs
        })
        .styles({ 'cursor': 'pointer',...plotstyles })
      
        .on('click', plotclick)
    }
    group
      .append('text')
      .text(tiptext)
      .attr("text-anchor", "start")
      .attr("font-size", 14)
      .attr('fill', 'rgba(0,0,0,0)')
      .attr('font-weight', 'bold')
      .attr('dy', '1em')
      .attr('dx', '0.8em')
      .attr('transform', d => `translate(${x(d.X)},${y(d.Y)})`)
    function gridMouseOver() {
      let item = d3.select(this)
      item.select('line')
        .transition()
        .duration(100)
        .attr("stroke", '#888')
        .attr("stroke-width", 2)
      item.select('text')
        .attr('dy', '12')
        .transition()
        .duration(800)
        .attr('dy', '0')
        .attr('fill', '#f00')
        

      item.select('circle')
        .transition()
        .duration(800)
        .attrs({
          fill:'#f00',
          ...plotattrs_hover
        })
        .styles({
          ...plotstykes_hover
        })
    }
    function gridMouseOut() {
      let item = d3.select(this)
      item.select('line')
        .transition()
        .duration(100)
        .attr("stroke", 'rgba(0,0,0,0)')
      item.select('text')
        .transition()
        .duration(500)
        .attr('fill', 'rgba(0,0,0,0)')
      item.select('circle')
        .transition()
        .duration(800)
        .attrs({
          r: 5,
          fill: '#ace',
          ...plotattrs
        })
        .styles({ ...plotstyles })
    }
  }
}



export default Linechart;