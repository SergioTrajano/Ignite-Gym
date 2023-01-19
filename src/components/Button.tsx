import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base";

type Props = IButtonProps & {
    title: string;
};

export function Button({ title, ...rest }: Props) {
    return (
        <ButtonNativeBase
            width="full"
            height={14}
            backgroundColor="green.700"
            rounded="sm"
            _pressed={{
                backgroundColor: "green.500",
            }}
            {...rest}
        >
            <Text
                color="white"
                fontFamily="heading"
                fontSize="sm"
            >
                {title}
            </Text>
        </ButtonNativeBase>
    );
}
