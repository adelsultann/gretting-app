
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import { auth, db, } from "@/lib/firebase"; // Adjust path if needed
import { doc, setDoc, Timestamp } from "firebase/firestore"; // Import Timestamp
import { v4 as uuidv4 } from 'uuid'; 
import { FirebaseError } from '@firebase/util'
import Navbar from "@/components/Navbar";






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

    if (!email || !password ) {
      setError("من فضلك أدخل جميع البيانات");
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
    } catch (err) { 
  let errorMessage = "❌ An unexpected error occurred. Please try again."; 

  if (err instanceof FirebaseError) {
    const errorCode = err.code;
    console.error("Firebase Auth Error:", errorCode, err.message);

    if (errorCode === 'auth/email-already-in-use') {
      errorMessage = "❌ This email address is already registered.";
    } else if (errorCode === 'auth/weak-password') {
      errorMessage = "❌ The password is too weak.";
    } else if (errorCode === 'auth/invalid-email') {
      errorMessage = "❌ Please enter a valid email address.";
    } else if (errorCode === 'auth/invalid-credential') { // For login errors
      errorMessage = "❌ Invalid email or password.";
    } else {
      // Use the Firebase error message for other Firebase errors
      errorMessage = `❌ Error: ${err.message}`;
    }
  } else {
    // Handle non-Firebase errors (e.g., network issues, other exceptions)
    console.error("Non-Firebase Error:", err);
    // You might want to check if it's a standard Error instance
    if (err instanceof Error) {
        errorMessage = `❌ An unexpected error occurred: ${err.message}`;
    }
  }
  setError(errorMessage); // Set the final error message
}
  };

  
   
    return (

     
      <div>
        <Navbar />
    
      <section className="min-h-screen bg-[#2B2B2B] flex flex-col justify-center items-center text-white px-4">
      {/* Intro text for registration functionality */}
      <div className="max-w-md w-full mb-6 text-center">
        <p className="bg-[#484747] p-4 rounded-md text-lg leading-relaxed">
  عند التسجيل، يمكنك رفع صورة لشعار الشركة ومشاركة

<span className="font-bold text-[#BFAFF2] ">رابط خاص لشركتك  </span>
 مع الموظفين ليستطيعوا استخدام التصاميم مع شعار الشركة دون الحاجة للتسجيل.
</p>
        <p className="mt-4 text-2xl">
          لتصميم بطاقة تهنئة فردية ومن دون تسجيل، <a href="/occasion" className="text-[#BFAFF2] underline font-semibold">اضغط هنا</a>
        </p>
      </div>

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
              placeholder="اسم الشركة"
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

          <p className=" text-md text-center mt-2">
            {isRegister ? "هل لديك حساب؟" : "ليس لديك حساب؟"} <br/>
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="cursor-pointer text-[#BFAFF2] underline"
            >
              {isRegister ? "سجّل الدخول" : "سجل الآن"}
            </button>
          </p>
        </form>
      </section>
      
      </div>
   );
}