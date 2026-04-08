import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/Header";
import { TermsTitleProps } from "@/interfaces/components/terms/TermsTitle";
import TermsContent, {
  TermsContentProps,
} from "@/components/terms/TermsContent";
import TermsTitle from "@/components/terms/TermsTitle";

export interface TermsUsageProps {
  titles: TermsTitleProps[];
  contents: TermsContentProps[];
}

export const termsTitles: TermsTitleProps[] = [
  {
    number: 1,
    title: "CONTRATO",
  },
  {
    number: 2,
    title: "PRIVACIDADE",
  },
  {
    number: 3,
    title: "COOKIES",
  },
  {
    number: 4,
    title: "LICENÇA",
  },
];

export const termsContents: TermsContentProps[] = [
  {
    numberSection: 1,
    title: "ELEGIBILIDADE",
    content:
      "O VozJusta destina-se a Cidadãos e MEIs (maiores de 18 anos) que buscam orientação jurídica, e a Advogados com registro válido e ativo na OAB.",
  },
  {
    numberSection: 1,
    title: "PLANOS E ASSINATURAS",
    content:
      "O acesso às ferramentas de Inteligência Artificial (como o Simulador de Audiência e a geração de Petição Inicial) varia de acordo com o plano escolhido (Cidadão Consciente, Voz Protegida, Advogado Júnior ou Escritório Digital).",
  },
  {
    numberSection: 1,
    title: "CONDUTA E RESCISÃO",
    content:
      "É estritamente proibida a engenharia reversa nos nossos fluxos de IA, o fornecimento de dados falsos durante a verificação em duas etapas (2FA via E-mail e SMS) e a utilização da plataforma para fins ilícitos. A conta poderá ser banida em caso de fraude de identidade ou irregularidade na OAB.",
  },
  {
    numberSection: 2,
    title: "DADOS COLETADOS",
    content:
      "Coletamos dados cadastrais (Nome, CPF, E-mail, Telefone e OAB) e dados sensíveis (gravações de áudio da Entrevista Cognitiva e documentos probatórios).",
  },
  {
    numberSection: 2,
    title: "SEGURANÇA",
    content:
      "Em conformidade com a LGPD, todos os dados sensíveis são armazenados na nuvem (Azure) e protegidos por criptografia de ponta a ponta (AES-256).",
  },
  {
    numberSection: 2,
    title: "FINALIDADE DA IA",
    content:
      'Seus áudios são transcritos e processados pela nossa IA para filtrar emoções, extrair fatos e gerar diagnósticos preliminares técnicos ("Relatório de Viabilidade"). Os resultados da IA servem como apoio e não substituem o parecer oficial do advogado.',
  },
  {
    numberSection: 2,
    title: "DIREITOS DO USUÁRIO",
    content:
      "O usuário pode, a qualquer momento, solicitar a exclusão definitiva da sua conta, bem como a deleção dos seus áudios e documentos dos nossos servidores.",
  },
  {
    numberSection: 3,
    title: "NECESSÁRIOS",
    content:
      "Essenciais para a segurança, para manter a sessão ativa e para o funcionamento da autenticação multifator (2FA).",
  },
  {
    numberSection: 3,
    title: "ANALÍTICOS",
    content:
      "Utilizados de forma anônima para compreender como a plataforma é utilizada e melhorar a experiência de navegação e acessibilidade (WCAG 2.1).",
  },
  {
    numberSection: 4,
    title: "OPT-OUT",
    content:
      "O usuário tem o direito de desativar os cookies analíticos em seu painel, mantendo apenas os estritamente necessários para o funcionamento do app.",
  },
  {
    numberSection: 4,
    title: "PROPRIETÁRIA",
    content:
      "Toda a arquitetura de software (incluindo o uso de Next.js, NestJS e React Native), os fluxos de Inteligência Artificial (RAG) e a marca VozJusta são de propriedade intelectual exclusiva da equipe criadora. Todos os direitos reservados. O uso de bibliotecas de terceiros respeita as suas respectivas licenças open-source.",
  },
];

export default function TermsUsage() {
  return (
    <LinearGradient
      style={{ flex: 1, paddingBottom: 84, paddingTop: 32 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      colors={["#000000", "#052F5F"]}
    >
      <ScrollView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }} className="px-[16px] gap-12">
          <Header isFirstPage={false} title="TERMOS DE USO" isCitizen={false} />

          <View className=" gap-3">
            <Text className="font-interBold text-[30px] text-white">
              Termos de uso
            </Text>
            <Text className="text-[16px] text-[#94A3B8] font-interLight">
              Leia atentamente os termos de utilização e as políticas de
              privacidade que regem a plataforma.
            </Text>
          </View>

          {termsTitles.map((title, index) => (
            <View key={index} className="flex flex-col gap-6">
              <TermsTitle {...title} />

              {termsContents
                .filter((content) => content.numberSection === title.number)
                .map((content, index) => (
                  <TermsContent key={index} {...content} />
                ))}
            </View>
          ))}
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
}
