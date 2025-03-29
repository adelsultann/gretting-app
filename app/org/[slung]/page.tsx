// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { OrgProvider } from "../../context/OrgContext"; // from layout.tsximport { db } from "@/lib/firebase";
// import { db } from "@/lib/firebase";           

// import { useOrg } from "../../context/OrgContext";


// import { collection, query, where, getDocs } from "firebase/firestore";

// export default function OrgSlugPage({ params }: { params: { slug: string } }) {
//   const router = useRouter();
//   const { setOrg } = useOrg();

//   useEffect(() => {
//     const fetchOrg = async () => {
//       const q = query(
//         collection(db, "organizations"),
//         where("slug", "==", params.slug)
//       );

//       const snapshot = await getDocs(q);

//       if (snapshot.empty) {
//         alert("❌ Organization not found");
//         router.push("/not-found");
//         return;
//       }

//       const data = snapshot.docs[0].data();

//       setOrg({
//         companyName: data.companyName,
//         logoUrl: data.logoUrl,
//         slug: data.slug,
//       });

//       router.push("/occasion");
//     };

//     fetchOrg();
//   }, []);

//   return null;
// }
