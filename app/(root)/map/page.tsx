"use client";

import { KakaoMap } from "@/components/map/map";
import SelectedRoom from "@/components/map/selected-room";

export default function MapPage() {
  return (
    <>
      <KakaoMap />
      <SelectedRoom />
    </>
  );
}
