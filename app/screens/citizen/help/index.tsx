import { ISettingsSection } from "@/interfaces/template/configTemplate";
import SettingsTemplate from "@/template/settingsTemplate";
import { router } from "expo-router";
import { useMemo } from "react";

export default function HelpCenterScreen() {
	const sections = useMemo<ISettingsSection[]>(
		() => [
			{
				id: "frequent-topics",
				title: "Tópicos frequentes",
				variant: "stacked",
				items: [
					{
						id: "ai-overview",
						type: "link",
						icon: "psychology",
						label: "Como funciona a IA?",
						description: "Tecnologia e precisão jurídica",
						onPress: () => {},
					},
					{
						id: "plans-billing",
						type: "link",
						icon: "account-balance-wallet",
						label: "Planos e Assinaturas",
						description: "Gestão de pagamentos e faturas",
						onPress: () => {},
					},
					{
						id: "process-questions",
						type: "link",
						icon: "gavel",
						label: "Dúvidas sobre Processos",
						description: "Acompanhamento e prazos",
						onPress: () => {},
					},
					{
						id: "security-data",
						type: "link",
						icon: "lock-outline",
						label: "Segurança e Dados",
						description: "Sua privacidade em primeiro lugar",
						onPress: () => {},
					},
					{
						id: "getting-started",
						type: "link",
						icon: "help-outline",
						label: "Primeiros Passos",
						description: "Guia básico para iniciantes",
						onPress: () => {},
					},
				],
			},
		],
		[],
	);

	return (
		<SettingsTemplate
			title="Central de Ajuda"
			templateVariant="help"
			searchPlaceholder="Busque por dúvidas..."
			onBack={() => router.back()}
			sections={sections}
			supportCard={{
				icon: "support-agent",
				title: "Falar com Suporte",
				description: "",
				onPress: () => {},
			}}
		/>
	);
}
