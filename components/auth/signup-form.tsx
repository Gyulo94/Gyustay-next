"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCheckVerifyToken, useSignup } from "@/hooks/query/use-auth";
import { SignupFormType } from "@/type/auth.type";
import { SignupFormSchema } from "@/validation/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

export function SignupForm() {
  const router = useRouter();
  const form = useForm<SignupFormType>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
      token: "",
    },
  });
  const token = useParams<{ token: string }>().token;

  const { data, isError, error, isLoading } = useCheckVerifyToken(token);
  const signup = useSignup();

  if (!isLoading) {
    setTimeout(() => {
      form.setValue("email", data.email);
      form.setValue("token", token);
    }, 0);
  }
  if (isError) {
    if (error instanceof Error) {
      if (error.message.includes("401")) {
        toast.error("잘못된 접근입니다.");
        router.push("/signup");
      }
    }
  }

  function onSubmit(values: SignupFormType) {
    signup.mutate(values);
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">회원가입</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="hidden"
                            placeholder="이메일"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="token"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="hidden"
                            placeholder="토큰"
                            readOnly
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>이름</FormLabel>
                          <FormControl>
                            <Input placeholder="이름" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>비밀번호</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="비밀번호"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>비밀번호 확인</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="비밀번호 확인"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button>회원가입</Button>
                </div>
                <div className="text-sm text-center text-muted-foreground">
                  이미 계정이 있나요?{" "}
                  <Link
                    href={"/login"}
                    className="text-foreground link hover:underline underline-offset-2"
                  >
                    로그인
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
