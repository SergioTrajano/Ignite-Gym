import { useState } from "react";
import { Center, ScrollView, VStack, Skeleton, Text, Heading } from "native-base";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import ScreenHeader from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Alert, TouchableOpacity } from "react-native";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

const PHOTO_SIZE = 33;

export function Profile() {
    const [photoIsLoading, setPhotoisLoading] = useState<boolean>(false);
    const [userPhoto, setUserPhoto] = useState<string | undefined>(
        "http://github.com/SergioTrajano.png"
    );

    async function handleUserPhotoSelect() {
        setPhotoisLoading(true);

        try {
            const selectedPhoto = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                aspect: [4, 4],
                allowsEditing: true,
            });

            if (selectedPhoto.canceled) {
                return;
            }
            if (selectedPhoto.assets[0].uri) {
                const photoInfo = await FileSystem.getInfoAsync(selectedPhoto.assets[0].uri);

                if (photoInfo.size && photoInfo.size / 1024 ** 2 > 5) {
                    Alert.alert("Imagem muito grande", "Escolha uma imagem de até 5MB");
                    return;
                }

                setUserPhoto(selectedPhoto.assets[0].uri);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setPhotoisLoading(false);
        }
    }

    return (
        <VStack flex={1}>
            <ScreenHeader title="Perfil" />

            <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
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
                        display={photoIsLoading ? "flex" : "none"}
                    />
                    <UserPhoto
                        source={{ uri: userPhoto }}
                        alt="Foto do usuario"
                        size={PHOTO_SIZE}
                        display={photoIsLoading ? "none" : "flex"}
                    />

                    <TouchableOpacity>
                        <Text
                            color="green.500"
                            fontWeight="bold"
                            fontSize="md"
                            marginBottom={8}
                            marginTop={2}
                            onPress={handleUserPhotoSelect}
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

                    <Heading
                        color="gray.200"
                        fontSize="md"
                        marginBottom={2}
                        marginTop={12}
                        alignSelf="flex-start"
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

                    <Button
                        title="Atualizar"
                        marginTop={4}
                    />
                </Center>
            </ScrollView>
        </VStack>
    );
}
