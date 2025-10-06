'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const DashboardPage = () => {
    const { status, data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if(status === 'unauthenticated'){
            router.replace('/auth/sign-in');
        }
    }, [status, router]);


    if(status === 'loading'){
        return(
            <div>
                Loading your personalized dashboard...
            </div>
        );
    }

    return (
        <div>
            Dashboard Page! Nice to meet you {session?.user?.name ?? 'signed in user'}!
        </div>
    )
}

export default DashboardPage;