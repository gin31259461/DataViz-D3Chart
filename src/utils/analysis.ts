import { MapDataProps } from '@/chart/chart-style';
import { map } from 'd3';

export function groupData(keys: string[], data: object[], xData: any[]) {
  return  keys.map((k) => {
    const newData: MapDataProps[] = [];
    map(data, (d: {[key: string]: any}, i) => {
      newData.push({
        x: xData[i],
        y: d[k],
        group: k,
        defined: !isNaN(xData[i]) && !isNaN(d[k]),
      });
    });
    return { group: k, value: newData };
  });
}