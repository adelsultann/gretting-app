"use client";

import { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import FontSettingsForm from "../FontSettingsForm";
import "@fontsource/noto-kufi-arabic";

type FabricCardProps = {
  userName: string;
  backgroundImage: string;
  companyLogo?: string | null;
};

export default function FabricCard({ userName, backgroundImage, companyLogo }: FabricCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nameTextRef = useRef<fabric.IText | null>(null);
  const additionalNameTextRef = useRef<fabric.IText | null>(null);  // use IText for editable text
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

  const [fontFamily, setFontFamily] = useState("Noto Kufi Arabic");
  const [fontSize, setFontSize] = useState(28);
  const [fontColor, setFontColor] = useState("#000000");
  const [fontWeight, setFontWeight] = useState("bold");
  

  // Initialize canvas and add main objects
  useEffect(() => {
    const initCanvas = async () => {
      if (!canvasRef.current) return;

    
     


      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 500,
        height: 700,
        selection: true,
      });
      fabricCanvasRef.current = canvas;

      try {
        const img = await fabric.Image.fromURL(backgroundImage);
        img.scaleToWidth(canvas.getWidth());
        canvas.backgroundImage = img;
        canvas.renderAll();

        // Create main text as fabric.Text (or fabric.IText if you want inline editing)
        const nameText = new fabric.IText(userName, {
          left: 100,
          top: 500,
          fill: fontColor,
          fontSize: fontSize,
          fontWeight: fontWeight,
          fontFamily: fontFamily,
        });
        nameTextRef.current = nameText;
        canvas.add(nameText);

        // Add company logo if available
        if (companyLogo) {
          const logoImg = await fabric.Image.fromURL(companyLogo);
          logoImg.scaleToWidth(100);
          logoImg.set({
            left: 100,
            top: 100,
            selectable: true,
          });
          canvas.add(logoImg);
        }

        canvas.renderAll();
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    initCanvas();

    return () => {
      fabricCanvasRef.current?.dispose();
      fabricCanvasRef.current = null;
      nameTextRef.current = null;
      additionalNameTextRef.current = null;
    };
  }, [backgroundImage]);

  // Update the main text when dependencies change
  useEffect(() => {
    if (!nameTextRef.current || !fabricCanvasRef.current ) 
      return;


    

    nameTextRef.current.set({
      text: nameTextRef.current.text,
      fontFamily,
      fontSize,
      fontWeight,
      fill: fontColor,
    });

    additionalNameTextRef.current?.set({
      text: additionalNameTextRef.current.text,
      fontFamily,
      fontSize,
      fontWeight,
      fill: fontColor,
    });

    fabricCanvasRef.current.renderAll();
  }, [nameTextRef.current, fontFamily, fontSize, fontWeight, fontColor,additionalNameTextRef.current?.text]);

  // Function to add an additional editable IText
  const handleAddAdditionalText = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    // Create additional text as an IText instance for easier inline editing
    const additionalText = new fabric.IText("نص إضافي", {
      left: 50,
      top: 50,
      fill: fontColor,
      fontSize: fontSize,
      fontFamily: fontFamily,
      fontWeight: fontWeight,
    });

    
    canvas.add(additionalText);
    canvas.renderAll();
    additionalNameTextRef.current = additionalText;
  };

  //  global keydown listener to delete text
  useEffect(() => {
    // 1. Define a handler for keydown events
    const handleKeyDown = (e: KeyboardEvent) => {
      // 2. Grab our Fabric.js canvas instance from the ref
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;  // If it’s not initialized yet, do nothing
  
      // 3. Ask Fabric which object (if any) is currently selected
      const activeObj = canvas.getActiveObject();
      console.log(activeObj?.type, "type", e.key);
  
      // 4. Only proceed if there *is* an active object, and it’s an IText
      //    Fabric internally identifies editable text objects as type "i-text"
      if (activeObj && activeObj.type === "i-text") {
        // 5. If the user pressed the Delete key...
        if (e.key === "Delete") {
          // 6. Remove that object from the canvas
          canvas.remove(activeObj);
          // 7. Clear any selection state
          canvas.discardActiveObject();
          // 8. Redraw the canvas so the change is visible
          canvas.renderAll();
        }
      }
    };
  
    // 9. When this component mounts, start listening to keydown on the whole document
    document.addEventListener("keydown", handleKeyDown);
  
    // 10. And when the component unmounts, clean up by removing that listener
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);  // Empty dependency array means this effect runs only once on mount and cleanup on unmount
  
  const handleDownload = () => {
    // if the canvas is not initialized, return exit without error
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
          onClick={handleAddAdditionalText}
          className="bg-[#F8D57E] text-black font-semibold px-3 py-2 rounded-lg hover:opacity-90 transition"
        >
          أضافة نص اخر
        </button>

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
