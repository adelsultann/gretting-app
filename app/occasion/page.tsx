"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

// Imported images
import EidFitr from "@/public/assets/occasions/eid-fitr.png";
import EidAdha from "@/public/assets/occasions/eid-adha.png";
import Birthday from "@/public/assets/occasions/birthday.png";
import Graduation from "@/public/assets/occasions/graduation.png";

import NewBirth from "@/public/assets/occasions/newBirth.png";

import Weeding from "@/public/assets/occasions/weeding.png";
const occasions = [
  { id: "eid-fitr", title: "عيد الفطر", image: EidFitr },
  { id: "eid-adha", title: "عيد الأضحى", image: EidAdha },
  { id: "graduation", title: "تخرج", image: Graduation },
  { id: "birthday", title: "مولود", image: NewBirth },
  { id: "weeding", title: "زفاف", image: Weeding },
  { id: "ramadan", title: "شهر رمضان", image: Birthday },
];

export default function OccasionPage() {
  const router = useRouter();

  const handleSelect = (id: string) => {
    //the router hook provide various properties to navigate between pages suc
    router.push(`/designSelection?occasion=${id}`);
  };

  return (
    <section className="min-h-screen bg-[#2B2B2B] text-white px-4 py-10">
      <div className="max-w-5xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">اختر المناسبة</h1>
        <div className="w-24 h-1 bg-[#F8D57E] mx-auto mb-8 rounded-full" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {occasions.map((occasion) => (
            <div
              key={occasion.id}
              className="cursor-pointer rounded-lg overflow-hidden bg-[#484747] hover:scale-105 transition-transform"
              onClick={() => handleSelect(occasion.id)}
            >
              <div className="relative w-full h-90 lg:h-120
              ">
                <Image
                  src={occasion.image}
                  alt={occasion.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="py-3 text-lg font-semibold">{occasion.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
