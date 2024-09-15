import { Textarea } from "@/Components/Textarea";

import InputError from "@/Components/InputError";
import Label from "@/Components/InputLabel";

interface TextareaFormInputProps {
    id: string;
    label: string;
    value: string;
    autoComplete?: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    error?: string;
}

export const FormInputTextarea = ({
    id,
    label,
    value,
    onChange,
    error,
}: TextareaFormInputProps) => {
    return (
        <div className="grid gap-2">
            <Label htmlFor={id} value={label} />
            <Textarea
                value={value}
                onChange={onChange}
                id="bio"
                className="resize-none"
            />
            {error && <InputError message={error} />}
        </div>
    );
};

export default FormInputTextarea;
