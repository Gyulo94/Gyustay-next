import {
  useFindCommentById,
  useUpdateComment,
} from "@/hooks/query/use-comment";
import { useCommentEditDialogStore } from "@/hooks/store/modal.store";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import CommentForm from "./comment-form";

export default function CommentEditDialog() {
  const { isOpen, onClose, commentId } = useCommentEditDialogStore();
  const { data: comment, isLoading } = useFindCommentById(commentId);
  const updateComment = useUpdateComment(commentId);

  const onSubmit = (values: { content: string }) => {
    updateComment.mutate(values, {
      onSuccess: () => onClose(),
    });
  };

  if (isLoading || !comment) return null;
  const defaultValues = {
    content: comment.content,
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-mediom text-center leading-6 text-gray-900">
            후기 수정하기
          </DialogTitle>
        </DialogHeader>
        <CommentForm
          id={commentId}
          onSubmit={onSubmit}
          defaultValues={defaultValues}
        />
      </DialogContent>
    </Dialog>
  );
}
