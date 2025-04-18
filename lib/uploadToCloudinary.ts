// lib/uploadToCloudinary.ts
export async function uploadToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  // Use an unsigned upload preset you have configured in Cloudinary
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '');
  
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );
  
  if (!res.ok) {
    throw new Error("Cloudinary upload failed");
  }
  
  const data = await res.json();
  return data.secure_url; // Direct link to the uploaded image
}
