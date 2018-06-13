import React, { Component, } from 'react'
import { findDOMNode } from 'react-dom'
import * as d3 from 'd3'
import PropTypes from 'prop-types'
export default class DirectoryTree extends Component {
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
        /** 每個的高度 */
        nodeHeight: PropTypes.number,
        /** 內縮的大小 */
        childIndent: PropTypes.number,
        /** 父層的 資料欄位 */
        getparentId: PropTypes.func,
        /** 自己的資料欄位 */
        getid: PropTypes.func,
        /** 取文字資料的函式 */
        gettext: PropTypes.func,
        /** 取出數值資料的函式 */
        getvalue: PropTypes.func,
        /** 取出數值資料的函式 */
        getvaluetext: PropTypes.func,
        /** 是否一開始就摺疊 */
        IsCollapse: PropTypes.bool,
        /** 動畫時間 (ms) */
        AnimateTime: PropTypes.number,
    }
    static defaultProps = {
        width: 500,
        margintop: 0,
        marginbottom: 30,
        marginright: 50,
        marginleft: 40,
        nodeHeight: 40,
        childIndent: 30,
        getparentId: (d) => d.pcid,
        getid: (d) => d.cid,
        gettext: (d) => d.text,
        getvalue: (d) => d.value,
        getvaluetext:(d)=>d.value,
        IsCollapse: true,
        AnimateTime: 500
    }
    componentDidMount() {
        const { data, ...settings } = this.props
        var el = this.el,
            tree = new d3tree(el)
        tree.render(data, settings)
    }
    render() {
        return <svg ref={(el) => this.el = el} />
    }
}

class d3tree {
    constructor(el) {
        this.svg = d3.select(el)
    }

    render(data, settings) {
        let {
            width,
            margintop, marginbottom, marginright, marginleft,
            getparentId, getid, gettext, getvalue,getvaluetext,
            nodeHeight, childIndent, IsCollapse,
            AnimateTime
        } = settings

        let height = data.length * nodeHeight
        let svg = this.svg
        let g = this.svg
            .attr('width', width + marginright + marginleft)
            .attr('height', height + margintop + marginbottom)
            .append('g')
            .attr('transform', `translate( ${marginleft} , ${margintop} )`)
        data.map((d) => {
            d._pcid = getparentId(d),
                d._cid = getid(d)
            d._value = getvalue(d)
            d._valuetext=getvaluetext(d)
            d._text = gettext(d)
        })
        let stratify = d3.stratify()
            .parentId(function (d) {
                return d._pcid
            })
            .id(function (d) {
                return d._cid
            });

        let treemap = d3.tree()
            .size([height, width])

        let root = stratify(data)
        root.x0 = 0
        root.y0 = 0

        IsCollapse && root.children.forEach(collapse)

        function collapse(d) {
            if (d.children) {
                d._children = d.children
                d._children.forEach(collapse)
                d.children = null
            }
        }

        update(root)
        function update(source) {

            var treeData = treemap(root);
            layout(root);
            var nodes = treeData.descendants().slice(1)

            svg.transition()
                .duration(AnimateTime)
                .attr('height', nodes.length * nodeHeight + margintop + marginbottom)
            var node = g.selectAll('g.node')
                .data(nodes, (d) => d.id || (d.id = ++i));
            function visit(f, t, index, parent) {
                if (t) {
                    f(t, index, parent);
                }
                var children = t.children;
                if (children && children.length) {
                    children.forEach(function (child, ci) {
                        visit(f, child, ci, t);
                    });
                }
            }

            function layout(node) {
                var x = 0, y = 0;
                visit(function (n, index, parent) {
                    x = x + nodeHeight;
                    y = parent ? parent.y + childIndent : 0;
                    n.y = y;
                    n.x = x;
                }, node);
            }

            let nodeEnter = node.enter().append('g')
                .attr('class', 'node')
                .style("opacity", 1)
                .attr("transform", (d) => `translate(  ${source.y0}, ${source.x0} )`)
                .attr('cursor', d => d.children || d._children ? 'pointer' : 'default')
                .on('click', d => d.children || d._children ? click(d) : () => { });

            nodeEnter.append('rect')
                .attr('x', 0)
                .attr('y', -nodeHeight / 2)
                .attr('width', d => width - d.y)
                .attr('height', nodeHeight * .8)
                .style("fill", '#c8def4')
                .attr('stroke', 'rgba(0,0,0,.2)')
            nodeEnter.append('text')
                .attr('class', 'treeopen')
                .attr('dx', '3px')
                .text(d => d.children || d._children ? d.children ? '-' : '+' : '')
                .attr('stroke', 'rgba(0,0,0,.2)')
            nodeEnter.append('text')
                .text(d => d.data._text)
                .attr('dx', '15px')

            let nodeEnterg = nodeEnter.append('g')
                .attr("transform", (d) => `translate(  ${width / 2 - d.y}, ${0} )`)
            nodeEnterg.append('rect')
                .attr('x', 0)
                .attr('y', -nodeHeight / 3)
                .attr('width', d => width / 2 - 10)
                .attr('height', nodeHeight / 2)
                .style("fill", 'rgba(255,255,255,1)')
                .attr('stroke', 'rgba(0,0,0,.2)')
            nodeEnterg.append('rect')
                .attr('x', 0)
                .attr('y', -nodeHeight / 3)
                .attr('width', 0)
                .attr('height', nodeHeight / 2)
                .style("fill", '#6da2dc')
                .transition()
                .delay(AnimateTime)
                .duration(1000)
                .attr('width', d => (width / 2 - 10) * d.data._value / 100)
            nodeEnterg.append('text')
                .text(d => `${d.data._valuetext}`)
                .attr('dx', '10px')
                .attr('dy', '0.1em')
                .style("fill", 'rgba(0,0,0,1)')
            let nodeUpdate = nodeEnter.merge(node);
            nodeUpdate.transition()
                .duration(AnimateTime)
                .style("opacity", 1)
                .attr("transform", (d) => `translate(${d.y - childIndent} ,${d.x - nodeHeight})`)

            nodeUpdate.select('.treeopen')
                .text(d => d.children || d._children ? d.children ? '-' : '+' : '')
            var nodeExit = node.exit()
                .style("opacity", 1)
                .transition('nodeExit')
                .duration(AnimateTime)
                .attr("transform", (d) => `translate(${source.y} ,${source.x - nodeHeight / 2} )`)
                .style("opacity", 0)
                .remove();

            nodes.forEach(function (d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });

            function click(d) {
                if (d.children) {
                    d._children = d.children;
                    d.children = null;
                } else {
                    d.children = d._children;
                    d._children = null;
                }
                update(d);
            }
        }

    }
}



