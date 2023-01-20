import { Text, Pressable, IPressableProps } from "native-base";

type Props = IPressableProps & {
    name: string;
};

export function Group({ name, ...rest }: Props) {
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
            _pressed={{
                borderColor: "green.500",
                borderWidth: 1,
            }}
            {...rest}
        >
            <Text
                color="gray.200"
                fontSize="xs"
                textTransform="uppercase"
                fontWeight="bold"
            >
                {name}
            </Text>
        </Pressable>
    );
}
