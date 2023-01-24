import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from "@services/api";

import { UserDTO } from "@dtos/UserDTO";
import { storageUser } from "@storage/storageUser";

export type AuthContextDataProps = {
    user: UserDTO;
    signIn: (email: string, password: string) => Promise<void>;
};

type AuthContextProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState<UserDTO>({} as UserDTO);

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
        try {
            const userData = await storageUser.get();

            setUser(userData);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadUserData();
    }, []);

    return <AuthContext.Provider value={{ user, signIn }}>{children}</AuthContext.Provider>;
}
