import { Dispatch, SetStateAction } from "react";

export type DetailFilterType = "location" | "checkIn" | "checkOut" | "guest";

export interface FilterProps {
  location: string;
  checkIn: string;
  checkOut: string;
  guest: number;
}

export interface FilterComponentProps {
  filterValue: FilterProps;
  setFilterValue: Dispatch<SetStateAction<FilterProps>>;
  setDetailFilter: Dispatch<SetStateAction<DetailFilterType | null>>;
}
