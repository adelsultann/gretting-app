"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

// Eid al-Fitr templates
import Eid1 from "@/public/assets/Eid-alftar_design/design1.png";
import Eid2 from "@/public/assets/Eid-alftar_design/design2.png";
import Eid3 from "@/public/assets/Eid-alftar_design/design3.png";
import Eid4 from "@/public/assets/Eid-alftar_design/design4.png";
import Eid5 from "@/public/assets/Eid-alftar_design/design5.png";

// Add more groups later (e.g., Eid Adha, Graduation, etc.)

const designTemplatesByOccasion: Record<
  string,
  { id: string; title: string; image: any }[]
> = {
  "eid-fitr": [
    { id: "1", title: "تصميم 1", image: Eid1 },
    { id: "2", title: "تصميم 2", image: Eid2 },
    { id: "3", title: "تصميم 3", image: Eid3 },
    { id: "4", title: "تصميم 4", image: Eid4 },
    { id: "5", title: "تصميم 5", image: Eid5 },
  ],
};

export default function DesignPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const occasion = searchParams.get("occasion");

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const templates = designTemplatesByOccasion[occasion as string] || [];

  const handleNext = () => {
    if (selectedId) {
      router.push(`/preview?design=${selectedId}&occasion=${occasion}`);
    }
  };

  if (!occasion || templates.length === 0) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-[#2B2B2B] text-white text-xl">
        لا توجد تصاميم متاحة لهذه المناسبة.
      </section>
    );
  }

  return (

    
    <section className="min-h-screen bg-[#2B2B2B] text-white px-4 py-10">
      <div className="max-w-5xl mx-auto text-center">

        
        <h2 className="text-2xl font-bold mb-3">اختر التصميم ثم انقر على التاللي</h2>
        <div className="w-24 h-1 bg-[#F8D57E] mx-auto  rounded-full" />
        <button
          onClick={handleNext}
          disabled={!selectedId}
          className={`m-8 bg-[#F8D57E] text-black font-semibold px-6 py-2 rounded-lg transition-all ${
            !selectedId ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
          }`}
        >
          التالي
        </button>

      
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => setSelectedId(template.id)}
              className={`cursor-pointer rounded-xl overflow-hidden bg-[#484747] border-4 transition-all ${
                selectedId === template.id ? "border-[#F8D57E]" : "border-transparent"
              }`}
            >
              <div className="relative w-full h-85">
                <Image
                  src={template.image}
                  alt={template.title}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="py-2 text-sm font-medium">{template.title}</p>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
}
