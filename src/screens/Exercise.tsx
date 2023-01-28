import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { TouchableOpacity } from "react-native";
import { Box, Heading, HStack, Icon, Image, Text, VStack, ScrollView, useToast } from "native-base";
import { Feather } from "@expo/vector-icons";

import { NavigatorAppRoutesProps } from "@routes/app.routes";

import { api } from "@services/api";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { AppError } from "@utils/AppError";

import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepetitionsSvg from "@assets/repetitions.svg";

import { Button } from "@components/Button";
import { Loading } from "@components/Loading";

type RoutesParamsProps = {
    exerciseId: string;
};

export function Exercise() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);

    const { goBack } = useNavigation<NavigatorAppRoutesProps>();

    const toast = useToast();

    const route = useRoute();

    const { exerciseId } = route.params as RoutesParamsProps;

    function handleGoBack() {
        goBack();
    }

    async function fetchExerciseDetails() {
        setIsLoading(true);

        try {
            const { data } = await api.get(`/exercises/${exerciseId}`);

            setExercise(data);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError
                ? error.message
                : "Não foi possível carregar os detalhes exercicio.";

            toast.show({
                title,
                placement: "top",
                backgroundColor: "red.500",
            });
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchExerciseDetails();
    }, []);

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
                        fontFamily="heading"
                        color="gray.100"
                        fontSize="lg"
                        flexShrink={1}
                    >
                        {exercise.name}
                    </Heading>

                    <HStack>
                        <BodySvg />

                        <Text
                            textTransform="capitalize"
                            color="gray.200"
                            marginLeft={1}
                        >
                            {exercise.group}
                        </Text>
                    </HStack>
                </HStack>
            </VStack>

            {isLoading ? (
                <Loading />
            ) : (
                <ScrollView>
                    <VStack padding={8}>
                        <Box
                            rounded="lg"
                            overflow="hidden"
                            marginBottom={3}
                        >
                            <Image
                                width="full"
                                height={80}
                                source={{
                                    uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
                                }}
                                alt="Imagem do exercicio"
                                resizeMode="cover"
                                rounded="lg"
                            />
                        </Box>

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
                                        {exercise.series} séries
                                    </Text>
                                </HStack>
                                <HStack>
                                    <RepetitionsSvg />
                                    <Text
                                        color="gray.200"
                                        marginLeft={2}
                                    >
                                        {exercise.repetitions} repetições
                                    </Text>
                                </HStack>
                            </HStack>

                            <Button title="Marcar como realizado" />
                        </Box>
                    </VStack>
                </ScrollView>
            )}
        </VStack>
    );
}
