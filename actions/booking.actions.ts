"use server";

import { auth } from "@/auth";
import { SERVER_URL } from "@/constants/common";
import { BookingType } from "@/type/booking.type";
import axios from "axios";

export async function createBooking(values: BookingType) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;

  try {
    const response = await axios.post(`${SERVER_URL}/booking`, values, {
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

export async function findBookingById(id: string) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;

  try {
    const response = await axios.get(`${SERVER_URL}/booking/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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

export async function findBookingsAll({ pageParam }: { pageParam?: number }) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  const response = await axios.get(`${SERVER_URL}/booking/all`, {
    params: {
      limit: 5,
      page: pageParam,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.body;
}
