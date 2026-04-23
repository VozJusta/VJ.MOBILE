import { IFilterStatus } from "@/interfaces/components/FilterStatus";

export const filters: Omit<
  IFilterStatus,
  "onPress" | "statusSelected" | "amount"
>[] = [
  { status: undefined },
  { status: "Accepted" },
  { status: "Refused" },
  { status: "Pending" },
];
