import { Heading, HStack, Text, VStack } from "native-base";

export function HomeHeader() {
    return (
        <HStack
            backgroundColor="gray.600"
            paddingBottom={5}
            paddingTop={16}
            paddingX={8}
            alignItems="center"
        >
            <VStack>
                <Text
                    color="gray.100"
                    fontSize="md"
                >
                    Ola,
                </Text>

                <Heading
                    color="gray.100"
                    fontSize="md"
                >
                    Sergio
                </Heading>
            </VStack>
        </HStack>
    );
}
