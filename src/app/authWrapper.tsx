'use client';

import { SessionProvider } from 'next-auth/react';
import type { PropsWithChildren } from 'react';

export default function AuthWrapper({ children, session } : PropsWithChildren & { session?: any }){
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    
    )
}