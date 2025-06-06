import { Input } from "@/components/ui/input";
import { useSearchStore } from "@/hooks/store";
import { ChangeEvent } from "react";
import { AiOutlineSearch } from "react-icons/ai";

export default function RoomSearchFilter() {
  const { setQ } = useSearchStore();

  const debounce = (func: Function, delay: number) => {
    let timerId: NodeJS.Timeout;
    return function (...args: any[]) {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
  function handleDebounceSearch(value: string) {
    setQ(value);
  }
  const debouncedSearch = debounce(handleDebounceSearch, 1000);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 mb-10">
      <div className="flex items-center justify-center w-full gap-2">
        <Input
          type="search"
          onChange={handleInputChange}
          placeholder="숙소명 검색"
        />
        <AiOutlineSearch className="size-6" />
      </div>
    </div>
  );
}
