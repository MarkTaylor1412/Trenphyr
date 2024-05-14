import PostForm from "@/components/form/PostForm"


const CreatePost = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="w-full max-w-5xl flex-start gap-3 justify-start">
          <img
            src="/assets/icons/create.svg"
            height={36}
            width={36}
            alt="add"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Create Post</h2>
        </div>

        <PostForm action="Create" />
      </div>
    </div>
  )
}

export default CreatePost