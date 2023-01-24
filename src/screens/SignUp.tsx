import { useState } from "react";
import { Center, Heading, Image, Text, VStack, ScrollView, useToast } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import LogoSvg from "@assets/logo.svg";
import BackgroundImg from "@assets/background.png";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { api } from "@services/api";

import { AppError } from "@utils/AppError";

import { useAuth } from "@hooks/userAuth";

type FormDataProps = {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
};

const signUpSchema = yup.object({
    name: yup.string().required("Informe o nome.").trim(),
    email: yup.string().required("Informe o email.").email("E-mail inválido.").trim(),
    password: yup
        .string()
        .required("Informe a senha.")
        .min(9, "A senha deve conter pelo menos 9 dígitos")
        .trim(),
    passwordConfirm: yup
        .string()
        .required("Confirme a senha.")
        .oneOf([yup.ref("password"), null], "As senhas não coincidem.")
        .trim(),
});

export function SignUp() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { goBack } = useNavigation();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema),
    });

    const { signIn } = useAuth();

    const toast = useToast();

    async function handleSignUp({ name, email, password }: FormDataProps) {
        setIsLoading(true);

        try {
            await api.post("/users", { name, email, password });

            await signIn(email, password);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError
                ? error.message
                : "Não foi possível criar a conta. Tente novamente mais tarde.";

            toast.show({
                title,
                placement: "top",
                backgroundColor: "red.500",
            });

            setIsLoading(false);
        }
    }

    function handleLogin() {
        goBack();
    }

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
        >
            <VStack
                flex={1}
                px={10}
                pb={14}
            >
                <Image
                    source={BackgroundImg}
                    defaultSource={BackgroundImg}
                    alt="Pessoas treinando"
                    resizeMode="contain"
                    position="absolute"
                />

                <Center my={20}>
                    <LogoSvg />

                    <Text
                        color="gray.100"
                        fontSize="sm"
                    >
                        Treine sua mente e o seu corpo
                    </Text>
                </Center>

                <Center marginBottom={7}>
                    <Heading
                        fontFamily="heading"
                        mb={6}
                        fontSize="xl"
                        color="gray.100"
                    >
                        Acesse sua conta
                    </Heading>

                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Nome"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.name?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="E-mail"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.email?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Senha"
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="passwordConfirm"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Confirmar senha"
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                onSubmitEditing={handleSubmit(handleSignUp)}
                                errorMessage={errors.passwordConfirm?.message}
                                returnKeyType="send"
                            />
                        )}
                    />

                    <Button
                        title="Criar e acessar"
                        onPress={handleSubmit(handleSignUp)}
                        isLoading={isLoading}
                    />
                </Center>

                <Button
                    title="Voltar para o login"
                    variant="outline"
                    marginTop={20}
                    onPress={handleLogin}
                    isLoading={isLoading}
                />
            </VStack>
        </ScrollView>
    );
}
