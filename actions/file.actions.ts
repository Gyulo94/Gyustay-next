"use server";

import { SERVER_URL } from "@/constants/common";
import axios from "axios";
import { auth } from "./../auth";

export async function imageUpload(formData: FormData) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  console.log("formData", formData);

  try {
    const response = await axios.post(`${SERVER_URL}/file/image`, formData, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.data.body;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
    throw error;
  }
}
