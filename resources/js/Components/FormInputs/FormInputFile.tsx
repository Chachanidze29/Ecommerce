import { FormType } from "@/types/form";
import { Input } from "@/Components/ui/input";
import InputError from "@/Components/InputError";
import Label from "@/Components/InputLabel";
import { Dialog, DialogContent, DialogTrigger } from "@/Components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

interface FileFormInputProps {
    id: string;
    type: FormType;
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    preview?: string;
}

export const FormInputFile = ({
    id,
    type,
    label,
    onChange,
    error,
    preview,
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
            {preview && (
                <Dialog>
                    <DialogTrigger asChild>
                        <img
                            src={preview || ""}
                            className="object-cover rounded-lg w-32 h-32 cursor-pointer transform transition-transform duration-300 hover:scale-110"
                        />
                    </DialogTrigger>

                    <DialogContent className="p-8">
                        <DialogTitle>View Preview</DialogTitle>
                        <DialogDescription>Here</DialogDescription>
                        <div className="relative">
                            <img
                                src={preview || ""}
                                alt="Zoomed Preview"
                                className="object-cover rounded-lg max-w-full max-h-full"
                            />
                        </div>
                    </DialogContent>
                </Dialog>
            )}
            {error && <InputError message={error} />}
        </div>
    );
};

export default FormInputFile;
