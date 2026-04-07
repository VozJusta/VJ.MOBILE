import Logo from "@/assets/svg/icons/logo.svg";
import ButtonUI from "@/ui/ButtonUI";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type EditableFieldProps = {
	label: string;
	value: string;
	onChangeText: (text: string) => void;
	keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
};

type ReadonlyFieldProps = {
	label: string;
	value: string;
};

function EditableField({ label, value, onChangeText, keyboardType = "default" }: EditableFieldProps) {
	return (
		<View className="w-full h-[77px] rounded-[28px] border border-[#1C4A84]/45 bg-[rgba(7,23,45,0.62)] p-[16px]">
			<Text className="text-[10px] font-interBold uppercase tracking-[2px] text-[#7E93B2]">{label}</Text>
			<TextInput
				value={value}
				onChangeText={onChangeText}
				keyboardType={keyboardType}
				placeholderTextColor="#7E93B2"
				className="mt-[4px] text-[16px] text-[#E5EEF9] font-interRegular"
			/>
		</View>
	);
}

function ReadonlyField({ label, value }: ReadonlyFieldProps) {
	return (
		<View className="w-full h-[77px] rounded-[28px] border border-[#1C4A84]/45 bg-[rgba(7,23,45,0.62)] p-[16px]">
			<Text className="text-[10px] font-interBold uppercase tracking-[2px] text-[#7E93B2]">{label}</Text>
			<Text className="mt-[4px] text-[16px] text-[#E5EEF9] font-interRegular">{value}</Text>
		</View>
	);
}

export default function MyDataScreen() {
	const [fullName, setFullName] = useState("Ricardo Oliveira Silva");
	const [phone, setPhone] = useState("(11) 98765-4321");

	const fixedData = useMemo(
		() => ({
			cpf: "123.456.789-00",
			email: "ricardo.silva@exemplo.com",
		}),
		[],
	);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingHorizontal: 16,
					paddingTop: 6,
					paddingBottom: 24,
				}}
			>
				<View className="flex-row items-center justify-between pb-[22px]">
					<ButtonUI
						goBack
						size="h-[40px] w-[40px]"
						onPress={() => router.back()}
						gradient={false}
						hover={false}
						iconLeft={false}
						paddingButtonStatus={""}
					/>

					<Text className="text-[14px] uppercase tracking-[1.8px] text-[#CFDAEA] font-interMedium">Meus Dados</Text>

					<Logo width={40} height={29} />
				</View>

				<View className="items-center pb-[22px]">
					<View
						className="w-[122px] h-[122px] rounded-full border-[3px] border-[#227BF0] items-center justify-center bg-[#E9EEF4]"
						style={{
							shadowColor: "#1B6EE5",
							shadowOpacity: 0.45,
							shadowRadius: 14,
							shadowOffset: { width: 0, height: 0 },
							elevation: 12,
						}}
					>
						<MaterialIcons name="person" size={82} color="#4B5563" />
					</View>

					<Pressable className="w-[36px] h-[36px] rounded-full bg-[#1560CE] border border-[#2E83F8] items-center justify-center mt-[-24px] ml-[92px]">
						<MaterialIcons name="edit" size={18} color="#FFFFFF" />
					</Pressable>

					<Text className="mt-[12px] text-[#EAF2FF] text-[34px] font-interBold">Ricardo Oliveira</Text>

					<View className="mt-[8px] px-[12px] py-[3px] rounded-full border border-[#2D74D7]/50 bg-[rgba(23,90,187,0.3)]">
						<Text className="text-[#3F9EFF] text-[10px] uppercase tracking-[1.5px] font-interBold">Membro Premium</Text>
					</View>
				</View>

			<View className="gap-[16px] pb-[18px]">
				<EditableField label="Nome Completo" value={fullName} onChangeText={setFullName} />

				<ReadonlyField label="CPF" value={fixedData.cpf} />

					<ReadonlyField label="E-mail" value={fixedData.email} />

					<EditableField
						label="Telefone"
						value={phone}
						onChangeText={setPhone}
						keyboardType="phone-pad"
					/>
				</View>

				<ButtonUI
					onPress={() => {}}
					gradient
					hover={false}
					iconLeft={false}
					paddingButtonStatus={""}
				>
					<View className="w-full h-full items-center justify-center">
						<Text className="text-white text-[17px] font-interSemiBold">Salvar alterações</Text>
					</View>
				</ButtonUI>
			</ScrollView>
		</SafeAreaView>
	);
}
