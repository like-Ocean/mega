export type ChatMessage = {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
    status?: 'pending' | 'success' | 'error';
  };