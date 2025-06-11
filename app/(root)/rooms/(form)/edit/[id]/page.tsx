import { findRoomById } from "@/actions/room.actions";
import RoomEditForm from "@/components/rooms/form/room-edit-form";
import { RoomType } from "@/type/room.type";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function RoomEdit({ params }: Props) {
  const id = (await params).id;
  const room: RoomType = await findRoomById(id);
  return <RoomEditForm room={room} />;
}
