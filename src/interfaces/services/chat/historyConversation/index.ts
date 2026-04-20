export interface IMessageResponse {
    id: string;
    role: "User" | "Assistant";
    content: string;
    created_at: string;
} 

export interface IHistoryConversationResponse {
    messages: IMessageResponse[];
}