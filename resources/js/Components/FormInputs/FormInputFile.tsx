import { FormType } from "@/types/form";
import { Input } from "@/Components/ui/input";
import InputError from "@/Components/InputError";
import Label from "@/Components/InputLabel";
import { Button } from "@/Components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/Components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

interface FileFormInputProps {
    id: string;
    type: FormType;
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    preview: string | null;
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
                <div className="flex flex-col items-start gap-2">
                    <Dialog>
                        <DialogTitle>Image Preview</DialogTitle>
                        <DialogTrigger asChild>
                            <Button>Open Preview</Button>
                        </DialogTrigger>

                        <DialogContent className="p-8">
                            <div className="relative">
                                <img
                                    src={preview || ""}
                                    alt="Zoomed Preview"
                                    className="object-cover rounded-lg max-w-full max-h-full"
                                />
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            )}
            {error && <InputError message={error} />}
        </div>
    );
};

export default FormInputFile;
