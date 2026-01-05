
const CLOUD_NAME = "ds2mbrzcn";
const UPLOAD_PRESET = "real_unsigned";

/**
 * Generates a Cloudinary delivery URL for a given publicId.
 */
export function getCloudinaryUrl(publicId: string, options: { width?: number; height?: number; crop?: string } = {}) {
  const { width, height, crop = "fill" } = options;
  const transformations = [
    "f_auto",
    "q_auto",
    width ? `w_${width}` : "",
    height ? `h_${height}` : "",
    (width || height) ? `c_${crop}` : ""
  ].filter(Boolean).join(",");

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformations}/${publicId}`;
}

/**
 * Uploads a file to Cloudinary using unsigned upload preset.
 * Useful if you decide to add an admin upload feature.
 */
export async function uploadToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload image to Cloudinary");
  }

  const data = await response.json();
  return data.public_id; // Return ONLY the public_id
}
