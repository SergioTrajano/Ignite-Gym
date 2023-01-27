import AsyncStorage from "@react-native-async-storage/async-storage";

import { AUTH_TOKEN_STORAGE } from "./storageConfig";

async function save(token: string) {
    try {
        await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, token);
    } catch (error) {
        throw error;
    }
}

async function get() {
    try {
        const token = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);

        return token;
    } catch (error) {
        throw error;
    }
}

export const storageToken = {
    get,
    save,
};
