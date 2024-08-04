import { Banner } from "@/utils/types";
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

interface CanvasOverlayProps {
    banner: Banner;
    className?: string;
}

const CanvasOverlay = forwardRef<HTMLCanvasElement, CanvasOverlayProps>(
    ({ banner, className }, ref) => {
        const canvasRef = useRef<HTMLCanvasElement | null>(null);

        useImperativeHandle(ref, () => canvasRef.current as HTMLCanvasElement);

        useEffect(() => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const backgroundImage = new Image();
            const overlayImage = new Image();
            let imagesLoaded = 0;

            const onLoad = () => {
                imagesLoaded += 1;
                if (imagesLoaded === 2) {
                    // Both images are loaded, proceed with drawing
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

                    // Calculate the aspect ratio and size for the overlay image
                    const aspectRatio = overlayImage.width / overlayImage.height;
                    let drawWidth = banner.width;
                    let drawHeight = banner.height;

                    if (drawWidth / drawHeight > aspectRatio) {
                        drawWidth = drawHeight * aspectRatio;
                    } else {
                        drawHeight = drawWidth / aspectRatio;
                    }

                    // Position the image
                    const x = banner.imagePosition.x + (canvas.width - drawWidth) / 2;
                    const y = banner.imagePosition.y + (canvas.height - drawHeight) / 2;

                    if (banner.isCircular) {
                        // Draw the image as a circle
                        ctx.save();
                        ctx.beginPath();
                        ctx.arc(
                            x + drawWidth / 2,
                            y + drawHeight / 2,
                            Math.min(drawWidth, drawHeight) / 2,
                            0,
                            Math.PI * 2
                        );
                        ctx.clip();
                        ctx.drawImage(overlayImage, x, y, drawWidth, drawHeight);
                        ctx.restore();
                    } else {
                        // Draw the image normally
                        ctx.drawImage(overlayImage, x, y, drawWidth, drawHeight);
                    }

                    // Draw the title text
                    ctx.font = "bold 24px Arial";
                    ctx.fillStyle = banner.color; // Use the provided color for the title
                    ctx.fillText(banner.title, banner.titlePosition.x, banner.titlePosition.y); // Position the title

                    // Draw the description text
                    ctx.font = "12px Arial";
                    ctx.fillStyle = banner.color; // Use the provided color for the description
                    ctx.fillText(banner.description, banner.descriptionPosition.x, banner.descriptionPosition.y); // Position the description

                    // Draw the CTA background with rounded corners
                    let textY;
                    if (banner.ctaHasBackground) {
                        const ctaTextWidth = ctx.measureText(banner.cta).width + 10;
                        const ctaPadding = 10; // Padding around the CTA text
                        const ctaBackgroundWidth = ctaTextWidth + ctaPadding * 3;
                        const ctaBackgroundHeight = 24; // Height of the CTA background
                        const radius = 3; // Radius of the rounded corners

                        // Draw rounded rectangle
                        ctx.fillStyle = banner.ctaBackgroundColor;
                        ctx.beginPath();
                        ctx.moveTo(banner.ctaPosition.x - ctaPadding + radius, banner.ctaPosition.y - ctaBackgroundHeight / 2);
                        ctx.lineTo(banner.ctaPosition.x - ctaPadding + ctaBackgroundWidth - radius, banner.ctaPosition.y - ctaBackgroundHeight / 2);
                        ctx.arcTo(banner.ctaPosition.x - ctaPadding + ctaBackgroundWidth, banner.ctaPosition.y - ctaBackgroundHeight / 2, banner.ctaPosition.x - ctaPadding + ctaBackgroundWidth, banner.ctaPosition.y - ctaBackgroundHeight / 2 + radius, radius);
                        ctx.lineTo(banner.ctaPosition.x - ctaPadding + ctaBackgroundWidth, banner.ctaPosition.y - ctaBackgroundHeight / 2 + ctaBackgroundHeight - radius);
                        ctx.arcTo(banner.ctaPosition.x - ctaPadding + ctaBackgroundWidth, banner.ctaPosition.y - ctaBackgroundHeight / 2 + ctaBackgroundHeight, banner.ctaPosition.x - ctaPadding + ctaBackgroundWidth - radius, banner.ctaPosition.y - ctaBackgroundHeight / 2 + ctaBackgroundHeight, radius);
                        ctx.lineTo(banner.ctaPosition.x - ctaPadding + radius, banner.ctaPosition.y - ctaBackgroundHeight / 2 + ctaBackgroundHeight);
                        ctx.arcTo(banner.ctaPosition.x - ctaPadding, banner.ctaPosition.y - ctaBackgroundHeight / 2 + ctaBackgroundHeight, banner.ctaPosition.x - ctaPadding, banner.ctaPosition.y - ctaBackgroundHeight / 2 + ctaBackgroundHeight - radius, radius);
                        ctx.lineTo(banner.ctaPosition.x - ctaPadding, banner.ctaPosition.y - ctaBackgroundHeight / 2 + radius);
                        ctx.arcTo(banner.ctaPosition.x - ctaPadding, banner.ctaPosition.y - ctaBackgroundHeight / 2, banner.ctaPosition.x - ctaPadding + radius, banner.ctaPosition.y - ctaBackgroundHeight / 2, radius);
                        ctx.closePath();
                        ctx.fill();


                        textY = banner.ctaPosition.y - ctaBackgroundHeight / 1.5 + (ctaBackgroundHeight + 14) / 2
                    }
                    else{
                        textY = banner.ctaPosition.y;
                    }

                    ctx.font = "bold 14px Arial";
                    ctx.fillStyle = banner.ctaColor;
                    ctx.fillText(banner.cta, banner.ctaPosition.x, textY);
                }
            };

            // Set up the onload event handlers for the images
            backgroundImage.onload = onLoad;
            overlayImage.onload = onLoad;

            // // Set crossOrigin attribute
            // backgroundImage.crossOrigin = "anonymous";
            // overlayImage.crossOrigin = "anonymous";

            // Trigger the onLoad function
            backgroundImage.src = banner.background;
            overlayImage.src = banner.image;
        }, [banner]);

        return (
            <div className={className}>
                <canvas ref={canvasRef} width={350} height={350} className="w-full h-full" />
            </div>
        );
    }
);
export default CanvasOverlay;
