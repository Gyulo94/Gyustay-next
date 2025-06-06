"use client";

import { useCommentsListDialogStore } from "@/hooks/store/modal.store";
import { CommentType } from "@/type/comment.type";
import { format } from "date-fns";
import { BiChevronRight } from "react-icons/bi";
import { Loader } from "../shared/loader";

interface Props {
  comments: {
    data: CommentType[];
    totalCount: number;
  };
  isLoading: boolean;
  roomId: string;
}

export default function CommentList({ comments, isLoading, roomId }: Props) {
  const { onOpen } = useCommentsListDialogStore();
  return (
    <>
      <h1 className="font-semibold text-xl mb-2">
        후기 ({comments?.totalCount})
      </h1>
      <div className="mt-8 grid md:grid-cols-2 gap-12">
        {isLoading ? (
          <Loader className="md:col-span-2" />
        ) : (
          comments?.data?.map((comment) => (
            <div key={comment?.id} className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <img
                  src={comment?.user?.image || "/images/user-icon.png"}
                  alt="profile img"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <h1 className="font-semibold">
                    {comment?.user?.name || "-"}
                  </h1>
                  <div className="text-gray-500 text-xs">
                    {format(comment?.createdAt, "yyyy-MM-dd HH:mm")}
                  </div>
                </div>
              </div>
              <div className="max-w-md text-gray-600">{comment?.content}</div>
              <button
                type="button"
                onClick={() => onOpen(roomId)}
                className="underline font-semibold flex gap-1 items-center justify-start"
              >
                더보기 <BiChevronRight className="text-xl" />
              </button>
            </div>
          ))
        )}
      </div>
      {comments?.totalCount > 6 && (
        <div className="mt-8 mb-20">
          <button
            onClick={() => onOpen(roomId)}
            type="button"
            className="border border-gray-700 font-semibold rounded-lg px-6 py-4 flex items-center gap-4 hover:bg-black/5 cursor-pointer"
          >
            후기 ({comments?.totalCount}) 모두 보기
          </button>
        </div>
      )}
    </>
  );
}
