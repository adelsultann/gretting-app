
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { browserSessionPersistence, createUserWithEmailAndPassword, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase"; // Adjust path if needed
import { doc, setDoc, Timestamp } from "firebase/firestore"; // Import Timestamp
import { v4 as uuidv4 } from 'uuid'; // Import uuid library (install: npm install uuid @types/uuid)

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isRegister && !/^[a-zA-Z0-9\s\-\_\.]+$/.test(companyName)) {
      setError("❌ Company name must not contain special symbols like @, #, $, etc.");
      return;
    
    }

    try {
      if (isRegister) {
        // 1. Create user with Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Generate unique shareable ID
        const shareId = uuidv4();
        const initialSlug = companyName.toLowerCase().replace(/\s+/g, "-"); 

        // ✅ 2. Create the "organizations" document in Firestore
        await setDoc(doc(db, "organizations", user.uid), {
          companyName,
          logoUrl: "", // Initial empty logo URL
          slug: initialSlug,
          shareableId: shareId, 
          userId: user.uid,
          createdAt: Timestamp.fromDate(new Date()), 
        });
        //setPersistence(auth, browserSessionPersistence)
        router.push("/dashboard");
      } else {
        // If logging in
        await signInWithEmailAndPassword(auth, email, password);
        //setPersistence(auth, browserSessionPersistence)

        
        router.push("/dashboard");
      }
    } catch (err: any) { // Better error typing
        const errorCode = err.code;
        // Provide more specific Firebase Auth errors if desired
        if (errorCode === 'auth/email-already-in-use') {
            setError("❌ This email address is already registered.");
        } else if (errorCode === 'auth/weak-password') {
            setError("❌ The password is too weak.");
        } else if (errorCode === 'auth/invalid-email') {
            setError("❌ Please enter a valid email address.");
        } else if (errorCode === 'auth/invalid-credential') { // For login errors
             setError("❌ Invalid email or password.");
        }
        else {
            setError("❌ An error occurred. Please try again.");
        }
      console.error("Firebase Auth Error:", err);
    }
  };

  
   return (
     <section className="min-h-screen bg-[#2B2B2B] flex justify-center items-center text-white px-4">
       <form
         onSubmit={handleSubmit}
         className="bg-[#484747] p-6 rounded-xl max-w-md w-full space-y-4 shadow-lg"
       >
         <h1 className="text-xl font-bold text-center">
           {isRegister ? "إنشاء حساب جديد" : "تسجيل الدخول"}
         </h1>
         <input
           type="email"
           required
           value={email}
           onChange={(e) => setEmail(e.target.value)}
           placeholder="البريد الإلكتروني"
           className="w-full p-2 rounded-md bg-[#2C2B2B] text-white outline-none"
         />

         <input
           type="password"
           required
           value={password}
           onChange={(e) => setPassword(e.target.value)}
           placeholder="كلمة المرور"
           className="w-full p-2 rounded-md bg-[#2B2B2B] text-white outline-none"
         />
         
         {isRegister && (
           <input
             type="text"
             required
             value={companyName}
             onChange={(e) => setCompanyName(e.target.value)}
             placeholder="Company name (English only)"
             className="w-full p-2 rounded-md bg-[#2B2B2B] text-white outline-none"
           />
         )}
         {error && <p className="text-red-400 text-sm text-center">{error}</p>}
         <button
           type="submit"
           className="bg-[#F8D57E] text-black font-semibold w-full py-2 rounded-md hover:opacity-90 transition"
         >
           {isRegister ? "تسجيل حساب جديد" : "تسجيل الدخول"}
         </button>


         <p className="text-sm text-center mt-2">

          
           {isRegister ? "هل لديك حساب؟" : "ليس لديك حساب؟"}{" "}
           <button
             type="button"
             onClick={() => setIsRegister(!isRegister)}
             className="text-[#BFAFF2] underline"
           >
             {isRegister ? "سجّل الدخول" : "سجل الان"}
           </button>
         </p>
       </form>
     </section>
   );
}