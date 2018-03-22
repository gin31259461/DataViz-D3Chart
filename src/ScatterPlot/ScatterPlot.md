```js


let data= [{
    d: 2167,
    c:10
  }, {
    d: 3267,
    c:15
  }, {
    d: 3167,
    c:20
  }, {
    d: 5167,
    c:28
  }, {
    d: 3167,
    c:7
  }, {
    d: 2567,
    c:15
  }, {
    d: 9167,
    c:31
  }, {
    d: 5167,
    c:18
  }, {
    d: 6167,
    c:43
  }, {
    d: 3167,
    c:35
  }, {
    d: 2657,
    c:15
  }, {
    d: 1967,
    c:18
  }];
    
    <ScatterPlot
        data={data}
        getX= {(d) => d.c}
        getY= {(d) => d.d}
    ></ScatterPlot>
```