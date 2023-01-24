import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useTheme, Box } from "native-base";

import { useAuth } from "@hooks/userAuth";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

import { Loading } from "@components/Loading";

export function Routes() {
    const { user, isLoadingUserStorageData } = useAuth();

    const { colors } = useTheme();

    const theme = DefaultTheme;
    theme.colors.background = colors.gray[700];

    function renderRoutes() {
        if (isLoadingUserStorageData) {
            return <Loading />;
        }

        if (user.id) {
            return <AppRoutes />;
        }

        return <AuthRoutes />;
    }

    return (
        <Box
            flex={1}
            backgroundColor={colors.gray[500]}
        >
            <NavigationContainer theme={theme}>{renderRoutes()}</NavigationContainer>
        </Box>
    );
}
