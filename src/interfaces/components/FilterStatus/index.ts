import { TCaseStatus } from "../CaseCard";

export interface IFilterStatus {
    status: TCaseStatus | undefined;
    amount: number;
    onPress: (filter: TCaseStatus) => void;
    statusSelected: TCaseStatus | undefined;
}