import { useNavigation } from "@react-navigation/native";

import { TouchableOpacity } from "react-native";
import { Box, Heading, HStack, Icon, Image, Text, VStack } from "native-base";
import { Feather } from "@expo/vector-icons";

import { NavigatorAppRoutesProps } from "@routes/app.routes";

import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepetitionsSvg from "@assets/repetitions.svg";

import { Button } from "@components/Button";

export function Exercise() {
    const { goBack } = useNavigation<NavigatorAppRoutesProps>();

    function handleGoBack() {
        goBack();
    }
    return (
        <VStack flex={1}>
            <VStack
                paddingX={8}
                backgroundColor="gray.600"
                paddingTop={12}
            >
                <TouchableOpacity onPress={handleGoBack}>
                    <Icon
                        as={Feather}
                        name="arrow-left"
                        color="green.500"
                        size={6}
                    />
                </TouchableOpacity>

                <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    marginTop={4}
                    marginBottom={8}
                >
                    <Heading
                        color="gray.100"
                        fontSize="lg"
                        flexShrink={1}
                    >
                        Abdominal
                    </Heading>

                    <HStack>
                        <BodySvg />

                        <Text
                            textTransform="capitalize"
                            color="gray.200"
                            marginLeft={1}
                        >
                            Abdomen
                        </Text>
                    </HStack>
                </HStack>
            </VStack>

            <VStack padding={8}>
                <Image
                    width="full"
                    height={80}
                    marginBottom={3}
                    source={{
                        uri: "data:image/jpeg;base64,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",
                    }}
                    alt="Imagem do exercicio"
                    resizeMode="cover"
                    rounded="lg"
                />

                <Box
                    backgroundColor="gray.600"
                    rounded="md"
                    paddingBottom={4}
                    paddingX={4}
                >
                    <HStack
                        alignItems="center"
                        justifyContent="space-around"
                        marginBottom={6}
                        marginTop={5}
                    >
                        <HStack>
                            <SeriesSvg />
                            <Text
                                color="gray.200"
                                marginLeft={2}
                            >
                                3 séries
                            </Text>
                        </HStack>
                        <HStack>
                            <RepetitionsSvg />
                            <Text
                                color="gray.200"
                                marginLeft={2}
                            >
                                12 repetições
                            </Text>
                        </HStack>
                    </HStack>

                    <Button title="Marcar como realizado" />
                </Box>
            </VStack>
        </VStack>
    );
}
