import { HStack, VStack } from "native-base";

import { HomeHeader } from "@components/HomeHeader";
import { Group } from "@components/Group";
import { useState } from "react";

export function Home() {
    const [groupSelect, setGroupSelected] = useState<string>("costa");
    return (
        <VStack>
            <HomeHeader />

            <HStack>
                <Group
                    name="costas"
                    isActive={groupSelect === "costas"}
                    onPress={() => setGroupSelected("costas")}
                />
                <Group
                    name="ombro"
                    isActive={groupSelect === "ombro"}
                    onPress={() => setGroupSelected("ombro")}
                />
            </HStack>
        </VStack>
    );
}
