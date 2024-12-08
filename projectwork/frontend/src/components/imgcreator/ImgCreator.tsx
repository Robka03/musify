import { useEffect, useRef } from "react";

const a4Width = 973;  // A4 width in px
const a4Height = 1332; // A4 height in px

export default function ImgCreator({ imageDetails }: { imageDetails: { img: HTMLImageElement, code: HTMLImageElement, title: string, artist: string, length: number } | undefined }) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            if (ctx) {

                // Resize canvas to A4 aspect ratio
                canvas.width = a4Width;
                canvas.height = a4Height;

                if (!imageDetails) {
                    ctx.clearRect(0, 0, a4Width, a4Height);
                    ctx.fillStyle = "#c1c1c1";
                    ctx.fillRect(0, 0, a4Width, a4Height);
                    ctx.fillStyle = "white";
                    ctx.font = "50px Arial";
                    ctx.textBaseline = "middle";
                    ctx.textAlign = "center";
                    ctx.fillText(`Create your own art here`, a4Width / 2, a4Height / 2)
                    return;
                }
                const cover = imageDetails.img;
                // A4 size in pixels at 96 DPI

                // Draw the image on the canvas
                ctx.clearRect(0, 0, a4Width, a4Height); // Clear the canvas before drawing
                ctx.drawImage(cover, a4Width/2-a4Height/2, 0, a4Height, a4Height);
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
                
                const codeImage = imageDetails.code;
                ctx.save();
                ctx.globalCompositeOperation = "lighter"; // Ensure only white areas get drawn
                ctx.drawImage(codeImage, 234, 123, 505, 127);
                ctx.restore(); // Reset the composite operation

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