import {
  AnalysysCardProps,
  AnalysysCardTitle,
} from "@/interfaces/components/AnalysysCard";

export const requestSelectedAnalysysData: AnalysysCardProps[] = [
  {
    title: AnalysysCardTitle.FACTS,
    text: "O cliente alega demissão sem justa causa após 5 anos de vínculo empregatício não formalizado. Relata jornadas de trabalho de 10 horas diárias sem pagamento de horas extras. Apresenta testemunhas e extratos bancários como prova de recebimento de salário.",
  },
  {
    title: AnalysysCardTitle.LEGAL_ANALYSIS,
    text: "Com base na CLT, o cliente tem direito a verbas rescisórias, incluindo aviso prévio, 13º salário proporcional, férias proporcionais e multa de 40% do FGTS. A ausência de contrato formal e as provas apresentadas fortalecem a reivindicação do cliente por direitos trabalhistas.",
  },
  {
    title: AnalysysCardTitle.SIMPLIFIED_EXPLANATION,
    text: "O cliente foi demitido sem um contrato formal e trabalhou muitas horas extras sem receber por isso. Ele tem direito a receber uma compensação por isso, e as provas que ele tem ajudam a mostrar que ele merece esses direitos.",
  },
];
