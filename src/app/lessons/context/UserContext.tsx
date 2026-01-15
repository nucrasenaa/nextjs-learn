'use client';

import { createContext, useState, useContext, ReactNode } from 'react';

// 1. Define the shape of our context
interface UserContextType {
    user: string | null;
    login: () => void;
    logout: () => void;
}

// 2. Create the Context with a default value (null usually)
const UserContext = createContext<UserContextType | null>(null);

// 3. Create the Provider Component
export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<string | null>(null);

    const login = () => setUser("Alice_Dev");
    const logout = () => setUser(null);

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}

// 4. Custom Hook for easy usage (Optional but recommended)
export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
