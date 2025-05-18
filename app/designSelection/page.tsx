"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import SpinnerLoader from "@/components/ui/spinner";

interface Design {
  id: string;
  url: string;
  title?: string;
}

export default function DesignPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const occasion = searchParams.get("occasion");
  const orgId = searchParams.get("org");

  const [designs, setDesigns] = useState<Design[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  //
  useEffect(() => {
    const fetchDesigns = async () => {
      // if occasion is null, return exit early if occasion is null
      if (!occasion) return;


      setLoading(true);
      const q = query(
        collection(db, "designs"),
        where("occasion", "==", occasion),
        where("status", "==", "approved")
      );
      //is an object returned by firebase to retrive all the documents in the collection
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Design[];

      // console.log(data);
      // console.log("#########################");
      
      setDesigns(data);
      setLoading(false);
    };

    fetchDesigns();
    
    // the useEffect will run when the occasion changes this is the (dependency array)
  }, [occasion]);

  const handleNext = () => {
    if (selectedId) {
      let queryString = `/preview?design=${selectedId}&occasion=${occasion}`;
      if (orgId) {
        queryString += `&org=${orgId}`;
      }
      router.push(queryString);
    }
  };

  if (loading) {
    return (
    <section className="min-h-screen flex items-center justify-center bg-[#2B2B2B] text-white text-xl">
             <SpinnerLoader />
           </section>
    
    );
  }

  if (!occasion || designs.length === 0) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-[#2B2B2B] text-white text-xl">
        لا توجد تصاميم متاحة لهذه المناسبة.
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#2B2B2B] text-white px-4 py-10">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-3">اختر التصميم ثم انقر على التالي</h2>
        <div className="w-24 h-1 bg-[#F8D57E] mx-auto rounded-full" />

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
          {designs.map((template) => (
            <div
              key={template.id}
              onClick={() => setSelectedId(template.id)}
              className={`cursor-pointer rounded-xl overflow-hidden bg-[#484747] border-4 transition-all ${
                selectedId === template.id
                  ? "border-[#F8D57E]"
                  : "border-transparent"
              }`}
            >
              <div className="relative w-full h-90 sm:h-135">
                <Image
                  src={template.url}
                  alt={template.title || "تصميم"}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="py-2 text-sm font-medium">{template.title || "تصميم"}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
