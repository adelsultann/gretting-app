// app/preview/PreviewClient.tsx
"use client";

import { useState } from "react";
import FabricCard from "@/components/canvas/FabricCard";
import designTemplatesByOccasion from "../designTemplatesByOccasion";

type PreviewClientProps = {
  designId?: string;
  occasion?: string;
  companyLogo?: string | null;
};

export default function PreviewClient({
  designId,
  occasion,
  companyLogo,
}: PreviewClientProps) {
  const [name, setName] = useState("محمد علي");

  const selectedImage = designTemplatesByOccasion[occasion as string]?.find(
    (design) => design.id === designId
  );

  if (!selectedImage) {
    return (
      <div className="text-white p-10 text-center">
        ❌ لم يتم العثور على التصميم.
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#2B2B2B] text-white px-4 py-10">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-3">يرجى إدخال الاسم</h1>
        <div className="w-24 h-1 bg-[#F8D57E] mx-auto mb-4 rounded-full" />

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-2 rounded-md bg-[#484747] text-white outline-none w-full max-w-xs text-center mx-auto mb-6"
          placeholder="اكتب اسمك هنا"
        />

      

        <FabricCard
          backgroundImage={selectedImage.image.src}
          userName={name}
          companyLogo={companyLogo}
        />
      </div>
    </section>
  );
}
