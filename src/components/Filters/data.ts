import {
  IFilterStatus,
  StatusText,
} from "@/interfaces/components/FilterStatus";

export const filters: Omit<IFilterStatus, "onPress" | "statusSelected">[] = [
  {
    status: StatusText.ALL,
    amount: 10,
  },
  {
    status: StatusText.ACCEPTED,
    amount: 5,
  },
  {
    status: StatusText.REJECTED,
    amount: 3,
  },
  {
    status: StatusText.PENDING,
    amount: 2,
  },
];
