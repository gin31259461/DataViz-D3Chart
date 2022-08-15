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
  }
];

<BarChart
  data = {data}
  getX = {d => d.text}
  getY = {d => d.count}
  chartTitleText = {"BarChart"}
  xAxisText = {"x"}
  yAxisText = {"y"}
></BarChart>

```