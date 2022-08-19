```jsx

let data = [
  {
    count: 2167,
    text: "A",
    group: "group1",
  },
  {
    count: 3267,
    text: "B",
    group: "group2",
  },
  {
    count: 3167,
    text: "C",
    group: "group3",
  },
  {
    count: 5167,
    text: "D",
    group: "group4",
  },
  {
    count: 1697,
    text: "E",
    group: "group1",
  },
  {
    count: 7167,
    text: "F",
    group: "group4",
  },
  {
    count: 6187,
    text: "G",
    group: "group4",
  },
  {
    count: 10167,
    text: "H",
    group: "group3",
  },
  {
    count: 7367,
    text: "I",
    group: "group2",
  },
  {
    count: 7367,
    text: "J",
    group: "group2",
  },
  {
    count: 367,
    text: "K",
    group: "group1",
  },
  {
    count: 767,
    text: "L",
    group: "group3",
  },
  {
    count: 67,
    text: "M",
    group: "group3",
  },
  
  {
    count: 77,
    text: "N",
    group: "group1",
  },
  {
    count: 27367,
    text: "O",
    group: "group5",
  },
];

<BubbleChart
  data={data}
  getName={d => d.text}
  getValue={d => d.count}
  getGroup={d => d.group}
  chartTitleText={"BubbleChart"}
></BubbleChart>;

```
