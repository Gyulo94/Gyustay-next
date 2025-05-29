"use server";

import { SERVER_URL } from "@/constants/common";
import axios from "axios";

export async function findRoomsAll() {
  const response = await axios.get(`${SERVER_URL}/room/all`);
  return response.data.body;
}
