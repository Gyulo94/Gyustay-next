import { useFindLikeRoomById, useToggleLike } from "@/hooks/query/use-like";
import { RoomType } from "@/type/room.type";
import { useSession } from "next-auth/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "sonner";

export default function LikeButton({ room }: { room: RoomType }) {
  const { data: session } = useSession();
  const { data: roomData, refetch } = useFindLikeRoomById(
    room.id,
    session?.user.id
  );
  const toggleLike = useToggleLike();
  function toggleLikeHandler() {
    if (session?.user && room) {
      toggleLike.mutate(room.id);
    } else {
      toast.error("로그인이 필요합니다.");
    }
  }
  console.log("roomData", roomData);

  return (
    <button
      type="button"
      onClick={toggleLikeHandler}
      className="flex gap-2 items-center px-2 py-1.5 rounded-lg hover:bg-black/10 cursor-pointer"
    >
      {roomData?.likes?.length ? (
        <>
          <AiFillHeart className="text-red-500 hover:text-red-600 focus:text-red-600" />
          <span className="underline">취소</span>
        </>
      ) : (
        <>
          <AiOutlineHeart className="hover:text-red-600 focus:text-red-600" />
          <span className="underline">저장</span>
        </>
      )}
    </button>
  );
}
