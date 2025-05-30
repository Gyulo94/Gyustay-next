import { RoomType } from "@/type/room.type";
import { Badge } from "../ui/badge";

export default function RoomItem({ room }: { room: RoomType }) {
  return (
    <div>
      <img
        src={room.images[0].url}
        alt={room.title}
        className="rounded-md w-full h-auto object-cover"
      />
      <div className="mt-2 font-semibold text-sm">{room.title}</div>
      <Badge>{room.category.name}</Badge>
      <div className="mt-1 text-gray-400 text-sm line-clamp-1">
        {room.address}
      </div>
      <div className="mt-1 text-sm">
        {room.price.toLocaleString()}원
        <span className="text-gray-500"> /박</span>
      </div>
    </div>
  );
}
