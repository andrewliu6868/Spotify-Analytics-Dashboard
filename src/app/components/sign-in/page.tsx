'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function SignInPage(){
    const { status, data: session } = useSession();
    const router = useRouter();

    useEffect(() => {

        if (status === 'authenticated'){
            router.replace('./dashboard')
        }
    }, [status, router]);

    // Loading UI
    if(status === 'loading'){
        return (<div className="p-6 text-white"> Checking session...</div>)
    }else if(status === 'unauthenticated'){
        // Logged out UI
        return(<div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <button onClick={() => signIn('spotify', { callbackUrl: '/dashboard'})} style={{color: 'white', background: 'green', borderRadius: '12px', padding: '15px'}}>
                Sign in with your Spotify 
            </button>
        </div>)

    }
    return(
        <div className="p-6 text-white">
            Signed in as <strong>{session?.user?.name ?? 'User'}</strong>. Redirecting...

            <button className ="ml-4 underline" onClick={() => signOut({ callbackUrl: '/' })}>
                Sign Out
            </button>

        </div>
    )
}