// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// import { auth, db } from "@/lib/firebase";
// import { doc, setDoc } from "firebase/firestore";

// export default function AuthPage() {
//   const [isRegister, setIsRegister] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [companyName, setCompanyName] = useState("");
//   const [error, setError] = useState("");

//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//      e.preventDefault();
//      setError("");
   
//      // 🔐 Validate company name
//      if (isRegister && !/^[a-zA-Z\s]+$/.test(companyName)) {
//        setError("❌ Company name must contain English letters only");
//        return;
//      }
   
//      try {
//        if (isRegister) {
//          // ✅ 1. Create user with Firebase Auth
//          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//          const user = userCredential.user;
   
//          // ✅ 2. Create the "organizations" document in Firestore
//          await setDoc(doc(db, "organizations", user.uid), {
//            companyName,
//            logoUrl: "", // will be added later in dashboard
//            slug: companyName.toLowerCase().replace(/\s+/g, "-"),
//            userId: user.uid,
//            createdAt: new Date().toISOString(),
//          });
   
//          console.log("✅ Organization created in Firestore");
//        } else {
//          // If logging in
//          await signInWithEmailAndPassword(auth, email, password);
//      }
//      } catch (err) {
//        setError("❌ An error occurred. Please try again.");
//        console.error(err);
//      }
//    };
   

//   return (
//     <section className="min-h-screen bg-[#2B2B2B] flex justify-center items-center text-white px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-[#484747] p-6 rounded-xl max-w-md w-full space-y-4 shadow-lg"
//       >
//         <h1 className="text-xl font-bold text-center">
//           {isRegister ? "إنشاء حساب جديد" : "تسجيل الدخول"}
//         </h1>

//         <input
//           type="email"
//           required
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="البريد الإلكتروني"
//           className="w-full p-2 rounded-md bg-[#2B2B2B] text-white outline-none"
//         />

//         <input
//           type="password"
//           required
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="كلمة المرور"
//           className="w-full p-2 rounded-md bg-[#2B2B2B] text-white outline-none"
//         />

//         {isRegister && (
//           <input
//             type="text"
//             required
//             value={companyName}
//             onChange={(e) => setCompanyName(e.target.value)}
//             placeholder="Company name (English only)"
//             className="w-full p-2 rounded-md bg-[#2B2B2B] text-white outline-none"
//           />
//         )}

//         {error && <p className="text-red-400 text-sm text-center">{error}</p>}

//         <button
//           type="submit"
//           className="bg-[#F8D57E] text-black font-semibold w-full py-2 rounded-md hover:opacity-90 transition"
//         >
//           {isRegister ? "تسجيل حساب جديد" : "تسجيل الدخول"}
//         </button>

//         <p className="text-sm text-center">
//           {isRegister ? "هل لديك حساب؟" : "ليس لديك حساب؟"}{" "}
//           <button
//             type="button"
//             onClick={() => setIsRegister(!isRegister)}
//             className="text-[#BFAFF2] underline"
//           >
//             {isRegister ? "سجّل الدخول" : "إنشاء حساب"}
//           </button>
//         </p>
//       </form>
//     </section>
//   );
// }
