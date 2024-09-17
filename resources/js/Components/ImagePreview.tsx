import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
    DialogDescription,
} from "@/Components/ui/dialog";

export const ImagePreview = ({ preview }: { preview: string }) => (
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
);

export default ImagePreview;
