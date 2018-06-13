'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DirectoryTree = function (_Component) {
    _inherits(DirectoryTree, _Component);

    function DirectoryTree(props) {
        _classCallCheck(this, DirectoryTree);

        return _possibleConstructorReturn(this, (DirectoryTree.__proto__ || Object.getPrototypeOf(DirectoryTree)).call(this, props));
    }

    _createClass(DirectoryTree, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                data = _props.data,
                settings = _objectWithoutProperties(_props, ['data']);

            var el = this.el,
                tree = new d3tree(el);
            tree.render(data, settings);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement('svg', { ref: function ref(el) {
                    return _this2.el = el;
                } });
        }
    }]);

    return DirectoryTree;
}(_react.Component);

DirectoryTree.propTypes = {
    /** 資料*/
    data: _propTypes2.default.array.isRequired,
    /** SVG 的寬度*/
    width: _propTypes2.default.number,
    /** SVG 的高度 */
    height: _propTypes2.default.number,
    /** SVG 的上邊界 */
    margintop: _propTypes2.default.number,
    /** SVG 的下邊界 */
    marginbottom: _propTypes2.default.number,
    /** SVG 的右邊界 */
    marginright: _propTypes2.default.number,
    /** SVG 的左邊界*/
    marginleft: _propTypes2.default.number,
    /** 每個的高度 */
    nodeHeight: _propTypes2.default.number,
    /** 內縮的大小 */
    childIndent: _propTypes2.default.number,
    /** 父層的 資料欄位 */
    getparentId: _propTypes2.default.func,
    /** 自己的資料欄位 */
    getid: _propTypes2.default.func,
    /** 取文字資料的函式 */
    gettext: _propTypes2.default.func,
    /** 取出數值資料的函式 */
    getvalue: _propTypes2.default.func,
    /** 取出數值資料的函式 */
    getvaluetext: _propTypes2.default.func,
    /** 是否一開始就摺疊 */
    IsCollapse: _propTypes2.default.bool,
    /** 動畫時間 (ms) */
    AnimateTime: _propTypes2.default.number
};
DirectoryTree.defaultProps = {
    width: 500,
    margintop: 0,
    marginbottom: 30,
    marginright: 50,
    marginleft: 40,
    nodeHeight: 40,
    childIndent: 30,
    getparentId: function getparentId(d) {
        return d.pcid;
    },
    getid: function getid(d) {
        return d.cid;
    },
    gettext: function gettext(d) {
        return d.text;
    },
    getvalue: function getvalue(d) {
        return d.value;
    },
    getvaluetext: function getvaluetext(d) {
        return d.value;
    },
    IsCollapse: true,
    AnimateTime: 500
};
exports.default = DirectoryTree;

