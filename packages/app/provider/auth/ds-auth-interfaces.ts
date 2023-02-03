import React from "react";

export interface DSAuthContextProps {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
    loginWithRedirect: () => void;
    signUpWithRedirect: () => void;
}

export interface DSAuthProviderProps {
    app_id: string;
    redirect_url: string;
    children: React.ReactNode;
}
export interface DSAuthReturnProps {
    isLoading: boolean;
    isAuthenticated: boolean;
    loginWithRedirect: () => void;
    signUpWithRedirect: () => void;
    logout: () => void;
}

export interface DSProvideAuthProps {
    loginWithRedirect: () => void;
    signUpWithRedirect: () => void;
}