import { LawyerCardProps } from "@/interfaces/components/LawyerCard";

export const lawyers: LawyerCardProps[] = [
  {
    name: "Dr. João Silva",
    badges: [
      { textBadge: "DIREITO DO CONSUMIDOR", badgeColor: "#0D59F2" },
      { textBadge: "DIREITO CIVIL", badgeColor: "#F2545B" },
    ],
    rating: 4.5,
  },
  {
    name: "Dra. Maria Oliveira",
    badges: [
      { textBadge: "DIREITO DO CONSUMIDOR", badgeColor: "#0D59F2" },
      { textBadge: "DIREITO PENAL", badgeColor: "#F2545B" },
    ],
    rating: 4.8,
  },
  {
    name: "Dr. Carlos Pereira",
    badges: [
      { textBadge: "DIREITO DO CONSUMIDOR", badgeColor: "#0D59F2" },
      { textBadge: "DIREITO TRABALHISTA", badgeColor: "#F2545B" },
    ],
    rating: 4.2,
  },
];