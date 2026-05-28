export interface IMessageResponse {
    id: string;
    role: "User" | "Assistant";
    content: string;
    created_at: string;
    uri?: string[];
    fileTypes?: string[];
} 

export interface IHistoryConversationResponse {
    messages: IMessageResponse[];
}