import { LinearGradient } from "expo-linear-gradient";
import { Pressable, TouchableOpacity, View, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { IButtonProps } from "../../interfaces/ui/ButtonUI";

export default function ButtonUI({
  goNext = false,
  goBack = false,
  iconLeft = false,
  ...props
}: IButtonProps) {
  const NavigationsButton = goNext || goBack


  if (NavigationsButton) {
    return (
      <TouchableOpacity
        className={`
         ${props.size} 
         ${goNext ? "bg-BlueAzure" : "bg-white/5 border border-solid border-white/10"}  
         rounded-full justify-center items-center `}
        onPress={props.onPress}
        style={
          goNext && {
            shadowColor: "#1E3A8A",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 8,
            marginRight: 16,
          }
        }
      >
        <MaterialIcons name={`${goNext ? "chevron-right" : "keyboard-arrow-left"}`} size={24} color="#fff" />
      </TouchableOpacity>
    )
  }


  if (props.gradient) {
    return (
      <LinearGradient
        className={`w-full h-[56px] overflow-hidden rounded-[16px]`}
        style={{
          borderRadius: 16,
          shadowColor: "#135BEC",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.4,
          shadowRadius: 15,
          elevation: 8,
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#135BEC", "#0A44B8"]}
      >
        <Pressable onPress={props.onPress} className={`w-full h-[56px]`}>
          {props.children}
        </Pressable>
      </LinearGradient>
    )
  }

  if (iconLeft) {
    const status = props.status
    const statusColor = status === "Em Análise" ? "bg-[#F97316]" : status === "Concluído" ? "bg-[#22C55E]" : "bg-[#3B82F6]"
    const statusBorder = props.status === "Em Análise" ? "border-[rgba(249,115,22,0.2)]" : props.status === "Concluído" ? "border-[rgba(34,197,94,0.2)]" : "border-[rgba(37,99,235,0.2)]"
    const statusBorderBg = props.status === "Em Análise" ? "bg-[rgba(249,115,22,0.1)] border border-solid border-[rgba(249,115,22,0.2)]" : props.status === "Concluído" ? "bg-[rgba(59,130,246,0.1)] border border-solid border-[rgba(59,130,246,0.2)]" : "bg-[rgba(34,197,94,0.1)] border border-solid border-[rgba(34,197,94,0.2)]"
    return (
      <Pressable
        onPress={props.onPress}
        className={` ${props.paddingButtonStatus} rounded-[20px] bg-[rgba(255,255,255,0.03)] border border-solid border-[rgba(255,255,255,0.1)] ${props.size} `}
      >
        <View className="w-full flex-row justify-between items-center">
          <View className="flex-row gap-[16px] items-center">
            <View
              className={`py-[11px] px-[11px] gap-[8px] items-center rounded-[12px] ${statusBorderBg}`}
            >
              <MaterialIcons name="verified-user" size={24} />
            </View>
            <View className="flex-col gap-[2px]">
              <Text>{props.children}</Text>
              {props.statusBorder ? (
                <View
                  style={{
                    boxShadow: `0px 0px 10px ${statusBorder}`,
                  }}
                  className={`py-[4px] px-[10px] gap-[8px] flex-row items-center ${statusBorderBg}`}
                >
                  <View
                    className={`min-w-[6px] min-h-[6px] ${statusColor}`}
                  ></View>

                  <Text
                    className={` font-interBold text-[9px] ${props.status === "Em Análise" ? "text-[#FB923C] " : props.status === "Aguardando Advogado" ? "text-[#60A5FA]" : "text-[#4ADE80]"}`}
                  >
                    {props.status}
                  </Text>
                </View>
              )
                : (
                  <View className="gap-[8px] items-center flex-row">
                    <View
                      className={`min-w-[6px] min-h-[6px] rounded-full ${statusColor}`}
                    ></View>

                    <Text
                      className={` font-interBold text-[9px] ${props.status === "Em Análise" ? "text-[#FB923C] " : props.status === "Aguardando Advogado" ? "text-[#60A5FA]" : "text-[#4ADE80]"}`}
                    >
                      {props.status}
                    </Text>
                  </View>
                )
              }
            </View>
          </View>
          <MaterialIcons
            name="arrow-forward"
            size={14}
          />
        </View>
      </Pressable >
    )
  }
  return (
    <Pressable
      onPress={props.onPress}
      className={` rounded-[20px] ${props.border} ${props.size || ""} ${props.hover ? ` ${props.active ? "" : "border border-[rgba(255,255,255,0.12)]"} ${props.active ? "bg-white" : "bg-[rgba(255,255,255,0.06)]"}` : ""} ${props.bg}`}
    >
      {props.children}
    </Pressable>
  )
}
