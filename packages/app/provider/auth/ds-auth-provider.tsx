import { createContext, useContext, useEffect, useState } from "react";
import { DSAuthProviderProps, DSAuthReturnProps } from "./ds-auth-interfaces";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from "expo-linking";
import * as WebBrowser from 'expo-web-browser';

export const DSAuthContext = createContext<DSAuthReturnProps>({
    isLoading: false,
    isAuthenticated: false,
    loginWithRedirect: async (): Promise<void> => {},
    signUpWithRedirect: async (): Promise<void> => {},
    logout: async (): Promise<void> => {}
});

export function useDSAuth(): DSAuthReturnProps {
    return useContext(DSAuthContext);
}

export function DSAuthProvider({ app_id, redirect_url, children }: DSAuthProviderProps) {
    const { isLoading,
        isAuthenticated,
        loginWithRedirect,
        signUpWithRedirect,
        logout
    } = useProvideAuth(app_id, redirect_url);
    return (<DSAuthContext.Provider value={{ isLoading, isAuthenticated, loginWithRedirect, signUpWithRedirect, logout }}>{children}</DSAuthContext.Provider>)
}

export function useProvideAuth(app_id: string, redirect_url: string): DSAuthReturnProps { 
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    async function loginWithRedirect() {
        const loginWithRedirectURL = `https://hatters.dataswift.io/services/login?application_id=${app_id}&redirect_uri=${redirect_url}`
        setIsLoading(true);
        const result = await WebBrowser.openAuthSessionAsync(loginWithRedirectURL);
        if (result.type === 'dismiss' && !isAuthenticated) {
            setIsLoading(false);
        }
    }

    async function signUpWithRedirect() {
        const loginWithRedirectURL = `https://hatters.dataswift.io/services/signup?application_id=${app_id}&redirect_uri=${redirect_url}`
        setIsLoading(true);
        const result = await WebBrowser.openAuthSessionAsync(loginWithRedirectURL);
        if (result.type === 'dismiss' && !isAuthenticated) {
            setIsLoading(false);
        }
    }

    async function logout() {
        try {
            await AsyncStorage.removeItem("access-token");
            setIsAuthenticated(false);
        } catch (error) {
            console.error("Error removing token from async storage: ", error);
        }
    }


    //below useEffect hook not necessary for Expo app
    // useEffect(() => {
        
    //     async function checkToken() {
    //         setIsLoading(true);
    //         try {
    //             const token = await AsyncStorage.getItem("access-token");
    //             if (token) {
    //                 setIsAuthenticated(true);
                    
    //             } else {
    //                 setIsAuthenticated(false);
    //             }
    //         }
    //         catch (error) {
    //             console.error("Error retrieving token from async storage: ", error);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     }
    //     checkToken();
    // }, []);

    Linking.addEventListener('url', (event) => {
        const { url } = event;

        // Parse the URL to get the token
        const token = url.match(/token=([^&]+)/)?.[1];

        // Store the token in async storage
        if (token) {
            setIsLoading(true);
            AsyncStorage.setItem("access-token", token)
                .then(() => {
                    setIsAuthenticated(true);
                }).then(() => {
                    setIsLoading(false);
                })
          .catch((error) => console.error(error));
        }      
    });

    return {
        isLoading,
        isAuthenticated,
        loginWithRedirect,
        signUpWithRedirect,
        logout,
    }
}