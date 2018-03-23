```js


let data= [{
    d: 2167,
    c:10,
    name:'A'
  }, {
    d: 3267,
    c:15,
    name:'B'
  }, {
    d: 3167,
    c:20,
    name:'A'
  }, {
    d: 5167,
    c:28,
    name:'A'
  }, {
    d: 3167,
    c:7,
    name:'B'
  }, {
    d: 2567,
    c:15,
    name:'A'
  }, {
    d: 9167,
    c:31,
    name:'A'
  }, {
    d: 5167,
    c:18,
    name:'C'
  }, {
    d: 6167,
    c:43,
    name:'C'
  }, {
    d: 3167,
    c:35,
    name:'C'
  }, {
    d: 4701,
    c:15,
    name:'C'
  }, {
    d: 1967,
    c:18,
    name:'C'
  }];
    
    <ScatterPlotGroup
        data={data}
        getX= {(d) => d.c}
        getY= {(d) => d.d}
        getcolor={(d)=>d.name}
    ></ScatterPlotGroup>
```