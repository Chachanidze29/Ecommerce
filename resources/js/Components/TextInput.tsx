import { forwardRef, useEffect, useRef, InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    isFocused?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
    ({ type = "text", className = "", isFocused = false, ...props }, ref) => {
        const inputRef = useRef<HTMLInputElement>(null);

        const inputElement = ref
            ? (ref as React.MutableRefObject<HTMLInputElement>)
            : inputRef;

        useEffect(() => {
            if (isFocused && inputElement.current) {
                inputElement.current.focus();
            }
        }, [isFocused]);

        return (
            <input
                {...props}
                type={type}
                className={
                    "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm " +
                    className
                }
                ref={inputElement}
            />
        );
    }
);

export default TextInput;
