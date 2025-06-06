"use server";

import { auth } from "@/auth";
import { SERVER_URL } from "@/constants/common";
import { RoomFormType } from "@/type/room.type";
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

export async function findRoomById(id?: string, userId?: string) {
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

export async function createRoom(values: RoomFormType) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  const headers = {
    Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
  };
  const { data } = await axios.get(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
      values.address
    )}`,
    {
      headers,
    }
  );

  const body: RoomFormType = {
    ...values,
    lat: data.documents[0].address.y,
    lng: data.documents[0].address.x,
  };

  try {
    const response = await axios.post(`${SERVER_URL}/room`, body, {
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

export async function findRoomsByUserId({
  limit,
  pageParam,
}: {
  limit: number;
  pageParam?: number;
}) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.get(`${SERVER_URL}/room/userId`, {
      params: {
        limit,
        page: pageParam,
      },
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

export async function updateRoom(values: RoomFormType, id?: string) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  const headers = {
    Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
  };
  const { data } = await axios.get(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
      values.address
    )}`,
    {
      headers,
    }
  );

  const body: RoomFormType = {
    ...values,
    lat: data.documents[0].address.y,
    lng: data.documents[0].address.x,
  };

  try {
    const response = await axios.put(`${SERVER_URL}/room/${id}`, body, {
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
