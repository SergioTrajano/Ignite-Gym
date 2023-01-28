import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Heading, HStack, Icon, Image, Text, VStack } from "native-base";
import { Entypo } from "@expo/vector-icons";

import { api } from "@services/api";
import { ExerciseDTO } from "@dtos/ExerciseDTO";

type Props = TouchableOpacityProps & {
    data: ExerciseDTO;
};

export default function ExerciseCard({ data, ...rest }: Props) {
    return (
        <TouchableOpacity {...rest}>
            <HStack
                backgroundColor="gray.500"
                alignItems="center"
                padding={2}
                paddingRight={4}
                rounded="md"
                marginBottom={3}
            >
                <Image
                    source={{
                        uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`,
                    }}
                    alt="Imagem do exercicio"
                    width={16}
                    height={16}
                    rounded="md"
                    marginRight={4}
                    resizeMode="cover"
                />

                <VStack flex={1}>
                    <Heading
                        fontSize="lg"
                        color="white"
                        fontFamily="heading"
                    >
                        {data.name}
                    </Heading>

                    <Text
                        fontSize="sm"
                        color="gray.200"
                        marginTop={1}
                        numberOfLines={2}
                    >
                        {data.series} séries x {data.repetitions} repetições
                    </Text>
                </VStack>
                <Icon
                    as={Entypo}
                    name="chevron-thin-right"
                    color="gray.300"
                />
            </HStack>
        </TouchableOpacity>
    );
}
