import { Center, Heading, Image, Text, VStack, ScrollView } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";

import LogoSvg from "@assets/logo.svg";
import BackgroundImg from "@assets/background.png";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

type FormDataProps = {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
};

export function SignUp() {
    const { goBack } = useNavigation();

    const { control, handleSubmit } = useForm<FormDataProps>();

    function handleSignUp(data: FormDataProps) {}

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
                                returnKeyType="send"
                            />
                        )}
                    />

                    <Button
                        title="Criar e acessar"
                        onPress={handleSubmit(handleSignUp)}
                    />
                </Center>

                <Button
                    title="Voltar para o login"
                    variant="outline"
                    marginTop={16}
                    onPress={handleLogin}
                />
            </VStack>
        </ScrollView>
    );
}
