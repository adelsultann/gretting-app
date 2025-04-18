import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

try {
  if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          // Use `process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')` for Vercel env vars
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
      });
     console.log("Firebase Admin Initialized");
  }
} catch (error: any) {
  console.error("Firebase admin initialization error", error.stack);
}

export const db = getFirestore();