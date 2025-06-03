import { findRoomById } from "@/actions/room.actions";
import { auth } from "@/auth";
import Comment from "@/components/comment/comment";
import FeatureSection from "@/components/rooms/feature-section";
import HeaderSection from "@/components/rooms/header-section";
import MapSection from "@/components/rooms/map-section";
import { RoomType } from "@/type/room.type";

interface Props {
  params: {
    id: Promise<string>;
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
