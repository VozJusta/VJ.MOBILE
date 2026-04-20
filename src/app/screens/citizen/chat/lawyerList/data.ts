import { LawyerCardProps } from "@/interfaces/components/LawyerCard";
import { router } from "expo-router";

export const lawyers: LawyerCardProps[] = [
  {
    name: "Dr. João Silva",
    badges: [
      { textBadge: "DIREITO DO CONSUMIDOR", badgeColor: "#0D59F2" },
      { textBadge: "DIREITO CIVIL", badgeColor: "#F2545B" },
    ],
    rating: 4.5,
    onPress: () => {
      router.push("/screens/citizen/chat/lawyerList/lawyerSelected")
    }
  },
  {
    name: "Dra. Maria Oliveira",
    badges: [
      { textBadge: "DIREITO DO CONSUMIDOR", badgeColor: "#0D59F2" },
      { textBadge: "DIREITO PENAL", badgeColor: "#F2545B" },
    ],
    rating: 4.8,
    onPress: () => {
      router.push("/screens/citizen/chat/lawyerList/lawyerSelected")
    }
  },
  {
    name: "Dr. Carlos Pereira",
    badges: [
      { textBadge: "DIREITO DO CONSUMIDOR", badgeColor: "#0D59F2" },
      { textBadge: "DIREITO TRABALHISTA", badgeColor: "#F2545B" },
    ],
    rating: 4.2,
    onPress: () => {
      router.push("/screens/citizen/chat/lawyerList/lawyerSelected")
    }
  },
];