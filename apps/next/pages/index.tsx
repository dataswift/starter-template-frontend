import { HomeScreen } from 'app/features/home/screen'
import React from 'react';

import { SignInScreen } from "app/features/sign-in/sign-in-screen";
import { SplashScreen } from "app/features/sign-in/splash-screen";
import { useDSAuth } from "app/provider/auth/ds-auth-provider";
import { useRouter } from "next/router";
import UserDetailScreen from './user/[id]';

export function NextNavigation() {
    const router = useRouter();
    const { isLoading, isAuthenticated } = useDSAuth();

    //to-do - fix routing, because if I navigate to user/fernando I'm not automatically redirected to the sign-in screen

    if (isLoading) {
        return <SplashScreen />;
    }
    return (
        <>
        {isAuthenticated ? (
            <>
            <HomeScreen />
            {router.pathname === '/user-detail' && <UserDetailScreen />}
            </>
        ) : (
            <SignInScreen />
        )}
        </>
    );
}

export default NextNavigation;

