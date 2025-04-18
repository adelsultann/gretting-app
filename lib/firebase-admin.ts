import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

try {
  // Check if Firebase Admin is already initialized
  if (!admin.apps.length) {
    // Validate that necessary environment variables are present
    if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
        throw new Error("Missing required Firebase Admin SDK environment variables.");
    }

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Replace escaped newlines for Vercel/environment variable compatibility
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
      // Optionally add databaseURL if needed, though often inferred
      // databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`
    });
    console.log("Firebase Admin Initialized");
  }
} catch (error: unknown) { // <--- Catch as 'unknown'
  console.error("Firebase admin initialization error:"); // Log a clear prefix

  // Check if it's an Error object to safely access stack/message
  if (error instanceof Error) {
    console.error("Stack:", error.stack); // Log the stack trace if available
    console.error("Message:", error.message); // Log the error message
  } else {
    // Log the error directly if it's not a standard Error instance
    console.error("Caught value:", error);
  }
  // Optional: Re-throw or handle critical failure if initialization must succeed
  // throw new Error("Failed to initialize Firebase Admin SDK.");
}

// Initialize Firestore regardless of the try/catch block's outcome
// It will use the initialized app if successful, or potentially fail if init failed
export const db = getFirestore();