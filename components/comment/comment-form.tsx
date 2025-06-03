"use client";

import { CommentFormType } from "@/type/comment.type";
import { CommentFormSchema } from "@/validation/comment.shema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

export default function CommentForm({
  id,
  onSubmit,
  disabled,
  defaultValues,
}: {
  id?: number;
  onSubmit: (values: CommentFormType) => void;
  disabled?: boolean;
  defaultValues: CommentFormType;
}) {
  const form = useForm<CommentFormType>({
    resolver: zodResolver(CommentFormSchema),
    defaultValues,
  });
  return (
    <Form {...form}>
      <form
        className="mt-8"
        onSubmit={form.handleSubmit((values) => {
          onSubmit(values);
          form.reset({ content: "" });
        })}
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="후기를 작성해주세요..."
                  className="resize-none h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row-reverse mt-4">
          <Button disabled={disabled}>{id ? "수정하기" : "작성하기"}</Button>
        </div>
      </form>
    </Form>
  );
}
