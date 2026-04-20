import { CaseStatus } from "@/interfaces/components/CaseCard";

export const STATUS_STYLES: Record<
  CaseStatus,
  {
    dot: string;
    icon: string;
    label: string;
    bg: string;
    border: string;
  }
> = {
  "Pending": {
    dot: "bg-[#F97316]",
    icon: "#F97316",
    label: "text-[#FB923C]",
    bg: "bg-[rgba(249,115,22,0.1)]",
    border: "border-[rgba(249,115,22,0.2)]",
  },
  "Accepted": {
    dot: "bg-[#22C55E]",
    icon: "#22C55E",
    label: "text-[#4ADE80]",
    bg: "bg-[rgba(34,197,94,0.1)]",
    border: "border-[rgba(34,197,94,0.2)]",
  },
  "Refused": {
    dot: "bg-[#EF4444]",
    icon: "#EF4444",
    label: "text-[#F87171]",
    bg: "bg-[rgba(239,68,68,0.1)]",
    border: "border-[rgba(239,68,68,0.2)]",
  },
};