import React, { useRef, useCallback, useState, useEffect } from "react";
import {
    Card,
    CardHeader,
} from "@/components/ui/card";
import { Banner } from "@/utils/types";
import EditBanner from "./EditBanner";
import CanvasOverlay from "./CanvasOverlay";
import { cn } from "@/lib/utils";

interface AdBannerProps {
    banner: Banner;
    className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({
    banner,
    className
}) => {
    const [images, setImages] = useState<string[]>([]);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: Response = await fetch('/api/images');
                const result: { data: string[] } = await response.json();
                setImages(result.data);
            } catch (error) {
                console.error('Error fetching banner data:', error);
            }
        };

        fetchData();
    }, []);

    const downloadCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        
        if (!canvas) return;
        
        const link = document.createElement("a");
        link.download = "banner.png"; // Name of the downloaded file
        link.href = canvas.toDataURL("image/png"); // Convert canvas to image URL
        link.click(); // Trigger the download
    }, []);

    return (
        <Card className={cn(`relative overflow-hidden h-80 w-80`, className)}>
            <div className="absolute inset-0 z-10 bg-gradient-overlay"></div>
            <CardHeader className="relative z-50">
                <EditBanner
                    banner={banner}
                    images={images}
                    downloadCanvas={downloadCanvas} // Pass the function as a prop
                    className="absolute right-0 mr-4"
                />
            </CardHeader>
            <CanvasOverlay
                banner={banner}
                className="absolute inset-0"
                ref={canvasRef} // Pass the ref to CanvasOverlay
            />
        </Card>
    );
};

export default AdBanner;
