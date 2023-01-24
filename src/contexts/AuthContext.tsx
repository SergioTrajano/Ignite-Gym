import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from "@services/api";

import { UserDTO } from "@dtos/UserDTO";
import { storageUser } from "@storage/storageUser";

export type AuthContextDataProps = {
    user: UserDTO;
    signIn: (email: string, password: string) => Promise<void>;
    isLoadingUserStorageData: boolean;
};

type AuthContextProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState<UserDTO>({} as UserDTO);
    const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState<boolean>(true);

    async function signIn(email: string, password: string) {
        try {
            const { data } = await api.post("/sessions", { email, password });

            setUser(data.user);
            storageUser.save(data.user);
        } catch (error) {
            throw error;
        }
    }

    async function loadUserData() {
        setIsLoadingUserStorageData(true);

        try {
            const userData = await storageUser.get();

            setUser(userData);
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    useEffect(() => {
        loadUserData();
    }, []);

    return (
        <AuthContext.Provider value={{ user, signIn, isLoadingUserStorageData }}>
            {children}
        </AuthContext.Provider>
    );
}
