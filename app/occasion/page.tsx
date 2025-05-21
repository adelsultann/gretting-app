"use client";

import { useRouter, useSearchParams } from "next/navigation"; 
import Image from "next/image";
import { occasions } from "@/lib/data/occasions";
import Navbar from "@/components/Navbar";



export default function OccasionPage() {
  const router = useRouter();
  // Hook to get query params
  const searchParams = useSearchParams(); 
  const orgId = searchParams.get("org"); 
  const handleSelect = (occasionId: string) => {
    //  Construct the URL with both occasion and org parameters
    let queryString = `occasion=${occasionId}`;
    if (orgId) {
      queryString += `&org=${orgId}`; // Append orgId if it exists
    }
    router.push(`/designSelection?${queryString}`);
  };

   return (

    <div>
           <Navbar />

     <section className="min-h-screen bg-[#2B2B2B] text-white px-4 py-10">

      {/* the mx-auto is used to center the content horizontally within its parent container */}
       <div className="max-w-2xl mx-auto text-center">
        
       <h1 className="text-2xl font-bold mb-4">اختر المناسبة</h1>
         <div className="w-24 h-1 bg-[#F8D57E] mx-auto mb-8 rounded-full" />




         <div className="grid grid-cols-2 md:grid-cols-3 gap-6 h-full">

           {occasions.map((occasion) => (
             <div
               key={occasion.id}
               className="cursor-pointer rounded-lg  bg-[#484747] hover:scale-105 transition-transform"
               onClick={() => handleSelect(occasion.id)}
             >
               <div className="relative w-full h-48 md:h-90">
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
     </div>
   );
}