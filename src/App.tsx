import { RouterProvider } from 'react-router-dom';
import { App as AntApp } from 'antd';
import { router } from './router/AppRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <AntApp notification={{ placement: 'bottomRight' }}>
                <RouterProvider router={router} />
            </AntApp>
        </QueryClientProvider>
    );
};
