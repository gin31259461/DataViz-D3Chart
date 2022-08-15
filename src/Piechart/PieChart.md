``` jsx

let data = [{
    count: 2167,
    text: "A",
    detail: "A -----"
  }, {
    count: 3267,
    text: "B",
    detail: "B -----"
  }, {
    count: 3167,
    text: "C",
    detail: "C -----"
  }, {
    count: 5167,
    text: "D",
    detail: "D -----"
}];

<PieChart
  data = {data}
  getName = {d => d.text}
  getValue = {d => d.count}
  getDetail = {d => d.detail}
  chartTitleText = {"PieChart"}
></PieChart>

```