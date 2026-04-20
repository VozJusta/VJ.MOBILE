export interface IReportDetails {
    id: string;
    transcription: string;
    simplified_explanation: string;
    legal_analysis: string;
    category_detected: string;
    status: string;
    evidence: string[];
    lawyer: ILaywerInformations;    
}

export interface ILaywerInformations {
    full_name: string;
    bio: string;
    phone: string;
    email: string;
}