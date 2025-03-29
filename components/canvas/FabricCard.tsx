"use client";

import { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import FontSettingsForm from "../FontSettingsForm";
import "@fontsource/noto-kufi-arabic";

type FabricCardProps = {
  userName: string;
  backgroundImage: string;
};

export default function FabricCard({ userName, backgroundImage }: FabricCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nameTextRef = useRef<fabric.Text | null>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

  const [fontFamily, setFontFamily] = useState("Noto Kufi Arabic");
  const [fontSize, setFontSize] = useState(28);
  const [fontColor, setFontColor] = useState("#000000");
  const [fontWeight, setFontWeight] = useState("bold");

  useEffect(() => {
    const initCanvas = async () => {
      if (!canvasRef.current) return;

      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 500,
        height: 700,
        selection: true, // Enable selection for text editing
      });
      fabricCanvasRef.current = canvas;

      try {
        const img = await fabric.Image.fromURL(backgroundImage);
        img.scaleToWidth(canvas.getWidth());

        canvas.backgroundImage = img;
        canvas.renderAll();

        const nameText = new fabric.Text(userName, {
          left: 100,
          top: 500,
          fill: fontColor,
          fontSize: fontSize,
          fontWeight: fontWeight,
          fontFamily: fontFamily,
        });

        nameTextRef.current = nameText;

        canvas.add(nameText);
        canvas.renderAll(); // Render after adding the text
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    // This initializes the Fabric.js canvas and sets up everything
    initCanvas();

    // this is clean up function |
    // when the component unmounts in this case BackgroundImage changes 
    // it will clean up the canvas before re-running the useEffect

    return () => {
      fabricCanvasRef.current?.dispose();
      fabricCanvasRef.current = null;
      nameTextRef.current = null; // Clear the text ref
    };
  }, [backgroundImage]);

  useEffect(() => {
    if (!nameTextRef.current || !fabricCanvasRef.current) return;

    nameTextRef.current.set({
      text: userName,
      fontFamily,
      fontSize,
      fontWeight,
      fill: fontColor,
    });

    fabricCanvasRef.current.renderAll();
  }, [userName, fontFamily, fontSize, fontWeight, fontColor]);

  const handleDownload = () => {
    if (!fabricCanvasRef.current) return;

    const dataUrl = fabricCanvasRef.current.toDataURL({
      format: "png",
      quality: 1,
      multiplier: 4,
    });

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "greeting-card.png";
    link.click();
  };

  return (
    <div className="flex flex-col lg:flex-row items-center gap-4">
      <div className="p-2 rounded-md shadow-md">
        <canvas ref={canvasRef} />
      </div>

      <div className="flex flex-col gap-4">
        <FontSettingsForm
          fontFamily={fontFamily}
          setFontFamily={setFontFamily}
          fontSize={fontSize}
          setFontSize={setFontSize}
          fontColor={fontColor}
          setFontColor={setFontColor}
          fontWeight={fontWeight}
          setFontWeight={setFontWeight}
        />

        <button
          onClick={handleDownload}
          className="bg-[#F8D57E] text-black font-semibold px-3 py-2 rounded-lg hover:opacity-90 transition"
        >
          تحميل التصميم
        </button>
      </div>
    </div>
  );
}