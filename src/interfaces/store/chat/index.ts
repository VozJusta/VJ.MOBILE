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
}