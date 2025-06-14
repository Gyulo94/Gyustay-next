"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="text-center min-h-screen flex flex-col justify-center">
      <div>
        <h2 className="text-3xl font-semibold text-primary">
          Something went wrong!
        </h2>
        <p className="text-gray-500 mt-4 font-semibold">
          해당 페이지를 가져오던 중 문제가 생겼습니다.
        </p>
        <p className="text-gray-400 text-xs max-w-lg mx-auto mt-8">
          Error Mesage: {error?.message || "없음"}
        </p>
        <div className="mt-8">
          <button
            className="bg-primary hover:shadow-lg text-white rounded-xl px-4 py-2.5 cursor-pointer"
            onClick={() => reset()}
          >
            다시 시도하기
          </button>
        </div>
      </div>
    </div>
  );
}
