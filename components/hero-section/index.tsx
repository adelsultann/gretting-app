import Image from 'next/image'
import heroImage1 from "@/public/assets/hero-img1.png"
import heroImage2 from "@/public/assets/hero-img2.png"
import heroImage3 from "@/public/assets/hero-img3.png"
import heroImage4 from "@/public/assets/hero-img4.png"
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 py-12 max-w-7xl mx-auto">
    
     
      {/* Responsive Stacked Images Container */}
      <div className="relative md:mt-5 w-full md:w-[400px] lg:w-[500px] mb-5 aspect-square max-w-[500px] mx-auto">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 transform -rotate-4 origin-bottom-right">
          <Image
            src={heroImage3}
            alt="بطاقات تهنئة"
            fill
            sizes="(max-width: 768px) 50vw, 250px"
            className="object-cover rounded-2xl shadow-lg"
          />
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 transform rotate-4 origin-bottom-left">
          <Image
            src={heroImage1}
            alt="بطاقات تهنئة"
            fill
            sizes="(max-width: 768px) 50vw, 250px"
            className="object-cover rounded-2xl shadow-lg"
          />
        </div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 transform rotate-7 origin-top-right">
          <Image
            src={heroImage4}
            alt="بطاقات تهنئة"
            fill
            sizes="(max-width: 768px) 50vw, 250px"
            className="object-cover rounded-2xl shadow-lg"
          />
        </div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 transform -rotate-6 origin-top-right">
          <Image
            src={heroImage2}
            alt="بطاقات تهنئة"
            fill
            sizes="(max-width: 768px) 50vw, 250px"
            className="object-cover rounded-2xl shadow-lg"
          />
        </div>

        
      </div>
       {/* end of Stacked Images Container */}

        <div className="flex flex-col items-center text-center  md:text-right space-y-4 z-10 md:w-1/2">
        <h1 className="text-3xl md:text-4xl font-bold leading-relaxed text-ce">
          خليك دايم <span className="text-[#BFAFF2] text-center">قريب منهم💗 </span>
        </h1>
        

      <hr className='w-30 h-1  bg-[#F8D57E]' />
        <p className="text-lg text-gray-300 max-w-md">
          بطاقات تهنئة مخصصة ومصممة للمناسبات الخاصة مثل عيد الفطر، عيد الأضحى، اليوم الوطني، حفلات التخرج، المناسبات العائلية.
        </p>

        <Link className="bg-[#F8D57E] text-black font-semibold px-6 py-2 rounded-lg mt-4 hover:opacity-90 transition"
         href={"/auth"} 
     
        >
          
          ابدأ الآن
        </Link>
      </div>
    </section>
  )
}