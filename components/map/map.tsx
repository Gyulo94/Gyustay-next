"use client";

import { DEFAULT_LAT, DEFAULT_LNG, ZOOM_LEVEL } from "@/constants/common";
import { useFindRoomsInMap } from "@/hooks/query/use-room";
import { useSelectedRoomStore } from "@/hooks/store/map.store";
import { RoomType } from "@/type/room.type";
import Script from "next/script";
import { BsMap } from "react-icons/bs";
import { FullPageLoader } from "../shared/loader";

declare global {
  interface Window {
    kakao: any;
  }
}

export function KakaoMap() {
  const { setSelectedRoom } = useSelectedRoomStore();
  const { data: rooms, isSuccess } = useFindRoomsInMap();
  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      var options = {
        center: new window.kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG),
        level: ZOOM_LEVEL,
      };
      const map = new window.kakao.maps.Map(mapContainer, options);

      rooms?.map((room: RoomType) => {
        const markerPosition = new window.kakao.maps.LatLng(room.lat, room.lng);

        const imageSrc = "/images/marker-icon.png";
        const imaageSize = new window.kakao.maps.Size(30, 30);
        const imageOption = { offset: new window.kakao.maps.Point(16, 46) };

        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imaageSize,
          imageOption
        );

        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });

        marker.setMap(map);

        const content = `<div class="custom_overlay">${room.price?.toLocaleString()}원</div>`;

        const customMarker = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: content,
        });
        customMarker.setMap(map);

        window.kakao.maps.event.addListener(marker, "click", function () {
          setSelectedRoom(room);
        });
        window.kakao.maps.event.addListener(map, "click", function () {
          setSelectedRoom(null);
        });
      });
    });
  };

  return (
    <>
      {isSuccess ? (
        <Script
          strategy="afterInteractive"
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
          onReady={loadKakaoMap}
        />
      ) : (
        <FullPageLoader />
      )}
      <div id="map" className="w-full h-[calc(100vh-52.8px-84.4px)]" />
    </>
  );
}

export function KakaoMapButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex gap-2 items-center text-sm bg-primary rounded-full text-white px-5 py-3.5 shadow-sm hover:shadow-lg mx-auto sticky bottom-12 cursor-pointer"
    >
      지도 표시하기 <BsMap className="text-xs" />
    </button>
  );
}
