// lib/getOrganizationLogoUrl.ts
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function getOrganizationLogoUrl(shareableId: string): Promise<string | null> {
     if (!db) {
         console.error("Firebase Admin SDK not initialized for logo lookup.");
         return null;
     }
     try {
      const orgsRef = collection(db, "organizations");
      const q = query(orgsRef, where("shareableId", "==", shareableId), limit(1));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data();
        return docData.logoUrl || null; // Return logoUrl or null if empty/not set
      } else {
        return null; // Not found
      }
    } catch (error) {
         console.error("Error fetching organization logo by shareableId:", error);
         return null;
    }
  }
  