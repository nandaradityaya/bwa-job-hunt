import { createClient } from "@supabase/supabase-js";

export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY!!
);

// fungsi untuk mengambil public url dari gambar kita | filename dan bucket typenya string
export const supabasePublicUrl = async (filename: string, bucket: string) => {
  const {
    data: { publicUrl },
  } = await supabaseClient.storage
    .from(bucket)
    .getPublicUrl(`public/${filename}`);

  return publicUrl;
};

// function upload image
export const supabaseUploadFile = async (
  file: File | string, // file atau string
  bucket: string
) => {
  const filename = `resume-${createId(5)}.pdf`; // createId lengthnya 5

  const { data, error } = await supabaseClient.storage
    .from(bucket)
    .upload(`public/${filename}`, file, {
      cacheControl: "3600", // cacheControl itu default dari supabase
      upsert: false,
    });

  return {
    data,
    error,
    filename,
  };
};

// function untuk random nama
const createId = (length: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};
