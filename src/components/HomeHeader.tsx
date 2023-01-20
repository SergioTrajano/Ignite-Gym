import { Heading, HStack, Text, VStack } from "native-base";

import { UserPhoto } from "./UserPhoto";

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
                mr={4}
            />
            <VStack>
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
        </HStack>
    );
}
