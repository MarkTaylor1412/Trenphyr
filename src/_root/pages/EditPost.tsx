import PostForm from "@/components/form/PostForm"
import Loader from "@/components/shared/Loader";
import { getPostByIdMutation } from "@/lib/react-query/queriesAndMutations";
import { useParams } from "react-router-dom"


const EditPost = () => {
  const { id } = useParams();
  const { data: post, isPending } = getPostByIdMutation(id || "");

  if (isPending) return <Loader />

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="w-full max-w-5xl flex-start gap-3 justify-start">
          <img
            src="/assets/icons/edit.svg"
            height={36}
            width={36}
            alt="edit"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
        </div>

        <PostForm action="Update" post={post} />
      </div>
    </div>
  )
}

export default EditPost