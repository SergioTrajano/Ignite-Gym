import { HistoryDTO } from "@dtos/historyDTO";
import { Heading, HStack, Text, VStack } from "native-base";

type Props = {
    data: HistoryDTO;
};

export default function HistoryCard({ data }: Props) {
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
            <VStack
                marginRight={5}
                flex={1}
            >
                <Heading
                    fontFamily="heading"
                    color="white"
                    fontSize="md"
                    textTransform="capitalize"
                    numberOfLines={1}
                >
                    {data.group}
                </Heading>

                <Text
                    color="gray.100"
                    fontSize="lg"
                    numberOfLines={1}
                >
                    {data.name}
                </Text>
            </VStack>

            <Text
                color="gray.300"
                fontSize="md"
            >
                {data.hour}
            </Text>
        </HStack>
    );
}
