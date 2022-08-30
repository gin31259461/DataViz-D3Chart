```jsx
const data = [
  {
    pcid: "",
    cid: 0,
    deptname: "",
    value: 0,
  },
  {
    pcid: 34901,
    cid: 34900,
    deptname: "部門B",
    value: 80,
  },
  {
    pcid: 0,
    cid: 34901,
    deptname: "部門A",
    value: 89,
  },
  {
    pcid: 34901,
    cid: 34902,
    deptname: "部門C",
    value: 100,
  },
  {
    pcid: 34901,
    cid: 34903,
    deptname: "部門D",
    value: 0,
  },
  {
    pcid: 34901,
    cid: 34904,
    deptname: "部門E",
    value: 0,
  },
  {
    pcid: 34901,
    cid: 34905,
    deptname: "部門F",
    value: 100,
  },
  {
    pcid: 34901,
    cid: 34906,
    deptname: "部門G",
    value: 0,
  },
  {
    pcid: 34901,
    cid: 34907,
    deptname: "部門H",
    value: 0,
  },
  {
    pcid: 34909,
    cid: 34908,
    deptname: "部門I",
    value: 0,
  },
  {
    pcid: 0,
    cid: 34909,
    deptname: "部門G",
    value: 0,
  },
  {
    pcid: 34911,
    cid: 34910,
    deptname: "部門K",
    deptcode: "171f00",
    value: 75,
  },
  {
    pcid: 0,
    cid: 34911,
    deptname: "部門L",
    value: 50,
  },
  {
    pcid: 34911,
    cid: 34912,
    deptname: "部門M",
    value: 0,
  },
  {
    pcid: 34900,
    cid: 34913,
    deptname: "部門N",
    value: 100,
  },
  {
    pcid: 34900,
    cid: 34914,
    deptname: "部門O",
    value: 50,
  },
  {
    pcid: 34900,
    cid: 34915,
    deptname: "部門P",
    value: 100,
  },
  {
    pcid: 34902,
    cid: 34916,
    deptname: "部門Q",
    value: 100,
  },
  {
    pcid: 34902,
    cid: 34917,
    deptname: "部門R",
    value: 100,
  },
  {
    pcid: 34902,
    cid: 34918,
    deptname: "部門S",
    value: 100,
  },
  {
    pcid: 34902,
    cid: 34919,
    deptname: "部門T",
    value: 100,
  },
  {
    pcid: 34921,
    cid: 34920,
    deptname: "部門U",
    value: 2,
  },
  {
    pcid: 0,
    cid: 34921,
    deptname: "部門V",
    value: 1,
  },
  {
    pcid: 34923,
    cid: 34922,
    deptname: "部門W",
    value: 0,
  },
  {
    pcid: 0,
    cid: 34923,
    deptname: "部門X",
    value: 0,
  },
  {
    pcid: 34925,
    cid: 34924,
    deptname: "部門Y",
    value: 27,
  },
  {
    pcid: 0,
    cid: 34925,
    deptname: "部門Z",
    deptcode: "195b00",
    value: 13,
  },
  {
    pcid: 34925,
    cid: 34926,
    deptname: "部門Z1",
    value: 0,
  },
  {
    pcid: 34925,
    cid: 34927,
    deptname: "部門Z2",
    value: 0,
  },
  {
    pcid: 34925,
    cid: 34928,
    deptname: "部門Z3",
    value: 0,
  },
  {
    pcid: 34919,
    cid: 34929,
    deptname: "部門AB",
    value: 0,
  },
];

<DirectoryTree
  data={data}
  gettext={(d) => d.deptname}
  getvalue={(d) => d.value}
></DirectoryTree>;
```
