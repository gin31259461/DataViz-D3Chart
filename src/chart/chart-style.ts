import { CurveFactory, CurveFactoryLineOnly } from "d3";

export type MapDataProps = {x: string | number | Date, y: number, key: string, defined: any};

type D3Function = (value: any, index: number, iterable: Iterable<any>) => any[];

type BaseType = {
  width: number;
  height: number;
  title: string;
};

type MapProps = {
  getX: D3Function;
  keys: Array<string>;
};

type MarginProps = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

type AnimationProps = {
  duration: number;
  enabled: boolean;
};

type LegendProps = {
  title: string;
  enabled: boolean;
};

type XAxisProps = {
  title: string;
  domain: [undefined, undefined] | [string, string];
  range: Array<number>;
  type: any;
  enabled: boolean;
};

type YAxisProps = {
  title: string;
  domain: [undefined, undefined] | [string, string];
  range: Array<number>;
  type: any;
  enabled: boolean;
};

type StrokeProps = {
  color: Iterable<string>;
  opacity: number;
  width: number;
  linecap: string;
  linejoin: string;
  enabled: boolean;
  type: CurveFactory | CurveFactoryLineOnly;
};

type NodeProps = {
  radius: number;
  enabled: boolean;
};

type ParserProps = {
  time: string;
};

type FillProps = {
  color: Iterable<string>;
  opacity: number;
  type: CurveFactory
};

type TooltipProps = {
  map: Function;
  enabled: boolean;
};

type TimeProps = {
  type: Function;
};

type FontProps = {
  size: string;
}

export interface ChartStyle {
  data: Array<object>;
  base: BaseType;
  map: MapProps;
  margin: MarginProps;
  colors: any;
  animation: AnimationProps;
  legend: LegendProps;
  xAxis: XAxisProps;
  yAxis: YAxisProps;
  stroke: StrokeProps;
  node: NodeProps;
  parser: ParserProps;
  fill: FillProps;
  tooltip: TooltipProps;
  time: TimeProps;
  font: FontProps;
}
