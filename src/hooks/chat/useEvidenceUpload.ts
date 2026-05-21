import { createEvidences } from "@/services/citizens/createEvidences";
import { useState } from "react";
import Toast from "react-native-toast-message";
import * as DocumentPicker from "expo-document-picker";

export function useEvidenceUpload() {
  const [ocrContent, setOcrContent] = useState<string[]>([]);
  const [fileUri, setFileUri] = useState<string[]>([]);

  const handleSendFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/jpeg", "image/png", "application/pdf"],
      copyToCacheDirectory: true,
    });
    if (result.canceled) return;
    if (fileUri.length >= 3) {
      Toast.show({
        type: "error",
        text1: "Limite de evidências anexadas atingido (3).",
      });
      return;
    } else {
      const file = result.assets[0];
      const response = await createEvidences({ file });

      if (!response.success) {
        Toast.show({ type: "error", text1: response.fields?.[0] });
        return;
      }
      if (!response.data) {
        Toast.show({
          type: "info",
          text1: "Evidência anexada, mas não foi possível extrair o conteúdo.",
        });
        return;
      }
      setFileUri((prev) => [...prev, file.uri]);
      setOcrContent((prev) => [...prev, response.data.ocr_content || ""]);
      Toast.show({ type: "success", text1: "Evidência anexada com sucesso!" });
    }
  };

  return { ocrContent, fileUri, handleSendFile };
}
