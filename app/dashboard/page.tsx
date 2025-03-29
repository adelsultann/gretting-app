"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db, storage } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [companyName, setCompanyName] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // For error messages

  const router = useRouter();

  useEffect(() => {
     const unsubscribe = onAuthStateChanged(auth, (user) => {
       if (user) {
         setUser(user); // ✅ Add this line
         fetchOrganizationData(user.uid);
       } else {
         router.push("/auth");
       }
     });
   
     return () => unsubscribe();
   }, []);
   const fetchOrganizationData = async (uid: string) => {
     try {
       const docRef = doc(db, "organizations", uid);
       const docSnap = await getDoc(docRef);
   
       if (docSnap.exists()) {
         const data = docSnap.data();
         setCompanyName(data.companyName);
         setLogoPreview(data.logoUrl);
       } else {
         setErrorMessage("Organization data not found");
       }
     } catch (error: any) {
       console.error("🔥 Firestore error:", error);
       setErrorMessage("Failed to fetch organization data.");
     } finally {
       setLoading(false); // ✅ make sure dashboard renders
     }
   };
   
   
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setLogoFile(file);
      setLogoPreview(previewUrl);
      //cleanup function
      return () => URL.revokeObjectURL(previewUrl);
    }
  };

  const handleSave = async () => {
    if (!companyName || !user) {
      setErrorMessage("Please enter company name.");
      return;
    }

    setSaving(true);
    setErrorMessage(null); // Clear previous error

    try {
      let logoUrl = logoPreview;

      if (logoFile) {
        const storageRef = ref(storage, `logos/${user.uid}`);
        await uploadBytes(storageRef, logoFile);
        logoUrl = await getDownloadURL(storageRef);
      }

      await setDoc(doc(db, "organizations", user.uid), {
        companyName,
        logoUrl,
        slug: companyName.toLowerCase().replace(/\s+/g, "-"),
        userId: user.uid,
        createdAt: new Date().toISOString(),
      });

      alert("Data saved successfully.");
    } catch (error: any) {
      console.error("Upload error:", error);
      setErrorMessage("Failed to save data.");
    }

    setSaving(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/auth");
  };

  if (loading) return <p className="text-center text-white mt-10">Loading...</p>;

  return (
    <section className="min-h-screen bg-[#2B2B2B] text-white px-6 py-10">
      <div className="max-w-2xl mx-auto bg-[#484747] p-6 rounded-xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Company Dashboard</h1>
          <button
            onClick={handleLogout}
            className="text-sm bg-[#F8D57E] text-black font-semibold px-3 py-1 rounded-md hover:opacity-90"
          >
            Logout
          </button>
        </div>

        <div className="space-y-4">
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <label className="block text-sm">Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-[#2B2B2B] text-white placeholder:text-gray-400 outline-none"
            placeholder="e.g., Vision Company"
          />

          <label className="block text-sm">Company Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="text-sm text-white"
          />

          {logoPreview && (
            <div className="mt-2">
              <p className="text-xs mb-1">Logo Preview:</p>
              <img
                src={logoPreview}
                alt="Logo Preview"
                className="w-32 h-32 object-contain rounded-md border border-gray-600"
              />
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            className={`mt-6 w-full py-2 bg-[#F8D57E] text-black font-semibold rounded-md transition ${
              saving ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
            }`}
          >
            {saving ? "Saving..." : "Save Data"}
          </button>
        </div>

        <div className="mt-6 text-sm text-gray-300">
          <p>
            🔗 Company Employee Link:{" "}
            <span className="text-[#F8D57E]">
              /org/{companyName.toLowerCase().replace(/\s+/g, "-")}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}