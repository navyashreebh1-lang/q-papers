import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export async function uploadToCloudinary(
  buffer: Buffer,
  filename: string
): Promise<{ url: string; publicId: string }> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        folder: "vtu-question-bank",
        public_id: filename.replace(/\.(pdf|jpg|jpeg|png|webp)$/i, "") + ".pdf",
        tags: ["vtu", "question-paper"],
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error("Upload failed"));
          return;
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );
    uploadStream.end(buffer);
  });
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
    // Try to delete as image first (new default)
    await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
  } catch {
    // ignore
  }
  try {
    // Try to delete as raw (older uploads)
    await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
  } catch {
    // ignore
  }
}
