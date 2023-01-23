import { useNavigation } from "@react-navigation/native";

import { TouchableOpacity } from "react-native";
import { Heading, HStack, Icon, Text, VStack } from "native-base";
import { Feather } from "@expo/vector-icons";

import { NavigatorAppRoutesProps } from "@routes/app.routes";

import BodySvg from "@assets/body.svg";

export function Exercise() {
    const { goBack } = useNavigation<NavigatorAppRoutesProps>();

    function handleGoBack() {
        goBack();
    }
    return (
        <VStack flex={1}>
            <VStack
                paddingX={8}
                backgroundColor="gray.600"
                paddingTop={12}
            >
                <TouchableOpacity onPress={handleGoBack}>
                    <Icon
                        as={Feather}
                        name="arrow-left"
                        color="green.500"
                        size={6}
                    />
                </TouchableOpacity>

                <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    marginTop={4}
                    marginBottom={8}
                >
                    <Heading
                        color="gray.100"
                        fontSize="lg"
                        flexShrink={1}
                    >
                        Abdominal
                    </Heading>

                    <HStack>
                        <BodySvg />

                        <Text
                            textTransform="capitalize"
                            color="gray.200"
                            marginLeft={1}
                        >
                            Abdomen
                        </Text>
                    </HStack>
                </HStack>
            </VStack>
        </VStack>
    );
}
