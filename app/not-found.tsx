"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="text-center min-h-screen flex flex-col justify-center">
      <h2 className="text-primary text-3xl font-semibold">404 Not Found</h2>
      <p className="text-gray-500 mt-4">
        해당 경로에 맞는 페이지를 찾을 수 없습니다.
      </p>
      <div className="mt-8">
        <button
          type="button"
          onClick={() => router.replace("/")}
          className="bg-primary text-white rounded-xl px-4 py-2.5 hover:shadow-lg cursor-pointer"
        >
          메인으로 돌아가기
        </button>
      </div>
    </div>
  );
}
