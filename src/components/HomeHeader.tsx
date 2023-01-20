import { Heading, HStack, Text, VStack } from "native-base";

export function HomeHeader() {
    return (
        <HStack>
            <VStack>
                <Text color="gray.100">Ola,</Text>

                <Heading color="gray.100">Sergio</Heading>
            </VStack>
        </HStack>
    );
}
