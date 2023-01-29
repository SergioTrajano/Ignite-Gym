import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FlatList, Heading, HStack, Text, VStack, useToast } from "native-base";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { ExerciseDTO } from "@dtos/ExerciseDTO";

import { HomeHeader } from "@components/HomeHeader";
import { Group } from "@components/Group";
import ExerciseCard from "@components/ExerciseCard";
import { Loading } from "@components/Loading";

import { NavigatorAppRoutesProps } from "@routes/app.routes";

export function Home() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [groups, setGroups] = useState<string[]>([]);
    const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
    const [groupSelected, setGroupSelected] = useState<string>("");

    const toast = useToast();
    const { navigate } = useNavigation<NavigatorAppRoutesProps>();

    function handleOpenExerciseDetails(exerciseId: string) {
        navigate("exercise", { exerciseId });
    }

    async function fetchGroups() {
        try {
            const { data } = await api.get("/groups");

            setGroups(data);
            setGroupSelected(data[0]);
        } catch (error) {
            const isAppErro = error instanceof AppError;

            const title = isAppErro
                ? error.message
                : "Não foi possível carregar os grupos de musculação.";

            toast.show({
                title,
                placement: "top",
                backgroundColor: "red.500",
            });
        }
    }

    async function fetchExercisesByGroup() {
        setIsLoading(true);

        try {
            const { data } = await api.get(`/exercises/bygroup/${groupSelected}`);

            setExercises(data);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possível carregar os exercicios";

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
        fetchGroups();
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchExercisesByGroup();
        }, [groupSelected])
    );

    return (
        <VStack flex={1}>
            <HomeHeader />

            <FlatList
                data={groups}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <Group
                        name={item}
                        isActive={groupSelected === item}
                        onPress={() => setGroupSelected(item)}
                    />
                )}
                showsHorizontalScrollIndicator={false}
                horizontal
                _contentContainerStyle={{ paddingX: 8 }}
                marginY={10}
                maxHeight={10}
                minHeight={10}
            />

            {isLoading ? (
                <Loading />
            ) : (
                <VStack
                    paddingX={8}
                    flex={1}
                >
                    <HStack
                        justifyContent="space-between"
                        marginBottom={5}
                    >
                        <Heading
                            fontFamily="heading"
                            color="gray.200"
                            fontSize="md"
                        >
                            Exercícios
                        </Heading>

                        <Text
                            color="gray.200"
                            fontSize="sm"
                        >
                            {exercises.length}
                        </Text>
                    </HStack>

                    <FlatList
                        data={exercises}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <ExerciseCard
                                data={item}
                                onPress={() => handleOpenExerciseDetails(item.id)}
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                        _contentContainerStyle={{ paddingBottom: 20 }}
                    />
                </VStack>
            )}
        </VStack>
    );
}
