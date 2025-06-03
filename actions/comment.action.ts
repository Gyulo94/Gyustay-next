"use server";

import { auth } from "@/auth";
import { SERVER_URL } from "@/constants/common";
import { CommentFormType } from "@/type/comment.type";
import axios from "axios";

export async function createComment(values: CommentFormType, roomId: number) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  const body = {
    ...values,
    roomId,
  };
  try {
    const response = await axios.post(`${SERVER_URL}/comment`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
    throw error;
  }
}

export async function findCommentsByRoomId(
  roomId: number,
  limit: number,
  pageParam?: number
) {
  try {
    const response = await axios.get(`${SERVER_URL}/comment/all`, {
      params: {
        roomId,
        limit,
        page: pageParam,
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
