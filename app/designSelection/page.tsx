// app/designSelection/page.tsx
import { Suspense } from "react";
import DesignPage from "./designPage";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-10">جاري التحميل...</div>}>
      <DesignPage />
    </Suspense>
  );
}
