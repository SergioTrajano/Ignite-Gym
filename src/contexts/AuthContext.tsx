import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from "@services/api";

import { UserDTO } from "@dtos/UserDTO";

import { storageUser } from "@storage/storageUser";
import { storageToken } from "@storage/storageAuthToken";

export type AuthContextDataProps = {
    user: UserDTO;
    token: string;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    updateUser: (userData: UserDTO) => Promise<void>;
    isLoadingUserStorageData: boolean;
};

type AuthContextProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState<UserDTO>({} as UserDTO);
    const [token, setToken] = useState<string>("");
    const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState<boolean>(true);

    async function signIn(email: string, password: string) {
        try {
            const { data } = await api.post("/sessions", { email, password });

            if (data.user && data.token) {
                setIsLoadingUserStorageData(true);

                updateUserAndToken(data.user, data.token);
                setApiHeaderAuthorization(data.token);

                await storeUserAndToken(data.user, data.token);
            }
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    function updateUserAndToken(user: UserDTO, token: string) {
        setUser(user);
        setToken(token);
    }

    async function storeUserAndToken(user: UserDTO, token: string) {
        try {
            await storageToken.save(token);
            await storageUser.save(user);
        } catch (error) {
            throw error;
        }
    }

    function setApiHeaderAuthorization(token: string) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    async function updateUser(userData: UserDTO) {
        try {
            setUser(userData);
            await storageUser.save(userData);
        } catch (error) {
            throw error;
        }
    }

    async function signOut() {
        try {
            setIsLoadingUserStorageData(true);

            await storageUser.remove();
            await storageToken.remove();

            setUser({} as UserDTO);
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    async function loadUserData() {
        setIsLoadingUserStorageData(true);

        try {
            const userData = await storageUser.get();
            const token = await storageToken.get();

            if (userData && token) {
                updateUserAndToken(userData, token);
                setApiHeaderAuthorization(token);
            }

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
        <AuthContext.Provider
            value={{
                user,
                token,
                signIn,
                signOut,
                updateUser,
                isLoadingUserStorageData,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
