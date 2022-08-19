``` jsx

let data = [{
    text: "電視業",
    salary_avghigh: 85,
    salary_avglow: 65,
    salary_avg: 75,
  }, {
    text: "其他機械製造修配業",
    salary_avghigh: 67,
    salary_avglow: 52,
    salary_avg: 59,
  }, {
    text: "人身保險業",
    salary_avghigh: 62,
    salary_avglow: 31,
    salary_avg: 46,
  }, {
    text: "紡紗業",
    salary_avghigh: 59,
    salary_avglow: 41,
    salary_avg: 50,
  }, {
    text: "不動產經營業",
    salary_avghigh: 59,
    salary_avglow: 45,
    salary_avg: 52,
  }, {
    text: "金屬加工用機械製造修配業",
    salary_avghigh: 53,
    salary_avglow: 38,
    salary_avg: 45,
  }, {
    text: "家用電器製造業",
    salary_avghigh: 52,
    salary_avglow: 45,
    salary_avg: 48,
  }, {
    text: "其他運輸輔助業",
    salary_avghigh: 52,
    salary_avglow: 50,
    salary_avg: 51,
  }, {
    text: "普通航空業",
    salary_avghigh: 51,
    salary_avglow: 49,
    salary_avg: 50,
  }, {
    text: "印染整理業",
    salary_avghigh: 51,
    salary_avglow: 36,
    salary_avg: 43,
  }
];

<BarChartGroup
  data = {data}
  getX = {d => d.text}
  keysOfGroups = {['salary_avghigh','salary_avglow','salary_avg']}
  chartTitleText = {"BarChartGroup"}
  xAxisText = {"x"}
  yAxisText = {"y"}
  xAxisTicksTextRotation = {45}
></BarChartGroup>

```