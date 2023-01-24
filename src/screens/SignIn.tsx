import { Center, Heading, Image, Text, VStack, ScrollView } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import LogoSvg from "@assets/logo.svg";
import BackgroundImg from "@assets/background.png";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { useAuth } from "@hooks/userAuth";

type FormDataProps = {
    email: string;
    password: string;
};

const signInSchema = yup.object({
    email: yup.string().trim().required("Informe o email."),
    password: yup.string().trim().required("Informe a senha."),
});

export function SignIn() {
    const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

    const { signIn } = useAuth();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormDataProps>({
        resolver: yupResolver(signInSchema),
    });

    function handleSignIn({ email, password }: FormDataProps) {
        signIn(email, password);
    }

    function handleNewAccount() {
        navigate("signUp");
    }

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
        >
            <VStack
                flex={1}
                px={10}
                pb={16}
            >
                <Image
                    source={BackgroundImg}
                    defaultSource={BackgroundImg}
                    alt="Pessoas treinando"
                    resizeMode="contain"
                    position="absolute"
                />

                <Center my={24}>
                    <LogoSvg />

                    <Text
                        color="gray.100"
                        fontSize="sm"
                    >
                        Treine sua mente e o seu corpo
                    </Text>
                </Center>

                <Center>
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
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.password?.message}
                                onSubmitEditing={handleSubmit(handleSignIn)}
                                returnKeyType="send"
                                secureTextEntry
                            />
                        )}
                    />

                    <Button
                        title="Acessar"
                        onPress={handleSubmit(handleSignIn)}
                    />
                </Center>

                <Center marginTop={48}>
                    <Text
                        color="gray.100"
                        fontSize="sm"
                        marginBottom={3}
                        fontFamily="body"
                    >
                        Ainda não tem acesso?
                    </Text>
                    <Button
                        title="Criar conta"
                        variant="outline"
                        onPress={handleNewAccount}
                    />
                </Center>
            </VStack>
        </ScrollView>
    );
}
