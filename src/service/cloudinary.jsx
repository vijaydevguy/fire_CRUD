import axios from "axios";

export const getImageUrl = async (file) => {
  if (!file) {
    return;
  }

  const payload = new FormData();

  payload.append("file", file);
  payload.append("upload_preset", "product_img");

  try {
    const CLOUDINARY_URL =
      "https://api.cloudinary.com/v1_1/dnxx5vmrs/image/upload";
    const res = await axios.post(CLOUDINARY_URL, payload);
    const url = res.data.secure_url;
    return url;
  } catch (error) {
    console.log("Error", error);
    return null;
  }
};
