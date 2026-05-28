import { IEvidences } from "@/interfaces/components/Evidences";
import ButtonUI from "@/ui/ButtonUI";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Image } from "react-native";

export function Evidences({
  uri,
  index,
  fileTypes,
  removeEvidence,
  size,
}: IEvidences) {
  if (!uri) return null;
  if (!fileTypes || !fileTypes[index]) return null;
  if (fileTypes[index].startsWith("image/")) {
    return (
      <ButtonUI key={index} onPress={() => removeEvidence(index)}>
        <Image
          source={{ uri: uri}}
          className={`${size} object-cover rounded-lg mb-5`}
        />
      </ButtonUI>
    );
  } else if (fileTypes[index] === "application/pdf") {
    return (
      <ButtonUI key={index} onPress={() => removeEvidence(index)}>
        <View
          className={`${size} bg-black/30 rounded-[24px] mb-5 flex items-center justify-center`}
        >
          <MaterialCommunityIcons name="file-pdf-box" size={30} color="red" />
        </View>
      </ButtonUI>
    );
  }
}
