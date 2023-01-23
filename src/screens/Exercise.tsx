import { useNavigation } from "@react-navigation/native";

import { TouchableOpacity } from "react-native";
import { Icon, VStack } from "native-base";
import { Feather } from "@expo/vector-icons";

import { NavigatorAppRoutesProps } from "@routes/app.routes";

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
            </VStack>
        </VStack>
    );
}
