import { Input } from "@/components/ui/input";
import { useSearchStore } from "@/hooks/store";
import { ChangeEvent } from "react";
import { AiOutlineSearch } from "react-icons/ai";

export default function RoomSearchFilter() {
  const { setQ } = useSearchStore();
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 mb-10">
      <div className="flex items-center justify-center w-full gap-2">
        <Input
          type="search"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setQ(e.target.value);
          }}
          placeholder="숙소명 검색"
        />
        <AiOutlineSearch className="size-6" />
      </div>
    </div>
  );
}
