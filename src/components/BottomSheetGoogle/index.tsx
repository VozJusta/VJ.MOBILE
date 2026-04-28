import {
  IBottomSheetGoogle,
  IBottomSheetGoogleButtonRoles,
} from "@/interfaces/components/BottomSheetGoogle";
import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import GoogleIcon from "@/assets/svg/icons/Google-Icon.svg";

export const buttonRoles: IBottomSheetGoogleButtonRoles[] = [
  {
    id: "Citizen",
    label: "Cidadão",
    description: "Quero buscar ajuda jurídica e entender meus direitos",
  },
  {
    id: "Lawyer",
    label: "Advogado",
    description:
      "Quero oferecer minha ajuda para pessoas que precisam de assistência jurídica",
  },
];

const SCREEN_HEIGHT = Dimensions.get("window").height;

export function BottomSheetGoogle({
  visible,
  onClose,
  onConfirm,
  selectedRole,
  onSelectRole,
  loading = false,
}: IBottomSheetGoogle) {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          damping: 20,
          stiffness: 180,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: SCREEN_HEIGHT,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onClose}
      animationType="none"
    >
      <Animated.View
        style={[StyleSheet.absoluteFillObject, { opacity: backdropOpacity }]}
        className="bg-black/60"
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>

      <Animated.View
        style={{ transform: [{ translateY }] }}
        className="absolute bottom-0 left-0 right-0 bg-[#0F172A] rounded-t-[24px] px-6 pt-6 pb-10 border border-white/[0.08]"
      >
        <View className="w-10 h-1 bg-white/15 rounded-full self-center mb-5" />

        <Text className="text-white/35 text-[11px] font-semibold tracking-[2px] text-center mb-4">
          COMO VOCÊ QUER ENTRAR?
        </Text>

        {buttonRoles.map((role) => {
          const isSelected = selectedRole === role.id;
          return (
            <TouchableOpacity
              key={role.id}
              onPress={() => onSelectRole(role.id)}
              activeOpacity={0.75}
              className={`flex-row items-center gap-3 rounded-2xl border p-[14px] mb-[10px] ${
                isSelected
                  ? "border-[#60A5FA] bg-[#60A5FA]/[0.08]"
                  : "border-white/[0.08] bg-white/[0.03]"
              }`}
            >
              <View className="flex-1">
                <Text
                  className={`text-[14px] font-medium ${
                    isSelected ? "text-white" : "text-white/60"
                  }`}
                >
                  {role.label}
                </Text>
                <Text className="text-white/30 text-[12px] mt-[2px]">
                  {role.description}
                </Text>
              </View>

              <View
                className={`w-[18px] h-[18px] rounded-full border-[1.5px] items-center justify-center ${
                  isSelected ? "border-[#60A5FA]" : "border-white/20"
                }`}
              >
                {isSelected && (
                  <View className="w-2 h-2 rounded-full bg-[#60A5FA]" />
                )}
              </View>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          onPress={() => onConfirm(selectedRole)}
          disabled={loading}
          activeOpacity={0.85}
          className={`flex-row items-center justify-center gap-[10px] bg-[#60A5FA] rounded-2xl h-14 mt-[6px] ${
            loading ? "opacity-50" : "opacity-100"
          }`}
        >
          <GoogleIcon width={18} height={18} />
          <Text className="text-[#0F172A] text-[15px] font-semibold">
            {loading ? "Aguarde..." : "Continuar com Google"}
          </Text>
        </TouchableOpacity>

        <Text className="text-white/20 text-[11px] text-center mt-[14px]">
          Você poderá alterar seu perfil depois nas configurações
        </Text>
      </Animated.View>
    </Modal>
  );
}
