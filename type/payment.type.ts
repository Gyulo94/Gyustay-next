export type CreatePaymentType = {
  bookingId: string;
  amount: number;
  status: PaymentStatusType;
  orderId: string;
  orderName: string;
};

export type PaymentStatusType =
  | "READY"
  | "IN_PROGRESS"
  | "WAITING_FOR_DEPOSIT"
  | "DONE"
  | "CANCELED"
  | "PARTIAL_CANCELED"
  | "ABORTED"
  | "EXPIRED";

export type RequestPaymentType = {
  orderId: string;
  paymentKey: string;
  amount: string;
};

export type ResponsePaymentType = {
  approvedAt?: string;
  mId?: string;
  orderName?: string;
  requestedAt?: string;
  status: PaymentStatusType;
  receipt?: {
    url?: string;
  };
  checkout?: {
    url?: string;
  };

  card?: {
    number?: string;
    cardType?: string;
  };
  amount?: string;
  type?: "NORMAL" | "BILLING" | "BRANDPAY";
  totalAmount?: number;
  method?: "카드" | "가상계좌" | "계좌이체";
};

export type PaymentType = {
  id: string;
  paymentKey: string;
  bookingId: string;
  amount: number;
  status: PaymentStatusType;
  orderId: string;
  orderName: string;
  approvedAt: string;
  mId?: string;
  receiptUrl?: string;
  cardNumber?: string;
  method?: string;
};

export type Payment = {
  payment?: ResponsePaymentType;
  redirect?: {
    destination?: string;
  };
};
