import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Center, ScrollView, VStack, Skeleton, Text, Heading, useToast } from "native-base";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useAuth } from "@hooks/userAuth";

import ScreenHeader from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import UserPhotoDefaultPng from "@assets/userPhotoDefault.png";

const PHOTO_SIZE = 33;

type FormDataProps = {
    name: string;
    email: string;
    oldPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
};

const changeProfileSchema = yup.object().shape({
    name: yup.string().trim(),
    oldPassword: yup.string().trim(),
    newPassword: yup
        .string()
        .trim()
        .min(6, "A senha deve ter pelo menos 6 caracteres.")
        .when(["oldPassword"], {
            is: (oldPassword: string) => oldPassword,
            then: yup.string().required("Informe a nova senha.").trim(),
        })
        .nullable()
        .transform((value) => (value !== "" ? value : null)),
    newPasswordConfirm: yup
        .string()
        .trim()
        .nullable()
        .transform((value) => (value !== "" ? value : null))
        .oneOf([yup.ref("newPassword"), null], "As senham não coincidem.")
        .when("newPassword", {
            is: (newPassword: any) => newPassword !== null && newPassword !== "",
            then: yup
                .string()
                .trim()
                .nullable()
                .required("Confirme a nova senha.")
                .transform((value) => (value !== "" ? value : null))
                .oneOf([yup.ref("newPassword"), null], "As senham não coincidem."),
        }),
});

export function Profile() {
    const { user } = useAuth();

    const [photoIsLoading, setPhotoisLoading] = useState<boolean>(false);
    const [userPhoto, setUserPhoto] = useState<string | undefined>("");

    const toast = useToast();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormDataProps>({
        defaultValues: {
            name: user.name,
            email: user.email,
        },
        resolver: yupResolver(changeProfileSchema),
    });

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
                    toast.show({
                        title: "A imagem deve ser menor que 5MB",
                        placement: "top",
                        bgColor: "red.500",
                    });

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

    function handleProfileChange(data: FormDataProps) {}

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
                        source={userPhoto !== "" ? { uri: userPhoto } : UserPhotoDefaultPng}
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

                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Nome"
                                backgroundColor="gray.600"
                                errorMessage={errors.name?.message}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />

                    <Controller
                        name="email"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="email@gmail.com"
                                backgroundColor="gray.600"
                                isDisabled
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />

                    <Heading
                        color="gray.200"
                        fontSize="md"
                        marginBottom={2}
                        marginTop={12}
                        alignSelf="flex-start"
                        fontFamily="heading"
                    >
                        Alterar senha
                    </Heading>

                    <Controller
                        control={control}
                        name="oldPassword"
                        render={({ field: { onChange } }) => (
                            <Input
                                placeholder="Senha antiga"
                                secureTextEntry={true}
                                backgroundColor="gray.600"
                                onChangeText={onChange}
                                errorMessage={errors.oldPassword?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="newPassword"
                        render={({ field: { onChange } }) => (
                            <Input
                                placeholder="Nova senha"
                                secureTextEntry={true}
                                backgroundColor="gray.600"
                                onChangeText={onChange}
                                errorMessage={errors.newPassword?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="newPasswordConfirm"
                        render={({ field: { onChange } }) => (
                            <Input
                                placeholder="Confirme nova senha"
                                secureTextEntry={true}
                                backgroundColor="gray.600"
                                onChangeText={onChange}
                                errorMessage={errors.newPasswordConfirm?.message}
                            />
                        )}
                    />

                    <Button
                        title="Atualizar"
                        marginTop={4}
                        onPress={handleSubmit(handleProfileChange)}
                    />
                </Center>
            </ScrollView>
        </VStack>
    );
}
