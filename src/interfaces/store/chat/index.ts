import { IMessageResponse } from "@/interfaces/services/chat/historyConversation";

export interface IChatStore {
    conversationId: string;
    setConversationId: (conversationId: string) => void;
    clearConversationId: () => void;

    caseId: string;
    setCaseId: (caseId: string) => void;
    clearCaseId: () => void;

    finished: boolean;
    setFinished: (finished: boolean) => void;
    clearFinished: () => void;

    messages: IMessageResponse[];
    addMessage: (messages: IMessageResponse) => void;
    setMessages: (messages: IMessageResponse[]) => void;

    clearChat: () => void;
}