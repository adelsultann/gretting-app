import React, { useState } from "react";

import "@fontsource/cairo"; // Import Google Fonts
import "@fontsource/amiri";
import "@fontsource/noto-kufi-arabic";


interface FontSettingsFormProps {
  fontFamily: string;
  setFontFamily: (fontFamily: string) => void;
  fontSize: number;
  setFontSize: (fontSize: number) => void;
  fontColor: string;
  setFontColor: (fontColor: string) => void;
  fontWeight: string;
  setFontWeight: (fontWeight: string) => void;
}

const FontSettingsForm = ({
  fontFamily,
  setFontFamily,
  fontSize,
  setFontSize,
  fontColor,
  setFontColor,
  fontWeight,
  setFontWeight,
}: FontSettingsFormProps) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Font Family Dropdown */}
      <label>
         الخط
        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          className="border p-1 rounded bg-black"
        >
          <option value="Arial">Arial</option>
          <option value="Cairo">Cairo (Arabic)</option>
        <option value="Amiri">Amiri (Traditional Arabic)</option>
        <option value="Noto Kufi Arabic">Noto Kufi Arabic</option>
          <option value="Times New Roman">Times New Roman</option>
        
          {/* Add more font options */}
        </select>
      </label>

      {/* Font Size Input */}
      <label>
        حجم الخط:
        <input
          type="number"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="border p-1 rounded bg-black"
          min="10"
          max="150"
          step="1"
        />
      </label>

      {/* Font Color Picker */}
      <label>
        لون الخط:
        <input
          type="color"
          value={fontColor}
          onChange={(e) => setFontColor(e.target.value)}
          className="border p-1 rounded bg-black"
        />
      </label>

      {/* Font Weight Dropdown */}
      <label>
        وزن الخط:
        <select
          value={fontWeight}
          onChange={(e) => setFontWeight(e.target.value)}
          className="border p-1 rounded bg-black"
        >
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
          <option value="lighter">Lighter</option>
          <option value="bolder">Bolder</option>
        </select>
      </label>
    </div>
  );
};

export default FontSettingsForm;