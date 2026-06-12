'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getToken } from '@/lib/auth';

export function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  useEffect(()=>{
    const token = getToken();
    if(!token){
      router.push('/login');
    }
  },[router]);

  return children;
}