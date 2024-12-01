import { useEffect, useRef, useState } from "react";

export default function ImgCreator({ imageDetails }: { imageDetails: { img: HTMLImageElement, title: string, artist: string, length: number } | undefined }) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);


    useEffect(() => {
        if (imageDetails && canvasRef.current) {
            const cover = imageDetails.img;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            if (ctx) {
                // A4 size in pixels at 96 DPI
                const a4Width = 973;  // A4 width in px
                const a4Height = 1332; // A4 height in px

                // Calculate the scaling factor
                const scale = Math.min(a4Width / cover.width, a4Height / cover.height);

                // Calculate the new dimensions for the image
                const scaledWidth = cover.width * scale;
                const scaledHeight = cover.height * scale;

                // Resize canvas to A4 aspect ratio
                canvas.width = a4Width;
                canvas.height = a4Height;

                // Center the image in the canvas
                const offsetX = (a4Width - scaledWidth) / 2;
                const offsetY = (a4Height - scaledHeight) / 2;

                // Draw the image on the canvas
                ctx.clearRect(0, 0, a4Width, a4Height); // Clear the canvas before drawing
                ctx.drawImage(cover, 0, 0, a4Height - 243, a4Height);
                const imageData = ctx.getImageData(0, 0, a4Width, a4Height);
                const data = imageData.data;

                const factor = 0.5;
                for (let i = 0; i < data.length; i += 4) {
                    data[i] = data[i] * factor;     // red
                    data[i + 1] = data[i + 1] * factor; // green
                    data[i + 2] = data[i + 2] * factor; // blue
                }
                ctx.putImageData(imageData, 0, 0);
                ctx.drawImage(cover, 243, 266, 486, 486);
                ctx.font = "38px Arial";
                ctx.fillStyle = "white";
                ctx.textBaseline = "top";
                ctx.fillText(`${imageDetails.title}`, 254, 777)
                ctx.font = "28px Arial";
                ctx.fillText(`${imageDetails.artist}`, 254, 819)
            }
        }
    }, [imageDetails]);

    return (
        <canvas ref={canvasRef} className="rounded-3" style={{ aspectRatio: "1/1.4142", width: "100%" }}></canvas>
    );
}