import { findRoomById } from "@/actions/room.actions";
import { Button } from "@/components/ui/button";
import { BLUR_DATA_URL } from "@/constants/common";
import { currencyPrice } from "@/lib/utils";
import { RoomType } from "@/type/room.type";
import Image from "next/image";
import Link from "next/link";

interface Props {
  params: { id: string };
  searchParams: {
    checkIn?: string;
    checkOut?: string;
    guestCount?: string;
    totalAmount?: string;
    totalDays?: string;
    [key: string]: string | string[] | undefined;
  };
}

export default async function BookingsPage({ params, searchParams }: Props) {
  const { checkIn, checkOut, guestCount, totalAmount, totalDays } =
    await searchParams;
  const { id } = await params;
  const room: RoomType = await findRoomById(id);

  return (
    <div className="my-28 max-w-6xl h-[calc(100vh-84.4px-52.8px-252px)] flex flex-col justify-center mx-auto px-4">
      <div>
        <h1 className="font-semibold text-xl md:text-3xl">확인 및 결제</h1>
        <div className="grid md:grid-cols-2 gap-20 h-full">
          <div className="flex flex-col gap-6 border-y my-8 py-8">
            <h2 className="text-lg md:text-2xl font-semibold">예약 정보</h2>
            <div>
              <h3>날짜</h3>
              <div className="text-sm mt-1 text-gray-800">
                {checkIn} ~ {checkOut}
              </div>
            </div>
            <div>
              <h3>게스트</h3>
              <div className="text-sm mt-1 text-gray-800">
                게스트 {guestCount} 명
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 border-y my-8 py-8">
            <h2 className="text-lg md:text-2xl font-semibold">숙소 정보</h2>
            <div className="flex border-b gap-4 pb-6">
              <Image
                src={room.images[0].url}
                width={100}
                height={100}
                alt={room.title}
                className="rounded-md"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
              <div className="flex flex-col justify-between">
                <Link href={`/rooms/${room.id}`}>
                  <h1 className="text-sm">{room.title}</h1>
                  <p className="text-xs text-gray-500 line-clamp-4">
                    {room.description}
                  </p>
                </Link>
                <p className="text-xs text-gray-500">
                  {room.category.name} | {currencyPrice(room.price)}
                </p>
              </div>
            </div>
            <h2 className="text-lg md:text-2xl font-semibold">
              요금 세부 정보
            </h2>
            <div>
              <h3>숙박 일수</h3>
              <div className="text-sm mt-1 text-gray-800">{totalDays}박</div>
            </div>
            <div>
              <h3>총 합계</h3>
              <div className="text-sm mt-1 text-gray-800">
                {currencyPrice(Number(totalAmount))}
              </div>
            </div>
            <div>
              <Button className="w-full">확인 및 결제</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
