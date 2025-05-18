"use client";

import { useEffect, useState } from "react";
import FabricCard from "@/components/canvas/FabricCard";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import SpinnerLoader from "@/components/ui/spinner";

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
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDesign = async () => {
      if (!designId) return;

      try {
        const designRef = doc(db, "designs", designId);
        const designSnap = await getDoc(designRef);

        if (designSnap.exists()) {
          const data = designSnap.data();
          setImageUrl(data.url);
        } else {
          console.error(" Design not found");
        }
      } catch (err) {
        console.error("Error fetching design:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDesign();
  }, [designId]);

  if (loading) {
      return (
      <section className="min-h-screen flex items-center justify-center bg-[#2B2B2B] text-white text-xl">
               <SpinnerLoader />
             </section>
      
      );
    }
  if (!imageUrl) {
    return (
      <div className="text-white p-10 text-center">❌ لم يتم العثور على التصميم.</div>
    );
  }

  return (
    <section className="min-h-screen bg-[#2B2B2B] text-white px-4 py-10">
      <div className="max-w-4xl mx-auto text-center">
        {/* <h1 className="text-2xl font-bold mb-3">يرجى إدخال الاسم</h1> */}
        <div className="w-24 h-1 bg-[#F8D57E] mx-auto mb-4 rounded-full" />

        {/* <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-2 rounded-md bg-[#484747] text-white outline-none w-full max-w-xs text-center mx-auto mb-6"
          placeholder="اكتب اسمك هنا"
        /> */}

        <FabricCard
          backgroundImage={imageUrl}
          userName={name}
          companyLogo={companyLogo}
        />
      </div>
    </section>
  );
}
