import AsyncStorage from "@react-native-async-storage/async-storage";

import { USER_STORAGE } from "./storageConfig";

import { UserDTO } from "@dtos/UserDTO";

async function save(user: UserDTO) {
    try {
        await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
    } catch (error) {
        throw error;
    }
}

async function get() {
    try {
        const storage = await AsyncStorage.getItem(USER_STORAGE);

        const userData: UserDTO = storage ? JSON.parse(storage) : {};

        return userData;
    } catch (error) {
        throw error;
    }
}

async function remove() {
    try {
        await AsyncStorage.removeItem(USER_STORAGE);
    } catch (error) {
        throw error;
    }
}

export const storageUser = {
    get,
    save,
    remove,
};
