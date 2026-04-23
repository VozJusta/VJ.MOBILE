import {
  IOperationalStatsCard,
  OperationalStatsCardBgColor,
  OperationalStatsCardBorderColor,
  OperationalStatsCardIcon,
  OperationalStatsCardIconColor,
} from "@/interfaces/components/OperationalStatsCard";

export const operationalStatsData: IOperationalStatsCard[] = [
  {
    icon: OperationalStatsCardIcon.ACCEPTED,
    title: "Aceitos",
    stat: "1,234",
    iconColor: OperationalStatsCardIconColor.ACCEPTED,
    bgColor: OperationalStatsCardBgColor.ACCEPTED,
    borderColor: OperationalStatsCardBorderColor.ACCEPTED,
  },
  {
    icon: OperationalStatsCardIcon.REJECTED,
    title: "Rejeitados",
    stat: "567",
    iconColor: OperationalStatsCardIconColor.REJECTED,
    bgColor: OperationalStatsCardBgColor.REJECTED,
    borderColor: OperationalStatsCardBorderColor.REJECTED,
  },
  {
    icon: OperationalStatsCardIcon.PENDING,
    title: "Pendentes",
    stat: "89",
    iconColor: OperationalStatsCardIconColor.PENDING,
    bgColor: OperationalStatsCardBgColor.PENDING,
    borderColor: OperationalStatsCardBorderColor.PENDING,
  },
];
