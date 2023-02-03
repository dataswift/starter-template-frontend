import { createContext, useContext, useEffect, useState } from "react";
import { DSAuthContextProps, DSAuthProviderProps, DSAuthReturnProps, DSProvideAuthProps } from "./ds-auth-interfaces";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from "expo-linking";

export const DSAuthContext = createContext<DSAuthContextProps>({
    isAuthenticated: false,
    setIsAuthenticated: (value: boolean) => {},
    loginWithRedirect: async (): Promise<void> => {},
    signUpWithRedirect: async (): Promise<void> => {},
});

async function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

export function useDSAuth(): DSAuthReturnProps {

    const [isLoading, setIsLoading] = useState(true);
    const { setIsAuthenticated } = useContext(DSAuthContext);

    const checkToken = async () => {
            setIsLoading(true);
            try {
                const token = await AsyncStorage.getItem("access-token");
                await delay(2000);
                setIsAuthenticated(!!token);
            } catch (error) {
                console.error("Error retrieving token from async storage: ", error);
            } finally {
                setIsLoading(false);
            }
        };

    useEffect(() => {
        console.log("runs on mount");
        checkToken();
    }, []);

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
        loginWithRedirect: useContext(DSAuthContext).loginWithRedirect,
        signUpWithRedirect: useContext(DSAuthContext).signUpWithRedirect,
        logout
    };
}

export function DSAuthProvider({ app_id, redirect_url, children }: DSAuthProviderProps) {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const {
        loginWithRedirect,
        signUpWithRedirect,
    } = useProvideAuth(app_id, redirect_url);

    return (<DSAuthContext.Provider value={{isAuthenticated, setIsAuthenticated, loginWithRedirect, signUpWithRedirect }}>{children}</DSAuthContext.Provider>)
}

export function useProvideAuth(app_id: string, redirect_url: string): DSProvideAuthProps { 

    async function loginWithRedirect() {
        const loginWithRedirectURL = `https://hatters.dataswift.io/services/login?application_id=${app_id}&redirect_uri=${redirect_url}`
        // setIsLoading(true);
        // const result = await WebBrowser.openAuthSessionAsync(loginWithRedirectURL);
        // if (result.type === 'dismiss' && !isAuthenticated) {
        //     setIsLoading(false);
        // }
        Linking.openURL(loginWithRedirectURL);
    }

    async function signUpWithRedirect() {
        const loginWithRedirectURL = `https://hatters.dataswift.io/services/signup?application_id=${app_id}&redirect_uri=${redirect_url}`
        // setIsLoading(true);
        // const result = await WebBrowser.openAuthSessionAsync(loginWithRedirectURL);
        // if (result.type === 'dismiss' && !isAuthenticated) {
        //     setIsLoading(false);
        // }
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
    //     console.log("checked");
    // }, []);

 
   

    // if (Platform.OS === 'android' || Platform.OS === 'ios') {
    //     Linking.addEventListener('url', (event) => {
    //     const { url } = event;

    //     // Parse the URL to get the token
    //     const token = url.match(/token=([^&]+)/)?.[1];

    //     // Store the token in async storage
    //     if (token) {
    //         setIsLoading(true);
    //         AsyncStorage.setItem("access-token", token)
    //             .then(() => {
    //                 setIsAuthenticated(true);
    //             }).then(() => {
    //                 setIsLoading(false);
    //             })
    //       .catch((error) => console.error(error));
    //     }      
    // });
    // }

    return {
        loginWithRedirect,
        signUpWithRedirect,
    }
}