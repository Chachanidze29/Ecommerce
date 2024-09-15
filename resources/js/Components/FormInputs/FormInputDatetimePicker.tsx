import { DateTimePicker } from "@/Components/DateTimePicker";
import { getParsedDate } from "@/lib/utils";
import InputError from "@/Components/InputError";
import Label from "@/Components/InputLabel";
interface FormInputDateTimePickerProps {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

export const FormInputDateTimePicker = ({
    id,
    label,
    value,
    onChange,
    error,
}: FormInputDateTimePickerProps) => {
    return (
        <div className="grid gap-2">
            <Label htmlFor={id} value={label} />
            <DateTimePicker
                label={label}
                value={getParsedDate(value)}
                onChange={(value) => onChange(value?.toString() || "")}
                shouldForceLeadingZeros
            />
            {error && <InputError message={error} />}
        </div>
    );
};

export default FormInputDateTimePicker;
