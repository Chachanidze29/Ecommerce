import { forwardRef } from "react";

import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";

interface TextFormInputProps {
    id: string;
    type: string;
    label: string;
    value: string;
    autoComplete?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    className?: string;
    autoFocus?: boolean;
}

export const FormInputText = forwardRef<HTMLInputElement, TextFormInputProps>(
    (
        {
            id,
            type,
            label,
            value,
            autoComplete,
            onChange,
            error,
            className,
            autoFocus,
        },
        ref
    ) => {
        return (
            <div className={`grid gap-2 ${className || ""}`}>
                <InputLabel htmlFor={id} value={label} />
                <TextInput
                    type={type}
                    value={value}
                    onChange={onChange}
                    id={id}
                    autoComplete={autoComplete}
                    ref={ref}
                    autoFocus={autoFocus}
                />
                {error && <InputError message={error} />}
            </div>
        );
    }
);

export default FormInputText;
