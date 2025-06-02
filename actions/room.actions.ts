"use server";

import { SERVER_URL } from "@/constants/common";
import axios from "axios";

export async function findRoomsAll({
  pageParam,
  category,
}: {
  pageParam?: number;
  category?: string;
}) {
  const response = await axios.get(`${SERVER_URL}/room/all`, {
    params: {
      limit: 12,
      page: pageParam,
      category,
    },
  });
  return response.data.body;
}

export async function findRoomsInMap() {
  const response = await axios.get(`${SERVER_URL}/room/map`);
  return response.data.body.data;
}

export async function findRoomById(id?: number, userId?: string) {
  try {
    const response = await axios.get(`${SERVER_URL}/room/${id}`, {
      params: {
        userId,
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
