import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import FileUploader from "../shared/FileUploader"
import { PostValidation } from "@/lib/validation"
import { useUserContext } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"
import { useToast } from "../ui/use-toast"
import { PostProps } from "@/types"
import { createPostMutation, editPostMutation } from "@/lib/react-query/queriesAndMutations"

const PostForm = ({ post, action }: PostProps) => {
  const { mutateAsync: createPost, isPending: isLoadingCreate } = createPostMutation();
  const { mutateAsync: editPost, isPending: isLoadingEdit } = editPostMutation();

  const { user } = useUserContext();
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post.tags.join(",") : "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PostValidation>) {
    if (post && action === "Update") {
      const updatedPost = await editPost({
        ...values,
        postId: post.$id,
        imageUrl: post?.imageUrl,
        imageId: post?.imageId,
      });

      if (!updatedPost) {
        toast({ title: "Failed to update post. Please try again later!" });
        console.log(values);
      }

      toast({ title: "Post updated!" });
      navigate(`/posts/${post.$id}`);
      console.log(values);
    }

    const newPost = await createPost({
      ...values,
      userId: user.id,
    });

    if (!newPost) {
      toast({ title: "Failed to create post. Please try again later!" });
      console.log(values);
    };

    toast({ title: "Post created!" });
    navigate("/");
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label">Caption</FormLabel>
              <FormControl>
                <Textarea className="textarea custom-scrollbar" placeholder="Definitely something awesome." {...field} />
              </FormControl>
              <FormMessage className="form-message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="form-message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label">Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="input" placeholder="Your favourite places." {...field} />
              </FormControl>
              <FormMessage className="form-message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label">Add Tags (comma for separation, ",")</FormLabel>
              <FormControl>
                <Input type="text" className="input" placeholder="DIY, Trending, Sports, etc." {...field} />
              </FormControl>
              <FormMessage className="form-message" />
            </FormItem>
          )}
        />

        <div className="flex justify-center items-center gap-4">
          <Button
            type="submit"
            className="w-full p-7 button-primary whitespace-nowrap"
            disabled={isLoadingCreate || isLoadingEdit}
          >
            {action}
            {isLoadingCreate || isLoadingEdit && "..."}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default PostForm