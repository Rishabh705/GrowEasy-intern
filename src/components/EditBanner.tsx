'use client'

import * as React from "react"
import { Pencil } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AvatarComp } from "./AvatarComp"


interface BannerFormProps extends React.ComponentProps<"form"> {
    attribution?: string;
    title:string;
    description:string;
}

interface EditBannerProps {
    id: number;
    className?: string;
    attribution: string;
    title:string;
    description:string;
}

export default function EditBanner({ id, attribution, title, description, className }: EditBannerProps) {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild className={className}>
                    <Pencil className="h-4 w-4 hover:cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Banner</DialogTitle>
                        <DialogDescription>
                            Make changes to banner here. Click done when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                    <BannerForm attribution={attribution} title={title} description={description}/>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild className={className}>
                <Pencil className="h-4 w-4 hover:cursor-pointer" />
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Edit Banner</DrawerTitle>
                    <DrawerDescription>
                        Make changes to banner here. Click done when you&apos;re done.
                    </DrawerDescription>
                </DrawerHeader>
                <BannerForm className="px-4" attribution={attribution} title={title} description={description}/>
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

function BannerForm({ className, attribution, title, description }: BannerFormProps) {
    return (
        <form className={cn("grid items-start gap-4", className)}>
            <h4 className="text-xs">Image Attribution: <i> {attribution}</i>
            </h4>
            <div className="grid gap-2">
                <Label htmlFor="email">Image</Label>
                <AvatarComp src="https://via.placeholder.com/150" alt="banner" fallback="B" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input type="text" id="title" defaultValue={title} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" defaultValue={description} />
            </div>
            <Button type="submit">Done</Button>
            <span className="text-center text-blue-500 hover:cursor-pointer text-sm">Download</span>
        </form>
    )
}
