import { createBrowserRouter } from 'react-router-dom';
import { ChatInterface } from '@/components/ChatInterface/ChatInterface';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <ChatInterface />,
    },
]);
