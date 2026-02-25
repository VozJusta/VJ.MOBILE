import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import BackButton from "../../../../ui/BackButton";
import Logo from "../../../../assets/svg/icons/logo.svg"
import { AppInput } from "../../../../ui/input";
import { useState } from "react";
import { ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function Citizen() {
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (

        <LinearGradient
            className="flex-1 pt-[58px]"
            start={{ x: 0, y: 0 }}
            end={{ x: 0.8, y: 1 }}
            colors={["#000000", "#052F5F"]}>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >


                <View className="flex-row justify-between items-center px-4 mb-8">
                    <BackButton />
                    <Logo width={40} height={29} />
                </View>

                <View
                    className="self-center w-[90%] mt-8 flex-col px-4 bg-[#1E293B]/40 border border-[rgba(255,255,255,0.12)] rounded-[24px] gap-6">
                    <View className="flex-col gap-2 mt-12">
                        <Text
                            className="text-white text-[24px] font-interBold ">
                            Cadastro de Cidadão
                        </Text>

                        <Text
                            className="text-[#94A3B8] text-[14px] font-interRegular">
                            Faça seu cadastro profissional para começar a atender cidadãos na plataforma.
                        </Text>
                    </View>

                    <View className="flex-col gap-6">

                        <AppInput
                            label="Nome Completo"
                            placeholder="Nome Completo"
                            type="name"
                            value={name}
                            onChangeText={setName} />

                        <AppInput
                            label="CPF"
                            placeholder="000-000-000-00"
                            type="cpf"
                            value={cpf}
                            onChangeText={setCpf} />

                        <AppInput
                            label="Telefone"
                            placeholder="(00) 00000-0000"
                            type="phone"
                            value={phone}
                            onChangeText={setPhone} />

                        <AppInput
                            label="E-mail"
                            placeholder="email@exemplo.com.br"
                            type="email"
                            value={email}
                            onChangeText={setEmail} />

                        <AppInput
                            label="Senha"
                            placeholder="••••••••"
                            type="password"
                            value={password}
                            onChangeText={setPassword} />
                    </View>
                </View>



            </ScrollView>
        </LinearGradient>
    )
}