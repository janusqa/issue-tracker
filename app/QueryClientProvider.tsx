'use client';

import {
    QueryClient,
    QueryClientProvider as TanstackQueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

interface Props {
    children: React.ReactNode;
}

const QueryClientProvider = ({ children }: Props) => {
    return (
        <TanstackQueryClientProvider client={queryClient}>
            {children}
        </TanstackQueryClientProvider>
    );
};

export default QueryClientProvider;
