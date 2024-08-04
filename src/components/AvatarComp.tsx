import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

interface AvatarProps {
    src: string;
    alt: string;
    fallback: string;
    className?: string;
    onClick: () => void;
}

export function AvatarComp({src, alt, fallback, className, onClick}: AvatarProps) {

    return (
        <Avatar onClick={onClick} className={className}>
            <AvatarImage src={src} alt={alt}/>
            <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
    )
}
