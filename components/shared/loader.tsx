"use client";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export function Loader({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-4 justify-center", className)}>
      <div className="size-2 rounded-full bg-gray-500 animate-ping" />
      <div className="size-2 rounded-full bg-gray-500 animate-ping" />
      <div className="size-2 rounded-full bg-gray-500 animate-ping" />
    </div>
  );
}

export function RoomsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-20 sm:px-4 md:px-8 lg:px-16 mt-5">
      {[...Array(12)].map((e, i) => (
        <div key={i} className="flex flex-col space-y-2">
          <Skeleton className="w-full h-72 rounded-md" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      ))}
    </div>
  );
}
