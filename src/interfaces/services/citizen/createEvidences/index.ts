import * as DocumentPicker from "expo-document-picker";

export interface  ICreateEvidenceRequest {
  file: DocumentPicker.DocumentPickerAsset;
}

export interface ICreateEvidenceResponse {
  id: string;
  file_url: string;
  ocr_content: string;
  public_id: string;
  citizenId: string;
  createdAt: string;
}