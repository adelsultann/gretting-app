import Link from 'next/link';
import { FaTwitter, FaGithub } from 'react-icons/fa'; // Example using react-icons (install: npm install react-icons)
export default function Footer() {
  const currentYear = new Date().getFullYear(); 

  return (
    <footer className="bg-[#2B2B2B] text-white mt-auto"> {/* mt-auto helps stick it to bottom if main content is short */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-8">

          {/* Left Section: Brand and Copyright */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-[#F8D57E]">
              تهنئتي 
            </h3>

            <p className="text-sm text-gray-400 mt-2">
              &copy; {currentYear} جميع الحقوق محفوظة 
            </p>
          </div>


          {/* Center Section: Navigation Links */}
          <nav className="flex gap-6">
            <Link href="/occasion" className="text-lg hover:text-[#F8D57E] transition-colors">
              إنشاء بطاقة 
            </Link>
            <Link href="/auth" className="text-lg hover:text-[#F8D57E] transition-colors">
              تسجيل الشركات 
            </Link>
          
          </nav>

          {/* Right Section: Social Links and Contact */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm font-semibold">تواصل معنا</p> 
            
            
            {/* Contact Us */}
            <div className="flex gap-4">
              <Link href="https://x.com/Adel12342360" aria-label="Twitter" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#BFAFF2] transition-colors">
                <FaTwitter size={20} />
              </Link>
              

              <Link href="https://github.com/adelsultann" aria-label="Snapchat" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#BFAFF2] transition-colors">
                <FaGithub size={20} />
              </Link>
            
            </div>
            
              <Link href="" className="text-sm text-gray-400 hover:text-[#F8D57E]">adelalsultan647@gmail.com</Link>
          </div>

        </div>
      </div>
    </footer>
  );
}