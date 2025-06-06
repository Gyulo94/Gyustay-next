import { findRoomById } from "@/actions/room.actions";
import { auth } from "@/auth";
import Comment from "@/components/comment/comment";
import FeatureSection from "@/components/rooms/feature-section";
import HeaderSection from "@/components/rooms/header-section";
import MapSection from "@/components/rooms/map-section";
import { RoomType } from "@/type/room.type";
import { Metadata } from "next";

interface Props {
  params: {
    id: Promise<string>;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const room: RoomType = await findRoomById(await id);

  return {
    title: `GyuStay 숙소 - ${room.title}`,
    description: room.description,
    openGraph: {
      title: room.title,
      description: room.description,
      url: `https://gyustay.vercel.app/rooms/${id}`,
      images: [
        {
          url: room.images[0].url,
          width: 1200,
          height: 630,
          alt: room.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `GyuStay 숙소 - ${room.title}`,
      description: room.description,
      images: room.images.map((image) => image.url),
    },
  };
}

export default async function RoomPage({ params }: Props) {
  const { id } = await params;
  const session = await auth();
  const room: RoomType = await findRoomById(await id);
  return (
    <div className="mt-8 mb-20 max-w-6xl mx-auto">
      <HeaderSection room={room} />
      <FeatureSection room={room} />
      <Comment room={room} session={session} />
      <MapSection room={room} />
    </div>
  );
}