var d3tree = function () {
    function d3tree(el) {
        _classCallCheck(this, d3tree);

        this.svg = d3.select(el);
    }

    _createClass(d3tree, [{
        key: 'render',
        value: function render(data, settings) {
            var width = settings.width,
                margintop = settings.margintop,
                marginbottom = settings.marginbottom,
                marginright = settings.marginright,
                marginleft = settings.marginleft,
                getparentId = settings.getparentId,
                getid = settings.getid,
                gettext = settings.gettext,
                getvalue = settings.getvalue,
                getvaluetext = settings.getvaluetext,
                nodeHeight = settings.nodeHeight,
                childIndent = settings.childIndent,
                IsCollapse = settings.IsCollapse,
                AnimateTime = settings.AnimateTime;


            var height = data.length * nodeHeight;
            var svg = this.svg;
            var g = this.svg.attr('width', width + marginright + marginleft).attr('height', height + margintop + marginbottom).append('g').attr('transform', 'translate( ' + marginleft + ' , ' + margintop + ' )');
            data.map(function (d) {
                d._pcid = getparentId(d), d._cid = getid(d);
                d._value = getvalue(d);
                d._valuetext = getvaluetext(d);
                d._text = gettext(d);
            });
            var stratify = d3.stratify().parentId(function (d) {
                return d._pcid;
            }).id(function (d) {
                return d._cid;
            });

            var treemap = d3.tree().size([height, width]);

            var root = stratify(data);
            root.x0 = 0;
            root.y0 = 0;

            IsCollapse && root.children.forEach(collapse);

            function collapse(d) {
                if (d.children) {
                    d._children = d.children;
                    d._children.forEach(collapse);
                    d.children = null;
                }
            }

            update(root);
            function update(source) {

                var treeData = treemap(root);
                layout(root);
                var nodes = treeData.descendants().slice(1);

                svg.transition().duration(AnimateTime).attr('height', nodes.length * nodeHeight + margintop + marginbottom);
                var node = g.selectAll('g.node').data(nodes, function (d) {
                    return d.id || (d.id = ++i);
                });
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
                    var x = 0,
                        y = 0;
                    visit(function (n, index, parent) {
                        x = x + nodeHeight;
                        y = parent ? parent.y + childIndent : 0;
                        n.y = y;
                        n.x = x;
                    }, node);
                }

                var nodeEnter = node.enter().append('g').attr('class', 'node').style("opacity", 1).attr("transform", function (d) {
                    return 'translate(  ' + source.y0 + ', ' + source.x0 + ' )';
                }).attr('cursor', function (d) {
                    return d.children || d._children ? 'pointer' : 'default';
                }).on('click', function (d) {
                    return d.children || d._children ? click(d) : function () {};
                });

                nodeEnter.append('rect').attr('x', 0).attr('y', -nodeHeight / 2).attr('width', function (d) {
                    return width - d.y;
                }).attr('height', nodeHeight * .8).style("fill", '#c8def4').attr('stroke', 'rgba(0,0,0,.2)');
                nodeEnter.append('text').attr('class', 'treeopen').attr('dx', '3px').text(function (d) {
                    return d.children || d._children ? d.children ? '-' : '+' : '';
                }).attr('stroke', 'rgba(0,0,0,.2)');
                nodeEnter.append('text').text(function (d) {
                    return d.data._text;
                }).attr('dx', '15px');

                var nodeEnterg = nodeEnter.append('g').attr("transform", function (d) {
                    return 'translate(  ' + (width / 2 - d.y) + ', ' + 0 + ' )';
                });
                nodeEnterg.append('rect').attr('x', 0).attr('y', -nodeHeight / 3).attr('width', function (d) {
                    return width / 2 - 10;
                }).attr('height', nodeHeight / 2).style("fill", 'rgba(255,255,255,1)').attr('stroke', 'rgba(0,0,0,.2)');
                nodeEnterg.append('rect').attr('x', 0).attr('y', -nodeHeight / 3).attr('width', 0).attr('height', nodeHeight / 2).style("fill", '#6da2dc').transition().delay(AnimateTime).duration(1000).attr('width', function (d) {
                    return (width / 2 - 10) * d.data._value / 100;
                });
                nodeEnterg.append('text').text(function (d) {
                    return '' + d.data._valuetext;
                }).attr('dx', '10px').attr('dy', '0.1em').style("fill", 'rgba(0,0,0,1)');
                var nodeUpdate = nodeEnter.merge(node);
                nodeUpdate.transition().duration(AnimateTime).style("opacity", 1).attr("transform", function (d) {
                    return 'translate(' + (d.y - childIndent) + ' ,' + (d.x - nodeHeight) + ')';
                });

                nodeUpdate.select('.treeopen').text(function (d) {
                    return d.children || d._children ? d.children ? '-' : '+' : '';
                });
                var nodeExit = node.exit().style("opacity", 1).transition('nodeExit').duration(AnimateTime).attr("transform", function (d) {
                    return 'translate(' + source.y + ' ,' + (source.x - nodeHeight / 2) + ' )';
                }).style("opacity", 0).remove();

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
    }]);

    return d3tree;
}();