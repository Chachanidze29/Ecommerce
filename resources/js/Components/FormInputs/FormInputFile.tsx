import { FormType } from "@/types/form";
import { Input } from "@/Components/ui/input";
import InputError from "@/Components/InputError";
import Label from "@/Components/InputLabel";
import ImagePreview from "@/Components/ImagePreview";

interface FileFormInputProps {
    id: string;
    type: FormType;
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    preview?: string;
    multiple?: boolean;
}

export const FormInputFile = ({
    id,
    type,
    label,
    onChange,
    error,
    preview,
    multiple,
    ...props
}: FileFormInputProps) => {
    return (
        <div className="grid gap-2">
            <Label htmlFor={id} value={label} />
            <Input
                type="file"
                name="image"
                required={type === FormType.Edit ? false : true}
                onChange={onChange}
                multiple={multiple}
                {...props}
            />
            {preview && <ImagePreview preview={preview} />}
            {error && <InputError message={error} />}
        </div>
    );
};

export default FormInputFile;
