```jsx

let data = [
  {
    count: 2167,
    text: "A",
    detail: "A detail",
  },
  {
    count: 3267,
    text: "B",
    detail: "B detail",
  },
  {
    count: 3167,
    text: "C",
    detail: "C detail",
  },
  {
    count: 5167,
    text: "D",
    detail: "D detail",
  },
];

<DonutChart
  data={data}
  getName={(d) => d.text}
  getValue={(d) => d.count}
  getDetail={(d) => d.detail}
  chartTitleText={"DonutChart"}
></DonutChart>;

```
