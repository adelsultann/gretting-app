// app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, getIdTokenResult } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { collection, getDocs, updateDoc, doc, Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Design {
  id: string;
  url: string;
  status: string;
  occasion: string;
  uploadedBy: string;
  userName: string;
  email: string;
}

export default function AdminPage() {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);
  // Disables ALL ESLint rules for the next line (if there's another error)
// eslint-disable-next-line
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/auth");
        return;
      }

      const token = await getIdTokenResult(currentUser);
       

      if (token.claims.admin !== true) {
        alert("Access denied: Admins only");
        router.push("/");
        return;
      }

      setUser(currentUser);
      fetchPendingDesigns();
    });

    return () => unsubscribe();
  }, []);

  const fetchPendingDesigns = async () => {
    setLoading(true);
    const snapshot = await getDocs(collection(db, "designs"));
    const docs = snapshot.docs
      .filter((doc) => doc.data().status === "pending")
      .map((doc) => ({ id: doc.id, ...doc.data() })) as Design[];
    setDesigns(docs);
    setLoading(false);
  };

  const handleUpdateStatus = async (id: string, status: "approved" | "rejected") => {
    await updateDoc(doc(db, "designs", id), {
      status,
      reviewedAt: Timestamp.now(),
    });
    setDesigns((prev) => prev.filter((d) => d.id !== id));
  };

  if (loading) return <p className="text-white text-center mt-10">Loading...</p>;

  return (
    <section className="min-h-screen bg-[#2B2B2B] text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Pending Designs for Review</h1>
        {designs.length === 0 ? (
          <p className="text-yellow-400">No pending designs.</p>
        ) : (
          <div className="space-y-6">
            {designs.map((design) => (
              <div key={design.id} className="bg-[#484747] p-4 rounded-md">
                <Image
                  src={design.url}
                  alt="Design"
                  className="w-full max-w-sm rounded-md border mb-2"
                />
                <p className="text-sm">Uploaded by: {design.userName} ({design.email})</p>
                <p className="text-sm mb-2">Occasion: {design.occasion}</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleUpdateStatus(design.id, "approved")}
                    className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-white text-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(design.id, "rejected")}
                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white text-sm"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
