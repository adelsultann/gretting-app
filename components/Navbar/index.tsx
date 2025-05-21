import Link from "next/link";
import Image from "next/image";
import MainLogo from '@/public/mainLogo.png';

export default function Navbar() {
  return (
    <header className="flex justify-center py-3 bg-gradient-to-b from-[#3a3939] to-[#484747]">
      {/* Centered Container */}
      <div className="flex items-center justify-between w-full max-w-[90%] md:max-w-[800px] bg-[#484747] rounded-lg shadow-lg p-2 md:p-3">
        
        {/* For Individuals Button */}
        <div>
          <Link 
            href="/occasion" 
            className="bg-[#F8D57E] text-black px-4 py-2 rounded-lg font-bold 
                      hover:bg-yellow-500 transition duration-300 shadow-md
                      text-sm md:text-base"
          >
            للأفراد
          </Link>
        </div>
        
        {/* Center Logo */}
        <Link 
          href="/" 
          className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center"
        >
          <div className="relative">
            <Image 
              src={MainLogo} 
              width={85} 
              height={85} 
              alt="logo" 
              className="w-10 h-10 md:w-15 md:h-15" 
              priority
            />
          </div>
        </Link>
        
        {/* For Companies Link */}
        <div className="flex items-center">
          <Link 
            href="/auth" 
            className="text-[#F8D57E] hover:text-yellow-400 transition duration-300
                      font-semibold text-sm md:text-base"
          >
            بطاقة للشركات
          </Link>
        </div>
      </div>
    </header>
  );
}