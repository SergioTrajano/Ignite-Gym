import { Input as NativeBaseInut, IInputProps, FormControl } from "native-base";

type Props = IInputProps & {
    errorMessage?: string | null;
};
export function Input({ errorMessage = null, isInvalid, ...rest }: Props) {
    const invalid = !!errorMessage || isInvalid;

    return (
        <FormControl
            isInvalid={invalid}
            marginBottom={errorMessage ? 0 : 7}
        >
            <NativeBaseInut
                backgroundColor="gray.700"
                height={14}
                padding={4}
                borderWidth={0}
                color="white"
                fontFamily="body"
                placeholderTextColor="gray.300"
                _focus={{
                    backgroundColor: "gray.700",
                    borderWidth: 1,
                    borderColor: "green.500",
                }}
                {...rest}
            />

            <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
        </FormControl>
    );
}
