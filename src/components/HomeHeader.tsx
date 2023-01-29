import { Heading, HStack, Icon, Text, VStack } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import { api } from "@services/api";

import { useAuth } from "@hooks/userAuth";

import { UserPhoto } from "./UserPhoto";

import UserPhotoDefaultPng from "@assets/userPhotoDefault.png";

export function HomeHeader() {
    const { user, signOut } = useAuth();

    return (
        <HStack
            backgroundColor="gray.600"
            paddingBottom={5}
            paddingTop={16}
            paddingX={8}
            alignItems="center"
        >
            <UserPhoto
                size={16}
                source={
                    user.avatar
                        ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
                        : UserPhotoDefaultPng
                }
                alt="Imagem do usuario"
                marginRight={4}
            />
            <VStack flex={1}>
                <Text
                    color="gray.100"
                    fontSize="md"
                >
                    Ola,
                </Text>

                <Heading
                    fontFamily="heading"
                    color="gray.100"
                    fontSize="md"
                >
                    {user.name}
                </Heading>
            </VStack>

            <TouchableOpacity onPress={signOut}>
                <Icon
                    as={MaterialCommunityIcons}
                    name="logout"
                    size={7}
                    color="gray.200"
                />
            </TouchableOpacity>
        </HStack>
    );
}
