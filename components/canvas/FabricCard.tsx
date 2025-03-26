"use client";

import { useEffect, useRef } from "react";
import * as fabric from "fabric";

type FabricCardProps = {
  userName: string;
  backgroundImage: string;
};

export default function FabricCard({ userName, backgroundImage }: FabricCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null); // 🔁 holds fabric canvas instance

  
  useEffect(() => {
    const initCanvas = async () => {
      // Dispose the old canvas if exists
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }

      if (!canvasRef.current) {
        console.error("Canvas ref is null");
        return;
      }

      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 400,
        height: 600,
        selection: false,
      });

      fabricCanvasRef.current = canvas; // Save instance for later cleanup

      const absoluteImageUrl = backgroundImage.startsWith("http")
        ? backgroundImage
        : `${window.location.origin}${backgroundImage}`;

      try {
        const img = await fabric.Image.fromURL(absoluteImageUrl);
        img.scaleToWidth(canvas.getWidth());

        canvas.backgroundImage = img;
        canvas.renderAll();

        const nameText = new fabric.Text(userName, {
          left: 100,
          top: 500,
          fill: "#000000",
          fontSize: 28,
          fontWeight: "bold",
        });

        canvas.add(nameText);
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    initCanvas();
  }, [userName, backgroundImage]);

  const handleDownload = () => {
    if (!fabricCanvasRef.current) return;

    const dataUrl = fabricCanvasRef.current.toDataURL({
      format: "png",
      quality: 1,
      multiplier: 3,
    });

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "greeting-card.png";
    link.click();
  };

  return (
     <div className="flex flex-col items-center gap-4">
       {/* Card preview with shadow */}
       <div className=" p-2 rounded-md shadow-md">
         <canvas ref={canvasRef} />
       </div>
   
       {/* Download button outside the canvas box */}
       <button
         onClick={handleDownload}
         className="bg-[#F8D57E] text-black font-semibold px-6 py-2 rounded-lg hover:opacity-90 transition"
       >
         تحميل التصميم
       </button>
     </div>
   );
   
   
}
