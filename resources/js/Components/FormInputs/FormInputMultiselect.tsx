import InputError from "@/Components/InputError";
import Label from "@/Components/InputLabel";
import { MultiSelect } from "@/Components/Multiselect";
import { SelectOption } from "@/types";

interface FormInputMultiSelectProps {
    id: string;
    label: string;
    options: SelectOption[];
    selectedOptions?: number[];
    onChange: (options: number[]) => void;
    error?: string;
}

export const FormInputMultiSelect = ({
    id,
    label,
    options,
    selectedOptions,
    onChange,
    error,
}: FormInputMultiSelectProps) => {
    return (
        <div className="grid gap-2">
            <Label htmlFor={id} value={label} />
            <MultiSelect
                options={options}
                selectedOptions={selectedOptions}
                onValueChange={onChange}
            />
            {error && <InputError message={error} />}
        </div>
    );
};

export default FormInputMultiSelect;
