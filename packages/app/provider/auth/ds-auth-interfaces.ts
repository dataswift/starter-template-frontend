import React from "react";

export interface DSAuthContextProps {
    app_id: string;
    redirect_url: string;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
    isMobileLoading: boolean;
    setIsMobileLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export interface DSAuthProviderProps {
    app_id: string;
    redirect_url: string;
    children: React.ReactNode;
}
export interface DSAuthReturnProps {
    isLoading: boolean;
    isMobileLoading: boolean;
    isAuthenticated: boolean;
    loginWithRedirect: () => void;
    signUpWithRedirect: () => void;
    logout: () => void;
    getToken: () => Promise<string | null>;
}

export interface DecodedJWT {
    applicationVersion: string;
    sub: string;
    application: string;
    iss: string;
    exp: number;
    iat: number;
    jti: string;
}