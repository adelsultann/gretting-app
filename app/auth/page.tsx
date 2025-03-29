"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [companyName, setCompanyName] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        router.push("/auth");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file)); // preview
    }
  };

  const handleSave = async () => {
    if (!companyName) {
      alert("يرجى إدخال اسم الشركة");
      return;
    }

    if (!logoFile) {
      alert("يرجى رفع شعار الشركة");
      return;
    }

    alert("✅ بيانات جاهزة للحفظ (سنضيف Firestore قريباً)");
  };

  if (loading) return <p className="text-center text-white">جاري التحميل...</p>;

  return (
    <section className="min-h-screen bg-[#2B2B2B] text-white px-6 py-10">
      <div className="max-w-2xl mx-auto bg-[#484747] p-6 rounded-xl">
        <h1 className="text-2xl font-bold mb-6">لوحة تحكم الشركة</h1>

        <div className="space-y-4">
          <label className="block text-sm">اسم الشركة</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-[#2B2B2B] text-white placeholder:text-gray-400 outline-none"
            placeholder="مثال: شركة الرؤية"
          />

          <label className="block text-sm">شعار الشركة</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="text-sm text-white"
          />

          {logoPreview && (
            <div className="mt-2">
              <p className="text-xs mb-1">معاينة الشعار:</p>
              <img
                src={logoPreview}
                alt="Logo Preview"
                className="w-32 h-32 object-contain rounded-md border border-gray-600"
              />
            </div>
          )}

          <button
            onClick={handleSave}
            className="mt-6 w-full py-2 bg-[#F8D57E] text-black font-semibold rounded-md hover:opacity-90 transition"
          >
            حفظ البيانات
          </button>
        </div>
      </div>
    </section>
  );
}
