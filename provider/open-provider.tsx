"use client";

import CommentEditDialog from "@/components/comment/comment-edit-dialog";
import CommentsListDialog from "@/components/comment/comments-list-dialog";
import RoomRegisterDialog from "@/components/rooms/form/room-register-dialog";
import ImageListDialog from "@/components/rooms/image-list-dialog";
import ShareDialog from "@/components/rooms/share-dialog";
import { useEffect, useState } from "react";

export default function OpenProvider() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return (
    <>
      <ImageListDialog />
      <ShareDialog />
      <CommentsListDialog />
      <CommentEditDialog />
      <RoomRegisterDialog />
    </>
  );
}
