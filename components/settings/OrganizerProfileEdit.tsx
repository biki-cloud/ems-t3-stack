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
import { Textarea } from "@/components/ui/textarea"
import { Organizer, User } from "@prisma/client"
import { trpc } from "@/trpc/react"
import { Loader2 } from "lucide-react"
import ImageUploading, { ImageListType } from "react-images-uploading"
import Image from "next/image"
import toast from "react-hot-toast"

// 入力データの検証ルールを定義
const schema = z.object({
  organizationName: z.string().min(3, { message: "3文字以上入力する必要があります" }),
  introduction: z.string().optional(),
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
  const [imageUpload, setImageUpload] = useState<ImageListType>([
    {
      dataURL: organizer.user.image || "/default.png",
    },
  ])

  // フォームの状態
  const form = useForm<InputType>({
    // 入力値の検証
    resolver: zodResolver(schema),
    // 初期値
    defaultValues: {
      organizationName: organizer.organizationName || "",
      introduction: organizer.user.introduction || "",
    },
  })

  // プロフィール編集
  const { mutate: updateOrganizer, isLoading } = trpc.organizer.updateOrganizer.useMutation({
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
    let base64Image

    if (
      imageUpload[0].dataURL &&
      imageUpload[0].dataURL.startsWith("data:image")
    ) {
      base64Image = imageUpload[0].dataURL
    }

    // プロフィール編集
    updateOrganizer({
      organizationName: data.organizationName,
      introduction: data.introduction,
      base64Image,
    })
  }

  // 画像アップロード
  const onChangeImage = (imageList: ImageListType) => {
    const file = imageList[0]?.file
    const maxFileSize = 5 * 1024 * 1024

    // ファイルサイズチェック
    if (file && file.size > maxFileSize) {
      toast.error("ファイルサイズは5MBを超えることはできません")
      return
    }

    setImageUpload(imageList)
  }

  return (
    <div>
      <div className="text-xl font-bold text-center mb-5">プロフィール編集</div>
      <Form {...form}>
        <div className="mb-5">
          <ImageUploading
            value={imageUpload}
            onChange={onChangeImage}
            maxNumber={1}
            acceptType={["jpg", "png", "jpeg"]}
          >
            {({ imageList, onImageUpdate }) => (
              <div className="w-full flex flex-col items-center justify-center">
                {imageList.map((image, index) => (
                  <div key={index}>
                    {image.dataURL && (
                      <div className="w-24 h-24 relative">
                        <Image
                          fill
                          src={image.dataURL}
                          alt={organizer.user.name || "avatar"}
                          className="rounded-full object-cover"
                          sizes="100px"
                        />
                      </div>
                    )}
                  </div>
                ))}

                {imageList.length > 0 && (
                  <div className="text-center mt-3">
                    <Button variant="outline" onClick={() => onImageUpdate(0)}>
                      アバターを変更
                    </Button>
                  </div>
                )}
              </div>
            )}
          </ImageUploading>
        </div>

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

          <FormField
            control={form.control}
            name="introduction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>自己紹介</FormLabel>
                <FormControl>
                  <Textarea placeholder="自己紹介" {...field} rows={10} />
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