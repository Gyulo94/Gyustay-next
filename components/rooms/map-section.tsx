import { RoomType } from "@/type/room.type";
import { DetailRoomMap } from "../map/detail-room-map";

export default function MapSection({ room }: { room: RoomType }) {
  return (
    <div className="py-6 px-4 border-b border-gray-300 leading-8 text-gray-800">
      <h1 className="font-semibold text-xl mb-2">호스팅 지역</h1>
      <div className="mt-4">
        <DetailRoomMap room={room} />
      </div>
      <div className="mt-8 font-semibold">{room.address}</div>
    </div>
  );
}
