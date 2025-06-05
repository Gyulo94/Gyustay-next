import { currencyPrice } from "@/lib/utils";
import { RoomType } from "@/type/room.type";
import BookingForm from "./booking-form";

export default function BookingSection({ room }: { room: RoomType }) {
  return (
    <div className="w-full">
      <div className="mt-8 shadow-lg rounded-lg border border-gray-300 px-6 py-8 md:sticky md:top-20">
        <div className="text-gray-600 flex justify-between items-center">
          <div>
            <span className="font-semibold text-lg md:text-xl text-black">
              {currencyPrice(room.price)}
            </span>{" "}
            /박
          </div>
          <div className="text-xs">후기 {room.comments.length}</div>
        </div>
        <BookingForm room={room} />
      </div>
    </div>
  );
}
