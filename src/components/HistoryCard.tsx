import { Heading, HStack, Text, VStack } from "native-base";

export default function HistoryCard() {
    return (
        <HStack
            width="full"
            paddingX={5}
            paddingY={4}
            marginBottom={3}
            alignItems="center"
            justifyContent="space-between"
            rounded="md"
            backgroundColor="gray.600"
        >
            <VStack>
                <Heading
                    color="white"
                    fontSize="md"
                    textTransform="capitalize"
                >
                    Costas
                </Heading>

                <Text
                    color="gray.100"
                    fontSize="lg"
                    numberOfLines={1}
                >
                    Puxada frontal
                </Text>
            </VStack>

            <Text
                color="gray.300"
                fontSize="md"
            >
                08:56
            </Text>
        </HStack>
    );
}