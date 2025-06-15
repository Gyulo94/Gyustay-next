"use client";

import {
  useCreateComment,
  useFindCommentsByRoomId,
} from "@/hooks/query/use-comment";
import { CommentFormType } from "@/type/comment.type";
import { RoomType } from "@/type/room.type";
import { Session } from "next-auth";
import CommentForm from "./comment-form";
import CommentList from "./comment-list";

interface Props {
  room: RoomType;
  session: Session | null;
}

export default function Comment({ room, session }: Props) {
  const createComment = useCreateComment(room.id);
  const { data: comments, isLoading } = useFindCommentsByRoomId(room.id, 6);
  const onSubmit = (values: CommentFormType) => {
    createComment.mutate(values);
  };
  const defaultValues: CommentFormType = {
    content: "",
  };
  return (
    <div className="border-b border-gray-300 py-8 px-4">
      <CommentList comments={comments} isLoading={isLoading} roomId={room.id} />
      {session && session.user && (
        <CommentForm
          onSubmit={onSubmit}
          disabled={createComment.isPending}
          defaultValues={defaultValues}
        />
      )}
    </div>
  );
}
