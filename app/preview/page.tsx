"use client";

import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

import Design1 from "@/public/assets/Eid-alftar_design/design1.png";
import Design2 from "@/public/assets/Eid-alftar_design/design2.png";
import Design3 from "@/public/assets/Eid-alftar_design/design3.png";
import Design4 from "@/public/assets/Eid-alftar_design/design4.png";
import Design5 from "@/public/assets/Eid-alftar_design/design5.png";
import FabricCard from "@/components/canvas/FabricCard";

const eidDesigns = {
  "1": Design1,
  "2": Design2,
  "3": Design3,
  "4": Design4,
  "5": Design5,
};

export default function PreviewPage() {
     const searchParams = useSearchParams();
     const designId = searchParams.get("design");
     const occasion = searchParams.get("occasion");
   
     const [name, setName] = useState("سارة محمد");
   
     const selectedImage = eidDesigns[designId as keyof typeof eidDesigns];
   
     if (!selectedImage) {
       return <div className="text-white p-10 text-center">لم يتم العثور على التصميم</div>;
     }
   
     return (
       <section className="min-h-screen bg-[#2B2B2B] text-white px-4 py-10">
         <div className="max-w-4xl mx-auto text-center">
           <h1 className="text-2xl font-bold mb-6">معاينة التصميم</h1>
   
           <input
             value={name}
             onChange={(e) => setName(e.target.value)}
             className="px-4 py-2 rounded-md bg-[#484747] text-white outline-none w-full max-w-xs text-center mx-auto mb-6"
             placeholder="اكتب اسمك هنا"
           />
   
   <FabricCard backgroundImage={selectedImage.src} userName={name} 
   
   />

         </div>
       </section>
     );
   }