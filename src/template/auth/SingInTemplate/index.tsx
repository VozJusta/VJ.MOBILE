import {
<<<<<<< HEAD
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import Logo from "@/assets/svg/icons/logo.svg";
import GoogleIcon from "@/assets/svg/icons/Google-Icon.svg";
import ButtonUI from "@/ui/ButtonUI";
import { SafeAreaView } from "react-native-safe-area-context";
import Checkbox from "@/ui/CheckboxUI";
import { router } from "expo-router";
import { CareerSelectProps, UfSelectProps } from "@/interfaces/interfaces";
import { useEffect, useRef, useState } from "react";
import UfSelect from "@/ui/UfSelectUI";
import CareerSelect from "@/ui/CareerSelectUI";
import Input from "@/ui/InputUI";
import {
  FieldsType,
  ISignInTemplateProps,
} from "@/interfaces/template/SignInTemplate";
import CheckListFunction from "@/ui/CheckListFunctionUI";



=======
  ScrollView, Text, View,
  Keyboard, TouchableWithoutFeedback,
  Platform, KeyboardAvoidingView, Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRef, useEffect } from "react";
import { ISignInTemplateProps } from "@/interfaces/template/SignInTemplate";
import { CareerSelectProps, UfSelectProps } from "@/interfaces/interfaces";
import Header from "@/components/Header";
import Input from "@/ui/InputUI";
import UfSelect from "@/ui/UfSelectUI";
import CareerSelect from "@/ui/CareerSelectUI";
import ButtonUI from "@/ui/ButtonUI";
import CheckListFunction from "@/ui/CheckListFunctionUI";
import { FieldsType } from "@/interfaces/template/SignInTemplate";
>>>>>>> dfcf6ac563b0c035a575b4b127b0464da17d9308

function isUfField(field: FieldsType): field is UfSelectProps {
  return "onValueChange" in field && !("options" in field);
}

function isCareerField(field: FieldsType): field is CareerSelectProps {
  return "onValueChange" in field && "options" in field;
}

<<<<<<< HEAD
export default function SignInTemplate({ ...props }: ISignInTemplateProps) {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const animatedWidth = useRef(new Animated.Value(0)).current;
  const isLoginLayout = props.layout === "login";
  const sharedContainerWidth = isLoginLayout ? "w-[94%]" : "w-[90%]";
  const showHeader = props.showHeader ?? true;
  const showTerms = props.showTerms ?? true;
  const footerPrefixText = props.footerPrefixText ?? "Já possui registro?";
  const footerActionText = props.footerActionText ?? "Fazer Login";
  const forgotPasswordRoute =
    props.forgotPasswordRoute ?? "/screens/auth/ForgotPassword/Email";

  if (props.onSubmit === undefined) {
    props.onSubmit = () => { }
  }

  useEffect(() => {
    const percentage = props.passwordStrength
      ? (props.passwordStrength.score / 5) * 100
      : 0;

=======
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
>>>>>>> dfcf6ac563b0c035a575b4b127b0464da17d9308
    Animated.timing(animatedWidth, {
      toValue: percentage,
      duration: 300,
      useNativeDriver: false,
    }).start();
<<<<<<< HEAD
  }, [animatedWidth, props.passwordStrength]);

=======
  }, [passwordStrength]);
