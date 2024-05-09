import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import { getRecentPostsMutation } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

const Explore = () => {
  const { data: posts, isPending: isPostsLoading, isError: isErrorPosts } = getRecentPostsMutation();

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold w-full text-left">Explore New Posts</h2>

          {isPostsLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-1 flex-col w-full gap-10">
              {posts?.documents.map((post: Models.Document) => (
                <PostCard post={post} key={post.caption} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default Explore