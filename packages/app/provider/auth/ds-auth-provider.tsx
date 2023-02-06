import { createContext, useContext, useEffect, useState } from "react";
import { DSAuthContextProps, DSAuthProviderProps, DSAuthReturnProps, DSProvideAuthProps } from "./ds-auth-interfaces";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

export const DSAuthContext = createContext<DSAuthContextProps>({
    app_id: "",
    redirect_url: "",
    isAuthenticated: false,
    setIsAuthenticated: (value: boolean) => {},
});

export function useDSAuth(): DSAuthReturnProps {

    const [isLoading, setIsLoading] = useState(true);
    const { app_id, redirect_url, setIsAuthenticated } = useContext(DSAuthContext);

    const checkToken = async () => {
            setIsLoading(true);
            try {
                const token = await AsyncStorage.getItem("access-token");
                setIsAuthenticated(!!token);
            } catch (error) {
                console.error("Error retrieving token from async storage: ", error);
            } finally {
                setIsLoading(false);
            }
        };

    useEffect(() => {
        checkToken();
    }, []);

    async function loginWithRedirect() {
        const loginWithRedirectURL = `https://hatters.dataswift.io/services/login?application_id=${app_id}&redirect_uri=${redirect_url}`
        const result = await WebBrowser.openAuthSessionAsync(loginWithRedirectURL);
        if (result.type === 'success') {
            const urlParams = new URLSearchParams(new URL(result.url).search);
            const token = urlParams.get('token');
            if (token) {
                await AsyncStorage.setItem("access-token", token);
                setIsAuthenticated(true);
            }
        }
    }

       async function signUpWithRedirect() {
        const loginWithRedirectURL = `https://hatters.dataswift.io/services/signup?application_id=${app_id}&redirect_uri=${redirect_url}`
        const result = await WebBrowser.openAuthSessionAsync(loginWithRedirectURL);
        if (result.type === 'success') {
            const urlParams = new URLSearchParams(new URL(result.url).search);
            const token = urlParams.get('token');
            if (token) {
                await AsyncStorage.setItem("access-token", token);
                setIsAuthenticated(true);
            }
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

    return {
        isLoading,
        isAuthenticated: useContext(DSAuthContext).isAuthenticated,
        loginWithRedirect,
        signUpWithRedirect,
        logout
    };
}

export function DSAuthProvider({ app_id, redirect_url, children }: DSAuthProviderProps) {

    WebBrowser.maybeCompleteAuthSession({skipRedirectCheck: true});

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (<DSAuthContext.Provider value={{app_id, redirect_url, isAuthenticated, setIsAuthenticated}}>{children}</DSAuthContext.Provider>)
}