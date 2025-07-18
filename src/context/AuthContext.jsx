import { createContext, useState } from 'react';

export const AuthContext = createContext(); 

export function AuthProvider({ children }) { 
    const [user, setUser] = useState(null);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const login = (username) => {
        const token = `fake-token-${username}`;
        localStorage.setItem('authToken', token);
        setUser(username);
    };
    
    const logout = () => {
        setIsLoggingOut(true);
        localStorage.removeItem('authToken');
        setUser(null);
    };
    
    return (
        <AuthContext.Provider value={{ user, login, logout, isLoggingOut }}>
            {children}
        </AuthContext.Provider>
    );
}
