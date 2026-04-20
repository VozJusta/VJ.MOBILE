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
  "Em Análise": {
    dot: "bg-[#F97316]",
    icon: "#F97316",
    label: "text-[#FB923C]",
    bg: "bg-[rgba(249,115,22,0.1)]",
    border: "border-[rgba(249,115,22,0.2)]",
  },
  Concluído: {
    dot: "bg-[#22C55E]",
    icon: "#22C55E",
    label: "text-[#4ADE80]",
    bg: "bg-[rgba(34,197,94,0.1)]",
    border: "border-[rgba(34,197,94,0.2)]",
  },
  "Aguardando Advogado": {
    dot: "bg-[#3B82F6]",
    icon: "#3B82F6",
    label: "text-[#60A5FA]",
    bg: "bg-[rgba(59,130,246,0.1)]",
    border: "border-[rgba(59,130,246,0.2)]",
  },
};