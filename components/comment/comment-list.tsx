"use client";

import { useCommentsListDialogStore } from "@/hooks/store/modal.stroe";
import { CommentType } from "@/type/comment.type";
import { format } from "date-fns";
import { BiChevronRight } from "react-icons/bi";
import { Loader } from "../shared/loader";
import { Avatar, AvatarImage } from "../ui/avatar";

export const COMMENTS = [
  {
    id: 1,
    name: "사용자",
    createdAt: "2025-06-02",
    image: "/images/noProfileImage.jpg",
    content:
      "숙소가 정말 좋았어요! 청결하고 편안한 분위기에서 잘 쉬었습니다. 호스트 분도 친절하셔서 좋았습니다.",
  },
  {
    id: 2,
    name: "사용자",
    createdAt: "2025-06-01",
    image: "/images/noProfileImage.jpg",
    content:
      "위치가 정말 좋았어요! 주변에 맛집도 많고, 교통도 편리해서 여행하기에 최적이었습니다.",
  },
  {
    id: 3,
    name: "사용자",
    createdAt: "2025-05-30",
    image: "/images/noProfileImage.jpg",
    content:
      "숙소가 사진보다 훨씬 넓고 쾌적했어요. 다음에도 꼭 다시 이용하고 싶습니다!",
  },
  {
    id: 4,
    name: "사용자",
    createdAt: "2025-05-28",
    image: "/images/noProfileImage.jpg",
    content:
      "호스트 분이 정말 친절하셨어요. 필요한 것들을 다 챙겨주셔서 편하게 지낼 수 있었습니다.",
  },
  {
    id: 5,
    name: "사용자",
    createdAt: "2025-05-25",
    image: "/images/noProfileImage.jpg",
    content:
      "숙소가 조용하고 아늑해서 정말 좋았어요. 다음에도 꼭 다시 오고 싶습니다!",
  },
  {
    id: 6,
    name: "사용자",
    createdAt: "2025-05-20",
    image: "/images/noProfileImage.jpg",
    content:
      "숙소가 정말 깨끗하고 잘 관리되어 있었어요. 편안하게 지낼 수 있었습니다.",
  },
  {
    id: 7,
    name: "사용자",
    createdAt: "2025-05-15",
    image: "/images/noProfileImage.jpg",
    content:
      "위치가 정말 좋았어요! 주변에 볼거리가 많아서 여행하기에 최적이었습니다.",
  },
  {
    id: 8,
    name: "사용자",
    createdAt: "2025-05-10",
    image: "/images/noProfileImage.jpg",
    content:
      "호스트 분이 정말 친절하셨어요. 필요한 것들을 다 챙겨주셔서 편하게 지낼 수 있었습니다.",
  },
];

interface Props {
  comments: {
    data: CommentType[];
    totalCount: number;
  };
  isLoading: boolean;
  roomId: number;
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
          comments.data.map((comment) => (
            <div key={comment.id} className="flex flex-col gap-2">
              <Avatar className="size-12 shadow">
                <AvatarImage src={comment.user.image} alt={comment.user.name} />
              </Avatar>
              <h1 className="font-semibold">{comment.user.name}</h1>
              <div className="text-gray-500 text-xs">
                {format(new Date(comment.createdAt), "yyyy-MM-dd HH:mm")}
              </div>
              <div className="max-w-md text-gray-600 line-clamp-2">
                {comment.content}
              </div>
              <button
                onClick={() => onOpen(roomId)}
                type="button"
                className="underline font-semibold flex gap-1 items-center justify-start cursor-pointer w-fit"
              >
                더보기 <BiChevronRight className="text-xl" />
              </button>
            </div>
          ))
        )}
      </div>
      <div className="mt-8 mb-20">
        <button
          onClick={() => onOpen(roomId)}
          type="button"
          className="border border-gray-700 font-semibold rounded-lg px-6 py-4 flex items-center gap-4 hover:bg-black/5 cursor-pointer"
        >
          후기 ({comments?.totalCount}) 모두 보기
        </button>
      </div>
    </>
  );
}
