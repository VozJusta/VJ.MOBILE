export interface ICreateEvidenceRequest {
  file: File;
}

export interface ICreateEvidenceResponse {
  id: string;
  file_url: string;
  ocr_content: string;
  public_id: string;
  citizenId: string;
  createdAt: string;
}