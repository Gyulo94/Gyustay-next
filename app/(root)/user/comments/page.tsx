"use client";

import { Loader } from "@/components/shared/loader";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useDeleteComment,
  useFindCommentsAllByUserId,
} from "@/hooks/query/use-comment";
import { useCommentEditDialogStore } from "@/hooks/store/modal.store";
import { useConfirm } from "@/hooks/use-confirm";
import { CommentType } from "@/type/comment.type";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { format } from "date-fns";
import Image from "next/image";
import { Fragment, useEffect } from "react";
import { BiChevronRight } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useInView } from "react-intersection-observer";

export default function CommentPage() {
  const [ConfirmDialog, confirm] = useConfirm(
    "정말로 삭제하시겠습니까?",
    "삭제된 데이터는 복구할 수 없습니다."
  );
  const deleteComment = useDeleteComment();
  const { ref, inView } = useInView();
  const { onOpen } = useCommentEditDialogStore();
  const {
    data: comments,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isError,
  } = useFindCommentsAllByUserId(12);

  if (isError) {
    throw new Error("후기 목록을 불러오는 중 오류가 발생했습니다.");
  }

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  const handleDelete = async (commentId: string) => {
    const ok = await confirm();
    if (ok) {
      deleteComment.mutate(commentId);
    }
  };

  return (
    <>
      <ConfirmDialog />
      <main className="max-w-[2520px] md:min-h-[calc(100vh-92.8px-84.4px)] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
        <h1 className="font-semibold text-lg mt-10 md:text-2xl max-w-7xl mx-auto">
          나의 후기 목록
        </h1>
        <div className="mt-2 text-gray-500 max-w-7xl mx-auto">
          내가 쓴 후기 목록입니다.
        </div>
        <div className="mt-12 grid md:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {comments?.pages.map((page, index) => (
            <Fragment key={index}>
              {page.data.map((comment: CommentType) => (
                <div key={comment.id} className="flex flex-col gap-2">
                  <div className="flex gap-2 items-center">
                    <div className="relative overflow-hidden size-[48px] rounded-full shadow">
                      <Image
                        src={
                          comment.user.image
                            ? comment.user.image
                            : "/images/noProfileImage.jpg"
                        }
                        alt={`Profile`}
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                    <div>
                      <h1 className="font-semibold">
                        {comment?.user?.name || "-"}
                      </h1>
                      <div className="text-gray-500 text-xs">
                        {format(comment?.createdAt, "yyyy-MM-dd HH:mm")}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="max-w-lg text-gray-600">
                      {comment.content}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="hover:bg-neutral-100 transition cursor-pointer p-3 rounded-full">
                          <BsThreeDotsVertical />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => onOpen(comment.id)}>
                          수정
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(comment.id)}
                        >
                          삭제
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <button
                    onClick={() =>
                      window.open(`/rooms/${comment.roomId}`, "_blank")
                    }
                    type="button"
                    className="underline flex gap-1 items-center justify-start hover:text-gray-500 cursor-pointer font-semibold"
                  >
                    숙소 보기 <BiChevronRight className="text-xl" />
                  </button>
                </div>
              ))}
            </Fragment>
          ))}
        </div>
        {(isFetching || isLoading) && <Loader />}
        <div className="w-full touch-none h-10 mb-10" ref={ref} />
      </main>
    </>
  );
}
