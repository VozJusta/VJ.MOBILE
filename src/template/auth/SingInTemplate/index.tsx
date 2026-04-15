import {
  ScrollView,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRef, useEffect } from "react";
import { ISignInTemplateProps } from "@/interfaces/template/SignInTemplate";
import Header from "@/components/Header";
import Input from "@/ui/InputUI";
import UfSelect from "@/ui/UfSelectUI";
import CareerSelect from "@/ui/CareerSelectUI";
import ButtonUI from "@/ui/ButtonUI";
import CheckListFunction from "@/ui/CheckListFunctionUI";
import { FieldsType } from "@/interfaces/template/SignInTemplate";
import { UfSelectProps } from "@/interfaces/ui/SelectUIProps/ufSelect";
import { CareerSelectProps } from "@/interfaces/ui/SelectUIProps/careerSelect";

function isUfField(field: FieldsType): field is UfSelectProps {
  return "onValueChange" in field && !("options" in field);
}

function isCareerField(field: FieldsType): field is CareerSelectProps {
  return "onValueChange" in field && "options" in field;
}

export default function SignInTemplate({
  title,
  description,
  fields,
  onSubmit,
  submitLabel,
  disableSubmit,
  passwordStrength,
  extraActions,
  footer,
}: ISignInTemplateProps) {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const percentage = passwordStrength
      ? (passwordStrength.score / 5) * 100
      : 0;
    Animated.timing(animatedWidth, {
      toValue: percentage,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [passwordStrength]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 40,
              paddingTop: 32,
              paddingHorizontal: 16,
              flexGrow: 1,
            }}
          >
            <Header isFirstPage={false} title={title.toUpperCase()} />

            <View className="self-center w-full mt-8 px-4 bg-[#1E293B]/40 border border-[rgba(255,255,255,0.12)] rounded-[24px] gap-[24px] py-12">
              <View className="flex-col gap-2">
                <Text className="text-white text-[24px] font-interBold">
                  {title}
                </Text>
                <Text className="text-[#94A3B8] text-[14px] font-interRegular leading-7">
                  {description}
                </Text>
              </View>

              <View style={{ gap: 24, flexDirection: "column" }}>
                {fields.map((field, index) => {
                  if (isUfField(field))
                    return <UfSelect key={index} {...field} />;
                  if (isCareerField(field))
                    return <CareerSelect key={index} {...field} />;
                  return <Input key={index} {...field} />;
                })}
              </View>

              {!!passwordStrength && (
                <View className="bg-[#fff]/5 border border-[rgba(255,255,255,0.12)] rounded-[12px] p-[16px]">
                  <Text className="text-[10px] text-[#94A3B8] pb-[8px] font-inter">
                    Força da Segurança
                  </Text>
                  <View className="w-full h-3 bg-[#fff]/5 rounded-full mt-1">
                    <Animated.View
                      className="h-full rounded-full"
                      style={{
                        width: animatedWidth.interpolate({
                          inputRange: [0, 100],
                          outputRange: ["0%", "100%"],
                        }),
                        backgroundColor: passwordStrength.color,
                      }}
                    />
                  </View>
                  <View className="flex-row gap-[90px] mt-[8px]">
                    <View className="flex-col">
                      {passwordStrength.checklist.slice(0, 3).map((item) => (
                        <CheckListFunction key={item.label} {...item} />
                      ))}
                    </View>
                    <View className="flex-col">
                      {passwordStrength.checklist.slice(3).map((item) => (
                        <CheckListFunction key={item.label} {...item} />
                      ))}
                    </View>
                  </View>
                </View>
              )}

              <View className="flex-col gap-[24px]">
                {title.includes("Cadastro") ? (
                  <>
                    {extraActions}
                    <ButtonUI
                      onPress={onSubmit}
                      gradient
                      bg="bg-[#135BEC]"
                      disabled={disableSubmit}
                      hover={false}
                      size="w-full h-[56px]"
                      iconLeft={false}
                      paddingButtonStatus=""
                    >
                      <View className="flex-1 justify-center items-center">
                        <Text className="text-[16px] font-interBold text-white text-center">
                          {submitLabel}
                        </Text>
                      </View>
                    </ButtonUI>
                  </>
                ) : (
                  <>
                    <ButtonUI
                      onPress={onSubmit}
                      gradient
                      bg="bg-[#135BEC]"
                      disabled={disableSubmit}
                      hover={false}
                      size="w-full h-[56px]"
                      iconLeft={false}
                      paddingButtonStatus=""
                    >
                      <View className="flex-1 justify-center items-center">
                        <Text className="text-[16px] font-interBold text-white text-center">
                          {submitLabel}
                        </Text>
                      </View>
                    </ButtonUI>
                    {extraActions}
                  </>
                )}
              </View>
            </View>

            {footer && (
              <View className="items-center mt-8 flex-row w-full justify-center">
                {footer}
              </View>
            )}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
