import AreaChart from "./area/AreaChart";
import AreaStacked from "./area/AreaStacked";
import BarGroup from "./bar/BarGroup";
import BarStacked from "./bar/BarStacked";
import BubbleChart from "./bubble/BubbleChart";
import Pie from "./circular/Pie";
import Donut from "./circular/Donut";
import LiquidFillGauge from "./gauge/LiquidFillGauge";
import HistogramGroup from "./histogram/HistogramGroup";
import HistogramStacked from "./histogram/HistogramStacked";
import LineChart from "./line/LineChart";
import ScatterChart from "./scatter/ScatterChart";
import CalendarHeatmap from "./time/CalendarHeatmap";
import WordCloud from "./word/WordCloud";

export type D3_CHART_PROPS =
  | "AreaSingle"
  | "AreaGroup"
  | "AreaStacked"
  | "BarSingle"
  | "BarGroup"
  | "BarStacked"
  | "BubbleChart"
  | "BubblePlot"
  | "Pie"
  | "Donut"
  | "LineSingle"
  | "LineMultiple"
  | "ScatterSingle"
  | "ScatterGroup"
  | "WordCloud";

export const ChartComponentsList = [
  "AreaSingle",
  "AreaGroup",
  "AreaStacked",
  "BarSingle",
  "BarGroup",
  "BarStacked",
  "BubbleChart",
  "BubblePlot",
  "Pie",
  "Donut",
  "LineSingle",
  "LineMultiple",
  "ScatterSingle",
  "ScatterGroup",
  "WordCloud",
];

export const D3_CHART = {
  AreaChart,
  AreaStacked,
  BarGroup,
  BarStacked,
  BubbleChart,
  Pie,
  Donut,
  LineChart,
  ScatterChart,
  WordCloud,
};

export {
  AreaChart,
  AreaStacked,
  BarGroup,
  BarStacked,
  BubbleChart,
  Pie,
  Donut,
  LiquidFillGauge,
  HistogramGroup,
  HistogramStacked,
  LineChart,
  ScatterChart,
  WordCloud,
  CalendarHeatmap,
};
