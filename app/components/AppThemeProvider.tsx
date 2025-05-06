// app/providers.tsx
'use client';

import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';

export function Providers({ children }: { children: React.ReactNode }) {
    return <ThemeProvider defaultTheme="system" enableSystem={true} attribute="class">
        <Toaster position="top-right" reverseOrder={false} toastOptions={{
            style: {
                background: 'rgba(0, 0, 0, 0.75)',
                color: '#fff',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
            }
        }} />
        {children}
    </ThemeProvider>;
}