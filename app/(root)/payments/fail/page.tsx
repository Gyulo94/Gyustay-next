"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function FailPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const message = searchParams.get("message");
  const orderId = searchParams.get("orderId");
  const router = useRouter();
  return (
    <div className="text-center min-h-screen flex flex-col justify-center">
      <div>
        <h2 className="text-3xl font-semibold text-primary">
          결제가 실패했습니다.
        </h2>
        <p className="text-gray-500 mt-4 font-semibold">
          결제 도중 아래와 같은 문제가 생겼습니다. 다시 시도해주세요.
        </p>
        <p className="text-gray-400 text-xs max-w-lg mx-auto mt-8">
          에러 코드: {code || ""}
        </p>
        <p className="text-gray-400 text-xs max-w-lg mx-auto mt-8">
          에러 메세지: {message || ""}
        </p>
        <p className="text-gray-400 text-xs max-w-lg mx-auto mt-8">
          주문 번호: {orderId || ""}
        </p>
        <div className="mt-8">
          <button
            className="bg-primary hover:shadow-lg text-white rounded-xl px-4 py-2.5 cursor-pointer"
            onClick={() => router.replace("/")}
          >
            메인으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}
