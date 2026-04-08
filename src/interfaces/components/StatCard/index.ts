export enum StatsCardIcon {
  ACCEPTED = "gpp-good",
  REQUEST = "view-list",
  SPEED = "shutter-speed",
}

export enum StatsCardIconColor {
  ACCEPTED = "#34D399",
  REQUEST = "#2B86EE",
  SPEED = "#00F2FF",
}

export enum StatsCardBgColor {
  ACCEPTED = "rgba(52, 211, 153, 0.2)",
  REQUEST = "rgba(43, 134, 238, 0.2)",
  SPEED = "rgba(0, 242, 255, 0.2)",
}

export type StatsCardProps = {
  icon: StatsCardIcon;
  iconColor: StatsCardIconColor;
  title: string;
  stat: string;
  bgColor: StatsCardBgColor;
};
