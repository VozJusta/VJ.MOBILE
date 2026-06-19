import { IChatStore } from "@/interfaces/store/chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useChatStorage = create<IChatStore>()(
  persist(
    (set) => ({
      conversationId: "",
      setConversationId: (conversationId) => set({ conversationId }),
      clearConversationId: () => set({ conversationId: "" }),

      caseId: "",
      setCaseId: (caseId) => set({ caseId }),
      clearCaseId: () => set({ caseId: "" }),

      finished: false,
      setFinished: (finished) => set({ finished }),
      clearFinished: () => set({ finished: false }),

      messages: [],
      addMessage: (messages) =>
        set((state) => ({ messages: [...state.messages, messages] })),
      removeMessage: (id) =>
        set((state) => ({
          messages: state.messages.filter((m) => m.id !== id),
        })),
      setMessages: (messages) => set({ messages }),

      reportId: "",
      setReportId: (reportId) => set({ reportId }),
      clearReportId: () => set({ reportId: "" }),

      uri: [],
      setUri: (uri) => set({ uri }),
      clearUri: () => set({ uri: [] }),

      filesTypes: [],
      setFilesTypes: (filesTypes) => set({ filesTypes }),
      clearFilesTypes: () => set({ filesTypes: [] }),

      clearChat: () =>
        set({
          conversationId: "",
          caseId: "",
          finished: false,
          messages: [],
          reportId: "",
          uri: [],
          filesTypes: [],
        }),
    }),
    {
      name: "chat",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
