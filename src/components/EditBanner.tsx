import * as React from "react";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AvatarComp } from "./AvatarComp";
import { useGlobalContext } from "@/contexts/banners";
import { Banner } from "@/utils/types";

interface EditBannerProps {
    banner: Banner;
    images: string[];
    className?: string;
    downloadCanvas?: () => void;
}

const EditBanner: React.FC<EditBannerProps> = ({ banner, className, images, downloadCanvas }) => {
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState(banner.title);
    const [description, setDescription] = React.useState(banner.description);
    const [image, setImage] = React.useState(banner.image);
    const [imageFile, setImageFile] = React.useState<File | null>(null);

    const { setBannersData } = useGlobalContext();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setBannersData((prevBanners) =>
            prevBanners.map((item) =>
                item.id === banner.id
                    ? { ...item, title, description, image }
                    : item
            )
        );

        setOpen(false);
    };

    const handleImageChange = (newImage: string) => {
        setImage(newImage);
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("File input change detected"); // Debugging log
        console.log(event); // Debugging log
        const file = event.target.files?.[0];

        if (file) {
            console.log("File selected:", file); // Debugging log
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
                setImageFile(file); // Store the file for potential further use
            };
            reader.readAsDataURL(file);
        } else {
            console.log("No file selected"); // Debugging log
        }
    };

    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild className={className}>
                    <Pencil className="h-4 w-4 hover:cursor-pointer text-white" />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Banner</DialogTitle>
                        <DialogDescription>
                            Make changes to the banner here. Click done when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                    <BannerForm
                        banner={{ ...banner, title, description, image }}
                        images={images}
                        selectedImage={image}
                        onSubmit={handleSubmit}
                        onTitleChange={setTitle}
                        onDescriptionChange={setDescription}
                        onImageChange={handleImageChange}
                        imageFile={imageFile}
                        onFileUpload={handleFileUpload}
                    />
                    <span className="text-center text-blue-500 hover:cursor-pointer text-sm mb-4" onClick={downloadCanvas}>Download</span>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild className={className}>
                <Pencil className="h-4 w-4 hover:cursor-pointer text-white" />
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Edit Banner</DrawerTitle>
                    <DrawerDescription>
                        Make changes to the banner here. Click done when you&apos;re done.
                    </DrawerDescription>
                </DrawerHeader>
                <BannerForm
                    className="px-4"
                    banner={{ ...banner, title, description, image }}
                    images={images}
                    selectedImage={image}
                    onSubmit={handleSubmit}
                    onTitleChange={setTitle}
                    onDescriptionChange={setDescription}
                    onImageChange={handleImageChange}
                    imageFile={imageFile}
                    onFileUpload={handleFileUpload}
                />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                    <span className="text-center text-blue-500 hover:cursor-pointer text-sm" onClick={downloadCanvas}>Download</span>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

interface BannerFormProps extends React.ComponentProps<"form"> {
    banner: Banner;
    images: string[];
    selectedImage: string;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    onTitleChange: (title: string) => void;
    onDescriptionChange: (description: string) => void;
    onImageChange: (image: string) => void;
    imageFile: File | null;
    onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const BannerForm: React.FC<BannerFormProps> = ({
    banner,
    images,
    selectedImage,
    onSubmit,
    onTitleChange,
    onDescriptionChange,
    onImageChange,
    imageFile,
    onFileUpload,
    className,
}) => {
    const [isFirstRender, setIsFirstRender] = React.useState(true);
    const handleImageClick = (image:string) => {
        setIsFirstRender(false);
        onImageChange(image);
    }
    return (
        <form className={cn("grid items-start gap-4", className)} onSubmit={onSubmit}>
            <h4 className="text-xs">
                Image Attribution: <i> {banner.attribution}</i>
            </h4>
            <div className="grid gap-2">
                <Label htmlFor="image">Image</Label>
                <div className="flex gap-2 overflow-x-scroll p-2">
                    <Input
                        type="file"
                        id="imageUpload"
                        className="hidden rounded-full bg-gray-200 "
                        onChange={onFileUpload}
                    />
                    <AvatarComp
                        src={!isFirstRender ? selectedImage : ""}
                        alt="banner"
                        fallback="Upload"
                        className="ring-2 ring-blue-500 text-xs"
                        onClick={() => document.getElementById("imageUpload")?.click()}
                    />
                    {images.map((image) => (
                        <AvatarComp
                            key={image}
                            src={image}
                            alt="banner"
                            fallback="B"
                            onClick={() => handleImageClick(image)}
                        />
                    ))}
                </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                    type="text"
                    id="title"
                    name="title"
                    value={banner.title}
                    onChange={(e) => onTitleChange(e.target.value)}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                    id="description"
                    name="description"
                    value={banner.description}
                    onChange={(e) => onDescriptionChange(e.target.value)}
                />
            </div>
            <Button type="submit">Done</Button>
        </form>
    );
};

export default EditBanner;
