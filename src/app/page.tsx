'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {

  const { status } = useSession();
  const router = useRouter();

  useEffect( () => {
    if(status === 'authenticated'){
      router.replace('/dashboard');
    }
  }, [status,router]);

  if( status === 'loading'){
    return (
    <div>
      Loading...
    </div>);
  }
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">

    </div>
  );
}
