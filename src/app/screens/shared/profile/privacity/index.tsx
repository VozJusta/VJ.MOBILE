
import { ISettingsSection } from "@/interfaces/template/configTemplate";
import SettingsTemplate from "@/template/settingsTemplate/index";
import { router } from "expo-router";
import { useMemo, useState } from "react";

export default function PrivacySettings() {
	const [isPartnerSharingEnabled, setIsPartnerSharingEnabled] = useState(true);

	const sections = useMemo<ISettingsSection[]>(
		() => [
			{
				id: "access-settings",
				title: "Configurações de acesso",
				variant: "stacked",
				items: [
					{
						id: "partner-sharing",
						type: "switch",
						icon: "group",
						label: "Compartilhamento",
						description: "Permitir que advogados parceiros visualizem seus documentos básicos para pré-análise jurídica.",
						value: isPartnerSharingEnabled,
						onValueChange: setIsPartnerSharingEnabled,
					},
				],
			},
			{
				id: "active-protection",
				title: "Proteção ativa",
				variant: "stacked",
				items: [
					{
						id: "end-to-end-encryption",
						type: "info",
						icon: "verified-user",
						label: "Criptografia de Ponta a Ponta",
						description: "Seus dados são protegidos por criptografia AES-256 em repouso e TLS em trânsito.",
					},
				],
			},
		],
		[isPartnerSharingEnabled],
	);

	return (
		<SettingsTemplate
			title="Privacidade"
			templateVariant="privacy"
			description="Controle suas preferências de privacidade e proteja seus dados de acordo com os padrões LGPD de segurança."
			onBack={() => router.back()}
			sections={sections}
			dangerCard={{
				title: "Zona de Perigo",
				description:
					"Ao excluir sua conta, todos os seus dados e documentos serão permanentemente removidos dos nossos servidores. Esta ação é irreversível conforme o RNF07 da LGPD.",
				buttonLabel: "Excluir Conta",
				icon: "warning",
				onPress: () => router.push("/screens/shared/terminate-account"),
			}}
		/>
	);
}