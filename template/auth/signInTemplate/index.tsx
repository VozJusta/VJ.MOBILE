import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Logo from "../../../assets/svg/icons/logo.svg";
import BackButton from "../../../ui/BackButton";
import { Checkbox } from "../../../ui/checkbox";
import { router } from "expo-router";
import { UfSelectProps } from "../../../interfaces/interfaces";
import Button from "../../../ui/Button";
import { useState } from "react";
import UfSelect from "../../../ui/ufSelect/ufSelect";
import Input from "../../../ui/input";
import { FieldsType, ISignInTemplateProps } from "../../../interfaces/template/SignInTemplate";



function isUfField(field: FieldsType): field is UfSelectProps {
  return "onValueChange" in field;
}

export default function SignInTemplate({...props} : ISignInTemplateProps) {
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  return (
    <LinearGradient
      className="flex-1 pt-[58px] overflow-hidden"
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      colors={["#000000", "#052F5F"]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="flex-row justify-between items-center px-4 mb-8">
          <BackButton />
          <Logo width={40} height={29} />
        </View>

        <View className="self-center w-[90%] mt-8 flex-col px-4 bg-[#1E293B]/40 border border-[rgba(255,255,255,0.12)] rounded-[24px] gap-[24px] py-11">
          <View className="flex-col gap-2">
            <Text className="text-white text-[24px] font-interBold ">
             {props.title}
            </Text>

            <Text className="text-[#94A3B8] text-[14px] font-interRegular leading-7">
              {props.description}
            </Text>
          </View>

          <View>
            {props.fields.map((field, index) => {
              if (isUfField(field)) {
                return (
                  <UfSelect
                    key={index}
                    label={field.label}
                    value={field.value}
                    onValueChange={field.onValueChange}
                  />
                );
              }

              return <Input key={index} {...field} />;
            })}

          </View>

          <View className=" flex-col gap-6">
              <Checkbox value={acceptedTerms} onChange={setAcceptedTerms}>
                <Text className="text-[#fff]/40 text-sm font-inter leading-5">
                  Aceito os{" "}
                  <Text
                    className="text-blue-500 underline font-semibold"
                    onPress={() => router.push("/terms")}
                  >
                    Termos de Uso
                  </Text>{" "}
                  e a{" "}
                  <Text
                    className="text-blue-500 underline font-semibold"
                    onPress={() => router.push("/privacy")}
                  >
                    Política de Privacidade
                  </Text>
                </Text>
              </Checkbox>
              
                <Button
                  onPress={() => {}}
                  gradient={true}
                  bg="bg-[#135BEC]"
                  hover={false}
                  size="w-full h-[56px]"
                  children={
                    <Text className="text-[16px] font-interBold text-white text-center">
                      Continuar
                    </Text>
                  }
                />
            </View>
        </View>
        <View className="items-center mt-8">
          <Text className="text-[#fff]/40 text-sm font-inter leading-5">
            Já tem uma conta?{" "}
            <Text
              className="text-blue-500 underline font-semibold"
              onPress={() => router.push("/login")}
            >
              Faça Login
            </Text>{" "}
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
