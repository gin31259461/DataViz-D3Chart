``` jsx

let data = [{
    count: 2167,
    text: "A",
    detail: "d"
  }, {
    count: 3267,
    text: "B",
    detail: "dd"
  }, {
    count: 3167,
    text: "C",
    detail: "ddd"
  }, {
    count: 5167,
    text: "D",
    detail: "dddd"
}];

<PieChart
  data = {data}
  getName = {d => d.text}
  getValue = {d => d.count}
  getDetail = {d => d.detail}
  chartTitleText = {"PieChart"}
></PieChart>

```