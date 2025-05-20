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
  const containerRef = useRef<HTMLDivElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(null);
  const [canvasInitialized, setCanvasInitialized] = useState(false);
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 500, height: 700 });

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

  // Calculate responsive dimensions based on container width
  const calculateDimensions = () => {
    if (!containerRef.current) return { width: 500, height: 700 };
    
    const container = containerRef.current;
    // Get the available width (accounting for padding/margins)
    const containerWidth = container.clientWidth - 16; // 16px for padding
    
    // For mobile: use full container width but cap at original size
    const maxWidth = Math.min(500, containerWidth);
    // Maintain aspect ratio
    const scaleFactor = maxWidth / 500;
    const height = Math.round(700 * scaleFactor);
    
    return { width: maxWidth, height };
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      // Get new dimensions
      const newDimensions = calculateDimensions();
      
      // Update state (this will trigger canvas resize)
      setCanvasDimensions(newDimensions);
    };

    // Add resize listener
    window.addEventListener('resize', handleResize);
    // Initial calculation
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize and set up canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // If we already initialized the canvas, resize it instead of recreating
    if (fabricCanvasRef.current && canvasInitialized) {
      const canvas = fabricCanvasRef.current;
      canvas.setWidth(canvasDimensions.width);
      canvas.setHeight(canvasDimensions.height);
      
      // Scale the canvas contents when resizing
      const scaleFactor = canvasDimensions.width / 500;
      canvas.setZoom(scaleFactor);
      
      // Resize background image
      if (canvas.backgroundImage) {
        const bgImg = canvas.backgroundImage as fabric.Image;
        bgImg.scaleToWidth(canvas.getWidth() / canvas.getZoom());
        canvas.requestRenderAll();
      }
      
      return;
    }
    
    // Create new canvas
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: canvasDimensions.width,
      height: canvasDimensions.height,
      selection: true
    });
    fabricCanvasRef.current = canvas;
    
    // Calculate scaling factor
    const scaleFactor = canvasDimensions.width / 500;
    canvas.setZoom(scaleFactor);

    (async () => {
      try {
        // Background image
        const bgEl = await loadImageElement(backgroundImage);
        const bgImg = new fabric.Image(bgEl);
        bgImg.scaleToWidth(canvas.getWidth() / canvas.getZoom());
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
    
    // Mark as initialized
    setCanvasInitialized(true);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      canvas.dispose();
      fabricCanvasRef.current = null;
    };
  }, [backgroundImage, companyLogo, canvasDimensions]);

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
    const text = new fabric.IText('نص', { 
      left: 100, 
      top: 500, 
      fontFamily, 
      fontSize, 
      fill: fontColor, 
      fontWeight 
    });
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
      
      // For download, use original dimensions (500x700) for better quality
      const scaleFactor = 500 / canvas.getWidth();
      const dataUrl = canvas.toDataURL({ 
        format: 'png', 
        quality: 1, 
        multiplier: 4 * scaleFactor // Adjust multiplier based on current size
      });
      
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
    <div ref={containerRef} className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-start justify-center gap-3">
        <div className="w-full md:w-auto p-2 rounded-md shadow-md bg-white">
          <canvas ref={canvasRef} />
        </div>
        <div className="w-full md:w-72 flex flex-col gap-4">
          <FontSettingsForm
            fontFamily={fontFamily} setFontFamily={setFontFamily}
            fontSize={fontSize} setFontSize={setFontSize}
            fontColor={fontColor} setFontColor={setFontColor}
            fontWeight={fontWeight} setFontWeight={setFontWeight}
          />
          <button 
            onClick={handleAddAdditionalText} 
            className="bg-[#F8D57E] text-black px-3 py-2 rounded-lg hover:opacity-90 transition w-full"
          >
            أضافة نص
          </button>
          <button 
            onClick={handleDownload} 
            className="bg-[#F8D57E] text-black px-3 py-2 rounded-lg hover:opacity-90 transition w-full"
          >
            تحميل التصميم
          </button>
        </div>
      </div>
    </div>
  );
}