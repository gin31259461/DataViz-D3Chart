
## 餅圖
```js
  let data= [{
    count: 2167,
    text: "A"
  }, {
    count: 3267,
    text: "B"
  }, {
    count: 3167,
    text: "C"
  }, {
    count: 5167,
    text: "D"
  }];


  <Piechart
    data={data}
  ></Piechart>

```
## 甜甜圈圖
設定 innerRadius = 0.5
```js
  let data= [{
    count: 2167,
    text: "A"
  }, {
    count: 3267,
    text: "B"
  }, {
    count: 3167,
    text: "C"
  }, {
    count: 5167,
    text: "D"
  }];


  <Piechart
    data={data}
    innerRadius={0.5}
  ></Piechart>

```