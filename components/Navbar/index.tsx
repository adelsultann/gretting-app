import Link from "next/link";


export default function Navbar() {
  return (
    
    <header className="flex justify-center py-1.5">
  {/* <!-- Centered Div --> */}
  <div className=" flex justify-between w-full max-w-[375px] md:max-w-[600px] bg-[#484747] rounded-sm p-4">
   
    <div>
      <Link href={"/occasion"} className="bg-yellow-500 text-black px-4 py-2 
      
      rounded">للأفراد</Link>
    </div>
    
   
    <div className="md:flex gap-4 ">
    <Link href="/auth" className="hidden md:block text-[#F8D57E] hover:text-yellow-500 ">بطاقة للشركات</Link>
    </div>

   
    <Link href="/" className="text-white font-bold">تهنئتي</Link>
  </div>
  
</header>
  );
}