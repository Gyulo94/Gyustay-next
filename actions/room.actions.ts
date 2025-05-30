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
