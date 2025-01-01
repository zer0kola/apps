'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { createBrowserSupabaseClient } from '../supabase/client';

export function AuthProvider({
  accessToken,
  children,
}: {
  accessToken: string;
  children: React.ReactNode;
}) {
  const supabase = createBrowserSupabaseClient();
  const router = useRouter();

  // 인증 상태 변경 시 리프레시
  useEffect(() => {
    const {
      data: { subscription: authListner },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== accessToken) {
        router.refresh();
      }
    });

    return () => {
      authListner.unsubscribe();
    };
  }, [accessToken, supabase, router]);

  return children;
}
