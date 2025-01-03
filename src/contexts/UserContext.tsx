"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: "Active" | "Inactive";
    lastLogin: string;
}

interface UserContextType {
    users: User[];
    addUser: (user: Omit<User, "id">) => void;
    updateUser: (id: number, user: Partial<User>) => void;
    deleteUser: (id: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        // Load users from localStorage on initial render
        const storedUsers = localStorage.getItem("users");
        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
        }
    }, []);

    useEffect(() => {
        // Save users to localStorage whenever it changes
        localStorage.setItem("users", JSON.stringify(users));
    }, [users]);

    const addUser = (user: Omit<User, "id">) => {
        setUsers((prevUsers) => [...prevUsers, { ...user, id: Date.now() }]);
    };

    const updateUser = (id: number, updatedUser: Partial<User>) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === id ? { ...user, ...updatedUser } : user
            )
        );
    };

    const deleteUser = (id: number) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    };

    return (
        <UserContext.Provider
            value={{ users, addUser, updateUser, deleteUser }}
        >
            {children}
        </UserContext.Provider>
    );
};
