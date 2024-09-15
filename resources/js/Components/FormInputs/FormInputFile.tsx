import { FormType } from "@/types/form";
import { Input } from "@/Components/ui/input";
import InputError from "@/Components/InputError";
import Label from "@/Components/InputLabel";

interface FileFormInputProps {
    id: string;
    type: FormType;
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

export const FormInputFile = ({
    id,
    type,
    label,
    onChange,
    error,
}: FileFormInputProps) => {
    return (
        <div className="grid gap-2">
            <Label htmlFor={id} value={label} />
            <Input
                type="file"
                name="image"
                required={type === FormType.Edit ? false : true}
                onChange={onChange}
            />
            {error && <InputError message={error} />}
        </div>
    );
};

export default FormInputFile;
