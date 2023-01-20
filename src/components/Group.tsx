import { Text, Pressable, IPressableProps } from "native-base";

type Props = IPressableProps & {
    name: string;
    isActive: boolean;
};

export function Group({ name, isActive, ...rest }: Props) {
    return (
        <Pressable
            width={24}
            height={10}
            backgroundColor="gray.600"
            rounded="md"
            justifyContent="center"
            alignItems="center"
            marginRight={3}
            overflow="hidden"
            isPressed={isActive}
            _pressed={{
                borderColor: "green.500",
                borderWidth: 1,
            }}
            {...rest}
        >
            <Text
                color={isActive ? "green.500" : "gray.200"}
                fontSize="xs"
                textTransform="uppercase"
                fontWeight="bold"
            >
                {name}
            </Text>
        </Pressable>
    );
}
