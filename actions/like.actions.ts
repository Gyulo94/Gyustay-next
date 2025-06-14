"use server";

import { auth } from "@/auth";
import { SERVER_URL } from "@/constants/common";
import axios from "axios";

export async function toggleLike(roomId: string) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;

  try {
    const response = await axios.post(
      `${SERVER_URL}/like`,
      {
        roomId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.body;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
    throw error;
  }
}

export async function findLikesAllByUserId(limit: number, pageParam?: number) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.get(`${SERVER_URL}/like/all`, {
      params: {
        limit,
        page: pageParam,
      },
      headers: { Authorization: `Bearer ${token}` },
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
