import { cn } from "@/lib/utils";

export default function Stepper({ count = 1, className = "" }) {
  return (
    <div className={cn("grid grid-cols-5 gap-3 h-1", className)}>
      {/* Create an array of numbers from 1 to count */}
      {[...Array(count)]?.map((_, i) => (
        <div key={`active-${i}`} className="bg-primary w-full rounded-md" />
      ))}
      {[...Array(5 - count)]?.map((_, i) => (
        <div key={`active-${i}`} className="bg-purple-300 w-full rounded-md" />
      ))}
    </div>
  );
}
