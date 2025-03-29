// app/preview/layout.tsx

// this page only for vercel deploy 
//Prevents runtime crash on Vercel due to useSearchParams() or usePathname()
import { ReactNode, Suspense } from "react";

export default function PreviewLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div className="text-white text-center mt-10">جاري التحميل...</div>}>
      {children}
    </Suspense>
  );
}
