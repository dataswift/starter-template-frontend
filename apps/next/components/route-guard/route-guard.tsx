import { useDSAuth } from 'app/provider/auth/ds-auth-provider';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { SplashScreen } from 'app/features/sign-in/splash-screen';
import NavigationScaffold from '../navigation/navigation-scaffold';
import { PageList } from '../navigation/page-list';

interface RouteGuardProps {
  children: React.ReactNode;
  publicPaths?: string[];
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;
  const { isLoading, isAuthenticated } = useDSAuth();

  const publicPageHrefs = PageList.filter(page => !page.private).map(page => page.href);

  useEffect(() => {
    if (publicPageHrefs.includes(pathname) && pathname !== "/sign-in") {
      return;
    }

     //redirect to home from sign-in
    if (!isLoading && isAuthenticated && pathname === "/sign-in") {
      router.push("/");
      return;
    }

    //if not authenticated, redirect to sign-in page
    if (!isLoading && !isAuthenticated) {
     const redirect = async () => {
      await delay(2000); // Delay induced for testing purposes
      router.push('/sign-in');
    };
    redirect();
    return;
    }
      
   

  }, [isAuthenticated, isLoading, pathname]);
    
  if (isLoading) {
    return <SplashScreen />
  }

  return (
    <>
      <NavigationScaffold>
        {children}
      </NavigationScaffold>
    </>
  );
};

export default RouteGuard;