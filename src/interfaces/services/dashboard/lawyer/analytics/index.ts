export interface IGetAnalyticsResponse {
    data: IAnalyticsData[];
}

export interface IAnalyticsData {
    date: string;
    value: number;
}