import { create } from 'zustand';
import { createSelectors } from '@/helpers/createSelectors';
import { ChatMessage } from '@/types/chat';

interface ChatState {
    messages: ChatMessage[];
}

interface ChatActions {
    addMessage: (message: ChatMessage) => void;
    updateMessage: (id: string, updates: Partial<ChatMessage>) => void;
    clearMessages: () => void;
}

export const useChatStoreBase = create<ChatState & ChatActions>((set) => ({
    messages: [],
    addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
    updateMessage: (id, updates) =>
        set((state) => ({
            messages: state.messages.map((msg) => (msg.id === id ? { ...msg, ...updates } : msg)),
        })),
    clearMessages: () => set({ messages: [] }),
}));

export const useChatStore = createSelectors(useChatStoreBase);
