// app/contribute/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";
import { auth, db } from "@/lib/firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import { occasions } from "@/lib/data/occasions";

export default function ContributePage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [occasion, setOccasion] = useState<string>("eid-fitr");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/auth");
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      setMessage("Please select an image first.");
      return;
    }
    if (!user) {
      setMessage("You must be logged in to submit a design.");
      return;
    }

    setUploading(true);
    setMessage(null);

    try {
      const imageUrl = await uploadToCloudinary(imageFile);
      await addDoc(collection(db, "designs"), {
        url: imageUrl,
        status: "pending",
        occasion,
        createdAt: Timestamp.now(),
        uploadedBy: user.uid,
        userName: user.displayName || user.email,
        email: user.email,
      });
      setMessage("✅ Design submitted for review!");
      setImageFile(null);
      setPreviewUrl(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setMessage("❌ Upload failed. Please try again.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#2B2B2B] text-white px-6 py-10">
      <div className="max-w-xl mx-auto bg-[#484747] p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4">شارك تصميمك معنا 🎨</h1>

        <p>
          <span className="font-semibold">ملاحظة:</span> يجب ان يكون حجم الصورة 
          <br></br>
          <span className="font-semibold text-red-400">1080 x 1920 px</span> 
        </p>

        {message && <p className="mb-4 text-sm text-yellow-300">{message}</p>}

        <label className="block mb-2 text-sm">اختر المناسبة</label>
        <select
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
          className="w-full mb-4 bg-[#2B2B2B] border border-gray-600 px-4 py-2 rounded-md text-white"
        >
          {occasions.map((o) => (
            <option key={o.id} value={o.id} className="text-white">
           {o.title} 
            </option>
          ))}
        </select>

        <input
        
          type="file"
          accept="image/*"
          onChange={handleImageChange}
         
          className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#F8D57E] file:text-black hover:file:opacity-90 cursor-pointer mb-4"
                  />

        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full mb-4 rounded-md border border-gray-500"
          />
        )}

        <button
          onClick={handleSubmit}
          disabled={uploading}
          className={`w-full py-2 mt-5 rounded-md font-semibold text-black bg-[#F8D57E] hover:opacity-90 transition ${
            uploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {uploading ? "جاري الرفع..." : "إرسال التصميم"}
        </button>
      </div>
    </section>
  );
}
