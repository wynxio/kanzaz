const MAX_IMAGE_SIZE = 12 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

function isBase64Image(img) {
  return typeof img === "string" && img.startsWith("data:image");
}

function getFileType(fileName) {
  if (!fileName || typeof fileName !== "string") return "invalid";

  const ext = fileName.split(".").pop().toLowerCase();

  const videoExts = ["mp4", "mkv", "avi", "mov", "wmv", "flv", "webm"];
  const audioExts = ["mp3", "wav", "aac", "flac", "ogg", "m4a"];
  const docExts   = ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt"];
  const imageExts = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "tiff", "svg"];

  if (videoExts.includes(ext)) return "video";
  if (audioExts.includes(ext)) return "audio";
  if (docExts.includes(ext)) return "document";
  if (imageExts.includes(ext)) return "image";

  return "invalid";
}

function validateAllImagesSize({
  sizeChartImage,
  variations
}) {
  const imagesToCheck = [];

  if (sizeChartImage?.data) {
    imagesToCheck.push({
      label: "Size chart image",
      image: sizeChartImage
    });
  }

  if (Array.isArray(variations)) {
    variations.forEach((v, vIndex) => {
      if (v.primaryImage?.data) {
        imagesToCheck.push({
          label: `Variation ${vIndex + 1} primary image`,
          image: v.primaryImage
        });
      }

      if (Array.isArray(v.images)) {
        v.images.forEach((img, imgIndex) => {
          if (img?.data) {
            imagesToCheck.push({
              label: `Variation ${vIndex + 1} image ${imgIndex + 1}`,
              image: img
            });
          }
        });
      }
    });
  }

  for (const { label, image } of imagesToCheck) {
    const base64 = image.data.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64, "base64");

    if (buffer.length > MAX_IMAGE_SIZE) {
      return {
        valid: false,
        error: `${label} exceeds 2MB limit`
      };
    }
  }

  return { valid: true };
}

function extractBase64(image) {
  if (!image) return null;

  // Case 1: direct base64 string
  if (typeof image === "string" && image.startsWith("data:image")) {
    return image;
  }

  // Case 2: object with data
  if (typeof image === "object") {
    if (image.data?.startsWith("data:image")) return image.data;
    if (image.base64?.startsWith("data:image")) return image.base64;
  }

  return null;
}

async function uploadToBunnySafe(image, folder = "products") {
  const base64String = extractBase64(image);
  if (!base64String) return null;

  const mimeMatch = base64String.match(/^data:(image\/\w+);base64,/);
  if (!mimeMatch) throw new Error("Invalid image format");

  const mimeType = mimeMatch[1];
  if (!ALLOWED_TYPES.includes(mimeType)) {
    throw new Error(`Invalid image type: ${mimeType}`);
  }

  const base64 = base64String.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64, "base64");

  if (buffer.length > MAX_IMAGE_SIZE) {
    throw new Error("Image exceeds 2MB limit");
  }

  const ext = mimeType.split("/")[1];
  const fileName = `${folder}/${Date.now()}_${Math.random()
    .toString(36)
    .slice(2)}.${ext}`;

   
  const uploadUrl = `https://sg.storage.bunnycdn.com/${process.env.BUNNY_STORAGE_ZONE}/${fileName}`;

 
  const res = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      AccessKey: process.env.BUNNY_API_KEY,
      "Content-Type": mimeType,
    },
    body: buffer,
  });

  if (!res.ok) {
    throw new Error("Upload failed to Bunny");
  }

  return `${process.env.BUNNY_CDN_URL}/${fileName}`;
}

async function uploadToBunny({ name, type, data }, folder = "products") {
  if (!data) return null;

  const base64 = data.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64, "base64");

  const fileName = `${folder}/${Date.now()}_${name}`;

  const uploadUrl = `https://storage.bunnycdn.com/${process.env.BUNNY_STORAGE_ZONE}/${fileName}`;

  const res = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      AccessKey: process.env.BUNNY_API_KEY,
      "Content-Type": type || "application/octet-stream",
    },
    body: buffer,
  });

  if (!res.ok) {
    throw new Error("Bunny upload failed");
  }

  return `${process.env.BUNNY_CDN_URL}/${fileName}`;
}

export { getFileType,validateAllImagesSize,uploadToBunnySafe,uploadToBunny,isBase64Image };