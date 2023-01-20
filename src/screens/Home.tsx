import { useState } from "react";
import { FlatList, Heading, HStack, Text, VStack } from "native-base";

import { HomeHeader } from "@components/HomeHeader";
import { Group } from "@components/Group";

export function Home() {
    const [groups, setGroups] = useState<string[]>(["costas", "bíceps", "tríceps", "ombro"]);
    const [groupSelect, setGroupSelected] = useState<string>("costas");

    return (
        <VStack>
            <HomeHeader />

            <FlatList
                data={groups}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <Group
                        name={item}
                        isActive={groupSelect === item}
                        onPress={() => setGroupSelected(item)}
                    />
                )}
                showsHorizontalScrollIndicator={false}
                horizontal
                _contentContainerStyle={{ paddingX: 8 }}
                marginY={10}
                maxHeight={10}
            />

            <VStack paddingX={8}>
                <HStack
                    justifyContent="space-between"
                    marginBottom={5}
                >
                    <Heading
                        color="gray.200"
                        fontSize="md"
                    >
                        Exercícios
                    </Heading>

                    <Text
                        color="gray.200"
                        fontSize="sm"
                    >
                        4
                    </Text>
                </HStack>
            </VStack>
        </VStack>
    );
}
