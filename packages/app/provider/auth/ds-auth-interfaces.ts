export interface DSAuthReturnProps {
    isLoading: boolean;
    isAuthenticated: boolean;
    loginWithRedirect: () => void;
    signUpWithRedirect: () => void;
    logout: () => void;
}

export interface DSAuthProviderProps {
    app_id: string;
    redirect_url: string;
    children: React.ReactNode;
}