// app/auth/layout.tsx

import { ReactNode, Suspense } from "react";


// this page only for vercel deploy 
//Prevents runtime crash on Vercel due to useSearchParams() or usePathname()

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div className="text-white text-center mt-10">جاري التحميل...</div>}>
      {children}
    </Suspense>
  );
}
