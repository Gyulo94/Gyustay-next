import { useFindCommentsAllByRoomId } from "@/hooks/query/use-comment";
import { useCommentsListDialogStore } from "@/hooks/store/modal.store";
import { CommentType } from "@/type/comment.type";
import { format } from "date-fns";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Loader } from "../shared/loader";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

export default function CommentsListDialog() {
  const { isOpen, onClose, roomId } = useCommentsListDialogStore();
  const { ref, inView } = useInView();
  const {
    data: comments,
    isLoading,
    fetchNextPage,
    isFetching,
    hasNextPage,
    isError,
  } = useFindCommentsAllByRoomId(roomId!, 12);
  if (isError) throw new Error("후기 목록을 불러오는 중 오류가 발생했습니다.");

  useEffect(() => {
    // let timerId: NodeJS.Timeout | undefined;

    if (inView && hasNextPage) {
      // timerId = setTimeout(() => {
      fetchNextPage();
      // }, 100);
    }
  }, [fetchNextPage, hasNextPage, inView]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-mediom text-center leading-6 text-gray-900">
            후기 전체 보기
          </DialogTitle>
        </DialogHeader>
        <h1 className="font-semibold text-xl mb-2 mt-4">
          후기 ({comments?.pages[0].totalCount})
        </h1>
        <div className="mt-8 flex flex-col gap-12 mx-auto max-w-lg mb-10 items-start w-full overflow-y-auto h-[70vh]">
          {isLoading ? (
            <Loader />
          ) : (
            comments?.pages.map((page, index) => (
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
                    <div className="max-w-lg text-gray-600">
                      {comment.content}
                    </div>
                  </div>
                ))}
              </Fragment>
            ))
          )}
          {(hasNextPage || isFetching) && (
            <>
              <Loader className="mt-8" />
              <div ref={ref} className="w-full h-10 mb-10 z-10 touch-none" />
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
