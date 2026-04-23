import { BASE_URL } from "@/settings/BASE_URL";
import { useAccessTokenStorage } from "@/store/auth/token.store";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";

export async function downloadReportAsPdf(reportId: string) {
  const token = useAccessTokenStorage.getState().accessToken;

  try {
    const fileUri = FileSystem.documentDirectory + `relatorio_vozjusta_${reportId}.pdf`;

    const downloadRes = await FileSystem.downloadAsync(
      `${BASE_URL}/report/pdf/${reportId}`,
      fileUri,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/pdf",
        },
      },
    );

    if (downloadRes.status !== 200) {
      return {
        success: false,
        fields:
          downloadRes.status === 404
            ? ["Relatório não encontrado"]
            : ["Erro ao baixar PDF"],
      };
    }

    const isSharingAvailable = await Sharing.isAvailableAsync();

    if (isSharingAvailable) {
      await Sharing.shareAsync(downloadRes.uri, {
        mimeType: "application/pdf",
        dialogTitle: "Compartilhar Relatório PDF",
        UTI: "com.adobe.pdf",
      });
    }

    return {
      success: true,
      data: downloadRes.uri,
    };
  } catch {
    return {
      success: false,
      fields: ["Erro de conexão com o servidor"],
    };
  }
}
