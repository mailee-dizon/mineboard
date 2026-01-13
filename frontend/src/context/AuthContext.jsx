import React, { createContext, useState, useContext } from 'react';
// currently not in use
const AuthContext = createContext();

export function useAuth() {
        return useContext(AuthContext);
}

export function AuthProvider({children}){
    const [user, setUser] = useState(null); 
    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    const value = {
        user, 
        setUser,
        isLoggedIn,
        setIsLoggedIn,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );

}
