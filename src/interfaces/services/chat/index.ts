export interface IConversationResponse {
  conversationId: string;
  caseId: string;
  question: string;
  finished: boolean;
  reportId?: string;
}
