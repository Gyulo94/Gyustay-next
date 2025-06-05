"use server";

import { auth } from "@/auth";
import { SERVER_URL, TOSS_PAYMENTS_SECRET_KEY } from "@/constants/common";
import {
  CreatePaymentType,
  RequestPaymentType,
  ResponsePaymentType,
} from "@/type/payment.type";
import axios from "axios";

export async function createPayment(values: CreatePaymentType) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.post(`${SERVER_URL}/payment`, values, {
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

export async function getPayment(values: RequestPaymentType) {
  const { orderId, paymentKey, amount } = values;
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const { data: payment } = await axios.post<ResponsePaymentType>(
      `https://api.tosspayments.com/v1/payments/confirm`,
      values,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${TOSS_PAYMENTS_SECRET_KEY}:`
          ).toString("base64")}`,
        },
      }
    );
    if (payment) {
      await axios.put(
        `${SERVER_URL}/payment`,
        {
          orderId,
          paymentKey,
          amount: payment.totalAmount,
          bookingStatus: "SUCCESS",
          status: payment.status,
          method: payment?.method,
          receiptUrl: payment?.receipt?.url,
          requestedAt: payment?.requestedAt,
          approvedAt: payment?.approvedAt,
          cardNumber: payment?.card?.number,
          cardType: payment?.card?.cardType,
          type: payment?.type,
          mId: payment?.mId,
          checkoutUrl: payment?.checkout?.url,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
    return { payment };
  } catch (error: any) {
    if (error.code === "ERR_BAD_REQUEST") {
      const response = await axios.get(`${SERVER_URL}/payment/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const payment = response.data.body;
      return {
        payment,
      };
    }
    await axios.put(`${SERVER_URL}/payment`, {
      orderId,
      paymentKey,
      amount,
      bookingStatus: "FAILED",
      failureCode: error.code,
      failureMessage: error.message,
    });
    return {
      redirect: {
        destination: `/payments/fail?code=${error.code}&message=${error.message}&orderId=${orderId}`,
      },
    };
  }
}
