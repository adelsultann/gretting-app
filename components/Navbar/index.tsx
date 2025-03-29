import Link from "next/link";


export default function Navbar() {
  return (
    
     <header className="flex justify-center py-1.5">
      
  <div className="flex items-center justify-between w-full max-w-[375px] md:max-w-[600px]  z-50 top-3 py-3 px-4 bg-[#484747] rounded-full transition-all duration-300 shadow-lg">

   
    <div className="xl:flex flex-row">

    <Link href="/occasion" className=" text-sm font-medium text-black py-1 px-4 rounded-md  bg-[#F8D57E] hover:text-white cursor-pointer transition-colors duration-300 hover:shadow-lg"> 
           
         <span className="text-base-100 text-body-md">ابدا الان</span>
      </Link>
    </div>

   
    <div className="hidden md:flex flex-row gap-6">
      
      

      <div className="inline-block relative z-10">
        <Link href="/">
          <span className=" text-white hover:text-[#F8D57E] cursor-pointer transition-colors duration-300">تواصل معنا</span>
        </Link>
      </div>
    </div>

  

    <Link href="/" className="w-fit h-fit  justify-center text-l font-bold text-white-800 ">
      تهنئتي
    </Link>
  </div>
</header>
  );
}