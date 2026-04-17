export interface IStartConversationRequest {
    message: string;
}

export interface IStartConversationResponse {
    conversationId: string;
    caseId: string;
    question: string;
    finished: boolean;
}