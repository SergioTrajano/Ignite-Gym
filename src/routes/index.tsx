import { useAuth } from "@hooks/userAuth";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useTheme, Box } from "native-base";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
    const { user } = useAuth();

    const { colors } = useTheme();

    const theme = DefaultTheme;
    theme.colors.background = colors.gray[700];

    function renderRoutes() {
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
