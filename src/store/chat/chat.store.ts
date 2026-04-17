import { IChatStore } from "@/interfaces/store/chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { finished } from "node:stream";
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
            clearFinished: () => set({ finished: false})
        }),
        {
            name: "chat",
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
)