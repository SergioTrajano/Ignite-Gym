import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Heading, VStack, SectionList, Text, useToast } from "native-base";

import { api } from "@services/api";
import { HistoryDTO } from "@dtos/historyDTO";
import { AppError } from "@utils/AppError";

import ScreenHeader from "@components/ScreenHeader";
import HistoryCard from "@components/HistoryCard";
import { Loading } from "@components/Loading";

type HistorySectionListProps = {
    title: string;
    data: HistoryDTO[];
};

export function History() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [exercises, setExercises] = useState<HistorySectionListProps[]>([]);

    const toast = useToast();

    async function fetchHistory() {
        setIsLoading(true);

        try {
            const { data } = await api.get("/history");

            setExercises(data);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possível carregar o historíco.";

            toast.show({
                title,
                placement: "top",
                backgroundColor: "red.500",
            });
        } finally {
            setIsLoading(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchHistory();
        }, [])
    );

    return (
        <VStack flex={1}>
            <ScreenHeader title="Histórico de Exercícios" />

            {isLoading ? (
                <Loading />
            ) : (
                <SectionList
                    sections={exercises}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <HistoryCard data={item} />}
                    renderSectionHeader={({ section }) => (
                        <Heading
                            fontFamily="heading"
                            color="gray.200"
                            fontSize="md"
                            marginTop={10}
                            marginBottom={3}
                        >
                            {section.title}
                        </Heading>
                    )}
                    ListEmptyComponent={() => (
                        <Text
                            color="gray.100"
                            textAlign="center"
                        >
                            Não há exercicios registrados ainda. {"\n"}
                            Vamos fazer exercicios hoje?
                        </Text>
                    )}
                    contentContainerStyle={
                        exercises.length === 0 && { flex: 1, justifyContent: "center" }
                    }
                    showsVerticalScrollIndicator={false}
                    paddingX={6}
                />
            )}
        </VStack>
    );
}
