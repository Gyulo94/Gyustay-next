"use client";

import { Loader } from "@/components/shared/loader";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useFindCommentsAllByUserId } from "@/hooks/query/use-comment";
import { CommentType } from "@/type/comment.type";
import { format } from "date-fns";
import { Fragment, useEffect } from "react";
import { BiChevronRight } from "react-icons/bi";
import { useInView } from "react-intersection-observer";

export default function CommentPage() {
  const { ref, inView } = useInView();
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
    // let timerId: NodeJS.Timeout | undefined;

    if (inView && hasNextPage) {
      // timerId = setTimeout(() => {
      fetchNextPage();
      // }, 100);
    }
  }, [fetchNextPage, hasNextPage, inView]);

  return (
    <main className="max-w-[2520px] md:min-h-[calc(100vh-92.8px-84.4px)] mt-10 mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      <h1 className="font-semibold text-lg mt-10 md:text-2xl max-w-7xl mx-auto px-4">
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
                <Avatar className="size-12 shadow">
                  <AvatarImage
                    src={comment.user.image}
                    alt={comment.user.name}
                  />
                </Avatar>
                <h1 className="font-semibold">{comment.user.name}</h1>
                <div className="text-gray-500 text-xs">
                  {" "}
                  {format(new Date(comment.createdAt), "yyyy-MM-dd HH:mm")}
                </div>
                <div className="max-w-lg text-gray-600">{comment.content}</div>
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
  );
}
