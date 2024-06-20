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
  FormDescription,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Event } from "@prisma/client"
import { trpc } from "@/trpc/react"
import { Loader2 } from "lucide-react"
import ImageUploading, { ImageListType } from "react-images-uploading"
import Image from "next/image"
import toast from "react-hot-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import genreMapping from "../objects/mapping"

// 入力データの検証ルールを定義
const schema = z.object({
  title: z.string().min(3, { message: "3文字以上入力する必要があります" }),
  content: z.string().min(3, { message: "3文字以上入力する必要があります" }),
  location: z.string().min(3, { message: "3文字以上入力する必要があります" }),
  premium: z.boolean(),
  genre: z.string().refine((val) => Object.keys(genreMapping).includes(val), {
    message: "無効なジャンルです",
  }),
})

// 入力データの型を定義
type InputType = z.infer<typeof schema>

interface EventEditProps {
  event: Event
}

// 投稿編集
const EventEdit = ({ event: event }: EventEditProps) => {
  const router = useRouter()
  const [imageUpload, setImageUpload] = useState<ImageListType>([
    {
      dataURL: event.image || "/noImage.png",
    },
  ])

  // フォームの状態
  const form = useForm<InputType>({
    // 入力値の検証
    resolver: zodResolver(schema),
    // 初期値
    defaultValues: {
      title: event.title || "",
      content: event.content || "",
      location: event.location || "",
      premium: event.premium || false,
      genre: event.genre || "",
    },
  })

  // 投稿編集
  const { mutate: updateEdit, isLoading } = trpc.event.updateEvent.useMutation({
    onSuccess: () => {
      toast.success("投稿を編集しました")
      router.refresh()
      router.push(`/event/${event.id}`)
    },
    onError: (error) => {
      toast.error(error.message)
      console.error(error)
    },
  })

  // 送信
  const onSubmit: SubmitHandler<InputType> = async (data) => {
    let base64Image

    if (
      imageUpload[0].dataURL &&
      imageUpload[0].dataURL.startsWith("data:image")
    ) {
      base64Image = imageUpload[0].dataURL
    }

    // 投稿編集
    updateEdit({
      eventId: event.id,
      title: data.title,
      content: data.content,
      location: data.location,
      base64Image,
      premium: data.premium,
      genre: data.genre,
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
      <div className="text-2xl font-bold text-center mb-5">投稿編集</div>
      <Form {...form}>
        <div className="mb-5">
          <FormLabel>サムネイル</FormLabel>
          <div className="mt-2">
            <ImageUploading
              value={imageUpload}
              onChange={onChangeImage}
              maxNumber={1}
              acceptType={["jpg", "png", "jpeg"]}
            >
              {({ imageList, onImageUpdate }) => (
                <div className="w-full">
                  {imageList.map((image, index) => (
                    <div key={index}>
                      {image.dataURL && (
                        <div className="aspect-[16/9] relative">
                          <Image
                            fill
                            src={image.dataURL}
                            alt="thumbnail"
                            className="object-cover rounded-md"
                            sizes="100px"
                          />
                        </div>
                      )}
                    </div>
                  ))}

                  {imageList.length > 0 && (
                    <div className="text-center mt-3">
                      <Button
                        variant="outline"
                        onClick={() => onImageUpdate(0)}
                      >
                        画像を変更
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </ImageUploading>
          </div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>タイトル</FormLabel>
                <FormControl>
                  <Input placeholder="投稿のタイトル" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>内容</FormLabel>
                <FormControl>
                  <Textarea placeholder="投稿の内容" {...field} rows={15} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>開催場所</FormLabel>
                <FormControl>
                  <Textarea placeholder="投稿の内容" {...field} rows={15} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ジャンル</FormLabel>
                <FormControl>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">{genreMapping[field.value]}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {Object.keys(genreMapping).map((genre) => (
                        <DropdownMenuItem key={genre} onClick={() => field.onChange(genre)}>
                          {genreMapping[genre]}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="premium"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-5 shadow-sm">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-2 leading-none">
                  <FormLabel>有料会員限定</FormLabel>
                  <FormDescription>
                    有料会員のみが閲覧できるようにする
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            編集
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default EventEdit
