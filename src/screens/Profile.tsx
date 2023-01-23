import { useState } from "react";
import { Center, ScrollView, VStack, Skeleton } from "native-base";

import ScreenHeader from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";

const PHOTO_SIZE = 33;

export function Profile() {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    return (
        <VStack flex={1}>
            <ScreenHeader title="Perfil" />

            <ScrollView>
                <Center
                    marginTop={6}
                    paddingX={10}
                >
                    <Skeleton
                        width={PHOTO_SIZE}
                        height={PHOTO_SIZE}
                        rounded="full"
                        startColor="gray.500"
                        endColor="gray.400"
                        display={isLoading ? "flex" : "none"}
                    />
                    <UserPhoto
                        source={{ uri: "https://github.com/SergioTrajano.png" }}
                        alt="Foto do usuario"
                        size={PHOTO_SIZE}
                        display={isLoading ? "none" : "flex"}
                    />
                </Center>
            </ScrollView>
        </VStack>
    );
}
