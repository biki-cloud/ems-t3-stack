"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Vendor, User } from "@prisma/client";
import { trpc } from "@/trpc/react";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

// 入力データの検証ルールを定義
const schema = z.object({
  vendorName: z.string().min(3, { message: "3文字以上入力する必要があります" }),
});

// 入力データの型を定義
type InputType = z.infer<typeof schema>;

interface ProfileProps {
  vendor: Vendor & {
    user: User;
  };
}

// プロフィール編集
const VendorProfileEdit = ({ vendor }: ProfileProps) => {
  const router = useRouter();

  // フォームの状態
  const form = useForm<InputType>({
    // 入力値の検証
    resolver: zodResolver(schema),
    // 初期値
    defaultValues: {
      vendorName: vendor.vendorName || "",
    },
  });

  // プロフィール編集
  const { mutate: updateVendor, isLoading } =
    trpc.user.updateVendor.useMutation({
      onSuccess: () => {
        toast.success("プロフィールを編集しました");
        router.refresh();
      },
      onError: (error) => {
        toast.error(error.message);
        console.error(error);
      },
    });

  // 送信
  const onSubmit: SubmitHandler<InputType> = (data) => {
    // プロフィール編集
    updateVendor({
      vendorName: data.vendorName,
    });
  };

  return (
    <div>
      <div className="text-xl font-bold text-center mb-5">
        イベント出店者プロフィール
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="vendorName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>事業者名</FormLabel>
                <FormControl>
                  <Input placeholder="事業者名" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            変更
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default VendorProfileEdit;
