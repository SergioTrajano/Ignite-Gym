import { Input as NativeBaseInut, IInputProps } from "native-base";

export function Input({ ...rest }: IInputProps) {
    return (
        <NativeBaseInut
            backgroundColor="gray.700"
            height={14}
            padding={4}
            borderWidth={0}
            color="white"
            fontFamily="body"
            marginBottom={4}
            placeholderTextColor="gray.300"
            _focus={{
                backgroundColor: "gray.700",
                borderWidth: 1,
                borderColor: "green.500",
            }}
            {...rest}
        />
    );
}
