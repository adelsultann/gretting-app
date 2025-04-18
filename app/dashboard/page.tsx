// pages/dashboard.tsx OR app/dashboard/page.tsx (adjust path)
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase"; // Adjust path if needed
import { onAuthStateChanged, signOut, User } from "firebase/auth"; // Import User type
import { doc,  getDoc, Timestamp, updateDoc } from "firebase/firestore"; // Import updateDoc, Timestamp
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";
import { FirebaseError } from "firebase/app";




export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [shareableId, setShareableId] = useState<string | null>(null); 
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null); 
  const [existingLogoUrl, setExistingLogoUrl] = useState<string | null>(null); 
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  // Fetch data when user is available
  useEffect(() => {
    if (user) {
        fetchOrganizationData(user.uid);
    }
  }, [user]); // Re-run if user changes

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // fetchOrganizationData is now called by the effect above
      } else {
        setUser(null); // Clear user state
        router.push("/auth");
      }
      setLoading(false);
    });
    return () => unsubscribe(); // Cleanup subscription
  }, [router]);


  const fetchOrganizationData = async (uid: string) => {
    setLoading(true); // Indicate loading starts
    try {
      const docRef = doc(db, "organizations", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setCompanyName(data.companyName || "");
        setLogoPreview(data.logoUrl || null); // Set preview to existing logo if available
        setExistingLogoUrl(data.logoUrl || null); // Store the fetched URL
        setShareableId(data.shareableId || null); // ✨ Fetch shareableId
        if (!data.shareableId) {
            console.warn("Organization is missing shareableId. Consider adding migration logic.");
            // Optionally generate and save one here if it's missing for older accounts
        }
      } else {
        // This case might happen if Firestore write failed during registration
        console.error("Organization document not found for UID:", uid);
        setErrorMessage("Your organization data seems missing. Please contact support or try re-registering.");
        // Optionally force logout or redirect
      }
    } catch (error) {
      console.error("Error fetching organization data:", error);
      setErrorMessage("Error loading your company data. Please try again later.");
    } finally {
        setLoading(false); // Indicate loading finished
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        // Validate file type and size (optional but recommended)
        if (!file.type.startsWith('image/')) {
            setErrorMessage('Please select an image file (PNG, JPG, SVG, etc.).');
            return;
        }
        if (file.size > 5 * 1024 * 1024) { // 5MB limit example
             setErrorMessage('Image file size should not exceed 5MB.');
            return;
        }
        setErrorMessage(null); // Clear previous error

      const previewUrl = URL.createObjectURL(file);
      // Revoke previous blob URL if exists
       if (logoPreview && logoPreview.startsWith('blob:')) {
          URL.revokeObjectURL(logoPreview);
       }
      setLogoFile(file);
      setLogoPreview(previewUrl); // Show local preview immediately
    }
  };

  // Cleanup preview blob URL
  useEffect(() => {
    return () => {
      if (logoPreview && logoPreview.startsWith('blob:')) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [logoPreview]);

  const handleSave = async () => {
    if (!companyName || !user) {
      setErrorMessage("Company name cannot be empty.");
      return;
    }
    if (!shareableId) { // Should ideally always exist if generated on signup
       setErrorMessage("Cannot save data: Missing unique identifier. Please contact support.");
       return;
    }


    setSaving(true);
    setErrorMessage(null);

    try {
      let finalLogoUrl = existingLogoUrl; // Start with the existing URL

   
       // Upload new logo file to Cloudinary if selected
      if (logoFile) {
        console.log("Uploading new logo to Cloudinary...");
        finalLogoUrl = await uploadToCloudinary(logoFile);
        console.log("Cloudinary upload complete, new logo URL:", finalLogoUrl);
        setExistingLogoUrl(finalLogoUrl);
        setLogoFile(null);
      }

      // Prepare the data to update
      const dataToUpdate = {
        companyName,
        logoUrl: finalLogoUrl || "",
        slug: companyName.toLowerCase().replace(/\s+/g, "-"),
        updatedAt: Timestamp.fromDate(new Date()),
      };

      // Update the organization's document in Firestore
      await updateDoc(doc(db, "organizations", user.uid), dataToUpdate);

      // If the preview was a blob URL, update it to the final URL
      if (finalLogoUrl && logoPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(logoPreview);
        setLogoPreview(finalLogoUrl);
      } else if (!finalLogoUrl) {
        setLogoPreview(null);
      }

      alert("Data saved successfully!");
    } catch (error: unknown) {
      console.error("Error saving data:", error);
      let message = "An unexpected error occurred."; 
       // Check for specific error types
    if (error instanceof FirebaseError) {
      // Handle Firebase specific errors (from updateDoc)
      message = `Firestore error: ${error.message} (Code: ${error.code})`;
    } else if (error instanceof Error) {
      // Handle standard JavaScript errors (could be from Cloudinary or elsewhere)
      message = error.message;
    } else if (typeof error === 'string') {
      // Handle cases where a string was thrown
      message = error;
    }

    // Set the user-facing error message
    setErrorMessage(`Failed to save data: ${message}`);

  } finally {
    setSaving(false);
  }
};
    
  

  const handleLogout = async () => {
    // Clear local state related to user/org if needed
    setUser(null);
    setCompanyName("");
    setLogoPreview(null);
    setExistingLogoUrl(null);
    setShareableId(null);
    setErrorMessage(null);
    // Sign out
    await signOut(auth);
    // Redirect (already handled by onAuthStateChanged, but good practice)
    router.push("/auth");
  };


  if (loading) return <p className="text-center text-black mt-10">Loading Dashboard...</p>;
   if (!user) return null; // Or a redirect component, although onAuthStateChanged handles it

  return (
    <section className="min-h-screen bg-[#2B2B2B] text-white px-6 py-10">
      <div className="max-w-2xl mx-auto bg-[#484747] p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Company Dashboard</h1>
          <button
            onClick={handleLogout}
            className="text-sm bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 rounded-md transition" // Styled logout better
          >
            Logout
          </button>
        </div>

        <div className="space-y-4">
          {errorMessage && <p className="bg-red-800 text-red-100 p-3 rounded-md text-sm">{errorMessage}</p>}

          {/* Company Name Input */}
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium mb-1">Company Name</label>
            <input
              id="companyName"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-[#2B2B2B] text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#F8D57E]"
              placeholder="e.g., Vision Company"
            />
           </div>

          {/* Logo Upload Section */}
          <div>
             <label htmlFor="logoUpload" className="block text-sm font-medium mb-1">Company Logo</label>
             <input
                id="logoUpload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#F8D57E] file:text-black hover:file:opacity-90 cursor-pointer"
             />
             {logoPreview && (
                <div className="mt-3">
                <Image
                    src={logoPreview}
                    alt="Logo Preview"
                    className="w-24 h-24 object-contain rounded-md border border-gray-600 bg-gray-700" // Added bg color
                    width={96}
                    height={96}
              
                />
                </div>
             )}
          </div>


          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={saving || loading} // Disable while loading data too
            className={`mt-6 w-full py-2 bg-[#F8D57E] text-black font-semibold rounded-md transition ${
              (saving || loading) ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
            }`}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {/* Shareable Link Display */}
       <div className="mt-8 pt-6 border-t border-gray-600">
  <h2 className="text-lg font-semibold mb-2">Employee Share Link</h2>
  <p className="text-sm text-gray-300 mb-2">
    Share this link with your employees. They will start by choosing an occasion, and the company logo will be added automatically later.
  </p>
  {shareableId ? (
    <div className="flex items-center gap-2 bg-[#2B2B2B] p-2 rounded-md">
      {/* ✨ Construct the URL pointing to /occasion with 'org' query param */}
      <input
          type="text"
          readOnly
          value={`${window.location.origin}/occasion?org=${shareableId}`}
          className="flex-grow p-1 bg-transparent text-white outline-none text-sm"
      />
      <button
          onClick={() => navigator.clipboard.writeText(`${window.location.origin}/occasion?org=${shareableId}`)}
          className="text-xs bg-[#BFAFF2] text-black font-semibold px-2 py-1 rounded hover:opacity-80"
          title="Copy link"
      >
          Copy
      </button>
    </div>
  ) : (
    <p className="text-sm text-yellow-400">Generating share link...</p>
  )}
</div>
      </div>
    </section>
  );
}