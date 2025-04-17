import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/components/MainLayout';
import { ChatInterface } from '@/components/chat/ChatInterface';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <ChatInterface />,
            },
        ],
    },
]);
