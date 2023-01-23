import { useState } from "react";
import { Center, ScrollView, VStack, Skeleton, Text, Heading } from "native-base";

import ScreenHeader from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { TouchableOpacity } from "react-native";
import { Input } from "@components/Input";

const PHOTO_SIZE = 33;

export function Profile() {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    return (
        <VStack flex={1}>
            <ScreenHeader title="Perfil" />

            <ScrollView>
                <Center
                    marginTop={6}
                    paddingX={10}
                >
                    <Skeleton
                        width={PHOTO_SIZE}
                        height={PHOTO_SIZE}
                        rounded="full"
                        startColor="gray.500"
                        endColor="gray.400"
                        display={isLoading ? "flex" : "none"}
                    />
                    <UserPhoto
                        source={{ uri: "https://github.com/SergioTrajano.png" }}
                        alt="Foto do usuario"
                        size={PHOTO_SIZE}
                        display={isLoading ? "none" : "flex"}
                    />

                    <TouchableOpacity>
                        <Text
                            color="green.500"
                            fontWeight="bold"
                            fontSize="md"
                            marginBottom={8}
                            marginTop={2}
                        >
                            Alterar foto
                        </Text>
                    </TouchableOpacity>

                    <Input
                        placeholder="Nome"
                        backgroundColor="gray.600"
                    />
                    <Input
                        placeholder="email@gmail.com"
                        backgroundColor="gray.600"
                        isDisabled
                    />
                </Center>

                <VStack
                    paddingX={10}
                    marginTop={12}
                    marginBottom={9}
                >
                    <Heading
                        color="gray.200"
                        fontSize="md"
                        marginBottom={2}
                    >
                        Alterar senha
                    </Heading>

                    <Input
                        placeholder="Senha antiga"
                        secureTextEntry={true}
                        backgroundColor="gray.600"
                    />
                    <Input
                        placeholder="Nova senha"
                        secureTextEntry={true}
                        backgroundColor="gray.600"
                    />
                    <Input
                        placeholder="Confirme nova senha"
                        secureTextEntry={true}
                        backgroundColor="gray.600"
                    />
                </VStack>
            </ScrollView>
        </VStack>
    );
}
