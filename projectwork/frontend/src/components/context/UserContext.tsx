// src/context/UserContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import config from '../../config';
// Define the shape of the user object
interface User {
    id: string;
    email: string;
    username: string;
    firstname: string;
    lastname: string;
    dob: string;
    subscription: boolean;
    image: string;
    [key: string]: any; // Additional fields
}

// Define the context structure
interface UserContextType {
    user: User | null;
    isLoggedIn: boolean;
    setUser: (user: User | null) => void;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

// Create the context with a default value
const UserContext = createContext<UserContextType | undefined>({
    user: null,
    isLoggedIn: localStorage.getItem('token') !== null,
    setUser: () => { },
    setIsLoggedIn: () => { },
});

// Custom hook to use the UserContext
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

// Provider component to wrap the app
export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null);

    useEffect(() => {
        if(!isLoggedIn) return;
        fetch(config.apiBaseUrl+"/api/users/me", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch user");
                }
                return response.json();
            })
            .then(data => setUser(data))
            .catch(error => console.error("Error fetching user:", error));
    }, [isLoggedIn])

    return (
        <UserContext.Provider value={{ user, isLoggedIn, setUser, setIsLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
};