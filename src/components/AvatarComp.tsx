import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

interface AvatarProps {
    src: string;
    alt: string;
    fallback: string;
}

export function AvatarComp({src, alt, fallback}: AvatarProps) {
    return (
        <Avatar>
            <AvatarImage src={src} alt={alt} />
            <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
    )
}
