// components/FabricCard.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import "@fontsource/noto-kufi-arabic";
import FontSettingsForm from "../FontSettingsForm";

export type FabricCardProps = {
  userName: string;
  backgroundImage: string;
  companyLogo?: string | null;
};

export default function FabricCard({ userName, backgroundImage, companyLogo }: FabricCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(null);

  const [fontFamily, setFontFamily] = useState("Noto Kufi Arabic");
  const [fontSize, setFontSize] = useState(28);
  const [fontColor, setFontColor] = useState("#222222");
  const [fontWeight, setFontWeight] = useState("bold");

  // Helper: load image element with crossOrigin
  const loadImageElement = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(e);
      img.src = url;
    });
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = new fabric.Canvas(canvasRef.current, { width: 500, height: 700, selection: true });
    fabricCanvasRef.current = canvas;

    (async () => {
      try {
        // Background image
        const bgEl = await loadImageElement(backgroundImage);
        const bgImg = new fabric.Image(bgEl);
        bgImg.scaleToWidth(canvas.getWidth());
        canvas.backgroundImage = bgImg;
        canvas.requestRenderAll();

        // Main user name text
        const nameText = new fabric.IText(userName, {
          left: 100,
          top: 500,
          fontFamily,
          fontSize,
          fill: fontColor,
          fontWeight,
        });
        canvas.add(nameText);
        //canvas.setActiveObject(nameText);

        // Company logo
        if (companyLogo) {
          const logoEl = await loadImageElement(companyLogo);
          const logoImg = new fabric.Image(logoEl);
          logoImg.scaleToWidth(100);
          logoImg.set({ left: 20, top: 20, selectable: true, hasControls: true });
          canvas.add(logoImg);
        }

      } catch (error) {
        console.error("Error loading images:", error);
      }
    })();

    // Handle selection
    const updateSelection = () => setSelectedObject(canvas.getActiveObject() ?? null);
    canvas.on('selection:created', updateSelection);
    canvas.on('selection:updated', updateSelection);
    canvas.on('selection:cleared', () => setSelectedObject(null));

    // Delete key
    const handleKeyDown = (e: KeyboardEvent) => {
      const active = canvas.getActiveObject();
      if ((e.key === 'Delete') && active) {
        canvas.remove(active);
        canvas.discardActiveObject();
        canvas.requestRenderAll();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      canvas.dispose();
      fabricCanvasRef.current = null;
    };
  }, [backgroundImage, companyLogo]);

  // Update selected object style
  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas || !selectedObject || !(selectedObject instanceof fabric.IText)) return;
    selectedObject.set({ fontFamily, fontSize, fill: fontColor, fontWeight });
    canvas.requestRenderAll();
  }, [fontFamily, fontSize, fontColor, fontWeight, selectedObject]);

  // Add additional text
  const handleAddAdditionalText = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const text = new fabric.IText('نص', { left: 50, top: 50, fontFamily, fontSize, fill: fontColor, fontWeight });
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.requestRenderAll();
  };

  // Download canvas
  const handleDownload = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    try {
      canvas.discardActiveObject();
      canvas.requestRenderAll();
      const dataUrl = canvas.toDataURL({ format: 'png', quality: 1, multiplier: 4 });
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'greeting-card.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Unable to download image.');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center gap-4">
      <div className="p-2 rounded-md shadow-md bg-white">
        <canvas ref={canvasRef} />
      </div>
      <div className="flex flex-col gap-4">
        <FontSettingsForm
          fontFamily={fontFamily} setFontFamily={setFontFamily}
          fontSize={fontSize} setFontSize={setFontSize}
          fontColor={fontColor} setFontColor={setFontColor}
          fontWeight={fontWeight} setFontWeight={setFontWeight}
          
        />
        <button onClick={handleAddAdditionalText} className="bg-[#F8D57E] text-black px-3 py-2 rounded-lg hover:opacity-90 transition">أضافة نص </button>
        <button onClick={handleDownload} className="bg-[#F8D57E] text-black px-3 py-2 rounded-lg hover:opacity-90 transition">تحميل التصميم</button>
      </div>
    </div>
  );
}
