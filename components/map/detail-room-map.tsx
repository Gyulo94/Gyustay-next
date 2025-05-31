"use client";

import { RoomType } from "@/type/room.type";
import Script from "next/script";
import { FullPageLoader } from "../shared/loader";

declare global {
  interface Window {
    kakao: any;
  }
}

export function DetailRoomMap({ room }: { room: RoomType }) {
  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      var options = {
        center: new window.kakao.maps.LatLng(room.lat, room.lng),
        level: 5,
      };
      const map = new window.kakao.maps.Map(mapContainer, options);

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

      const mapTypeControl = new window.kakao.maps.MapTypeControl();
      map.addControl(
        mapTypeControl,
        window.kakao.maps.ControlPosition.TOPRIGHT
      );
      const zoomControl = new window.kakao.maps.ZoomControl();
      map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
    });
  };

  return (
    <>
      {room ? (
        <Script
          strategy="afterInteractive"
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
          onReady={loadKakaoMap}
        />
      ) : (
        <FullPageLoader />
      )}
      <div id="map" className="w-full h-[500px] border border-gray-300" />
    </>
  );
}
