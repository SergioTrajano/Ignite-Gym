import { Center, Heading, Image, Text, VStack, ScrollView } from "native-base";

import LogoSvg from "@assets/logo.svg";
import BackgroundImg from "@assets/background.png";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function SignIn() {
    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
        >
            <VStack
                flex={1}
                bg="gray.700"
                px={10}
                pb={16}
            >
                <Image
                    source={BackgroundImg}
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

                <Center marginBottom={0}>
                    <Heading
                        fontFamily="heading"
                        mb={6}
                        fontSize="xl"
                        color="gray.100"
                    >
                        Acesse sua conta
                    </Heading>

                    <Input
                        placeholder="E-mail"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <Input
                        placeholder="Senha"
                        secureTextEntry
                    />

                    <Button title="Acessar" />
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
                    />
                </Center>
            </VStack>
        </ScrollView>
    );
}
