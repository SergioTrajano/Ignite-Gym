import { useState } from "react";
import { Heading, VStack, SectionList } from "native-base";

import ScreenHeader from "@components/ScreenHeader";
import HistoryCard from "@components/HistoryCard";

export function History() {
    const [exercises, setExercises] = useState([
        {
            title: "Main dishes",
            data: ["Puxada frontal", "abdomem", "Risotto"],
        },
        {
            title: "dd fm oi",
            data: ["Puxada frontal", "abdomem", "oias"],
        },
    ]);

    return (
        <VStack flex={1}>
            <ScreenHeader title="Histórico de Exercícios" />

            <SectionList
                sections={exercises}
                keyExtractor={(item) => item}
                renderItem={({ item }) => <HistoryCard />}
                renderSectionHeader={({ section }) => (
                    <Heading
                        color="gray.200"
                        fontSize="md"
                        marginTop={10}
                        marginBottom={3}
                    >
                        {section.title}
                    </Heading>
                )}
                paddingX={6}
            />
        </VStack>
    );
}
