"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Organizer, User } from "@prisma/client"
import { Loader2 } from "lucide-react"
import toast from "react-hot-toast"
import { trpc } from "@/trpc/react"

// 入力データの検証ルールを定義
const schema = z.object({
  organizationName: z.string().min(3, { message: "3文字以上入力する必要があります" }),
})

// 入力データの型を定義
type InputType = z.infer<typeof schema>

interface ProfileProps {
  organizer: Organizer & {
    user: User 
  }
}

// プロフィール編集
const OrganizerProfileEdit = ({ organizer }: ProfileProps) => {
  const router = useRouter()

  // フォームの状態
  const form = useForm<InputType>({
    // 入力値の検証
    resolver: zodResolver(schema),
    // 初期値
    defaultValues: {
      organizationName: organizer.organizationName || "",
    },
  })

  // プロフィール編集
  const { mutate: updateOrganizer, isLoading } = trpc.user.updateOrganizer.useMutation({
    onSuccess: () => {
      toast.success("プロフィールを編集しました")
      router.refresh()
    },
    onError: (error) => {
      toast.error(error.message)
      console.error(error)
    },
  })

  // 送信
  const onSubmit: SubmitHandler<InputType> = (data) => {
    // プロフィール編集
    updateOrganizer({
      organizationName: data.organizationName,
    })
  }

  return (
    <div>
      <div className="text-xl font-bold text-center mb-5">イベント主催者プロフィール</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="organizationName"
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
  )
}

export default OrganizerProfileEdit