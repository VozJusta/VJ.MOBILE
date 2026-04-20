import { ReactNode } from "react";

export interface IAnalysysConcludedTemplateProps {
  title: string;
  description: string;
  titleHeader?: string;
  firstCardProps?: {
    title: string;
    description: string;
  };
  secondCardProps?: {
    title: string;
    description: string;
  };
  extraActions?: ReactNode;
}
