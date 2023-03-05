# 前端圖表 Component

[Docs & Demo](http://react_component.gitlabpage.wke.csie.ncnu.edu.tw/Chart_Component/)

## Installation

``` text
   npm install git+https://gitlab.wke.csie.ncnu.edu.tw/react_component/Chart_Component.git

```

## 支援版本

* react v16
* d3 v7

## Usage example

``` tsx
import React from "react";
import { render } from "react-dom";
import { LineChart } from "chart-component";

const root = document.getElementById("root");

render(
  <Linechart
    data={data}
    width={700}
  ></Linechart>,
  root
)

```