>>>>>>> dfcf6ac563b0c035a575b4b127b0464da17d9308

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            showsVerticalScrollIndicator={false}
<<<<<<< HEAD
            contentContainerStyle={
              isLoginLayout
                ? {
                  paddingBottom: 40,
                  paddingTop: 24,
                  flexGrow: 1,
                  justifyContent: "center",
                }
                : { paddingBottom: 40 }
            }
          >
            {showHeader && (
              <View
                className={`self-center ${sharedContainerWidth} flex-row justify-between items-center mb-8`}
              >
                <ButtonUI
                  goBack
                  size="h-[40px] w-[40px]"
                  onPress={() => router.replace("/screens/Onboarding/roles")}
                  gradient={false}
                  hover={false} iconLeft={false} paddingButtonStatus={""} />
                <Logo width={40} height={29} />
              </View>
            )}

            <View
              className={`${isLoginLayout
                ? `self-center ${sharedContainerWidth} flex-col px-4 bg-[#1E293B]/40 border border-[rgba(255,255,255,0.12)] rounded-[24px] gap-[24px] py-12`
                : `self-center ${sharedContainerWidth} mt-8 flex-col px-4 bg-[#1E293B]/40 border border-[rgba(255,255,255,0.12)] rounded-[24px] gap-[24px] pt-8 pb-12`
                }`}
            >
              <View className="flex-col gap-2">
                <Text className="text-white text-[24px] font-interBold ">
                  {props.title}
                </Text>

                <Text className="text-[#94A3B8] text-[14px] font-interRegular leading-7">
                  {props.description}
                </Text>
              </View>

              <View
                style={{
                  marginTop: props.descriptionToFieldsSpacing ?? 0,
                  gap: 24,
                  flexDirection: "column",
                }}
              >
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

                  if (isCareerField(field)) {
                    return (
                      <CareerSelect
                        key={index}
                        label={field.label}
                        value={field.value}
                        options={field.options}
                        onValueChange={field.onValueChange}
                      />
                    );
                  }

=======
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
                  if (isUfField(field)) return <UfSelect key={index} {...field} />;
                  if (isCareerField(field)) return <CareerSelect key={index} {...field} />;
>>>>>>> dfcf6ac563b0c035a575b4b127b0464da17d9308
                  return <Input key={index} {...field} />;
                })}
              </View>

<<<<<<< HEAD
              {!!props.passwordStrength && (
                <View className="bg-[#fff]/5 border border-[rgba(255,255,255,0.12)] rounded-[12px] p-[16px] ">
                  <Text className="text-[10px] text-[#94A3B8] pb-[8px] font-inter">
                    Força da Segurança
                  </Text>

=======
              {!!passwordStrength && (
                <View className="bg-[#fff]/5 border border-[rgba(255,255,255,0.12)] rounded-[12px] p-[16px]">
                  <Text className="text-[10px] text-[#94A3B8] pb-[8px] font-inter">
                    Força da Segurança
                  </Text>
>>>>>>> dfcf6ac563b0c035a575b4b127b0464da17d9308
                  <View className="w-full h-3 bg-[#fff]/5 rounded-full mt-1">
                    <Animated.View
                      className="h-full rounded-full"
                      style={{
                        width: animatedWidth.interpolate({
                          inputRange: [0, 100],
                          outputRange: ["0%", "100%"],
                        }),
<<<<<<< HEAD
                        backgroundColor: props.passwordStrength.color,
                      }}
                    />
                  </View>

                  <View className="flex-row gap-[90px] mt-[8px]">
                    <View className="flex-col">
                      {props.passwordStrength.checklist
                        .slice(0, 2)
                        .map((item) => (
                          <CheckListFunction
                            key={item.label}
                            valid={item.valid}
                            label={item.label}
                          />
                        ))}
                    </View>
                    <View className="flex-col">
                      {props.passwordStrength.checklist
                        .slice(2, 4)
                        .map((item) => (
                          <CheckListFunction
                            key={item.label}
                            valid={item.valid}
                            label={item.label}
                          />
                        ))}
=======
                        backgroundColor: passwordStrength.color,
                      }}
                    />
                  </View>
                  <View className="flex-row gap-[90px] mt-[8px]">
                    <View className="flex-col">
                      {passwordStrength.checklist.slice(0, 2).map((item) => (
                        <CheckListFunction key={item.label} {...item} />
                      ))}
                    </View>
                    <View className="flex-col">
                      {passwordStrength.checklist.slice(2, 4).map((item) => (
                        <CheckListFunction key={item.label} {...item} />
                      ))}
>>>>>>> dfcf6ac563b0c035a575b4b127b0464da17d9308
                    </View>
                  </View>
                </View>
              )}

<<<<<<< HEAD
              <View className=" flex-col gap-[24px]">
                {showTerms && (
                  <Checkbox value={acceptedTerms} onChange={setAcceptedTerms}>
                    <Text className="text-[#fff]/40 text-sm font-inter leading-5">
                      Aceito os{" "}
                      <Text
                        className="text-[#fff]/80 underline font-semibold"
                        onPress={() => router.push("/terms")}
                      >
                        Termos de Uso
                      </Text>{" "}
                      e a{" "}
                      <Text
                        className="text-[#fff]/80 underline font-semibold"
                        onPress={() => router.push("/privacy")}
                      >
                        Política de Privacidade
                      </Text>
                    </Text>
                  </Checkbox>
                )}

                {props.showForgotPassword && (
                  <Text
                    className="text-[#60A5FA] text-[12px] font-interBold underline text-right  "
                    onPress={() => router.push(forgotPasswordRoute as any)}
                  >
                    ESQUECI MINHA SENHA
                  </Text>
                )}

                <ButtonUI
                  onPress={props.onSubmit}
                  gradient={true}
                  bg="bg-[#135BEC]"
                  disabled={props.disableSubmit}
                  hover={false}
                  size="w-full h-[56px]"
                  children={<View className="flex-1 justify-center items-center">
                    <Text className="text-[16px] font-interBold text-white text-center">
                      {props.submitLabel}
                    </Text>
                  </View>} iconLeft={false} paddingButtonStatus={""} />

                {props.showSocialGoogle && (
                  <View className="gap-[24px]">
                    <View className="flex-row items-center gap-3">
                      <View className="flex-1 h-[1px] bg-white/10" />
                      <Text className="text-white/40 text-[12px] font-interBold tracking-[2px]">
                        OU ENTRE COM
                      </Text>
                      <View className="flex-1 h-[1px] bg-white/10" />
                    </View>

                    <TouchableOpacity className="w-full h-[56px] rounded-[16px] border border-white/10 bg-[rgba(255,255,255,0.03)] flex-row items-center justify-center gap-3">
                      <GoogleIcon width={20} height={20} />
                      <Text className="text-white text-[14px] font-inter">
                        Google
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
            <View className="items-center mt-8 flex-row w-full justify-center ]">
              <Text className="text-[#64748B] text-[14px] font-interRegular leading-5">
                {footerPrefixText}{" "}
                <Text
                  className={"text-white underline font-interBold"}
                  onPress={
                    props.showForgotPassword
                      ? () => router.push("/screens/Onboarding/roles")
                      : () => router.push("/screens/auth/users/SingIn")
                  }
                >
                  {footerActionText}
                </Text>
              </Text>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

=======
              <View className="flex-col gap-[24px]">
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
>>>>>>> dfcf6ac563b0c035a575b4b127b0464da17d9308
    </SafeAreaView>
  );
}