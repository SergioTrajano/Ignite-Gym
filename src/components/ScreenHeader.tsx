import { Center, ICenterProps, Text } from "native-base";

type Props = ICenterProps & {
    title: string;
};

export default function ScreenHeader({ title, ...rest }: Props) {
    return (
        <Center
            backgroundColor="gray.600"
            paddingBottom={6}
            paddingTop={16}
        >
            <Text
                color="gray.100"
                fontSize="xl"
                fontFamily="heading"
            >
                {title}
            </Text>
        </Center>
    );
}
