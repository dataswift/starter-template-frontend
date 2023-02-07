import { useDSAuth } from 'app/provider/auth/ds-auth-provider';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { SplashScreen } from 'app/features/sign-in/splash-screen';

interface RouteGuardProps {
  children: React.ReactNode;
  publicPaths?: string[];
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children, publicPaths = [] }) => {
  const router = useRouter();
  const { pathname } = router;
  const { isLoading, isAuthenticated } = useDSAuth();

  useEffect(() => {
    if (publicPaths.includes(pathname)) {
      return;
    }

    //if not authenticated, redirect to sign-in page
    if (!isLoading && !isAuthenticated) {
      router.push('/sign-in');
      return;
    }
      
    //redirect to home from sign-in
    if (!isLoading && isAuthenticated && pathname === "/sign-in") {
      router.push("/");
      return;
    }

  }, [isAuthenticated, isLoading, pathname]);
    
  if (isLoading) {
    return <SplashScreen />
  }

  return <>{children}</>;
};

export default RouteGuard;