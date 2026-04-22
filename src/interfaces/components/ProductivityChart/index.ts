export interface IChartDataPoint {
  date: string | number;
  value: number;
}

export type IProductivityChart = {
  data: IChartDataPoint[];
  className?: string;
  style?: object;
};