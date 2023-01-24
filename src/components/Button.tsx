import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base";

type Props = IButtonProps & {
    title: string;
    variant?: "solid" | "outline";
};

export function Button({ title, variant, ...rest }: Props) {
    return (
        <ButtonNativeBase
            width="full"
            height={14}
            backgroundColor={variant === "outline" ? "transparent" : "green.700"}
            borderWidth={variant === "outline" ? 1 : 0}
            borderColor="green.500"
            rounded="sm"
            _pressed={{
                backgroundColor: variant === "outline" ? "gray.500" : "green.500",
            }}
            isLoadingText={variant === "outline" ? title : ""}
            _loading={
                variant === "outline"
                    ? { _text: { color: "green.500", fontFamily: "heading", fontSize: "sm" } }
                    : {}
            }
            _spinner={variant === "outline" ? { display: "none" } : {}}
            {...rest}
        >
            <Text
                color={variant === "outline" ? "green.500" : "white"}
                fontFamily="heading"
                fontSize="sm"
            >
                {title}
            </Text>
        </ButtonNativeBase>
    );
}
