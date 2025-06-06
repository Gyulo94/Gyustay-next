import { BLUR_DATA_URL } from "@/constants/common";
import { currencyPrice } from "@/lib/utils";
import { RoomType } from "@/type/room.type";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";

export default function RoomItem({ room }: { room: RoomType }) {
  return (
    <Link href={`/rooms/${room.id}`}>
      <div>
        <div className="relative w-full aspect-square">
          <Image
            src={room.images[0].url}
            alt={room.title}
            fill
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="rounded-md object-cover object-center"
          />
        </div>
        <div className="mt-2 font-semibold text-sm">{room.title}</div>
        <Badge data-cy="room-category">{room.category.name}</Badge>
        <div
          className="mt-1 text-gray-400 text-sm line-clamp-1"
          data-cy="room-address"
        >
          {room.address}
        </div>
        <div className="mt-1 text-sm">
          {currencyPrice(room.price)}
          <span className="text-gray-500"> /박</span>
        </div>
      </div>
    </Link>
  );
}
