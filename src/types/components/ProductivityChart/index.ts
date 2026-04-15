export type ChartDataPoint = {
  date: string | number;
  value: number;
};

export type ProductivityChartProps = {
  data: ChartDataPoint[];
  className?: string;
  style?: object;
};