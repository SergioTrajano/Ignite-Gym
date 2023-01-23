import { Heading, HStack, Icon, Text, VStack } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { UserPhoto } from "./UserPhoto";
import { TouchableOpacity } from "react-native";

export function HomeHeader() {
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
                source={{ uri: "https://avatars.githubusercontent.com/u/102706269?v=4" }}
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
                    color="gray.100"
                    fontSize="md"
                >
                    Sergio
                </Heading>
            </VStack>

            <TouchableOpacity>
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
