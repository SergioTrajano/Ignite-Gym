import { Input as NativeBaseInut, IInputProps, FormControl } from "native-base";

type Props = IInputProps & {
    errorMessage?: string | null;
};
export function Input({ errorMessage = null, isInvalid, ...rest }: Props) {
    const invalid = !!errorMessage || isInvalid;

    return (
        <FormControl
            isInvalid={invalid}
            marginBottom={invalid ? 0 : 6}
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
                isInvalid={invalid}
                _invalid={{
                    borderWidth: 1,
                    borderColor: "red.500",
                }}
                {...rest}
            />

            <FormControl.ErrorMessage _text={{ color: "red.500", fontSize: "2xs" }}>
                {errorMessage}
            </FormControl.ErrorMessage>
        </FormControl>
    );
}
