export default function Footer() {
  return (
       <footer className="bg-[#282828] py-8 text-white m-1.5">
         <div className="container mx-auto px-4">

           <div className="flex flex-col-reverse md:flex-row-reverse items-center justify-between">

           <div className="mb-4 md:mb-0 text-center">
               <h2 className="text-lg font-semibold">تهنئتي</h2>
               <p className="text-sm">جميع الحقوق محفوظة</p>
               <hr className='mt-1 w-full h-2' />
             </div>

             <div className="hidden md:block w-px h-20 bg-gray-600 mx-4"></div>


             <a href="#" className="text-sm hover:underline mb-1">
                 تواصل معنا
               </a>
             <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-5">
               <div className="flex flex-col md:flex-row items-center justify-center gap-4">

                 <div className="flex flex-col sm:flex-row items-center gap-2">
                      
                   <input
                     type="email"
                     placeholder="البريد الإلكتروني"
                     className="bg-[#424242] text-white rounded-md px-4 py-2 focus:outline-none w-full sm:w-64 text-right"
                     dir="rtl"
                   />
                   <button className="bg-[#A084CF] text-white rounded-md px-6 py-2 w-full sm:w-auto hover:bg-[#8a6db9] transition-colors">
                     تسجيل
                   </button>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </footer>
     );
   };